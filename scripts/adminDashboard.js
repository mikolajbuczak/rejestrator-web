// Autor: Mikołaj Buczak & Kamil Kaloch

function create() {
    let nameField = document.querySelectorAll('#name')[0];

    let name = sessionStorage.getItem('currentAdminName');
    let surname = sessionStorage.getItem('currentAdminSurname');

    nameField.innerHTML = `${name} ${surname}`;
}