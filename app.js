// Element Selectors
const handleTodoSubmit = document.querySelector('#todoBtn');
const newTodoInput = document.querySelector('#newTodoInput');
const todoList = document.querySelector('.todo__list');
// Function to create new todo
const createNewTodo = (e) => {
    e.preventDefault();
    // Checking if input is valid
    if(!newTodoInput.value || newTodoInput.value === '') {
        return;
    }
    // Getting value from user input
    const todoInput = newTodoInput.value;
    // Resetting input
    newTodoInput.value = '';
    // Creating user Object
    const newTodo = {
        todo: todoInput,
        todoId: Math.floor(Math.random() * 8000),
        isEditing: false,
        isComplete: false
    };
    console.log(newTodo.todo);
    // Creating todo html element
    const todoEl = document.createElement('li');
    todoEl.classList.add('todo');
    todoEl.innerText = newTodo.todo;
    const todoSpanDel = document.createElement('span');
    todoSpanDel.classList.add('todo__icon', 'todo__icon--del');
    const todoSpanEdit = document.createElement('span');
    todoSpanEdit.classList.add('todo__icon', 'todo__icon--edit');
    todoEl.appendChild(todoSpanEdit);
    // Adding todo to todolist
    todoList.appendChild(todoEl);
};

handleTodoSubmit.addEventListener('click', createNewTodo);