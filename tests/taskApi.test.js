const request = require('supertest');
const app = require('../server');

describe('POST /api/tasks', () => {
  it('creates a task with valid data', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test task',
        description: 'Testing creation',
        status: 'Not started',
        dueDateTime: new Date().toISOString()
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.task).toHaveProperty('id');
    expect(response.body.task.title).toBe('Test task');
  });

  it('returns validation errors for invalid data', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: '',
        status: 'Invalid',
        dueDateTime: 'not-a-date'
      });

    expect(response.statusCode).toBe(400);
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
});
