# Stackoverfaux: Full Stack Developer Code Challenge

This project models a simple version of a Stack Overflow-like site. It includes a **PostgreSQL** database layer, a **Node.js**/**Express** API, and a frontend client built with **React**. The application demonstrates core features such as displaying questions and answers, adding new content, and managing users.

The main focus is on:

- Data modeling with PostgreSQL.
- API design with REST principles.
- User authentication with **JWT** (JSON Web Tokens).
- Frontend interactions built with React and **Material-UI**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Environment Setup](#environment-setup)
  - [Running Migrations](#running-migrations)
  - [Seeding the Database](#seeding-the-database)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Enhancements & Future Improvements](#enhancements--future-improvements)

---

## Features

- View all questions and their corresponding answers and comments.
- Create new questions, answers, and comments.
- Delete answers by the creator.
- Authentication with **JWT**, including **login** and **registration**.
- Backend services containerized with **Docker** for easy setup and deployment.
- Scalable data modeling to support future features.

---

## Tech Stack

- **Backend**:

  - Node.js
  - Express.js
  - Sequelize ORM
  - PostgreSQL
  - JWT Authentication

- **Frontend**:

  - React
  - Material-UI

- **Containerization**:
  - Docker
  - Docker Compose

---

## Installation

1. Prerequisites

   - **Docker** and **Docker Compose** must be installed and running.
   - **Git** for cloning the repository.

2. Clone the Repository

   To start, clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/sam-watford/stackoverfaux.git
   ```

   or use SSH:

   ```bash
   git clone git@github.com:sam-watford/stackoverfaux.git
   ```

3. Navigate into the project directory:

   ```
   cd stackoverfaux
   ```

4. Environment Setup

   Create a `.env` file in the `backend/config/` directory by copying the provided `.env.example`:

   ```
   cp backend/config/.env.example backend/config/.env
   ```

   Modify the `.env` file as necessary to reflect your local setup (for example, setting up PostgreSQL credentials, JWT_SECRET, etc.).

5. Running Migrations

   To apply the database schema and create the necessary tables using Sequelize migrations, run the following command inside the Docker container:

   ```
   docker-compose exec backend npx sequelize-cli db:migrate
   ```

   This will execute the migrations and set up the tables in the PostgreSQL database.

6. Seeding the Database

   To populate the database with initial data (questions, answers, comments, and users), run the following seed command:

   ```
   docker-compose exec backend npx sequelize-cli db:seed:all
   ```

   This will insert the data into the `users`, `questions`, `answers`, and `comments` tables.

## Running the Application

Once the environment is set up, you can start the application using Docker Compose. This will launch the backend, frontend, and database services.

- Build and run the Docker containers:

  ```
  docker-compose up --build
  ```

- Access the application:

  - Frontend: Navigate to http://localhost:3000 to view the React frontend.
  - Backend API: The API will be available at http://localhost:5000.

## API Documentation

- The complete API documentation, including endpoints and their details, is available in the `backend/documentation.md` file.
  Please refer to this file for a detailed overview of the API design, request/response formats, and error handling.

## Enhancements & Future Improvements

Here are some potential areas for improvement and future enhancements:

1. User Profile Management:

   - Currently, the user management system is minimal. Adding user profile pages with editable details (e.g., email, bio, password) could enhance the user experience.

2. Pagination for Efficiency:

   - Currently, the API returns all results (questions, answers, comments) in one go, which can be inefficient for large datasets. Pagination can be implemented to return results in smaller chunks (e.g., 10 or 20 items per page).
   - This can be achieved using Sequelize's limit and offset features.

3. Search Functionality:

   - Adding a search feature would allow users to search for questions by keywords. This can be implemented using PostgreSQL full-text search or integrated with ElasticSearch for advanced search capabilities.

4. Soft Deletion with isDeleted Column:

   - Instead of fully deleting records (questions, answers, comments), a soft deletion mechanism can be added by introducing an isDeleted boolean column in the database. This allows for a reversible deletion process and better data integrity.

5. Role-Based Access Control (RBAC):

   - Introducing different user roles (e.g., admin, moderator) would allow better management of content and privileges within the system.

6. Testing:

   - Adding unit and integration tests for the API endpoints and core business logic would improve reliability and maintainability.
