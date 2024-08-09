# Notion

A test assignment for 99 Tech demonstrating proficiency in Express, TypeORM, and PostgreSQL.

## Description

This is a test assignment for 99 Tech that showcases skills in building applications using Express, TypeORM, and PostgreSQL. The project demonstrates the ability to create a well-structured application architecture while effectively utilizing these technologies.

The assignment highlights proficiency in developing RESTful APIs, managing database interactions through TypeORM, and ensuring robust application functionality with Express. Overall, this project serves as a testament to the capability of creating scalable and maintainable code while following best practices in software development.

## Technologies Used

- **Express**: A minimal and flexible Node.js web application framework for building APIs and web applications.
- **TypeORM**: An Object-Relational Mapping (ORM) framework that allows you to interact with databases in a type-safe manner.
- **PostgreSQL**: A powerful, open-source relational database management system used for storing application data.
- **dotenv**: A module that loads environment variables from a `.env` file into `process.env` for configuration management.
- **bcrypt**: A library to help hash passwords and manage user authentication securely.
- **express-validator**: An express.js middleware for validator.

## Run dev server

Setup .env file by .env.example and run the following commands (Make sure you have Docker installed):

```bash
npm i
npm run start:dev
```

Here's a detailed `README.md` documentation for the API routes provided by the `userRouter` in your Express.js application:

---

# User API Documentation

This document describes the API endpoints available through the `userRouter`. These endpoints allow for creating, retrieving, updating, and deleting user records.

## Table of Endpoints
    
- [Create a User](#create-a-user)
- [Get All Users](#get-all-users)
- [Get a User by ID](#get-a-user-by-id)
- [Update User Password](#update-user-password)
- [Delete a User](#delete-a-user)

## Endpoints

### Create a User

**Endpoint**: `/user`  
**Method**: `POST`  
**Description**: Creates a new user in the system.

#### Request Body

```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

#### Response

- **Status**: `200 OK`
- **Body**:
  ```json
  {
    "message": "User successfully created"
  }
  ```

### Get All Users

**Endpoint**: `/user`  
**Method**: `GET`  
**Description**: Retrieves a list of all users.

#### Response

- **Status**: `200 OK`
- **Body**:
  ```json
  {
    "users": [
      {
        "id": "number",
        "username": "string",
        "email": "string",
        ...
      }
    ]
  }
  ```

### Get a User by ID

**Endpoint**: `/user/:id`  
**Method**: `GET`  
**Description**: Retrieves a user by their unique ID.

#### URL Parameters

- `id` (required): The unique identifier of the user.

#### Response

- **Status**: `200 OK`
- **Body**:
  ```json
  {
    "user": {
      "id": "number",
      "username": "string",
      "email": "string",
      ...
    }
  }
  ```

### Update User Password

**Endpoint**: `/user/password`  
**Method**: `PATCH`  
**Description**: Updates the password for the authenticated user.

#### Request Body

```json
{
  "userId": "number",
  "oldPassword": "string",
  "newPassword": "string"
}
```

#### Response

- **Status**: `200 OK`
- **Body**:
  ```json
  {
    "message": "Password successfully changed"
  }
  ```

### Delete a User

**Endpoint**: `/user/:id`  
**Method**: `DELETE`  
**Description**: Deletes a user by their unique ID.

#### URL Parameters

- `id` (required): The unique identifier of the user.

#### Response

- **Status**: `200 OK`
- **Body**:
  ```json
  {
    "message": "User successfully deleted"
  }
  ```

