Adrik Budget Tracker

A simple and intuitive web application to help users track their monthly income and expenses. Built with JavaScript and TypeScript, this app visualizes budgeting data with interactive charts for easy financial management.

---

## Features

- Add, edit, and delete income and expense entries
- Visualize your monthly income and expenses using bar and pie charts
- Responsive design for desktop and mobile use
- User-friendly interface for quick data input and review

---

## Technologies Used

- **Languages:** JavaScript, TypeScript, HTML5, CSS3  
- **Libraries:** Chart.js (or whatever you used for charts)  
- **Tools:** Visual Studio Code, Git, GitHub

---
## Screenshots

The application interface is shown below. These screenshots demonstrate the core features including adding, viewing, and managing expenses.

All images are located in the `/screenshots` folder.

## Installation
### Prerequisites

- Docker Desktop installed

### Run with Docker (Recommended)

1. Clone the repository

   ```bash
   git clone https://github.com/Adrik113/Adrik-Budget-Tracker.git
   cd Adrik-Budget-Tracker
   Start all services

   docker compose up --build

   Open the application

Frontend: http://localhost:3000

Backend API: http://localhost:8000

Stop the containers

docker compose down

Environment Variables

Create a .env file inside /backend:

MONGO_URI=mongodb://db:27017/budgettracker
PORT=8000
   

   
