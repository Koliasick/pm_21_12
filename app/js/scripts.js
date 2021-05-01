const total_count = document.getElementById("total_count")
const DATA_COUNT = 7;

const labels_one = [
    '12-6-14',
    '12-7-14',
    '12-8-14',
    '12-9-14',
    '12-10-14',
    '12-11-14',
];
const data_one = {
    labels: labels_one,
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
const config_one = {
    type: 'line',
    data: data_one,
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
//
var options_two = {
    series: [{
        name: "Sales",
        data: [200,320,200,400]
    }],
    chart: {
        type: 'area',
        height: 350,
        zoom: {
            enabled: false
        },
        sparkline:{
            enabled:true
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight',
        colors: ['#ffffff']
    },
    labels: ['','','',''],
    xaxis: {
        type: 'none',
    },
    yaxis: {
        opposite: true,
        min: 0
    },
    legend: {
        show: false,
        colors: ['#ff00d8']
    },
    grid: {
        show: false,
        padding:{
            left:0,
            right:0,
            bottom:0
        }
    },
    fill: {
        colors: '#f1c40f',
        type: 'solid'
    },
    markers: {
        size: 4,
        shape: 'circle',
        colors: ['#ff00d8']
    }
};
//
var options = {
    series: [{
        name: 'New',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
        name: 'Returning',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }],
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '65%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['12-3-14', '12-4-14', '12-5-14', '12-6-14', '12-7-14', '12-8-14', '12-9-14', '12-10-14', '12-11-14'],
    },
    yaxis: {
        title: {
            text: 'Users'
        }
    },
    fill: {
        opacity: 1,
        colors: ['#34495e','#1efe00']
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + " users"
            }
        }
    },
    legend: {
        colors: ['#34495e','#1efe00'],
        markers: {
            fillColors: ['#34495e','#1efe00'],
        }
    }
};
//
window.addEventListener('load', function () {
    update_counters();
    var bigChart = new Chart(
        document.getElementById('big_graph'),
        config_one
    );
    document.getElementById('reload').addEventListener('click',reload);
    var chart = new ApexCharts(document.querySelector("#area_graph"), options_two);
    var bar_chart = new ApexCharts(document.querySelector("#bar_chart"), options);
    chart.render();
    bar_chart.render();
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

google.charts.load('current', {
    'packages':['geochart'],
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
        ['Country','Percent of users'],
        ['Germany','10%'],
        ['United States','11%'],
        ['Canada','12%'],
        ['RU','18%'],
        ['Ukraine','40%'],
        ['China','9%']
    ]);

    var options_map = {
        backgroundColor: '#f39c12',
        defaultColor: '#56d4f1',
        datalessRegionColor: '#efbb88'
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options_map);
}