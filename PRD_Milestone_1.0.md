# PRD Milestone 1.0

## Thrive — Total Rewards View, RSU Modeling, Manager Team Grid & Data Integration

---

## Overview and Scope

Milestone 1 delivers the foundational Total Rewards experience in Thrive — a compensation planning tool built on the Atlassian Design System.

Every employee gets a personalized Total Rewards view showing their base salary, bonus target, and equity value in one place. Employee demographics, compensation history, and job data flow from Workday (via RaaS reports). Equity and RSU grant data flow from Shareworks. Authentication is through Okta SSO. All data displayed to the user is timestamped with when it was last synced from each source system, so employees and managers always know how current the information is.

Employees can also model their RSU value at different share prices using an interactive slider. Managers see a read-only grid of their direct and indirect (skip-level) reports' compensation data. Comp Admins and Data Integration Engineers configure API connections, field mappings, and monitor sync health.

### In Scope

- **Total Rewards View** (Employee): Personalized compensation dashboard showing base salary (Workday), bonus target (Workday), and equity value (Shareworks). Each data source displays a "last synced" timestamp.
- **RSU Modeling** (Employee): Interactive equity grant viewer with per-grant vesting schedules, vesting progress, and a share price modeling slider — all powered by Shareworks data.
- **Manager Team Grid** (Manager): Read-only, filterable, sortable grid of direct and indirect (skip-level) reports showing compensation, level, performance, and equity data sourced from Workday and Shareworks.
- **Permissions** (Admin): Read-only page displaying role-based access — Employees see their own data, Managers see their reports, Comp Admins see everything, Data Integration Engineers see Data Management only.
- **Data Ingestion** (Admin / Data Integration Engineer): Workday and Shareworks API credential configuration, connection testing, field mapping, sync status monitoring, error tracking, and sync history.
- **Okta SSO** (All): Authentication via Okta OIDC/SAML; user identity resolved to `Worker_ID` for data scoping.

### Out of Scope (This Milestone)

- Compensation cycle creation, approval workflows, and cycle execution (Milestone 2).
- Inline editing of compensation fields in the Manager grid (Milestone 2).
- Merit matrix and salary band management (Milestone 2).
- Notifications and Rovo AI assistant integration (Milestone 3).
- Audit logging and SOX compliance reporting (Milestone 3).

---

## Personas, Jobs to Be Done

### Employee

An individual contributor who wants to understand their total compensation — base salary, bonus target, and equity — in one personalized view, with confidence that the data is current.

| Job to Be Done |
|---|
| See my annualized base salary, bonus target, and total equity value on a single dashboard |
| View all my RSU grants with vesting schedules, progress, and projected future vesting |
| Model my equity value at different share prices to understand upside/downside |
| Know when my compensation data was last synced from Workday and when my equity data was last synced from Shareworks |
| Verify my displayed data matches what I expect from my offer letter and grant agreements |

### Manager

A people manager who needs visibility into their direct and indirect reports' compensation data to prepare for planning cycles and identify risks.

| Job to Be Done |
|---|
| See a read-only grid of all my reports (direct and skip-level) with current salary, SRP %, equity, performance, and level |
| Filter, sort, and search the grid to focus on specific employees or risk areas |
| Identify employees below SRP, approaching salary band limits, or with equity vesting cliffs |

### Comp Admin

A compensation team member who manages system configuration, data integrity, and access control across the organization.

| Job to Be Done |
|---|
| View the role-based access model showing what each persona can see |
| Monitor Workday and Shareworks sync status, review errors, and verify data freshness |
| Manage data source connections, field mappings, and data quality |

### Data Integration Engineer

A technical administrator with Workday Admin and Shareworks Admin access who configures and maintains the API integrations that feed data into Thrive.

| Job to Be Done |
|---|
| Configure Workday and Shareworks API credentials, test connections, and verify authentication |
| Map source system fields to Thrive's internal schema with appropriate data transforms |
| Monitor sync history, error logs, and resolve data quality issues |

---

## Users and Functional Requirements

### Employee — Total Rewards View

