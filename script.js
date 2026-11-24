document.addEventListener('DOMContentLoaded', function () {
    const todoList = document.getElementById('todo-list');
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const addListButton = document.getElementById('add-list-button');
    const listMenu = document.getElementById('list-menu');

    // Safety check: stop cleanly if HTML IDs don't match
    if (!todoList || !todoForm || !todoInput || !addListButton || !listMenu) {
        console.error('Missing required HTML elements:', { todoList, todoForm, todoInput, addListButton, listMenu });
        return;
    }

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${d.toUTCString()};path=/;SameSite=Lax`;
    }

    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) {
                try {
                    return JSON.parse(decodeURIComponent(c.substring(nameEQ.length)));
                } catch (e) {
                    return null;
                }
            }
        }
        return null;
    }

    // Self-healing state loader (prevents corrupted cookies from crashing JS)
    let lists = getCookie('lists');
    if (!lists || typeof lists !== 'object' || Array.isArray(lists) || Object.keys(lists).length === 0) {
        lists = { 'Main Tasks': [] };
        setCookie('lists', lists, 30);
    }

    let currentList = getCookie('currentList');
    if (typeof currentList !== 'string' || !Array.isArray(lists[currentList])) {
        currentList = Object.keys(lists);
        if (!Array.isArray(lists[currentList])) {
            lists[currentList] = [];
        }
        setCookie('currentList', currentList, 30);
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
                    setCookie('lists', lists, 30);
                    if (currentList === listName) {
                        currentList = Object.keys(lists) || 'Main Tasks';
                        if (!lists[currentList]) lists[currentList] = [];
                        setCookie('currentList', currentList, 30);
                    }
                    renderLists();
                    renderTasks();
                });
                li.appendChild(deleteBtn);
            }

            li.addEventListener('click', function () {
                currentList = listName;
                setCookie('currentList', currentList, 30);
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
                setCookie('lists', lists, 30);
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
                setCookie('lists', lists, 30);
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
            setCookie('lists', lists, 30);
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
            setCookie('lists', lists, 30);
            setCookie('currentList', currentList, 30);
            renderLists();
            renderTasks();
        }
    });

    renderLists();
    renderTasks();
});



    Object.keys(lists).forEach(listName => addList(listName));
    renderTasks();
});
