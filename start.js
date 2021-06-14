const command = require('./command');
const parseGitHubUrl = require('./github-url-parser');

process.on('SIGINT', async () => {
  console.log('Shutting down services...');
  await command('docker-compose', ['down','-v']);
  console.log('Shutdown complete.');
});

(async () => {
  const url = process.argv[2];

  if (!url) {
    throw new Error('Usage: yarn start <github-pr-url>');
  }

  const {username, repository, prNumber} = parseGitHubUrl(url);

  console.log('Removing workspace directory...');
  await command('rm', ['-rf','workspace']);
  console.log('workspace directory is removed.');
  await command('gh', ['repo','clone',`${username}/${repository}`, 'workspace']);
  await command('gh', ['pr','checkout',prNumber], { cwd: 'workspace' });
  await command('docker-compose', ['up'], { detached: true });

})().catch((e) => {
  if (e instanceof Error) {
    console.error(e.message);
  }
  console.error('Failed to start project.');
});

