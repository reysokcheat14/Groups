# Class Management System

A simple role-based class management system for students, teachers, and admins. Built with Node.js, Express, and Firebase, with a static HTML/JS/CSS frontend.

## 🚀 Project Overview

This web application allows:

- Students to join classes, submit assignments, and view grades
- Teachers to create/manage classes, view and grade submissions
- Admins to manage users and classes

## 🛠️ Tech Stack

### Frontend

- Plain HTML, CSS, and JavaScript (see `public/`)
- Firebase JS SDK for authentication and Firestore database

### Backend

- Node.js with Express.js (`server/server.js`)
- Serves static files and provides REST API endpoints

## 📁 Project Structure

Groups/
└── Groups/
└── class-management-system/
├── public/ # Static frontend files (HTML, JS, CSS)
│ ├── admin.html, student.html, teacher.html, login.html, ...
│ ├── admin.js, student.js, teacher.js, dashboard.js, ...
│ ├── styles.css, firebase-config.js
├── server/
│ └── server.js # Express backend
├── package.json # Project metadata and scripts
└── package-lock.json

## 👥 User Roles & Features

### Student

- Join classes using a code
- View assignments for joined classes
- Submit assignments
- View grades and feedback

### Teacher

- Create and manage classes
- Create assignments
- View and grade student submissions
- Delete classes

### Admin

- Manage users (students, teachers)
- Manage classes

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation & Run

1. Open a terminal and navigate to the project folder:

```bash
cd Groups/Groups/class-management-system
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
# or for auto-reload during development
npm run dev
```

4. Open your browser and go to:

```
http://localhost:3000
```

## 📚 API Endpoints

The Express backend provides simple REST endpoints for users, classes, assignments, and submissions. See `server/server.js` for details.

## 🔐 Authentication & Data

- Uses Firebase for authentication and Firestore for data storage (see `public/firebase-config.js`).
- Fallback to local sample data if Firebase is unavailable.

## 🎨 UI/UX Features

- Responsive static pages for each role
- Role-based navigation and access
- Simple modals and transitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Min Phanith and team

## 🙏 Acknowledgments

- Object-Oriented Analysis and Design Course Requirements
- Open source community for tools and libraries

---

This README now matches your actual project structure and technology. If you need more details or want a README in another folder, let me know!

## 👥 User Roles & Features

### 👨‍🎓 Student

- View and enroll in classes
- Access assignments and quizzes
- Submit assignments
- Take quizzes
- Track academic progress
- View grades and feedback

### 👨‍🏫 Teacher

- Create and manage classes
- Create assignments and quizzes
- Grade student submissions
- Track class performance
- Manage student enrollments

### 👨‍💼 Admin

- User management (students, teachers)
- Class management
- Assignment and Quiz management
- System-wide analytics
- Platform configuration

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory**
   ```bash
   cd OOAD-PROJECT
   ```

### Backend Setup

- cd backend
- npm install
  Server will run on http://localhost:5000

### Environment Configuration

- Create a .env file in the backend directory:
- PORT=5000
- MONGODB_URI=mongodb://localhost:27017/student-hub
- JWT_SECRET=your-jwt-secret-key
- NODE_ENV=development

### Frontend Setup

- cd ../student-hub
- npm install
  Server will run on http://localhost:8080

### 📚 API Endpoints

Authentication

- POST /api/auth/register - User registration
- POST /api/auth/login - User login

Classes

- GET /api/classes - Get all classes
- POST /api/classes - Create new class
- GET /api/classes/:id - Get class details
- DELETE /api/classes/:id - Delete class
- PUT /api/classes/:id - Update class

Assignments

- GET /api/assignments - Get assignments
- POST /api/assignments - Create assignment
- GET /api/assignments/:id - Get assignment details
- DELETE /api/assignments/:id - Delete assignment
- PUT /api/assignments/:id - Update assignment

Quizzes

- GET /api/quizzes - Get quizzes
- POST /api/quizzes - Create quiz
- GET /api/quizzes/:id - Get quiz details
- POST /api/quizzes/:id/submit - Submit quiz

### 🗃️ Database Models

- User - Students, Teachers, Admins
- Class - Course information
- Assignment - Homework and projects
- Quiz - Assessments and tests
- Submission - Student work submissions
- Grade - Evaluation results

### 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC)
- Protected routes for different user types
- Session management with secure tokens

### 🎨 UI/UX Features

- Responsive design for all devices
- Modern and clean interface
- Role-based dashboard redirection
- Accessible components

### 🚧 Development

You can run both frontend and backend from the root directory:

# Terminal 1 - Backend

cd backend
npm run dev

# Terminal 2 - Frontend

cd student-hub
npm run dev

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

### 📄 License

This project is licensed under the MIT License.

### 👥 Authors

- Min Phanith and team- OOAD Project.

### 🙏 Acknowledgments

- Object-Oriented Analysis and Design Course Requirements
- Open source community for amazing tools and libraries
- Instructor for guidelines (Mao Makara)

This README now correctly reflects your project structure with:

- **OOAD-PROJECT** as the root folder
- **backend** as the backend subfolder
- **student-hub** as the frontend subfolder

The instructions are updated to navigate between these directories properly for setup and running the application.
