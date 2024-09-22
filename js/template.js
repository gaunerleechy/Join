/*CONTACT HTML*/

function createContactStripeHtml(i, isActive) {
    const contact = contacts[i];
    const activeClass = isActive ? 'active-contact' : '';
    return /*Html*/`
    <div class="contact center ${activeClass}" onclick="renderContactCard(${i}); setActiveContact(${i}); toggleClass()">
        <div class="initials center ${activeClass} center" style="background-color:${contact.color};">
            ${contact.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div class="bold-text">
            <p >${checkIfContactisUser(contact.name)}</p>
            <a class="${activeClass}" type="e-mail" href="mailto:${contact.mail}">${contact.mail}</a>
        </div>
    </div>`;
}

function overlayHtml(contact = null, index = null) {
    let headerText = index !== null ? 'Edit contact' : 'Add contact';
    let contactInitials = contact ? contact.name.split(' ').map(n => n[0]).join('') : '';
    let contactColor = contact ? contact.color : '#ccc';
    return /*html*/`
    <div class="left-container center">
        <img class="logo" src="./assets/icons/capa 1.svg">
        <p class="motto-label">${headerText}</h1>
        <p class="motto-subtext" id="edit-subtext">Tasks are better with a team!</p>
        <div class="seperator-overlay"></div>
    </div>    
    <div class="mid-container center">
        <div class="initials initials--open-contact center" id="edit-initials" style="background-color:${contactColor};">
            ${contactInitials ? `<div>${contactInitials}</div>` : `<img class="person-svg" src="./assets/icons/person.svg">`}
        </div>
    </div>
    <div class="right-container center">
        <div class="close-icon center" onclick="closeOverlaySlide()">
            <img src="./assets/icons/close.svg">
        </div>
        <form class="input-button-box center" onsubmit="event.preventDefault(),chooseCreateOrSave()" id="createandeditform" onchange="checkForm('createandeditform')">
            <div>            
                <input class="input input-name" id="name-input" type="text" placeholder="Name" value="${contact ? contact.name : ''}" required>
                <br>
                <label for="name-input" class="redtext d-none" id="name-inputlabel">Please insert Name.</label>
            </div>
            <div>
                <input type="email" class="input input-mail" id="mail-input"  placeholder="Email" pattern="[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}$" value="${contact ? contact.mail : ''}">
                <br>
                <label for="mail-input" class="redtext d-none" id="mail-inputlabel">Example: my@mail.com.</label>
            </div>
            <div>
                <input class="input input-phone" id="phone-input" type="tel"  placeholder="Phone" value="${contact ? contact.phonenumber : ''}" pattern="[0-9]+">
                <br>
                <label for="phone-input" class="redtext d-none" id="phone-inputlabel">Please only numbers.</label>
            </div>
            <input type="hidden" id="contact-index" value="${index !== null ? index : ''}">
            <input type="hidden" id="contact-color" value="${contact ? contact.color : ''}">
        </form>
        <div class="button-box center">
                <button class="button-empty-small cancel-button" ${index !== null ? checkIfContactisActualUser(index) : ''} id="${index !== null ? 'Delete' : 'Cancel'}" onclick="${index !== null ? "deleteContact(lastviewcontact)" : "closeOverlaySlide()"}">${index !== null ? 'Delete' : 'Cancel'}</button>
                <button type="submit"  form="createandeditform" class="button-filled-large create-button" id="create-save-button" disabled="${index !== null ? 'false' : 'true'}">${index !== null ? 'Save' : 'Create Contact'}</button>
        </div>
    </div>
    `;
}

