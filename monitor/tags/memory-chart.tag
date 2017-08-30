<memory-chart>
  <center><h6>{ title }</h6><center>
  <canvas ref="chart"></canvas>

  <script>
    this.source = Array.from({ length: 5 }, () => null);
    this.nowtime = [];

    this.data = {
      labels: this.nowtime,
      datasets: [{
        label: 'MEMORY',
        fill: true,
        data: this.source,
        backgroundColor: "rgba(255,153,0,0.4)",
        borderColor: "rgba(255,153,0,0.4)"
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
            max: 0,
            min: 0,
            stepSize: 0.5,
            callback: function(value, index, values) {
              return value + ' GB';
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
      this.title = `MEMORY used: ${this.source[4]}GB`

      // chartInstance
      this.chartInstance.update();
      this.update();
    };

    this.on('mount', () => {
      this.options.scales.yAxes[0].ticks.max = opts.totalMemory;

      opts.socket.on('stats', (load) => {
        this.updateChart(load.memory);
      });
    });
  </script>
</memory-chart>
