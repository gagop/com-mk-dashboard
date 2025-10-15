# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MK Dashboard is a data visualization dashboard for Metropolia Krakowska (Kraków Metropolis), displaying demographic and statistical data for 15 municipalities (gminy) in the greater Kraków region. The dashboard presents various indicators across multiple thematic areas with interactive charts and modals.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on Vite's default port, typically http://localhost:5173)
npm run dev

# Build for production (TypeScript compilation + Vite build)
npm run build

# Lint the codebase
npm run lint

# Preview production build locally
npm run preview
```

## Tech Stack

- **React 19.1** with TypeScript
- **React Router v7** for navigation
- **Vite** for build tooling
- **Recharts** for data visualization
- **ESLint** with TypeScript ESLint configuration
- No test framework configured

## Architecture

### Data Layer (`src/data/`)

The application uses a static data architecture with no backend API:

- **`bdl.ts`**: Core data module containing raw statistical data from Bank Danych Lokalnych (BDL)
  - Defines 15 gminy (municipalities) and 6 years of data (2019-2024)
  - Contains typed datasets: `powierzchniaKm2`, `gestosc`, `przyrostNaturalny`, `obciazenieDemograficzne`, `udzialWiekowych`
  - All data is organized as `Record<Gmina, Record<Rok, number>>`

- **`utils.ts`**: Data computation utilities
  - `computeLudnosc(gmina, rok)`: Calculates population from density × area
  - `computeMKSum()`: Aggregates values across all municipalities
  - `weightedAverage()`: Computes population-weighted averages for indicators
  - Exports pre-computed MK-wide aggregates like `MK_ludnosc`, `MK_gestosc`, `MK_obciazenie`

- **`edukacja.ts`**: Contains education-specific datasets

### Component Architecture

**Reusable Components (`src/components/`)**:

- **`Layout.tsx`**: App shell with header navigation, footer, and `<Outlet/>` for React Router
  - Navigation uses client-side routing with `NavLink` for active states
  - Fixed header/footer with scrollable content area

- **`Card.tsx`**: Universal card container for dashboard widgets
  - Props: `title`, `subtitle`, `right` (for custom right-side content), `height`, `onOpen` (for modal triggers)
  - Used extensively across all dashboard pages

- **`Modal.tsx`**: Full-screen modal overlay
  - Supports ESC key to close
  - Props: `open`, `onClose`, `title`, `width`, `maxWidth`
  - Used to show enlarged versions of charts

**Page Components (`src/pages/`)**:

Each page represents a thematic section of the dashboard:
- `InformacjeOgolne.tsx` - General information (landing page)
- `InteligentneZarzadzanie.tsx` - Smart governance
- `SrodowiskoPrzestrzen.tsx` - Environment & space
- `Mobilnosc.tsx` - Mobility
- `KulturaCzasuWolnego.tsx` - Culture & leisure
- `Gospodarka.tsx` - Economy
- `Edukacja.tsx` - Education
- `UslugiSpoleczne.tsx` - Social services

The `placeholder/` subdirectory contains earlier versions of some pages.

### Typical Page Structure Pattern

Pages follow a consistent pattern:

```tsx
export default function PageName() {
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <h2>Page Title</h2>

      {/* Main content area with auto-scaling column layout */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, ... }}>
          <div style={{ columnCount: 3, columnGap: 12, transform: `scale(${scale})`, ... }}>
            {/* Cards with charts/data */}
            <div style={{ breakInside: 'avoid', marginBottom: 12 }}>
              <Card title="..." onOpen={() => setOpenCard('cardId')}>
                {/* Recharts chart or data display */}
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for expanded view */}
      <Modal open={openCard === 'cardId'} onClose={() => setOpenCard(null)} title="...">
        {/* Larger version of the chart */}
      </Modal>
    </div>
  );
}
```

**Key architectural patterns**:
- **Auto-scaling layout**: Pages use `transform: scale()` with ResizeObserver to dynamically fit content
- **Column-based layout**: Most pages use CSS `columnCount: 3` with `breakInside: avoid` for masonry-style card arrangement
- **Modal expansion**: Cards with `onOpen` prop can be clicked to open a modal with an enlarged view
- **Static data**: All data is imported from `src/data/` modules at build time

### Styling & Theming

- **`theme.ts`**: Centralized theme configuration
  - Brand colors: `mkColors.primaryRed`, `mkColors.primaryBurgundy`, `mkColors.primaryNavy`
  - Reusable style objects: `appStyles.page`, `appStyles.kpiCard`, `appStyles.kpiGrid`, etc.
  - Chart colors array for consistent Recharts styling

- **`index.css`**: Global styles with CSS custom properties
  - Uses CSS variables: `--mk-red`, `--mk-navy`, `--mk-bg`, `--mk-card`, etc.
  - Defines `.card` base styles and `.masonry` / `.masonry-item` for responsive column layouts
  - Responsive breakpoints for masonry: 3 columns (≥1024px), 2 columns (768-1023px), 1 column (<768px)

### Routing (`src/App.tsx`)

Single-level routing with all routes nested under `<Layout>`:
- `/` → InformacjeOgolne (home page)
- `/inteligentne-zarzadzanie` → InteligentneZarzadzanie
- `/srodowisko-przestrzen` → SrodowiskoPrzestrzen
- `/mobilnosc` → Mobilnosc
- `/kultura-czasu-wolnego` → KulturaCzasuWolnego
- `/gospodarka` → Gospodarka
- `/edukacja` → Edukacja
- `/uslugi-spoleczne` → UslugiSpoleczne

## Code Conventions

- TypeScript strict mode enabled
- Use Polish language for UI text and data labels (the dashboard is for Polish users)
- Import paths are relative (no path aliases configured)
- Chart data is typically computed in `useMemo` hooks to avoid recalculation
- Number formatting uses `Intl.NumberFormat('pl-PL')` for Polish locale
- Components use inline styles (no CSS modules or styled-components)
- Recharts configuration: Use `ResponsiveContainer` for all charts, set appropriate margins for axis labels

## Data Patterns

When working with BDL data:
- Population is computed, not stored directly: use `computeLudnosc(gmina, rok)`
- For MK-wide totals: use `computeMKSum()` for summable metrics, `weightedAverage()` for rates/ratios
- Current year constant: `Y = 2024` (update annually)
- Available years: `LATA = [2019, 2020, 2021, 2022, 2023, 2024]`
- Gminy list: `GMINY` array (15 municipalities including Kraków)

## Key Files

- **Entry point**: `src/main.tsx`
- **Root component**: `src/App.tsx`
- **Page index**: `src/pages/index.ts` (barrel export for all pages)
- **Type definitions**: `src/data/bdl.ts` (defines `Rok`, `Gmina` types)
