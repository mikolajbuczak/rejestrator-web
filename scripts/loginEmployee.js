// Autor: Mikołaj Buczak & Kamil Kaloch

function addDigit(sender) {
    let id = document.querySelectorAll('#id')[0];
    
    if (id.value.length != 4) {
        id.value = `${id.value}${sender.childNodes[0].innerHTML}`;
        return;
    }
    
    let pin = document.querySelectorAll('#pin')[0];
    if (pin.value.length != 4) {
        pin.value = `${pin.value}${sender.childNodes[0].innerHTML}`;

        if (pin.value.length == 4) {
            loginEmployee();
        }

        return;
    }
}

function loginEmployee() {
    let id = document.querySelectorAll('#id')[0];
    let pin = document.querySelectorAll('#pin')[0];

    let credentials = `${id.value}:${pin.value}`;
    credentials = btoa(credentials);
    let hash = `Basic ${credentials}`;

    let request = new XMLHttpRequest();
    request.open("GET", "..\\..\\rejestrator\\api\\loginEmployee", false);
    request.setRequestHeader("Authorization", hash);
    request.send();

    if (request.status != 200) {
        let error = document.querySelectorAll(".error")[0];
        error.classList.remove('error');

        id.value = "";
        pin.value = "";
        return;
    }

    let employee = JSON.parse(request.responseText);

    sessionStorage.setItem('currentEmployeeID', employee.id);
    sessionStorage.setItem('currentEmployeePin', employee.pin);
    sessionStorage.setItem('currentEmployeeName', employee.name);
    sessionStorage.setItem('currentEmployeeSurname', employee.surname);
    sessionStorage.setItem('currentEmployeeShift', employee.shift);
    
    window.location.replace("employeeDashboard.html");
}