| # | Requirement | Priority |
|---|---|---|
| E-1 | As an employee, I can see my annualized base salary on the Total Rewards dashboard. Source: Workday `Annual_Base_Pay` from `CRINT Pave Employee Compensation Records`. | P0 |
| E-2 | As an employee, I can see my bonus target percentage and calculated bonus dollar amount. Source: Workday `Bonus_Plan_Percent`; calculated as `Annual_Base_Pay × Bonus_Plan_Percent`. | P0 |
| E-3 | As an employee, I can see my total equity value (vested + unvested) in dollars. Source: Shareworks `Total_Shares_Granted × Current_FMV`. | P0 |
| E-4 | As an employee, I can see my total annual compensation (base + bonus + equity) as a single headline number and as a donut chart showing the proportional breakdown. | P0 |
| E-5 | As an employee, I can see a bar chart of my year-over-year RSU value (historical and projected future years). | P1 |
| E-6 | As an employee, I can see my vested vs. unvested equity split in both dollars and units. | P0 |
| E-7 | As an employee, I can see my Job Role and Job Level displayed on the Total Rewards page. Source: Workday `Business_Title` and `Job_Profile_Level`. | P0 |
| E-8 | As an employee, I can see the timestamp of when my compensation data was last synced from Workday. | P0 |
| E-9 | As an employee, I can see the timestamp of when my equity data was last synced from Shareworks. | P0 |
| E-10 | As an employee, I can see a note indicating that FX rates are updated daily and the default share price used for equity calculations. | P1 |
| E-11 | As an employee, if my Shareworks data is unavailable (e.g., new hire with no grants), I see an error message: "Equity data is currently unavailable. Please contact your administrator." The equity section is not hidden and does not show $0. | P0 |
| E-12 | As an employee, I am authenticated via Okta SSO before accessing any Thrive data. My identity is resolved to a `Worker_ID` which scopes all queries to my records only. | P0 |

### Employee — RSU Modeling

| # | Requirement | Priority |
|---|---|---|
| R-1 | As an employee, I can see all my equity grants listed with grant date, total units, vested units, vested value, total value, and vesting progress percentage. Source: Shareworks. | P0 |
| R-2 | As an employee, I can select any individual grant and see its detailed quarterly vesting schedule displayed as a timeline (16 quarters over 4 years). | P0 |
| R-3 | As an employee, I can see a cumulative vesting chart (stacked area) showing vested vs. unvested units over time for the selected grant. | P1 |
| R-4 | As an employee, I can model my equity value at different share prices using an interactive slider ($20–$200). Total compensation, vested value, and unvested value update in real-time as the slider moves. | P1 |
| R-5 | As an employee, I can see vesting progress per grant displayed as a progress bar with a percentage label. | P1 |
| R-6 | As an employee, I can see the grant date and vesting start date for each grant. | P0 |

### Manager — Team Grid

| # | Requirement | Priority |
|---|---|---|
| M-1 | As a manager, I can see a read-only grid of my direct and indirect (skip-level) reports. Columns: Name (with initials avatar), Start Date, Eligibility Date, Job Level, Job Family, Zone, Current Base Salary, % of SRP, Current Equity (RSUs), FY24 H2 Rating. Source: Workday (demographics, salary, level, performance) and Shareworks (equity). | P0 |
| M-2 | As a manager, I can search the grid by employee name or job family. Search is case-insensitive and updates the grid in real-time. | P0 |
| M-3 | As a manager, I can sort the grid by any column by clicking the column header (toggles ASC/DESC). Default sort: Name ascending. | P0 |
| M-4 | As a manager, I can filter the grid using a Filters button (supports filtering by level, performance rating, zone, etc.). | P0 |
| M-5 | As a manager, I can export the grid data using an Export button. | P1 |
| M-6 | As a manager, I can see % of SRP for each employee. Values below 100% are displayed in red; values at or above 100% are displayed in green. SRP is calculated as `Current_Salary / SRP_Minimum × 100`. | P0 |
| M-7 | As a manager, I can see Job Level color-coded: green lozenge for Manager levels ("M" prefix), blue lozenge for Individual Contributor levels ("P" prefix). | P1 |
| M-8 | As a manager, terminated employees are excluded from my grid entirely. | P0 |
| M-9 | As a manager, the grid is paginated at 10 rows per page. | P1 |
| M-10 | As a manager, the grid is entirely read-only in Milestone 1 — no inline editing of any fields. | P0 |
| M-11 | As a manager, I can see summary cards at the top showing Equity Allocated and Equity Spent for my team. | P1 |

