# DeltaTrack

A backend service for tracking bugs and errors in web applications, similar to TrackJS. DeltaTrack provides a robust API for capturing, storing, and managing error events from your applications.

## Purpose

DeltaTrack is designed to help developers monitor and debug their applications by collecting error events, exceptions, and debugging information in real-time. It provides a centralized system for tracking issues across your applications, making it easier to identify, analyze, and resolve bugs quickly.

## Features

- **Event Ingestion**: RESTful API endpoint for receiving error events from client applications
- **Project-based Tracking**: Organize errors by project using project keys
- **Authentication**: Secure authentication system with JWT tokens
- **User Management**: User accounts and role management
- **API Documentation**: Swagger/OpenAPI documentation available at `/api`
- **Email Notifications**: Email integration for alerts and notifications
- **Database**: PostgreSQL database for storing events and user data

## Tech Stack

- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger/OpenAPI
- **Email**: Nodemailer with Gmail integration

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sdk-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_db_name
EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
JWT_SECRET=your_jwt_secret
```

4. Run database migrations (if applicable)

### Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Documentation

Once the application is running, you can access the Swagger API documentation at:
```
http://localhost:3000/api
```

## Usage

### Ingesting Events

To send error events to DeltaTrack, make a POST request to the `/events/ingest` endpoint:

```bash
curl -X POST http://localhost:3000/events/ingest \
  -H "Content-Type: application/json" \
  -H "x-project-key: your-project-key" \
  -d '{
    "error": "Example error message",
    "stack": "Error stack trace...",
    "url": "https://example.com/page",
    "timestamp": "2024-01-01T00:00:00Z"
  }'
```

## Project Structure

```
src/
├── auth/           # Authentication module
├── events/         # Event tracking module
├── users/          # User management module
├── common/         # Shared DTOs and utilities
├── config/         # Configuration files
└── main.ts         # Application entry point
```

## Development

```bash
# Run linter
npm run lint

# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## License

This project is private and unlicensed.
