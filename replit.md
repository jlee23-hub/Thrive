# Thrive - Employee Compensation Dashboard

## User Preferences
- All card/box containers must use rounded corners with `border.radius.300` (12px)
- Use consistent `cardStyle` across all components:
  ```
  backgroundColor: token("elevation.surface.raised")
  borderRadius: token("border.radius.300")
  padding: token("space.400")
  boxShadow: token("elevation.shadow.raised")
  ```

## Architecture
- React + TypeScript frontend with Express backend
- Uses Atlassian Design System (@atlaskit) components and design tokens
- Two personas: Employee (compensation summary, RSUs, about) and Manager (team overview, about)
- Persona switching via Profile icon popup in top nav

## Key Components
- `client/src/pages/home.tsx` - Main layout with navigation, persona switching
- `client/src/components/CompensationSummary.tsx` - Total comp, donut chart, slider, RSU bar chart
- `client/src/components/RSUDetails.tsx` - Equity summary, grant cards, vesting area chart
- `client/src/components/TeamOverview.tsx` - Manager team assignments table
- `client/src/components/AboutUs.tsx` - About page
- `client/src/data/compensationData.ts` - Mock compensation/equity data

## Commands
- `npm run dev` - Start development server on port 5000