### Admin — Permissions

| # | Requirement | Priority |
|---|---|---|
| A-1 | Employees can view their own compensation data (Total Rewards and RSUs). They cannot access Team Overview, Data Management, or Permissions. | P0 |
| A-2 | Managers can view their own data plus their direct and indirect reports' data in Team Overview. They cannot access Data Management or Permissions. | P0 |
| A-3 | Comp Admins have full access to all areas: all employee data, Data Management, and the Permissions page. | P0 |
| A-4 | Data Integration Engineers have access to Data Management only. They cannot access Total Rewards, RSUs, Team Overview, or Permissions. | P0 |
| A-5 | The Permissions page displays a read-only summary of the four roles and what each role can access. It is not a configuration tool. | P0 |
| A-6 | Users with multiple roles can use the persona switcher to toggle between their assigned views. Server-side role enforcement ensures users can only switch to roles they hold. | P0 |

### Data Ingestion

| # | Requirement | Priority |
|---|---|---|
| D-1 | As a data integration engineer, I can configure Workday API credentials (Client ID, Endpoint URL, API Key, Tenant ID) and test the connection. Success shows a green banner with latency; failure shows a red banner with an error message. | P0 |
| D-2 | As a data integration engineer, I can configure Shareworks API credentials and test the connection with the same success/failure feedback. | P0 |
| D-3 | As a data integration engineer, I can map Workday source fields to Thrive fields, specifying data type and transform for each mapping. | P0 |
| D-4 | As a data integration engineer, I can view sync status for each integration: last sync timestamp, total records synced, and records failed. | P0 |
| D-5 | As a data integration engineer, I can view and filter error logs by source system, severity, and resolution status. | P0 |
| D-6 | As a data integration engineer, I can trigger a manual sync for any data source. | P1 |
| D-7 | As a data integration engineer, I can view full sync history with search and filtering by source, status, and date range. | P1 |

---

## User Stories and Functional Requirements

### Employee: View My Total Rewards

**As an employee, I want to see my personalized total compensation on a single dashboard so I understand the full value of my package.**

- The dashboard shows three compensation components: Base Salary (annualized, from Workday), Bonus/Commission Target (from Workday), and RSU Equity Value (from Shareworks).
- A donut chart shows the proportional breakdown of base, bonus, and equity.
- Total annual compensation is displayed as a single headline number (sum of all three components).
- Job Role (e.g., "Senior Engineer") and Job Level (e.g., "P50") are shown, sourced from Workday `Business_Title` and `Job_Profile_Level`.
- A "last synced from Workday" timestamp is displayed near the salary/bonus data.
- A "last synced from Shareworks" timestamp is displayed near the equity data.
- A note indicates that FX rates are updated daily and states the default share price used for equity calculations.
- If Shareworks data is unavailable for the employee, the equity section shows an error message rather than $0 values or hiding the section entirely.

### Employee: Model My RSU Value

**As an employee, I want to model my equity at different share prices so I can understand the potential value of my grants.**

- A share price slider (range: $20–$200) allows the employee to adjust the modeled share price.
- The default share price is today's closing price (e.g., $79.43).
- Moving the slider dynamically updates: total equity value, vested value, unvested value, and the donut chart proportions.
- The RSU tab shows a list of all grants, each displayed as a card with: grant date, total units, vested units, vested value, total value, and a vesting progress bar.
- Selecting a grant shows its detailed quarterly vesting schedule as a line chart (vested units over time vs. total units) and a stacked area chart (vested vs. unvested units).
- The vesting schedule covers 16 quarters (4 years) starting from the vesting start date.

### Employee: Know When My Data Was Last Updated

