# Product Requirements Document (PRD)

## the compensation tool — Employee Compensation Management Platform

| Field | Detail |
|---|---|
| **Product Name** | the compensation tool |
| **Version** | 1.0 |
| **Date** | March 2, 2026 |
| **Status** | In Development |
| **Design System** | Atlassian Design System (ADS / @atlaskit) |
| **Charting Library** | Recharts |

---

## 1. Executive Summary

the compensation tool is an enterprise compensation management platform designed to replace Pave. It provides a unified interface for managing the full lifecycle of compensation planning — from cycle creation and budget allocation to merit matrices, salary bands, eligibility rules, and employee-facing compensation summaries. The platform serves three distinct personas (Employee, Manager, Comp Admin) with role-appropriate views and permissions.

---

## 2. Problem Statement

Organizations managing compensation across large employee populations need a centralized tool that:

- Eliminates spreadsheet-driven compensation planning workflows
- Provides role-appropriate views for employees, managers, and compensation administrators
- Enforces structured governance through eligibility rules, budget limits, and field-level permissions
- Supports multi-source data integration (HRIS, equity management, CSV imports)
- Delivers transparent compensation breakdowns to employees

---

## 3. Target Users & Personas

### 3.1 Employee
**Goal:** Understand total compensation, view RSU details, and access equity grant information.

**Access:** Personal compensation summary, RSU vesting schedules, About Us page.

**Key Jobs to Be Done:**
- View annual total compensation breakdown (base salary, bonus, RSUs)
- Understand equity grant status and vesting progress
- Model compensation scenarios with share price adjustments

### 3.2 Manager
**Goal:** Review and plan compensation for direct reports within a cycle.

**Access:** Team overview with individual employee compensation details.

**Key Jobs to Be Done:**
- View team-wide compensation data in a planning grid
- Review each report's current salary, performance rating, and level
- Enter merit increase, bonus, and equity recommendations per employee
- Track submission status for each team member

### 3.3 Comp Admin
**Goal:** Configure, manage, and finalize compensation cycles end-to-end.

**Access:** Full administrative access to all system features.

**Key Jobs to Be Done:**
- Create and configure compensation cycles through a guided builder
- Define eligibility rules and budget allocations
- Manage merit matrices and salary band structures
- Control field-level permissions and user roles
- Integrate data from Workday, Shareworks, and CSV sources
- Monitor cycle progress and manage group-based access

---

## 4. Navigation Architecture

### 4.1 Top Navigation (Global)
| Element | Description |
|---|---|
| App Switcher | Access to other enterprise apps |
| Product Logo | "the compensation tool" branding |
| Chat | In-app messaging |
| Notifications | Activity feed |
| Help | Documentation and support |
| Settings | Application settings |
| Profile / Persona Switcher | Switch between Employee, Manager, and Comp Admin personas |

### 4.2 Side Navigation (Persona-Specific)

| Persona | Navigation Items |
|---|---|
| **Employee** | Total Compensation Summary, RSUs, About Us |
| **Manager** | Team Overview, About Us |
| **Comp Admin** | Cycles Dashboard, Merit Matrix, Groups, Salary Bands, Data Management, Settings |

### 4.3 Default Landing Pages
- Employee: Total Compensation Summary
- Manager: Team Overview
- Comp Admin: Cycles Dashboard

---

## 5. Feature Specifications

### 5.1 Employee — Total Compensation Summary

**Component:** `CompensationSummary.tsx`

**Description:** Displays the employee's full annual compensation broken down by component with interactive visualizations.

**Features:**
- **Annual Compensation Card:** Total annual comp with effective date
- **Component Breakdown:** Base salary, annual bonus (target %), and RSU value displayed as individual metric cards
- **Compensation Pie Chart:** Visual breakdown of salary, bonus, and RSU proportions using Recharts PieChart
- **Year-over-Year Trend:** Bar chart showing compensation growth across fiscal years
- **Share Price Simulator:** Interactive slider (ADS Range component) to model how share price changes affect total compensation and RSU value
- **Equity Summary Section:** Grant-level details including total units, vested/unvested counts, and vesting progress

