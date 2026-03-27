# Compensation - Employee Compensation Dashboard

## User Preferences
- **IMPORTANT: All card/box containers and any new boxes must use `borderRadius: "6px"` — never use ADS border radius tokens for cards/containers**
- Use consistent `cardStyle` across all components:
  ```
  backgroundColor: token("elevation.surface.raised")
  borderRadius: "6px"
  padding: token("space.400")
  border: `1px solid ${token("color.border")}`
  ```
- Any new card, container, panel, or box element created in the future must also use `borderRadius: "6px"`

## ADS Design Rules (Mandatory)
All UI must follow these rules. No exceptions without documented justification.

### Typography
- **NEVER** use native HTML elements `<h1>`–`<h6>`, `<p>`, `<span>`, `<div>` for text content
- **ALWAYS** use `<Heading>` from `@atlaskit/heading` for headings
- **ALWAYS** use `<Text>` from `@atlaskit/primitives` (NOT `@atlaskit/primitives/text`)
- **NEVER** use raw `fontSize` or `fontWeight` in inline styles for visible text — use `<Text size="..." weight="...">` or `<Heading size="...">`
- Exception: recharts chart axis `tick` and tooltip configs may use raw pixel values since they are chart library props

### Heading Hierarchy
- Page title: `<Heading size="large">`
- Card/section title: `<Heading size="medium">`
- Sub-section within a card: `<Text size="medium" weight="bold">`

### Colors
- **NEVER** use hex values like `#FFFFFF` or `#36B37E`
- **ALWAYS** use `token("color.xxx")` for all colors
- Chart colors: `token("color.chart.success.bold")`, `token("color.border")`, etc.
- Text colors: `token("color.text")`, `token("color.text.subtlest")`, `token("color.text.success")`, etc.

### Spacing
- **NEVER** use pixel or rem values for padding, margin, or gap
- **ALWAYS** use space tokens: `token("space.100")`, `token("space.200")`, etc.
- Exception: `height`/`width` for chart containers and fixed-size decorative elements (e.g., progress bar `height: 6`)

### Step/Section Layout Pattern (CycleBuilder, CycleDetails, and all wizard-like views)
Every step or section MUST follow this consistent structure:
1. **Outer container**: `display: flex, flexDirection: column, gap: token("space.300")`
2. **Title block** (wrapped in a single `<div>`):
   - Icon + `<Heading size="medium">` in a flex row with `gap: token("space.100")`
   - `<Text size="small" color="color.text.subtlest">` description directly below (no extra wrapper div, no extra margin)
3. **Content** follows after the title block, separated by the outer container's `gap: space.300`
4. **Cards within sections**: use `cardStyle` with `padding: space.300 / space.400`
5. **Sub-section headings inside cards**: `<Heading size="xsmall">`

Example:
```tsx
<div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
  <div>
    <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
      <SomeIcon label="" color={token("color.icon.brand")} />
      <Heading size="medium">Step Title</Heading>
    </div>
    <Text size="small" color="color.text.subtlest">Brief description of this step</Text>
  </div>
  {/* Content cards and controls below */}
</div>
```

### Components
- **Buttons**: `@atlaskit/button/new` — never native `<button>` with Tailwind
- **Checkbox**: `@atlaskit/checkbox`
- **Toggle**: `@atlaskit/toggle`
- **Tabs**: `@atlaskit/tabs`
- **Lozenge**: `@atlaskit/lozenge`
- **Tag**: `@atlaskit/tag`
- **Banner**: `@atlaskit/banner`
- **Radio**: `@atlaskit/radio`
- **Textarea**: `@atlaskit/textarea`
- **Progress Bar**: `@atlaskit/progress-bar`
- **Drawer**: `@atlaskit/drawer`
- **Skeleton**: `@atlaskit/skeleton`
- **Tooltip**: `@atlaskit/tooltip`
- **Range slider**: `@atlaskit/range`

### Icons
- **NEVER** import from `@atlaskit/icon/glyph/` (deprecated)
- **ALWAYS** import from `@atlaskit/icon/core/` or `@atlaskit/icon-lab/core/`
- Use `LEGACY_size` prop for sizing
- **NEVER** invent or guess icon names — verify they exist

### Layout
- Use `div` with inline styles and spacing tokens for layout
- Cards/containers: `borderRadius: "6px"`, no `boxShadow`, `border: 1px solid ${token("color.border")}`
- Smaller rounded elements (pills, progress bars): use `"3px"` or `"4px"` as string values

## Architecture
- React + TypeScript frontend with Express backend
- Uses Atlassian Design System (@atlaskit) components and design tokens
- Three personas: Employee, Manager, Comp Admin
- Persona switching via Profile icon popup in top nav

## Personas & Navigation
- **Employee**: Total Compensation Summary, RSUs, About Us
- **Manager**: Team Overview, About Us
- **Comp Admin**: Dashboard (Cycles), Merit Matrix, Groups, Salary Bands, Data Management, Settings
  - Cycle Builder accessed via "Create New Cycle" button on Dashboard

## Key Components
- `client/src/pages/home.tsx` - Main layout with navigation, persona switching
- `client/src/components/CompensationSummary.tsx` - Total comp, donut chart, slider, RSU bar chart
- `client/src/components/RSUDetails.tsx` - Equity summary, grant cards, vesting area chart
- `client/src/components/TeamOverview.tsx` - Manager team assignments table
- `client/src/components/AboutUs.tsx` - About page
- `client/src/components/CyclesDashboard.tsx` - Comp Admin dashboard with cycle cards
- `client/src/components/CycleBuilder.tsx` - 10-step wizard for creating compensation cycles
- `client/src/components/MeritMatrix.tsx` - Performance/compa-ratio merit increase matrix
- `client/src/components/GroupsManagement.tsx` - User groups and permissions management
- `client/src/components/SalaryBands.tsx` - Salary bands with charts and data tables
- `client/src/components/DataManagement.tsx` - API config, data source connections, field mappings
- `client/src/components/SystemSettings.tsx` - Roles, permissions, system configuration tabs
- `client/src/data/compensationData.ts` - Mock compensation/equity data

## Commands
- `npm run dev` - Start development server on port 5000
