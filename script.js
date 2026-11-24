document.addEventListener('DOMContentLoaded', function () {
    const todoList = document.getElementById('todo-list');
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const addListButton = document.getElementById('add-list-button');
    const listMenu = document.getElementById('list-menu');

    function saveData(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            // Fallback if storage is restricted
        }
    }

    function loadData(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return null;
        }
    }

    let lists = loadData('ultrain_todo_lists');
    if (!lists || typeof lists !== 'object' || Array.isArray(lists)) {
        lists = { 'Main Tasks': [] };
        saveData('ultrain_todo_lists', lists);
    }

    if (!Array.isArray(lists['Main Tasks'])) {
        lists['Main Tasks'] = [];
    }

    let currentList = loadData('ultrain_todo_current');
    if (typeof currentList !== 'string' || !Array.isArray(lists[currentList])) {
        currentList = 'Main Tasks';
        saveData('ultrain_todo_current', currentList);
    }

    function renderLists() {
        listMenu.innerHTML = '';
        Object.keys(lists).forEach(listName => {
            const li = document.createElement('li');
            if (listName === currentList) li.classList.add('active-list');

            const titleSpan = document.createElement('span');
            titleSpan.textContent = listName;
            li.appendChild(titleSpan);

            if (listName !== 'Main Tasks') {
                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.textContent = '×';
                deleteBtn.className = 'delete-btn';
                deleteBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    delete lists[listName];
                    saveData('ultrain_todo_lists', lists);
                    if (currentList === listName) {
                        currentList = 'Main Tasks';
                        saveData('ultrain_todo_current', currentList);
                    }
                    renderLists();
                    renderTasks();
                });
                li.appendChild(deleteBtn);
            }

            li.addEventListener('click', function () {
                currentList = listName;
                saveData('ultrain_todo_current', currentList);
                renderLists();
                renderTasks();
            });

            listMenu.appendChild(li);
        });
    }

    function renderTasks() {
        todoList.innerHTML = '';
        const tasks = Array.isArray(lists[currentList]) ? lists[currentList] : [];

        tasks.forEach((taskItem, index) => {
            const taskObj = typeof taskItem === 'string'
                ? { text: taskItem, done: false }
                : taskItem;
            lists[currentList][index] = taskObj;

            const li = document.createElement('li');
            if (taskObj.done) li.classList.add('task-done');

            const label = document.createElement('label');
            label.className = 'task-left';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = Boolean(taskObj.done);
            checkbox.addEventListener('change', function () {
                taskObj.done = checkbox.checked;
                li.classList.toggle('task-done', taskObj.done);
                saveData('ultrain_todo_lists', lists);
            });

            const span = document.createElement('span');
            span.textContent = taskObj.text;

            label.appendChild(checkbox);
            label.appendChild(span);
            li.appendChild(label);

            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', function () {
                lists[currentList].splice(index, 1);
                saveData('ultrain_todo_lists', lists);
                renderTasks();
            });

            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }

    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText !== '' && currentList) {
            if (!Array.isArray(lists[currentList])) lists[currentList] = [];
            lists[currentList].push({ text: taskText, done: false });
            saveData('ultrain_todo_lists', lists);
            todoInput.value = '';
            renderTasks();
        }
    });

    addListButton.addEventListener('click', function () {
        const rawName = prompt('Enter the name of the new list:');
        if (!rawName) return;
        const listName = rawName.trim();
        if (listName && !lists[listName]) {
            lists[listName] = [];
            currentList = listName;
            saveData('ultrain_todo_lists', lists);
            saveData('ultrain_todo_current', currentList);
            renderLists();
            renderTasks();
        }
    });

    renderLists();
    renderTasks();
});
