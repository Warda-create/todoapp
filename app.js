const taskInput = document.getElementById("task-input"); 
const form = document.getElementById("todo-form"); 
const taskList = document.getElementById("task-list"); 
const messageDiv = document.getElementById("message"); 
const taskCounter = document.getElementById("task-counter");
const input = document.getElementById("myInput"); 

// Show success message
function showSuccessMessage(msg) {
    messageDiv.textContent = "✔ " + msg;

    // Adding Bootstrap classes to show alert
    messageDiv.classList.remove("d-none");  
    messageDiv.classList.add("alert", "alert-success"); 

    setTimeout(() => {
        messageDiv.classList.add("d-none");  
    }, 6000);
}

// Show/Hide Filter Controls
function hideInputAndFilters() {
    const hideElements = document.getElementById("task-controls");
    const totalTasks = document.querySelectorAll("#task-list li").length;

    if (totalTasks > 0){
        hideElements.classList.remove("d-none");  // Bootstrap display utility
    } else {
        hideElements.classList.add("d-none");     
    }
}

// Update remaining tasks counter
function updateTaskCounter() {
    const totalTasks = document.querySelectorAll("#task-list li").length;
    const completedTasks = document.querySelectorAll("#task-list li.completed").length;
    const remainingTasks = totalTasks - completedTasks;

    taskCounter.textContent =
        remainingTasks === 1 ? "1 task left" : remainingTasks + " tasks left";

    hideInputAndFilters();
}

// Clear Completed Button
const clearButton = document.getElementById("clearBtn");
clearButton.addEventListener("click", function() {
    document.querySelectorAll("#task-list li.completed")
        .forEach(task => task.remove());

    updateTaskCounter();
});

// Filter Buttons
const AllButton = document.getElementById("allBtn");
const activeButton = document.getElementById("activeBtn");
const completedButton = document.getElementById("completedBtn");

AllButton.addEventListener("click", function(){
    document.querySelectorAll("#task-list li")
        .forEach(task => task.classList.remove("d-none"));
});

activeButton.addEventListener("click", function(){
    document.querySelectorAll("#task-list li").forEach(task => {
        if(task.classList.contains("completed")) {
            task.classList.add("d-none");
        } else {
            task.classList.remove("d-none");
        }
    });
});

completedButton.addEventListener("click", function(){
    document.querySelectorAll("#task-list li").forEach(task =>{
        if(task.classList.contains("completed")){
            task.classList.remove("d-none");
        } else {
            task.classList.add("d-none");
        }
    });
});

// Add Task
form.addEventListener("submit", function(event) {
    event.preventDefault();
    input.classList.add("d-none");

    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    // Dynamically created elements
    const li = document.createElement("li"); // ✅ task container
    li.className = `todo-item list-group-item d-flex align-items-center justify-content-between shadow-sm mb-2 rounded-3`;
    // Adding Bootstrap classes to dynamically created li

    const span = document.createElement("span"); // ✅ task text
    span.classList.add("task-text", "flex-grow-1"); // Adding Bootstrap flex-grow
    span.textContent = taskText;

    const checkbox = document.createElement("input"); // ✅ task checkbox
    checkbox.type = "checkbox";
    checkbox.classList.add("form-check-input", "me-2", "complete-checkbox"); 
    // Adding Bootstrap checkbox styling + margin-end

    const deleteButton = document.createElement("button"); // ✅ delete button
    deleteButton.innerHTML = "🗑";
    deleteButton.classList.add("delete-btn", "btn", "btn-sm", "btn-outline-danger");
    // Adding Bootstrap button classes
    deleteButton.addEventListener("click", function() {
        li.remove();
        updateTaskCounter();
    });

    const editButton = document.createElement("button"); // ✅ edit button
    editButton.innerHTML = "✏️";
    editButton.classList.add("btn", "btn-sm", "btn-outline-secondary", "me-2");
    // Adding Bootstrap button classes

    editButton.addEventListener("click", function(){
        const currentText = span.textContent;
        const input2 = document.createElement("input"); // ✅ edit input
        input2.type = "text";
        input2.value = currentText;
        input2.classList.add("form-control", "form-control-sm"); 
        // Adding Bootstrap input classes

        li.replaceChild(input2, span);

        input2.addEventListener("keypress", function(e){
            if(e.key === "Enter"){
                span.textContent = input2.value;
                li.replaceChild(span, input2);
            }
        });
    });

    // Actions container
    const actions = document.createElement("div"); // ✅ actions container
    actions.classList.add("d-flex", "align-items-center", "gap-2"); 
    // Adding Bootstrap flex & spacing
    actions.appendChild(editButton);
    actions.appendChild(checkbox);
    actions.appendChild(deleteButton);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);

    showSuccessMessage("Task added successfully!");
    updateTaskCounter();
    taskInput.value = "";
});

// Checkbox toggle
taskList.addEventListener("change", function(event) {
    if (event.target.classList.contains("complete-checkbox")) {
        event.target.closest("li").classList.toggle("completed");
        updateTaskCounter();
    }
});