**As an employee, I want to see timestamps showing when my compensation and equity data were last synced so I know how current the numbers are.**

- The Total Rewards page shows "Last synced from Workday: [timestamp]" for salary, bonus, and job data.
- The Total Rewards page shows "Last synced from Shareworks: [timestamp]" for equity data.
- Timestamps are displayed per-source so the employee can see freshness of each system independently.
- If a sync is stale (>24 hours since last sync), a warning indicator is shown next to the timestamp.

### Manager: Review My Team's Compensation

**As a manager, I want to see my team's compensation data in a read-only grid so I can prepare for planning and identify risks.**

- The grid shows all direct and indirect (skip-level) reports. Terminated employees are excluded.
- Columns: Name (with initials avatar), Start Date, Eligibility Date, Job Level, Job Family, Zone, Current Base Salary, % of SRP, Current Equity (RSUs), FY24 H2 Rating.
- A search field filters by employee name or job family (case-insensitive, real-time update).
- All columns are sortable via column header click (toggle ASC/DESC). Default sort: Name ascending.
- % of SRP: values below 100% displayed in red, values at or above 100% displayed in green.
- Job Level: green lozenge for Manager ("M") levels, blue lozenge for IC ("P") levels.
- FY24 H2 Rating: displayed as an ADS Lozenge with appearance mapped to rating value.
- Grid is paginated at 10 rows per page.
- Summary cards above the grid show Equity Allocated and Equity Spent.
- All fields are read-only. No inline editing in Milestone 1.

### Data Integration Engineer: Configure and Monitor Integrations

**As a data integration engineer, I want to configure Workday and Shareworks API connections and monitor sync health so the data in Thrive stays current and accurate.**

- **Connections & API Setup:** Enter API credentials, click "Test Connection" (shows success banner with latency or failure banner with error message), and save credentials (stored encrypted).
- **Field Mapping:** View and adjust source-to-Thrive field mappings with data type and transform columns for each mapping row.
- **Errors & Alerts:** View error logs filterable by source system, severity level, and resolution status.
- **Sync History:** Searchable log of all sync runs showing timestamp, source, table, status, records synced, records failed, and duration.

### Admin: View Permissions

**As a comp admin, I want to see the access model so I can verify that each role has the correct level of access.**

- Permissions page shows four role cards: Employee, Manager, Comp Admin, Data Integration Engineer.
- Each card lists which areas of Thrive the role can access (Total Rewards, RSUs, Team Overview, Data Management, Permissions).
- The page is read-only — it displays the access model, not a configuration tool.

---

## Non-Functional Requirements

### Security & Compliance

| Requirement | Detail |
|---|---|
| SSO Authentication | Okta OIDC/SAML; no local username/password authentication |
| Session Management | JWT with 8-hour expiry; refresh token rotation |
| API Credential Storage | Workday and Shareworks API keys stored encrypted at rest (AES-256) |
| Access Control | Role-based (Employee, Manager, Comp Admin, Data Integration Engineer); enforced server-side on every request |
| Data Retention | Compensation history retained per company policy (minimum 7 years) |
| Transport Security | TLS 1.2+ for all API calls to Workday and Shareworks |

### Privacy & Data Handling

| Requirement | Detail |
|---|---|
| PII Fields | Name, email, salary, bonus, equity values are PII; encrypted at rest |
| DEI Fields | Not included in Milestone 1; if added later, restricted to Admin only with masking |
| Who Can See What | Employee: own data only. Manager: own + direct/indirect reports. Comp Admin: all. Data Integration Engineer: sync metadata only (no individual compensation values visible in Data Management) |
| Salary Masking | In Manager grid, salary values visible only for employees in the manager's org tree; no cross-team visibility |

### Accessibility & Localization

| Requirement | Detail |
|---|---|
| WCAG Level | AA compliance (ADS components provide this foundation) |
| Keyboard Navigation | Full keyboard support for grid navigation, tabs, sliders, and modals |
| Screen Reader | ARIA labels on all interactive elements; ADS components handle this by default |
| Currencies | USD as default; currency field from Workday determines display format |
| Number Formatting | Locale-aware formatting for salary and equity values (e.g., `$198,800.00`) |

