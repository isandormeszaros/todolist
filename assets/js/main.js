//SCROLLED LIST
const maxVisibleTasks = 5;
const currentTasksContainer = document.getElementById("current-tasks");
const startTask = document.querySelector(".start-task");

function updateScrollability() {
  const currentTasks = currentTasksContainer.querySelectorAll(".current-tasks");
  if (currentTasks.length > maxVisibleTasks) {
    startTask.style.overflowY = "scroll";
    startTask.style.scrollbarColor="#6187C1 transparent" 
    startTask.style.scrollbarWidth="thin" 
  } else {
    startTask.style.overflowY = "hidden";
  }
}

//VALIDATE INPUT FIELD
const taskInput = document.getElementById('new-task-input');
const addButton = document.getElementById('add-task-btn');
const validTaskError = document.getElementById('valid-task-error');

addButton.addEventListener("click", addTask);

//ADD TASKS
function addTask() {
    const task = taskInput.value.trim();
    if (task.length === 0) {
        validTaskError.innerHTML = "Please enter a task!";
    } else {
        //ADD TASK
        validTaskError.innerHTML = ""; 
        let currentTasks = document.getElementById("current-tasks");
        const newItem = document.createElement("div");
        newItem.classList.add("current-tasks")
        newItem.classList.add("tasks-margin")
        newItem.innerHTML = ` 
        <button id="check-task-btn" class="check-task-btn"><i class="ri-checkbox-blank-circle-line"></i></button>
        <button id="delete-task-btn" class="delete-task-btn"><i class="ri-close-line"></i></button>
        <button id="edit-task-btn" class="edit-task-btn"><i class="ri-edit-circle-line"></i></button>
        <p class="task" id="task"> ${taskInput.value}</p>
        ` 
        
        currentTasks.appendChild(newItem);
        //---------------------------- NEW CODE INSERT START ----------------------------//
        //LOCAL STORAGE
            localStorage.setItem('value', taskInput.value);
            localStorage.getItem('value');
        //--------------------------------------------------------------------------------//

        taskInput.value = "";

        

        //DELETE TASKS
        const deleteButton = newItem.querySelector(".delete-task-btn");
        deleteButton.addEventListener("click", function () {
            currentTasks.removeChild(newItem);
            updateScrollability();
        });

        // COMPLETED TASK
        const completeTaskName = newItem.querySelector(".task");
        const completeTask = newItem.querySelector(".check-task-btn");
        const changeIcon = completeTask.querySelector("i");

        completeTask.addEventListener("click", function() {
            completeTaskName.classList.toggle('active');
            changeIcon.classList.toggle('ri-checkbox-circle-line');
        });

        //EDIT TASKS
        const editButtons = document.querySelectorAll(".edit-task-btn");
        editButtons.forEach(function (editButton) {
            editButton.addEventListener("click", editTask);
            updateScrollability();
        });

        function editTask() {
            const taskItem = this.parentElement;
            const taskText = taskItem.querySelector(".task");
            taskText.contentEditable = true;
            taskText.focus();
            updateScrollability();

            function setCursorPosition(el, pos) {
                const range = document.createRange();
                const sel = window.getSelection();
                range.setStart(el.childNodes[0], pos);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
            
            const desiredCursorPosition = taskText.textContent.length;
            setCursorPosition(taskText, desiredCursorPosition);

            taskText.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    taskText.contentEditable = false;
                }
            });  
        
        //LOCAL STORAGE WITH JSON
        let storage = JSON.parse(localStorage.getItem('tasks')) || []

       
        }
    }
}



//---------------------------- NEW CODE INSERT START ----------------------------//
//LOCAL STORAGE
 


//--------------------------------------------------------------------------------//


updateScrollability();

// ENTER KEYPRESS
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

//RANDOM IMAGE CHANGE
 var images = [
    'assets/images/background-1.png',
    'assets/images/background-2.png',
    'assets/images/background-3.png',
    'assets/images/background-4.png',
    'assets/images/background-5.png',
]

var img = document.getElementById('random-image')


function randomIMG() {
    var num = Math.floor(Math.random() * images.length);
    img.style.backgroundImage = 'url("' + images[num] + '")';
    img.style.backgroundAttachment = "fixed";
    img.style.backgroundRepeat = "no-repeat";
    img.style.backgroundSize = "cover";
}

window.addEventListener('load', randomIMG);