// Autor: Mikołaj Buczak & Kamil Kaloch

let employees;

let employeeID;

let logs;
let tasksAvailable;
let tasksInProgress;
let tasksDone;

function loadSearchBox() {
    const selected = document.querySelector('.selected');
    const optionsContainer = document.querySelector('.options-container');
    const searchBox = document.querySelector('.search-box input');

    addEmployeesToSearchBox();

    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("active");

        searchBox.value = "";
        filterList("");

        if (optionsContainer.classList.contains("active")) {
            searchBox.focus();
        }
    });

    optionsList.forEach(o => {
        o.addEventListener("click", () => {
            selected.innerHTML = o.querySelector("label").innerHTML;
            optionsContainer.classList.remove("active");
            employeeID = o.querySelector("label").innerHTML.split(' ')[0];
            displayEmployeeData();
        });
    });

    searchBox.addEventListener("keyup", function(e) {
        filterList(e.target.value);
    });

    const filterList = searchTerm => {
        searchTerm = searchTerm.toLowerCase();
        optionsList.forEach(option => {
            let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
            if (label.indexOf(searchTerm) != -1) {
                option.style.display = "block";
            } 
            else {
                option.style.display = "none";
            }
        });
    };
}

function addEmployeesToSearchBox() {
    getEmployees();

    const optionsContainer = document.querySelector('.options-container');
    optionsContainer.innerHTML = '';

    employees.forEach(employee => {
        let id = employee.employeeID;
        let name = `${employee.name} ${employee.surname}`;

        let option = document.createElement('div');

        option.classList.add('option');

        let input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('id', `${id}_${name}`);
        input.classList.add('radio');

        let label = document.createElement('label');
        label.setAttribute('for', `${id}_${name}`);
        label.innerHTML = `${id} ${name}`;

        option.appendChild(input);
        option.appendChild(label);

        optionsContainer.appendChild(option);
    });
}

function getEmployees() {
    employees = [];
    let request = new XMLHttpRequest();
    request.open("GET", `..\\..\\rejestrator\\api\\employees`, false);
    request.send();

    if (request.status != 200) {
        console.error("Can't GET data!");
        return;
    }

    employees = JSON.parse(request.responseText);
}

function displayEmployeeData() {
    displayLogs();
    displayTasksAvailable();
    displayTasksInProgress();
    displayTasksDone();
}

function displayLogs() {
    getLogs();

    let table = document.querySelector('#logs');
    table.innerHTML = '';

    logs.forEach(log => {
        let row = table.insertRow(0);
        let id = row.insertCell(0);
        let fullName = row.insertCell(1);
        let date = row.insertCell(2);

        id.innerHTML = log.employeeID;
        fullName.innerHTML = `${log.name} ${log.surname}`;
        date.innerHTML = log.date;
    });
}

function displayTasksAvailable() {
    getTasksAvailable();
    
    let table = document.querySelector('#available');
    table.innerHTML = '';

    tasksAvailable.forEach(task => {
        let row = table.insertRow(0);

        let cell1 = row.insertCell(0);
        cell1.innerHTML = task.task;
        
        // let cell2 = row.insertCell(1);

        // let button = document.createElement('button');
        // button.innerHTML = "START";
        // button.onclick = function() {
        //     startTask(task);
        // };

        // cell2.appendChild(button);
    });
}


function displayTasksInProgress() {
    getTasksInProgress();
    
    let table = document.querySelector('#inProgress');
    table.innerHTML = '';

    tasksInProgress.forEach(task => {
        let row = table.insertRow(0);

        let cell1 = row.insertCell(0);
        cell1.innerHTML = task.task;

        //let cell2 = row.insertCell(1);

        // let button = document.createElement('button');
        // button.innerHTML = "KONIEC";
        // button.onclick = function() {
        //     endTask(task);
        // };

        // cell2.appendChild(button);
    });
}

function displayTasksDone() {
    getTasksDone();
    
    let table = document.querySelector('#done');
    table.innerHTML = '';

    tasksDone.forEach(task => {
        let row = table.insertRow(0);
        let cell = row.insertCell(0);

        cell.innerHTML = task.task;
    });
}

function getLogs() {
    logs = [];
    let request = new XMLHttpRequest();
    request.open("GET", `..\\..\\rejestrator\\api\\logsData\\${employeeID}`, false);
    request.send();

    if (request.status != 200) {
        console.error("Can't GET data!");
        return;
    }

    logs = JSON.parse(request.responseText);
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

function color(label) {
    let dots = document.querySelectorAll('.manual-btn');

    dots.forEach(dot => {
        dot.style.backgroundColor = 'white';
    });

    label.style.backgroundColor = '#403A3A';
}