const total_count = document.getElementById("total_count")
const DATA_COUNT = 7;

const labels = [
    '12-6-14',
    '12-7-14',
    '12-8-14',
    '12-9-14',
    '12-10-14',
    '12-11-14',
];
const data = {
    labels: labels,
    datasets: [{
        label: 'visitors',
        backgroundColor: 'rgb(254, 199, 63)',
        borderColor: 'rgb(254, 199, 63)',
        data: [15, 5, 16, 20, 21, 30, 25],
        pointStyle: 'circle',
        pointRadius: 6,
        pointBorderColor: 'rgb(255, 255, 255)',
        pointBackgroundColor: 'rgb(255, 0, 0)',
    }, {
        label: 'sales',
        backgroundColor: 'rgb(30, 255, 0)',
        borderColor: 'rgb(30, 255, 0)',
        data: [0, 10, 5, 2, 20, 30, 45],
        pointStyle: 'circle',
        pointRadius: 6,
        pointBorderColor: 'rgb(255, 255, 255)',
        pointBackgroundColor: 'rgb(255, 0, 216)',
    }]
};
const config = {
    type: 'line',
    data: data,
    options: {
        interaction: {
            mode: 'index',
        },
        plugins: {
            legend: {
                    position: 'bottom',
                    labels:
                        {
                          color: '#ffffff'  ,
                        },
                },
            title: {
                display: false,
            },
            tooltip: {
                usePointStyle: true,
            }
        },
        scales: {
            y: {
                ticks:
                    {
                      color: '#ffffff'
                    },
                grid:
                    {
                        color: '#ffffff'
                    }
            },
            x: {
                ticks:
                    {
                        color: '#ffffff'
                    },
                grid:
                    {
                        color: '#ffffff'
                    }
            },
        }
    }
};
window.addEventListener('load', function () {
    update_counters();
    var bigChart = new Chart(
        document.getElementById('big_graph'),
        config
    );
    document.getElementById('reload').addEventListener('click',reload);
    bigChart.options.animation = false;
})
function update_counters()
{
    fetch("https://api.countapi.xyz/update/pm_21_11/total_visits/?amount=1")
        .then(res=>res.json())
        .then(res=>{
            total_count.innerHTML=res.value;
        });
}
function reload(){
    location.reload();
}