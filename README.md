# Brevly - URL Shortener 🔗✨

Brevly is a modern URL shortening service with analytics and export capabilities. This repository contains both the **back-end** and **front-end** codebases.

[https://brevly-self.vercel.app](https://brevly-self.vercel.app)

## 🚀 Getting Started

### Prerequisites

- Node.js 23+
- PNPM package manager (`npm install -g pnpm`)
- Docker and Docker Compose (for running PostgreSQL)

## 📁 Project Structure

```
brevly/
├── .github/            # CI configuration
├── server/             # Back-end service
├── web/                # Front-end application
└── ... other files
```

### 📂 Back-End

The back-end service is built with Node.js, TypeScript, and Fastify. It provides a RESTful API for managing shortened URLs, tracking analytics, and exporting data.

> Start with [Back-End README](./server/README.md). Ensure the API is working fine and then run the Front-end.

### 📂 Front-End

The front-end is a React-based single-page application (SPA) built with Vite. It provides a user-friendly interface for interacting with the URL shortening service.

> After setup and running the back-end, go to [Front-End README](./web/README.md).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
```sh
# Use conventional commits for your branch names and commit messages.
git checkout -b feat/amazing-feature
```
3. Make your changes and commit them
```sh
git commit -m "feat: add amazing feature"
```
4. Push to your branch
```sh
git push origin feat/amazing-feature
```
5. Open a pull request against the master branch

Refer to the contributing guidelines in the [Back-End README](./server/README.md) and [Front-End README](./web/README.md).
