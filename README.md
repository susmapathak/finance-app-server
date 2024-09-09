# Asset Finance Management Platform - API

This is an Express.js server application for managing user authentication, asset finance applications, and user data. The application uses MongoDB for data storage and JWT for secure user authentication. This guide provides instructions on how to set up the server locally for development purposes.

## Features

- User Registration and Login (with JWT token generation)
- Protected routes for creating finance applications
- MongoDB integration for data persistence

## Prerequisites

Ensure that you have the following installed on your local machine:

- Node.js (v14 or later)
- MongoDB Atlas (or a local MongoDB server)
- Git

## Getting Started

1. **Clone the repository:**

   Run the following commands in your terminal:

   `git clone <your-repository-url>`

   `cd <repository-directory>`

2. **Install dependencies:**

   Run:

   `npm install`

3. **Environment Setup:**

   Create a `.env` file in the root of the project directory and add the following environment variables:

   `MONGODB_URI=your-mongodb-cluster-url`

   `JWT_SECRET=your-jwt-secret-key`

   `PORT=5000`

   - `MONGODB_URI`: The MongoDB connection string (you can use MongoDB Atlas or a local MongoDB instance).
   - `JWT_SECRET`: A secret key for generating and verifying JWT tokens.
   - `PORT`: The port number for the server (default is 5000).

4. **Start the server:**

   Run the following command to start the server:

   `npm start`

   The server will start running on `http://localhost:5000`.

## API Endpoints

### User Authentication

#### Register a User

- **Endpoint**: `POST /api/auth/register`
- **Description**: Register a new user by providing their name, email, and password.
- **Body**:

   `{
     "name": "John Doe",
     "email": "johndoe@example.com",
     "password": "yourpassword"
   }`

- **Response**:

   `{
     "message": "User registered successfully"
   }`

#### Login a User

- **Endpoint**: `POST /api/auth/login`
- **Description**: Login a registered user by providing email and password, returns a JWT token.
- **Body**:

   `{
     "email": "johndoe@example.com",
     "password": "yourpassword"
   }`

- **Response**:

   `{
     "token": "your-jwt-token"
   }`

### Applications

#### Create a New Application

- **Endpoint**: `POST /api/applications`
- **Description**: Create a new finance application (protected route, requires JWT token).
- **Headers**:

   `Authorization: Bearer your-jwt-token`

- **Body**:

   `{
     "name": "Application 1",
     "income": 50000,
     "expenses": 30000,
     "assets": 150000,
     "liabilities": 20000
   }`

- **Response**:

   `{
     "_id": "appId",
     "user": "userId",
     "name": "Application 1",
     "income": 50000,
     "expenses": 30000,
     "assets": 150000,
     "liabilities": 20000
   }`
