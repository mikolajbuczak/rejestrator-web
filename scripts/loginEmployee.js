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
    let id = document.querySelectorAll('#id')[0].value;
    let pin = document.querySelectorAll('#pin')[0].value;

    let credentials = `${id}:${pin}`;
    credentials = btoa(credentials);
    let hash = `Basic ${credentials}`;

    let request = new XMLHttpRequest();
    request.open("GET", "..\\..\\rejestrator\\api\\loginEmployee", false);
    request.setRequestHeader("Authorization", hash);
    request.send();

    if (request.status != 200) {
        let error = document.querySelectorAll(".error")[0];
        error.classList.remove('error');
        return;
    }

    window.location.replace("employeeDashboard.html");
    console.log(request.responseText);
}