**Data Points Displayed:**
- Base salary (USD)
- Bonus target (% and USD)
- RSU value (units x current share price)
- Total annual compensation
- Year-over-year trend data (FY2022-FY2026)

---

### 5.2 Employee — RSU Details

**Component:** `RSUDetails.tsx`

**Description:** Detailed equity grant management and vesting schedule view.

**Features:**
- Individual grant cards with grant date, total units, and vesting progress
- Vesting schedule timeline with cliff and periodic vesting milestones
- Vested vs. unvested unit tracking
- Current value calculations based on share price

---

### 5.3 Manager — Team Overview

**Component:** `TeamOverview.tsx`

**Description:** A planning grid for managers to review and manage compensation for their direct reports.

**Features:**
- **Search & Filter Bar:** Search employees by name; filter and export capabilities
- **Planning Grid (ADS DynamicTable):** Sortable, scrollable table with columns:
  - Employee name (with avatar initials)
  - Job profile
  - Level (with ADS Lozenge)
  - Promotion status
  - Performance rating (with ADS Lozenge color coding)
  - Current salary
  - SMP % (salary-to-midpoint percentage)
  - New salary (editable)
  - New SMP %
  - Bonus
  - New equity
  - Submission status (Pending / Submitted / Approved)
- **Summary Statistics:** Total headcount, average merit increase, budget utilization
- **Inline Editing:** Direct entry of recommended values per employee

**Performance Rating Lozenge Mapping:**
| Rating | Lozenge Appearance |
|---|---|
| Greatly Exceeded | `success` (green) |
| Exceeded | `inprogress` (blue) |
| Met | `default` (grey) |
| Met Some | `moved` (purple) |
| Did Not Meet | `removed` (red) |

---

### 5.4 Comp Admin — Cycles Dashboard

**Component:** `CyclesDashboard.tsx`

**Description:** Central hub for viewing and managing all compensation cycles.

**Features:**
- **Cycle Cards:** Each cycle displayed as a card with:
  - Cycle name and subtitle (e.g., "Due in 14 days")
  - Cycle type badge (Merit, Promotion, Equity Refresh)
  - Status indicator (Active, Planning, Completed)
  - Timeline (start and end dates)
  - Participant count
  - Budget amount
  - Progress bar (ADS ProgressBar, 0-100%)
  - Overflow actions menu (IconButton)
- **Create New Cycle:** Primary button launches the Cycle Builder
- **Cycle Types Supported:** Merit, Promotion, Equity Refresh
- **Status Lifecycle:** Planning → Active → Completed

**Sample Cycle Data:**
| Cycle | Type | Status | Participants | Budget | Progress |
|---|---|---|---|---|---|
| FY2026 Annual Merit | Merit | Active | 1,842 | $28.5M | 67% |
| FY2026 Promotion | Promotion | Active | 456 | $8.2M | 45% |
| Q1 2026 Equity Refresh | Equity | Planning | 312 | $12.1M | 12% |
| FY2025 Annual Merit | Merit | Completed | 1,756 | $26.8M | 100% |

---

### 5.5 Comp Admin — Cycle Builder (10-Step Wizard)

**Component:** `CycleBuilder.tsx`

**Description:** A comprehensive, guided 10-step wizard for configuring a new compensation cycle from scratch. Each step is accessible via a left sidebar with progress indicators. Users can navigate forward/backward and save drafts.

**Global Layout:**
- Fixed header with "Cycle Builder" title, comprehensive description, Cancel, and Save Draft buttons
- Left sidebar (260px) with step list showing completion state
- Main content area (scrollable) rendering the active step
- Fixed footer with Back / Next Step / Finalize Cycle navigation

#### Step 1: Cycle Details
**Purpose:** Define the basic parameters of the cycle.

