let tasks = [
  {
    "title": "Task 1",
    "date": "date",
    "isDone": false
  },
  {
    "title": "Task 2",
    "date": "date",
    "isDone": true
  },
  {
    "title": "Task 3",
    "date": "date",
    "isDone": false
  }
]


function getTasksFromStorage() {
  let retrievedTasks = JSON.parse(localStorage.getItem("tasks"))

  if (retrievedTasks == null) {
    tasks = []
  } else {
    tasks = retrievedTasks
  }

}

getTasksFromStorage()

function fillTasksOnThePage() {

  document.getElementById("tasks").innerHTML = " ";

  let index = 0;
  for (task of tasks) {
    let content =

      `<!-- Task -->
    <div class="task ${task.isDone ? 'done' : ''}">
      <!-- Task Info -->
        <div class="task-info">
          <h2>${task.title}</h2>
          <div class="date">
            <span class="material-symbols-outlined">
              calendar_month
            </span>
            <span>${task.date}</span>
          </div>
        </div>
      <!-- Task Info //-->
      <!-- Task Actions -->
        <div class="task-actions">
          <button onclick="deleteTask(${index})" id="delete-task" class="circular delete"><span class="material-symbols-outlined">
            delete</span></button>
            ${task.isDone ?
        `<button onclick="toggleTaskCompletion(${index})" class="circular finished orCancel"><span class="material-symbols-outlined">
            cancel
          </span></button>`
        :
        `<button onclick="toggleTaskCompletion(${index})" class="circular finished"><span class="material-symbols-outlined">
            done
          </span></button>`
      }
          
          <button onclick="editTaskTitle(${index})" class="circular edit"><span class="material-symbols-outlined">
            edit
          </span></button>
          <!-- Task Actions// -->
          </div>
          </div>
          <!-- Task //-->`

    document.getElementById("tasks").innerHTML += content
    index++
  }
};


fillTasksOnThePage()

document.getElementById("add-new-task").addEventListener("click", function () {
  let now = new Date()
  let date = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear() + " | " + now.getHours() + ":" + now.getMinutes();
  let taskName = prompt("Please insert the task name!")
  let taskObj = {
    "title": taskName,
    "date": date,
    "isDone": false,
  }
  tasks.push(taskObj)

  storeTasks()

  fillTasksOnThePage();
});


function deleteTask(index) {
  let task = tasks[index]
  let isconfirmed = confirm("Are you sure to remove ( " + task.title + " ) ?");

  if (isconfirmed == true) {
    tasks.splice(index, 1);
    storeTasks()
    fillTasksOnThePage();
  }
}

function editTaskTitle(index) {
  let task = tasks[index]
  let newTaskTitle = prompt("Please edit a new  title for this task: ", task.title)
  task.title = newTaskTitle;
  storeTasks()
  fillTasksOnThePage();
}

function toggleTaskCompletion(index) {
  let task = tasks[index]
  if (task.isDone) {
    task.isDone = false;
  } else {
    task.isDone = true;
  }
  storeTasks()
  fillTasksOnThePage();
};

// ============Storage Functions===========//
function storeTasks() {
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksString);
};