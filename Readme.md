# Banking Application

This is a small banking application consisting of two microservices: **Customer Service**, **Transaction Service** and **Proxy Service**. Both services are located in the same repository for testing purposes, although it is a best practice to use separate repositories for microservices.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Services Overview](#services-overview)
  - [Customer Service](#customer-service)
  - [Transaction Service](#transaction-service)
  - [Proxy Service](#proxy-service)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable network applications
- **Express.js**: Web application framework for Node.js
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript
- **MongoDB**: NoSQL database for storing data
- **Mongoose**: ODM library for MongoDB and Node.js
- **gRPC**: High-performance RPC framework for inter-service communication

## Services Overview

### Customer Service

The Customer Service is responsible for managing customer-related operations, including:

- Creating new customers
- Retrieving customer information
- Updating customer balances

### Transaction Service

The Transaction Service handles financial transactions, including:

- Top-up customer balances
- Purchase transactions
- Refund transactions
- Transfer of customer balances

The Transaction Service communicates with the Customer Service to retrieve and update customer data.

### Proxy Service

The Proxy Service acts as an intermediary between clients and the microservices in the banking application. It simplifies API interactions by routing requests to the appropriate services (Customer Service and Transaction Service) and handles CORS issues.

## Features

- Each service has its own separate database.
- Synchronous inter-service communication via gRPC.
- Basic functionalities for customer and transaction management.

## Setup and Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies for each service:

   ```bash
   yarn install
   ```

3. Run each service:

   ```bash
   yarn start dev
   ```

4. Ensure that MongoDB is running on your local machine.
5. Create a .env file in the root directory with the necessary environment variables.

## Usage

After starting the services, you can interact with the APIs using tools like Postman or curl. Here are some example endpoints:
- **Create Customer**: `POST /customers`
- **Get Customer**: `GET /customers/:id`
- **Update Balance**: `PATCH /customers/:id/balance`
- **Top-Up Balance**: `POST /transactions/top-up`
- **Purchase**: `POST /transactions/purchase`
- **Refund**: `POST /transactions/refund`
- **Transfer**: `POST /transactions/transfer`