# Teacher Profile Management System

##  Project Overview

Teacher Profile Management System is a full-stack web application that allows administrators to manage teacher profiles efficiently.
Users can create, edit, view, and manage teacher information with image upload and authentication features.

---

##  Features

*  Secure Login Authentication
*  Add / Edit / Delete Teacher Profiles
*  Upload and Preview Teacher Images
*  Download Reports (Excel / PDF)
*  REST API Integration
*  PostgreSQL Database
*  Login Tracking (IP, Browser, Device)
*  Cloud Deployment

---

### Frontend

* React.js
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Multer (Image Upload)
* JWT Authentication

### Database

* PostgreSQL

### Deployment

* Backend: Render
* Frontend: Vercel

---

## Project Structure

```
Teacher-Profile-System
│
├── Frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│
├── Backend
│   ├── routes
│   ├── controllers
│   ├── config
│   ├── uploads
│   └── server.js
```

---

## ⚙️ Environment Variables

### Backend (.env)

```
DATABASE_URL=your_postgres_database_url
JWT_SECRET=your_secret_key
PORT=3400
```

### Frontend (.env)

```
VITE_API_URL=https://your-backend-url
```

---

##  Run Project Locally

### Backend

```
cd Backend
npm install
npm start
```

### Frontend

```
cd Frontend
npm install
npm run dev
```

---

## Live Demo

Frontend: https://teacher-profile-dhalai.vercel.app

Backend API: https://teacher-profile-dhalai.onrender.com

---

## Screenshots

(Add project screenshots here)

---

##  Author

**Anuj Kumar**

BCA Graduate | Full Stack Developer

Skills:

* React.js
* Node.js
* PostgreSQL
* REST APIs
* AWS / Cloud Deployment

---