function contactCardHtml(contact, index) {   
    return /*Html*/`
        <div class="open-contact-headline center">
            <div class="initials initials--open-contact center" id="initials-and-color" style="background-color:${contact.color};">
                ${contact.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="open-contact-name-and-icons center">
                <p class="center" id="nameedit">${checkIfContactisUser(contact.name)}</p>
                <div class="icons center">
                    <a class="edit" onclick="showOverlay(); editContact(${index})">Edit</a>
                    <a class="delete"  ${checkIfContactisActualUser(index)} onclick="deleteContact(${index})">Delete</a>
                </div>
            </div>
            </div>
        <p class="contactcardinfo" >Contact Information</p>
        <div class="phone-and-e-mail-container" id="mailedit">
            <p>Email</p>
            <a href="mailto:${contact.mail}" class="e-mail-card" id="phonedit">${contact.mail}</a>
        </div>
        <div class="phone-and-e-mail-container">
            <p>Phone</p>
            <a href="tel:+49${contact.phonenumber}" style="color: black;">+49 ${contact.phonenumber}</a>
    </div>
    `;
}

function createFontStripeHtml(currentInitial, lastInitial) {
    let html = '';
    if (currentInitial !== lastInitial) {
        html = /*Html*/`
        <div class="register-letter bold-text center">${currentInitial}</div>`;
    }
    return html;
}

function mobileMenuPopUpHtml(index) {
    return /*HTML*/`
       <p class="mobile-link edit" onclick="showOverlay(); editContact(${index})">Edit</p>
       <p class="mobile-link delete" ${checkIfContactisActualUser(index)} onclick="deleteContact(${index})">Delete</p>
    `;
}

/* Add Tasks HTML */

function renderAssignedContactshtml(shortname,color) {
    return /*html*/`
       <div class="contacticon center" style="background-color:${color};">${shortname}</div>
    `
  }  

function renderHtmlContactLi(name,shortname,color) {
  return /*html*/`
    <li class="contactslistassign">
      <input type="checkbox" id="${name}" onchange="assignedToTasK('${name}')"/>
      <span class="checkmark"></span>
      <label for="${name}">
        <span class="contacticon center" style="background-color:${color};">${shortname}</span> ${checkIfContactisUser(name)} 
      </label>
      </li>
  `
}
function renderHtmlContactLiUser(name,shortname) {
  return /*html*/`
    <li class="contactslistassign">
      <input type="checkbox" id="${name}" onchange="assignedToTasK('${name}')"/>
      <span class="checkmark"></span>
      <label for="${name}">
        <span class="contacticon center">${shortname}</span> ${name} (You)
      </label>
      </li>
  `
}
function subTaskHtml(subtask,i) {
  return /*html*/`
    <li>
      <span class="dot" id="dotsub${i}"></span>
      <div class="subtaskslable">                            
          <input class="subtasksli" type="text" disabled value="${subtask}" id="subtask${i}" onkeypress="checkPressEnter(event,'edit',${i})">                             
          <span id="subhover${i}">
              <i class="editbutton" onclick="editSubTask(${i})"></i>
              <i class="deletebutton" onclick="delteSubTask(${i})"></i>
          </span>
          <span class="subtaskediticons d-none" id="subtaskediticons${i}">
              <i class="deletebuton" onclick="renderSubTasks()"></i>
              <i class="addsubtask" onclick="saveEditSubtask(${i})"></i>
          </span>
      </div>
    </li>
  `
}

/**   board HTML   */

function showNoTaskContainerHTML(text) {
  return /*html*/`
      <div class="no-tasks-container">No tasks ${text}</div>
  `;
}

function renderAssignedContactsSmallCard(color,shortname) {
    return /*html*/`
        <div class="circle circle-to-do" style="background-color:${color}">${shortname}</div>
    `
}

function totalSubtaskHTML(amount,totalSubtask) {
    return /*html*/`
        <div>
            ${amount}/${totalSubtask} Subtask
        </div>
    `;
}

