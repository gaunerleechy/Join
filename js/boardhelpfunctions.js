/**
 * Check if the requied fields input and data are filled, if no the ok button is disable
 */
function checkRequiredfieldsEdit() {
    const inputtitle = document.getElementById('inputtitle');
    const date = document.getElementById('inputdate');

    if (inputtitle.value && date.value !== '') {
        document.getElementById('edittaskdone').disabled = false;
    } else {
        document.getElementById('edittaskdone').disabled = true;
    }

    markMissingRequiredvalue(inputtitle);
    markMissingRequiredvalue(date)
}

/**
 * Switch the state in subtasks between true or false and save it in TasksArray
 * 
 * @param {string} tasksindex - get the tasks id 
 * @param {*} subtaskindex - get the subtasks id
 */
function isChecked(tasksindex, subtaskindex) {
    const subtask = tasks[tasksindex]['subtask'][subtaskindex];

    switch (subtask.state) {
        case true:
            subtask.state = false;
            break;

        case false:
            subtask.state = true;
            break;

        default:
            break;
    }
    saveChangedData()
    initBoard()
}

/**
 * Get all value and change the infos in old Task
 * 
 * @param {string} index - get the tasks id 
 */
function submitEditTask(index) {
    const currentTask = tasks[index];
    data["title"] = document.getElementById('inputtitle').value;
    data["duedate"] = document.getElementById('inputdate').value;
    data["category"] = currentTask.category;
    data["progress"] = currentTask.progress;
    data["description"] = document.getElementById('textfieldinput').value;
    data["Assigned To"] = assignedToArray;
    subtaskArray.map((sub) => data["subtask"].push({ "state": checkState(sub, currentTask), "title": sub }));
    tasks.splice(index, 1, data)

    saveChangedData();
    closeTaskOverlay();
    dataObjectReset();
    initBoard();
}

/**
 * this function check if the current subtitle still exist in subtitles , and if it allready have a state, when yes it returns current state
 * 
 * @param {string} subtitle - search for the value from subtitle 
 * @param {string} task - current tasks informations
 * @returns 
 */
function checkState(subtitle, task) {

    if (task.subtask) {
        subtaskfilterd = task.subtask.filter(subtask => subtask.title == subtitle);

        if (subtaskfilterd[0] !== undefined) {
            return subtaskfilterd[0].state;
        } else {
            return false
        }
    } else {
        return false;
    }
}

/**
 * 
 * @param {sting} i - indexnumber to find wanted position in array
 * @param {sting} users - the current tasksarray path to assigned contacts
 */
function renderCurrentAssignedContactsNumber(i,users){
    let countAssignedContacts = document.getElementById('countassigneduseres'+i);
    countAssignedContacts.innerHTML = '';  

    if (users['Assigned To'].length >= 4 ) {
        countAssignedContacts.innerHTML = countAssignedContactsHTML(users); 
    }
}

/**
 * togge display from progresscontainer
 * 
 * @param {string} index - indexnumber to find wanted position in array
 */
function showProgressMenue(index) {
    const cardmenue = document.getElementById('changeprogressmenü'+index);
    const progresslist = document.getElementById('chooseprogress'+index);

    cardmenue.classList.toggle('rotate');
    progresslist.classList.toggle('d-none');

    progresslist.innerHTML = ''
    renderProgressListMenue(index,progresslist)    
}

/**
 * render the Progress.html and function posibilities into the wanted div container
 * 
 * @param {string} index -indexnumber to find wanted position in array
 * @param {*} path - dom.path to current id
 */
function renderProgressListMenue(index,path) {
    const progressArray = ['to do','in progress','Await feedback','Done']
    const task = tasks[index]['progress']

    path.innerHTML += /*html*/`
        <h4>Change progress to:</h4>
    `
    progressArray.forEach(element => { if (task !== element) {
        const text = element.charAt(0).toUpperCase() + element.slice(1)
        path.innerHTML += /*html*/`
            <div onclick="changeProgressTo('${index}','${element}')">${text}</div>
        `
    }        
    });
}

/**
 * Change the progress in tasks to choosen progress
 * 
 * @param {string} index - indexnumber to find wanted position in array
 * @param {string} progress - get the choosen progress value
 */
function changeProgressTo(index, progress) {
    tasks[index]['progress'] = progress;
    
    saveChangedData()    
    initBoard();
    showProgressMenue(index)
}

/**
 * Add the slideout animation to the overlaycontainer when closing
 */
function addCloseAnimation() {
    const overlaycontainer = document.getElementById('overlaycontainer');

    overlaycontainer.classList.add('slideoutclass')

    setTimeout(() => {
        overlaycontainer.classList.remove('slideoutclass')
    }, 700);
}