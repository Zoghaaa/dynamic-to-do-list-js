// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select the necessary DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask() {
        // Get the task text from the input field
        const taskText = taskInput.value.trim();

        // Check if the task text is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new li element
        const li = document.createElement('li');
        li.textContent = taskText;  // Set its textContent to taskText

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";  // Set its textContent to "Remove"
        removeButton.className = 'remove-btn';  // Give it a class name of 'remove-btn'

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            taskList.removeChild(li);  // When triggered, removes the li element from taskList
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);
        // Append the li to taskList
        taskList.appendChild(li);

        // Clear the task input field by setting taskInput.value to an empty string
        taskInput.value = "";
    }

    // Attach event listeners
    addButton.addEventListener('click', addTask);  // Call addTask when button is clicked

    // Allow tasks to be added by pressing the "Enter" key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();  // Call addTask if "Enter" key is pressed
        }
    });
});
