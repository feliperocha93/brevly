# Brevly - URL Shortener 🔗✨

Brevly is a modern URL shortening service built with TypeScript and Node.js, designed to provide fast and reliable URL shortening with analytics and export capabilities.

- 🧰 RESTful API with comprehensive documentation
- 🔗 Create shortened URLs with custom paths
- 📊 Track access counts for each shortened link
- 📋 Export links data to CSV with access analytics

Check the [API docs](https://brevly.onrender.com/docs).

### 🛠️ Tech Stack

- **Runtime**: Node.js 23+
- **Language**: TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL with Drizzle ORM
- **Storage**: Cloudflare R2
- **Documentation**: Scalar/Fastify API Reference
- **Testing**: Vitest
- **Monitoring**: OpenTelemetry/Grafana
- **CI/CD**: Github Actions

## 🚀 Getting Started

### Prerequisites

- Node.js 23+
- PNPM package manager (`npm install -g pnpm`)
- Docker and Docker Compose (for running PostgreSQL)

### Install dependencies

```bash
pnpm install
```

### Set up your environment variables

```bash
# Edit .env with your specific configuration
cp .env.example .env

# server returns 500 when get /link/export-csv withou cloudflare settings
# logs go to nowhere without OTEL_EXPORTER_OTLP_HEADERS
```

### Database Setup

1. Start the PostgreSQL database
```bash
docker compose up -d
```

2. Run database migrations
```bash
pnpm db:migrate
```

### Running the Application

Start the development server:
```bash
pnpm dev
```

The server will be available at http://localhost:3333, and the API documentation at http://localhost:3333/docs.

## 📖 API Documentation

When the server is running, you can explore the API documentation at:
```
http://localhost:3333/docs
```

This interactive documentation allows you to:
- Explore available endpoints
- Test API endpoints directly
- View request/response schemas

### 📁 Project Structure

```
server/
├── src/                # Source code
│   ├── db/             # Database configuration and models
│   ├── repositories/   # Data access layer
│   ├── routes/         # API endpoints
│   ├── services/       # Business logic
│   ├── storage/        # Storage service interfaces
│   ├── shared/         # Shared utilities
│   └── tests/          # Test files
├── iac/                # Infrastructure as Code
└── ... configuration files
```

### API Naming Conventions

| Operation  | Repository | Service   | Route     |
| ---------- | ---------- | --------- | --------- |
| Create     | `insert`   | `create`  | `store`   |
| Read (All) | `findAll`  | `list`    | `index`   |
| Read (One) | `findById` | `getById` | `show`    |
| Update     | `update`   | `update`  | `update`  |
| Delete     | `deleteBy` | `remove`  | `destroy` |

### 🧪 Testing

Brevly comes with comprehensive test coverage:

```bash
# Run all tests
pnpm test

# Run integration tests only
pnpm test:integration

# Run unit tests only
pnpm test:unit

# Run tests in watch mode during development
pnpm test:watch
```

> Note: Integration tests require a test database to be running. The `pretest` script will automatically run migrations for the test database.
