# Thrive — Milestone 1 PRD
## Total Rewards View, RSU Modeling, Manager Team Grid & Data Integration

---

## 1. Overview and Scope

Milestone 1 delivers the foundational Total Rewards experience in Thrive — a Pave replacement compensation planning tool built on the Atlassian Design System.

Every employee gets a personalized Total Rewards view showing their base salary, bonus target, and equity value — all in one place. Employee and compensation history data flows from Workday (via RaaS reports), and equity/RSU data flows from Shareworks. Authentication is through Okta SSO. All data is timestamped so employees and managers know exactly when information was last synced from each source system.

Employees can also model their RSU value at different share prices. Managers see a read-only grid of their team's compensation. Admins and Data Integration Engineers configure the connections, field mappings, and monitor sync health.

### In Scope

- **Total Rewards View** (Employee): Personalized compensation summary showing base salary (Workday), bonus target (Workday), and equity value (Shareworks) with sync timestamps for each data source.
- **RSU Modeling** (Employee): Interactive equity grant viewer with vesting schedules and share price modeling, powered by Shareworks data.
- **Manager Team Grid** (Manager): Read-only, filterable, sortable grid of direct and indirect (skip-level) reports with compensation, level, performance, and equity data.
- **Permissions** (Admin): Simple role-based access — Employees see their own data, Managers see their reports, Admins see everything, Data Integration Engineers see Data Management only.
- **Data Ingestion** (Admin / Data Integration Engineer): Workday and Shareworks API configuration, field mapping, sync monitoring, error tracking, and sync history.
- **Okta SSO** (All): Authentication via Okta; user identity resolved to Worker_ID for data scoping.

### Out of Scope (This Milestone)

- Compensation cycle creation, approval workflows, and cycle execution (Milestone 2).
- Inline editing of compensation fields in the Manager grid (Milestone 2).
- Merit matrix and salary band management (Milestone 2).
- Notifications and Rovo AI assistant integration (Milestone 3).
- Audit logging and SOX compliance reporting (Milestone 3).

---

## 2. Personas and Jobs to Be Done

### Employee

An individual contributor who wants to understand their total compensation — base salary, bonus target, and equity — in one place, personalized to them.

| Job to Be Done | Detail |
|---|---|
| Understand my total rewards | See my annualized base salary, bonus target %, and total equity value on a single dashboard |
| Track my RSU vesting | View all equity grants, vesting schedules, projected future vesting amounts, and model different share price scenarios |
| Know when my data was last updated | See timestamps showing when compensation data was last synced from Workday and Shareworks |
| Verify my data is accurate | Confirm that the values shown match what I expect from my offer letter and grant agreements |

### Manager

A people manager who needs visibility into their direct and indirect reports' compensation data to prepare for planning cycles and identify risks.

| Job to Be Done | Detail |
|---|---|
| Review my team's compensation | See a read-only grid of direct and indirect (skip-level) reports with current salary, SRP %, equity, performance ratings, and job levels |
| Prepare for comp planning | Filter, sort, and pin employees in the grid to focus on specific cases (e.g., under-SRP, high performers, promotion candidates) |
| Identify compensation risks | Quickly spot employees below SRP, approaching band limits, or with equity cliffs |

### Comp Admin

A compensation team member who manages system configuration, data integrity, and access control across the organization.

| Job to Be Done | Detail |
|---|---|
| Control who sees what | View the role-based access model (Employee, Manager, Admin, Data Integration Engineer) |
| Ensure data freshness | Monitor Workday and Shareworks sync status, review errors, and trigger manual syncs |
| Manage data sources | Configure API connections, map fields between source systems and Thrive, and validate data quality |

### Data Integration Engineer

A technical admin with Workday Admin and Shareworks Admin access who configures and maintains the API integrations.

| Job to Be Done | Detail |
|---|---|
| Connect to Workday & Shareworks APIs | Enter API credentials, test connections, and verify latency/authentication |
| Map source fields to Thrive fields | Map Workday RaaS report fields and Shareworks fields to Thrive's internal schema with transforms |
| Monitor integration health | View sync history, error logs, and resolve data quality issues |

---

## 3. Users and Functional Requirements

### 3.1 Employee — Total Rewards View

