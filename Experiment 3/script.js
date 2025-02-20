// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Add Task
taskForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    addTask(taskText, taskList); // Pass taskList
    taskInput.value = ''; // Clear input field
  }
});

// Function to Add Task
function addTask(taskText, taskList) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerText = taskText;

  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';

  const buttonContainer = document.createElement('div');
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  li.appendChild(span);
  li.appendChild(buttonContainer);
  taskList.appendChild(li);

  // Edit Task
  editButton.addEventListener('click', function () {
    const newText = prompt('Edit your task:', span.textContent);
    //textContent: set or return the text content of the specified node
    if (newText !== null && newText.trim() !== '') {
      span.textContent = newText.trim();
    }
    // updates the text content of a span element with a new, non-null, 
    // and non-empty (after trimming whitespace) text value.
  });

  // Delete Task
  deleteButton.addEventListener('click', function () {
    li.remove();
  });
}