---

## Data Integrations

### Workday (HRIS) — Inbound

| Property | Detail |
|---|---|
| System | Workday RaaS (Report as a Service) |
| Data flowing in | Employee demographics, compensation history, job data (title, level, department), performance ratings, org hierarchy (manager references) |
| Direction | Workday → Thrive (read-only) |
| Frequency | Batch; daily sync (configurable, default 3:45 PM); manual sync available on demand |
| Authentication | OAuth 2.0 (Client Credentials) |

**RaaS Reports consumed:**

| Report Name | Data Source | What It Provides | Selection Criteria |
|---|---|---|---|
| CRINT Pave Employee Compensation Records | All Active and Terminated Workers | Demographics, salary, level, performance, manager hierarchy | Active and eligible employees; excludes intern/casual employee types |
| CRINT Pave-Compensation History | Compensation Changes | Salary and bonus change history | Active employees; 2-year lookback; salary and bonus change events |
| CRINT Pave-Employee Eligible Earnings | All Eligible Earnings Overrides | Bonus plan details and eligible earnings | Active employees; current eligible earnings override period |

**Field mapping (CRINT Pave Employee Compensation Records):**

| Source Field (Workday) | Thrive Field | Data Type | Required | Transform |
|---|---|---|---|---|
| Worker_ID | employeeWkRef | String | Yes | — |
| Legal_First_Name | firstName | String | Yes | — |
| Legal_Last_Name | lastName | String | Yes | — |
| Email_Address | email | String | Yes | — |
| Business_Title | title | String | No | — |
| Job_Profile_Level | level | String | Yes | mapToP-Level (P20, P30, P40, P50, P60, M50, M60) |
| Supervisory_Organization | department | String | No | — |
| Primary_Work_Address | location | String | No | — |
| Manager_Reference | managerId | Reference | No | — |
| Hire_Date | hireDate | Date | Yes | ISO8601 |
| Annual_Base_Pay | currentSalary | Currency | Yes | toCents |
| Bonus_Plan_Percent | bonusTarget | Decimal | No | — |
| Review_Rating | performanceRating | String | No | — |
| Employee_Type | employeeType | String | Yes | filterInternCasual |
| Worker_Status | status | String | Yes | — |

### Shareworks (Equity Management) — Inbound

| Property | Detail |
|---|---|
| System | Shareworks REST API |
| Data flowing in | Equity grants, vesting schedules, vested/unvested units, current FMV, award types |
| Direction | Shareworks → Thrive (read-only) |
| Frequency | Batch; daily sync (configurable, default 3:42 PM); manual sync available on demand |
| Authentication | To be confirmed (see Open Questions) |

**Field mapping:**

| Source Field (Shareworks) | Thrive Field | Data Type | Required | Transform |
|---|---|---|---|---|
| Participant_ID | employeeId | String | Yes | — |
| Grant_Date | grantDate | Date | Yes | ISO8601 |
| Award_Type | grantType | Enum | Yes | mapAwardType (RSU, ISO, NSO) |
| Total_Shares_Granted | totalUnits | Integer | Yes | — |
| Shares_Vested | vestedUnits | Integer | Yes | — |
| Vesting_Schedule_Type | vestingSchedule | String | No | — |
| Grant_Price_USD | grantPrice | Currency | Yes | — |
| Current_FMV | currentPrice | Currency | No | — |

### Okta (Identity Provider) — Inbound

| Property | Detail |
|---|---|
| System | Okta OIDC/SAML |
| Data flowing in | User identity, authentication tokens, role claims |
| Direction | Okta → Thrive (authentication) |
| Frequency | Real-time (on login and token refresh) |
| Authentication | OIDC/SAML |

---

## Key User Flows

### Flow 1: Employee Views Total Rewards

