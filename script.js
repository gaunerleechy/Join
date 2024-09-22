let tasks = [];
let contacts = []

let user = '';
 user = getDataFromStorage();

/**
 * this function load the wantet Array from firebase
 * 
 * @param {string} path - This set the path which data should be loaded  
 */
async function getData(path) {
  const BASE_URL = "https://remotestorage-fe678-default-rtdb.europe-west1.firebasedatabase.app/";
  
  try {    
    let response = await fetch(BASE_URL + path + ".json");
    let responseAsJson = await response.json();
   return (responseAsJson)
   } catch(error){
    console.error("Sorry something went wrong.");
    return false
   }
}

/**
 * Load the tasks an contacts from Firebase
 */
async function loadTasksandContactsinfos(){
 tasks = await getData("tasks");
 contacts = await getData("contacts");

await saveAsSessionStorage();
}

/**
 * load Arrays into SessionStorage
 */
function saveAsSessionStorage(){
  let taskssAsText = JSON.stringify(tasks);
 sessionStorage.setItem('tasks', taskssAsText);

 let contactsAsText = JSON.stringify(contacts);
 sessionStorage.setItem('contacts', contactsAsText); 
}

/**
 * disbale navmenu and Userfield, when no user or Guest logged in.
 */
function checkIfUserlogin() {
  if (user == '' && window.location.pathname == "/Join/legal.html" | window.location.pathname =="/Join/privacy.html") {
    document.getElementById('navlinks').classList.add('d-none');
    document.getElementById('showuser').classList.add('d-none');
  } else if (user == '') {
    document.getElementById('navlinks').classList.add('d-none');
    document.getElementById('showuser').classList.add('d-none');
    window.location.href = "./index.html" 
  } else {
    setHeaderUserName();
  }
}

/**
 * 
 * @returns Empty user and Arrays data from localseasonstorage when no User in SessionStorage
 */
 function getDataFromStorage() {   
  if (sessionStorage.getItem("user") == undefined) {
    tasks = [];
    contacts = [];
    return user = ''
  } else {
    tasks = JSON.parse(sessionStorage.getItem("tasks"));
    contacts = JSON.parse(sessionStorage.getItem("contacts"));
    return user = sessionStorage.getItem("user");
  }
}

/**
 * Split the Username into first Lesters and use it for Usericon in Header
 */
function setHeaderUserName(){
  let userIcon = user.match(/\b(\w)/g);
  document.getElementById('showuser').innerHTML = userIcon.join('');
}


/**
 * Display the Usermenu under the Usericon
 */
function showUserMenue(){
  document.getElementById('usermenue').classList.toggle('d-none');
}

/**
 * Clear the seassionStorage
 */
async function logOut() {
 await sessionStorage.clear()
}

/**
 * 
 * @param {string} path -path to wanted firebase API folder
 * @param {*} data - wicht object or Array should be PUT to the firebase API
 * @returns 
 */
async function putData(path="", data={}) {  
  const BASE_URL = "https://remotestorage-fe678-default-rtdb.europe-west1.firebasedatabase.app/"; 
  let response = await fetch(BASE_URL + path + ".json",{
     method: "PUT",
     header: {
           "Content-Type": "application/json",
     },
     body: JSON.stringify(data)
  });
  return responsetoJson = await response.json();
}

  /**
   *  Save the main Arrays Contacts and taks into SessionStorage, upload to firebase and call the reset of data object
   */
  function saveChangedDataContacts() {
    saveAsSessionStorage();
    putData("contacts",contacts)
}

/**
 * 
 * @returns random combined color for new contacts
 */
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

  /**
   * 
   * @param {string} name - name of the current contact
   * @returns - uername with (You) or only the name of contact
   */
  function checkIfContactisUser(name) {
    if (name == user) {
      return `${name}  (You)`
    } else {
      return name
    }
  }

/**
 * need for create or edit new tasks
 */
let data = {
  "Assigned To": [],
  "category": "",
  "description": "",
  "duedate": "",
  "prio": "Medium",
  "subtask": [],
  "title": "",
  "progress": "to do"      
}