'use strict';

/* い つ も の ヤ ツ */
const PORT = process.env.PORT || 3000;
const app = require("express")();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sister = require('systeminformation');

const kByte = 1024;
const mByte = kByte * 1024;
const gByte = mByte * 1024;
/********************/

/*
async function test() {
  try {
    const data = await sister.networkInterfaces();
    return data;
  }
  catch(error) {
    console.error(error);
  }
}

(async () => {
  let t = await test();
  let data = 0;
  console.log(t);
  
  /*
  for(const x of t) {
    data += Number(x.size);
  }
  console.log(Math.round(data / gByte));*/

/*
  let iface = await ifaceAll();
  let data = [];
  
  for(const x of iface) {
    let y = await netStats(x);
    
    if(y.operstate === "up") {
      data.push(x);
    }
  }
  
  for(const x of data) {
    let y = await netStats(x);
    
    if(y.operstate === "up") {
      if(y.rx_sec / mByte > 1) {
        console.log(y.rx_sec / mByte);
      }
      else if(y.rx_sec / kByte > 1) {
        console.log(y.rx_sec / kByte);
      }
      else {
        console.log(y.rx_sec);
      }
      
      if(y.tx_sec / mByte > 1) {
        console.log(y.tx_sec / mByte);
      }
      else if(y.tx_sec / kByte > 1) {
        console.log(y.tx_sec / kByte);
      }
      else {
        console.log(y.tx_sec);
      }
    }
  }
})();*/

(async () => {
  const os = await osInfo();
  const cpu = await cpuInfo();
  const iface = await ifaceAll();
  const dinfo = await diskInfo();
  const totalmem = await totalMem();
  
  let netData = [];
  let dname, dsize, duse, dused;
  
  for(const v of iface) {
    let r = await netStats(v);
    
    if(r.operstate === "up") {
      netData.push(v);
    }
  }
  
  dname = dinfo[0].fs;
  dsize = Math.floor(dinfo[0].size / gByte * 10) / 10;
  duse  = Math.floor(dinfo[0].use * 10) / 10;
  dused = Math.floor(dinfo[0].used / gByte * 10) / 10;

  io.on('connection', async (socket) => {
    io.emit('sysinfo', {
      platform: os.platform,
      distro: os.distro,
      kernel: os.kernel,
      arch: os.arch,
      cpu: `${cpu.manufacturer} ${cpu.brand} (${cpu.speed} GHz) - ${cpu.cores}* Cores`,
      totalmemory: totalmem,
      dname: dname,
      dsize: dsize,
      duse: duse,
      dused: dused,
    });

    (async () => {
      let start, end, cpu, mem;

      // ソケットが接続されてる間
      while(socket.connected) {
        start = new Date();
        cpu = await currLoad();
        mem = await currMem();
        
        /*for(const v of netData) {
          let r = await netStats(v);
    
          if(y.operstate === "up") {
            if(y.rx_sec / mByte > 1) {
              console.log(y.rx_sec / mByte);
            }
            else if(y.rx_sec / kByte > 1) {
              console.log(y.rx_sec / kByte);
            }
            else {
              console.log(y.rx_sec);
            }
      
            if(y.tx_sec / mByte > 1) {
              console.log(y.tx_sec / mByte);
            }
            else if(y.tx_sec / kByte > 1) {
              console.log(y.tx_sec / kByte);
            }
            else {
              console.log(y.tx_sec);
            }
          }
        }*/
        
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

// NET STATS
async function netStats(iface) {
  try {
    return await sister.networkStats(iface);
  }
  catch(error) {
    console.error(error);
  }
}

// DISK INFO
async function diskInfo() {
  try {
    const data = await sister.fsSize();
    return data;
  }
  catch(error) {
    console.error(error);
  }
}

// OS INFOMATION
async function osInfo() {
  try {
    return await sister.osInfo();
  }
  catch(error) {
    console.error(error);
  }
}

// CPU INFORMATION
async function cpuInfo() {
  try {
    return await sister.cpu();
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
