# NomandCraft - Preliminary Documentation

> **Note:** This is a preliminary README file. The project is still in development, and the documentation will be updated as new features are implemented.

## 📌 Table of Contents

- [Project Description](#project-description)
- [Technologies](#technologies)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Campers](#campers)
  - [Users](#users)
- [Middleware](#middleware)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Authors & Contact](#authors--contact)

📌

## Project Description

**NomandCraft** is a web application for manufacturing and selling campers. It includes a catalog of campers, user management, categories, and an advanced search, filtering, and sorting system.

<h2 id="technologies">🛠️ Technologies</h2>

### **Backend:**

- Node.js + Express.js (API server)
- MongoDB (Mongoose) - Database
- bcryptjs (Password hashing)
- JWT (JSON Web Token authentication)
- dotenv (Environment variables)
- Jest, Supertest (Backend testing)
- CORS, Morgan (Middleware for security and logging)
- Express Rate Limit (Request rate limiting)

### **Frontend:**

- Vue.js 3 (Frontend framework)
- Pinia (State management)
- Vue Router (Client-side routing)
- Tailwind CSS (Responsive styling)
- Axios (HTTP requests to API)
- Cypress, Vitest (Testing tools)

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/NomandCraft/nomandcraft-project.git
cd nomandcraft-project
```

<h2 id="installation--setup">### 2️⃣ Install Dependencies</h2>

#### Backend

```sh
cd backend
npm install
```

#### Frontend

```sh
cd ../frontend
npm install
```

### 3️⃣ Run the Project

#### Start Backend Server

```sh
cd backend
npm run dev
```

#### Start Frontend (Vue.js)

```sh
cd frontend
npm run dev
```

By default, the frontend will be available at `http://localhost:5173`, and the API at `http://localhost:5000`.

---

<h2 id="environment-variables"> 🔥 Environment Variables</h2>

Create a `.env` file in the `backend` folder and add:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/NomandCraft
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
```

---

<h2 id="api-documentation">🌍 API Documentation</h2>

### 📍 General API Format

- Base URL: `http://localhost:5000/api`
- Response Format: JSON
- Authentication via JWT token
- UTF-8 encoding

### **Campers**

#### 📌 Get a List of Campers

```
GET /api/campers?page=1&limit=10&sortBy=price&order=desc
```

#### 📌 Get Camper by ID

```
GET /api/campers/:id
```

#### 📌 Add a Camper (Requires Authorization)

```
POST /api/campers
```

#### 📌 Update a Camper by ID (PUT)

```
PUT /api/campers/:id
```

#### 📌 Delete a Camper (Admin Only)

```
DELETE /api/campers/:id
```

### **Users**

#### 📌 Register a User

```
POST /api/users
```

#### 📌 User Login (JWT Token)

```
POST /api/users/login
```

#### 📌 Get List of Users

```
GET /api/users
```

---

<h2 id="middleware">🛠️ Middleware</h2>

- **authMiddleware** – Verifies JWT token before allowing access to protected routes.
- **errorHandler** – Centralized error handler.
- **rateLimiter** – Limits requests per IP.

---

<h2 id="testing">🛠️ Testing

### 📌 Backend Testing (Jest, Supertest)

#### Run All Tests

```sh
cd backend
npm run test
```

#### Testing Scenarios:

- Camper API validation (`GET`, `POST`, `PUT`, `DELETE`)
- User authentication validation
- Error handling tests

### 📌 Frontend Testing (Vitest, Cypress)

#### Run Unit Tests (Vitest)

```sh
cd frontend
npm run test
```

#### Run End-to-End Tests (Cypress)

```sh
npm run test:e2e
```

#### Testing Scenarios:

- Vue component rendering
- Vue Router functionality
- API integration tests

---

<h2 id="deployment">🚀 Deployment</h2>

### 📌 Deploy Backend (Vercel / Render / AWS)

```sh
npm install -g vercel
vercel deploy
```

### 📌 Deploy Frontend (Netlify / Vercel)

```sh
npm run build
netlify deploy
```

---

<h2 id="project-structure">📂 Project Structure

```
nomandcraft-project/
│── backend/
│   ├── config/ (Database settings, configurations)
│   ├── controllers/ (API logic)
│   ├── middleware/ (Error handling, authentication)
│   ├── models/ (MongoDB schemas)
│   ├── routes/ (Express routes)
│   ├── tests/ (Jest API tests)
│   ├── server.js (Main entry point)
│
│── frontend/
│   ├── src/
│   │   ├── components/ (Vue components)
│   │   ├── views/ (Application pages)
│   │   ├── store/ (Pinia state management)
│   │   ├── assets/ (Images, fonts)
│   │   ├── App.vue
│   │   ├── main.js
│   ├── tests/ (Vitest tests for components)
│   ├── public/
│   ├── index.html
│   ├── vite.config.js (Vite configuration)
│
│── .env (Environment variables)
│── README.md (Documentation)
```

---

 <h2 id="authors--contact">📢 Authors & Contact</h2>

- **NomandCraft Team**
- GitHub: [NomandCraft](https://github.com/NomandCraft/nomandcraft-project)
- Email: [nomandcraft@gmail.com](mailto:nomandcraft@gmail.com)

---

> **Note:** This README will be updated as the project progresses.
