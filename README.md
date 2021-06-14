# Project Interview Runner
Helper scripts for running Hatchways project interview repos.

## Requirements
- Bash (Not tested on Windows)
- [GitHub CLI](https://cli.github.com/) (a.k.a. `gh`)
- Docker & Docker compose
- NodeJS

## How to Run
```
yarn start <pull-request-url>
# OR
npm start <pull-request-url>
```

Open http://localhost:3000/ in a browser.

When you are done testing, press Ctrl-C to stop Docker containers.

`yarn stop` in separate terminal can also stop Docker containers.

## How It Works
`start.js` script clones the candidate's GitHub repository to `workspace` directory
and checkout appropriate branch.
Then, `docker-compose` spawns three Docker containers:
1. frontend: React project inside `workspace/client` directory.
1. backend: Express project inside `workspace/server` directory.
1. db: A PostgreSQL server for testing.

## Limitations
- GitHub repository is cloned each time `yarn start` even when testing the same repo again.
- Dependencies are not cached. It means each `yarn start` will re-download all NPM dependencies.
