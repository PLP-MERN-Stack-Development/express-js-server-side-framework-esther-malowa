# 🛍️ Express.js Product API

## 🚀 Objective
Build a RESTful API using **Express.js** that implements standard CRUD operations, proper routing, middleware implementation, and error handling.

---

## 📘 Overview
This project is part of **Week 2: Express.js – Server-Side Framework**.  
It demonstrates how to create a complete RESTful API using Express.js with features like CRUD operations, middleware for logging, authentication, validation, and error handling, as well as advanced functionality such as filtering, pagination, and product statistics.

---

## ⚙️ Setup Instructions

### 🧩 Prerequisites
- Node.js (version 18 or higher)
- npm (Node Package Manager)
- A tool for testing APIs (e.g., **Postman**, **Insomnia**, or **curl**)

---

### 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd <your-project-folder>

2. **Install dependencies:**

npm install


3. **Create a .env file based on the example provided:**

API_KEY=12345SECRETKEY
PORT=3000


4. **Start the server:**

node server.js


Server will run on:

http://localhost:3000
## API Endpoints
HTTP Method	Endpoint	Description
GET	/	Welcome message
GET	/api/products	Retrieve all products (supports filtering, search, and pagination)
GET	/api/products/:id	Retrieve a specific product by ID
POST	/api/products	Create a new product
PUT	/api/products/:id	Update an existing product
DELETE	/api/products/:id	Delete a product
GET	/api/products/stats/count	Get product statistics (count by category)

Note: All API requests must include the following header for authentication:

x-api-key: 12345SECRETKEY

### 🧩 Example API Requests
1. **Get all products**
GET /api/products
Headers: x-api-key: 12345SECRETKEY

2. **Filter by category**
GET /api/products?category=electronics
Headers: x-api-key: 12345SECRETKEY

3. **Search by product name**
GET /api/products?search=laptop
Headers: x-api-key: 12345SECRETKEY

4. **Pagination**
GET /api/products?page=1&limit=2
Headers: x-api-key: 12345SECRETKEY

5. **Create a new product**
POST /api/products
Headers: x-api-key: 12345SECRETKEY
Body (JSON):
{
  "name": "Smartwatch",
  "description": "Fitness tracking smartwatch with heart-rate monitor",
  "price": 250,
  "category": "electronics",
  "inStock": true
}

6. **Update a product**
PUT /api/products/:id
Headers: x-api-key: 12345SECRETKEY
Body (JSON):
{
  "name": "Updated Laptop",
  "description": "Updated specs with 32GB RAM",
  "price": 1500,
  "category": "electronics",
  "inStock": true
}

7. **Delete a product**
DELETE /api/products/:id
Headers: x-api-key: 12345SECRETKEY

8. **Get product statistics**
GET /api/products/stats/count
Headers: x-api-key: 12345SECRETKEY

## 🧠 Middleware Implemented
Middleware	Purpose
Logger	Logs each incoming request (method, URL, and timestamp)
Authentication	Verifies API key from request headers
Validation	Ensures valid product data during creation and updates
Error Handler	Handles all application errors globally
##🚨 Error Handling

The API includes global error handling with clear, structured responses.

Error Type	HTTP Status	Example Message
Validation Error	400	"All fields are required"
Unauthorized	401	"Missing or invalid API key"
Not Found	404	"Product not found"
Server Error	500	"Internal Server Error"

## 🔍 Advanced Features
Feature	Description
Filtering	Filter products by category using query parameters
Search	Search products by name
Pagination	Supports page and limit query parameters
Statistics	Returns product counts by category
## 🧪 Expected Outcome

A fully functional Express.js API with complete CRUD features

Middleware for logging, authentication, and validation

Global error handling with custom messages

Support for filtering, pagination, and search

## 📁 Project Files
File	Description
server.js	Main server file containing all routes and middleware
.env.example	Sample environment variables file
README.md	Project documentation

## 👩‍💻 Example .env.example
PORT=3000
API_KEY=12345SECRETKEY

## 🧠 Technologies Used

Node.js

Express.js

body-parser

uuid

dotenv

## 🏁 How to Test

You can test this API using Postman or curl.
Make sure to include the correct API key in the request header (x-api-key).

## 📚 Author

Esther Ooko
Bachelor of Science in Information Technology
Great Lakes University of Kisumu