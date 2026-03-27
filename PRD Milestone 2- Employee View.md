# PRD Milestone 2.0 --> Employee Total Rewards View & RSU Modeling

---

## Overview and Scope

Milestone 1 delivers the foundational Employee Total Rewards experience in the compensation tool — a compensation planning tool built on the Atlassian Design System.

Every employee gets a personalized Total Rewards view showing their base salary, bonus target, and equity value in one place. Employee demographics, compensation history, and job data flow from Workday. Equity and RSU grant data flow from Shareworks. Authentication is through Okta SSO. All data displayed to the user is timestamped with when it was last synced from each source system, so employees always know how current the information is.

Employees can also model their RSU value at different share prices using an interactive slider.

### In Scope

- **Total Rewards View** (Employee): Personalized compensation dashboard showing base salary (Workday), bonus target (Workday), and equity value (Shareworks). Each data source displays a "last synced" timestamp. The page displays a personalized welcome heading: "Welcome to your Total Rewards Portal [First Name]".
- **RSU Modeling** (Employee): Interactive equity grant viewer with per-grant vesting schedules, vesting progress, and a share price modeling slider — all powered by Shareworks data. The share price slider only affects unvested equity value; vested equity value is always calculated using the historical share price at each vest date.
- **Okta SSO** (Employee): Authentication via Okta OIDC/SAML; user identity resolved to their employee identifier for data scoping.
- **About / Resources Page** (Employee): A dedicated page showing external resource links (Atlassian Compensation, About Base Salary, About Equity, About Bonus, Stock Central) and a legal disclaimer with standard informational language about estimates and tax considerations.

### Out of Scope

- Manager Team Grid.
- Permissions page and role-based access configuration.
- Data Ingestion configuration UI for Workday and Shareworks.
- Compensation cycle creation, approval workflows, and cycle execution.
- Inline editing of compensation fields.
- Merit matrix and salary band management.
- Notifications and Rovo AI assistant integration.
- Audit logging and SOX compliance reporting.

---

## Personas, Jobs to Be Done

### Employee

An individual contributor who wants to understand their total compensation — base salary, bonus target, and equity — in one personalized view, with confidence that the data is current.

| Job to Be Done |
|---|
| See my annualized base salary, bonus target, and total equity value on a single dashboard |
| View all my RSU grants with vesting schedules, progress, and projected future vesting |
| Model my **unvested** equity value at different share prices to understand upside/downside, while seeing my vested value fixed at the historical price it was vested at |
| Know when my compensation data was last synced from Workday and when my equity data was last synced from Shareworks |
| Verify my displayed data matches what I expect from my offer letter and grant agreements |
| Access external resources and understand legal disclaimers about the compensation data |

---

## Users and Functional Requirements

### Employee — Total Rewards View

| # | Requirement | Priority |
|---|---|---|
| E-1 | As an employee, I can see my annualized base salary on the Total Rewards dashboard. Source: Workday. | P0 |
| E-2 | As an employee, I can see my bonus target percentage and calculated bonus dollar amount. Source: Workday; calculated as base salary × bonus target percentage. | P0 |
| E-3 | As an employee, I can see my total equity value (vested + unvested) in dollars. Source: Shareworks. Vested value uses the historical share price at each vest date. Unvested value uses the modeled share price (default or slider-adjusted). | P0 |
| E-4 | As an employee, I can see my total annual compensation (base + bonus + equity) as a single headline number and as a donut chart showing the proportional breakdown. The page displays a personalized welcome heading: "Welcome to your Total Rewards Portal [First Name]". | P0 |
| ~~E-5~~ | ~~As an employee, I can see a bar chart of my year-over-year RSU value (historical and projected future years).~~ **Removed** — Year-over-year RSU bar chart has been descoped from the Total Rewards dashboard. | ~~P1~~ |
| E-6 | As an employee, I can see my vested vs. unvested equity split in both dollars and units. | P0 |
| E-7 | As an employee, I can see my Job Role and Job Level displayed on the Total Rewards page. Source: Workday. | P0 |
| E-8 | As an employee, I can see the timestamp of when my compensation data was last synced from Workday, displayed in a footer at the bottom of the page in absolute format (e.g., "Mar 27, 2026 3:45 PM"). | P0 |
| E-9 | As an employee, I can see the timestamp of when my equity data was last synced from Shareworks, displayed in a footer at the bottom of the page in absolute format (e.g., "Mar 27, 2026 3:42 PM"). | P0 |
| ~~E-10~~ | ~~As an employee, I can see a note indicating that FX rates are updated daily and the default share price used for equity calculations.~~ **Deferred** — FX rates note moved to a later milestone. | ~~P1~~ |
| E-11 | As an employee, if the Shareworks API call fails, I see an error message: "Equity data is currently unavailable. Please contact your administrator." If Shareworks returns successfully but I have zero grants (e.g., new hire), I see: "No equity grants are currently available." In both cases, the equity section is not hidden and does not show $0. | P0 |
| E-12 | As an employee, I am authenticated via Okta SSO before accessing any the compensation tool data. My identity is resolved to my employee identifier which scopes all queries to my records only. | P0 |
| E-13 | As an employee, I can access an "About" page from the navigation that shows external resource links (Atlassian Compensation, About Base Salary, About Equity, About Bonus, Stock Central) and a legal disclaimer. | P1 |

