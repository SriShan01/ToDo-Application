# ToDo-Application

A full-stack TODO application built using React.js, Node.js (Express), and MongoDB, styled using TailwindCSS and Material UI.

This project demonstrates CRUD operations, REST API integration, validation, and deployment of both frontend and backend.

# Live Demo Links
rontend (React + Vercel) - https://to-do-front-flame.vercel.app/
Backend (Express API + Vercel or Render) - https://to-do-back-silk.vercel.app/api/todos

# Tech Stack
# Frontend
React.js
TailwindCSS
Material UI
Axios
Yup Validation
React Hot Toast (error/success notifications)

# Backend
Node.js
Express.js
MongoDB / Mongoose
CORS
dotenv
Express-Validator / Yup

# Database
MongoDB Atlas
or Local Mongo instance

# Features
TODO Features
View all todos
Add new todo (title + optional description)
Edit existing todo
Mark as Done / Undone
Delete todo
Display completed tasks with styling (strikethrough and faded)
Realtime UI updates
Toast notifications
Deployed frontend + backend into Vercel
Clean UI with Tailwind + MUI
Clean folder structure

# Setup Instructions (Local Development)
Clone Repository
cd Fullstack-TODO

# Backend (server) Setup
cd server
npm install

Create .env
MONGODB_URI=mongo-uri
PORT=4000
Run Backend
npm run dev

API will be available at:
http://localhost:4000/api/todos

More backend details can be found inside: server/README.md

# Frontend (client) Setup
cd client
npm install
Create .env:
VITE_API_URL=http://localhost:4000/api

Run frontend:
npm run dev

App will be available at:
http://localhost:5173

More frontend setup notes inside: client/README.md

# API Endpoints
GET	/api/todos	Get all TODO items
POST	/api/todos	Create a TODO
PUT	/api/todos/:id	Update a TODO
PATCH	/api/todos/:id/done	Toggle done status
DELETE	/api/todos/:id	Delete a TODO

# Environment Variables Summary
Backend
MONGODB_URI=''
PORT=4000

Frontend
VITE_API_URL= http://localhost:4000/api
