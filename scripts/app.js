// Ui Vars
const form = document.querySelector('#task-form'); 
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All Event Listeners
loadEventListeners();

function loadEventListeners() {
    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add Task Event
    form.addEventListener('submit', addTask);

    // Remove Task Event
    taskList.addEventListener('click', removeTask);

    //Clear Task Event
    clearBtn.addEventListener('click', clearTasks);

    //Filter Task Event
    filter.addEventListener('keyup', filterTasks);
}


    //Get Tasks From Local Storage
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task){ 
        // create li element
        const li = document.createElement('li');
        li.className = 'collection-item';

        //create text node and append to the li
        li.appendChild(document.createTextNode(task));

        //create new link element
        const link = document.createElement('a');

        //add class
        link.className = 'delete-item secondary-content';

        // add icon HTML
        link.innerHTML = '<i class="fa fa-times"></i>';

        // append the link to the li
        li.appendChild(link);

        // append li to URL
        taskList.appendChild(li);
    });
}

    // Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // create li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    //create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element
    const link = document.createElement('a');

    //add class
    link.className='delete-item secondary-content';

    // add icon HTML
    link.innerHTML = '<i class="fa fa-times"></i>';

    // append the link to the li
    li.appendChild(link);

    // append li to URL
    taskList.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input box
    taskInput.value = '';

    e.preventDefault();
}

//Store Task in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();

        //Remove From Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear task
function clearTasks(){
    // taskList.innerHTML='' or while loop to remove each one. While loop faster
    //aka while somethign is in the list
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //Clear From LC
    clearTasksFromLocalStorage();
}

//Clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';   
            }
        }
    ); //can use for each bc queryselectorall returns a node list instead of getElementByClass = html collection/string.
}
