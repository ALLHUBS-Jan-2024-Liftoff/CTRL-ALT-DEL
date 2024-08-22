# Easy Market Place

Welcome to **Easy Market Place** – a React-based e-commerce web application where sellers can manage their products, and buyers can browse, search, and purchase products with ease.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

- **Seller Functionality:**
  - Create, read, update, and delete (CRUD) products.
  - Create and list product categories
  - Manage product details including name, description, price, and images.
  
- **Buyer Functionality:**
  - List all products.
  - Search for products by product name.
  - View product details on a dedicated product page.
  - Add products to a cart and manage cart items.
  - Secure checkout process using Stripe API integration.


## Demo

You can run the application locally by following the installation and usage instructions below.

## Technologies Used

- **Frontend:**
  - React
  - HTML, CSS, JavaScript
  - Vite for development and build tooling
  - Axios for API requests
  - Bootstrap for styling
  
- **Backend:**
  - Spring Boot
  - Hibernate JPA for ORM
  - MySQL database
  - Stripe API for payment processing

- **Tools:**
  - Postman for API testing
  - Stripe API for payment gateway integration

## Installation

1. **Clone the Repository:**
   git clone https://github.com/CTRL-ALT-DEL/easy-market-place.git
   cd easy-market-place

2. Front end setup
   cd frontend
   npm install

3. Backend Setup
    - Ensure you have MySQL installed and running.
    - Create a new database named easy_market_place.
    - Configure your database connection in the application.properties file.
    - Run the Spring Boot application.

4. Start the Development Server:
     npm run dev

## Usage
    - Sellers can log in to their account to manage products and categories.
    - Buyers can browse products, add them to the cart, and proceed to checkout.
    - Admins can manage site-wide settings and monitor activities.

## API Endpoints
- **Product Management
GET /api/product: Retrieve all products.
POST /api/product/new: Create a new product.
PUT /api/product/{productID}: Retrieve details of a single product.
POST /api/products/update: Update product details.
DELETE /api/product/delete: Delete a product.

- **Category Management
GET /api/productCategory: Retrieve all categories.
PUT /api/productCategory/{categoryID}: Retrieve a category.
POST /api/productCategory/new: Create a new category.

## Contributing
Contributions are welcome! Please follow these steps:

    Fork the repository.
    Create a new branch (git checkout -b feature-name).
    Commit your changes (git commit -m 'Add some feature').
    Push to the branch (git push origin feature-name).
    Open a pull request.
 
