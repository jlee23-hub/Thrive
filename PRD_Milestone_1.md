# Thrive — Milestone 1 PRD
## Compensation Planning Tool — Core Views & Data Integration

---

## 1. Overview and Scope

### What We Are Building
Milestone 1 delivers the foundational employee compensation experience in Thrive — a Pave replacement built on the Atlassian Design System. This milestone establishes the three core persona views (Employee, Manager, Admin) with real data flowing from Workday (HRIS) and Shareworks (Equity Management), secured behind Okta SSO.

### In Scope
- **Total Rewards View** (Employee): A personal compensation summary pulling base salary from Workday and RSU/equity data from Shareworks.
- **RSU Modeling** (Employee): Interactive equity grant viewer with vesting projections, powered by Shareworks data.
- **Team View** (Manager): A filterable, sortable, pinnable grid of direct and indirect (skip-level) reports with compensation and cycle planning fields sourced from Workday.
- **Permissioning** (Admin): Role-based access control so Employees see only their own data, Managers see their team, and Admins see all employees.
- **Data Ingestion** (Admin / Data Integration Engineer): Workday and Shareworks API configuration, field mapping, sync status monitoring, error tracking, and sync history.

### Out of Scope (This Milestone)
- Compensation cycle creation, approval workflows, and cycle execution (Milestone 2).
- Merit matrix and salary band management (Milestone 2).
- Notifications and Rovo AI assistant integration (Milestone 3).
- Audit logging and SOX compliance reporting (Milestone 3).

---

## 2. Personas and Jobs to Be Done

### Employee
**Description:** An individual contributor who wants to understand their total compensation package — base salary, bonus target, and equity — in one place.

| Job to Be Done | Detail |
|---|---|
| Understand my total rewards | See annualized base salary, bonus target %, and total equity value on a single dashboard |
| Track my RSU vesting | View all equity grants, vesting schedules, projected future vesting amounts, and model different share price scenarios |
| Verify my data is current | See when my compensation data was last synced from Workday/Shareworks |

### Manager
**Description:** A people manager who needs visibility into their direct and indirect reports' compensation data to make informed planning decisions during comp cycles.

| Job to Be Done | Detail |
|---|---|
| Review my team's compensation | See a grid of direct and indirect (skip-level) reports with current salary, SRP %, equity, performance ratings, and job levels |
| Prepare for comp planning | Filter, sort, and pin employees in the grid to focus on specific cases (e.g., under-SRP, high performers, promotion candidates) |
| Identify compensation risks | Quickly spot employees below SRP, approaching band limits, or with equity cliffs |

### Comp Admin
**Description:** A compensation team member who manages the overall system configuration, data integrity, and access control.

| Job to Be Done | Detail |
|---|---|
| Control who sees what | Configure role-based access so data visibility matches organizational hierarchy |
| Ensure data freshness | Monitor Workday and Shareworks sync status, review errors, and trigger manual syncs |
| Manage data sources | Configure API connections, map fields between source systems and Thrive, and validate data quality |

### Data Integration Engineer
**Description:** A technical admin with Workday Admin and Shareworks Admin access who configures and maintains the API integrations.

| Job to Be Done | Detail |
|---|---|
| Connect to Workday & Shareworks APIs | Enter API credentials, test connections, and verify latency/authentication |
| Map source fields to Thrive fields | Map Workday RaaS report fields and Shareworks fields to Thrive's internal schema with transforms |
| Monitor integration health | View sync history, error logs, and resolve data quality issues |

---

## 3. Functional Requirements

### 3.1 Employee — Total Rewards View

| # | Requirement | Priority | Data/Integration Detail |
|---|---|---|---|
| E-1 | As an employee, I can see my annualized base salary on the Total Rewards dashboard. | P0 | Workday → `CRINT Pave Employee Compensation Records` → `Annual_Base_Pay` field |
| E-2 | As an employee, I can see my bonus target percentage and calculated bonus amount. | P0 | Workday → `Bonus_Plan_Percent` field; amount = `Annual_Base_Pay × Bonus_Plan_Percent` |
| E-3 | As an employee, I can see my total equity value (vested + unvested) in dollars. | P0 | Shareworks → `Equity Grants` → `Total_Shares_Granted × Current_FMV` |
| E-4 | As an employee, I can see my total annual compensation (base + bonus + equity). | P0 | Computed: sum of E-1, E-2, E-3 |
| E-5 | As an employee, I can see a breakdown chart of my compensation components. | P1 | Rendered from E-1 through E-4 data |
| E-6 | As an employee, I can see the last sync timestamp for my data. | P1 | From sync metadata on Workday/Shareworks connections |
| E-7 | As an employee, I am authenticated via Okta SSO before accessing Thrive. | P0 | Okta OIDC/SAML integration; session persisted via JWT |