**Fields:**
| Field | Type | Required | Description |
|---|---|---|---|
| Duplicate Existing Cycle | Select dropdown | No | Copy settings from a previous cycle |
| Cycle Name | Text input | Yes | e.g., "2026 Annual Merit" |
| Cycle Type | Select dropdown | Yes | Merit / Promotion / Equity Refresh |
| Start Date | Date picker | Yes | Cycle start date |
| End Date | Date picker | Yes | Cycle end date |
| Effective Date | Date picker | Yes | When changes take effect |
| Description | Textarea (5 rows) | No | Purpose and scope of the cycle |

#### Step 2: Data Integrations
**Purpose:** Connect data sources and upload employee/compensation data.

**Sections:**
1. **Data Upload Area:** Drag-and-drop zone for file uploads
   - Supported formats: .xlsx, .xls, .csv (max 50MB)
   - Template download available
2. **Current Integrations Grid:** Three integration cards:
   - Workday (HRIS) — 100 rows, sync timestamp
   - Shareworks (Equity) — 80 rows, sync timestamp
   - CSV upload — file name, sync timestamp
3. **Upload History Table:** Previous uploads with file name, date, size, record count, and status (Success / Failed with error count)
   - Expandable error detail rows showing row-level validation issues with Fix actions
4. **Data Sources (Accordion sections):**
   - Workday accordion: Field mapping table (12 fields), Sync now button
   - Shareworks accordion: Field mapping table (6 fields), Sync now button
   - Each accordion independently collapsible

#### Step 3: Employee Data Grid
**Purpose:** Unified view of all employee fields with data source attribution.

**Features:**
- **ADS DynamicTable** with sortable columns
- **Source Attribution:** Each column header shows its data source (Workday/Shareworks) with color coding
- **12 Columns:** Employee ID, First Name, Last Name, Job Title, Level, Job Family, Location, Performance Rating, Base Salary, Commission %, Bonus %, Current Equity $
- **ADS Lozenges** for Level column (P-levels: blue, M-levels: green) and Performance Rating column (5-tier color mapping)
- **Pagination Footer:** "Showing 1-12 of 52 employees" with Previous/Next buttons

**Employee Data (12 sample records):**
- Levels: M50, M60, M90, M100, P50, P60, P70
- Ratings: Greatly Exceeded, Exceeded, Met, Met Some, Did Not Meet
- Departments: HR, Engineering, Product, Design, Marketing, Data Science, Sales

#### Step 4: Eligibility Rules
**Purpose:** Define which employees are included in or excluded from the cycle.

**Sections:**
1. **Active Rules (3 pre-configured):**
   - Employment Type Filter: IS ONE OF Regular, Definite (45 matched)
   - Start Date Cutoff: IS BEFORE March 31, 2026 (48 matched)
   - FTE Threshold: GREATER THAN 0.5 (50 matched)
   - Each rule shows Active lozenge + Edit icon button
2. **New Eligibility Rule Form:**
   - Info banner explaining AND logic for combining conditions
   - 2x2 grid: Rule Name, Field (dropdown), Operator (dropdown), Value (text)
   - Footer: "+ Add AND Condition" button, Cancel, Save Rule
   - Operators: IS ONE OF, IS NOT ONE OF, EQUALS, GREATER THAN, LESS THAN, IS BEFORE, IS AFTER
   - Fields: Employment Type, Start Date, FTE %, Location, Department
3. **Excluded Employees Table (7 employees):**
   - Columns: Employee (name + ID), Department, Start Date, Type (Lozenge), Reason (ADS InlineMessage error), Action (Override button)
   - Exclusion reasons: Start Date (after cutoff), Employment Type (not Regular/Definite)

#### Step 5: Budget & FX Rates
**Purpose:** Configure budget allocations, budget structures, exchange rates, and department-level budgets.

**Sections:**
1. **Budget Allocation:** 3-column grid for Broadbased Equity, L100+ Equity, and Total Equity budgets
2. **Budgets Panel (Split-pane layout):**
   - Left: Sidebar list of 6 budget items with selection indicator and last-updated dates
   - Right: Editing panel with General/Permissions tabs
   - **General tab fields:**
     - Budget Name (text input)
     - Budget Type (Radio: Cash / Equity)
     - Contributing Columns (7 checkboxes)
     - Budget Creation Method (Radio: Bottoms Up / Award)
     - Budget Limit (Radio: Yes / No)
     - Per-column Calculation Method cards (Radio: Percentage of Pay, Sum Column, Sum Target, Sum Uploaded)
   - **Permissions tab:** Placeholder for budget-level access control
