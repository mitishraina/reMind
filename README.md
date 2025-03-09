# reMind

## Overview
reMind is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It is designed to help users securely store, manage, and retrieve their passwords. The application features a user-friendly interface and ensures data security through robust backend integration.

## Features
- **Password Management**: Store and retrieve passwords for various websites.
- **User-Friendly Interface**: Clean and intuitive UI built with React.js.
- **Secure Data Storage**: Passwords are securely stored in a MongoDB database.
- **Interactive Icons**: Hover-triggered icons for better user experience.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API Testing**: Postman API

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-folder/reMind.git
   ```
2. Navigate to the project directory:
   ```bash
   cd reMind
   ```
3. Install dependencies:
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```
4. Create a `.env` file in the `backend` folder and add the following:
   ```env
   MONGO_URI= "your mongodb connection string"
   ```
5. Start the development servers:
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm start
     ```
6. Open your browser and navigate to `http://localhost:3000` to access the application.


![reMind](https://github.com/user-attachments/assets/8a7e2369-b64e-4ef1-8461-a4b31f866fa0)

![image](https://github.com/user-attachments/assets/4fdf105b-fcc1-4f28-9ff2-3996d8dbaec2)



## Future Enhancements
- Implement user authentication for added security.
- Add password encryption before storing in the database.
- Integrate categories/tags for better organization of passwords.
- Deploy the application on a cloud platform for public access.

## Author
**Mitish Raina**
- [GitHub Profile](https://github.com/mitishraina)
- [LinkedIn Profile](https://www.linkedin.com/in/mitishraina)