| # | Requirement | Priority |
|---|---|---|
| E-1 | As an employee, I can see my annualized base salary on the Total Rewards dashboard. Source: Workday `CRINT Pave Employee Compensation Records` → `Annual_Base_Pay`. | P0 |
| E-2 | As an employee, I can see my bonus target percentage and calculated bonus amount. Source: Workday `Bonus_Plan_Percent`; amount = `Annual_Base_Pay × Bonus_Plan_Percent`. | P0 |
| E-3 | As an employee, I can see my total equity value (vested + unvested) in dollars. Source: Shareworks → `Total_Shares_Granted × Current_FMV`. | P0 |
| E-4 | As an employee, I can see my total annual compensation (base + bonus + equity) as a single number and as a donut chart breakdown. | P0 |
| E-5 | As an employee, I can see a bar chart of my year-over-year RSU value (past years + projected future years). | P1 |
| E-6 | As an employee, I can see my vested vs. unvested equity split (in both dollars and units). | P0 |
| E-7 | As an employee, I can see my Job Role and Job Level (e.g., "Senior Engineer", "P50") on the Total Rewards page. Source: Workday `Business_Title` and `Job_Profile_Level`. | P0 |
| E-8 | As an employee, I can see the timestamp of when my compensation data was last synced from Workday. | P0 |
| E-9 | As an employee, I can see the timestamp of when my equity data was last synced from Shareworks. | P0 |
| E-10 | As an employee, I can see a note that FX rates are updated daily and the default share price used for equity calculations. | P1 |
| E-11 | As an employee, if my Shareworks data is unavailable (e.g., new hire with no grants), I see an error message: "Equity data is currently unavailable. Please contact your administrator." The section is not hidden and does not show $0. | P0 |
| E-12 | As an employee, I am authenticated via Okta SSO before accessing Thrive. My identity is resolved to a `Worker_ID` which scopes all data to my records only. | P0 |

### 3.2 Employee — RSU Modeling

| # | Requirement | Priority |
|---|---|---|
| R-1 | As an employee, I can see all my equity grants with grant date, total units, vested units, vested value, total value, and vesting progress %. Source: Shareworks. | P0 |
| R-2 | As an employee, I can select any individual grant and see its detailed vesting schedule timeline (quarterly vesting over 4 years). | P0 |
| R-3 | As an employee, I can see a cumulative vesting chart (stacked area) showing vested vs. unvested units over time for the selected grant. | P1 |
| R-4 | As an employee, I can model my equity value at different share prices using an interactive slider ($20–$200). The total compensation, vested value, and unvested value update in real-time as I move the slider. | P1 |
| R-5 | As an employee, I can see vesting progress percentage per grant displayed as a progress bar. | P1 |
| R-6 | As an employee, I can see the grant date and vesting start date for each grant. | P0 |

### 3.3 Manager — Team Grid

| # | Requirement | Priority |
|---|---|---|
| M-1 | As a manager, I can see a read-only grid of my direct and indirect (skip-level) reports. Columns: Name (with initials avatar), Start Date, Eligibility Date, Job Level, Job Family, Zone, Current Base Salary, % of SRP, Current Equity (RSUs), FY24 H2 Rating. All data sourced from Workday and Shareworks. | P0 |
| M-2 | As a manager, I can search the grid by employee name or job family. | P0 |
| M-3 | As a manager, I can sort the grid by any column in ascending or descending order. Default sort: Name ascending. | P0 |
| M-4 | As a manager, I can filter the grid using a Filters button (by level, performance rating, zone, etc.). | P0 |
| M-5 | As a manager, I can export the grid data. | P1 |
| M-6 | As a manager, I can see % of SRP for each employee. Values below 100% are displayed in red; values at or above 100% are displayed in green. SRP is calculated as `Current_Salary / SRP_Minimum × 100`. | P0 |
| M-7 | As a manager, I can see Job Level color-coded: green for Managers ("M" prefix), blue for Individual Contributors ("P" prefix). | P1 |
| M-8 | As a manager, terminated employees are excluded from my grid entirely. | P0 |
| M-9 | As a manager, the grid is paginated (10 rows per page). | P1 |
| M-10 | As a manager, the grid is entirely read-only in Milestone 1 — no inline editing of any fields. | P0 |
| M-11 | As a manager, I can see summary cards showing Equity Allocated and Equity Spent for my team. | P1 |

