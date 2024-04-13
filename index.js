
const tasks = [
  { task: 'Meeting', description: 'Client Meeting', duration: '00.50.43' },
  { task: 'Project', description: 'Review Session', duration: '01.30.00'},
  { task: 'Personal Break', description: '-', duration: '24.00.00'},
  { task: 'Meeting', description: 'Team Activity', duration: '00.30.00'},
  { task: 'Workshop', description: 'MernStack Session', duration: '00.50.43'},
  { task: 'Meeting', description: 'Daily Scrum', duration: '07.30.00' },
  { task: 'Project', description: 'Project Explore Review', duration: '00.50.40'},
  { task: 'Workshop', description: 'Future Guidance', duration: '01.00.00'},
  { task: 'Project Break', description: 'Tea break', duration: '00.20.00'},
  { task: 'Meeting', description: 'Assessment Meeting', duration: '00.04.30' }
];

let timerInterval;
let timerRunning = false;
let timerValue = 0; 

function startTimer() {
  if (!timerRunning) {
    timerInterval = setInterval(updateTimer, 1000); 
    timerRunning = true;
  }
}


function updateTimer() {
  timerValue++;
  displayTimer(); 
}

function pauseTimer() {
  clearInterval(timerInterval); 
  timerRunning = false;
  
  document.getElementById('duration').value = formatTime(timerValue);
}
function resetTimer() {
  clearInterval(timerInterval); 
  timerValue = 0;
  timerRunning = false;
  displayTimer(); 
}

function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
function displayTimer() {
  document.getElementById("timer").textContent = formatTime(timerValue);
}
function pad(value) {
  return value < 10 ? "0" + value : value;
}
document.getElementById("startTimerBtn").addEventListener("click", startTimer);
document.getElementById("stopTimerBtn").addEventListener("click", pauseTimer);
document.getElementById("restartTimerBtn").addEventListener("click", resetTimer);

function renderTasks(tasks) {
  const tableBody = document.querySelector('#taskBody');
  tableBody.innerHTML = tasks.map((task, index) => `
      <tr>
          <td>${task.task}</td>
          <td>${task.description}</td>
          <td id="timer-${index}">${task.duration}</td>
          <td>
              <button onclick="editTask(${index})">Edit</button>
              <button onclick="deleteTask(${index})">Delete</button>
          </td>
      </tr>
  `).join('');
}
function editTask(index) {
  const task = tasks[index];
  document.getElementById('task').value = task.task;
  document.getElementById('description').value = task.description;
  document.getElementById('duration').value = task.duration;

  document.getElementById('addTaskForm').setAttribute('data-edit-index', index);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(tasks);
}
document.getElementById('addTaskForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const taskIndex = document.getElementById('addTaskForm').getAttribute('data-edit-index');
  const task = {
      task: addTaskForm.elements.task.value,
      description: addTaskForm.elements.description.value,
      duration: addTaskForm.elements.duration.value,
    
  };

  if (taskIndex) {
      tasks[taskIndex] = task;
  } else {
      tasks.push(task);
  }

  addTaskForm.reset();
  addTaskForm.removeAttribute('data-edit-index');

  renderTasks(tasks);
});

renderTasks(tasks);
