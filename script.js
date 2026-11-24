document.addEventListener('DOMContentLoaded', function () {
    const todoList = document.getElementById('todo-list');
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const addListButton = document.getElementById('add-list-button');
    const listMenu = document.getElementById('list-menu');

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + d.toUTCString();
        document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};${expires};path=/;SameSite=Lax`;
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

    let lists = getCookie('lists') || { 'Main Tasks': [] };
    let currentList = getCookie('currentList') || 'Main Tasks';
    if (!lists[currentList]) currentList = 'Main Tasks';

    function renderTasks() {
        todoList.innerHTML = '';
        if (currentList && lists[currentList]) {
            lists[currentList].forEach(task => addTask(task));
        }
    }

    function addTask(taskText) {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function () {
            todoList.removeChild(li);
            lists[currentList] = lists[currentList].filter(task => task !== taskText);
            setCookie('lists', lists, 30);
        });

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText !== '' && currentList) {
            addTask(taskText);
            lists[currentList].push(taskText);
            setCookie('lists', lists, 30);
            todoInput.value = '';
        }
    });

    function addList(listName) {
        const li = document.createElement('li');

        const titleSpan = document.createElement('span');
        titleSpan.textContent = listName;
        li.appendChild(titleSpan);

        if (listName !== 'Main Tasks') {
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                listMenu.removeChild(li);
                delete lists[listName];
                setCookie('lists', lists, 30);
                if (currentList === listName) {
                    currentList = 'Main Tasks';
                    setCookie('currentList', currentList, 30);
                    renderTasks();
                }
            });
            li.appendChild(deleteBtn);
        }

        listMenu.appendChild(li);

        li.addEventListener('click', function () {
            currentList = listName;
            setCookie('currentList', currentList, 30);
            renderTasks();
        });

        if (!lists[listName]) {
            lists[listName] = [];
            setCookie('lists', lists, 30);
        }
    }

    addListButton.addEventListener('click', function () {
        const rawName = prompt('Enter the name of the new list:');
        if (!rawName) return;
        const listName = rawName.trim();
        if (listName && !lists[listName]) {
            addList(listName);
        }
    });

    Object.keys(lists).forEach(listName => addList(listName));
    renderTasks();
});


    Object.keys(lists).forEach(listName => addList(listName));
    renderTasks();
});
