# Fullstack E-commerce Website

A complete MERN stack e-commerce application built with React and Tailwind CSS on the frontend, and Node.js,
Express, and MongoDB on the backend. The platform supports user authentication, product browsing, search and
category filtering, and a persistent shopping cart.A responsive UI clone of the Huly.io website built using React 
, Tailwind CSS and framer, focusing on layout accuracy, modern animations, and clean component structure.

## Live Demo
🔗 [Demo Link](https://e-commerece-website-bice.vercel.app/)

## Screenshots
![Homepage](public/assest-huly/homepage.png)

## Features
###User Features
- User registration and login (JWT authentication)
- Secure password hashing
- Browse clothing products
- Search products by name
- Filter products by categories
- Add products to cart
- Increase / decrease cart quantity
- Persistent cart for logged-in users
- Fully responsive design

##Backend Features
- RESTful API using Express
- MongoDB database with Mongoose models
- JWT-based authentication & authorization
- Protected routes and middleware

## Tech Stack
###Frontend
- React
- Tailwind CSS
- JavaScript (ES6+)
- Vite

###Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
### Utilities
- Axios
- bcrypt
- dotenv

## Purpose of This Project
###This project was built to:
- Learn full-stack MERN development
- Implement authentication and authorization
- Design RESTful APIs
- Manage global state and user sessions
- Build real-world e-commerce features
- building responsive designs

##Installation & Setup
###Clone the Repository
```bash
git clone https://github.com/Adityarajbind/e-commerece-website.git
cd e-commerece-website
```
###Backend Setup
```bash
cd backend
npm install
npm run dev
```
###Create a .env file inside the backend folder:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
###Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

##License
This project is for educational and portfolio purposes.