### 3.4 Admin — Permissions

| # | Requirement | Priority |
|---|---|---|
| A-1 | Employees can view their own compensation data (Total Rewards and RSUs). They have no access to Team Overview, Data Management, or Permissions. | P0 |
| A-2 | Managers can view their own data (Total Rewards and RSUs) and their direct and indirect reports' data in Team Overview. They have no access to Data Management or Permissions. | P0 |
| A-3 | Comp Admins have full access to all areas: all employee data, Data Management, and the Permissions table. | P0 |
| A-4 | Data Integration Engineers have access to Data Management only. They have no access to Total Rewards, RSUs, Team Overview, or Permissions. | P0 |
| A-5 | The Permissions page displays a read-only summary of the four roles and what each role can access. | P0 |
| A-6 | Users with multiple roles can use the persona switcher in production to toggle between their assigned views. Server-side role enforcement is required. | P0 |

### 3.5 Data Ingestion

| # | Requirement | Priority |
|---|---|---|
| D-1 | As a data integration engineer, I can configure Workday API credentials (Client ID, Endpoint URL, API Key, Tenant ID) and test the connection. | P0 |
| D-2 | As a data integration engineer, I can configure Shareworks API credentials and test the connection. | P0 |
| D-3 | As a data integration engineer, I can map Workday source fields to Thrive fields with data type transforms. | P0 |
| D-4 | As a data integration engineer, I can view sync status (last timestamp, records synced, records failed) for each integration. | P0 |
| D-5 | As a data integration engineer, I can view and filter error logs by source, severity, and resolution status. | P0 |
| D-6 | As a data integration engineer, I can trigger a manual sync for any data source. | P1 |
| D-7 | As a data integration engineer, I can view full sync history with search and filtering. | P1 |

---

## 4. User Stories and Functional Requirements

### Employee: View My Total Rewards

**As an employee, I want to see my personalized total compensation on a single dashboard so I understand the full value of my package.**

- The dashboard shows three compensation components: Base Salary (annualized, from Workday), Bonus/Commission Target (from Workday), and RSU Equity Value (from Shareworks).
- A donut chart shows the proportional breakdown of base, bonus, and equity.
- Total annual compensation is displayed as a single headline number (sum of all three).
- Job Role (e.g., "Senior Engineer") and Job Level (e.g., "P50") are shown, sourced from Workday `Business_Title` and `Job_Profile_Level`.
- A "last synced" timestamp is displayed for Workday data and separately for Shareworks data, so the employee knows how current the numbers are.
- A note indicates that FX rates are updated daily and states the default share price used.
- If Shareworks data is unavailable, the equity section shows an error message rather than $0 or hiding.

### Employee: Model My RSU Value

**As an employee, I want to model my equity at different share prices so I can understand the potential value of my grants.**

- A share price slider (range: $20–$200) allows the employee to adjust the modeled price.
- The default share price is today's closing price (currently $79.43).
- Moving the slider dynamically updates: total equity value, vested value, unvested value, and the donut chart proportions.
- The RSU tab shows a list of all grants, each with: grant date, total units, vested units, vested value, total value, vesting progress %.
- Selecting a grant shows its detailed vesting schedule as a line chart (vested units over time) and a stacked area chart (vested vs. unvested).
- Quarterly vesting is shown over a 4-year schedule starting from the vesting start date.

### Employee: Know When My Data Was Last Updated

**As an employee, I want to see timestamps on my compensation and equity data so I know it is current.**

- The Total Rewards page shows "Last synced from Workday: [timestamp]" for salary/bonus data.
- The Total Rewards page shows "Last synced from Shareworks: [timestamp]" for equity data.
- Timestamps use the format "MM/DD/YY HH:MM AM/PM [timezone]".
- If a sync is stale (>24 hours old), a warning indicator is shown next to the timestamp.

### Manager: Review My Team

**As a manager, I want to see my team's compensation data in a grid so I can prepare for planning and identify risks.**

