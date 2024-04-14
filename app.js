// Load tasks from local storage when the page is loaded
window.onload = function() {
    loadTasks();
};

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <span onclick="editTask(this)">${taskText}</span>
            <button class="delete-btn" onclick="removeTask(event, this)">✖</button>
        `;
        taskList.appendChild(li);
        saveTask(taskText); // Save task to local storage
        taskInput.value = '';
    }
}

// Function to remove a task
function removeTask(event, btn) {
    const listItem = btn.parentNode;
    listItem.style.opacity = 0;  // Set opacity to 0 to initiate the fade-out transition

    // Prevent the click event from propagating to the parent elements
    event.stopPropagation();

    // Use 'transitionend' to listen for the end of the fade-out transition
    listItem.addEventListener('transitionend', function() {
        listItem.remove();
        removeTaskFromStorage(listItem.querySelector('span').innerText); // Remove task from local storage
    });
}

// Function to edit a task
function editTask(span) {
    const newText = prompt("Edit task:", span.innerText);
    if (newText !== null && newText.trim() !== "") {
        span.innerText = newText;
        updateTaskInStorage(span.innerText, newText); // Update task in local storage
    }
}

// Function to save task to local storage
function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove task from local storage
function removeTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to update task in local storage
function updateTaskInStorage(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex(task => task === oldText);
    if (index !== -1) {
        tasks[index] = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Function to load tasks from local storage
function loadTasks() {
    const taskList = document.getElementById('taskList');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(taskText => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span onclick="editTask(this)">${taskText}</span>
            <button class="delete-btn" onclick="removeTask(event, this)">✖</button>
        `;
        taskList.appendChild(li);
    });
}
