<cpu-chart>
  <center><h6>{ title }</h6><center>
  <canvas ref="chart"></canvas>

  <script>
    this.source = Array.from({ length: 5 }, () => null);
    this.nowtime = [];

    this.data = {
      labels: this.nowtime,
      datasets: [{
        label: 'CPU',
        fill: true,
        data: this.source,
        backgroundColor: "rgba(153,255,51,0.4)",
        borderColor: "rgba(153,255,51,0.4)"
      }]
    };

    this.options = {
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
            stepSize: 10,
            callback: function(value, index, values) {
              return value + ' %';
            }
          }
        }]
      },
      responsive: true,
      responsiveAnimationDuration: 0,
    };

    this.updateChart = (loadValue) => {
      if (this.chartInstance == null) {
        this.chartInstance = new Chart(this.refs.chart.getContext('2d'), {
          type: 'line',
          data: this.data,
          options: this.options
        });
      }

      // time
      const time = new Date();
      this.nowtime.shift();
      this.nowtime[4] = ("0"+(time.getHours() + 1)).slice(-2) + ":" + ("0"+(time.getMinutes() + 1)).slice(-2) + ":" + ("0"+(time.getSeconds() + 1)).slice(-2);

      // source
      this.source.shift();
      this.source.push(loadValue);
      
      // Title
      this.title = `CPU used: ${this.source[4]}%`

      // chartInstance
      this.chartInstance.update();
      this.update();
    };

    this.on('mount', () => {
      opts.socket.on('stats', (load) => {
        this.updateChart(load.cpu);
      });
    });
  </script>
</cpu-chart>
