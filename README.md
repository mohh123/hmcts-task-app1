# HMCTS DTS Developer Challenge – Junior Software Developer

This project is my submission for the HMCTS DTS Developer Challenge (Junior).  
It provides a simple full-stack application for creating and storing tasks.

## Features

- Backend built with Node.js and Express
- SQLite database using better-sqlite3
- API endpoint for creating tasks
- Frontend built with HTML, CSS, and JavaScript
- Displays confirmation and task details after creation
- Validation and error handling
- Unit tests using Jest and Supertest

## Task Model

Each task includes:
- title (required)
- description (optional)
- status (required)
- dueDateTime (required)

## API Documentation

### POST /api/tasks  
Creates a new task.

Example request body:
    {
      "title": "Example task",
      "description": "Optional text",
      "status": "Not started",
      "dueDateTime": "2025-01-01T10:00:00.000Z"
    }

Example success response:
    {
      "task": {
        "id": 1,
        "title": "Example task",
        "description": "Optional text",
        "status": "Not started",
        "dueDateTime": "2025-01-01T10:00:00.000Z"
      }
    }

Example error response:
    {
      "errors": [
        "Title is required.",
        "Status must be one of: Not started, In progress, Completed"
      ]
    }

## Running the Project

Install dependencies:
    npm install

Start the server:
    npm run dev

Open the application:
    http://localhost:3000

## Running Tests
    npm test

## File Structure

    project/
    ├── server.js
    ├── db.js
    ├── package.json
    ├── public/
    │   ├── index.html
    │   ├── app.js
    │   └── styles.css
    └── tests/
        └── taskApi.test.js

## Notes

- No personal information is included.
- Built according to the DTS Developer Challenge requirements.