function renderCardHTML(element, indexOfTask) {
    return /*html*/`
    <div id="cardContainer${indexOfTask}"  class="card-container center" draggable="true" ondragstart="startDragging(${indexOfTask})">
        <div class="changeprogressmenü" id="changeprogressmenü${indexOfTask}" onclick="showProgressMenue(${indexOfTask})">
            <img src="./assets/icons/arrow_drop_downaa.svg" alt="">
            <div class="progressmenue d-none" id="chooseprogress${indexOfTask}">
            </div>
        </div>
        <div id="card${indexOfTask}" class="card">
            <div class="frame-119" onclick="showTaskOverlay(${indexOfTask})">
                <div class="headsmallboardcard center"> 
                    <div id="labelBoardCard${indexOfTask}" class="label-board-card">
                        <div class="user-story">
                            ${element['category']}
                        </div>
                    </div>
                </div>
                <div class="title-description-container">
                    <div class="title">${element['title']}</div>
                    <div class="card-description">${element['description']}</div>
                </div>
                <div class="progress" id="progressContainer${indexOfTask}">
                    <div class="progressbar" id="progressbar${indexOfTask}">
                        <div id="fillerProgressbar${indexOfTask}" class="filler"></div>
                    </div>
                    <div id="cardSubtasks${indexOfTask}" class="card-subtasks"></div>
                </div>
                <div class="circle-prio-container">
                    <div class="circle-container" id="assignedusers${indexOfTask}">
                        
                    </div>
                    <div class="center countassigneduseres" id="countassigneduseres${indexOfTask}"></div>
                    <div class="priority-symbols">
                        <img src="${choosePrioSymbol(element['prio'])}">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
    `;
}

function countAssignedContactsHTML(users) {
    return /*html*/`
        ${users['Assigned To'].length} <img src="./assets/icons/person.svg">
    `
}

function renderSubTasksBigCars(i,element,indexOfTask) {
    return /*html*/`
            <div class="checkbox-title-container">
                <input onclick="isChecked(${indexOfTask},${i})" class="checkbox" type="checkbox" ${checkboxcheck(element.state)}  id="checkbox${i}" name="checkbox${i}"/>
                <span class="checkmark"></span>
                <label for="checkbox${i}">${element.title}</label>
            </div>
    `
}

function renderAssignedNamesAndColorsBigCard(name,color,shortname) {
    return /*html*/`
            <div class="assigned-row-overlay">
                <span class="circle circle-in-progress" style="background-color:${color}">${shortname}</span>
                <span>${name}</span>
            </div>
    `
}

function rendertaskOverlayHTML(indexOfTask) {
    return /*html*/`
    <div class="task-overlay-container" onclick="doNotClose(event)" id="overlaycontainer">
        <div class="user-story-close-container">
            <div id="labelOverlay${indexOfTask}" class="user-story-overlay">${tasks[indexOfTask]['category']}</div>
            <img onclick="closeTaskOverlay()" src="./assets/icons/close.svg" alt="">
        </div>
        <h1>${tasks[indexOfTask]['title']}</h1>
        <p class="content-overlay">${tasks[indexOfTask]['description']}</p>
        <div class="date-overlay">
            <span>Due date:</span>
            <span>${tasks[indexOfTask]['duedate']}</span>
        </div>
        <div class="priority-overlay">
            <span>Priority:</span>
            <div>
                <span>${tasks[indexOfTask]['prio']}</span>
                <img src="${choosePrioSymbol(tasks[indexOfTask]['prio'])}" alt="">
            </div>
        </div>
        <div class="assigned-grid-overlay">
            <div>Assigned To:</div>
            <div id="tableAssignedTo" class="assignedcontactslistboardbigcard"></div>
        </div>
        
        <div class="subtasks-grid-overlay" id="formSubtasks">
            <div>Subtasks:</div>

        </div>
        
        <div class="delete-edit-container">
            <div onclick="delteTask('${indexOfTask}')"><img class="trash-delete" src="./assets/icons/trash-board.svg" alt="">
            Delete</div>
            <img class="line-vertical" src="./assets/icons/line-vertical.svg" alt="">
            <div onclick="editTask('${indexOfTask}')"><img class="trash-delete" src="./assets/icons/edit.svg" alt="">
            Edit</div>
        </div>
    </div>
`;
}

