const typeColors = {
    "technical task": '#1fd7c1',
    "user story": '#0038ff',
};

let currentDraggedElement;

function initBoard() {
    updateTaskTable('to do', 'tableToDo');
    updateTaskTable('in progress', 'tableInProgress');
    updateTaskTable('Await feedback', 'tableAwaitFeedback');
    updateTaskTable('Done', 'tableDone');
}

/**
 * Updates the HTML table with tasks that match the given status.
 *
 * @param {string} status - The progress status of the tasks to be displayed (e.g., "open", "in progress").
 * @param {string} tableId - The ID of the HTML table element to be updated.
 *
 * Filters tasks based on the provided status and renders the corresponding task cards in the table.
 * If no tasks are available, a message container is displayed.
 */
function updateTaskTable(status, tableId) {
    const filteredTasks = tasks.filter(t => t.progress === status);  // Filtert die Aufgaben nach dem gegebenen Status.
    const tableElement = document.getElementById(tableId);
    tableElement.innerHTML = '';

    if (filteredTasks.length == 0) {  // Überprüft, ob es Aufgaben im gefilterten Status gibt.
        tableElement.innerHTML = showNoTaskContainerHTML('status');
    } else {
        for (let index = 0; index < filteredTasks.length; index++) {
            let indexOfTask = tasks.indexOf(filteredTasks[index]);  // Findet den Index der Aufgabe im ursprünglichen `tasks`-Array.
            let element = filteredTasks[index];

            tableElement.innerHTML += renderCardHTML(element, indexOfTask);
            renderAssignedContacs(indexOfTask, element, 'assignedusers')
            getTypeLabelBoardColor(indexOfTask, 'labelBoardCard');
            calcTotalSubtask(indexOfTask, element);
        }
    }
}


/**
 * Highlight the tabelle card when dropable
 * 
 * @param {string} id - current dom path id
 */
function highlight(id) {
    const tableCards = document.querySelectorAll(".tabelle-card");

    for (let i = 0; i < tableCards.length; i++) {
        const tableCard = tableCards[i];
        if (tableCard.id == id) {
            tableCard.classList.add('drag-area-highlight');
        } else {
            tableCard.classList.remove('drag-area-highlight');
        }
    }
}

/**
 * Remove all highlightclasses from tabelle on drop card
 */
function removeHighlight() {
    const tableCards = document.querySelectorAll(".tabelle-card");

    for (let i = 0; i < tableCards.length; i++) {
        const tableCard = tableCards[i];

        tableCard.classList.remove('drag-area-highlight');
    }
}

/**
 * Filters tasks based on the search input and displays only tasks that match the search term.
 *
 * Retrieves the value from the search input field, and compares it to the title and description of each task.
 * If a task matches the search term, it remains visible; otherwise, it is hidden.
 */
function filterTask() {
    let search = document.getElementById('searchInput').value.toLowerCase().trim();

    for (let index = 0; index < tasks.length; index++) {
        const description = tasks[index].description;
        const title = tasks[index].title;

        let taskElement = document.getElementById(`cardContainer${index}`);

        if (description.toLowerCase().includes(search) || title.toLowerCase().includes(search)) {
            taskElement.style.display = "block";
        } else {
            taskElement.style.display = "none";
        }
    }
}

/**
 * 
 * @param {string} i - indexnumber to find wanted position in array
 * @param {string} users - the current tasksarray path to assigned contacts
 * @param {string} path - id where the content should display 
 */
function renderAssignedContacs(i, users, path) {
    const assignedcontacts = document.getElementById(`${path}${i}`)
    if (users['Assigned To']) {
        for (let index = 0; index < users['Assigned To'].length; index++) {
            const name = users['Assigned To'][index];
            const shortname = shortNames(name);
            const color = getColorOfContact(name);

            assignedcontacts.innerHTML += renderAssignedContactsSmallCard(color, shortname);

            renderCurrentAssignedContactsNumber(i, users);
        }
    }
}

/**
 * Returns the file path of the appropriate priority icon based on the given priority level.
 *
 * @param {string} priority - The priority level of the task (e.g., "Low", "Medium", "Urgent").
 * @returns {string} The file path of the corresponding priority icon.
 */
function choosePrioSymbol(priority) {
    // let chosedSymbol = document.getElementById('priorityImage').src;
    if (priority === 'Low') {
        return './assets/icons/priority-low.svg';
    } else if (priority === 'Medium') {
        return './assets/icons/priority-equal.svg';
    } else if (priority === 'Urgent') {
        return './assets/icons/priority-hight.svg';
    }
}

