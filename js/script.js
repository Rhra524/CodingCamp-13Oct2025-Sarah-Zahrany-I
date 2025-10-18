let tasksDb = [];

/// Add Functionality
function addTask() {
    /// Get input values
    const taskInput = document.getElementById('to-do-input');
    const dueDateInput = document.getElementById('due-date-input');
    
    /// Validate input
    if (validateInput(taskInput.value, dueDateInput.value)) {
        /// Create new task object
        const newTask = {
            task: taskInput.value,
            dueDate: dueDateInput.value
        }

        // Add the new task to database
        tasksDb.push(newTask);
        
        /// Render tasks
        renderTasks();
    }

}

/// Render Functionality
function renderTasks() {

    /// Clear existing tasks
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    /// Render each task
    tasksDb.forEach((taskObj, index) => {
        taskList.innerHTML += `<li>${taskObj.task} - ${taskObj.dueDate} - ${taskObj.status || 'pending' ||  'Completed' || 'In-progress'} - ${taskObj.actions || ''}</li>`;
    });

    }

/// Filter Functionality

/// Toggle filter menu visibility
document.getElementById('filter-btn').addEventListener('click', function() {
    const menu = document.getElementById('filter-menu');
    menu.classList.toggle('hidden');
});

/// close filter menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('filter-menu');
    const btn = document.getElementById('filter-btn');
    if (!btn.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.add('hidden');
    }
});

// --- set filter & render tasks ---
function setFilter (status) {
    document.getElementById('filter-menu').classList.add('hidden');
    filterTasks(status);
}

// --- update filterTasks function ---
function filterTasks(status = 'all') {
    tbody.innerHTML = '';

    let filteredTasks = [];
    if (status === 'all'    || status === 'completed' || status === 'pending') {
        filteredTasks = tasksDb ;
    } else {
        filteredTasks = tasksDb.filter(task => task.status === status);
    }

    if (filteredTasks.length === 0) {
        tbody.innerHTML = `
        <tr>
            <td colspan="4" class="text-center py-10 border border-gray-500 bg-sky-50;">No tasks found for "${status}" Filter
            </td>
        </tr>`;
        return;
    }

filteredTasks.forEach((taskObj, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border border-gray-500">${taskObj.task}</td>
            <td class="border border-gray-500">${taskObj.dueDate}</td>
            <td class="border border-gray-500">${taskObj.status}</td>
            <td class="border border-gray-500">
                <button class="bg-green-500 text-white px-3 py-1 rounded" onclick="updateStatus(${index}, 'completed');">Completed</button>
                <button class="bg-yellow-500 text-white px-3 py-1 rounded" onclick="deleteTask(${index});">Delete</button>
                <button class="bg-blue-500 text-white px-3 py-1 rounded" onclick="updateStatus(${index}, 'in-progress');">In Progress</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    tasksDb = tasksDb.filter(taskObj => taskObj.status === status);
    renderTasks();

}

function addTaskToTable(task, dueDate, status, actions) {
    const tbody = document.getElementById('task-table-body');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td class="p-2 border border-gray-500 text-left">${task}</td>
        <td class="p-2 border border-gray-500">${dueDate}</td>
        <td class="p-2 border border-gray-500">${status}</td>
        <td class="p-2 border border-gray-500">${actions}</td>
    `;
    tbody.appendChild(row);
}
renderTasks();

/// Delete All Functionality
function deleteAllTasks() {
    /// Clear the tasks database
    tasksDb = [];

    /// Re-render tasks
    renderTasks();
}

/// Input Validation
function validateInput(task, dueDate) {
    /// Simple validation
    if (task.trim() === '' || dueDate.trim() === '') {
        alert("Task and Due date are required");
        return false;
    }
    return true;

}

