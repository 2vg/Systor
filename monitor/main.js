let socket = io('http://localhost:3000');

socket.on('sysinfo', (data) => {
  riot.mount('memory-chart', {
    socket: socket,
    totalMemory: data.totalmemory
  });

  riot.mount('cpu-chart', {
    socket: socket
  });

  riot.mount('os-info', {
    platform: data.platform,
    distro: data.distro,
    release: data.release,
    kernel: data.kernel,
    arch: data.arch,
    hostname: data.hostname
  });
});