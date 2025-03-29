let todoListHtml = '';
let filter = document.getElementById('filter');

// create an object array and store it to local storage
const todoList = JSON.parse(localStorage.getItem('todoTask')) || [{
    task: 'do laundry',
    dueDate: '2025-03-24',
    time: '12:30'
}];;

// display todo list each time the page is load
displayTodoList();

function inputValue() {
    // get the value from the input fields
    const inputElement = document.querySelector('.js-input');
    const task = inputElement.value;

    const inputdateElement = document.querySelector('.js-date-input');
    const dueDate = inputdateElement.value;

    const inputtimeElement = document.querySelector('.js-time-input');
    const time = inputtimeElement.value;

    // put the value from the input field into the array (use .push)
    todoList.push({
        task,
        dueDate,
        time
    });

    // reset the value in the input field after the button is clicked
    inputElement.value = '';
    inputdateElement.value = '';
    inputtimeElement.value = '';

    // call the function displayTodoList to display the list on the screen
    displayTodoList();

    // save Todo to local storage
    localStorage.setItem('todoTask', JSON.stringify(todoList));
}

// display the Todo list 
export function displayTodoList () {

    todoList.forEach ((todoObject, index) => {
        // store the values from the object into variables
        const {task, dueDate, time} = todoObject;

        // generate html
        const html = `
            <div>${task}</div>
            <div>${dueDate}</div>
            <div>${time}</div>
            <button class="remove-todo-btn task-btn-js">Remove</button>
            `;

        //store the html code into the todoListHtml variable
        todoListHtml += html;
    })

    document.querySelector('.js-todolist')
        .innerHTML = todoListHtml;

    // make the Remove button interactive
    document.querySelectorAll('.remove-todo-btn')
        .forEach((removeBtn, index) => {
            removeBtn.addEventListener('click', () => {
                todoList.splice(index, 1);
                displayTodoList();
                localStorage.setItem('todoTask', JSON.stringify(todoList));
            })
        })
}

// make the Add button interactive
document.querySelector('.js-add-task-btn')
    .addEventListener('click', () => {
        inputValue();
});

// create a filter search box
filter.addEventListener('keyup', searchItems);

function searchItems(searchText) {
    // get the value in the search box and convert it to lowercase
    const search = searchText.target.value.toLowerCase();

    // filter the todoList based on the search input
    const filteredTodos = todoList.filter(todoItem => 
        todoItem.task.toLowerCase().includes(search)
    );

    // clear the existing HTML and display the filtered list
    let filteredHtml = '';
    filteredTodos.forEach(todoObject => {
        const { task, dueDate, time } = todoObject;

        const html = `
            <div>${task}</div>
            <div>${dueDate}</div>
            <div>${time}</div>
            <button class="remove-todo-btn task-btn-js">Remove</button>
        `;

        filteredHtml += html;
    });

    document.querySelector('.js-todolist').innerHTML = filteredHtml;

    // make the Remove button interactive for the filtered list
    document.querySelectorAll('.remove-todo-btn')
        .forEach((removeBtn, index) => {
            removeBtn.addEventListener('click', () => {
                const todoIndex = todoList.findIndex(todo => 
                    todo.task === filteredTodos[index].task &&
                    todo.dueDate === filteredTodos[index].dueDate &&
                    todo.time === filteredTodos[index].time
                );
                todoList.splice(todoIndex, 1);
                displayTodoList();
                localStorage.setItem('todoTask', JSON.stringify(todoList));
            });
        });
}
