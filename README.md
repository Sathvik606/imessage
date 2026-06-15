# IMESSAGE 🎯

A minimal WhatsApp/iMessage-style chat application built with a MERN stack and Clerk for authentication. This repository contains a Node/Express backend and a Vite + React frontend with Socket.IO for realtime messaging and ImageKit for media uploads.

**Contents**
- backend: Express API, Socket.IO server, MongoDB models
- frontend: Vite + React app, Zustand stores, UI components

**Features ✨**
- Clerk-based authentication (webhooks to sync user profiles)
- Realtime messaging with Socket.IO
- Media upload support via ImageKit
- Conversations & users sidebar, message history

**Tech stack 🧩**
- Backend: Node.js, Express, Mongoose, Socket.IO, Clerk
- Frontend: React, Vite, Zustand, Axios
- Media: ImageKit

**Quick Start (development) 🚀**

Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)

1. Clone the repo

2. Backend setup

- Go to the backend folder and install dependencies:

```bash
cd backend
npm install
```

- Environment variables (create a `.env` in `backend` or set in your environment):

- `MONGO_URI` (required) — MongoDB connection string
- `PORT` (optional) — backend port, defaults to `3000`
- `FRONTEND_URL` (optional) — frontend origin allowed for CORS, defaults to `http://localhost:5173`
- `IMAGEKIT_PRIVATE_KEY` (optional) — ImageKit private key for media uploads
- `CLERK_WEBHOOK_SIGNING_SECRET` (optional for webhooks) — Clerk webhook signing secret

Note: Clerk-related runtime requires configuring Clerk according to their docs (frontend + backend). This repo uses `@clerk/express` and a webhook endpoint to sync user profiles. See Clerk docs for the required environment variables for your Clerk instance.

- Seed the database with sample users (optional):

```bash
npm run db:seed
```

- Start the backend dev server (uses nodemon):

```bash
npm run dev
```

The backend defaults to `http://localhost:3000`.

3. Frontend setup

- In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server runs on `http://localhost:5173` by default (Vite).

The frontend expects the backend API at `http://localhost:3000/api` during development. If you change the backend port, update `frontend/src/lib/axios.js` and `frontend/src/store/useAuthStore.js` accordingly.

**API Endpoints (backend)**
All APIs are mounted under `/api` (e.g., `http://localhost:3000/api`).

- `GET /api/auth/check` — protected; returns the authenticated user object (used by frontend to confirm auth)

Protected message routes (require Clerk auth via `protectRoute` middleware):
- `GET /api/messages/users` — returns user list for sidebar
- `GET /api/messages/conversations` — returns conversations (latest per partner)
- `GET /api/messages/:id` — returns message history with user `:id`
- `POST /api/messages/send/:id` — send a message to user `:id`; accepts multipart `media` (file field named `media`)

**Socket.IO events**
- Client connects to backend Socket.IO server with `?userId=<id>` query param (frontend sets this after auth). The server emits:
  - `getOnlineUsers` — array of online user IDs (emitted when users connect/disconnect)
  - `newMessage` — realtime delivery of a message object to the receiver socket when online

**Files of interest**
- Backend entry: [backend/src/index.js](backend/src/index.js)
- Socket helpers: [backend/src/lib/socket.js](backend/src/lib/socket.js)
- DB connection: [backend/src/lib/db.js](backend/src/lib/db.js)
- Seed script: [backend/src/seeds/user.seed.js](backend/src/seeds/user.seed.js)
- Frontend Axios instance: [frontend/src/lib/axios.js](frontend/src/lib/axios.js)
- Frontend auth store (socket connection): [frontend/src/store/useAuthStore.js](frontend/src/store/useAuthStore.js)
- Frontend chat store: [frontend/src/store/useChatStore.js](frontend/src/store/useChatStore.js)

**Notes & Troubleshooting**
- Network errors (ERR_CONNECTION_REFUSED) typically mean the backend server is not running or port mismatch. Backend defaults to `3000`; the frontend development config uses `http://localhost:3000/api` in `frontend/src/lib/axios.js` and `http://localhost:3000` for Socket.IO in `frontend/src/store/useAuthStore.js`.
- If you use a remote MongoDB (Atlas), set `MONGO_URI` accordingly.
- Image uploads require `IMAGEKIT_PRIVATE_KEY`; otherwise media uploads will respond with a 500 and a message that uploads are not configured.
- Clerk authentication requires following Clerk docs: register an application, configure Clerk frontend env vars, and provide `CLERK_WEBHOOK_SIGNING_SECRET` for webhook verification (or disable webhooks if not needed).

**Accessibility ♿️**
- Tabs in the chat sidebar include `aria-label` attributes for screen readers (see `frontend/src/components/chat/ChatSidebar.jsx`).

**Development tips**
- Run backend and frontend in separate terminals.
- Use `npm run db:seed` to populate example users if testing without Clerk in development.
- If you change ports or hosts, update `frontend/src/lib/axios.js` and `frontend/src/store/useAuthStore.js`.

**Contributing**
- Please open issues or PRs for feature requests or bug fixes. Follow standard Git conventions and add tests for critical changes.
