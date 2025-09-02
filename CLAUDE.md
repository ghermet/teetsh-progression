# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React educational programmation visualization application built with TanStack Router and Vite. The application displays school curriculum progressions organized by subjects (matières), domains (domaines), and time periods (periodes). It renders timeline-style tables showing educational content across different weeks/periods.

## Development Commands

### Running the Application

- `npm run dev` or `npm start` - Start development server on port 3000
- `npm run serve` - Preview production build

### Building and Testing

- `npm run build` - Build for production (runs Vite build + TypeScript compilation)
- `npm run test` - Run unit tests with Vitest
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npm run test:e2e:ui` - Run Playwright tests with UI mode
- `npm run test:e2e:headed` - Run Playwright tests in headed mode

### Code Quality

- `npm run lint` - Run ESLint to check for code issues
- `npm run lint:fix` - Run ESLint with auto-fix enabled
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted
- `npm run typecheck` - Run TypeScript type checking without emitting files

**Important**: Always run `npm run lint` and `npm run typecheck` after making changes. The project uses strict TypeScript configuration and zero-warning ESLint rules.

## Architecture

### Core Application Flow

The application follows this data flow:

1. **Route Loading**: `/progressions/$id` route loads programmation data via API
2. **Data Transformation**: `ProgrammationView` transforms hierarchical data (Matière → Domaine → Items) into timeline blocks
3. **Component Rendering**: Data flows through Header → Table → Footer components
4. **Timeline Visualization**: Items are displayed as blocks across time periods in a table format

### Domain Model

The application works with educational programmation data structured as:

- **ProgressionData**: Top-level container with metadata and content
- **Matière**: Subject areas (e.g., "Histoire et géographie")
- **Domaine**: Sub-domains within subjects (e.g., "Histoire")
- **Item**: Individual content pieces with HTML values, linked to specific periods
- **Période**: Time periods (weeks/months) with dates and colors

### Programmation Components Architecture

Located in `src/components/programmation/`, these components form the core visualization:

- **ProgrammationView**: Main orchestrator that transforms API data into renderable format
- **ProgrammationHeader**: Displays programmation metadata (name, level, date)
- **ProgrammationTable**: Renders timeline table with subjects as rows and periods as columns
- **ProgrammationFooter**: Shows summary statistics (period count, unique domains)
- **Types**: Defines interfaces for data transformation between API format and UI components

The transformation logic converts the hierarchical API structure into timeline blocks, where each item becomes a visual block positioned by period and grouped by domain.

### API Integration

- **Base URL**: `https://strapi.teetsh.com/api`
- **Authentication**: Token-based via `Api` class
- **Data Source**: Strapi CMS providing programmation data
- **Route Integration**: TanStack Router loader fetches data before component rendering
- **Error Handling**: Dedicated `ProgrammationError` component for failed loads

### Routing System

- Uses TanStack Router with file-based routing
- Key routes: `/` (index), `/progressions/$id` (dynamic programmation view)
- Router context provides `queryClient` and `api` to all routes
- Root layout in `src/routes/__root.tsx` includes development tools
- Auto-generated route tree in `src/routeTree.gen.ts`

### Key Technologies

- **React 19** with TypeScript and React Compiler optimization
- **TanStack Router** for type-safe routing with loaders
- **TanStack Query** for data fetching and caching
- **Tailwind CSS 4.0** for styling with CSS variables
- **DOMPurify** for safe HTML rendering of educational content
- **Vite 7** as build tool with React plugin

### Project Structure

- `src/main.tsx` - Application entry point with router setup
- `src/routes/` - File-based routes directory
- `src/components/programmation/` - Core programmation visualization components
- `src/components/ui/` - Reusable UI components
- `src/types/programmation.types.ts` - Type definitions for programmation data model
- `src/lib/api.ts` - API client and authentication
- `src/lib/utils.ts` - Utility functions (includes `cn` for class merging)
- `src/styles.css` - Global styles with CSS variables for theming
- `playwright/fixtures/responses/` - Mock data for testing
- Path alias `@/*` maps to `./src/*`

### Development Tools

- TanStack Router DevTools and React DevTools integrated
- TypeScript with strict mode enabled
- React Compiler for optimization
- Web Vitals reporting available

## Testing Setup

### Unit Testing

- Uses Vitest with jsdom environment
- Testing Library for React components
- All programmation components have comprehensive test coverage
- Run all tests: `npm run test`
- Run programmation component tests: `npm run test -- src/components/programmation`

### End-to-End Testing

- Uses Playwright for browser automation testing
- Configured to test against Chromium by default on port 3000
- Tests located in `playwright/tests/` directory with Page Object Model pattern
- Automatically starts dev server before running tests
- Mock API responses using fixtures in `playwright/fixtures/responses/`
- Key test files:
  - `programmation.spec.ts` - Main programmation functionality tests
  - `programmation-timeline-navigation.spec.ts` - Timeline scrolling and navigation tests
- Run tests: `npm run test:e2e`
- Interactive development: `npm run test:e2e:ui`
- Headed mode for debugging: `npm run test:e2e:headed`

## Important Implementation Notes

- **Data Transformation**: The ProgrammationView component performs complex data transformation from the hierarchical API structure (Matière → Domaine → Items) into timeline blocks for visualization
- **HTML Content**: Educational content from items may contain HTML and is sanitized using DOMPurify before rendering
- **Color System**: Uses CSS custom properties with color names like `var(--color-blue-300)` for theming periods and subjects
- **Timeline Logic**: Each item becomes a timeline block positioned by its `periodeId` and grouped by domain within subjects
- **Responsive Design**: Table layout is horizontally scrollable to accommodate multiple time periods
- **Test Data**: Uses data-testid attributes for reliable test selectors (e.g., `data-testid="domaine-name"`, `data-testid="periode-name"`)
- **Git Hooks**: Husky and lint-staged are configured to run linting and formatting on commit
- **Styling**: Uses Tailwind CSS 4.0 with custom CSS variables for theming, no component library

# important-instruction-reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