function renderEditTasksHtml(i) {
    return /*html*/`        
        <div class="add-task-bg" style="width:unset; padding:0 0 0 5px; position:relative;" onclick="checkAssignedDropDownWindowOpen(),doNotClose(event)"  id="overlaycontainer">
        <div class="edit-container-close">
                    <div class="user-story-overlay" style="background:unset;"></div>
                    <img onclick="closeTaskOverlay()" src="./assets/icons/close.svg" alt="">
                </div>
            <div class="taskform" style="flex-direction: column; gap:unset; height:auto;">

                <div class="taskform-half" style="width:unset; padding:15px;">

                    <div class="input-container">
                        <h2 class="input-title">Title</h2>
                        <input type="text" placeholder="Enter a title" id="inputtitle"  value="${tasks[i].title}" onkeyup="checkRequiredfieldsEdit()" autocomplete="off">
                    </div>

                    <div class="text-area-container">
                        <h2 class="input-title">Description</h2>
                        <textarea placeholder="Enter a Description" id="textfieldinput">${tasks[i].description}</textarea>
                    </div>
                    
                    <div class="input-container">
                        <h2 class=" input-title">Due date</h2>
                        <input type="date" class="input-date" value="${tasks[i].duedate}" id="inputdate" onchange="checkRequiredfieldsEdit()">
                    </div>

                    <div class="input-container">
                        <h2 class="input-title">Prio</h2>
                        <div class="check-button-container">
                            <button class="button-empty-small-2 urgentprio" id="urgent" onclick="changePrio('urgent')">Urgent</button>
                            <button class="button-empty-small-2 mediumprio mediumprioaktive" id="medium" onclick="changePrio('medium')">Medium</button>
                            <button class="button-empty-small-2 lowprio" id="low" onclick="changePrio('low')">Low</button>
                        </div>
                    </div>
    
                </div>

                <div class="taskform-half" style="width:unset; padding:15px;">

                <div class="input-container dropdown-check-list-contacts" id="contact-select">
                        <h2 class="input-title">Assigned to</h2>
                        <span class="anchor" id="anchorButton" onclick="showContactslistToAssign(),doNotClose(event)">Select contacts to assign</span>
                        <input type="text" class="anchorinput d-none" id="anchorinput" onkeyup="filterContacts()" onclick="doNotClose(event)"" autocomplete="off">
                        <icon class="arrowupanchorinput d-none" id="anchoricon" onclick="showContactslistToAssign()"></icon>
                        <ul class="items" id="assignlist" onclick="doNotClose(event)">
                        </ul>
                    </div>
                    <div class="showassignedcontacts" id="showassignedcontacts"></div>

                    <div class="subtask input-container " style="margin-top:25px;">
                        <h2 class="input-title">Subtasks</h2>
                        <input class="input-subtask input-title" type="text" autocomplete="off" placeholder="Add new subtask" id="subtaskinputfield" onkeyup="changeIconsSubtask()" onkeypress="checkPressEnter(event,'create')">
                        <div class="iconssubtask center d-none" id="subtasksicons">
                        <i class="clearsubtask" onclick="resetsubtasksinput()"></i>
                        <i class="addsubtask" onclick="addSubTaskToList()"></i>
                        </div>
                    </div>
                    <ul id="showsubtasks" class="showsubtasks">
                    </ul>
                </div>
            </div>
            <div class="edit-check-footer"> 
           
                    <button class="button-filled-large" style="width:auto;" id="edittaskdone" onclick="submitEditTask(${i})">
                        <span>OK</span>
                        <img class="input-and-button-icons" src="./assets/icons/check.svg">
                    </button>

            </div> 
        </div>       
    `
}

