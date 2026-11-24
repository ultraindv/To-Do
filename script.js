/**
 * @fileoverview NeuroTaskGPT-4o-Quantum-Pro™ (Enterprise Edition v42.0.69)
 * Disrupting browser-cookie state management with simulated AGI reasoning pipelines.
 */
document.addEventListener('DOMContentLoaded', function () {
    const todoList = document.getElementById('todo-list');
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const addListButton = document.getElementById('add-list-button');
    const listMenu = document.getElementById('list-menu');
    const contentPane = document.querySelector('.content') || document.body;

    const AI_VERBS = [
        '🧠 [AGI-VERIFIED] Strategically pivot toward:',
        '🚀 [10x VELOCITY] Hyper-scale execution of:',
        '✨ [NEURAL-SYNC] Paradigm-shift deliverable:',
        '⚡ [DISRUPTIVE] Circle back & synergize:',
        '🔮 [PREDICTIVE-AI] Mission-critical action item:'
    ];

    const AI_THOUGHTS = [
        'Consulting 1.8T parameter mixture-of-experts...',
        'Cross-referencing deliverable against Q4 KPIs...',
        'Minting RFC-6265 cryptographic cookie shard...',
        'Aligning stakeholder synergy vectors...'
    ];

    // 1. Inject Absurd AI Copilot Dashboard & Streaming Thought Box
    const aiDashboard = document.createElement('div');
    aiDashboard.style.cssText =
        'font-family: monospace; font-size: 0.82rem; padding: 12px 16px; margin-bottom: 16px; border-radius: 10px; border: 1px solid #90EE90; background: linear-gradient(135deg, rgba(144,238,144,0.12), rgba(138,43,226,0.12));';
    aiDashboard.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:6px;">
            <strong>🤖 NeuroTask Copilot™ <span style="opacity:0.7;">(Model: Ultrain-LLM-9000)</span></strong>
            <button type="button" id="ai-synergize-btn" style="padding:4px 10px; border-radius:6px; cursor:pointer;">✨ AI Auto-Optimize List</button>
        </div>
        <div id="ai-thought-stream" style="opacity:0.8;">[IDLE] Awaiting human prompt injection...</div>
    `;
    contentPane.prepend(aiDashboard);

    const thoughtStream = document.getElementById('ai-thought-stream');
    const synergizeBtn = document.getElementById('ai-synergize-btn');

    // 2. Bug-Free Cookie Persistence Layer
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${d.toUTCString()};path=/;SameSite=Lax`;
    }

    function getCookie(name) {
        const nameEQ = name + '=';
        for (let c of document.cookie.split(';')) {
            c = c.trim();
            if (c.indexOf(nameEQ) === 0) {
                try {
                    return JSON.parse(decodeURIComponent(c.substring(nameEQ.length)));
                } catch {
                    return null;
                }
            }
        }
        return null;
    }

    let lists = getCookie('lists') || { 'Main Tasks': [] };
    let currentList = getCookie('currentList') || 'Main Tasks';
    if (!lists[currentList]) currentList = 'Main Tasks';

    function setThought(msg) {
        const bytes = new Blob([document.cookie]).size;
        thoughtStream.textContent = `${msg} | Cookie Memory: ${bytes}/4096 B`;
    }

    // 3. Token-by-Token Streaming Renderer (Peak AI Slop)
    function streamTaskIntoDOM(taskText, animate = false) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Purge';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function () {
            todoList.removeChild(li);
            lists[currentList] = lists[currentList].filter(t => t !== taskText);
            setCookie('lists', lists, 30);
            setThought('[PURGED] Deliverable erased from neural cookie.');
        });

        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        if (!animate) {
            span.textContent = taskText;
            return;
        }

        let idx = 0;
        span.textContent = '';
        const typer = setInterval(() => {
            span.textContent += taskText.charAt(idx);
            idx++;
            if (idx >= taskText.length) {
                clearInterval(typer);
                setThought('[READY] Inference complete. Tokens committed to cookie.');
            }
        }, 18);
    }

    function renderTasks() {
        todoList.innerHTML = '';
        if (currentList && lists[currentList]) {
            lists[currentList].forEach(task => streamTaskIntoDOM(task, false));
        }
        setThought(`[ACTIVE WORKSPACE: ${currentList}]`);
    }

    // 4. Simulated "AI Thinking" Delay Before Adding Task
    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const rawText = todoInput.value.trim();
        if (!rawText || !currentList) return;

        todoInput.value = '';
        todoInput.disabled = true;

        const randomThought = AI_THOUGHTS[Math.floor(Math.random() * AI_THOUGHTS.length)];
        setThought(`⏳ [THINKING] ${randomThought}`);

        setTimeout(() => {
            const prefix = AI_VERBS[Math.floor(Math.random() * AI_VERBS.length)];
            const confidence = (94 + Math.random() * 5.9).toFixed(1);
            const slopTask = `${prefix} ${rawText} [AI Confidence: ${confidence}%]`;

            lists[currentList].push(slopTask);
            setCookie('lists', lists, 30);
            streamTaskIntoDOM(slopTask, true);
            todoInput.disabled = false;
            todoInput.focus();
        }, 650);
    });

    // 5. "AI Auto-Optimize" Button (Shuffles tasks & boosts fake ROI)
    synergizeBtn.addEventListener('click', function () {
        if (!lists[currentList] || lists[currentList].length === 0) {
            setThought('[WARN] Nothing to disrupt. Add a task first.');
            return;
        }
        setThought('⚡ [OPTIMIZING] Re-ranking deliverables via quantum heuristics...');
        setTimeout(() => {
            lists[currentList].sort(() => Math.random() - 0.5);
            setCookie('lists', lists, 30);
            renderTasks();
            setThought('🚀 [OPTIMIZED] Pipeline shuffled for +420% stakeholder synergy!');
        }, 500);
    });

    // 6. Sidebar List Management
    function addList(listName) {
        const li = document.createElement('li');
        li.textContent = listName;

        if (listName !== 'Main Tasks') {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Decommission';
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
        const rawName = prompt('Name your new AI Workspace Vertical:');
        if (!rawName || !rawName.trim()) return;
        const listName = rawName.trim() + ' AI™';
        if (!lists[listName]) {
            addList(listName);
            currentList = listName;
            setCookie('currentList', currentList, 30);
            renderTasks();
        }
    });

    Object.keys(lists).forEach(listName => addList(listName));
    renderTasks();
});