### Employee — RSU Modeling

| # | Requirement | Priority |
|---|---|---|
| R-1 | As an employee, I can see all my equity grants listed with grant date, total units, vested units, vested value, total value, and vesting progress percentage. The section heading uses "RSUs" (no apostrophe). Source: Shareworks. | P0 |
| R-2 | As an employee, I can see a Vesting Schedule bar chart showing vested value per period. Unvested value is not displayed in the bar chart. The bar chart does not include a legend. | P0 |
| R-3 | As an employee, I can see a cumulative vesting line chart showing vested vs. unvested units over time for all grants. | P1 |
| R-4 | As an employee, I can model my equity value at different share prices using an interactive slider ($20–$200). The default share price is the current TEAM stock price. **Only unvested equity value is recalculated** when the slider moves (unvested units × modeled price). **Vested equity value is always fixed** at the historical share price on the date each tranche vested (sourced from Shareworks). Total equity value = fixed vested value + modeled unvested value. This pricing rule applies consistently across: the Total Rewards donut chart, equity summary cards, the RSU Vesting Schedule bar chart, and the cumulative vesting line chart. | P1 |
| R-5 | As an employee, I can see vesting progress per grant displayed as a progress bar with a percentage label. The Equity Summary section includes year filter tabs ("All" plus each distinct grant year) allowing grants to be filtered by year. The grant list is scrollable when grants exceed the visible area. | P1 |
| R-6 | As an employee, I can see the grant date and vesting start date for each grant. | P0 |

---

## User Stories and Functional Requirements

### Employee: View My Total Rewards

**As an employee, I want to see my personalized total compensation on a single dashboard so I understand the full value of my package.**

- The page displays a personalized welcome heading: "Welcome to your Total Rewards Portal [First Name]" above the compensation card.
- The dashboard shows three compensation components: Base Salary (annualized, from Workday), Bonus/Commission Target (from Workday), and RSU Equity Value (from Shareworks).
- A donut chart shows the proportional breakdown of base, bonus, and equity.
- Total annual compensation is displayed as a single headline number (sum of all three components).
- Job Role (e.g., "Senior Engineer") and Job Level (e.g., "P50") are shown, sourced from Workday.
- A page footer displays sync timestamps in absolute format: "Last synced from Workday: [timestamp]" and "Last synced from Shareworks: [timestamp]".
- If the Shareworks API call fails, the equity section shows: "Equity data is currently unavailable. Please contact your administrator." If Shareworks returns successfully but the employee has zero grants, the equity section shows: "No equity grants are currently available." In both cases, the section is visible and does not show $0.

### Employee: Model My RSU Value

**As an employee, I want to model my equity at different share prices so I can understand the potential value of my grants.**

- A share price slider (range: $20–$200) allows the employee to adjust the modeled share price.
- The default share price is the current TEAM stock price.
- **Vested vs. Unvested Pricing Rule:** When the slider is adjusted, only **unvested** equity value is recalculated (unvested units × modeled share price). **Vested** equity value is always fixed at the historical share price on the date each tranche vested (sourced from Shareworks). Total equity value = fixed vested value + modeled unvested value. This rule is applied consistently across all views: Total Rewards donut chart, equity summary cards, Vesting Schedule bar chart, and cumulative vesting line chart.
- Moving the slider dynamically updates: total equity value, unvested value, and the donut chart proportions. Vested value remains unchanged.
- The RSUs page shows all grants in an Equity Summary section, each with: grant date, total units, vested units, vested value, total value, and a vesting progress bar.
- The Equity Summary section includes year filter tabs ("All" plus each distinct grant year) for filtering grants by year. The grant list is scrollable when grants exceed the visible area.
- The Vesting Schedule bar chart shows only vested value per period. Unvested value is not displayed in the bar chart. No legend is shown.
- A cumulative vesting line chart shows vested vs. unvested units over time across all grants.
- Selecting a grant shows its detailed quarterly vesting schedule.
- The vesting schedule covers 16 quarters (4 years) starting from the vesting start date.

### Employee: Access Resources and Legal Disclaimer

**As an employee, I want to access external resources about my compensation programs and understand the legal disclaimers so I can make informed decisions.**

