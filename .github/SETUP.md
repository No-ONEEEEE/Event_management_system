<!-- Event Management System Setup Documentation -->

# Event Management System - Setup Complete

## Project Overview
A minimal Event Management System with Node.js Express backend, MongoDB database, and vanilla HTML/CSS/JS frontend. Supports participant registration, event management, organizer features, and admin controls.

## Project Structure Completed

```
ASS-1/
├── server/
│   ├── models/
│   │   ├── Participant.js         - User registration model
│   │   ├── Organizer.js           - Event organizer model
│   │   ├── Event.js               - Event details model
│   │   ├── Registration.js        - Participant registrations
│   │   └── Admin.js               - Admin users
│   ├── routes/
│   │   ├── auth.js                - Login/Signup endpoints
│   │   ├── participants.js        - Participant dashboard & profile
│   │   ├── organizers.js          - Organizer event management
│   │   ├── events.js              - Event browsing & registration
│   │   ├── registrations.js       - Tickets & QR codes
│   │   └── admin.js               - Admin management
│   ├── middleware/
│   │   └── auth.js                - JWT authentication
│   └── app.js                     - Express server setup
├── views/
│   ├── index.html                 - Landing page
│   ├── login.html                 - Login/authentication
│   ├── signup.html                - User registration
│   ├── dashboard.html             - User dashboard
│   └── browse-events.html         - Event browsing
├── public/                        - Static assets
├── package.json                   - Dependencies
├── .env                           - Environment configuration
├── .env.example                   - Example environment file
├── .gitignore                     - Git ignore rules
├── README.md                      - Full documentation
└── deployment.txt                 - Deployment instructions
```

## Technology Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT tokens + bcryptjs password hashing
- **Frontend:** Vanilla HTML, CSS, JavaScript (minimal)
- **Additional:** QRCode generation, CSV export, Session management

## Implemented Features

### Participant Features (9.1-9.8)
✓ User registration and login
✓ Browse events with search/filter
✓ Event registration and cancellation
✓ Dashboard with registration stats
✓ Ticket system with QR codes
✓ Follow organizers/clubs
✓ Profile management
✓ Password reset

### Organizer Features (10.1-10.5)
✓ Dashboard with analytics
✓ Event creation (Draft/Publish)
✓ Event editing and management
✓ Custom registration forms
✓ Revenue analytics
✓ Participant list and CSV export
✓ Profile management
✓ Event types: Normal & Merchandise

### Admin Features (11.1-11.2)
✓ Dashboard with system stats
✓ Organizer approval workflow
✓ Organizer management (Enable/Disable/Delete)
✓ View password reset requests
✓ Create new organizers
✓ Profile management

## API Endpoints Summary

### Authentication
- POST /api/auth/participant/signup
- POST /api/auth/participant/login
- POST /api/auth/organizer/signup
- POST /api/auth/organizer/login
- POST /api/auth/admin/login
- POST /api/auth/logout

### Participants (Protected)
- GET /api/participants/dashboard
- GET /api/participants/profile
- PUT /api/participants/profile
- GET /api/participants/registrations
- POST /api/participants/follow/:organizerId
- POST /api/participants/reset-password

### Events (Public/Protected)
- GET /api/events/browse - Search & filter
- GET /api/events/:eventId - Event details
- POST /api/events/:eventId/register - Register
- POST /api/events/:eventId/cancel - Cancel
- GET /api/events/clubs/list - Organizer list
- GET /api/events/club/:clubId - Organizer details

### Organizers (Protected)
- GET /api/organizers/dashboard
- POST /api/organizers/events/create
- GET /api/organizers/events
- PUT /api/organizers/events/:eventId
- POST /api/organizers/events/:eventId/publish
- GET /api/organizers/profile
- PUT /api/organizers/profile

### Registrations (Protected)
- GET /api/registrations/:registrationId/ticket
- GET /api/registrations/event/:eventId/csv
- POST /api/registrations/verify-qr

### Admin (Protected)
- GET /api/admin/dashboard
- GET /api/admin/organizers
- GET /api/admin/organizers/pending
- POST /api/admin/organizers/:id/approve
- POST /api/admin/organizers/:id/disable
- DELETE /api/admin/organizers/:id
- POST /api/admin/organizers/create

## Running Locally

### Prerequisites
- Node.js v14+
- MongoDB (setup with Atlas or local)
- npm installed

### Startup
```bash
npm install          # Already done
npm start            # Runs on http://localhost:5000
npm run dev          # With auto-reload
```

### Environment Setup
Edit .env with:
- MONGO_URI: Your MongoDB connection
- JWT_SECRET: Strong random string
- PORT: 5000
- NODE_ENV: development

## Deployment

### Step 1: MongoDB Setup
1. Create MongoDB Atlas account
2. Create cluster
3. Copy connection string to MONGO_URI

### Step 2: Backend Deployment (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository
3. Set environment variables
4. Deploy

### Step 3: Frontend Deployment (Vercel/Netlify)
1. Upload HTML files from /views
2. Configure API_URL in scripts
3. Deploy

See deployment.txt for detailed instructions.

## Frontend Pages

- `/` - Landing page
- `/auth/login` - Login page (Participant/Organizer/Admin)
- `/auth/signup` - Signup page (Participant/Organizer)
- `/dashboard` - User dashboard
- `/browse-events` - Event browsing

## Database Models

All models are in server/models/ with:
- Password hashing (bcryptjs)
- Timestamp tracking
- Relationship references
- Validation schemas

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs (10 salt rounds)
- Protected routes with middleware
- Session management
- Email in lowercase (normalization)
- Validation on registration

## Next Steps for Production

1. Connect MongoDB Atlas
2. Configure email service (nodemailer)
3. Deploy backend to production
4. Deploy frontend to static hosting
5. Update API URLs in frontend code
6. Set up CORS for production domain
7. Enable HTTPS
8. Configure environment variables

## Notes

- Minimal frontend reduces complexity
- All API responses return JSON
- Error handling implemented on all routes
- Database queries optimized with Mongoose
- No external UI framework dependency
- Lightweight and scalable architecture
