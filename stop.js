const command = require('./command');

(async () => {
  await command('docker-compose', ['down','-v']);

})().catch((e) => {
  if (e instanceof Error) {
    console.error(e.message);
  }
  console.error('Failed to stop project.');
});