3. **Exchange Rates:**
   - Base Currency selector (USD/EUR/GBP) + Rate Date
   - FX rates table: Currency, Code, Rate to USD, Last Updated (4 currencies: EUR, GBP, INR, CAD)
   - Import/Export buttons
   - Recent Changes audit log with user and timestamp
4. **Department Budget Allocations Table:** 6 departments with headcount, merit budget ($), merit %, bonus budget ($), bonus %

#### Step 6: Salary Bands & Equity Targets
**Purpose:** Upload and manage salary band data.

**Features:**
- CSV upload zone (required columns: Level, SRP, Range Max, Equity Max)
- Current Bands table with inline-editable fields (ADS Textfield compact)
- Export and Add actions
- Delete row capability (ADS IconButton with DeleteIcon)

#### Step 7: Users & Role Permissions
**Purpose:** Manage user accounts and their roles within the cycle.

**Features:**
- User table with columns: User (name + username), Email, Linked Employee, Role (Lozenge), Permissions, Active status, Actions (Edit icon)
- Roles: Admin, Manager, Leader, Planner
- Role Lozenge appearance: admin=removed, manager=success, leader=inprogress, default=default
- Add User button

#### Step 8: Field Permissions
**Purpose:** Control which fields are visible and editable per role and context.

**Features:**
- Role selector dropdown (Admin, Manager, Leader, Planner, HRBP, Employee)
- Context selector dropdown (Planning Grid, Employee View, Reports)
- Permissions table with Checkbox toggles for Visible and Editable per field
- Fields: Employee Name, Job Title, Level, Department, Location, Base Salary, Merit %, Bonus, Equity, Performance Rating, Compa-Ratio, Manager Notes
- Save Permissions button

#### Step 9: Reward Letter
**Purpose:** Configure the compensation notification letter sent to employees.

**Features:**
- Template selection (Standard, Executive, Minimal)
- Content toggles:
  - Include Performance Summary (Toggle)
  - Include Year-over-Year Comparison (Toggle)
- Custom Message textarea
- Live Preview panel showing rendered letter template with merge field placeholders

#### Step 10: Review & Finalize
**Purpose:** Summary view of all configured settings before launching the cycle.

**Features:**
- Summary cards for each prior step showing key configuration details
- Visual completion indicators
- Finalize Cycle action button

---

### 5.6 Comp Admin — Cycle Details

**Component:** `CycleDetails.tsx`

**Description:** Management interface for an existing active cycle with sticky header and tabbed navigation.

**Features:**
- **Sticky Header:**
  - Breadcrumb navigation (Cycles Dashboard > Cycle Name)
  - Cycle title with avatar icon
  - Action buttons (Edit, Export, Settings)
  - Tab navigation (Data Sources, Employee Data, Eligibility, Permissions)
- **Full-bleed layout** (no padding wrapper)

---

### 5.7 Comp Admin — Merit Matrix

**Component:** `MeritMatrix.tsx`

**Description:** Interactive grid for defining merit increase percentages based on performance rating and compa-ratio position.

**Features:**
- **Cycle Selector:** Dropdown to switch between years (2024-2026)
- **Country/Region Filter:** Global or country-specific matrices
- **Matrix Grid:**
  - Rows: 5 performance ratings (Greatly Exceeded, Exceeds Expectations, Meets Expectations, Met Some, Did Not Meet)
  - Columns: 4 compa-ratio ranges (CR 0.80-0.90, 0.90-1.00, 1.00-1.10, 1.10-1.20)
  - Each cell: Editable percentage input (ADS Textfield)
- **Toolbar:** Reset to Defaults, Export Matrix, Apply & Save
- **Information Banner:** Explains how compa-ratio and performance intersect to determine merit increases
- **Full-width layout** (no padding wrapper)

