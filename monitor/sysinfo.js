let socket = io('http://localhost:3000');

socket.on('sysinfo', (data) => {
  memoryOptions.scales.yAxes[0].ticks.max = data.totalmemory;

  riot.mount('os-info', {
    platform: data.platform,
    distro: data.distro,
    release: data.release,
    kernel: data.kernel,
    arch: data.arch,
    hostname: data.hostname
  });
});