let memoryData = {
  labels: nowtime,
  datasets: [{
    label: 'MEMORY',
    fill: false,
    data: mem,
    borderColor: "rgba(255,153,0,0.4)"
  }]
}

let memoryOptions = {
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
        max: 0,
        min: 0,
        stepSize: 0.5
      }
    }]
  },
  responsive: false,
  responsiveAnimationDuration: 0,
}

const memoryChart = document.getElementById('mChart').getContext('2d');

function mChartCanvas(){
  let mChart = new Chart(memoryChart, {
    type: 'line',
   data: memoryData,
    options: memoryOptions
  });
  
  return mChart;
}