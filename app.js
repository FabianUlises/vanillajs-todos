// Element Selectors
const handleTodoSubmit = document.querySelector('#todoBtn');
const newTodoInput = document.querySelector('#newTodoInput');
const todoList = document.querySelector('.todo-list');
// Function to create new todo
const createNewTodo = () => {
    // Getting value from user input
    const todoInput = newTodoInput.value;
    // Creating user Object
    const newTodo = {
        todo: todoInput,
        todoId: Math.floor(Math.random() * 8000),
        isEditing: false,
        isComplete: false
    };
    // Appending new todo to html ul element
    todoList.append = `
        <li class="todo-list__item todo">${newTodo.todo}</li>
    `;

}

handleTodoSubmit.addEventListener('click', createNewTodo);