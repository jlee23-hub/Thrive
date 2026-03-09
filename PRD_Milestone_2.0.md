# PRD Milestone 2.0

## Thrive — Manager Team Planner View (Read-Only)

---

## Overview and Scope

Milestone 2 delivers the Manager Team Planner experience in Thrive — a compensation planning tool built on the Atlassian Design System.

Managers get a dedicated read-only workspace to view their direct reports' current compensation during an active compensation cycle. The Team Planner surfaces each employee's current compensation (base salary, bonus target, equity), job metadata, performance ratings, and salary range position — all in a sortable, filterable, searchable grid with column pinning. Team Summary Cards provide headline metrics at a glance.

Employee demographics, salary, level, and job data continue to flow from Workday. Equity data flows from Shareworks. The Manager Team Planner is scoped to one active compensation cycle at a time, and a manager only sees employees who report to them and are eligible for the cycle.

### In Scope

- **Team Planner Grid** (Manager): Read-only grid showing all direct reports eligible for the active cycle with current compensation data. Supports column pinning (freeze columns on left side of grid while scrolling horizontally).
- **Team Summary Cards** (Manager): Headline metrics for the team — headcount, total current base, total current equity, and average salary range position.
- **Filtering** (Manager): Column-level filters by job level, zone, performance rating, and eligibility status. Filters are additive (AND logic).
- **Sorting** (Manager): Column-level sorting (ascending/descending) on any column.
- **Search** (Manager): Text search by employee name or job family.
- **Column Pinning** (Manager): Ability to pin columns to the left side of the grid so they remain visible while scrolling horizontally through other columns.

### Out of Scope

