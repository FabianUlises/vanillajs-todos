// Element Selectors
const addTodoBtn = document.querySelector('#todoBtn');
const newTodoInput = document.querySelector('#newTodoInput');
const todoList = document.querySelector('.todo__list');
// Function to create new todo
const handleTodoSubmit = (e) => {
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
    const todoInputField = document.createElement('input');
    todoInputField.type = 'text';
    todoInputField.setAttribute('value', todoInput);
    todoInputField.setAttribute('readonly', 'readonly');
    todoInputField.classList.add('todo__text');
    // todoInputField.setAttribute('readOnly');
    const todoSpanDel = document.createElement('span');
    todoSpanDel.textContent = '❌';
    todoSpanDel.classList.add('todo__icon', 'todo__icon--del');
    const todoSpanEdit = document.createElement('span');
    todoSpanEdit.textContent = '🖊';
    todoSpanEdit.classList.add('todo__icon', 'todo__icon--edit');
    todoEl.appendChild(todoInputField);
    todoEl.appendChild(todoSpanEdit);
    todoEl.appendChild(todoSpanDel);
    // Adding todo to todolist
    todoList.appendChild(todoEl);
};
// Function to delete todo
const handleDeleteTodo = (e) => {
    const item = e.target;
    // Selecting only element containing delete class list
    if(item.classList[1] === 'todo__icon--del') {
        const todo = item.parentElement;
        todo.remove();
    }

};
todoList.addEventListener('click', handleDeleteTodo);
addTodoBtn.addEventListener('click', handleTodoSubmit);