// Function to load tasks from Local Storage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // Pass false to prevent saving twice
}

// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); // Load tasks when the page is loaded

    // Select the necessary DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask(taskText, save = true) {
        // If the taskText is empty, get the value from the input
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Check if the task text is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new li element
        const li = document.createElement('li');
        li.textContent = taskText;  // Set the textContent of the li to taskText

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";  // Set its textContent to "Remove"
        removeButton.classList.add('remove-btn');  // Give it a class name of 'remove-btn'

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            taskList.removeChild(li);  // When triggered, remove the li element from taskList
            removeTaskFromStorage(taskText); // Remove from localStorage
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);
        // Append the li to taskList
        taskList.appendChild(li);

        // Clear the task input field by setting taskInput.value to an empty string
        taskInput.value = "";

        // Save task to localStorage if 'save' is true
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText); // Filter out the task
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save the updated tasks
    }

    // Attach event listeners
    addButton.addEventListener('click', () => {
        addTask();  // Call addTask when button is clicked
    });

    // Allow tasks to be added by pressing the "Enter" key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();  // Call addTask if the "Enter" key is pressed
        }
    });
});