/**
 * checked if the screen witdh is above 825px , when yes is shows add task overlay in board , when no it link to add-task html
 * 
 * @param {string} progress - set the progress on current clicked state when creating new task
 */
function openAddTaskDialog(progress) {
    let addTaskOverlay = document.getElementById('addTaskOverlay');

    if (window.innerWidth >= 825) {
        addTaskOverlay.innerHTML = renderAddtaskformHTML();
        addTaskOverlay.style.display = 'flex';
        data["progress"] = progress;
        returnCurrentDate()
    } else {
        window.location.href = "./add-task.html"
    }
}

/**
 * Closes the "Add Task" dialog by hiding the overlay and clearing its content.
 *
 * Hides the overlay element and removes any HTML content inside it to reset the dialog state.
 */
function closeAddTaskDialog() {
    let addTaskOverlay = document.getElementById('addTaskOverlay');
    addCloseAnimation()

    setTimeout(() => {
        addTaskOverlay.style.display = 'none';
        addTaskOverlay.innerHTML = '';
    }, 500);
}

/**
 * Sets the background color of the label board based on the task's category type.
 *
 * @param {number} indexOfTask - The index of the task in the task list.
 * @param {string} labelBoardID - The base ID of the label board element to update.
 *
 * Retrieves the task's category type and sets the background color of the corresponding label board element.
 * Uses a default color if the category type is not found in the `typeColors` mapping.
 */
function getTypeLabelBoardColor(indexOfTask, labelBoardID) {
    let color = tasks[indexOfTask]['category'];
    let bgcolor = typeColors[color.toLowerCase()] || '#A8A878'; // Standardfarbe, falls Typ nicht gefunden
    document.getElementById(labelBoardID + indexOfTask).style.backgroundColor = bgcolor;
}

/**
 * Displays an overlay with detailed information about a task.
 *
 * @param {number} indexOfTask - The index of the task in the task list.
 *
 * Sets the display style of the overlay to 'flex', updates its content with the task details,
 * and calls functions to display assigned users, subtasks, and the task's category color.
 */
function showTaskOverlay(indexOfTask) {
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';

    overlay.innerHTML = rendertaskOverlayHTML(indexOfTask);
    tableAssignedTo(indexOfTask);
    listSubtasks(indexOfTask);
    getTypeLabelBoardColor(indexOfTask, 'labelOverlay');
}

/**
 * Closes the task overlay by hiding it and clearing its content.
 *
 * Hides the overlay element, clears its inner HTML, and resets the edit array.
 */
function closeTaskOverlay() {
    let overlay = document.getElementById('overlay');
    addCloseAnimation()
    setTimeout(() => {
        overlay.style.display = 'none';
        overlay.innerHTML = '';
        resetEditArray();
    }, 600);
}

/**
 * render the the small name Icon and name with user color in assigned to field in big card
 * 
 * @param {string} indexOfTask - id from current tasksarray
 */
function tableAssignedTo(indexOfTask) {
    let tableAssigned = document.getElementById('tableAssignedTo');
    tableAssigned.innerHTML = '';

    if (tasks[indexOfTask]['Assigned To'] !== '' && tasks[indexOfTask]['Assigned To']) {
        for (let index = 0; index < tasks[indexOfTask]['Assigned To'].length; index++) {
            const name = tasks[indexOfTask]['Assigned To'][index];
            const shortname = shortNames(name);
            const color = getColorOfContact(name);

            tableAssigned.innerHTML += renderAssignedNamesAndColorsBigCard(name, color, shortname);
        }
    }
}

/**
 * Calculates and displays the total number of completed subtasks for a given task.
 *
 * @param {number} indexOfTask - The index of the task in the task list.
 * @param {Object} task - The task object, which contains an array of subtasks.
 *
 * Iterates through the subtasks of the task, counts how many are marked as completed, and updates the HTML to display the total.
 * If there are subtasks, the progress bar is updated accordingly. Otherwise, the progress bar is hidden.
 */