---

### 5.8 Comp Admin — Salary Bands

**Component:** `SalaryBands.tsx`

**Description:** Market-based compensation range management with data visualizations.

**Features:**
- **Filter Controls:**
  - Job Family selector (Engineering, Product, Design, Sales, Marketing)
  - Level Type selector (Individual Contributor P-Levels / Manager M-Levels)
  - Add Band button
- **Band Data Table:** DynamicTable showing Level, Label, Min, Mid (SRP), Max, P10, P25, P50, P75, P90, and Spread % for each band
- **Visualization — Range Spread Chart:** Recharts BarChart showing min-to-max spread for each level
- **Visualization — Market Percentile Chart:** Recharts LineChart with P10 through P90 lines for each level

**Band Coverage:**
- IC Track: P30 (Junior) through P80 (Distinguished) — 6 levels
- Manager Track: M10 (Manager) through M70 (EVP) — 7 levels
- Full-bleed layout

---

### 5.9 Comp Admin — Groups Management

**Component:** `GroupsManagement.tsx`

**Description:** Organize users into permission groups with configurable access.

**Features:**
- **Group List:** Cards for each group (Admin, Managers, HRBP, Planners, Read Only) showing:
  - Group name and description
  - Member count and avatars
  - Permission count summary
  - Chevron to view/expand details
- **Group Detail Panel:** Members list with search, add/remove capability
- **Permissions per Group:** Checkbox toggles for View Compensation, Edit Compensation, Approve Changes, Export Data, Manage Users
- **Create Group Modal (ADS Modal):**
  - Group name and description fields
  - Member selection with search and checkboxes
  - Create / Cancel actions
- **Delete Group capability** with confirmation
- Full-bleed layout

---

### 5.10 Comp Admin — Data Management

**Component:** `DataManagement.tsx`

**Description:** System-wide data source management for integrating external data.

**Features:**
- **API Configuration Panel:**
  - Expandable configuration for each integration (Workday, Shareworks)
  - Fields: API URL, API Key, API Secret
  - Test Connection (primary) and Save (secondary) buttons
  - Info banner about API credential requirements
- **Source Cards (3):** Workday (HRIS), Shareworks (Equity Management), CSV Upload
  - Status badges: Connected, Pending, Not Connected
  - Table count and last sync timestamp
  - Click to select and view tables
- **Table Management:**
  - Per-source table list with expandable field mappings
  - Sync toggle per table
  - Sync All and Add Table actions
  - Field-level detail: field name, column mapping, description, status (Updated/Synced)
- **Empty State:** Upload prompt when no tables are configured
- Full-bleed layout

---

### 5.11 Comp Admin — System Settings

**Component:** `SystemSettings.tsx`

**Description:** Global platform configuration. Currently a placeholder container for future settings features.

**Status:** Empty container — awaiting feature definition.

---

## 6. Design System & Styling Standards

### 6.1 Component Library
All UI components use the Atlassian Design System (@atlaskit):

| Category | Components Used |
|---|---|
| **Typography** | `Heading` (sizes: large, medium, small, xsmall), `Text` (sizes: medium, small, UNSAFE_small) |
| **Buttons** | `Button` (primary, default, subtle, link), `IconButton` |
| **Forms** | `Textfield`, `TextArea`, `Select`, `Checkbox`, `Toggle`, `RadioGroup` |
| **Data Display** | `DynamicTable`, `Lozenge`, `ProgressBar`, `InlineMessage`, `SectionMessage` |
| **Navigation** | `Root`, `TopNav`, `SideNav`, `Main` (from @atlaskit/navigation-system) |
| **Modals** | `Modal`, `ModalHeader`, `ModalBody`, `ModalFooter`, `ModalTitle`, `ModalTransition` |
| **Icons** | Exclusively from `@atlaskit/icon/core/` (never from deprecated `/glyph/`) |

### 6.2 Design Tokens
All styling uses ADS design tokens — no hardcoded hex values, pixel values, or rem units:

