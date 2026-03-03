# Thrive - Employee Compensation Dashboard

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
