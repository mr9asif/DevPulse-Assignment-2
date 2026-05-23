# DevPulse API

A RESTful Issue Tracking API built with Node.js, Express.js, TypeScript, Neon Serverless PostgreSQL, and JWT Authentication. The API supports user authentication, role-based authorization, and issue management for contributors and maintainers.

---

## Live API

Base URL:

```text
https://dev-pulse-sand-omega.vercel.app/
```

---

## Features

- User Registration
- User Login
- JWT Authentication
- Role-Based Authorization
- Create Issues
- View Issues
- Update Issues
- Issue Status Management
- PostgreSQL Database Integration
- TypeScript Support

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Neon Serverless PostgreSQL
- JWT (JSON Web Token)
- bcrypt

---

## Project Setup

### Clone Repository

```bash
git clone https://github.com/mr9asif/DevPulse-Assignment-2.git

cd DevPulse-Assignment-2
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_secret_key
```

### Run Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

---

## Authentication

### Register User

```http
POST /api/auth/signup
```

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "contributor"
}
```

---

### Login User

```http
POST /api/auth/login
```

Request Body:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

---

## Protected Routes

All protected routes require a valid JWT token.

Pass the token in request headers:

```http
token: JWT_TOKEN
```

Example:

```http
POST /api/issues/
```

Headers:

```http
token: eyJhbGciOiJIUzI1NiIs...
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Access |
|----------|----------|----------|
| POST | /api/auth/signup | Public |
| POST | /api/auth/login | Public |

---

### Issues

| Method | Endpoint | Access |
|----------|----------|----------|
| POST | /api/issues | Authenticated User |
| PATCH | /api/issues/:id | Maintainer & Contributor |
| DELETE | /api/issues/:id | Maintainer |

---

## Create Issue

```http
POST /api/issues
```

Request Body:

```json
{
  "title": "Database connection timeout",
  "description": "Occurs under heavy load",
  "type": "bug"
}
```

---

## Update Issue

```http
PATCH /api/issues/:id
```

Request Body:

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "resolved"
}
```

> Only maintainers can update issue status.

---

## User Roles

### Contributor

- Create Issues
- View Issues
- update only his own issue if the status is open

### Maintainer

- Create Issues
- View Issues
- Update Issues
- Change Issue Status
- delete issue

---

## Response Format

Success Response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error Response:

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

## Testing the API

### Step 1: Register a User

```http
POST /api/auth/signup
```

### Step 2: Login

```http
POST /api/auth/login
```

### Step 3: Copy the JWT Token

```json
{
  "token": "YOUR_JWT_TOKEN"
}
```

### Step 4: Add Token to Headers

```http
token: YOUR_JWT_TOKEN
```

### Step 5: Access Protected Endpoints

```http
GET /api/issues
```

---

## Author

**mr9asif**

