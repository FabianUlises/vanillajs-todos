// Element Selectors
const addTodoBtn = document.querySelector('#todoBtn');
const newTodoInput = document.querySelector('#newTodoInput');
const todoList = document.querySelector('.todo__list');
const filterOption = document.querySelector('.filter-todo');
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
const handleTodoBtn = (e) => {
    const item = e.target;
    // Logic to remove todo from list
    // Selecting only element containing delete class
    if(item.classList[1] === 'todo__icon--del') {
        const todo = item.parentElement;
        todo.classList.add('todo-fall-animation');
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }
    // Logic to toggle completed css class
    // Selecting only element containing completed class
    if(item.classList[1] === 'todo__icon--edit') {
        const todo = item.parentElement;
        todo.classList.toggle('todo-completed');
    }

};
// Function to handle select dropdown
const handleFilterChange = (e) => {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('todo-completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('todo-completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
};
filterOption.addEventListener('click', handleFilterChange);
todoList.addEventListener('click', handleTodoBtn);
addTodoBtn.addEventListener('click', handleTodoSubmit);