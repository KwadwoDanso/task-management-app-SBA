// Array to hold all task objects
var tasks = [];



// Load tasks from local storage when the page loads
function loadTasks() {
    var stored = localStorage.getItem("tasks");
    if (stored) {
        try {
            tasks = JSON.parse(stored);
        } catch (e) {
            tasks = [];
        }
    }
}

// Save the current tasks array to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//  Date Helper 
// Returns today's date as a YYYY-MM-DD string using local time
function getToday() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) { month = "0" + month; }
    if (day < 10) { day = "0" + day; }
    return year + "-" + month + "-" + day;
}

//  Overdue Check 

// Marks any task whose deadline has passed as "Overdue" (unless Completed)
function checkOverdue() {
    var today = getToday();
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].deadline && tasks[i].status !== "Completed" && tasks[i].deadline < today) {
            tasks[i].status = "Overdue";
        }
    }
}

// Add Task 
function addTask() {
    var name = document.getElementById("taskName").value.trim();
    var category = document.getElementById("taskCategory").value.trim();
    var deadline = document.getElementById("taskDeadline").value;
    var status = document.getElementById("taskStatus").value;
    var errorMsg = document.getElementById("errorMessage");

    // Validate that all fields are filled in
    if (!name || !category || !deadline) {
        errorMsg.textContent = "Please fill in all fields.";
        return;
    }

    errorMsg.textContent = "";

    // Create the task object
    var task = {
        id: Date.now(),
        name: name,
        category: category,
        deadline: deadline,
        status: status
    };

    tasks.push(task);
    checkOverdue();
    saveTasks();

    // Clear the input fields
    document.getElementById("taskName").value = "";
    document.getElementById("taskCategory").value = "";
    document.getElementById("taskDeadline").value = "";
    document.getElementById("taskStatus").value = "In Progress";

    renderTasks();
}

//  Update Status 

// Updates the status of a task by its id, then re-checks overdue and saves
function updateStatus(id, newStatus) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].status = newStatus;
            break;
        }
    }
    checkOverdue();
    saveTasks();
    renderTasks();
}

//  Category Filter 

// Rebuilds the category filter dropdown from the current tasks array
function updateCategoryFilter() {
    var filterCategory = document.getElementById("filterCategory");
    var currentValue = filterCategory.value;

    // Collect unique categories
    var categories = [];
    for (var i = 0; i < tasks.length; i++) {
        if (categories.indexOf(tasks[i].category) === -1) {
            categories.push(tasks[i].category);
        }
    }

    // Rebuild options, restoring the previously selected value if it still exists
    filterCategory.innerHTML = "<option value='All'>All Categories</option>";
    for (var j = 0; j < categories.length; j++) {
        var option = document.createElement("option");
        option.value = categories[j];
        option.textContent = categories[j];
        if (categories[j] === currentValue) {
            option.selected = true;
        }
        filterCategory.appendChild(option);
    }
}

//  Render Tasks 

function renderTasks() {
    var filterStatus = document.getElementById("filterStatus").value;
    var ul = document.getElementById("taskList");

    // Rebuild category filter first, then read its current value
    updateCategoryFilter();
    var filterCategory = document.getElementById("filterCategory").value;

    // Filter the tasks array
    var filtered = [];
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var statusMatch = (filterStatus === "All" || task.status === filterStatus);
        var categoryMatch = (filterCategory === "All" || task.category === filterCategory);
        if (statusMatch && categoryMatch) {
            filtered.push(task);
        }
    }

    // Clear the current list
    ul.innerHTML = "";

    // Show a message if no tasks match
    if (filtered.length === 0) {
        var emptyLi = document.createElement("li");
        emptyLi.textContent = "No tasks found.";
        ul.appendChild(emptyLi);
        return;
    }

    // Build a list item for each filtered task
    for (var j = 0; j < filtered.length; j++) {
        var t = filtered[j];
        var li = document.createElement("li");
        li.className = "task-item";

        // Task info text
        var infoSpan = document.createElement("span");
        infoSpan.className = "task-info";
        infoSpan.textContent = t.name + " — " + t.category + " — Due: " + t.deadline;
        li.appendChild(infoSpan);

        // Status badge
        var statusSpan = document.createElement("span");
        statusSpan.className = "status status-" + t.status.replace(/ /g, "-").toLowerCase();
        statusSpan.textContent = t.status;
        li.appendChild(statusSpan);

        // Update status dropdown
        var updateDiv = document.createElement("div");
        updateDiv.className = "update-group";

        var selectLabel = document.createElement("label");
        selectLabel.textContent = "Update:";
        selectLabel.setAttribute("for", "status-" + t.id);
        updateDiv.appendChild(selectLabel);

        var select = document.createElement("select");
        select.id = "status-" + t.id;
        select.setAttribute("data-id", String(t.id));

        var statusOptions = ["In Progress", "Completed", "Overdue"];
        for (var k = 0; k < statusOptions.length; k++) {
            var opt = document.createElement("option");
            opt.value = statusOptions[k];
            opt.textContent = statusOptions[k];
            if (statusOptions[k] === t.status) {
                opt.selected = true;
            }
            select.appendChild(opt);
        }

        // Use data-id attribute to avoid closure issues in the loop
        select.onchange = function () {
            updateStatus(Number(this.getAttribute("data-id")), this.value);
        };

        updateDiv.appendChild(select);
        li.appendChild(updateDiv);
        ul.appendChild(li);
    }
}



loadTasks();
checkOverdue();
saveTasks();
renderTasks();