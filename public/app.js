const form = document.getElementById('task-form');
const messageEl = document.getElementById('message');
const createdTaskEl = document.getElementById('created-task');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  messageEl.textContent = '';
  createdTaskEl.innerHTML = '';

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const status = document.getElementById('status').value;
  const dueDateTimeInput = document.getElementById('dueDateTime').value;

  // Convert from local datetime to ISO string
  const dueDateTime = new Date(dueDateTimeInput).toISOString();

  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, status, dueDateTime })
    });

    const data = await response.json();

    if (!response.ok) {
      messageEl.textContent = data.errors ? data.errors.join(' ') : 'Error creating task.';
      messageEl.className = 'error';
      return;
    }

    messageEl.textContent = 'Task created successfully!';
    messageEl.className = 'success';

    const task = data.task;
    createdTaskEl.innerHTML = `
      <h2>Created Task</h2>
      <ul>
        <li><strong>ID:</strong> ${task.id}</li>
        <li><strong>Title:</strong> ${task.title}</li>
        <li><strong>Description:</strong> ${task.description || '-'}</li>
        <li><strong>Status:</strong> ${task.status}</li>
        <li><strong>Due date/time:</strong> ${task.dueDateTime}</li>
      </ul>
    `;

    form.reset();
  } catch (err) {
    console.error(err);
    messageEl.textContent = 'Unexpected error. Please try again.';
    messageEl.className = 'error';
  }
});
