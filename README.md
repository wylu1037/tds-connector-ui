# Trusted Data Space Connector

Enterprise-grade IDS-compliant data space connector for secure data exchange, built with Next.js and TypeScript.

## Features

- **Identity Management**: DID-based identity with verifiable credentials
- **Data Offering**: Manage and publish data offerings to the data space
- **Data Consumption**: Consume data from other connectors with policy enforcement
- **Blockchain Integration**: Smart contract management and blockchain interactions
- **Policy Contracts**: Create and manage data usage policies and contracts
- **Monitoring**: Real-time system monitoring and metrics
- **Sandbox Environment**: Test data operations safely

## Tech Stack

- **Frontend**: Next.js 15.2.4 with React 19
- **UI Components**: Radix UI with Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended package manager)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tds-connector
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Project Structure

```
├── app/                 # Next.js app router pages
│   ├── (dashboard)/     # Dashboard layout group
│   │   ├── identity/    # Identity management
│   │   ├── data-offering/
│   │   ├── data-consumption/
│   │   ├── blockchain/
│   │   ├── policy/
│   │   ├── monitoring/
│   │   └── sandbox/
│   └── settings/        # Application settings
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── shared/         # Shared components
│   └── [feature]/      # Feature-specific components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and services
│   ├── contexts/       # React contexts
│   ├── services/       # API services
│   └── stores/         # State management
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Core Modules

### Identity Management
Handles DID (Decentralized Identity) documents, verifiable credentials, and connector identity.

### Data Offering & Consumption
Manages data catalogs, offerings, consumption requests, and data transfer protocols.

### Blockchain Integration
Provides smart contract interaction, transaction management, and blockchain connectivity.

### Policy Management
Implements usage control policies, contract templates, and policy enforcement.

### Monitoring & Analytics
Real-time monitoring of system performance, transactions, and data flows.

### Sandbox Environment
Safe testing environment for data operations and policy validation.

## Development

The application uses modern React patterns with TypeScript for type safety. UI components are built with Radix UI primitives and styled with Tailwind CSS.

Key development patterns:
- Server/Client component separation
- Custom hooks for business logic
- Context providers for global state
- Type-safe API interactions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and proprietary.