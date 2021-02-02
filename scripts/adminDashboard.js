// Autor: Mikołaj Buczak & Kamil Kaloch

function create() {
    let nameField = document.querySelectorAll('#name')[0];

    let name = sessionStorage.getItem('currentAdminName');
    let surname = sessionStorage.getItem('currentAdminSurname');

    nameField.innerHTML = `Witaj ${name} ${surname}!`;
}

function logout() {
    sessionStorage.removeItem('currentAdminID');
    sessionStorage.removeItem('currentAdminPin');
    sessionStorage.removeItem('currentAdminName');
    sessionStorage.removeItem('currentAdminSurname');
    
    window.location.replace("loginAdmin.html");
}