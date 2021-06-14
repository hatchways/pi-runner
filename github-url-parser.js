function parseGitHubUrl(url) {
  const re = /github.com\/(?<username>[^/]+)\/(?<repository>[^/]+)\/pull\/(?<prNumber>\d+)/
  const match = re.exec(url);

  if (!match) {
    throw new Error('Invalid GitHub PR URL');
  }

  return match.groups;
}

module.exports = parseGitHubUrl;

