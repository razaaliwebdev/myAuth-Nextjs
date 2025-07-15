# Full-Stack Authentication System with Next.js, MongoDB, JWT, and Bcrypt

---

## 🚀 Live Demo

**Live on Render:** [https://myauth-nextjs-1.onrender.com](https://myauth-nextjs-1.onrender.com)

---

## Overview

This project is a complete authentication system built with **Next.js (App Router)**, **MongoDB** (via Mongoose), **JWT** for session management, and **bcrypt** for password hashing. It demonstrates a modern, full-stack approach to authentication, including registration, login, logout, protected routes, and session handling using HTTP-only cookies.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Backend Architecture](#backend-architecture)
  - [Database Connection](#database-connection)
  - [User Model](#user-model)
  - [API Routes](#api-routes)
  - [Authentication Flow](#authentication-flow)
  - [API Reference & Usage](#api-reference--usage)
  - [Extending the Backend](#extending-the-backend)
- [Frontend Architecture](#frontend-architecture)
  - [Pages & Components](#pages--components)
  - [Session Handling & Middleware](#session-handling--middleware)
- [Styling & Tooling](#styling--tooling)
- [Extending the Project](#extending-the-project)
- [Best Practices & Security](#best-practices--security)
- [FAQ](#faq)

---

## Features

- User registration with hashed passwords
- User login with JWT-based authentication
- Secure HTTP-only cookies for session management
- Logout functionality
- Protected routes (middleware-based)
- Modern React (Next.js App Router)
- Tailwind CSS for styling
- Toast notifications for UX feedback

---

## Tech Stack

- **Frontend:** Next.js (React 19), Tailwind CSS
- **Backend:** Next.js API routes, Mongoose (MongoDB ODM)
- **Auth:** JWT, bcrypt
- **Tooling:** ESLint, PostCSS, React Hot Toast

---

## Project Structure

```
my-auth/
├── env.samples
├── package.json
├── postcss.config.mjs
├── jsconfig.json
├── next.config.mjs
├── eslint.config.mjs
├── public/
│   └── ... (SVGs, static assets)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── login/route.js
│   │   │       ├── logout/route.js
│   │   │       └── register/route.js
│   │   ├── login/page.jsx
│   │   ├── register/page.jsx
│   │   ├── profile/page.jsx
│   │   ├── layout.jsx
│   │   ├── globals.css
│   │   └── ...
│   ├── database/
│   │   └── config.js
│   ├── models/
│   │   └── userModel.js
│   └── middleware.js
└── ...
```

---

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd my-auth
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or yarn install
   ```
3. **Configure environment variables:**
   - Copy `env.samples` to `.env.local` and fill in your secrets:
     ```env
     JWT_SECRET=your_jwt_secret
     MONGO_URI=your_mongodb_connection_string
     ```
4. **Run the development server:**
   ```bash
   npm run dev
   # or yarn dev
   ```
5. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

- `JWT_SECRET`: Secret key for signing JWT tokens (keep this safe!)
- `MONGO_URI`: MongoDB connection string (Atlas or local)

---

## Backend Architecture

### Database Connection

- Located at `src/database/config.js`.
- Uses Mongoose to connect to MongoDB using `MONGO_URI` from environment variables.
- Handles connection errors gracefully.

### User Model

- Defined in `src/models/userModel.js`:
  - `name` (String, required)
  - `email` (String, required, unique)
  - `password` (String, required, hashed)
  - Timestamps for `createdAt` and `updatedAt`

### API Routes

- **Register:** `src/app/api/auth/register/route.js`
  - Accepts `name`, `email`, `password`.
  - Checks for existing user, hashes password with bcrypt, saves user.
- **Login:** `src/app/api/auth/login/route.js`
  - Accepts `email`, `password`.
  - Verifies user, compares password, issues JWT, sets HTTP-only cookie.
- **Logout:** `src/app/api/auth/logout/route.js`
  - Clears the JWT cookie, ending the session.

### Authentication Flow

1. **Registration:**
   - User submits name, email, password.
   - Backend checks for existing email, hashes password, saves user.
2. **Login:**
   - User submits email, password.
   - Backend verifies credentials, issues JWT, sets it as an HTTP-only cookie.
3. **Session:**
   - JWT is stored in a cookie, sent with each request.
   - Middleware checks for token to protect private routes.
4. **Logout:**
   - Clears the JWT cookie, logging the user out.

---

## API Reference & Usage

### Base URL

- **Local:** `http://localhost:3000/api/auth/`
- **Live:** `https://myauth-nextjs-1.onrender.com/api/auth/`

### 1. Register

- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Success Response:**
  - `201 Created`
  ```json
  { "message": "User created successfully" }
  ```
- **Error Responses:**
  - `400 Bad Request` (missing fields or user exists)
  - `500 Internal Server Error`

#### Example (cURL):

```bash
curl -X POST https://myauth-nextjs-1.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"yourpassword"}'
```

### 2. Login

- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Success Response:**
  - `200 OK`
  ```json
  { "message": "Login Successfully" }
  ```
  - Sets a `token` cookie (HTTP-only, JWT)
- **Error Responses:**
  - `400 Bad Request` (missing fields)
  - `404 Not Found` (user not found)
  - `401 Unauthorized` (invalid password)
  - `500 Internal Server Error`

#### Example (cURL):

```bash
curl -X POST https://myauth-nextjs-1.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"yourpassword"}' -i
```

### 3. Logout

- **Endpoint:** `GET /api/auth/logout`
- **Success Response:**
  - `200 OK`
  ```json
  { "message": "Logout Successfully" }
  ```
  - Clears the `token` cookie
- **Error Responses:**
  - `500 Internal Server Error`

#### Example (cURL):

```bash
curl -X GET https://myauth-nextjs-1.onrender.com/api/auth/logout -i
```

### Testing with Postman

- Import the above endpoints into Postman.
- Register a user, then login.
- The `token` cookie will be set automatically; use it to access protected routes.
- To test authentication, try accessing `/profile` in the browser after login.

### Error Handling

- All API responses are JSON.
- Error messages are descriptive and use appropriate HTTP status codes.
- Always check the `error` field in the response for details.

---

## Extending the Backend

- **Add More User Fields:**
  - Edit `src/models/userModel.js` to add fields (e.g., `role`, `avatar`).
  - Update registration logic to accept and save new fields.
- **Add New API Endpoints:**
  - Create new folders/files under `src/app/api/` (e.g., `/api/auth/verify-email`).
  - Use the same pattern: connect to DB, validate input, handle errors, return JSON.
- **Add Middleware Logic:**
  - Enhance `src/middleware.js` to check for roles, permissions, or add rate limiting.
- **Integrate with Frontend:**
  - Use `fetch` or Axios in your React components to call backend APIs.
- **Testing:**
  - Use tools like Postman, Insomnia, or cURL for manual API testing.
  - Write automated tests with Jest or similar frameworks for robust coverage.

---

## Frontend Architecture

### Pages & Components

- **Login Page:** `src/app/login/page.jsx`
  - Form for email/password, calls `/api/auth/login`.
  - On success, redirects to `/profile`.
- **Register Page:** `src/app/register/page.jsx`
  - Form for name/email/password, calls `/api/auth/register`.
  - On success, redirects to `/login`.
- **Profile Page:** `src/app/profile/page.jsx`
  - Protected page, only accessible with valid JWT cookie.
  - Shows a welcome message and logout button.
- **Layout:** `src/app/layout.jsx`
  - Sets up global fonts, styling, and metadata.

### Session Handling & Middleware

- **Middleware:** `src/middleware.js`
  - Runs on every request to protected routes.
  - Redirects unauthenticated users to `/login`.
  - Redirects authenticated users away from `/login` and `/register` to `/profile`.
  - Uses the `token` cookie for session validation.

---

## Styling & Tooling

- **Tailwind CSS:** Used for all styling. See `src/app/globals.css` and `postcss.config.mjs`.
- **React Hot Toast:** For user notifications.
- **ESLint:** Configured for Next.js best practices (`eslint.config.mjs`).
- **Path Aliases:** Set in `jsconfig.json` for cleaner imports (e.g., `@/models/userModel`).

---

## Extending the Project

- **Add User Roles:**
  - Extend the user model with a `role` field (e.g., admin, user).
  - Update middleware to check for roles.
- **Add Email Verification:**
  - Send verification emails on registration.
- **Add Password Reset:**
  - Implement password reset tokens and email flow.
- **OAuth Providers:**
  - Integrate Google, GitHub, etc., using NextAuth.js or custom logic.
- **API Validation:**
  - Use libraries like Joi or Zod for request validation.

---

## Best Practices & Security

- **Never store plain passwords.** Always hash with bcrypt.
- **Use HTTP-only cookies** for JWTs to prevent XSS attacks.
- **Keep your JWT_SECRET safe** and never commit it to version control.
- **Validate all user input** on both frontend and backend.
- **Use HTTPS** in production to secure cookies and data.

---

## FAQ

**Q: Can I use this as a starter for my own project?**

- Yes! Just clone, update the branding, and extend as needed.

**Q: How do I deploy this?**

- Deploy on Vercel, Netlify, Render.com, or any Node.js-compatible host. Set your environment variables in the host's dashboard.

**Q: How do I add more fields to the user?**

- Update `userModel.js` and adjust the registration logic accordingly.

**Q: How do I protect more routes?**

- Add them to the `matcher` array in `src/middleware.js`.

---

## Credits

- Built with [Next.js](https://nextjs.org/), [MongoDB](https://mongodb.com/), [JWT](https://jwt.io/), and [bcrypt](https://github.com/kelektiv/node.bcrypt.js).

---

## License

MIT