1. Employee navigates to Thrive → redirected to Okta SSO login.
2. Okta authenticates the user → returns JWT with identity claims.
3. Thrive resolves `Worker_ID` from Okta profile → fetches compensation data from Workday sync cache.
4. Thrive fetches equity data from Shareworks sync cache (joined on `Worker_ID` ↔ `Participant_ID`).
5. Total Rewards page renders:
   - Headline: Total Annual Compensation (single number).
   - Donut chart: Base Salary, Bonus Target, RSU Equity value as proportional segments.
   - Three detail sections: Base Salary (annualized), Bonus/Commission Target, RSU value.
   - Job metadata: Role and Level from Workday.
   - Sync timestamps: "Last synced from Workday: [timestamp]" and "Last synced from Shareworks: [timestamp]".
6. If Shareworks data is unavailable → equity section shows: "Equity data is currently unavailable. Please contact your administrator." (not $0, not hidden).
7. Employee adjusts share price slider → equity value, total compensation, and donut chart update in real-time.
8. Employee navigates to RSUs tab → sees grant list with progress bars → selects a grant → sees vesting timeline and area charts.

**Error states:**
- Shareworks unavailable: Error message displayed in equity section.
- Workday data stale (>24 hours): Warning icon next to Workday sync timestamp.
- Shareworks data stale (>24 hours): Warning icon next to Shareworks sync timestamp.
- No Workday record found for user: "We couldn't find your compensation record. Please contact your administrator."

### Flow 2: Manager Reviews Team

1. Manager logs in via Okta SSO.
2. Thrive resolves `Worker_ID` → recursively queries all employees in the org tree below the manager (direct and indirect/skip-level). Terminated employees are excluded from the result set.
3. Team grid renders (read-only) with summary cards (Equity Allocated, Equity Spent) above the data grid.
4. Manager uses search to find specific employees by name or job family.
5. Manager clicks column headers to sort (toggle ASC/DESC/none).
6. Manager uses Filters button to narrow results by level, performance rating, zone, etc.
7. Grid paginates at 10 rows per page.

**Grid interaction details:**
- Search: Case-insensitive, real-time filtering by name or job family.
- Sort: Click column header to cycle through ASC → DESC → none. Default: Name ascending.
- % of SRP: Calculated as `Current_Salary / SRP_Minimum × 100`. Red below 100%, green at/above 100%.
- Job Level: Green lozenge for M-levels, blue lozenge for P-levels.
- FY24 H2 Rating: ADS Lozenge with appearance mapped to rating value.
- Terminated employees: Excluded entirely from the grid; visible in Admin data management views only.
- Read-only: No inline editing. All compensation planning edits deferred to Milestone 2.

### Flow 3: Data Integration Engineer Configures Workday

1. Engineer navigates to Data Management (Data Integration persona).
2. Selects Workday source card → opens Connections & API Setup.
3. Enters Client ID, Endpoint URL, API Key, Tenant ID.
4. Clicks "Test Connection" → Thrive makes an authenticated request to the Workday RaaS endpoint.
5. Success: green banner with latency (e.g., "Connected in 340ms"). Failure: red banner with specific error message.
6. Clicks "Save" → credentials stored encrypted (AES-256).
7. Navigates to Field Mapping → reviews/adjusts source-to-Thrive field mappings.
8. Navigates to Sync History → verifies last successful sync timestamp and record counts.
9. If errors exist, navigates to Errors tab → reviews error details, marks items resolved.

**Error states:**
- Connection timeout: "Unable to reach Workday API. Check endpoint URL and network connectivity."
- Auth failure: "Invalid credentials. Verify Client ID and API Key in Workday Admin."
- Rate limit: "API rate limit exceeded. Wait 60 seconds before retrying."
- Missing required field: "3 records skipped — missing required Manager_Reference field."

### Flow 4: Admin Reviews Permissions

1. Comp Admin logs in via Okta SSO.
2. Navigates to Permissions page from the side nav.
3. Sees four role cards (Employee, Manager, Comp Admin, Data Integration Engineer) with a summary of which areas each role can access.
4. Permissions page is read-only — it displays the access model, not a configuration tool.
5. Users with multiple roles use the persona switcher in the top nav to toggle between their assigned views. Server-side enforcement prevents switching to unauthorized roles.

---

## Assumptions