- The grid shows all direct and indirect (skip-level) reports. Terminated employees are excluded.
- Columns: Name (with initials avatar), Start Date, Eligibility Date, Job Level, Job Family, Zone, Current Base Salary, % of SRP, Current Equity (RSUs), FY24 H2 Rating.
- Search filters by employee name or job family (case-insensitive, real-time).
- All columns are sortable (click header to toggle ASC/DESC). Default: Name ascending.
- % of SRP: red if below 100%, green if at or above 100%.
- Job Level: green lozenge for "M" levels, blue for "P" levels.
- FY24 H2 Rating displayed as a Lozenge.
- Grid is paginated at 10 rows per page.
- All fields are read-only in Milestone 1.

### Data Integration Engineer: Configure and Monitor Integrations

**As a data integration engineer, I want to configure Workday and Shareworks connections and monitor sync health.**

- Connections & API Setup tab: enter credentials, test connection (shows success/failure banner with latency), save.
- Field Mapping tab: view and adjust source-to-Thrive field mappings with data type and transform columns.
- Errors & Alerts tab: view error logs filterable by source, severity, and resolution status.
- Sync History tab: searchable log of all sync runs with timestamp, source, table, status, records synced, and duration.

---

## 5. Non-Functional Requirements

### 5.1 Security & Compliance

| Requirement | Detail |
|---|---|
| SSO Authentication | Okta OIDC/SAML; no local username/password authentication |
| Session Management | JWT with 8-hour expiry; refresh token rotation |
| API Credential Storage | Workday and Shareworks API keys stored encrypted at rest (AES-256) |
| Access Control | Role-based (Employee, Manager, Admin, Data Integration Engineer); enforced server-side |
| Data Retention | Compensation history retained per company policy (minimum 7 years) |
| Transport Security | TLS 1.2+ for all API calls to Workday and Shareworks |

### 5.2 Privacy & Data Handling

| Requirement | Detail |
|---|---|
| PII Fields | Name, email, salary, bonus, equity values are PII; encrypted at rest |
| DEI Fields | Not included in Milestone 1; if added later, restricted to Admin only with masking |
| Who Can See What | Employee: own data only. Manager: own + direct/indirect reports. Admin: all. Data Integration: sync metadata only (no individual compensation values in Data Management) |
| Salary Masking | In Manager grid, salary values visible only for reports in their org tree; no cross-team visibility |

### 5.3 Accessibility & Localization

| Requirement | Detail |
|---|---|
| WCAG Level | AA compliance (via Atlassian Design System components) |
| Keyboard Navigation | Full keyboard support for grid, tabs, sliders, and modals |
| Screen Reader | ARIA labels on all interactive elements; ADS components provide this by default |
| Currencies | USD as default; currency field from Workday determines display |
| Number Formatting | Locale-aware formatting for salary values (e.g., `$198,800.00`) |

---

## 6. Data Integrations

### 6.1 Workday (HRIS) — Inbound to Thrive

| Property | Detail |
|---|---|
| System | Workday RaaS (Report as a Service) |
| Data flowing in | Employee demographics, compensation history, job data, performance ratings, org hierarchy |
| Direction | Workday → Thrive (read-only) |
| Frequency | Batch; daily sync (default 3:45 PM); manual sync available |
| Auth | OAuth 2.0 (Client Credentials) |

**Reports consumed:**

| Integration Name | Data Source | What It Provides | Selection Criteria |
|---|---|---|---|
| CRINT Pave Employee Compensation Records | All Active and Terminated Workers | Demographics, salary, level, performance, manager hierarchy | Active and eligible employees; no intern/casual types |
| CRINT Pave-Compensation History | Compensation Changes | Salary and bonus change history | Active employees; 2-year lookback; salary and bonus change events |
| CRINT Pave-Employee Eligible Earnings | All Eligible Earnings Overrides | Bonus plan details and eligible earnings | Active employees; current override period |

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

### 6.2 Shareworks (Equity Management) — Inbound to Thrive

| Property | Detail |
|---|---|
| System | Shareworks REST API |
| Data flowing in | Equity grants, vesting schedules, current FMV, award types |
| Direction | Shareworks → Thrive (read-only) |
| Frequency | Batch; daily sync (default 3:42 PM); manual sync available |
| Auth | To be confirmed (see Open Questions) |

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

