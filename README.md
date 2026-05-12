Adrik Budget Tracker

A full-stack web application that allows users to track income and expenses in a simple and organized way. Built with the MERN-style architecture (React + Node.js + MongoDB), this app uses Docker to run the entire system with one command and provides a clean API for managing financial data.

Features
Add and delete expense entries
Store and retrieve data from a MongoDB database
REST API backend built with Express.js
Fully containerized with Docker Compose
Persistent data storage across sessions
Clean and minimal React frontend UI
Technologies Used
Frontend: React, JavaScript, CSS
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Tools: Docker, Docker Compose, Git, GitHub
Installation
Clone the repository
git clone https://github.com/Adrik113/Adrik-Budget-Tracker.git
cd Adrik-Budget-Tracker
Create environment variables

Inside the backend folder, create a .env file:

MONGO_URI=mongodb://db:27017/budgettracker
PORT=8000
Run the application with Docker
docker compose up --build
Usage

Once running, open:

Frontend: http://localhost:3000
Backend API: http://localhost:8000
API Endpoints
GET /api/expenses → Get all expenses
POST /api/expenses → Add a new expense
DELETE /api/expenses/:id → Delete an expense
Notes
Environment variables are excluded from GitHub for security
MongoDB runs inside a Docker container (db)
Backend connects using Docker network (db:27017)
Author

Adrik Warren
GitHub: https://github.com/Adrik113

LinkedIn: https://www.linkedin.com/in/adrik-warren/

Portfolio: https://portfolio-ver3-blond.vercel.app/
