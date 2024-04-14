function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn" onclick="removeTask(event, this)">✖</button>
        `;
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

function removeTask(event, btn) {
    const listItem = btn.parentNode;
    listItem.style.opacity = 0;  // Set opacity to 0 to initiate the fade-out transition

    // Prevent the click event from propagating to the parent elements
    event.stopPropagation();

    // Use 'transitionend' to listen for the end of the fade-out transition
    listItem.addEventListener('transitionend', function() {
        listItem.remove();
    });
}