function renderAddtaskformHTML() {
    return /*html*/`
        <div class="add-task-bg" style="width: unset;position:relative;" onclick="checkAssignedDropDownWindowOpen(),doNotClose(event)" id="overlaycontainer">
            <div class="close-add-task-board">
                <div style="background:unset;"></div>
                <img onclick="closeAddTaskDialog()" src="./assets/icons/close.svg" alt="">
            </div>
            <h1>Add Task</h1>

            <div class="taskform">

                <div class="taskform-half">

                    <div class="input-container">
                        <h2 class="required input-title">Title</h2>
                        <input type="text" placeholder="Enter a title" id="inputtitle" onkeyup="checkRequiredfields()" autocomplete="off">
                    </div>

                    <div class="text-area-container">
                        <h2 class="input-title">Description</h2>
                        <textarea placeholder="Enter a Description" id="textfieldinput"></textarea>
                    </div>

                    <div class="input-container dropdown-check-list-contacts" id="contact-select">
                        <h2 class="input-title">Assigned to</h2>
                        <span class="anchor" id="anchorButton" onclick="showContactslistToAssign(),doNotClose(event)">Select contacts to assign</span>
                        <input type="text" class="anchorinput d-none" id="anchorinput" onkeyup="filterContacts()" onclick="doNotClose(event)"" autocomplete="off">
                        <icon class="arrowupanchorinput d-none" id="anchoricon" onclick="showContactslistToAssign()"></icon>
                        <ul class="items" id="assignlist" onclick="doNotClose(event)">
                        </ul>
                    </div>
                    <div class="showassignedcontacts" id="showassignedcontacts"></div>
                </div>

                <div class="taskform-half">

                    <div class="input-container">
                        <h2 class="required input-title">Due date</h2>
                        <input type="date" class="input-date" id="inputdate" onchange="checkRequiredfields()">
                    </div>

                    <div class="input-container">
                        <h2 class="input-title">Prio</h2>
                        <div class="check-button-container">
                            <button class="button-empty-small-2 urgentprio" id="urgent" onclick="changePrio('urgent')">Urgent</button>
                            <button class="button-empty-small-2 mediumprio mediumprioaktive" id="medium" onclick="changePrio('medium')">Medium</button>
                            <button class="button-empty-small-2 lowprio" id="low" onclick="changePrio('low')">Low</button>
                        </div>
                    </div>

                    <div class="input-container">
                        <h2 class="required input-title">Category</h2>
                        <select name="category" id="categoryselect" onchange="checkRequiredfields()">
                            <option value="" selected hidden disabled>Select task category</option>
                            <option value="Technical Task">Technical Task</option>
                            <option value="User Story">User Story</option>
                        </select>
                    </div>

                    <div class="subtask input-container ">
                        <h2 class="input-title">Subtasks</h2>
                        <input class="input-subtask input-title" type="text" autocomplete="off" placeholder="Add new subtask" id="subtaskinputfield" onkeyup="changeIconsSubtask()" onkeypress="checkPressEnter(event,'create')">
                        <div class="iconssubtask center d-none" id="subtasksicons">
                        <i class="clearsubtask" onclick="resetSubTasksInput()"></i>
                        <i class="addsubtask" onclick="addSubTaskToList()"></i>
                        </div>
                    </div>
                    <ul id="showsubtasks" class="showsubtasks">
                    </ul>
                </div>
            </div>
            <div class="add-task-page-footer">
                <p class="required-info">This field is required</p>
                <div class="task-footer-button-container">
                    <button class="button-empty-small mobileoff" onclick="clearSide()">Clear
                        <span class="input-and-button-icons closex"></span>
                    </button>
                    <button class="button-filled-large" id="createtask" disabled onclick="createNewTask()">
                        <span>Create Task</span>
                        <img class="input-and-button-icons"src="./assets/icons/check.svg">
                    </button>
                </div>
            </div>
        </div>
        <div class="createdtaskmessage d-none" id="createdtaskmessage">
            Task added to board <span></span>
        </div>
    `
}