// Autor: Mikołaj Buczak & Kamil Kaloch

function addDigit(sender) {
    let id = document.querySelectorAll('#id')[0];
    
    if (length(id) != 4) {
        id.value = `${id.value}${sender.innerHTML}`;
        return;
    }
    
    let pin = document.querySelectorAll('#pin')[0];
    if (length(id) != 4) {
        pin.value = `${pin.value}${sender.innerHTML}`;

        if (length(pin == 4)) {
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