# Backtest Frontend

A modern React + TypeScript application built with Vite, featuring comprehensive testing and strict code quality standards.

## 🚀 Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 with PostCSS
- **UI Components**: Radix UI primitives with shadcn/ui
- **Charts**: Highcharts
- **Package Manager**: pnpm (enforced)
- **Testing**: Vitest with React Testing Library
- **Type Checking**: TypeScript 5.9 with [@total-typescript/tsconfig](https://github.com/total-typescript/tsconfig)
- **Linting**: ESLint 9 (flat config) with TypeScript, import sorting, and Prettier integration
- **Code Formatting**: Prettier

## 📋 Prerequisites

- **Node.js**: 24+ (see `.nvmrc`)
- **pnpm**: 10.24.0+ (enforced via preinstall hook)

## 🛠️ Getting Started

### Installation

```bash
# Install dependencies (pnpm is enforced)
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Run linting (ESLint + Prettier + TypeScript check)
pnpm lint

# Auto-fix linting issues
pnpm format

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🧪 Testing

This project has comprehensive test coverage with Vitest and React Testing Library.

```bash
# Run tests in watch mode
pnpm test

# Run tests once (CI mode)
pnpm test run

# Run tests with interactive UI
pnpm test:ui

# Generate coverage report
pnpm test:coverage
```

### Coverage Thresholds

The project enforces minimum coverage thresholds:

- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 75%
- **Statements**: 80%

Coverage reports are generated in the `coverage/` directory (HTML, JSON, LCOV formats).

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components (Button, Card, etc.)
│   │   └── MarketChart.tsx
│   ├── lib/             # Utility functions
│   ├── test/            # Test setup and utilities
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── coverage/            # Test coverage reports (generated)
├── dist/                # Production build (generated)
└── [config files]       # TypeScript, Vite, ESLint, etc.
```

## 🔧 Configuration

### TypeScript

Uses [@total-typescript/tsconfig](https://github.com/total-typescript/tsconfig) for best-practice TypeScript configuration:

- `tsconfig.app.json` - App code (extends `@total-typescript/tsconfig/bundler/dom`)
- `tsconfig.node.json` - Config files (extends `@total-typescript/tsconfig/bundler/no-dom`)

### ESLint

Configured with:

- TypeScript type-aware linting
- Import sorting and validation
- React hooks rules
- Prettier integration
- Custom import order rules

### Prettier

Standard Prettier configuration with Tailwind CSS plugin support.

## 🎨 UI Components

Built with [shadcn/ui](https://ui.shadcn.com/) components:

- **Button** - Multiple variants (default, destructive, outline, secondary, ghost, link)
- **Card** - Container component with header, content, footer sections
- All components are fully tested with 100% coverage

## 📊 Code Quality

- **Type Safety**: Strict TypeScript with no implicit any
- **Linting**: ESLint with type-aware rules
- **Formatting**: Prettier with automatic import sorting
- **Testing**: 100% coverage on UI components
- **Package Manager**: Enforced pnpm usage (preinstall hook blocks npm/yarn)

## 🔒 Package Manager Enforcement

This project enforces pnpm usage. Attempts to use `npm install` or `yarn install` will fail with an error message.

To install pnpm globally:

```bash
npm install -g pnpm
```

## 📝 Scripts Reference

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `pnpm dev`           | Start development server with HMR                |
| `pnpm build`         | Build for production                             |
| `pnpm preview`       | Preview production build locally                 |
| `pnpm lint`          | Run ESLint, Prettier check, and TypeScript check |
| `pnpm format`        | Auto-fix formatting and linting issues           |
| `pnpm test`          | Run tests in watch mode                          |
| `pnpm test run`      | Run tests once (for CI)                          |
| `pnpm test:ui`       | Open Vitest UI                                   |
| `pnpm test:coverage` | Generate coverage report                         |

## 🚀 Production Build

The production build is optimized with:

- Code splitting
- Tree shaking
- Minification
- Source maps

Build output goes to `dist/` directory.

## 📄 License

[Your License Here]
