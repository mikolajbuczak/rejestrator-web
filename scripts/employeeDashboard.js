// Autor: Mikołaj Buczak & Kamil Kaloch

let DEBUG = true;

let employeeID;
let name;
let surname;
let shift;

let tasksAvailable;
let tasksInProgress;
let tasksDone;

function create() {
    getEmployeeData();
    displayName();
    displayTasks();
}

function getEmployeeData() {
    employeeID = sessionStorage.getItem('currentEmployeeID');
    name = sessionStorage.getItem('currentEmployeeName');
    surname = sessionStorage.getItem('currentEmployeeSurname');
    shift = sessionStorage.getItem('currentEmployeeShift');

    if (DEBUG){
        employeeID = "0005";
        name = "Justyna";
        surname = "Czerwińska";
        shift = "Dzienny";
    }
}

function displayName() {
    let nameField = document.querySelectorAll('#name')[0];

    nameField.innerHTML = `${name} ${surname}`;
}

function displayTasks() {
    displayTasksAvailable();
    displayTasksInProgress();
    displayTasksDone();
}

function displayTasksAvailable() {
    getTasksAvailable();
    
    let table = document.querySelectorAll('#available')[0];
    table.innerHTML = '';

    tasksAvailable.forEach(task => {
        let row = table.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.innerHTML = task.task;

        let button = document.createElement('button');

        button.innerHTML = "START";
        button.onclick = function() {
            startTask(task);
        };

        cell2.appendChild(button);
    });
}


function displayTasksInProgress() {
    getTasksInProgress();
    
    let table = document.querySelectorAll('#inProgress')[0];
    table.innerHTML = '';

    tasksInProgress.forEach(task => {
        let row = table.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.innerHTML = task.task;

        let button = document.createElement('button');

        button.innerHTML = "KONIEC";
        button.onclick = function() {
            endTask(task);
        };

        cell2.appendChild(button);
    });
}

function displayTasksDone() {
    getTasksDone();
    
    let table = document.querySelectorAll('#done')[0];
    table.innerHTML = '';

    tasksDone.forEach(task => {
        let row = table.insertRow(0);
        let cell = row.insertCell(0);

        cell.innerHTML = task.task;
    });
}

function getTasksAvailable() {
    tasksAvailable = [];
    let request = new XMLHttpRequest();
    request.open("GET", `..\\..\\rejestrator\\api\\tasksAvailable\\${employeeID}`, false);
    request.send();

    if (request.status != 200) {
        console.error("Can't GET data!");
        return;
    }

    tasksAvailable = JSON.parse(request.responseText);
    tasksAvailable.reverse();
}

function getTasksInProgress() {
    tasksInProgress = [];
    let request = new XMLHttpRequest();
    request.open("GET", `..\\..\\rejestrator\\api\\tasksInProgress\\${employeeID}`, false);
    request.send();

    if (request.status != 200) {
        console.error("Can't GET data!");
        return;
    }

    tasksInProgress = JSON.parse(request.responseText);
}

function getTasksDone() {
    tasksDone = [];
    let request = new XMLHttpRequest();
    request.open("GET", `..\\..\\rejestrator\\api\\tasksDone\\${employeeID}`, false);
    request.send();

    if (request.status != 200) {
        console.error("Can't GET data!");
        return;
    }

    tasksDone = JSON.parse(request.responseText);
}

function startTask(task) {
    deleteTaskAvailable(task);
    addTaskInProgress(task);

    displayTasksAvailable();
    displayTasksInProgress();
}

function endTask(task) {
    deleteTaskInProgress(task);
    addTaskDone(task);

    displayTasksInProgress();
    displayTasksDone();
}

function deleteTaskAvailable(task) {
    let request = new XMLHttpRequest();
    request.open("DELETE", `..\\..\\rejestrator\\api\\startTask\\${task.id}`, false);
    request.send();

    if (request.status != 200) {
        console.error("Can't DELETE task!");
        return;
    }
}

function addTaskInProgress(task){
    let request = new XMLHttpRequest();
    request.open("POST", `..\\..\\rejestrator\\api\\tasksInProgress`, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let params = `employeeID=${task.employeeID}&task=${task.task}&date=${getDate()}`;
    request.send(params);

    if (request.status != 200) {
        console.error("Can't POST task!");
        return;
    }
}

function deleteTaskInProgress(task) {
    let request = new XMLHttpRequest();
    request.open("DELETE", `..\\..\\rejestrator\\api\\endTask\\${task.id}`, false);
    request.send();

    if (request.status != 200) {
        console.error("Can't DELETE task!");
        return;
    }
}

function addTaskDone(task){
    let request = new XMLHttpRequest();
    request.open("POST", `..\\..\\rejestrator\\api\\tasksDone`, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let params = `employeeID=${task.employeeID}&task=${task.task}&startdate=${task.date}&enddate=${getDate()}&time=${calculateTime(task.date)}`;
    request.send(params);

    if (request.status != 200) {
        console.error("Can't POST task!");
        return;
    }
}

function getDate() {
    let now = new Date();

    let day = now.getDate().toString();
    if (day.length < 2) day = `0${day}`;

    let month = (now.getMonth() + 1).toString();
    if (month.length < 2) month = `0${month}`;

    let year = now.getFullYear().toString();

    let hour = now.getHours().toString();
    if (hour.length < 2) hour = `0${hour}`;

    let minute = now.getMinutes().toString();
    if (minute.length < 2) minute = `0${minute}`;

    return `${day}.${month}.${year} ${hour}:${minute}`;
}

function calculateTime(taskStart) {
    let start = taskStart.split(' ');
    let date = start[0].split('.');
    let time = start[1];

    let day = date[0];
    let month = date[1];
    let year = date[2];

    let format = `${year}-${month}-${day}T${time}:00`;
    let startDate = new Date(format);

    let diff = Date.now() - startDate;

    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    let finalDiff = hh == 0 ? `${mm}min.` : `${hh}h ${mm}min.`;
    return finalDiff;
}

function logout() {
    sessionStorage.removeItem('currentEmployeeID');
    sessionStorage.removeItem('currentEmployeePin');
    sessionStorage.removeItem('currentEmployeeName');
    sessionStorage.removeItem('currentEmployeeSurname');
    sessionStorage.removeItem('currentEmployeeShift');
    
    window.location.replace("loginEmployee.html");
}