### 6.3 Okta (Identity) — Inbound to Thrive

| Property | Detail |
|---|---|
| System | Okta OIDC/SAML |
| Data flowing in | User identity, authentication tokens, role claims |
| Direction | Okta → Thrive (authentication) |
| Frequency | Real-time (on login, token refresh) |
| Auth | OIDC/SAML |

---

## 7. Key User Flows

### Flow 1: Employee Views Total Rewards

1. Employee navigates to Thrive → redirected to Okta SSO login.
2. Okta authenticates the user → returns JWT with identity claims.
3. Thrive resolves `Worker_ID` from Okta profile → fetches compensation data from Workday sync cache.
4. Fetches equity data from Shareworks sync cache (joined on `Worker_ID` ↔ `Participant_ID`).
5. Total Rewards page renders:
   - Headline: Total Annual Compensation (single number).
   - Donut chart: Base Salary, Bonus Target, RSU Equity.
   - Three detail cards: Base Salary (annualized), Bonus/Commission Target, RSU value.
   - Job metadata: Role and Level.
   - Sync timestamps: "Last synced from Workday: [timestamp]", "Last synced from Shareworks: [timestamp]".
6. If Shareworks data is unavailable → equity section shows error message (not $0, not hidden).
7. Employee adjusts share price slider → equity value, total compensation, and chart update in real-time.
8. Employee navigates to RSUs tab → sees grant list with progress bars, selects a grant, sees vesting timeline chart.

**Error states:**
- Shareworks unavailable: "Equity data is currently unavailable. Please contact your administrator."
- Workday data stale (>24 hours): Warning icon next to sync timestamp.
- No Workday record found for user: "We couldn't find your compensation record. Please contact your administrator."

### Flow 2: Manager Reviews Team

1. Manager logs in via Okta SSO.
2. Thrive resolves `Worker_ID` → recursively queries all employees in the org tree below the manager. Terminated employees are excluded.
3. Team grid renders (read-only) with summary cards (Equity Allocated, Equity Spent) and the data grid.
4. Manager uses search to find specific employees by name or job family.
5. Manager clicks column headers to sort (toggle ASC/DESC/none).
6. Manager uses Filters button to narrow by level, performance, zone, etc.
7. Grid paginates at 10 rows per page.

**Grid behavior:**
- Search: Case-insensitive, real-time filtering by name or job family.
- Sort: Click column header to toggle ASC/DESC. Default: Name ascending.
- % of SRP: Red below 100%, green at/above 100%.
- Job Level: Green lozenge for M-levels, blue for P-levels.
- FY24 H2 Rating: Displayed as ADS Lozenge with appearance mapped to rating.
- Read-only: No inline editing in Milestone 1.
- Terminated: Excluded entirely from Manager grid.

### Flow 3: Data Integration Engineer Configures Workday

1. Engineer switches to Data Integration persona.
2. Selects Workday source card → opens Connections & API Setup tab.
3. Enters Client ID, Endpoint URL, API Key, Tenant ID.
4. Clicks "Test Connection" → system makes an authenticated request to the Workday RaaS endpoint.
5. Success: green banner with latency (e.g., "Connected in 340ms"). Failure: red banner with error message.
6. Clicks "Save" → credentials stored encrypted.
7. Navigates to Field Mapping tab → reviews/adjusts source-to-Thrive field mappings.
8. Navigates to Sync History → verifies last successful sync.
9. If errors exist, navigates to Errors tab → reviews details, marks resolved.

**Error states:**
- Connection timeout: "Unable to reach Workday API. Check endpoint URL and network connectivity."
- Auth failure: "Invalid credentials. Verify Client ID and API Key in Workday Admin."
- Rate limit: "API rate limit exceeded. Wait 60 seconds before retrying."
- Missing required field: "3 records skipped — missing required Manager_Reference field."

### Flow 4: Admin Reviews Permissions

1. Admin logs in → sees full employee list across all orgs.
2. Admin navigates to Permissions page from the side nav.
3. Sees four role cards (Employee, Manager, Comp Admin, Data Integration Engineer) with a summary of what each role can access.
4. Permissions page is read-only — it displays the access model, not a configuration tool.
5. Users with multiple roles use the persona switcher to toggle between their assigned views.

