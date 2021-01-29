// Autor: Mikołaj Buczak & Kamil Kaloch

function create() {
    let nameField = document.querySelectorAll('#name')[0];

    let name = sessionStorage.getItem('currentEmployeeName');
    let surname = sessionStorage.getItem('currentEmployeeSurname');

    nameField.innerHTML = `${name} ${surname}`;
}