| # | Assumption |
|---|---|
| A1 | Okta is the sole identity provider; all Thrive users have an Okta account with a `Worker_ID` claim or a resolvable attribute. |
| A2 | `Worker_ID` (Workday) and `Participant_ID` (Shareworks) can be reliably joined — either they are the same value or a mapping table exists. |
| A3 | The Workday RaaS reports (CRINT Pave) are already configured and accessible via the tenant's RaaS API endpoint. |
| A4 | Shareworks API is REST-based and supports per-participant grant and vesting queries. |
| A5 | SRP (Salary Reference Point) minimum values are pre-configured in Thrive's Salary Bands; they are not sourced from Workday in this milestone. |
| A6 | "Promotion" in the Manager grid is a boolean flag sourced from the Workday data import (not derived or manually set in Thrive). |
| A7 | Performance ratings map directly from Workday's `Review_Rating` field without additional transformation beyond lozenge appearance mapping. |
| A8 | Currency is USD for all employees in Milestone 1; multi-currency support is deferred to a later milestone. |
| A9 | Sync frequency is configurable per source but defaults to daily (3:45 PM for Workday, 3:42 PM for Shareworks). |
| A10 | The Data Integration Engineer role has Workday Admin and Shareworks Admin access externally, enabling them to generate API credentials for Thrive. |
| A11 | Managers see all direct and indirect (skip-level) reports — the full org tree below them, not just immediate directs. |
| A12 | Terminated employees are excluded from the Manager team grid entirely. They remain visible to Comp Admins in data management views. |
| A13 | All views and grids are read-only in Milestone 1. Inline editing of compensation fields is deferred to Milestone 2. |
| A14 | When Shareworks data is unavailable for an employee (e.g., new hire with no grants), the UI displays an error message rather than showing $0 or hiding the equity section. |
| A15 | The persona switcher is a production feature. Users may hold multiple roles (e.g., a Manager who is also a Comp Admin), and the switcher allows toggling between assigned views. Server-side role enforcement is required. |
| A16 | The default share price for RSU modeling is today's closing price. The slider range is $20–$200. |
| A17 | Sync timestamps are displayed per-source (Workday and Shareworks separately) so users know the freshness of each data source independently. |
| A18 | A sync is considered "stale" if it occurred more than 24 hours ago. |

---

## Open Questions and Clarifications Needed

| # | Question | Impact | Proposed Options |
|---|---|---|---|
| Q1 | **How is `Worker_ID` mapped to `Participant_ID` in Shareworks?** Are they the same value, or is there a separate mapping table? | Blocks equity data join for Employee and Manager views. | **Option A:** Same value (simplest, no mapping needed). **Option B:** Mapping table maintained in Shareworks. **Option C:** Thrive maintains a crosswalk table. |
| Q2 | **What Okta claims/attributes are available?** Does the Okta token include `Worker_ID` directly, or do we need a lookup after authentication? | Affects how we resolve the authenticated user to their Workday/Shareworks data. | **Option A:** Okta profile includes `Worker_ID` as a custom attribute. **Option B:** Okta provides email, and we look up `Worker_ID` from synced Workday data. |
| Q3 | **What is the Shareworks API authentication method?** OAuth 2.0, API Key, or certificate-based? | Affects API Setup configuration UI and credential storage requirements. | Need Shareworks Admin to confirm the supported auth method. |
| Q4 | **What does the sync timestamp represent?** The time data was pulled from the source system, or the time it was written to Thrive's database? | Affects what "last synced" means to the employee viewing their data. | **Option A:** Time data was fetched from the source (more meaningful to user). **Option B:** Time data was committed to Thrive DB (more technically accurate). **Recommendation:** Option A. |
| Q5 | **Should the "stale data" warning threshold be configurable?** Currently proposed as a fixed 24-hour threshold. | Affects whether this is a hard-coded value or an admin-configurable setting in Data Management. | **Option A:** Hard-coded at 24 hours (simpler, ships faster). **Option B:** Configurable per source in Data Management (more flexible but adds scope). |
| Q6 | **Where does the default share price come from?** Is it a live market feed, a daily batch from a provider, or manually entered by an admin? | Affects accuracy of RSU modeling and whether a third integration is needed. | **Option A:** Manually entered by Comp Admin (simplest). **Option B:** Daily batch from a market data API. **Option C:** Real-time market feed (adds significant complexity). |

