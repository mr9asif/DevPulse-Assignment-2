# DevPulse API

A RESTful Issue Tracking API built with Node.js, Express, TypeScript, PostgreSQL, and JWT Authentication.

## Features

- User Registration
- User Login
- JWT Authentication
- Role-based Authorization (Contributor / Maintainer)
- Create Issues
- Update Issues
- Protected Routes
- PostgreSQL Database

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT
- bcrypt

## Installation

```bash
git clone <repository-url>

cd devpulse

npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

## Run Project

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

## Authentication

### Signup

```http
POST /api/auth/signup
```

### Login

```http
POST /api/auth/login
```

Successful login returns a JWT token.

## Protected Routes

For all protected routes, send the JWT token in request headers:

```http
token: <JWT_TOKEN>
```

Example:

```http
GET /api/issues

Headers:
token: eyJhbGciOiJIUzI1NiIs...
```

## Issue APIs

### Create Issue

```http
POST /api/issues
```

### Get All Issues

```http
GET /api/issues
```

### Update Issue

```http
PATCH /api/issues/:id
```

## User Roles

### Contributor

- Create issues
- View issues
- can update his own issue if the issue status is open

### Maintainer

- Create issues
- View issues
- Update issues
- Change issue status
- delete issue

## API Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

## Author

mr9asif