### 3.2 Employee — RSU Modeling

| # | Requirement | Priority | Data/Integration Detail |
|---|---|---|---|
| R-1 | As an employee, I can see all my equity grants with grant date, total units, vested units, and current value. | P0 | Shareworks → `Equity Grants` table: `Grant_Date`, `Total_Shares_Granted`, `Shares_Vested`, `Current_FMV` |
| R-2 | As an employee, I can see a vesting schedule timeline showing future vesting dates and amounts. | P0 | Shareworks → `Vesting Schedule` table: `Vesting_Date`, `Shares_To_Vest`, `Vesting_Status` |
| R-3 | As an employee, I can model my equity value at different share prices using an interactive slider. | P1 | Client-side computation: `unvested_units × modeled_price` |
| R-4 | As an employee, I can see my year-over-year equity value trend. | P1 | Computed from grant history and historical FMV |
| R-5 | As an employee, I can see vesting progress percentage per grant. | P1 | `Shares_Vested / Total_Shares_Granted × 100` |

### 3.3 Manager — Team View

| # | Requirement | Priority | Data/Integration Detail |
|---|---|---|---|
| M-1 | As a manager, I can see a read-only grid of my direct and indirect (skip-level) reports with the following columns: Name, Job Profile, Level, Promotion (true/false), Performance Rating, Current Salary, SRP %, New Salary (Annualized), New SRP %, Bonus, New Equity. All fields are read-only in Milestone 1. | P0 | Workday → `CRINT Pave Employee Compensation Records`: `Legal_First_Name`, `Legal_Last_Name`, `Business_Title`, `Job_Profile_Level`, `Annual_Base_Pay`, `Review_Rating`; SRP from Salary Bands config; Promotion is a boolean flag from the Workday data import |
| M-2 | As a manager, I can filter employees in the grid by any column (e.g., level, performance, promotion status). | P0 | Client-side filtering on grid data |
| M-3 | As a manager, I can sort the grid by any column in ascending or descending order. | P0 | Client-side sort |
| M-4 | As a manager, I can pin/freeze rows to keep specific employees visible while scrolling. | P1 | Sticky row implementation in grid |
| M-5 | As a manager, I can see the SRP % for each employee calculated as `Current_Salary / SRP_Minimum × 100`. | P0 | SRP minimum from Salary Bands; `Annual_Base_Pay` from Workday |
| M-6 | As a manager, I can see equity allocations (current RSUs) for each direct report. | P1 | Shareworks → `Equity Grants` joined by `Worker_ID` / `Participant_ID` |
| M-7 | As a manager, I can see employees who report to me directly or indirectly (full org tree below me). Terminated employees are excluded from the Manager grid. | P0 | Recursive filter: traverse `Manager_Reference` hierarchy starting from `current_user.Worker_ID`; exclude `Worker_Status = "Terminated"` |
| M-8 | As a manager, the grid is entirely read-only in Milestone 1 — no inline editing of compensation fields. | P0 | Editable fields (New Salary, New SRP %, Bonus, New Equity) display values from imports but cannot be modified until Milestone 2 |

### 3.4 Admin — Permissioning

| # | Requirement | Priority | Data/Integration Detail |
|---|---|---|---|
| A-1 | As an admin, I can configure that Employees can only see their own compensation data. | P0 | Access filter: `Worker_ID = authenticated_user.Worker_ID` |
| A-2 | As an admin, I can configure that Managers can see their own data and their direct and indirect (skip-level) reports' data. | P0 | Access filter: `Worker_ID = authenticated_user.Worker_ID OR Manager_Reference hierarchy includes authenticated_user.Worker_ID` (recursive org tree traversal) |
| A-3 | As an admin, I can see compensation data for all employees across the organization. | P0 | No access filter applied for Admin role |
| A-4 | As an admin, I can assign roles (Employee, Manager, Admin, Data Integration Engineer) to users. | P1 | Role stored against Okta user profile or Thrive user table |
| A-5 | Role assignment is initially derived from Workday org hierarchy (`Manager_Reference` determines manager role). | P0 | If a `Worker_ID` appears as any employee's `Manager_Reference`, user gets Manager role |

### 3.5 Admin — Data Ingestion

