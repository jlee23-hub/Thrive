# PRD Milestone 2.0

## Thrive — Manager Team Planner View

---

## Overview and Scope

Milestone 2 delivers the Manager Team Planner experience in Thrive — a compensation planning tool built on the Atlassian Design System.

Managers get a dedicated workspace to view their direct reports' current compensation and enter equity grant recommendations during an active compensation cycle. The Team Planner surfaces each employee's current compensation (base salary, bonus target, equity), job metadata, performance ratings, and salary range position — all in a sortable, filterable, searchable grid with column pinning. Team Summary Cards provide headline metrics at a glance. Managers can recommend new equity (RSU) grants directly in the grid.

Employee demographics, salary, level, and job data continue to flow from Workday. Equity data flows from Shareworks. The Manager Team Planner is scoped to one active compensation cycle at a time, and a manager only sees employees who report to them and are eligible for the cycle.

### In Scope

- **Team Planner Grid** (Manager): Grid showing all direct reports eligible for the active cycle. Current compensation data is read-only; the equity grant recommendation column is editable. Supports column pinning (freeze columns on left side of grid while scrolling horizontally).
- **Team Summary Cards** (Manager): Headline metrics for the team — headcount, total current base, total current equity, and average salary range position.
- **Filtering** (Manager): Column-level filters by job level, zone, performance rating, and eligibility status. Filters are additive (AND logic).
- **Sorting** (Manager): Column-level sorting (ascending/descending) on any column.
- **Search** (Manager): Text search by employee name or job family.
- **Column Pinning** (Manager): Ability to pin columns to the left side of the grid so they remain visible while scrolling horizontally through other columns.
- **Recommendation Submission** (Manager): Ability to save draft equity recommendations, submit final recommendations for approval, and recall a submission before the cycle closes.
- **Guardrails and Validation** (Manager): Advisory warnings when equity recommendations appear outside expected ranges.

### Out of Scope

