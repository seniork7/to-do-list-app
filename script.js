let todoListHtml = '';
let filter = document.getElementById('filter');

// Create an object array and store it in local storage
const todoList = JSON.parse(localStorage.getItem('todoTask')) || [{
    task: 'do laundry',
    dueDate: '2025-03-24',
    time: '12:30'
}];

// Display the todo list each time the page loads
displayTodoList();

function getInputValue() {
    // Get the value from the input fields
    const inputElement = document.querySelector('.js-input');
    const task = inputElement.value;

    const inputDateElement = document.querySelector('.js-date-input');
    const dueDate = inputDateElement.value;

    const inputTimeElement = document.querySelector('.js-time-input');
    const time = inputTimeElement.value;

    // Add the new task to the array
    todoList.push({
        task,
        dueDate,
        time
    });

    // Reset the input fields after adding the task
    inputElement.value = '';
    inputDateElement.value = '';
    inputTimeElement.value = '';

    // Display the updated todo list
    displayTodoList();

    // Save the updated todo list to local storage
    localStorage.setItem('todoTask', JSON.stringify(todoList));
}

// Display the todo list
function displayTodoList() {
    // Get the container 
    const todoListContainer = document.querySelector('.js-todolist');

    // Clear the container before rendering
    todoListContainer.innerHTML = '';

    todoList.forEach((todoObject, index) => {
        // Destructure the todo object
        const { task, dueDate, time } = todoObject;

        // Generate the HTML for each task
        const taskHtml = `
            <div class="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
                <div>
                    <p class="text-lg font-medium text-gray-800">${task}</p>
                    <p class="text-sm text-gray-500">Due: ${dueDate} at ${time}</p>
                </div>
                <button class="remove-todo-btn bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" data-index="${index}">Remove</button>
            </div>
        `;

        // Append the task HTML to the container
        todoListContainer.innerHTML += taskHtml;
    });

    // Add event listeners to the remove buttons
    document.querySelectorAll('.remove-todo-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            todoList.splice(index, 1); // Remove the task from the array
            displayTodoList(); // Update the displayed list
            localStorage.setItem('todoTask', JSON.stringify(todoList)); // Update local storage
        });
    });
}

// Make the Add button interactive
document.querySelector('.js-add-task-btn').addEventListener('click', () => {
    getInputValue();
});

// Create a filter search box
filter.addEventListener('keyup', searchItems);

function searchItems(event) {
    const search = event.target.value.toLowerCase();

    // Filter the todo list based on the search input
    const filteredTodos = todoList.filter(todoItem =>
        todoItem.task.toLowerCase().includes(search)
    );

    // Clear the existing HTML and display the filtered list
    const todoListContainer = document.querySelector('.js-todolist');
    todoListContainer.innerHTML = '';

    filteredTodos.forEach((todoObject, index) => {
        const { task, dueDate, time } = todoObject;

        const taskHtml = `
            <div class="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
                <div>
                    <p class="text-lg font-medium text-gray-800">${task}</p>
                    <p class="text-sm text-gray-500">Due: ${dueDate} at ${time}</p>
                </div>
                <button class="remove-todo-btn bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" data-index="${index}">Remove</button>
            </div>
        `;

        todoListContainer.innerHTML += taskHtml;
    });

    // Add event listeners to the remove buttons for the filtered list
    document.querySelectorAll('.remove-todo-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            const todoIndex = todoList.findIndex(todo =>
                todo.task === filteredTodos[index].task &&
                todo.dueDate === filteredTodos[index].dueDate &&
                todo.time === filteredTodos[index].time
            );
            todoList.splice(todoIndex, 1); // Remove the task from the array
            displayTodoList(); // Update the displayed list
            localStorage.setItem('todoTask', JSON.stringify(todoList)); // Update local storage
        });
    });
}