| # | Requirement | Priority | Data/Integration Detail |
|---|---|---|---|
| D-1 | As a data integration engineer, I can configure Workday API credentials (Client ID, Endpoint URL, API Key, Tenant ID) and test the connection. | P0 | Workday RaaS API; credentials stored encrypted |
| D-2 | As a data integration engineer, I can configure Shareworks API credentials and test the connection. | P0 | Shareworks REST API; credentials stored encrypted |
| D-3 | As a data integration engineer, I can map Workday source fields to Thrive fields with data type transforms. | P0 | See Field Mapping table below |
| D-4 | As a data integration engineer, I can view sync status (last timestamp, records synced, records failed) for each integration. | P0 | Stored per sync run |
| D-5 | As a data integration engineer, I can view and filter error logs by source, severity, and resolution status. | P0 | Error entries with `source`, `type`, `severity`, `resolved` fields |
| D-6 | As a data integration engineer, I can trigger a manual sync for any data source or individual table. | P1 | Async job with progress tracking |
| D-7 | As a data integration engineer, I can view full sync history with search and filtering. | P1 | Paginated history log |

---

## 4. Workday & Shareworks Integration Detail

### 4.1 Workday RaaS Reports (Outbound — Read)

| Integration Name | WD Data Source | Function | Data Selection Criteria |
|---|---|---|---|
| CRINT Pave Employee Compensation Records | All Active and Terminated Workers | Demographics and compensation fields for cycle planning | Active and eligible employees; No intern/casual employee types |
| CRINT Pave-Compensation History | Compensation Changes | Salary and bonus change history | Active and eligible employees; No intern/casual types; 2-year lookback; Salary and bonus change events |
| CRINT Pave-Employee Eligible Earnings | All Eligible Earnings Overrides | Eligible earnings and bonus plan details | Active and eligible employees; No intern/casual types; Current eligible earnings override period |

### 4.2 Workday Field Mapping (CRINT Pave Employee Compensation Records)

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

### 4.3 Shareworks Field Mapping

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
| Who Can See What | Employee: own data only. Manager: own + direct reports. Admin: all. Data Integration: sync metadata only (no individual compensation values in the Data Management view) |
| Salary Masking | In Manager grid, salary values visible only for direct reports; no cross-team visibility |

### 5.3 Accessibility & Localization

| Requirement | Detail |
|---|---|
| WCAG Level | AA compliance (via Atlassian Design System components) |
| Keyboard Navigation | Full keyboard support for grid, tabs, and modals |
| Screen Reader | ARIA labels on all interactive elements; ADS components provide this by default |
| Currencies | USD as default; currency field from Workday determines display |
| Number Formatting | Locale-aware formatting for salary values (e.g., `$198,800.00`) |

---

## 6. Flows and Model

### 6.1 Information Architecture

```
Thrive App (Okta SSO)
├── Employee View
│   ├── Total Rewards (default landing)
│   │   ├── Compensation Summary (Base + Bonus + Equity)
│   │   └── Compensation Breakdown Chart
│   ├── RSUs
│   │   ├── Grant List
│   │   ├── Vesting Timeline
│   │   └── Share Price Modeler
│   └── About Us
├── Manager View
│   ├── Team Overview (default landing)
│   │   ├── Team Grid (filterable, sortable, pinnable)
│   │   └── Inline Comp Planning Fields
│   └── About Us
├── Comp Admin View
│   ├── Dashboard
│   ├── Groups
│   ├── Salary Bands
│   ├── Data Management
│   └── Settings
└── Data Integration View
    └── Data Management
        ├── Connections & API Setup
        ├── Field Mapping
        ├── Errors & Alerts
        └── Sync History
```

### 6.2 Key Flows

#### Flow 1: Employee Views Total Rewards
1. Employee logs in via Okta SSO.
2. Thrive resolves `Worker_ID` from Okta profile → fetches compensation data from Workday sync cache.
3. Fetches equity data from Shareworks sync cache (joined on `Worker_ID` ↔ `Participant_ID`).
4. Total Rewards page renders: base salary, bonus target, equity value, total compensation, and breakdown chart.
5. If Shareworks data is unavailable (e.g., new hire with no grants), the equity section displays an error message: "Equity data is currently unavailable. Please contact your administrator." — it does not show $0 or hide the section.
6. Employee navigates to RSUs tab → sees grant list, vesting timeline, and can adjust share price slider.

#### Flow 2: Manager Reviews Team
1. Manager logs in via Okta SSO.
2. Thrive resolves `Worker_ID` → recursively queries all employees in the org tree below the manager (direct and indirect/skip-level reports). Terminated employees are excluded.
3. Team grid renders (read-only) with columns: Name, Job Profile, Level, Promotion, Performance, Current Salary, SRP %, New Salary, New SRP %, Bonus, New Equity.
4. Manager uses column header controls to filter (e.g., Level = P40+), sort (e.g., SRP % ascending), or pin rows.
5. Grid supports horizontal scroll for all columns; Name column is sticky. All fields are read-only in Milestone 1.

