const { spawn } = require('child_process');

function command(c, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(c, args, options);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`Child process exited with code ${code}`);
      }
    });
  });
}

module.exports = command;

