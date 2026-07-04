# AirCNC

AirCNC is a full-stack JavaScript accommodation platform inspired by Airbnb.
It allows users to browse and interact with rental listings using a modern React frontend and an Express + MongoDB backend API.

🌐 **Live Client:** https://air-cnc-588ed.web.app/  

---

## Project Overview

AirCNC is built with a JavaScript client-server architecture:

- **Client:** React + Vite (UI, routing, booking flow)
- **Server:** Express + MongoDB (REST APIs, data persistence)
- **Database:** MongoDB Atlas (`aircncDb`)

This project supports two core user roles:
- **Host:** creates and manages room listings
- **Guest:** browses rooms and books stays

---

## Core Features (Implemented)

- User upsert by email (`PUT /users/:email`)
- Fetch user profile/role by email (`GET /users/:email`)
- Host can post rooms (`POST /post-rooms`)
- List all rooms (`GET /rooms`)
- Get rooms by host email (`GET /rooms/:email`)
- Get single room details (`GET /room/:id`)
- Create bookings (`POST /bookings`)
- Fetch guest bookings by email query (`GET /bookings?email=...`)
- Delete booking (`DELETE /bookings/:id`)
- Delete host room (`DELETE /rooms/:id`)
- Toggle room booked status (`PATCH /rooms/status/:id`)

---

## Tech Stack

### Frontend (`client`)
- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Firebase
- date-fns
- react-date-range
- react-hot-toast
- react-icons

### Backend (`server`)
- Node.js
- Express
- MongoDB Node Driver
- dotenv
- cors
- morgan (installed)

---

## Repository Structure

```bash
AirCNC/
├── client/
│   ├── src/
│   ├── package.json
│   └── ...
├── server/
│   ├── index.js
│   ├── package.json
│   └── ...
├── README.md
└── .gitignore
```

---

## How to Run Locally

## 1) Clone repository

```bash
git clone https://github.com/farhannilok/AirCNC.git
cd AirCNC
```

## 2) Install dependencies

### Client
```bash
cd client
npm install
```

### Server
```bash
cd ../server
npm install
```

## 3) Add environment variables

Create `server/.env`:

```env
PORT=5000
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
```

> Your server builds Mongo URI as:
> `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.kqr4p9m.mongodb.net/?retryWrites=true&w=majority`

If frontend uses Firebase env vars, add them in `client/.env` with `VITE_` prefix.

## 4) Start development servers

### Run backend
```bash
cd server
npm run dev
```

### Run frontend (new terminal)
```bash
cd client
npm run dev
```

---

## How AirCNC Works (Actual Backend Flow)

## 1. Server Boot
- Loads env config with `dotenv`
- Enables CORS with open origin (`origin: '*'`)
- Parses JSON request body using `express.json()`
- Connects Mongo client and initializes collections:
  - `users`
  - `rooms`
  - `bookings`

## 2. User Handling
- `PUT /users/:email`
  - Upserts user data by email
  - Useful for first login + role persistence
- `GET /users/:email`
  - Returns user document (e.g., role/profile)

## 3. Room Lifecycle
- `POST /post-rooms`
  - Host submits room data and inserts into `rooms` collection
- `GET /rooms`
  - Returns all rooms
- `GET /rooms/:email`
  - Returns rooms where `host.email` matches param
- `GET /room/:id`
  - Returns one room by MongoDB ObjectId
- `DELETE /rooms/:id`
  - Host removes room by id
- `PATCH /rooms/status/:id`
  - Updates room `booked` boolean status

## 4. Booking Lifecycle
- `POST /bookings`
  - Inserts `req.body.bookingData` into bookings collection
- `GET /bookings?email=...`
  - Returns bookings where `guest.email` matches query email
  - If email missing, returns `[{ error: 'Forbidden' }]`
- `DELETE /bookings/:id`
  - Removes booking document by id

## 5. Health Route
- `GET /`
  - Returns `AirCNC Server is running..`

---

## API Reference

## User
- `PUT /users/:email`  
  Upsert user document by email.
- `GET /users/:email`  
  Get single user by email.

## Rooms
- `POST /post-rooms`  
  Add a room (host).
- `GET /rooms`  
  Get all rooms.
- `GET /rooms/:email`  
  Get all rooms posted by a host email.
- `GET /room/:id`  
  Get room details by id.
- `DELETE /rooms/:id`  
  Delete a room.
- `PATCH /rooms/status/:id`  
  Update room booked status.

## Bookings
- `POST /bookings`  
  Save booking (`bookingData` in body).
- `GET /bookings?email=user@email.com`  
  Get bookings by guest email.
- `DELETE /bookings/:id`  
  Delete booking.

---

## Scripts

### Client (`client/package.json`)
- `npm run dev` → start Vite dev server
- `npm run build` → production build
- `npm run preview` → preview build
- `npm run lint` → lint source

### Server (`server/package.json`)
- `npm run dev` → nodemon index.js
- `npm start` → node index.js

---

## Important Notes

- CORS currently allows all origins (`origin: '*'`), which is fine for development but should be restricted in production.
- `GET /bookings` currently returns a custom error payload instead of HTTP 403 status code when email is missing.
- Routes `/rooms/:email` and `/rooms/:id` are both under `/rooms`; current implementation avoids conflict because `DELETE /rooms/:id` uses a different HTTP method, but naming can still be improved for clarity.

---

## Suggested Improvements (Next Version)

- Add JWT authentication + route protection
- Enforce role-based access for host actions
- Use proper HTTP status codes (`403`, `400`, `404`)
- Add request validation (e.g., Zod/Joi/express-validator)
- Restrict CORS origin in production
- Add pagination/filter/search on rooms API
- Add transaction-safe booking (prevent race conditions)
- Write API docs with Swagger/OpenAPI
- Add tests (unit + integration)

---

## Author

**Farhan Nilok**  
GitHub: https://github.com/farhannilok
