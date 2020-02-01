let filter_mode = 0;
let tasks = [{
    name: 'Buy sword',
    done: true,
    meta: new Date('01/01/1997')
}, {
    name: 'Buy shield',
    done: false,
    meta: new Date('01/02/1997')
}, {
    name: 'Buy armor suit',
    done: false,
    meta: new Date('01/03/1997')
}, {
    name: 'Buy bow',
    done: true,
    meta: new Date('01/04/1997')
}, ]

const form = document.getElementById('task-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    addNewTask(event.target.elements["task"].value);
    document.getElementById("task-new").value = '';
})

const tasks_container = document.getElementById('tasks-container');

activeTab = () => {
    const tabs = document.getElementById("tabs").children;

    for (i = 0; i < tabs.length; ++i) {
        tabs.item(i).classList.toggle("active-tab", Number(tabs.item(i).value) === filter_mode);
        console.log(tabs.item(i).classList)
    }

    // hard-coded tab class
    tasks_container.classList.toggle("left-tab-inactive", filter_mode !== 0)
    tasks_container.classList.toggle("right-tab-inactive", filter_mode !== 2)
}

addNewTask = (task_str) => {
    tasks.push({
        name: task_str,
        done: false,
        meta: new Date(),
    });

    createList(filter_mode);
}

toggleDone = (event) => {
    const meta = event.target.parentElement.children[2].value;
    tasks.filter((item) => item.meta.toString() === meta)
        .map((item) => Object.assign(item, {
            done: event.target.checked
        }));

    createList(filter_mode);
}

// 0 = all tasks, 1 = done tasks, 2 = not done tasks
createList = (filter = 0) => {
    filter_mode = filter;
    tasks_container.innerHTML = null;
    const content = tasks
        .filter((item) => {
            switch (filter) {
                case 0:
                    return true;
                case 1:
                    return item.done;
                case 2:
                    return !item.done;
                default:
                    return false;
            }
        })
        .map((item) => {
            const input = document.createElement('input');
            const label = document.createElement('label');
            const button = document.createElement('button');

            input.type = 'checkbox';
            input.value = item.done;
            input.id = `todo-${item.meta}`;
            input.checked = item.done;
            input.addEventListener('input', toggleDone);

            label.textContent = item.name;
            label.setAttribute('for', `todo-${item.meta}`);

            button.innerHTML = 'Remove task';
            button.value = item.meta;
            button.addEventListener('click', removeTask);

            return [input, label, button];
        }).reduce((acc, current) => {
            acc.appendChild(current.reduce((a, b) => {
                a.appendChild(b);
                return a;
            }, document.createElement('li')));
            return acc;
        }, document.createElement('ul'));
    tasks_container.appendChild(content);
    activeTab();
}

removeTask = (event) => {
    const meta = event.target.value;
    tasks = tasks.filter((item) => item.meta.toString() !== meta);
    createList(filter_mode);
}

createList();