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
        surname = "Czerwiska";
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

    tasksAvailable.forEach(task => {
        let row = table.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.innerHTML = task.task;

        let button = document.createElement('button');
        button.innerHTML = "START";
        cell2.appendChild(button);
    });
}


function displayTasksInProgress() {
    getTasksInProgress();
    
    let table = document.querySelectorAll('#inProgress')[0];

    tasksInProgress.forEach(task => {
        let row = table.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.innerHTML = task.task;

        let button = document.createElement('button');
        button.innerHTML = "KONIEC";
        cell2.appendChild(button);
    });
}

function displayTasksDone() {
    getTasksDone();
    
    let table = document.querySelectorAll('#done')[0];

    tasksDone.forEach(task => {
        let row = table.insertRow(0);
        let cell = row.insertCell(0);

        cell.innerHTML = task.task;
    });
}

function getTasksAvailable() {
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
    let request = new XMLHttpRequest();
    request.open("GET", `..\\..\\rejestrator\\api\\tasksDone\\${employeeID}`, false);
    request.send();

    if (request.status != 200) {
        console.error("Can't GET data!");
        return;
    }

    tasksDone = JSON.parse(request.responseText);
}