---

## Evaluation Data Set

### Data Sources

| Source | Type | Purpose |
|---|---|---|
| Workday (CRINT Pave Employee Compensation Records) | Production RaaS | Employee demographics, salary, level, performance, org hierarchy |
| Workday (CRINT Pave-Compensation History) | Production RaaS | 2-year salary/bonus change history |
| Workday (CRINT Pave-Employee Eligible Earnings) | Production RaaS | Bonus plan details and eligible earnings |
| Shareworks (Equity Grants + Vesting Schedule) | Production API | RSU grants, vesting events, current FMV |
| Synthetic test records | Generated | Edge cases not covered by production data (e.g., no equity, fully vested, stale sync) |

### View-Specific Data Expectations

| View | What the User Sees | Key Validation |
|---|---|---|
| Employee Total Rewards | Own base salary, bonus %, equity value, total comp, per-source sync timestamps | Values match Workday + Shareworks source data exactly; timestamps reflect actual last sync per system |
| Employee Total Rewards (no equity) | Error message in equity section; salary and bonus still display | "Equity data is currently unavailable" message shown; base salary and bonus render correctly |
| Employee Total Rewards (stale sync) | Warning indicator next to the stale timestamp | Warning appears when sync is >24 hours old |
| Employee RSUs | Own grants only, vesting timeline, share price modeler | Modeled value updates when slider moves; vesting dates and units are correct |
| Employee RSUs (fully vested) | All grants at 100% progress; no future vesting events | Progress bar shows 100%; no upcoming vesting dates |
| Manager Team Grid | 4–8 direct + indirect reports with all columns populated | SRP % calculated correctly; filter by level works; sort by salary works |
| Manager Team Grid (edge) | Employee with no performance rating | Shows "—" or "New" in rating column; no error or crash |
| Manager Team Grid (terminated) | Terminated employee exists in Workday data | Not shown in Manager grid; only visible in Admin data management |
| Admin Data Management | All Workday + Shareworks integrations with sync status | Sync status shows correct record counts, timestamps; errors display for failed records |

### Example Test Cases

| # | Scenario | Expected Result |
|---|---|---|
| TC-1 | Employee at P40, Zone 1, with 2 RSU grants | Total Rewards shows correct base + bonus + equity sum; RSU tab shows 2 grants; both Workday and Shareworks sync timestamps visible |
| TC-2 | Employee with no Shareworks data (new hire, no grants) | Equity section shows error message; base salary and bonus display correctly from Workday |
| TC-3 | Employee adjusts share price slider from $79 to $150 | Equity value, total compensation, and donut chart update proportionally in real-time |
| TC-4 | Manager with 6 direct reports, filter by Level = P30 | Grid shows only P30 employees; count updates accordingly |
| TC-5 | Employee with SRP % = 95% (below 100%) | SRP % displayed in red text in Manager grid |
| TC-6 | Terminated employee exists in Workday data | Not visible in Manager grid; visible in Admin data management views |
| TC-7 | Intern employee in Workday data | Excluded from all views; not synced to Thrive |
| TC-8 | Shareworks grant with all shares vested | Vesting progress shows 100%; no future vesting events on timeline |
| TC-9 | Workday sync completed 2 hours ago | Timestamp shows recent sync time; no stale warning indicator |
| TC-10 | Workday sync completed 30 hours ago | Stale warning indicator displayed next to the Workday sync timestamp |
| TC-11 | Shareworks sync completed 26 hours ago | Stale warning indicator displayed next to the Shareworks sync timestamp |
| TC-12 | Employee with multiple roles switches from Employee to Manager view via persona switcher | Manager grid shows only their direct and indirect reports; employee data no longer visible |
| TC-13 | Data Integration Engineer tests Workday connection with invalid credentials | Red banner with message: "Invalid credentials. Verify Client ID and API Key in Workday Admin." |
