// Element Selectors
const addTodoBtn = document.querySelector('#todoBtn');
const newTodoInput = document.querySelector('#newTodoInput');
const todoList = document.querySelector('.todo__list');
const filterOption = document.querySelector('.filter-todo');
// Function to save data to localstorage
const saveToLocal = (newTodo) => {
    // Checking if todos array exists in local storage database
    // If not creating new array
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    // Adding new todo to todos array
    todos.push(newTodo.todo);
    // Adding new todos array to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
};
// Function to remove local todo
const removeLocal = (todo) => {
    // Checking if todos array exists in local storage database
    // If not creating new array
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    // Creating index from todo
    const todoIndex = todo.firstChild.value;
    // Removing todo using splice method on todos array
    console.log('todos:', todos);
    todos.splice(todos.indexOf(todoIndex), 1);
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
};
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
    // Saving todo to localstorage
    saveToLocal(newTodo);
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
        // Removing from local storage
        removeLocal(todo)
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
// Function to load local storage todos to ui
const loadLocalTodos = () => {
    // Checking if todos array exists in local storage database
    // If not creating new array
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.forEach((todo) => {
        const newTodo = {
            todo: todo,
        };
        // Creating todo html element
        const todoEl = document.createElement('li');
        todoEl.classList.add('todo');
        const todoInputField = document.createElement('input');
        todoInputField.type = 'text';
        todoInputField.setAttribute('value', newTodo.todo);
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
    });
};
document.addEventListener('DOMContentLoaded', loadLocalTodos);
filterOption.addEventListener('click', handleFilterChange);
todoList.addEventListener('click', handleTodoBtn);
addTodoBtn.addEventListener('click', handleTodoSubmit);