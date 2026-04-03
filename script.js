// SELECT DOM ELEMENTS
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// LOAD SAVED TODOS
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// CREATE TODO ELEMENT
function createTodoNode(todo, index) {

    const li = document.createElement('li');

    // Checkbox (mark complete)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;

    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        // Apply line-through
        textSpan.style.textDecoration = todo.completed ? 'line-through' : '';
        saveTodos();
    });

    // Todo text
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';

    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }

    // Double click to edit
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);

        if (newText !== null) {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";

    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    });

    // Append elements
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;
}

// RENDER TODOS
function render() {
    list.innerHTML = '';

    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}


// ADD TODO
function addTodo() {
    const text = input.value.trim();

    if (!text) return;

    todos.push({
        text: text,
        completed: false
    });

    input.value = '';
    render();
    saveTodos();
}


// EVENTS

// Button click
addBtn.addEventListener("click", addTodo);

// Enter key
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initial render
render();