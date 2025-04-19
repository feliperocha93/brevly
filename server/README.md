# Brevly - URL Shortener 🔗✨

Brevly is a modern URL shortening service built with TypeScript and Node.js, designed to provide fast and reliable URL shortening with analytics and export capabilities.

- 🧰 RESTful API with comprehensive documentation
- 🔗 Create shortened URLs with custom paths
- 📊 Track access counts for each shortened link
- 📋 Export links data to CSV with access analytics

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
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/brevly.git
cd brevly/server
```

2. Install dependencies
```bash
pnpm install
```

3. Set up your environment variables
```bash
cp .env.example .env
# Edit .env with your specific configuration
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

## 🧪 Testing

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

## 📖 API Documentation

When the server is running, you can explore the API documentation at:
```
http://localhost:3333/docs
```

This interactive documentation allows you to:
- Explore available endpoints
- Test API endpoints directly
- View request/response schemas
- Understand authentication requirements

## 🔧 Configuration

### Environment Variables

Key environment variables you'll need to set up:

- **Database Configuration**
  - `POSTGRES_USER` - PostgreSQL username
  - `POSTGRES_PASSWORD` - PostgreSQL password
  - `POSTGRES_DB` - Database name
  - `DATABASE_URL` - Full PostgreSQL connection string

- **Application Settings**
  - `NODE_ENV` - Environment (development, test, production)
  - `APP_DOMAIN` - Your application domain (e.g., https://brev.ly)

- **Cloudflare Storage**
  - `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
  - `CLOUDFLARE_ACCESS_KEY_ID` - Cloudflare access key ID
  - `CLOUDFLARE_SECRET_ACCESS_KEY` - Cloudflare secret key
  - `CLOUDFLARE_BUCKET_NAME` - R2 bucket name
  - `CLOUDFLARE_BUCKET_URL` - R2 bucket URL

- **Observability Settings**
  - Various OpenTelemetry settings for monitoring

See `.env.example` for a complete list of environment variables.

## 📁 Project Structure

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
```sh
git checkout -b feat/amazing-feature
```
 Use conventional commits for your branch names and commit messages.
3. Make your changes and commit them
```sh
git commit -m "feat: add amazing feature"
```
4. Push to your branch
```sh
git push origin feat/amazing-feature
```
5. Open a pull request against the master branch

### API Naming Conventions

| Operation  | Repository | Service   | Route     |
| ---------- | ---------- | --------- | --------- |
| Create     | `insert`   | `create`  | `store`   |
| Read (All) | `findAll`  | `list`    | `index`   |
| Read (One) | `findById` | `getById` | `show`    |
| Update     | `update`   | `update`  | `update`  |
| Delete     | `deleteBy` | `remove`  | `destroy` |
