'use strict';

console.log('Starting');
var spawn = require('child_process').spawn;
var execFile = require('child_process').execFile;


console.log('Spawning spawned.js');
//const process = child_process.spawn('git-bash', ['deploy.sh'])
//const process = child_process.spawn('deploy.sh');

const process = spawn('node', ['spawned.js']);

console.log('we are not using execFile test.sh');

const process2 = spawn('sh', ['deploy.sh']);

process2.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

process2.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

process2.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
