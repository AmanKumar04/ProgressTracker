const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("categoryInput");
const priorityInput = document.getElementById("priorityInput");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");
const darkModeToggle = document.getElementById("darkModeToggle");

// Load tasks and dark mode preference from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
darkModeToggle.checked = isDarkMode;
if (isDarkMode) document.body.classList.add("dark");

renderTasks();

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    tasks.push({
        text: taskText,
        category: categoryInput.value,
        priority: priorityInput.value,
        completed: false
    });
    saveTasks();
    renderTasks();
    taskInput.value = "";
}

// Render tasks to the list
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        
        const taskDetails = document.createElement("span");
        taskDetails.textContent = `${task.text} [${task.category}] [${task.priority}]`;
        taskDetails.onclick = () => toggleTask(index);
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(index);
        
        li.appendChild(taskDetails);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
    updateProgress();
}

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Sort tasks by priority or completion status
function sortTasks(criteria) {
    if (criteria === "priority") {
        tasks.sort((a, b) => {
            const priorities = { High: 3, Medium: 2, Low: 1 };
            return priorities[b.priority] - priorities[a.priority];
        });
    } else if (criteria === "completed") {
        tasks.sort((a, b) => a.completed - b.completed);
    }
    renderTasks();
}

// Save tasks and dark mode preference to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", JSON.stringify(darkModeToggle.checked));
}

// Update progress bar
function updateProgress() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    progressBar.value = progress;
    progressPercent.textContent = `${progress}%`;
}
