  let assignedToArray = [];
  let subtaskArray = [];

  /**
   * Show and hide the dropdownmenu of Assigned to
   */
  function showContactslistToAssign() {
      document.getElementById('contact-select').classList.toggle('visible');
      document.getElementById('anchorinput').classList.toggle('d-none');
      document.getElementById('anchorButton').classList.toggle('d-none');
      document.getElementById('anchoricon').classList.toggle('d-none');
      document.getElementById("anchorinput").value = '';
      filterContacts()
  }

  /**
   * render the Contacts to assign to dropdown menü
   */
  function renderAndloadContactsToAssign(){
    const list = document.getElementById('assignlist');
    list.innerHTML = '';
  
    for (let index = 0; index < contacts.length; index++) {
      const name = contacts[index]['name'];
      let shortname = shortNames(name);
      let color = contacts[index]['color']
      
      list.innerHTML += renderHtmlContactLi(name,shortname,color)      
    }  
    checkboxChecked() 
  }

  /**
   * 
   * @param {string} name - from Contacts or User
   * @returns - First letter of each Word
   */
  function shortNames(name) {
    return  name.match(/\b(\w)/g).join('');
  }

  /**
   * Funktion to put ore delete the contacs to the assignedToArray if not allready in
   * 
   * @param {string} name - ID from chosen Contact
   */
  function assignedToTasK(name) {
    const userchoise = assignedToArray.filter(assignedToArray => assignedToArray == name);
    const checkstatus = document.getElementById(name).checked;    

    if (userchoise.length == 0  && checkstatus === true) {
      assignedToArray.push(name);
      renderAssignedContacts();

    } else if (userchoise == name && checkstatus === false) {
      const assignedToArrayWithoutName = assignedToArray.filter(function (getname) {
         return getname !== name;        
      });
    assignedToArray = assignedToArrayWithoutName;
    renderAssignedContacts()
    }
  }

  /**
   * Where to render the ContactsIcon from assignedToArray
   */
  function renderAssignedContacts() {
    const assignedConntacts = document.getElementById('showassignedcontacts');
    assignedConntacts.innerHTML = '';

    assignedToArray.forEach(name => {
      shortname = shortNames(name);
      color = getColorOfContact(name);
      
      assignedConntacts.innerHTML += renderAssignedContactshtml(shortname,color);
    }); 
  }

  /**
   * Search function for Contacts -->
   */
  function filterContacts(){
    let search = document.getElementById("anchorinput").value.toLowerCase(); 
    let list = document.getElementById("assignlist");

  if (search.length >= 1) {
    list.innerHTML = '';    
    searchfor(list,search);
    } else {
      renderAndloadContactsToAssign();
    }
  }

  /**
   * 
   * @param {string} list - area where the seachresults shown
   * @param {string} search - inputvalue 
   */
  function searchfor(list,search){
    for (let index = 0; index < contacts.length; index++) {
      const name = contacts[index]['name'];
      const shortname = shortNames(name)
      color = getColorOfContact(name);

        if(name.toLowerCase().includes(search)) {          
          list.innerHTML += renderHtmlContactLi(name,shortname,color);     
        }                
      }
      checkboxChecked();
  }

  /**
   *  Check if name already in array and check ist when true
   */
  function checkboxChecked() {
    assignedToArray.forEach(id => {
      let nameid = document.getElementById(id);
      if (nameid !== null) {
        nameid.checked = true;
      }      
    });
  }

  /**
   * filter contacts array for colorinformation
   * 
   * @param {string} name - get the current name from foreach 
   * @returns - the colorcode
   */
  function getColorOfContact(name){
    const filtercontacs = contacts.filter(contact => contact.name == name
    );
    if (filtercontacs.length == 0) {
      return 'lightcoral'
    } else {
      return filtercontacs[0]['color']
    }
   
  }

  /**
   * 
   * @param {string} id -get the id from html
   */
  function changePrio(id) {
    const  urgentprio = document.getElementById('urgent').classList;
    const  mediumprio = document.getElementById('medium').classList;
    const  lowprio = document.getElementById('low').classList;

    resetPrio(urgentprio,mediumprio,lowprio);
    switchPrio(urgentprio,mediumprio,lowprio,id);
  }

  /**
   * 
   * @param {string} urgentprio - get the information which field change in html
   * @param {string} mediumprio - get the information which field change in html
   * @param {string} lowprio - get the information which field change in html
   */
  function resetPrio(urgentprio,mediumprio,lowprio) {
    urgentprio.remove('urgentprioaktive');
    mediumprio.remove('mediumprioaktive');
    lowprio.remove('lowprioaktive'); 
  }

  /**
   * 
   * @param {string} urgentprio - get the information which field to change
   * @param {string} mediumprio - get the information which field to change
   * @param {string} lowprio - get the information which field to change
   * @param {string} id - get the information which field's id change to active
   */
  function switchPrio(urgentprio,mediumprio,lowprio,id) {
    switch (id) {
      case 'urgent':
        urgentprio.add('urgentprioaktive');
        data["prio"] = "Urgent";
        break;
      case 'medium':
        mediumprio.add('mediumprioaktive');
        data["prio"] = "Medium";
        break;
      case 'low':
        lowprio.add('lowprioaktive');
        data["prio"] = "Low";
        break;    
      default:
        break;
    }
  }
  
  /**
   *  Show and hide the subtasks Icons
   */
  function changeIconsSubtask() {
    const inputfield = document.getElementById('subtaskinputfield').value
    const subtasksicons = document.getElementById('subtasksicons').classList;

    if (inputfield !== '') {
      subtasksicons.remove('d-none')
    } else {
      subtasksicons.add('d-none')
    }
  }

  /**
   *  reset the Value from addsubtasks Input
   */
  function resetSubTasksInput(){
    const inputfield = document.getElementById('subtaskinputfield');

    inputfield.value = '';
    changeIconsSubtask();
  }

  /**
   * Add the inputvalue from Subtask to subtaskarray and call rendersubtasks if value not empty
   */
  function addSubTaskToList() {
    const newsubtask = document.getElementById('subtaskinputfield');

    if (newsubtask.value !== '') {     
      subtaskArray.push(newsubtask.value);
      renderSubTasks();
      newsubtask.value = '';
      changeIconsSubtask();
    }
  }

  /**
   * Render the the tasks from tasksarray 
   */
  function renderSubTasks() {
    const subtaskfield = document.getElementById('showsubtasks');

    subtaskfield.innerHTML = '';

    for (let index = 0; index < subtaskArray.length; index++) {
      const subtask = subtaskArray[index];
      subtaskfield.innerHTML += subTaskHtml(subtask,index);
    }
  }

  /**
   * Delete the Subtask from Array
   * 
   * @param {string} index - position in subtasksarray
   */
  function delteSubTask(index) {
    subtaskArray.splice(index,1);
    renderSubTasks();
  }

  /**
   * change the Inputfield to enable , and change shown Icons for edit
   * 
   * @param {string} index - position in subtasksarray
   */
  function editSubTask(index) {
    document.getElementById(`dotsub${index}`).classList.toggle('d-none');
    document.getElementById(`subhover${index}`).classList.toggle('d-none');
    document.getElementById(`subtaskediticons${index}`).classList.toggle('d-none');
    document.getElementById(`subtask${index}`).disabled = false;
  }

  /**
   * Save the changes from Inputfield , when in edit Mode
   * 
   * @param {string} index - position in subtasksarray
   */
  function saveEditSubtask(index) {
    const editsubtask = document.getElementById(`subtask${index}`).value;

    if (editsubtask !== '') {      
      subtaskArray.splice(index,1,editsubtask);
      renderSubTasks();      
    } else {
      delteSubTask(index)
    }
  } 

  /**
   * Make the addsubtask possible to check witch press enter
   * 
   * @param {event} e - check which key pressed
   * @param {string} check - info which field create or edit (set in HTML)
   * @param {string} index - position in subtasksarray
   */
  function checkPressEnter(e,check,index) {
    if (e.keyCode == 13 && check == 'create') {
      addSubTaskToList();
    } else if (e.keyCode == 13 && check == 'edit') {
      saveEditSubtask(index);
    }
  }

  /**
   * Get the Id's from the required field and check if all have value
   */
  function checkRequiredfields() {
    const inputtitle = document.getElementById('inputtitle');
    const date = document.getElementById('inputdate');
    const category = document.getElementById('categoryselect');
        
    ifElseHelpFunctionCheckRequiedFields(inputtitle,date,category);
  }

  /**
   * reload the side and clear it , after check which is current side
   */
  function clearSide() {    
    changePrio('medium');
    dataObjectReset();
    resetEditArray();
    renderAssignedContacts();
    resetInputfieldsToclearSide()
    renderSubTasks()
    checkRequiredfields()
  }

  /**
   * reset the inputfield , wihin function clearSide()
   */
  function resetInputfieldsToclearSide() {
    document.getElementById('inputtitle').value = '';
    document.getElementById('inputdate').value = '';
    document.getElementById('categoryselect').value = '';
    document.getElementById('textfieldinput').value = '';
    resetSubTasksInput()
  }

  /**
   * get all Inputvalue and arrayinfo into data then push it into tasksarray , put to firebase
   */
  function createNewTask() {    
    data["title"] = document.getElementById('inputtitle').value;
    data["duedate"] = document.getElementById('inputdate').value;
    data["category"] = document.getElementById('categoryselect').value;
    data["description"] = document.getElementById('textfieldinput').value;    
    data["Assigned To"] = assignedToArray;
    subtaskArray.map((sub) => data["subtask"].push({"state":false, "title":sub }));
    tasks.push(data);

    saveChangedData()
    linkToBoardOrReload()
  }   

  /**
   * Show message for Succsessfully create new task
   */
  function linkToBoardOrReload() {
    document.getElementById('createdtaskmessage').classList.remove('d-none');
    setTimeout(()=> {window.location.href = "./board.html"} , 2000);
  }

  /**
   * empty the arrays
   */
  function resetEditArray() {
    assignedToArray = [];
    subtaskArray = [];
  }

  /**
   * 
   * @returns - return the orginal empty data object , to prevent posible problems
   */
  function dataObjectReset() {
    return data = {
      "Assigned To": [],
      "category": "",
      "description": "",
      "duedate": "",
      "prio": "Medium",
      "subtask": [],
      "title": "",
      "progress": "to do"      
    }
  }