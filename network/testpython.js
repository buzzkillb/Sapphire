'use strict';

console.log('Starting');
var spawn = require('child_process').spawn;
var execFile = require('child_process').execFile;


console.log('Spawning spawned.js');
//const process = child_process.spawn('git-bash', ['deploy.sh'])
//const process = child_process.spawn('deploy.sh');

const process = spawn('node', ['spawned.js']);

console.log('execFile test.sh');

const process2 = spawn('sh', ['deploy.sh']);

process2.on('data',function(msg){
  console.log("message from spawned chold is "+msg)
})
