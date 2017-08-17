const nowtime = [];
const cpu = Array.from({ length: 10 }, () => null);
const mem = Array.from({ length: 10 }, () => null);

socket.on('stats', function (load) {
  let time = new Date();
  let cChart = cChartCanvas();
  let mChart = mChartCanvas();

  nowtime.shift();
  nowtime[9] = ("0"+(time.getHours() + 1)).slice(-2) + ":" + ("0"+(time.getMinutes() + 1)).slice(-2) + ":" + ("0"+(time.getSeconds() + 1)).slice(-2);
  cpu.shift();
  cpu.push(load.cpu);
  mem.shift();
  mem.push(load.memory);
  cChart.update();
  mChart.update();
});