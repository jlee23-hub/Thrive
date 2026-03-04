# PRD Milestone 1.0

## Thrive — Employee Total Rewards View & RSU Modeling

---

## Overview and Scope

Milestone 1 delivers the foundational Employee Total Rewards experience in Thrive — a compensation planning tool built on the Atlassian Design System.

Every employee gets a personalized Total Rewards view showing their base salary, bonus target, and equity value in one place. Employee demographics, compensation history, and job data flow from Workday (via RaaS reports). Equity and RSU grant data flow from Shareworks. Authentication is through Okta SSO. All data displayed to the user is timestamped with when it was last synced from each source system, so employees always know how current the information is.

Employees can also model their RSU value at different share prices using an interactive slider.

### In Scope

- **Total Rewards View** (Employee): Personalized compensation dashboard showing base salary (Workday), bonus target (Workday), and equity value (Shareworks). Each data source displays a "last synced" timestamp.
- **RSU Modeling** (Employee): Interactive equity grant viewer with per-grant vesting schedules, vesting progress, and a share price modeling slider — all powered by Shareworks data.
- **Okta SSO** (Employee): Authentication via Okta OIDC/SAML; user identity resolved to `Worker_ID` for data scoping.

### Out of Scope (This Milestone)

- Manager Team Grid (future milestone).
- Permissions page and role-based access configuration (future milestone).
- Data Ingestion configuration UI for Workday and Shareworks (future milestone).
- Compensation cycle creation, approval workflows, and cycle execution (future milestone).
- Inline editing of compensation fields (future milestone).
- Merit matrix and salary band management (future milestone).
- Notifications and Rovo AI assistant integration (future milestone).
- Audit logging and SOX compliance reporting (future milestone).

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

---

## Non-Functional Requirements

### Security & Compliance

| Requirement | Detail |
|---|---|
| SSO Authentication | Okta OIDC/SAML; no local username/password authentication |
| Session Management | JWT with 8-hour expiry; refresh token rotation |
| Access Control | Employee can only view their own data; enforced server-side on every request |
| Transport Security | TLS 1.2+ for all API calls to Workday and Shareworks |

### Privacy & Data Handling

| Requirement | Detail |
|---|---|
| PII Fields | Name, email, salary, bonus, equity values are PII; encrypted at rest |
| Who Can See What | Employee: own data only. Identity resolved via Okta `Worker_ID`; no access to other employees' data. |

### Accessibility & Localization

| Requirement | Detail |
|---|---|
| WCAG Level | AA compliance (ADS components provide this foundation) |
| Keyboard Navigation | Full keyboard support for tabs, sliders, and interactive elements |
| Screen Reader | ARIA labels on all interactive elements; ADS components handle this by default |
| Currencies | USD as default; currency field from Workday determines display format |
| Number Formatting | Locale-aware formatting for salary and equity values (e.g., `$198,800.00`) |

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

**Error states:**
- Shareworks unavailable: Error message displayed in equity section.
- Workday data stale (>24 hours): Warning icon next to Workday sync timestamp.
- Shareworks data stale (>24 hours): Warning icon next to Shareworks sync timestamp.
- No Workday record found for user: "We couldn't find your compensation record. Please contact your administrator."

### Flow 2: Employee Models RSU Value

1. Employee is on the Total Rewards page.
2. Employee adjusts the share price slider ($20–$200).
3. Equity value, total compensation, and donut chart update in real-time as the slider moves.
4. Employee navigates to the RSUs tab.
5. Sees a list of all grants with progress bars and summary data.
6. Selects an individual grant → detailed vesting schedule chart and stacked area chart render.
7. Vesting schedule shows quarterly vesting over 4 years from the vesting start date.

**Error states:**
- No grants available (new hire): "Equity data is currently unavailable. Please contact your administrator."
- Grant with all shares vested: Progress bar shows 100%; no future vesting events on timeline.

---

## Assumptions

| # | Assumption |
|---|---|
| A1 | Okta is the sole identity provider; all Thrive users have an Okta account with a `Worker_ID` claim or a resolvable attribute. |
| A2 | `Worker_ID` (Workday) and `Participant_ID` (Shareworks) can be reliably joined — either they are the same value or a mapping table exists. |
| A3 | The Workday RaaS reports (CRINT Pave) are already configured and accessible via the tenant's RaaS API endpoint. |
| A4 | Shareworks API is REST-based and supports per-participant grant and vesting queries. |
| A5 | Currency is USD for all employees in Milestone 1; multi-currency support is deferred to a later milestone. |
| A6 | Sync frequency defaults to daily (3:45 PM for Workday, 3:42 PM for Shareworks). Data ingestion configuration is handled outside the application in this milestone. |
| A7 | When Shareworks data is unavailable for an employee (e.g., new hire with no grants), the UI displays an error message rather than showing $0 or hiding the equity section. |
| A8 | The default share price for RSU modeling is today's closing price. The slider range is $20–$200. |
| A9 | Sync timestamps are displayed per-source (Workday and Shareworks separately) so employees know the freshness of each data source independently. |
| A10 | A sync is considered "stale" if it occurred more than 24 hours ago. |
| A11 | The Total Rewards view is read-only. Employees cannot edit any compensation data. |

