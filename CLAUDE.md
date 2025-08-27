# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues automatically
- `pnpm type-check` - Run TypeScript type checking without emitting files
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

### Package Manager
This project uses **pnpm** as the package manager. Always use `pnpm` instead of `npm` or `yarn`.

## Architecture Overview

This is a **Trusted Data Space (TDS) Connector** - an enterprise-grade IDS-compliant data space connector for secure data exchange. It's built with Next.js 15.2.4 App Router and TypeScript.

### Key Technologies
- **Next.js 15.2.4** with React 19 and App Router
- **TypeScript** with strict mode enabled
- **Tailwind CSS** with shadcn/ui components (Radix UI primitives)
- **Zustand** for state management
- **next-intl** for internationalization (Chinese/English)
- **React Hook Form** with Zod validation
- **Recharts** for data visualization

### Project Structure
```
app/                    # Next.js App Router
├── [locale]/          # Internationalized routes
│   ├── (dashboard)/   # Dashboard layout group (main app features)
│   │   ├── identity/        # DID-based identity management
│   │   ├── data-offering/   # Data catalog and offerings
│   │   ├── data-consumption/ # Data consumption and transfers
│   │   ├── blockchain/      # Smart contract management
│   │   ├── policy/          # Usage policies and contracts
│   │   ├── monitoring/      # System monitoring and metrics
│   │   └── sandbox/         # Safe testing environment
│   └── settings/      # Application settings
components/             # Reusable React components
├── ui/                # Base shadcn/ui components
├── shared/            # Shared utility components
└── [feature]/         # Feature-specific components
hooks/                 # Custom React hooks
lib/
├── contexts/          # React contexts (DataSpaceContext)
└── services/          # API services
types/                 # TypeScript type definitions (centralized exports)
i18n/                  # Internationalization config
messages/              # Translation files (en.json, zh.json)
```

### Core Business Domains

1. **Identity Management**: DID documents, verifiable credentials, connector identity
2. **Data Offering & Consumption**: Data catalogs, offerings, consumption requests, transfer protocols
3. **Blockchain Integration**: Smart contract interaction, transaction management
4. **Policy Management**: Usage control policies, contract templates, enforcement
5. **Monitoring & Analytics**: Real-time system performance, transactions, data flows
6. **Sandbox Environment**: Safe testing for data operations and policy validation

### Important Patterns

#### Component Organization
- Components are organized by feature domain (identity/, data-offering/, etc.)
- Each feature folder has an `index.ts` for clean exports
- UI components use shadcn/ui patterns with Radix primitives
- Server/Client component separation is strictly followed

#### State Management
- Global state via Zustand stores
- React Context for data space switching (`DataSpaceContext`)
- Custom hooks for business logic (`useDataOfferings`, `useContracts`, etc.)

#### Internationalization
- Default locale: Chinese (`zh`)
- Supported: Chinese, English
- Route structure: `/[locale]/...`
- Translations in `messages/` directory

#### Type Safety
- Centralized type definitions in `types/` with index.ts exports
- Strict TypeScript configuration
- Zod schemas for form validation

### Development Notes

#### Styling
- Uses Tailwind CSS with custom configuration
- shadcn/ui components with consistent design system
- Dark/light theme support via next-themes

#### Path Aliases
- `@/*` maps to root directory (configured in tsconfig.json)

#### Build Configuration
- ESLint and TypeScript errors are ignored during builds (development-focused)
- Images are unoptimized for development

#### Data Spaces
The app supports multiple data spaces (Healthcare, Finance, Mobility, Energy) with context switching functionality.