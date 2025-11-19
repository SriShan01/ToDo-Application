# Fullstack TODO - Backend

## Tech
- Node.js, Express, Mongoose, MongoDB, Yup

## Setup
1. Install:
   npm install

2. Create .env:
   PORT=4000
   MONGO_URI=''

3. Run:
   npm run dev

## API
GET    /api/todos
POST   /api/todos           { title, description? }
PUT    /api/todos/:id       { title?, description? }
PATCH  /api/todos/:id/done
DELETE /api/todos/:id

## Notes
- Validation uses Yup.
- Works with local MongoDB or Atlas.
