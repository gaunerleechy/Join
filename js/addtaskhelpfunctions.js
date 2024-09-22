  /**
   *  Save the main Arrays Contacts and taks into SessionStorage, upload to firebase and call the reset of data object
   */
  function saveChangedData() {
    saveAsSessionStorage();
    putData("tasks",tasks);
    dataObjectReset()
}
  /**
   * Check if the Assignedto container is visible and close it when click on other content
   */
  function checkAssignedDropDownWindowOpen() {
    const dropdownmenü = document.getElementById('contact-select');
     
    if (dropdownmenü) {
      const classList = Array.from(dropdownmenü.classList).filter(list => list == 'visible') 
      if (classList == 'visible') {
        showContactslistToAssign()
      }
    }
  }

  /**
 * 
 * @param {event} event -prevent child from closing  , when parent have onclickfunction to close
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 * 
 * @returns - current date for limit the date in add tasks
 */
function returnCurrentDate() {
  const mindate = document.getElementById('inputdate');
  if (mindate) {

    let today = new Date();

    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    
    
    mindate.setAttribute("min", `${today}`)
  }
}

  /**
   * 
   * @param {string} inputtitle - dom path to current id
   * @param {string} date - dom path to current id
   * @param {string} category - dom path to current id
   */
  function ifElseHelpFunctionCheckRequiedFields(inputtitle,date,category) {
    if (inputtitle.value !== '' && date.value !== '' && category.value !== '' && checkDate(date) == true) {
        document.getElementById('createtask').disabled = false;
        removeRedBorderReqed(inputtitle,date,category);
    } else if(inputtitle.value == '' && date.value == '' && category.value == '') {
      document.getElementById('createtask').disabled = true;
      removeRedBorderReqed(inputtitle,date,category);
    } else {
      markMissingRequiredvalue(inputtitle);
      if (!checkDate(date)) {
        date.classList.add('borderred')
      }      
      markMissingRequiredvalue(category);
      document.getElementById('createtask').disabled = true;        
    } 

  }

  /**
   * check if the input date is higher or current date
   * 
   * @param {string} date - path to dom id from inputdate
   * @returns true or false
   */
  function checkDate(date) {
    let date1 = new Date(date.value)
    let date2 = new Date(date.min)

    if (date1 >= date2) {
      return true
    } else {
      return false
    }
  }

  /**
   * 
   * @param {string} inputtitle - document path to id
   * @param {string} date - document path to id
   * @param {string} category - document path to id
   */
  function removeRedBorderReqed(inputtitle,date,category) {
    inputtitle.classList.remove('borderred');
    date.classList.remove('borderred');
    category.classList.remove('borderred');
  }

  /**
   * Check if value from Input ,date or selectbox are missing , when yes mark them red
   * 
   * @param {string} field -get id from inputfield to check
   */
  function markMissingRequiredvalue(field) {
    if (field.value == '') {
      field.classList.add('borderred')
    } else {
      field.classList.remove('borderred') 
    }
  }