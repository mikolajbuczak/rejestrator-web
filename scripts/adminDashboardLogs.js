// Autor: Mikołaj Buczak & Kamil Kaloch

let logs;

function displayLogs() {
    getLogs();

    let table = document.querySelectorAll('#logs')[0];
    table.innerHTML = '';

    logs.forEach(log => {
        let row = table.insertRow(0);
        let id = row.insertCell(0);
        let fullName = row.insertCell(1);
        let date = row.insertCell(2);

        id.innerHTML = log.employeeID;
        fullName.innerHTML = `${log.name} ${log.surname}`;
        date.innerHTML = log.date;
    });
}

function getLogs() {
    logs = [];
    let request = new XMLHttpRequest();
    request.open("GET", `..\\..\\rejestrator\\api\\logsData`, false);
    request.send();

    if (request.status != 200) {
        console.error("Can't GET data!");
        return;
    }

    logs = JSON.parse(request.responseText);
}

