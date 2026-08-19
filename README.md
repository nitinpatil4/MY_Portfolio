# MERN Portfolio Website

A full-stack portfolio with a React frontend, Express/MongoDB backend, JWT-protected admin panel, and contact form with optional email notifications.

## Structure
- `client/` – React (Vite) frontend with Framer Motion animations
- `server/` – Express + MongoDB backend

## Setup

### 1. Backend
```bash
cd server
npm install
cp .env.example .env   # fill in your MongoDB URI and JWT secret
npm run dev
```
Server runs on `http://localhost:5000`

### 2. Frontend
```bash
cd client
npm install
cp .env.example .env
npm run dev
```
Frontend runs on `http://localhost:5173`

## Features
- **Public pages** – Home, Projects, About, Contact
- **Admin panel** – JWT-protected dashboard at `/admin/login`
- **Project CRUD** – Add, edit, and delete projects from the admin dashboard
- **Contact inbox** – View and delete contact form messages in the admin panel
- **Email notifications** – Optional Nodemailer integration (configure SMTP in `.env`)
- **Responsive design** – Mobile-friendly navigation and layout
- **Animations** – Framer Motion page transitions

## Admin Panel

### 1. Create your admin account (one-time)
With the server running, call this once via Postman/curl:
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "yourname",
  "password": "a-strong-password"
}
```
After you've created your account, **remove or comment out the `/register` route** in `server/routes/authRoutes.js` so no one else can create admin accounts.

### 2. Log in
Go to `http://localhost:5173/admin/login`, log in, and you'll land on `/admin/dashboard` where you can manage projects and view contact messages.

## Email Notifications (Optional)
Add your SMTP credentials to `server/.env`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFY_EMAIL=your-email@gmail.com
```
If SMTP is not configured, messages are still saved to MongoDB and visible in the admin inbox.

## Deployment
- Frontend → Vercel or Netlify (set `VITE_API_URL` to your deployed backend URL)
- Backend → Render or Railway (set `MONGO_URI` and `JWT_SECRET` env vars)
- Database → MongoDB Atlas free tier

## Customization
- Update personal info in `client/src/pages/Home.jsx`, `About.jsx`, `Footer.jsx`
- Update social links in `client/src/components/Footer.jsx`
- Update page title in `client/index.html`
