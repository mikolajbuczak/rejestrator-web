// Autor: Mikołaj Buczak & Kamil Kaloch

let employees;
let employeeID;

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

function addTask() {
    let task = getTaskValue();

    if(!task) {
        displayError("Wpisz treść zadania!");
        return;
    }

    let canPostTask = postTask(task)
    if(!canPostTask) {
        displayError("Nie można przydzielić tego zadania!");
        resetControls();
        return;
    }

    resetControls();
}

function getTaskValue() {
    const task = document.querySelector('#task');

    if(!employeeID) {
        return null;
    }

    if(!task.value) {
        return null;
    }

    return task.value;
}

function postTask(task) {
    if(!task) {
        return false;
    }

    let request = new XMLHttpRequest();
    request.open("POST", `..\\..\\rejestrator\\api\\tasksAvailable`, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let params = `employeeID=${employeeID}&task=${task}`;
    request.send(params);

    if (request.status != 200) {
        return false;
    }
    return true;
}

function displayError(errorMessage) {
    const errorField = document.querySelector('#error');
    errorField.innerHTML = errorMessage;
}

function resetControls() {
    resetSearchBox();
    resetTextarea();
}

function resetSearchBox() {
    const selected = document.querySelector('.selected');
    const optionsContainer = document.querySelector('.options-container');
    const searchBox = document.querySelector('.search-box input');
    const optionsList = document.querySelectorAll(".option");

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

    searchBox.value = "";
    filterList("");

    if (optionsContainer.classList.contains("active")) {
        optionsContainer.classList.remove("active");
    }

    selected.innerHTML = "Wybierz pracownika";
    employeeID = null;
}

function resetTextarea() {
    const task = document.querySelector('#task');
    task.value = "";
}