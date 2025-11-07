# michan
 
Monitoring & Integrated Compliance Health Automation Notifier

A Node.js application that automatically monitors Pull Requests on GitHub repositories, runs unit tests and SAST (Static Application Security Testing) checks using Docker containers.

Features
🔍 Monitors PRs from repositories listed in repo.yaml
🐳 Runs unit tests and SAST checks using Docker containers
📝 Posts check results as PR comments
⚙️ Configurable via check.yaml in each repository
🔐 Secure webhook signature verification

## Setup

```bash
npm install
```

## Run

Development mode (with ts-node):
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

The server will start on port 3000 (or the port specified in the `PORT` environment variable).

Visit `http://localhost:3000/health` to see the "ok" response.