function calcTotalSubtask(indexOfTask, task) {
    const subtask = task['subtask'];
    const cardSubtask = document.getElementById(`cardSubtasks${indexOfTask}`);
    let amount = 0;

    cardSubtask.innerHTML = '';

    if (subtask && subtask.length !== 0) {
        subtask.forEach(element => {
            if (element.state == true) { amount++ }
        });

        cardSubtask.innerHTML = totalSubtaskHTML(amount, subtask.length);
        calcProgressbarSubtasks(indexOfTask, task);
    } else {
        document.getElementById(`progressContainer${indexOfTask}`).classList.add('d-none')
    }
}

/**
 * Calculates and updates the width of the progress bar based on the number of completed subtasks.
 *
 * @param {number} indexOfTask - The index of the task in the task list.
 * @param {Object} task - The task object containing an array of subtasks.
 *
 * Iterates through the subtasks of the task and calculates the percentage of completed subtasks.
 * Updates the progress bar's width to reflect the completion percentage.
 */
function calcProgressbarSubtasks(indexOfTask, task) {
    const fillerProgressbar = document.getElementById(`fillerProgressbar${indexOfTask}`);
    const subtask = task['subtask'];
    const length = subtask.length;
    let amountProgressBar = 0;

    fillerProgressbar.innerHTML = '';

    for (let i = 0; i < subtask.length; i++) {
        const state = subtask[i].state;
        if (state) {
            amountProgressBar++;
        }
        const percentBar = (amountProgressBar / length) * 100;
        fillerProgressbar.style.width = `${percentBar}%`;
    }

}

/**
 * render subtaskinfos, when subtask exist
 * 
 * @param {sting} indexOfTask -id from current tasksarray
 * 
 */
function listSubtasks(indexOfTask) {
    const subtask = document.getElementById('formSubtasks');
    subtask.innerHTML = '';

    if (tasks[indexOfTask]['subtask']) {
        for (let i = 0; i < tasks[indexOfTask]['subtask'].length; i++) {
            const element = tasks[indexOfTask]?.['subtask'][i] || '';

            subtask.innerHTML += renderSubTasksBigCars(i, element, indexOfTask)
        }
    } else {
        return false;
    }
}

/**
 * 
 * @param {string} check - current path to the choosen tasks[index].subtask[index].state
 * @returns the checked status into the checkbox
 */
function checkboxcheck(check) {
    if (check == true) {
        return 'checked'
    }
}

/**
 * Initializes the dragging process by setting the currently dragged element's index.
 *
 * @param {number} i - The index of the element being dragged.
 *
 * Stores the index of the element being dragged in a global variable for later use.
 */
function startDragging(i) {
    currentDraggedElement = i;
}

/**
 * Allows an element to be dropped by preventing the default behavior of the drag event.
 *
 * @param {DragEvent} ev - The drag event.
 *
 * Prevents the default action to enable dropping elements into the target area.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Moves the currently dragged task to a new progress status and updates the task tables accordingly.
 *
 * @param {string} progress - The new progress status for the dragged task (e.g., "to do", "in progress", "Await feedback", "Done").
 *
 * Updates the progress status of the currently dragged task, saves the updated tasks to session storage, 
 * refreshes the task tables for all progress categories, and saves the changes.
 */
function moveTo(progress) {
    tasks[currentDraggedElement]['progress'] = progress;
    saveAsSessionStorage();
    updateTaskTable('to do', 'tableToDo');
    updateTaskTable('in progress', 'tableInProgress');
    updateTaskTable('Await feedback', 'tableAwaitFeedback');
    updateTaskTable('Done', 'tableDone');
    saveChangedData();
}

/**
 * Delte the choosen Tasks from Taskarray permanent
 * 
 * @param {string} tasksindex - id from current tasksarray
 */
function delteTask(tasksindex) {
    closeTaskOverlay()
    tasks.splice(tasksindex, 1);
    saveChangedData()
    initBoard();
}

/**
 * Render the Edit window with infos from choosen taks
 * 
 * @param {string} tasksindex - id from current tasksarray
 */
function editTask(tasksindex) {
    const overlay = document.getElementById('overlay');
    const currenttask = tasks[tasksindex];

    overlay.innerHTML = renderEditTasksHtml(tasksindex);
    currenttask['Assigned To'].forEach(element => {
        assignedToArray.push(element)
    });
    renderAssignedContacts()
    changePrio(`${currenttask.prio.toLowerCase()}`);

    if (currenttask['subtask']) {
        currenttask['subtask'].forEach(element => {
            subtaskArray.push(element.title)
        });
        renderSubTasks()
    }
    returnCurrentDate()
}