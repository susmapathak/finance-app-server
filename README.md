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

##
# Deploying Node.js Express REST API from GitHub to AWS EC2

## 1. Set Up a MongoDB Database

### Option 1: MongoDB Atlas
1. Sign up for MongoDB Atlas at https://www.mongodb.com/cloud/atlas.
2. Create a free cluster.
3. Add a user and whitelist your IP for access.
4. Get the connection string, e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydb`.

### Option 2: Self-hosted MongoDB (EC2)
1. Launch an EC2 instance (Ubuntu recommended).
2. Install MongoDB on the EC2 instance:
   - `sudo apt update`
   - `sudo apt install -y mongodb`
   - `sudo systemctl start mongodb`
3. Configure MongoDB for remote access by editing the `mongod.conf` file.
4. Restart MongoDB and note the public IP and port for future connections.

## 2. Launch an EC2 Instance

1. **Log into AWS Management Console**
   - Navigate to the EC2 Dashboard.

2. **Launch a New EC2 Instance**
   - Click on "Launch Instance."
   - Choose an Ubuntu Server AMI.
   - Select an instance type (e.g., t2.micro for the free tier).
   - Configure instance details as needed.
   - Add storage if necessary.
   - Configure the Security Group to allow HTTP (port 80), HTTPS (port 443), and SSH (port 22) access.
   - Launch the instance and download the key pair (.pem file).

## 3. SSH into Your EC2 Instance

1. **Connect to EC2 Instance**
   - Use the key pair to SSH into your EC2 instance:
     ```
     ssh -i /path/to/key.pem ubuntu@ec2-xx-xxx-xxx-xxx.compute-1.amazonaws.com
     ```

## 4. Set Up the Environment

1. **Update Package List**
   - `sudo apt update`

2. **Install Node.js and NPM**
   - Install Node.js and npm:
     ```
     sudo apt install nodejs npm
     ```

3. **Install Git**
   - Install Git if it's not already installed:
     ```
     sudo apt install git
     ```

## 5. Clone Your GitHub Repository

1. **Clone the Repository**
   - Navigate to the desired directory and clone your repository:
     ```
     git clone https://github.com/your-username/your-repo.git
     ```
   - Change to the project directory:
     ```
     cd your-repo
     ```

## 6. Install Project Dependencies

1. **Install Dependencies**
   - Run npm install to install the project's dependencies:
     ```
     npm install
     ```

## 7. Configure Environment Variables

1. **Create a .env File**
   - Create a `.env` file in your project directory with the necessary environment variables (e.g., port, MongoDB URI).

## 8. Run the Application

1. **Start the Application**
   - Run your application using Node.js:
     ```
     node index.js
     ```

2. **(Optional) Use PM2 for Process Management**
   - Install PM2 to manage your application:
     ```
     sudo npm install pm2@latest -g
     ```
   - Start your application with PM2:
     ```
     pm2 start index.js
     ```
   - Configure PM2 to start on boot:
     ```
     pm2 startup
     pm2 save
     ```

## 9. Configure NGINX as a Reverse Proxy

1. **Install NGINX**
   - Install NGINX:
     ```
     sudo apt install nginx
     ```

2. **Create an NGINX Configuration File**
   - Create a new configuration file for your application:
     ```
     sudo nano /etc/nginx/sites-available/your-app
     ```
   - Add the following configuration:
     ```
     server {
       listen 80;

       server_name your_domain_or_public_ip;

       location / {
         proxy_pass http://localhost:3000;
         proxy_set_header Host $host;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header X-Forwarded-Proto $scheme;
       }
     }
     ```

3. **Enable the Configuration**
   - Create a symbolic link to enable the configuration:
     ```
     sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
     ```

4. **Test and Restart NGINX**
   - Test the NGINX configuration:
     ```
     sudo nginx -t
     ```
   - Restart NGINX:
     ```
     sudo systemctl restart nginx
     ```
#
# CI/CD with GitHub Actions for Deploying to AWS EC2

## 1. Set Up GitHub Actions Workflow

1. **Navigate to Your Repository**
   - Go to your GitHub repository where you want to set up CI/CD.

2. **Create a Workflow Directory**
   - In your repository, create a `.github/workflows` directory if it doesn’t already exist.

3. **Create a Workflow YAML File**
   - Create a new file in the `.github/workflows` directory, e.g., `deploy.yml`.

## 2. Define Your Workflow Configuration

1. **Basic Workflow Configuration**
   - Open the `deploy.yml` file and define the basic structure:
     ```yaml
     name: Deploy to EC2

     on:
       push:
         branches:
           - main
       pull_request:
         branches:
           - main
     ```

2. **Define Jobs and Steps**
   - Add jobs and steps for your CI/CD pipeline. For example:
     ```yaml
     jobs:
       deploy:
         runs-on: ubuntu-latest

         steps:
           - name: Checkout code
             uses: actions/checkout@v3

           - name: Set up Node.js
             uses: actions/setup-node@v3
             with:
               node-version: '16'

           - name: Install dependencies
             run: npm install

           - name: Run tests
             run: npm test

           - name: Build application
             run: npm run build

           - name: Deploy to EC2
             uses: easingthemes/ssh-deploy@v2
             with:
               ssh-private-key: ${{ secrets.EC2_SSH_KEY }}
               remote-user: ubuntu
               server-ip: ${{ secrets.EC2_IP }}
               remote-path: /path/to/your/app
               local-path: .
               rsync-options: -avz
     ```

## 3. Add Secrets for Deployment

1. **Navigate to Repository Settings**
   - Go to your GitHub repository’s Settings tab.

2. **Add Secrets**
   - Under "Secrets and variables", click on "Actions".
   - Add the following secrets:
     - `EC2_SSH_KEY`: Your private SSH key used for accessing your EC2 instance.
     - `EC2_IP`: The public IP address of your EC2 instance.

## 4. SSH Key Setup

1. **Generate SSH Key Pair**
   - If you don't have an SSH key pair, generate one on your local machine:
     ```bash
     ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
     ```

2. **Add SSH Key to EC2**
   - Copy the public key (`.pub` file) to the `~/.ssh/authorized_keys` file on your EC2 instance.

3. **Add Private Key to GitHub Secrets**
   - Copy the contents of your private key file (`id_rsa`) and add it to the `EC2_SSH_KEY` secret in GitHub.

## 5. Commit and Push Your Workflow

1. **Commit Changes**
   - Commit and push your workflow file to the repository:
     ```bash
     git add .github/workflows/deploy.yml
     git commit -m "Add GitHub Actions CI/CD workflow for EC2 deployment"
     git push origin main
     ```

## 6. Monitor Your Workflow

1. **Check Workflow Status**
   - Go to the "Actions" tab of your GitHub repository to see the status of your workflow runs.
   - Review the logs to ensure your CI/CD pipeline is executing and deploying correctly.

## 7. Verify Deployment

1. **Check Application on EC2**
   - Open a web browser and navigate to your EC2 instance’s public IP or domain to ensure your application is running correctly.

