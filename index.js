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

(async() => {
  let id,
      os = await OSInfo(),
      totalmem = await totalMem();
  /* html一式で動くようになったため不要 だが俺はあえて残しておくぞ
  app.get('/', function(req, res){
    res.sendFile(__dirname + '/monitor/index.html');
  });
  */
  
  io.on('connection', async function(socket){
    let cpu = await currLoad();
    let mem = await currMem();
  
    io.emit('sysinfo', {
      platform: os.platform,
      distro: os.distro,
      release: os.release,
      kernel: os.kernel,
      arch: os.arch,
      hostname: os.hostname,
      totalmemory: totalmem
    });
    
    io.emit('stats', {
      cpu: cpu,
      memory: mem
    });
    
    id = setInterval(async function(){
      let cpu = await currLoad();
      let mem = await currMem();
      io.emit('stats', {
        cpu: cpu,
        memory: mem,
      });
    }, 5000); // ここ、Delayを使っていい方法があるはず？
    // Intervalダサい、マジで
    
    socket.on('disconnect', function(){
      clearInterval(id);
    });
  });
  
  http.listen(PORT, function(){
    console.log('listening on *:3000');
  });
  
  /* 実装中
  let iface = await ifaceAll();
  iface.forEach((e) => {
    
  });*/
})();

/* 情 報 を 返 す ヤ ツ */
// CPU Load
function currLoad(){
  return new Promise(function(resolve,reject){
    sister.currentLoad()
      .then(data => {
        resolve(Math.floor(data.currentload)); 
      })
      .catch(error =>
        console.error(error)
      );
  })
}

// MEMORY USED
function currMem(){
  return new Promise(function(resolve,reject){
    sister.mem()
      .then(data => {
        resolve(Math.floor(data.used / gByte * 100) / 100); 
      })
      .catch(error =>
        console.error(error)
      );
  })
}

// TOTALMEMORY
function totalMem(){
  return new Promise(function(resolve,reject){
    sister.mem()
      .then(data => {
        resolve(Math.ceil(Math.floor(data.total / gByte * 10) / 10)); 
      })
      .catch(error =>
        console.error(error)
      );
  })
}

// ALL NETWORK INTERFACE
function ifaceAll(){
  return new Promise(function(resolve,reject){
    sister.networkInterfaces()
      .then(data => {
        let iface = [];
        
        data.forEach((e, i) => {
          iface[i] = e.iface;
        });
        
        resolve(iface); 
      })
      .catch(error =>
        console.error(error)
      );
  })
}

//NET STATS
function netStats(iface){
  return new Promise(function(resolve,reject){
    sister.networkStats(iface)
      .then(data => {
        resolve(data); 
      })
      .catch(error =>
        console.error(error)
      );
  })
}

//OS INFOMATION
function OSInfo(){
  return new Promise(function(resolve,reject){
    sister.osInfo()
      .then(data => {
        resolve(data); 
      })
      .catch(error =>
        console.error(error)
      );
  })
}
/********************/

// そのうち使うかもしれない 独自Delay
async function delay (s){
  await sleep(s);
}

function sleep(s){
  return new Promise(resolve => {
    setTimeout(() => { resolve(true) }, s);
  });
}