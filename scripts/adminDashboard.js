// Autor: Mikołaj Buczak & Kamil Kaloch

function logout() {
    sessionStorage.removeItem('currentAdminID');
    sessionStorage.removeItem('currentAdminPin');
    sessionStorage.removeItem('currentAdminName');
    sessionStorage.removeItem('currentAdminSurname');
    
    window.location.replace("loginAdmin.html");
}