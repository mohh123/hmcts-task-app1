const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Valid statuses for tasks
const VALID_STATUSES = ['Not started', 'In progress', 'Completed'];

// POST /api/tasks - create a new task
app.post('/api/tasks', (req, res) => {
  const { title, description, status, dueDateTime } = req.body;

  // Validation
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title is required.');
  }

  if (!status || !VALID_STATUSES.includes(status)) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  if (!dueDateTime) {
    errors.push('Due date/time is required.');
  } else if (isNaN(Date.parse(dueDateTime))) {
    errors.push('Due date/time must be a valid date string.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const insert = db.prepare(`
    INSERT INTO tasks (title, description, status, dueDateTime)
    VALUES (?, ?, ?, ?)
  `);

  const info = insert.run(
    title.trim(),
    description || null,
    status,
    dueDateTime
  );

  const select = db.prepare(`SELECT * FROM tasks WHERE id = ?`);
  const task = select.get(info.lastInsertRowid);

  return res.status(201).json({ task });
});

// (Optional) GET /api/tasks for debugging
app.get('/api/tasks', (req, res) => {
  const stmt = db.prepare('SELECT * FROM tasks ORDER BY id DESC');
  const tasks = stmt.all();
  res.json({ tasks });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; // export app for testing
