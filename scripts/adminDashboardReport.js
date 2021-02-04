// Autor: Mikołaj Buczak & Kamil Kaloch

let employeesPerSlide = 4;
let currentIndex = 0;
let employeesCount;

let data;
let currentSlideData;

let ctx;
let myChart;

function loadChart() {

    getData();
    getCurrentSlideData();
	Chart.defaults.global.defaultFontColor = '#F2ECEB';
    ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: currentSlideData[0],
            datasets: [
                {
                    label: 'Logowania',
                    data: currentSlideData[1],
                    backgroundColor: '#852faa'
                },
                {
                    label: 'Zadania przydzielone',
                    data: currentSlideData[2],
                    backgroundColor: '#1a78aa'
                },
                {
                    label: 'Zadania w trakcie',
                    data: currentSlideData[3],
                    backgroundColor: '#598a10'
                },
                {
                    label: 'Zadania zakończone',
                    data: currentSlideData[4],
                    backgroundColor: '#c19f3c'
                }
            ]
        },
        options: {
			legend: {
                labels: {
                    fontColor: "#F2ECEB",
                    fontSize: 18
                }
            },
            scales: {
				
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
				
            },
			maintainAspectRatio: false
        }
    });
}

function getData() {
    data = [];

    for(let index = 0; index < 5; index++) {
        data[index] = [];
    }

    let employees = getEmployees();
    employeesCount = employees.length;

    employees.forEach(employee => {
        data[0].push(`${employee.employeeID} ${employee.name} ${employee.surname}`);
        data[1].push(getLogs(employee.employeeID));
        data[2].push(getTasksAvailable(employee.employeeID));
        data[3].push(getTasksInProgress(employee.employeeID));
        data[4].push(getTasksDone(employee.employeeID));
    });
}

function getCurrentSlideData() {
    currentSlideData = [];

    for(let index = 0; index < 5; index++) {
        currentSlideData[index] = [];
    }

    for (let index = 0; index < employeesPerSlide; index++) {
        for(let i = 0; i < 5; i++) {
            if(data[i][currentIndex + index])
                currentSlideData[i].push(data[i][currentIndex + index]);
        }
    }
}

function getEmployees() {
    let request = new XMLHttpRequest();
    request.open("GET", `..\\..\\rejestrator\\api\\employees`, false);
    request.send();

    if (request.status != 200) {
        console.error("Can't GET data!");
        return;
    }

    return JSON.parse(request.responseText);
}

function getLogs(id) {
    let request = new XMLHttpRequest();
    request.open("GET", `..\\..\\rejestrator\\api\\logsData\\${id}`, false);
    request.send();

    if (request.status != 200) {
        console.error("Can't GET data!");
        return;
    }

    return JSON.parse(request.responseText).length;
}

function getTasksAvailable(id) {
    let request = new XMLHttpRequest();
    request.open("GET", `..\\..\\rejestrator\\api\\tasksAvailable\\${id}`, false);
    request.send();

    if (request.status != 200) {
        console.error("Can't GET data!");
        return;
    }

    return JSON.parse(request.responseText).length;
}

function getTasksInProgress(id) {
    let request = new XMLHttpRequest();
    request.open("GET", `..\\..\\rejestrator\\api\\tasksInProgress\\${id}`, false);
    request.send();

    if (request.status != 200) {
        console.error("Can't GET data!");
        return;
    }

    return JSON.parse(request.responseText).length;
}

function getTasksDone(id) {
    let request = new XMLHttpRequest();
    request.open("GET", `..\\..\\rejestrator\\api\\tasksDone\\${id}`, false);
    request.send();

    if (request.status != 200) {
        console.error("Can't GET data!");
        return;
    }

    return JSON.parse(request.responseText).length;
}

function previous() {
    if(currentIndex >= employeesPerSlide)
        currentIndex -= employeesPerSlide
    updateChart();
}

function next() {
    if(currentIndex <= employeesCount - employeesPerSlide)
        currentIndex += employeesPerSlide;
    updateChart();
}

function updateChart() {
    getCurrentSlideData();

    myChart.data.labels = currentSlideData[0];

    myChart.data.datasets[0].data = currentSlideData[1];
    myChart.data.datasets[1].data = currentSlideData[2];
    myChart.data.datasets[2].data = currentSlideData[3];
    myChart.data.datasets[3].data = currentSlideData[4];
    myChart.update();
}