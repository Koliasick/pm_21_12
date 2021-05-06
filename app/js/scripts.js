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
        colors: ['#ff00d8'],
        fillColors: ['#ff00d8']
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
    document.getElementById('next').addEventListener('click',_next);
    document.getElementById('prev').addEventListener('click',_prev);
    document.getElementById('send').addEventListener('click',_alert);
    document.getElementById('bot_left').addEventListener('click',display_comments);
    document.getElementById('bot_middle').addEventListener('click',display_articles);
    document.getElementById('bot_right').addEventListener('click',display_users);
    var chart = new ApexCharts(document.querySelector("#area_graph"), options_two);
    var bar_chart = new ApexCharts(document.querySelector("#bar_chart"), options);
    chart.render();
    bar_chart.render();
    bigChart.options.animation = false;
    make_calendar();
})
function update_counters()
{
    fetch("https://api.countapi.xyz/update/pm_21_11/total_visits/?amount=1")
        .then(res=>res.json())
        .then(res=>{
            total_count.innerHTML=res.value;
        });
}
function _prev(){
    if(month_of_today==1){month_of_today=13;}
    today.setDate(1);
    today.setMonth(month_of_today-1);
    day_of_today = today.getDate();
    weekday_of_today = today.getDay();
    month_of_today = today.getMonth();
    make_calendar();
}
function _next(){
    if(month_of_today==12){month_of_today=-1;}
    today.setDate(1);
    today.setMonth(month_of_today+1);
    day_of_today = today.getDate();
    weekday_of_today = today.getDay();
    month_of_today = today.getMonth();
    make_calendar();
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
        sizeAxis: { minValue: 0, maxValue: 100 },
        backgroundColor: '#f39c12',
        defaultColor: '#56d4f1',
        datalessRegionColor: '#efbb88',
        width: '100%'
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options_map);
}

function _alert(){
    alert(document.getElementById('massage').value);
}

const today = new Date();
let day_of_today = today.getDate();
let weekday_of_today = today.getDay();
let month_of_today = today.getMonth();
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const days = ['MO','TU','WE','TH','FR ','SA','SU' ]
const days_in_month = [31,29,31,30,31,30,31,31,30,31,30,31];
const my_calendar = $('#calendar');
const month = $('#month_sel');
if(weekday_of_today==0)
{
 weekday_of_today=7;
}
function make_calendar()
{
    month.empty();
    month.append(months[month_of_today]);
    my_calendar.empty();
    let f_day = day_of_today%7;
    f_day=weekday_of_today - f_day;
    if(f_day<0){f_day = 7 + f_day};
    for (let i=0;i<7;i++)
    {
       my_calendar.append('<div class="p-1 cal_d">'+days[i]+'</div>');
    }
    for (let i=0;i<days_in_month[month_of_today]+f_day;i++)
    {
        if(i<7&&i<f_day)
        {
            my_calendar.append('<div class="p-1"></div>');
            continue;
        }
        if(i-f_day+1==day_of_today)
        {
            my_calendar.append('<div id="today" class="cal_el p-1">'+(i-f_day+1)+'</div>');
            continue;
        }
        my_calendar.append('<div class="cal_el p-1">'+(i-f_day+1)+'</div>');
    }
}

const bottom_tile = $('#content');
function display_comments(){
    bottom_tile.empty();
    bottom_tile.append('<div class="comment p-3"><img class="avatar" src="images/av1.bmp"><div class="com_text"><div class="ps-1"><sub>by</sub><h6>Jolia</h6></div><div class="ps-1">Its long established fact that a reader will be distracted by a readable content of page when looking at its layout.</div></div></div>' +
        '    <div class="comment p-3"><img class="avatar" src="images/av2.bmp"><div class="com_text"><div class="ps-1"><sub>by</sub><h6>Deo</h6></div><div class="ps-1">Its long established fact that a reader will be distracted by a readable content of page when looking at its layout.</div></div></div>' +
        '      <div class="comment p-3"><img class="avatar" src="images/av3.bmp"><div class="com_text"><div class="ps-1"><sub>by</sub><h6>Phionne</h6></div><div class="ps-1">Its long established fact that a reader will be distracted by a readable content of page when looking at its layout.</div></div></div>');
}
function display_articles(){
    bottom_tile.empty();
    bottom_tile.append('<h6 align="center" class="p-5">No recent articles</h6>');
}
function display_users()
{
    bottom_tile.empty();
    bottom_tile.append('<h6 align="center" class="p-5">No new users</h6>');
}