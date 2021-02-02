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

function eraseDigit() {
	let id = document.querySelectorAll('#id')[0];
	let pin = document.querySelectorAll('#pin')[0];
	
	if (pin.value.length > 0){
		pin.value = pin.value.substr(0,pin.value.length - 1);
		return;
	}
	if (id.value.length > 0){
		id.value = id.value.substr(0,id.value.length - 1);
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
        let error = document.querySelectorAll("#error")[0];

        if (error.classList.contains('error')) {
            error.classList.remove('error');
        }

        id.value = "";
        pin.value = "";
        return;
    }

    let employee = JSON.parse(request.responseText);
    sessionStorage.setItem('currentEmployeeID', employee.employeeID);
    sessionStorage.setItem('currentEmployeePin', employee.pin);
    sessionStorage.setItem('currentEmployeeName', employee.name);
    sessionStorage.setItem('currentEmployeeSurname', employee.surname);
    sessionStorage.setItem('currentEmployeeShift', employee.shift);
    
    writeLog(employee.employeeID);
    window.location.replace("employeeDashboard.html");
}

function goToLoginAdmin() {
	window.location.replace("loginAdmin.html");
}

function writeLog(id) {
    let request = new XMLHttpRequest();
    request.open("POST", `..\\..\\rejestrator\\api\\logs`, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let params = `employeeID=${id}&date=${getDate()}`;
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