---

## Open Questions and Clarifications Needed

| # | Question | Impact | Proposed Options |
|---|---|---|---|
| Q1 | **How is `Worker_ID` mapped to `Participant_ID` in Shareworks?** Are they the same value, or is there a separate mapping table? | Blocks equity data join for the Employee view. | **Option A:** Same value (simplest, no mapping needed). **Option B:** Mapping table maintained in Shareworks. **Option C:** Thrive maintains a crosswalk table. |
| Q2 | **What Okta claims/attributes are available?** Does the Okta token include `Worker_ID` directly, or do we need a lookup after authentication? | Affects how we resolve the authenticated user to their Workday/Shareworks data. | **Option A:** Okta profile includes `Worker_ID` as a custom attribute. **Option B:** Okta provides email, and we look up `Worker_ID` from synced Workday data. |
| Q3 | **What is the Shareworks API authentication method?** OAuth 2.0, API Key, or certificate-based? | Affects how the backend connects to Shareworks to pull equity data. | Need Shareworks Admin to confirm the supported auth method. |
| Q4 | **What does the sync timestamp represent?** The time data was pulled from the source system, or the time it was written to Thrive's database? | Affects what "last synced" means to the employee viewing their data. | **Option A:** Time data was fetched from the source (more meaningful to user). **Option B:** Time data was committed to Thrive DB (more technically accurate). **Recommendation:** Option A. |
| Q5 | **Should the "stale data" warning threshold be configurable?** Currently proposed as a fixed 24-hour threshold. | Affects whether this is a hard-coded value or needs an admin setting. | **Option A:** Hard-coded at 24 hours (simpler, ships faster). **Option B:** Configurable (more flexible but adds scope). |
| Q6 | **Where does the default share price come from?** Is it a live market feed, a daily batch from a provider, or manually entered by an admin? | Affects accuracy of RSU modeling and whether a third integration is needed. | **Option A:** Manually entered (simplest). **Option B:** Daily batch from a market data API. **Option C:** Real-time market feed (adds significant complexity). |

---

## Evaluation Data Set

### Data Sources

| Source | Type | Purpose |
|---|---|---|
| Workday (CRINT Pave Employee Compensation Records) | Production RaaS | Employee demographics, salary, level, job data |
| Workday (CRINT Pave-Compensation History) | Production RaaS | 2-year salary/bonus change history |
| Shareworks (Equity Grants + Vesting Schedule) | Production API | RSU grants, vesting events, current FMV |
| Synthetic test records | Generated | Edge cases (e.g., no equity, fully vested, stale sync) |

### View-Specific Data Expectations

| View | What the User Sees | Key Validation |
|---|---|---|
| Employee Total Rewards | Own base salary, bonus %, equity value, total comp, per-source sync timestamps | Values match Workday + Shareworks source data exactly; timestamps reflect actual last sync per system |
| Employee Total Rewards (no equity) | Error message in equity section; salary and bonus still display | "Equity data is currently unavailable" message shown; base salary and bonus render correctly |
| Employee Total Rewards (stale sync) | Warning indicator next to the stale timestamp | Warning appears when sync is >24 hours old |
| Employee RSUs | Own grants only, vesting timeline, share price modeler | Modeled value updates when slider moves; vesting dates and units are correct |
| Employee RSUs (fully vested) | All grants at 100% progress; no future vesting events | Progress bar shows 100%; no upcoming vesting dates |

### Example Test Cases

| # | Scenario | Expected Result |
|---|---|---|
| TC-1 | Employee at P40, Zone 1, with 2 RSU grants | Total Rewards shows correct base + bonus + equity sum; RSU tab shows 2 grants; both Workday and Shareworks sync timestamps visible |
| TC-2 | Employee with no Shareworks data (new hire, no grants) | Equity section shows error message; base salary and bonus display correctly from Workday |
| TC-3 | Employee adjusts share price slider from $79 to $150 | Equity value, total compensation, and donut chart update proportionally in real-time |
| TC-4 | Employee with a single grant, all shares vested | Vesting progress shows 100%; no future vesting events on timeline |
| TC-5 | Workday sync completed 2 hours ago | Timestamp shows recent sync time; no stale warning indicator |
| TC-6 | Workday sync completed 30 hours ago | Stale warning indicator displayed next to the Workday sync timestamp |
| TC-7 | Shareworks sync completed 26 hours ago | Stale warning indicator displayed next to the Shareworks sync timestamp |
| TC-8 | Employee views RSU tab with 3 grants, selects second grant | Vesting schedule chart and area chart update to show the selected grant's data |
| TC-9 | Employee with base salary but no bonus target in Workday | Bonus section shows $0 or "N/A"; total comp is base + equity only |
