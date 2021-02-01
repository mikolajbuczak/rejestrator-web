// Autor: Mikołaj Buczak & Kamil Kaloch

function loginAdmin() {
    let username = document.querySelectorAll('#username')[0];
    let password = document.querySelectorAll('#password')[0];

    let credentials = `${username.value}:${password.value}`;
    credentials = btoa(credentials);
    let hash = `Basic ${credentials}`;

    let request = new XMLHttpRequest();
    request.open("GET", "..\\..\\rejestrator\\api\\loginAdmin", false);
    request.setRequestHeader("Authorization", hash);
    request.send();

    if (request.status != 200) {
        let error = document.querySelectorAll(".error")[0];
        error.classList.remove('error');

        username.value = "";
        password.value = "";
        return;
    }

    let admin = JSON.parse(request.responseText);

    sessionStorage.setItem('currentAdminID', admin.id);
    sessionStorage.setItem('currentAdminPin', admin.password);
    sessionStorage.setItem('currentAdminName', admin.name);
    sessionStorage.setItem('currentAdminSurname', admin.surname);

    window.location.replace("adminDashboard.html");
}

function goToLoginEmployee() {
	window.location.replace("loginEmployee.html");
}