'use strict';

/* い つ も の ヤ ツ */
const PORT = process.env.PORT || 3000;
const app = require("express")();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sister = require('systeminformation');

const mByte = 1024 * 1024;
const gByte = mByte * 1024;
/********************/

(async () => {
  const os = await OSInfo();
  const totalmem = await totalMem();
  /* html一式で動くようになったため不要 だが俺はあえて残しておくぞ
  app.get('/', function(req, res){
    res.sendFile(__dirname + '/monitor/index.html');
  });
  */

  io.on('connection', async (socket) => {
    io.emit('sysinfo', {
      platform: os.platform,
      distro: os.distro,
      release: os.release,
      kernel: os.kernel,
      arch: os.arch,
      hostname: os.hostname,
      totalmemory: totalmem
    });

    (async () => {
      let start, end, cpu, mem;

      // ソケットが接続されてる間
      while(socket.connected) {
        start = new Date();
        cpu = await currLoad();
        mem = await currMem();
        console.log(mem);
        io.emit('stats', {
          cpu: cpu,
          memory: mem,
        });
        end = new Date();

        // ループ全体で5秒になるまで待機
        await delay(5000 - (end - start));
      }
    })();
  });

  http.listen(PORT, () => {
    console.log('listening on *:3000');
  });

  /* 実装中
  let iface = await ifaceAll();
  iface.forEach((e) => {
    
  });*/
})();

/* 情 報 を 返 す ヤ ツ */
// CPU Load
async function currLoad() {
  try {
    const data = await sister.currentLoad();
    return Math.floor(data.currentload);
  }
  catch(error) {
    console.error(error);
  }
}

// MEMORY USED
async function currMem() {
  try {
    const data = await sister.mem();
    return Math.floor(data.used / gByte * 100) / 100;
  }
  catch(error) {
    console.error(error);
  }
}

// TOTALMEMORY
async function totalMem() {
  try {
    const data = await sister.mem();
    return Math.ceil(Math.floor(data.total / gByte * 10) / 10);
  }
  catch(error) {
    console.error(error);
  }
}

// ALL NETWORK INTERFACE
async function ifaceAll() {
  try {
    const data = await sister.networkInterfaces();
    return data.map(i => i.iface);
  }
  catch(error) {
    console.error(error);
  }
}

//NET STATS
async function netStats(iface) {
  try {
    return await sister.networkStats(iface);
  }
  catch(error) {
    console.error(error);
  }
}

//OS INFOMATION
async function OSInfo() {
  try {
    return await sister.osInfo();
  }
  catch(error) {
    console.error(error);
  }
}

/********************/

// そのうち使うかもしれない 独自Delay
async function delay (s) {
  await sleep(s);
}

function sleep(s) {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), s);
  });
}