**Grid Behavior:**
- Filter: Dropdown per column header with available values.
- Sort: Click column header to toggle ASC/DESC/none.
- Pin: Right-click row or use row action menu to pin to top.
- SRP %: Calculated as `Current_Salary / SRP_Minimum × 100`; values below 100% shown in red.
- Promotion: Boolean flag from Workday data import; `true` if the imported record has the promotion flag set.
- Terminated: Excluded from Manager grid entirely; visible in Admin data management views only.
- Read-only: No inline editing in Milestone 1; editing deferred to Milestone 2.

#### Flow 3: Data Integration Engineer Configures Workday
1. Engineer switches to Data Integration view.
2. Selects Workday source card → opens Connections & API Setup tab.
3. Enters Client ID, Endpoint URL, API Key, Tenant ID.
4. Clicks "Test Connection" → system makes an authenticated request to the Workday RaaS endpoint.
5. Success: shows green banner with latency. Failure: shows red banner with error message.
6. Clicks "Save" → credentials stored encrypted.
7. Navigates to Field Mapping tab → reviews/adjusts source-to-Thrive field mappings.
8. Navigates to Sync History → verifies last successful sync.
9. If errors exist, navigates to Errors tab → reviews details, marks resolved.

**Error States:**
- Connection timeout: "Unable to reach Workday API. Check endpoint URL and network connectivity."
- Auth failure: "Invalid credentials. Verify Client ID and API Key in Workday Admin."
- Rate limit: "API rate limit exceeded. Wait 60 seconds before retrying."
- Missing required field: "3 records skipped — missing required Manager_Reference field."

#### Flow 4: Admin Verifies Permissions
1. Admin logs in → sees full employee list across all orgs.
2. Admin navigates to Settings → Permission Management.
3. Verifies that Manager_Reference hierarchy correctly determines who is a Manager (including skip-level visibility).
4. Can override roles manually (e.g., promote a user to Admin).
5. Users with multiple roles (e.g., a Manager who is also an Admin) use the persona switcher in production to toggle between their assigned views. Server-side role enforcement ensures users can only switch to roles they are authorized for.

---

## 7. Evaluation Data Set

### 7.1 Data Sources
| Source | Type | Purpose |
|---|---|---|
| Workday (CRINT Pave Employee Compensation Records) | Production RaaS | Employee demographics, salary, level, performance |
| Workday (CRINT Pave-Compensation History) | Production RaaS | 2-year salary/bonus change history |
| Workday (CRINT Pave-Employee Eligible Earnings) | Production RaaS | Bonus plan details and eligible earnings |
| Shareworks (Equity Grants + Vesting Schedule) | Production API | RSU grants, vesting events, current FMV |
| Synthetic test records | Generated | Edge cases not covered by production data |

### 7.2 Record Types and Variety

| Dimension | Values to Include |
|---|---|
| Job Levels | P20, P30, P40, P50, P60, M50, M60, M70 |
| Zones / Geos | Zone 1 (SF/NYC), Zone 2 (Seattle/Austin), Zone 3 (Remote US), Zone 4 (International) |
| Performance Ratings | Exceptional, Exceeds, Meets, Developing, New (no rating) |
| Employee Types | Regular FT (included), Intern (excluded), Casual (excluded) |
| Worker Status | Active (included), Terminated within 90 days (included), Terminated > 90 days (excluded) |
| Equity Grant Types | RSU, ISO, NSO |
| Vesting Status | Pending, Vested, Forfeited |
| Manager Hierarchy | 3 levels deep minimum (IC → Manager → Director → VP) |

### 7.3 Recommended Record Counts
- **Total employees:** 50 synthetic + production data
- **Managers:** 8–10 (each with 4–8 direct reports)
- **Admins:** 2–3
- **Equity grants per employee:** 1–4
- **Comp history records:** 2–6 per employee (over 2-year lookback)

### 7.4 View-Specific Data Expectations

