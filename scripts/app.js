// Ui Vars
const form = document.querySelector('#task-form'); 
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all Event Listeners
loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTask);
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
    link.innerHTML = '<i class="fa fa-times"></i> ';

    // append the link to the li
    li.appendChild(link);

    // append li to URL
    taskList.appendChild(li);

    //clear input box
    taskInput.value = '';

    e.preventDefault();
}


