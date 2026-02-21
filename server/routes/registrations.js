const express = require('express');
const router = express.Router();
const { verifyParticipant, verifyOrganizer } = require('../middleware/auth');
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const QRCode = require('qrcode');

// Get ticket by ID
router.get('/:registrationId/ticket', verifyParticipant, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.registrationId).populate('eventId');

    if (registration.participantId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Generate QR code if not exists
    if (!registration.qrCode) {
      const qrData = {
        ticketId: registration.ticketId,
        participantId: registration.participantId,
        eventId: registration.eventId._id,
        registrationDate: registration.registrationDate
      };

      const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
      registration.qrCode = qrCode;
      await registration.save();
    }

    res.json({
      ticket: {
        ticketId: registration.ticketId,
        eventName: registration.eventId.eventName,
        eventDate: registration.eventId.eventStartDate,
        participantName: req.user.id,
        status: registration.status,
        qrCode: registration.qrCode
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket', error: error.message });
  }
});

// Export registrations as CSV (organizer)
router.get('/event/:eventId/csv', verifyOrganizer, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (event.organizerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const registrations = await Registration.find({ eventId: req.params.eventId }).populate('participantId');

    let csv = 'Ticket ID,Participant Email,Participant Name,Registration Date,Status,Team Members\n';
    registrations.forEach(reg => {
      const teamMembers = reg.teamMembers ? reg.teamMembers.join('; ') : 'N/A';
      csv += `"${reg.ticketId}","${reg.participantId.email}","${reg.participantId.firstName} ${reg.participantId.lastName}","${reg.registrationDate}","${reg.status}","${teamMembers}"\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', `attachment; filename="registrations-${req.params.eventId}.csv"`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting CSV', error: error.message });
  }
});

// Verify ticket by QR code (organizer)
router.post('/verify-qr', verifyOrganizer, async (req, res) => {
  try {
    const { ticketId } = req.body;

    const registration = await Registration.findOne({ ticketId }).populate('eventId');

    if (!registration) {
      return res.status(404).json({ message: 'Invalid ticket' });
    }

    if (registration.eventId.organizerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json({
      valid: true,
      ticket: {
        ticketId: registration.ticketId,
        participantId: registration.participantId,
        eventName: registration.eventId.eventName,
        status: registration.status
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying ticket', error: error.message });
  }
});

module.exports = router;