---

## 8. Assumptions

| # | Assumption |
|---|---|
| A1 | Okta is the sole identity provider; all Thrive users have an Okta account with a `Worker_ID` claim. |
| A2 | `Worker_ID` (Workday) and `Participant_ID` (Shareworks) can be reliably joined — either they are the same value or a mapping table exists. |
| A3 | The Workday RaaS reports (CRINT Pave) are already configured and accessible via the tenant's RaaS API endpoint. |
| A4 | Shareworks API is REST-based and supports per-participant grant and vesting queries. |
| A5 | SRP (Salary Reference Point) minimum values are pre-configured in Thrive's Salary Bands; they are not sourced from Workday in this milestone. |
| A6 | "Promotion" in the Manager grid is a boolean flag sourced from the Workday data import (not derived or manually set). |
| A7 | Performance ratings map directly from Workday's `Review_Rating` field without additional transformation. |
| A8 | Currency is USD for all employees in Milestone 1; multi-currency support is a later milestone. |
| A9 | Sync frequency is configurable but defaults to daily (3:45 PM for Workday, 3:42 PM for Shareworks). |
| A10 | The Data Integration Engineer role has Workday Admin and Shareworks Admin access to configure API credentials. |
| A11 | Managers see all direct and indirect (skip-level) reports — full org tree below them, not just immediate directs. |
| A12 | Terminated employees are excluded from the Manager team grid entirely. They remain visible to Admins in data management views. |
| A13 | All views and grids are read-only in Milestone 1. Inline editing of compensation fields is deferred to Milestone 2. |
| A14 | When Shareworks data is unavailable for an employee (e.g., new hire with no grants), the UI displays an error message indicating equity data is unavailable rather than showing $0 or hiding the section. |
| A15 | The persona switcher is a production feature. Users may hold multiple roles, and the switcher allows them to toggle between their assigned views. Server-side role enforcement is required. |
| A16 | The default share price for RSU modeling is today's closing price. The slider range is $20–$200. |
| A17 | Sync timestamps are displayed per-source (Workday and Shareworks separately) so employees know the freshness of each data source independently. |

---

## 9. Open Questions and Clarifications Needed

| # | Question | Impact | Proposed Options |
|---|---|---|---|
| Q1 | **How is `Worker_ID` mapped to `Participant_ID` in Shareworks?** Are they the same value, or is there a separate mapping table? | Blocks equity data join for Employee and Manager views. | **Option A:** Same value (simplest). **Option B:** Mapping table maintained in Shareworks. **Option C:** Thrive maintains a crosswalk table. |
| Q2 | **What Okta claims/attributes are available?** Specifically, does the Okta token include `Worker_ID`, or do we need a lookup after authentication? | Affects how we resolve the authenticated user to their Workday/Shareworks data. | **Option A:** Okta profile includes `Worker_ID` as custom attribute. **Option B:** Okta provides email, and we look up `Worker_ID` from synced Workday data. |
| Q3 | **What is the Shareworks API authentication method?** OAuth 2.0, API Key, or certificate-based? | Affects API Setup configuration UI and credential storage. | Need Shareworks Admin to confirm. |
| Q4 | **What timestamp format should sync metadata display?** Should it show the time the data was pulled from the source system, or the time it was written to Thrive's cache? | Affects what "last synced" means to the employee. | **Option A:** Time data was fetched from source (more meaningful to user). **Option B:** Time data was committed to Thrive DB (more accurate technically). |
| Q5 | **Should the "stale data" warning threshold be configurable?** Currently proposed as >24 hours. | Affects whether this is a hard-coded value or an admin setting. | **Option A:** Hard-coded at 24 hours (simpler). **Option B:** Configurable per source in Data Management settings. |
| Q6 | **Where does the default share price come from?** Is it a live feed, a daily batch from a market data provider, or manually entered? | Affects accuracy of RSU modeling and whether we need a third integration. | **Option A:** Manual entry by Admin. **Option B:** Daily batch from market data API (e.g., exchangerate.host). **Option C:** Real-time feed (adds complexity). |

---

## 10. Evaluation Data Set

### 10.1 Data Sources