- Equity grant recommendations (editable columns, save/submit/recall workflows).
- Budget tracker and budget-related UI.
- Guardrails and validation warnings.
- Manager-to-manager delegation or proxy planning.
- Multi-level roll-up views (VP seeing all managers' data in aggregate).
- Approval workflows.
- Compensation cycle creation, configuration, or administration.
- Reward letter generation or distribution.
- Notifications, email alerts, or Rovo AI assistant integration.
- Audit logging and SOX compliance reporting.
- Employee self-service view changes (covered in Milestone 1).

---

## Personas, Jobs to Be Done

### Manager

A people leader (typically M50–M70 level) who needs visibility into their direct reports' current compensation during a compensation cycle. Any user with at least one direct report gets manager access — there is no minimum team size requirement. Managers have two views: "My View" (personal Total Rewards dashboard from Milestone 1) and "My Team" (Team Planner from this milestone), both accessible from the left navigation.

| Job to Be Done |
|---|
| See all my direct reports' current compensation, job metadata, and performance ratings in one grid |
| Switch between my personal compensation view ("My View") and my team planning view ("My Team") |
| Understand where each employee sits relative to their salary band (compa-ratio / % of SRP) |
| Filter and sort my team by level, zone, performance rating, or job family to review team composition |
| Pin key columns (like employee name) so they remain visible while scrolling through other data |
| Search for specific employees or job families quickly |

---

## Users and Functional Requirements

### Manager — Team Planner Grid

| # | Requirement | Priority |
|---|---|---|
| M-1 | As a manager, I can see a read-only grid of all my direct reports who are eligible for the active compensation cycle. Columns include: Employee Name, Employee ID, Job Title, Job Level, Job Family, Zone, Start Date, Eligibility Date, Current Base Salary, Bonus Target %, Current Equity (RSUs), Performance Rating, % of SRP (Salary Range Position). Source: Workday (demographics, salary, job data), Shareworks (equity). | P0 |
| M-2 | As a manager, I can pin columns to the left side of the grid so they remain visible while scrolling horizontally (e.g., pin Employee Name and Employee ID). | P0 |
| M-3 | As a manager, I can unpin a previously pinned column to return it to its default scrollable position. | P1 |

### Manager — Team Summary Cards

| # | Requirement | Priority |
|---|---|---|
| M-4 | As a manager, I can see summary cards above the grid showing: team headcount, total current base salary, total current equity (RSUs), and average % of SRP. | P0 |
| M-5 | As a manager, the summary cards update dynamically when filters are applied (showing metrics for the filtered subset). | P1 |

### Manager — Sorting

| # | Requirement | Priority |
|---|---|---|
| M-6 | As a manager, I can sort the grid by any column (ascending/descending) by clicking the column header. | P0 |
| M-7 | As a manager, I can see a visual indicator on the column header showing the current sort direction. | P0 |
| M-8 | As a manager, clicking a sorted column header a third time removes the sort (returns to default order). | P1 |

### Manager — Search

| # | Requirement | Priority |
|---|---|---|
| M-9 | As a manager, I can search the grid by employee name or job family using a text search field above the grid. | P0 |
| M-10 | As a manager, the search filters the grid in real time as I type (debounced, no submit button required). | P0 |
| M-11 | As a manager, I can clear the search to restore the full grid. | P0 |

### Manager — Filtering

| # | Requirement | Priority |
|---|---|---|
| M-12 | As a manager, I can filter the grid by job level, zone, performance rating, and eligibility status. Filters are additive (AND logic). | P0 |
| M-13 | As a manager, I can see active filter indicators showing which filters are currently applied. | P0 |
| M-14 | As a manager, I can clear individual filters or clear all filters at once. | P0 |

### Manager — Data Display and Context

| # | Requirement | Priority |
|---|---|---|
| M-15 | As a manager, I can see the active cycle name, type, and effective date displayed in the Team Planner header. | P0 |
| M-16 | As a manager, I can see the "last synced from Workday" and "last synced from Shareworks" timestamps on the Team Planner page. | P1 |
| M-17 | As a manager, I can see each employee's performance rating displayed as a color-coded lozenge (Greatly Exceeds = green, Exceeds = blue, Meets = default, Met Some = yellow). | P0 |
| M-18 | As a manager, I can see each employee's % of SRP with color coding (red if below 100%, green if at or above 100%). | P0 |
| M-19 | As a manager, I can paginate the grid if my team exceeds 10 direct reports (10 rows per page). | P1 |
| M-20 | As a manager, I can export the grid as a CSV file. | P2 |

---

## User Stories and Functional Requirements

### Manager: View Team Compensation

**As a manager, I want to see my team's current compensation in a single read-only grid so I can understand my team's compensation landscape.**

- The Team Planner opens to the active compensation cycle. If no cycle is active, the page displays: "No active compensation cycle. Contact your Comp Admin."
- The grid shows all direct reports who are eligible for the cycle (eligibility determined by rules configured in cycle setup).
- All columns are read-only: Name, Employee ID, Job Title, Level, Job Family, Zone, Start Date, Eligibility Date, Current Base Salary, Bonus Target %, Current Equity (RSUs), Performance Rating, % of SRP.
- Team Summary Cards above the grid show headline metrics.
- Employee Name column is pinned by default. Manager can pin/unpin additional columns.

### Manager: Find and Focus on Specific Employees

**As a manager, I want to search, filter, and sort my team grid so I can focus on specific employees or groups when reviewing compensation data.**

- Text search field above the grid filters by employee name or job family in real time.
- Filter dropdowns for job level, zone, performance rating, and eligibility status.
- Active filter indicators show applied filters; clear individual or clear all.
- Column header click toggles sort direction (ascending → descending → unsorted).
- Summary cards update to reflect the filtered subset.

### Manager: Pin Columns for Context While Scrolling

**As a manager, I want to pin key columns (like employee name) to the left side of the grid so I always know which employee's data I'm looking at when scrolling through many columns.**

- Right-click column header or use a pin icon to pin/unpin columns.
- Pinned columns freeze on the left side with a visual separator from scrollable columns.
- Multiple columns can be pinned simultaneously.
- Employee Name is pinned by default.

---

## Non-Functional Requirements

### Security & Compliance

| Requirement | Detail |
|---|---|
| SSO Authentication | Okta OIDC/SAML; same infrastructure as Milestone 1 |
| Session Management | JWT with 8-hour expiry; refresh token rotation |
| Access Control | Manager can only view their own direct reports; enforced server-side. Manager cannot see other managers' teams. |
| Data Scoping | Manager's team is determined by the reporting hierarchy in Workday. The server filters eligible employees by both the manager's reporting line and the cycle's eligibility rules. |
| Transport Security | TLS 1.2+ for all API calls |

### Privacy & Data Handling

| Requirement | Detail |
|---|---|
| PII Fields | Employee names, salaries, bonus targets, equity values, and performance ratings are PII; encrypted at rest |
| Who Can See What | Manager: own direct reports only. Manager cannot see other managers' teams. Employee compensation data visible to the manager is limited to what is permitted by the cycle's column permission configuration (from cycle setup step 7). |
| Performance Ratings | Visible to manager for context. Not editable by the manager. Source: Workday. |

### Accessibility & Localization

| Requirement | Detail |
|---|---|
| WCAG Level | AA compliance (ADS components provide this foundation) |
| Keyboard Navigation | Full keyboard support for grid navigation. Arrow keys to navigate between pinned and scrollable columns. |
| Screen Reader | ARIA labels on all interactive elements; grid cells announce column header and value. Pinned column state announced. |
| Currencies | USD as default; currency field from Workday determines display format. All monetary values formatted consistently. |
| Number Formatting | Locale-aware formatting for salary and equity values (e.g., `$198,800.00`, `1,250 RSUs`) |

---

## Key User Flows

### Flow 1: Manager Opens Team Planner

1. Manager logs in via Okta SSO (same as Milestone 1).
2. Manager navigates to "My Team" from the left navigation.
3. System checks for an active compensation cycle.
   - If no active cycle → display message: "No active compensation cycle. Contact your Comp Admin."
   - If active cycle exists → proceed.
4. System resolves the manager's identity → queries the reporting hierarchy from Workday to determine direct reports.
5. System filters direct reports by the cycle's eligibility rules.
6. Team Planner grid renders with:
   - Summary cards (headcount, total base, total equity, avg % of SRP).
   - Read-only grid with current compensation data.
   - Employee Name column pinned by default.
   - Cycle metadata in the header (name, type, effective date).
   - Sync timestamps for Workday and Shareworks.

**Error states:**
- No active cycle: Message displayed; grid not rendered.
- Manager has no direct reports in the cycle: "All of your direct reports are excluded from this cycle based on eligibility rules."
- Workday data unavailable for an employee: Row renders with available data; missing fields show "—".

### Flow 2: Manager Searches, Filters, and Sorts

1. Manager types a name or job family into the search field.
2. Grid filters in real time to show matching employees.
3. Manager applies a filter (e.g., Level = "IC5").
4. Grid narrows further; active filter indicator appears; summary cards update.
5. Manager clicks a column header to sort (e.g., Performance Rating descending).
6. Grid reorders; sort direction indicator appears on the column header.
7. Manager clears search and filters to restore the full grid.

### Flow 3: Manager Pins and Unpins Columns

1. Manager right-clicks or uses pin icon on a column header (e.g., Job Level).
2. Column freezes to the left side of the grid alongside Employee Name (pinned by default).
3. Manager scrolls horizontally; pinned columns remain visible with a visual separator.
4. Manager unpins the column; it returns to its default scrollable position.

---

## Evaluation Data Set

### Data Sources

| Source | Type | Purpose |
|---|---|---|
| Workday (Employee Compensation Records) | Production | Employee demographics, salary, level, job data, reporting hierarchy |
| Workday (Performance Ratings) | Production | Latest performance rating for each employee |
| Shareworks (Equity Grants) | Production | Current RSU grant data for each employee |
| Cycle Configuration (Bands, Eligibility) | Application | Salary band ranges, eligibility rules — configured in Cycle Builder |
| Synthetic test records | Generated | Edge cases (e.g., new hire with no equity, manager with 1 report) |

### View-Specific Data Expectations

| View | What the User Sees | Key Validation |
|---|---|---|
| Manager Team Planner (active cycle) | Read-only grid of direct reports with current comp data, summary cards | Grid shows only eligible direct reports; summary card math is correct; all columns are read-only |
| Manager Team Planner (no active cycle) | "No active compensation cycle" message | Grid and summary cards are not rendered |
| Manager Team Planner (all reports excluded) | "All of your direct reports are excluded" message | Grid renders empty state |

### Example Test Cases

| # | Scenario | Expected Result |
|---|---|---|
| TC-1 | Manager with 8 direct reports, active Equity cycle | Grid shows 8 eligible employees with all compensation data; all columns are read-only; summary cards show correct totals |
| TC-2 | Manager pins Employee Name and Job Level columns, then scrolls right | Pinned columns remain fixed on the left; other columns scroll horizontally; visual separator visible |
| TC-3 | Manager sorts by Performance Rating descending | Grid reorders with "Greatly Exceeds" at top; sort indicator visible on column header |
| TC-4 | Manager filters by Zone = "Zone 1" and Level = "IC5" | Grid shows only employees matching both criteria; active filter indicators visible; summary cards update |
| TC-5 | Manager searches "Engineering" | Grid filters to show only employees whose name or job family contains "Engineering" |
| TC-6 | Manager opens Team Planner but no active cycle exists | "No active compensation cycle. Contact your Comp Admin." message displayed; no grid rendered |
| TC-7 | Manager with 15 direct reports (exceeds page size of 10) | Pagination appears; first page shows 10 rows; second page shows 5 rows |
| TC-8 | Manager with 1 direct report who has no Shareworks data (new hire) | Current equity column shows "—" or "0 RSUs"; other columns populated from Workday |
| TC-9 | Manager clears all filters after filtering by level and zone | Full grid restored; filter indicators removed; summary cards show full team metrics |
| TC-10 | Manager switches between "My View" and "My Team" in left navigation | "My View" shows personal Total Rewards dashboard; "My Team" shows Team Planner grid; navigation state is correct |

---

## Assumptions

| # | Assumption |
|---|---|
| A1 | The manager's reporting hierarchy (who reports to whom) is available from Workday and maintained in the Thrive data model. |
| A2 | A manager sees only their direct reports — not skip-level reports or dotted-line reports. |
| A3 | Only one compensation cycle can be active at a time for a given population. If multiple cycles exist, the Team Planner shows the one that includes the manager's direct reports. |
| A4 | Salary band data (min, mid, max per level and zone) is configured during cycle setup (Cycle Builder step 5) and is available for % of SRP calculations. |
| A5 | Column permissions configured in Cycle Builder step 7 determine which columns are visible for the manager role. The Team Planner respects these permissions. |
| A6 | Eligibility rules configured in Cycle Builder step 3 determine which of the manager's direct reports appear in the grid. Excluded employees are not shown. |
| A7 | Workday and Shareworks sync timestamps and behavior are the same as Milestone 1 — timestamps represent the time data was last pulled from the source system. |
| A8 | Employee Name column is pinned by default on initial load. Manager's pinning preferences are not persisted across sessions (reset on page load). |
| A9 | Managers have dual navigation: "My View" (personal Total Rewards dashboard from Milestone 1) and "My Team" (Team Planner). Both are accessible from the left navigation. |
| A10 | No minimum team size is required for manager access. Any user with at least one direct report in Workday gets the "My Team" navigation item and Team Planner access. |
| A11 | The Team Planner is entirely read-only in this milestone. No data entry, editing, saving, or submission functionality is included. |

---

## Open Questions and Clarifications Needed

| # | Question | Options / Context |
|---|---|---|
| OQ-1 | How should we handle managers who are also direct reports of another manager in the same cycle? Should the manager's own record appear in their manager's grid? | Standard practice is yes — the manager is an employee too. Confirming this is the expected behavior. |
| ~~OQ-2~~ | ~~Should the manager see a read-only view of their own compensation (as an employee) alongside the Team Planner, or are those completely separate views?~~ | **RESOLVED:** Manager has both views — "My View" (personal Total Rewards dashboard from Milestone 1) and "My Team" (Team Planner). Both are accessible from the left navigation. |
| ~~OQ-3~~ | ~~Should the equity recommendation column accept a dollar value or units only?~~ | **RESOLVED:** No equity recommendation column in this milestone. Team Planner is read-only. |
| ~~OQ-4~~ | ~~Is there a minimum team size or reporting relationship requirement to access the Team Planner, or does any user with at least one direct report get manager access?~~ | **RESOLVED:** No minimum team size. Any user with at least one direct report gets manager access to the Team Planner. |
| OQ-5 | Should manager's column pinning preferences persist across sessions, or reset to defaults on each page load? | Persisting requires additional storage; resetting is simpler for initial release. |