- An "About" page is accessible from the navigation.
- The page shows a **Resources** section with external links: Atlassian Compensation, About Base Salary, About Equity, About Bonus, and Stock Central.
- The page shows a **Legal Disclaimer** section with standard informational language about estimates, tax considerations, and the nature of the data presented.

### Employee: Know When My Data Was Last Updated

**As an employee, I want to see timestamps showing when my compensation and equity data were last synced so I know how current the numbers are.**

- A footer at the bottom of the Total Rewards page shows "Last synced from Workday: [timestamp]" and "Last synced from Shareworks: [timestamp]".
- Timestamps are displayed in absolute format (e.g., "Mar 27, 2026 3:45 PM").
- Timestamps are displayed per-source so the employee can see freshness of each system independently.

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
| Who Can See What | Employee: own data only. Identity resolved via Okta employee identifier; no access to other employees' data. |

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

1. Employee navigates to the compensation tool → redirected to Okta SSO login.
2. Okta authenticates the user → returns JWT with identity claims.
3. the compensation tool resolves the employee's identity from Okta profile → fetches compensation data from Workday sync cache.
4. the compensation tool fetches equity data from Shareworks sync cache (joined on the employee's identifier across both systems).
5. Total Rewards page renders:
   - Personalized heading: "Welcome to your Total Rewards Portal [First Name]".
   - Headline: Total Annual Compensation (single number).
   - Donut chart: Base Salary, Bonus Target, RSU Equity value as proportional segments.
   - Three detail sections: Base Salary (annualized), Bonus/Commission Target, RSU value.
   - Job metadata: Role and Level from Workday.
   - Footer: Sync timestamps in absolute format — "Last synced from Workday: [timestamp]" and "Last synced from Shareworks: [timestamp]".
6. If Shareworks API call fails → equity section shows: "Equity data is currently unavailable. Please contact your administrator." (not $0, not hidden).
7. If Shareworks returns successfully but employee has zero grants → equity section shows: "No equity grants are currently available."

**Error states:**
- Shareworks API failure: "Equity data is currently unavailable. Please contact your administrator."
- Shareworks returns zero grants: "No equity grants are currently available."
- No Workday record found for user: "We couldn't find your compensation record. Please contact your administrator."

### Flow 2: Employee Models RSU Value

1. Employee is on the Total Rewards page.
2. Employee adjusts the share price slider ($20–$200).
3. **Only unvested equity value updates** in real-time as the slider moves. Vested equity value remains fixed at the historical share price on each vest date. Total compensation and donut chart update accordingly.
4. Employee navigates to the RSUs tab.
5. Sees the Vesting Schedule bar chart (vested value only, no legend) and the Equity Summary section with year filter tabs and scrollable grant list.
6. Selects an individual grant → detailed vesting schedule chart renders.
7. Vesting schedule shows quarterly vesting over 4 years from the vesting start date.

**Error states:**
- Shareworks API failure: "Equity data is currently unavailable. Please contact your administrator."
- No grants available (new hire): "No equity grants are currently available."
- Grant with all shares vested: Progress bar shows 100%; no future vesting events on timeline.

### Flow 3: Employee Accesses Resources

1. Employee clicks the "About" link in the navigation.
2. Resources section displays with external links: Atlassian Compensation, About Base Salary, About Equity, About Bonus, and Stock Central.
3. Legal Disclaimer section displays below with standard informational language.

---

## Assumptions

| # | Assumption |
|---|---|
| A1 | Okta is the sole identity provider; all the compensation tool users have an Okta account with a resolvable employee identifier. |
| A2 | Workday and Shareworks data is joined via a shared employee ID. |
| A3 | The Workday integration is already configured and data is flowing into the compensation tool. |
| A4 | The Shareworks integration is already configured and data is flowing into the compensation tool. |
| A5 | Currency is USD for all employees; multi-currency support is deferred. |
| A6 | Sync frequency defaults to daily (3:45 PM for Workday, 3:42 PM for Shareworks). Data ingestion configuration is handled outside the application. |
| A7 | When the Shareworks API call fails, the UI displays "Equity data is currently unavailable. Please contact your administrator." When Shareworks returns successfully but the employee has zero grants, the UI displays "No equity grants are currently available." In both cases, the equity section is visible and does not show $0. |
| A8 | The default share price for RSU modeling is the current TEAM stock price. The slider range is $20–$200. |
| A9 | Sync timestamps represent the time data was pulled from the source system. Timestamps are displayed in absolute format in a footer at the bottom of the page. Timestamps are per-source (Workday and Shareworks separately) so employees know the freshness of each data source independently. |
| A10 | The Total Rewards view is read-only. Employees cannot edit any compensation data. |
| A11 | Vested equity value is always calculated using the historical share price at each vest date (sourced from Shareworks). Only unvested equity value responds to the modeled share price slider. This distinction is applied consistently across all views and charts. |