| Source | Type | Purpose |
|---|---|---|
| Workday (CRINT Pave Employee Compensation Records) | Production RaaS | Employee demographics, salary, level, performance |
| Workday (CRINT Pave-Compensation History) | Production RaaS | 2-year salary/bonus change history |
| Workday (CRINT Pave-Employee Eligible Earnings) | Production RaaS | Bonus plan details and eligible earnings |
| Shareworks (Equity Grants + Vesting Schedule) | Production API | RSU grants, vesting events, current FMV |
| Synthetic test records | Generated | Edge cases not covered by production data |

### 10.2 Record Types and Variety

| Dimension | Values to Include |
|---|---|
| Job Levels | P20, P30, P40, P50, P60, M50, M60, M70 |
| Zones / Geos | Zone 1 (SF/NYC), Zone 2 (Seattle/Austin), Zone 3 (Remote US), Zone 4 (International) |
| Performance Ratings | Exceptional, Exceeds, Meets, Developing, New (no rating) |
| Employee Types | Regular FT (included), Intern (excluded), Casual (excluded) |
| Worker Status | Active (included), Terminated within 90 days (included in Admin views), Terminated > 90 days (excluded) |
| Equity Grant Types | RSU, ISO, NSO |
| Vesting Status | Pending, Vested, Forfeited |
| Manager Hierarchy | 3 levels deep minimum (IC → Manager → Director → VP) |
| Shareworks Availability | Employees with grants, employees with no grants (new hires), employees with fully vested grants |

### 10.3 Recommended Record Counts

- **Total employees:** 50 synthetic + production data
- **Managers:** 8–10 (each with 4–8 direct reports)
- **Admins:** 2–3
- **Equity grants per employee:** 1–4
- **Comp history records:** 2–6 per employee (over 2-year lookback)

### 10.4 View-Specific Data Expectations

| View | What the User Sees | Key Test |
|---|---|---|
| Employee Total Rewards | Own base salary, bonus %, equity value, total comp, sync timestamps | Values match Workday + Shareworks source data exactly; timestamps reflect last sync |
| Employee Total Rewards (no equity) | Error message in equity section | "Equity data is currently unavailable" message displayed, not $0 |
| Employee RSUs | Own grants only, vesting timeline, price modeler | Modeled value updates when slider moves; vesting dates correct |
| Employee RSUs (fully vested) | All grants at 100% progress | No future vesting events; progress bar shows 100% |
| Manager Team Grid | 4–8 direct + indirect reports with all columns | SRP % calculated correctly; filter by level works; sort by salary works |
| Manager Team Grid (edge) | Employee with no performance rating | Shows "—" or "New" in rating column, not an error |
| Manager Team Grid (terminated) | Terminated employee in Workday data | Not shown in Manager grid |
| Admin Data Management | All 3 Workday tables + Shareworks tables | Sync status shows correct record counts; errors display for failed records |

### 10.5 Example Test Cases

| # | Scenario | Expected Result |
|---|---|---|
| TC-1 | Employee at P40, Zone 1, with 2 RSU grants | Total Rewards shows correct base + bonus + equity sum; RSU tab shows 2 grants; sync timestamps visible |
| TC-2 | Employee with no Shareworks data (new hire) | Equity section shows error message; base salary and bonus still display correctly |
| TC-3 | Employee adjusts share price slider to $150 | Equity value, total compensation, and chart update proportionally in real-time |
| TC-4 | Manager with 6 direct reports, filter by Level = P30 | Grid shows only P30 employees; count updates |
| TC-5 | Employee with SRP % = 95% (below 100%) | SRP % displayed in red in Manager grid |
| TC-6 | Terminated employee in Workday data | Not visible in Manager grid; visible in Admin data management |
| TC-7 | Intern employee in Workday data | Excluded from all views; not synced to Thrive |
| TC-8 | Shareworks grant with all shares vested | Vesting progress shows 100%; no future vesting events |
| TC-9 | Workday sync completed 2 hours ago | Timestamp shows "Last synced from Workday: [2 hours ago timestamp]"; no stale warning |
| TC-10 | Workday sync completed 30 hours ago | Timestamp shows stale warning indicator next to the timestamp |
| TC-11 | Employee switches to Manager view via persona switcher | Sees only their direct and indirect reports, not all employees |