- Budget tracker and budget-related UI (allocated, spent, remaining, progress bar).
- Manager-to-manager delegation or proxy planning (a manager planning on behalf of another manager).
- Multi-level roll-up views (VP seeing all managers' recommendations in aggregate).
- Approval workflows (HRBP or Comp Admin approving/rejecting manager submissions).
- Compensation cycle creation, configuration, or administration.
- Reward letter generation or distribution.
- Notifications, email alerts, or Rovo AI assistant integration.
- Audit logging and SOX compliance reporting.
- Employee self-service view changes (covered in Milestone 1).

---

## Personas, Jobs to Be Done

### Manager

A people leader (typically M50–M70 level) responsible for recommending equity grants for their direct reports during a compensation cycle.

| Job to Be Done |
|---|
| See all my direct reports' current compensation, job metadata, and performance ratings in one grid |
| Recommend new equity (RSU) grants for direct reports |
| Understand where each employee sits relative to their salary band (compa-ratio / % of SRP) |
| Filter and sort my team by level, zone, performance rating, or job family to make informed decisions |
| Pin key columns (like employee name) so they remain visible while scrolling through other data |
| Search for specific employees or job families quickly |
| Save my work as a draft and return later to continue planning |
| Submit my final equity recommendations for review |
| Recall a submission if I need to make changes before the cycle closes |

### Comp Admin (read-only context in this milestone)

A compensation administrator who configures cycles and monitors progress. In Milestone 2, the Comp Admin does not interact with the Manager Team Planner directly — their role is limited to having configured the cycle, salary bands, and eligibility rules that govern the manager's experience.

| Job to Be Done |
|---|
| Ensure the cycle configuration (bands, eligibility) is correctly reflected in what managers see |

---

## Users and Functional Requirements

### Manager — Team Planner Grid

| # | Requirement | Priority |
|---|---|---|
| M-1 | As a manager, I can see a grid of all my direct reports who are eligible for the active compensation cycle. Columns include: Employee Name, Employee ID, Job Title, Job Level, Job Family, Zone, Start Date, Eligibility Date, Current Base Salary, Bonus Target %, Current Equity (RSUs), Performance Rating, % of SRP (Salary Range Position). Source: Workday (demographics, salary, job data), Shareworks (equity). | P0 |
| M-2 | As a manager, I can enter a recommended equity (RSU) grant amount (in units) for each direct report in an editable column. | P0 |
| M-3 | As a manager, I can pin columns to the left side of the grid so they remain visible while scrolling horizontally (e.g., pin Employee Name and Employee ID). | P0 |
| M-4 | As a manager, I can unpin a previously pinned column to return it to its default scrollable position. | P1 |

### Manager — Team Summary Cards

| # | Requirement | Priority |
|---|---|---|
| M-5 | As a manager, I can see summary cards above the grid showing: team headcount, total current base salary, total current equity (RSUs), and average % of SRP. | P0 |
| M-6 | As a manager, the summary cards update dynamically when filters are applied (showing metrics for the filtered subset). | P1 |

### Manager — Sorting

| # | Requirement | Priority |
|---|---|---|
| M-7 | As a manager, I can sort the grid by any column (ascending/descending) by clicking the column header. | P0 |
| M-8 | As a manager, I can see a visual indicator on the column header showing the current sort direction. | P0 |
| M-9 | As a manager, clicking a sorted column header a third time removes the sort (returns to default order). | P1 |

### Manager — Search

| # | Requirement | Priority |
|---|---|---|
| M-10 | As a manager, I can search the grid by employee name or job family using a text search field above the grid. | P0 |
| M-11 | As a manager, the search filters the grid in real time as I type (debounced, no submit button required). | P0 |
| M-12 | As a manager, I can clear the search to restore the full grid. | P0 |

### Manager — Filtering

| # | Requirement | Priority |
|---|---|---|
| M-13 | As a manager, I can filter the grid by job level, zone, performance rating, and eligibility status. Filters are additive (AND logic). | P0 |
| M-14 | As a manager, I can see active filter indicators showing which filters are currently applied. | P0 |
| M-15 | As a manager, I can clear individual filters or clear all filters at once. | P0 |

### Manager — Guardrails and Validation

| # | Requirement | Priority |
|---|---|---|
| M-16 | As a manager, I see advisory warnings for equity recommendations that appear outside expected ranges (e.g., significantly above or below team average). | P1 |
| M-17 | As a manager, I can still submit recommendations that trigger warnings. Guardrails are advisory, not blocking. | P0 |

### Manager — Save, Submit, and Recall

| # | Requirement | Priority |
|---|---|---|
| M-18 | As a manager, I can save my current equity recommendations as a draft at any time. Drafts persist across sessions. | P0 |
| M-19 | As a manager, I can submit my equity recommendations for the cycle. Submission changes the status from "Draft" to "Submitted" and locks the grid from further edits. | P0 |
| M-20 | As a manager, I can recall my submission (change status back to "Draft") as long as the cycle is still open. Recalling unlocks the grid for editing. | P1 |
| M-21 | As a manager, I see a confirmation dialog before submitting ("You are about to submit equity recommendations for N employees. This action can be recalled while the cycle is open."). | P0 |
| M-22 | As a manager, I see a status indicator showing the current state of my recommendations: "Not Started", "Draft", or "Submitted". | P0 |

### Manager — Data Display and Context

| # | Requirement | Priority |
|---|---|---|
| M-23 | As a manager, I can see the active cycle name, type, and effective date displayed in the Team Planner header. | P0 |
| M-24 | As a manager, I can see the "last synced from Workday" and "last synced from Shareworks" timestamps on the Team Planner page. | P1 |
| M-25 | As a manager, I can see each employee's performance rating displayed as a color-coded lozenge (Greatly Exceeds = green, Exceeds = blue, Meets = default, Met Some = yellow). | P0 |
| M-26 | As a manager, I can see each employee's % of SRP with color coding (red if below 100%, green if at or above 100%). | P0 |
| M-27 | As a manager, I can paginate the grid if my team exceeds 10 direct reports (10 rows per page). | P1 |
| M-28 | As a manager, I can export the grid (including my equity recommendations) as a CSV file. | P2 |

---

## User Stories and Functional Requirements

### Manager: View Team Compensation and Plan Equity

**As a manager, I want to see my team's current compensation and enter equity grant recommendations so I can make informed, fair equity allocation decisions.**

- The Team Planner opens to the active compensation cycle. If no cycle is active, the page displays: "No active compensation cycle. Contact your Comp Admin."
- The grid shows all direct reports who are eligible for the cycle (eligibility determined by rules configured in cycle setup).
- Read-only columns display current state: Name, Employee ID, Job Title, Level, Job Family, Zone, Start Date, Eligibility Date, Current Base Salary, Bonus Target %, Current Equity (RSUs), Performance Rating, % of SRP.
- Editable column: Equity Grant (units).
- Team Summary Cards above the grid show headline metrics.
- Employee Name column is pinned by default. Manager can pin/unpin additional columns.

### Manager: Find and Focus on Specific Employees

**As a manager, I want to search, filter, and sort my team grid so I can focus on specific employees or groups when making equity decisions.**

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

### Manager: Submit My Equity Recommendations

**As a manager, I want to save my progress and submit my final equity recommendations so they can be reviewed and processed.**

- "Save Draft" persists all entered values without changing status.
- "Submit" triggers a confirmation dialog showing employee count and a note that the submission can be recalled.
- After submission, the grid becomes read-only and the status changes to "Submitted".
- "Recall" changes the status back to "Draft" and re-enables editing (only available while the cycle is open).

---

## Non-Functional Requirements

### Security & Compliance

| Requirement | Detail |
|---|---|
| SSO Authentication | Okta OIDC/SAML; same infrastructure as Milestone 1 |
| Session Management | JWT with 8-hour expiry; refresh token rotation |
| Access Control | Manager can only view and plan for their own direct reports; enforced server-side. Manager cannot see other managers' teams or recommendations. |
| Data Scoping | Manager's team is determined by the reporting hierarchy in Workday. The server filters eligible employees by both the manager's reporting line and the cycle's eligibility rules. |
| Transport Security | TLS 1.2+ for all API calls |
| Draft Persistence | Drafts are stored server-side and associated with the manager's identity and the active cycle ID |

### Privacy & Data Handling

| Requirement | Detail |
|---|---|
| PII Fields | Employee names, salaries, bonus targets, equity values, and performance ratings are PII; encrypted at rest |
| Who Can See What | Manager: own direct reports only. Manager cannot see other managers' teams or recommendations. Employee compensation data visible to the manager is limited to what is permitted by the cycle's column permission configuration (from cycle setup step 7). |
| Performance Ratings | Visible to manager for planning context. Not editable by the manager. Source: Workday. |
| Recommendation Data | Manager's draft and submitted equity recommendations are visible only to the manager and (in future milestones) the approving HRBP/Comp Admin. |

### Accessibility & Localization

| Requirement | Detail |
|---|---|
| WCAG Level | AA compliance (ADS components provide this foundation) |
| Keyboard Navigation | Full keyboard support for grid navigation, inline editing, and form controls. Tab through editable cells, Enter to confirm, Escape to cancel. Arrow keys to navigate between pinned and scrollable columns. |
| Screen Reader | ARIA labels on all interactive elements; grid cells announce column header and value. Pinned column state announced. Warning icons have descriptive labels. |
| Currencies | USD as default; currency field from Workday determines display format. All monetary values formatted consistently. |
| Number Formatting | Locale-aware formatting for salary and equity values (e.g., `$198,800.00`, `1,250 RSUs`) |

---

## Key User Flows

### Flow 1: Manager Opens Team Planner

1. Manager logs in via Okta SSO (same as Milestone 1).
2. Manager navigates to Team Overview from the left navigation.
3. System checks for an active compensation cycle.
   - If no active cycle → display message: "No active compensation cycle. Contact your Comp Admin."
   - If active cycle exists → proceed.
4. System resolves the manager's identity → queries the reporting hierarchy from Workday to determine direct reports.
5. System filters direct reports by the cycle's eligibility rules.
6. Team Planner grid renders with:
   - Summary cards (headcount, total base, total equity, avg % of SRP).
   - Grid with read-only current data and an editable equity grant recommendation column.
   - Employee Name column pinned by default.
   - Cycle metadata in the header (name, type, effective date).
   - Sync timestamps for Workday and Shareworks.
7. Status indicator shows "Not Started" if no recommendations have been entered.

**Error states:**
- No active cycle: Message displayed; grid not rendered.
- Manager has no direct reports in the cycle: "All of your direct reports are excluded from this cycle based on eligibility rules."
- Workday data unavailable for an employee: Row renders with available data; missing fields show "—".

### Flow 2: Manager Enters Equity Recommendations

1. Manager clicks into the Equity Grant (units) cell for an employee.
2. Manager types a number of RSU units (e.g., `500`).
3. On cell blur or Enter, the value is stored in the draft state.
4. Manager enters Equity Grant values for additional employees.
5. Status changes from "Not Started" to "Draft" after the first edit.

**Error states:**
- Non-numeric input in equity field: Field rejects input; no value saved.
- Negative equity value: Field rejects input.

### Flow 3: Manager Saves Draft and Returns Later

1. Manager clicks "Save Draft".
2. System persists all equity recommendation values server-side.
3. Success confirmation: "Draft saved successfully."
4. Manager navigates away or logs out.
5. Manager returns later → Team Planner loads with previously saved draft equity values populated in the editable column.
6. Status shows "Draft".

**Error states:**
- Save fails (network error): "Unable to save draft. Please try again."
- Session expired during save: Redirect to Okta SSO; after re-auth, return to Team Planner with last auto-saved state.

### Flow 4: Manager Submits Equity Recommendations

1. Manager clicks "Submit".
2. Confirmation dialog appears: "You are about to submit equity recommendations for [N] employees. This action can be recalled while the cycle is open."
3. Manager confirms.
4. System saves all values, changes status to "Submitted", and locks the grid (editable cells become read-only).
5. Success confirmation: "Recommendations submitted successfully."
6. If manager needs to make changes: clicks "Recall Submission" → status reverts to "Draft", grid becomes editable again.

**Error states:**
- Submission fails (network error): "Unable to submit. Please try again. Your draft has been saved."
- Cycle has closed since manager opened the page: "This cycle has closed. Submissions are no longer accepted."

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
| Manager Team Planner (active cycle) | Grid of direct reports with current comp data, editable equity recommendation column, summary cards | Grid shows only eligible direct reports; summary card math is correct |
| Manager Team Planner (no active cycle) | "No active compensation cycle" message | Grid and summary cards are not rendered |
| Manager Team Planner (all reports excluded) | "All of your direct reports are excluded" message | Grid renders empty state |
| Manager Team Planner (submitted state) | Read-only grid, "Submitted" status, "Recall" button | Editable cells are locked; recall restores editing |

### Example Test Cases

| # | Scenario | Expected Result |
|---|---|---|
| TC-1 | Manager with 8 direct reports, active Equity cycle | Grid shows 8 eligible employees; equity recommendation column is editable; summary cards show correct totals |
| TC-2 | Manager pins Employee Name and Job Level columns, then scrolls right | Pinned columns remain fixed on the left; other columns scroll horizontally; visual separator visible |
| TC-3 | Manager sorts by Performance Rating descending | Grid reorders with "Greatly Exceeds" at top; sort indicator visible on column header |
| TC-4 | Manager filters by Zone = "Zone 1" and Level = "IC5" | Grid shows only employees matching both criteria; active filter indicators visible; summary cards update |
| TC-5 | Manager searches "Engineering" | Grid filters to show only employees whose name or job family contains "Engineering" |
| TC-6 | Manager saves draft, logs out, logs back in | All previously entered equity values are restored; status shows "Draft" |
| TC-7 | Manager submits recommendations, then recalls | After submit: grid is read-only, status = "Submitted". After recall: grid is editable, status = "Draft" |
| TC-8 | Manager opens Team Planner but no active cycle exists | "No active compensation cycle. Contact your Comp Admin." message displayed; no grid rendered |
| TC-9 | Manager with 15 direct reports (exceeds page size of 10) | Pagination appears; first page shows 10 rows; second page shows 5 rows |
| TC-10 | Manager with 1 direct report who has no Shareworks data (new hire) | Current equity column shows "—" or "0 RSUs"; other columns populated from Workday; equity recommendation still editable |
| TC-11 | Manager clears all filters after filtering by level and zone | Full grid restored; filter indicators removed; summary cards show full team metrics |

---

## Assumptions

| # | Assumption |
|---|---|
| A1 | The manager's reporting hierarchy (who reports to whom) is available from Workday and maintained in the Thrive data model. |
| A2 | A manager sees only their direct reports — not skip-level reports or dotted-line reports. |
| A3 | Only one compensation cycle can be active at a time for a given population. If multiple cycles exist, the Team Planner shows the one that includes the manager's direct reports. |
| A4 | Salary band data (min, mid, max per level and zone) is configured during cycle setup (Cycle Builder step 5) and is available for % of SRP calculations. |
| A5 | Share price for equity valuation uses the same default from Milestone 1 ($80) unless overridden in cycle configuration. |
| A6 | Draft recommendations are persisted server-side (not browser local storage) and are scoped to the manager + cycle combination. |
| A7 | Column permissions configured in Cycle Builder step 7 determine which columns are visible for the manager role. The Team Planner respects these permissions. |
| A8 | Eligibility rules configured in Cycle Builder step 3 determine which of the manager's direct reports appear in the grid. Excluded employees are not shown. |
| A9 | The "Recall" action is available only while the cycle status is "Open". Once the cycle is closed by the Comp Admin, submissions are final. |
| A10 | Workday and Shareworks sync timestamps and behavior are the same as Milestone 1 — timestamps represent the time data was last pulled from the source system. |
| A11 | Employee Name column is pinned by default on initial load. Manager's pinning preferences are not persisted across sessions (reset on page load). |

---

## Open Questions and Clarifications Needed

| # | Question | Options / Context |
|---|---|---|
| OQ-1 | How should we handle managers who are also direct reports of another manager in the same cycle? Should the manager's own record appear in their manager's grid? | Standard practice is yes — the manager is an employee too. Confirming this is the expected behavior. |
| OQ-2 | Should the manager see a read-only view of their own compensation (as an employee) alongside the Team Planner, or are those completely separate views? | In many tools, the manager can toggle between "My Compensation" and "My Team". Confirming whether this toggle is in scope. |
| OQ-3 | What happens if the Comp Admin changes eligibility rules while a manager has a draft in progress? | **Option A:** Manager is notified and draft is recalculated against new parameters. **Option B:** Draft is preserved as-is; manager sees updated parameters on next page load but existing values are not changed. |
| OQ-4 | Should the equity recommendation column accept a dollar value (converted to units at current share price) or units only? | Dollar-based entry is more intuitive for managers; unit-based is more precise. |
| OQ-5 | Is there a minimum team size or reporting relationship requirement to access the Team Planner, or does any user with at least one direct report get manager access? | Need to confirm the threshold, if any. |
| OQ-6 | Should manager's column pinning preferences persist across sessions, or reset to defaults on each page load? | Persisting requires additional storage; resetting is simpler for initial release. |
