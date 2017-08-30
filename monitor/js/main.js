let socket = io('http://157.7.142.47:3000');

socket.on('sysinfo', (data) => {
  riot.mount('memory-chart', {
    socket: socket,
    totalMemory: data.totalmemory,
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
    cpu: data.cpu,
    memory: data.totalmemory,
    hostname: data.hostname,
    dname: data.dname,
    dsize: data.dsize,
    duse: data.duse,
    dused: data.dused,
  });
});