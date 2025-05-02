# Brevly - Front-End Application 🌐✨

This is the front-end application for Brevly, a modern URL shortening platform. It provides a user-friendly interface for creating, managing, and analyzing shortened URLs.

## 🛠️ Tech Stack

- **Framework**: React
- **Bundler**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form**: React Hook Form and Zod
- **HTTP**: Axios/React Query
- **Testing**: Vitest

## 🚀 Getting Started

### Prerequisites

- Node.js 23+
- PNPM package manager (`npm install -g pnpm`)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up your environment variables:
```bash
# create .env file
VITE_API_URL="http://localhost:3333"
VITE_APP_DOMAIN="http://localhost:5173"
```

### Running the Application

Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

### 📁 Project Structure

```
web/
├── src/                # Source code
│   ├── assets/         # Vectors
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Application pages
│   ├── schemas/        # Zod schema to validate
│   ├── services/       # API service layer
│   └── tests/          # Test files
└── ... configuration files
```

### 🧪 Testing

```bash
# Run all tests
pnpm test

# Run integration tests only
[WIP] pnpm test:integration 🔜

# Run unit tests only
[WIP] pnpm test:unit 🔜

# Run tests in watch mode during development
pnpm test:watch
```