| Token Category | Usage |
|---|---|
| **Spacing** | `token("space.025")` through `token("space.600")` for all margin, padding, and gaps |
| **Colors** | `token("color.text")`, `token("color.text.subtlest")`, `token("color.background.*")`, etc. |
| **Elevation** | `token("elevation.surface")`, `token("elevation.surface.raised")`, `token("elevation.surface.sunken")` |
| **Borders** | `token("color.border")`, `token("border.radius.100")` through `token("border.radius.300")` |
| **Shadows** | `token("elevation.shadow.raised")` |

### 6.3 Card Pattern
Standard card style used throughout the application:
```
backgroundColor: token("elevation.surface.raised")
borderRadius: token("border.radius.300")
padding: token("space.400")
boxShadow: token("elevation.shadow.raised")
```

### 6.4 Charts
All data visualizations use Recharts with `ResponsiveContainer`:
- `PieChart` — Compensation breakdown
- `BarChart` — Year-over-year trends, salary band range spreads
- `LineChart` — Market percentile curves

---

## 7. Data Architecture

### 7.1 Database (Server-side)
- **ORM:** Drizzle
- **Database:** PostgreSQL (Neon-backed)
- **Schema:** `users` table (id, username, password)

### 7.2 Client-side Data
All compensation data is currently client-side (mock data for demonstration):

| Data Model | Location | Record Count |
|---|---|---|
| Compensation Data | `compensationData.ts` | 1 employee profile |
| RSU/Equity Data | `compensationData.ts` | Multi-year grants |
| Employee Grid Data | `CycleBuilder.tsx` | 12 employees |
| Excluded Employees | `CycleBuilder.tsx` | 7 employees |
| FX Rates | `CycleBuilder.tsx` | 4 currencies |
| Salary Bands (IC) | `SalaryBands.tsx` | 6 levels (P30-P80) |
| Salary Bands (Mgr) | `SalaryBands.tsx` | 7 levels (M10-M70) |
| Department Budgets | `CycleBuilder.tsx` | 6 departments |
| Cycles | `CyclesDashboard.tsx` | 4 cycles |
| Team Employees | `TeamOverview.tsx` | 8 direct reports |
| User Groups | `GroupsManagement.tsx` | 5 groups, 7 users |
| Data Sources | `DataManagement.tsx` | 3 sources |

---

## 8. Technical Architecture

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + TypeScript |
| **Bundler** | Vite |
| **UI Framework** | Atlassian Design System (@atlaskit) |
| **Charts** | Recharts |
| **Server** | Express.js |
| **Database** | PostgreSQL + Drizzle ORM |
| **Runtime** | Node.js (tsx) |
| **Hosting** | Replit (port 5000) |

---

## 9. Future Considerations

1. **System Settings:** Currently an empty placeholder — needs feature definition for global configuration (currency defaults, fiscal year setup, notification preferences, audit log settings)
2. **API Integration:** Workday and Shareworks connections are UI-only; backend integration endpoints needed
3. **Real-time Data:** Move from client-side mock data to API-driven data fetching
4. **Approval Workflows:** Manager submission → HRBP review → Comp Admin approval pipeline
5. **Audit Trail:** Comprehensive logging of all compensation changes with user attribution
6. **Multi-currency Support:** Full end-to-end FX conversion beyond rate configuration
7. **Analytics & Reporting:** Dedicated reporting module with exportable dashboards
8. **Notifications:** Email/in-app notifications for cycle deadlines, approvals, and changes
9. **Access Control:** Backend enforcement of role-based permissions (currently UI-only)
10. **Bulk Operations:** Mass updates for salary adjustments, equity grants, and eligibility overrides

---

## 10. Success Metrics

| Metric | Target |
|---|---|
| Cycle setup time | < 2 hours for full cycle configuration |
| Manager planning completion rate | > 90% within cycle deadline |
| Employee compensation page load | < 2 seconds |
| Data source sync reliability | > 99.5% success rate |
| User adoption (active users / total users) | > 85% within first cycle |

---

*Document generated from the current state of the the compensation tool application codebase as of March 2, 2026.*
