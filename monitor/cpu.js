let cpuData = {
  labels: nowtime,
  datasets: [{
    label: 'CPU',
    fill: false,
    data: cpu,
    borderColor: "rgba(153,255,51,0.4)"
  }]
}

let cpuOptions = {
  animation: {
    duration: 0,
  },
  elements: {
    line: {
      tension: 0,
    }
  },
  hover: {
    animationDuration: 0,
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        max: 100,
        min: 0,
        stepSize: 10
      }
    }]
  },
  responsive: false,
  responsiveAnimationDuration: 0,
}

const cpuChart = document.getElementById('cChart').getContext('2d');

function cChartCanvas(){
  let cChart = new Chart(cpuChart, {
    type: 'line',
    data: cpuData,
    options: cpuOptions
  });
  return cChart;
}