| View | What the User Sees | Key Test |
|---|---|---|
| Employee Total Rewards | Own base salary, bonus %, equity value, total comp | Values match Workday + Shareworks source data exactly |
| Employee RSUs | Own grants only, vesting timeline, price modeler | Modeled value updates when slider moves; vesting dates are correct |
| Manager Team Grid | 4–8 direct reports with all columns populated | SRP % calculated correctly; filter by level works; sort by salary works |
| Manager Team Grid (edge) | Employee with no performance rating | Shows "—" or "New" in rating column, not an error |
| Admin Data Management | All 3 Workday tables + 2 Shareworks tables | Sync status shows correct record counts; errors display for failed records |
| Admin Data Management (error) | Shareworks vesting date out of range | Error appears in Errors tab with "warning" severity |

### 7.5 Example Test Cases

| # | Scenario | Expected Result |
|---|---|---|
| TC-1 | Employee at P40, Zone 1, with 2 RSU grants | Total Rewards shows correct base + bonus + equity sum; RSU tab shows 2 grants |
| TC-2 | Manager with 6 direct reports, filter by Level = P30 | Grid shows only P30 employees; count updates |
| TC-3 | Employee with SRP % = 95% (below 100%) | SRP % displayed in red in Manager grid |
| TC-4 | Employee with Promotion = true | Grid shows "Yes" in Promotion column |
| TC-5 | Intern employee in Workday data | Excluded from all views; not synced to Thrive |
| TC-6 | Shareworks grant with all shares vested | Vesting progress shows 100%; no future vesting events |
| TC-7 | Workday sync fails due to rate limit | Error logged with "critical" severity; previous data retained |
| TC-8 | Employee switches to Manager view via persona switcher | Sees only their direct reports, not all employees |

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
| A9 | Sync frequency is configurable but defaults to daily (3:45 PM for Workday, 3:42 PM for Shareworks based on current schedule). |
| A10 | The Data Integration Engineer role has Workday Admin and Shareworks Admin access to configure API credentials. |
| A11 | Managers see all direct and indirect (skip-level) reports — full org tree below them, not just immediate directs. |
| A12 | Terminated employees are excluded from the Manager team grid entirely. They remain visible to Admins in data management views. |
| A13 | All views and grids are read-only in Milestone 1. Inline editing of compensation fields (New Salary, New SRP %, Bonus, New Equity) is deferred to Milestone 2. |
| A14 | When Shareworks data is unavailable for an employee (e.g., new hire with no grants), the UI displays an error message indicating equity data is unavailable rather than showing $0 or hiding the section. |
| A15 | The persona switcher is a production feature. Users may hold multiple roles (e.g., a Manager who is also an Admin), and the switcher allows them to toggle between their assigned views. Server-side role enforcement is required. |

---

## 9. Open Questions and Clarifications Needed

| # | Question | Impact | Proposed Options |
|---|---|---|---|
| Q1 | **How is `Worker_ID` mapped to `Participant_ID` in Shareworks?** Are they the same value, or is there a separate mapping table? | Blocks equity data join for Employee and Manager views | **Option A:** Same value (simplest). **Option B:** Mapping table maintained in Shareworks. **Option C:** Thrive maintains a crosswalk table. |
| Q2 | **What Okta claims/attributes are available?** Specifically, does the Okta token include `Worker_ID`, or do we need a lookup after authentication? | Affects how we resolve the authenticated user to their Workday/Shareworks data | **Option A:** Okta profile includes `Worker_ID` as custom attribute. **Option B:** Okta provides email, and we look up `Worker_ID` from synced Workday data. |
| Q3 | **What is the Shareworks API authentication method?** OAuth 2.0, API Key, or certificate-based? | Affects API Setup configuration UI and credential storage | Need Shareworks Admin to confirm. |

### Resolved Questions

| # | Question | Resolution |
|---|---|---|
| ~~Q3~~ | How is "Promotion" determined? | **Resolved:** Promotion is a boolean flag sourced directly from the Workday data import. It is not derived or manually set. |
| ~~Q4~~ | Should Managers see compensation data for indirect reports (skip-level)? | **Resolved:** Yes. Managers see the full org tree below them (recursive), not just direct reports. |
| ~~Q5~~ | What is the expected behavior when Shareworks data is unavailable? | **Resolved:** Display an error message indicating equity data is unavailable. Do not show $0 or hide the section. |
| ~~Q6~~ | Are comp planning fields editable in Milestone 1? | **Resolved:** No. All fields are read-only in Milestone 1. Inline editing is deferred to Milestone 2. |
| ~~Q8~~ | Should terminated employees appear in the Manager team grid? | **Resolved:** No. Terminated employees are excluded from the Manager grid entirely. They remain visible in Admin views. |
| ~~Q9~~ | Is the persona switcher a dev/demo tool or production feature? | **Resolved:** Production feature. Users may hold multiple roles and switch between them. Server-side role enforcement is required. |
