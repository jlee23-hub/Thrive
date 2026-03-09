# Evaluation Data Set — Milestone 2.0

## Manager Team Planner View (Read-Only)

---

### Data Sources

| Source | Type | Purpose |
|---|---|---|
| Workday (Employee Compensation Records) | Production | Employee demographics, salary, level, job data, reporting hierarchy |
| Workday (Performance Ratings) | Production | Latest performance rating for each employee |
| Shareworks (Equity Grants) | Production | Current RSU grant data for each employee |
| Cycle Configuration (Bands) | Application | Salary band ranges — configured in Cycle Builder |
| Synthetic test records | Generated | Edge cases (e.g., new hire with no equity, manager with 1 report) |

---

### Active Cycle Context

| Field | Value |
|---|---|
| Cycle Name | FY26 Annual Equity Review |
| Cycle Type | Equity |
| Effective Date | 2026-04-01 |
| Status | Open |
| Share Price (default) | $80.00 |
| Last Synced from Workday | 2026-03-08 09:15 AM PST |
| Last Synced from Shareworks | 2026-03-08 09:12 AM PST |

---

### Manager Under Test

| Field | Value |
|---|---|
| Manager Name | Sarah Chen |
| Manager Employee ID | E-10042 |
| Manager Title | Senior Engineering Manager |
| Manager Level | M60 |
| Direct Reports | 8 |

---

### Team Planner Grid — Employee Records (8 Direct Reports)

#### Employee 1

| Column | Value |
|---|---|
| Employee Name | James Rodriguez |
| Employee ID | E-20101 |
| Job Title | Senior Software Engineer |
| Job Level | IC5 |
| Job Family | Engineering |
| Zone | Zone 1 |
| Start Date | 2021-06-14 |

| Current Base Salary | $198,800.00 |
| Bonus Target % | 15% |
| Current Equity (RSUs) | 2,400 |
| Performance Rating | Greatly Exceeds |
| % of SRP | 105% |

#### Employee 2

| Column | Value |
|---|---|
| Employee Name | Priya Patel |
| Employee ID | E-20102 |
| Job Title | Software Engineer II |
| Job Level | IC4 |
| Job Family | Engineering |
| Zone | Zone 1 |
| Start Date | 2022-01-10 |

| Current Base Salary | $165,000.00 |
| Bonus Target % | 12% |
| Current Equity (RSUs) | 1,200 |
| Performance Rating | Exceeds |
| % of SRP | 98% |

#### Employee 3

| Column | Value |
|---|---|
| Employee Name | Marcus Thompson |
| Employee ID | E-20103 |
| Job Title | Staff Software Engineer |
| Job Level | IC6 |
| Job Family | Engineering |
| Zone | Zone 2 |
| Start Date | 2019-03-22 |

| Current Base Salary | $225,500.00 |
| Bonus Target % | 18% |
| Current Equity (RSUs) | 4,800 |
| Performance Rating | Meets |
| % of SRP | 92% |

#### Employee 4

| Column | Value |
|---|---|
| Employee Name | Emily Nakamura |
| Employee ID | E-20104 |
| Job Title | Software Engineer I |
| Job Level | IC3 |
| Job Family | Engineering |
| Zone | Zone 1 |
| Start Date | 2024-08-05 |

| Current Base Salary | $135,000.00 |
| Bonus Target % | 10% |
| Current Equity (RSUs) | 600 |
| Performance Rating | Meets |
| % of SRP | 102% |

#### Employee 5

| Column | Value |
|---|---|
| Employee Name | David Kim |
| Employee ID | E-20105 |
| Job Title | Senior QA Engineer |
| Job Level | IC5 |
| Job Family | Quality Engineering |
| Zone | Zone 3 |
| Start Date | 2020-11-30 |

| Current Base Salary | $172,000.00 |
| Bonus Target % | 15% |
| Current Equity (RSUs) | 1,800 |
| Performance Rating | Exceeds |
| % of SRP | 110% |

#### Employee 6

| Column | Value |
|---|---|
| Employee Name | Aisha Johnson |
| Employee ID | E-20106 |
| Job Title | Engineering Manager |
| Job Level | M50 |
| Job Family | Engineering |
| Zone | Zone 1 |
| Start Date | 2020-02-17 |

| Current Base Salary | $210,000.00 |
| Bonus Target % | 20% |
| Current Equity (RSUs) | 3,200 |
| Performance Rating | Greatly Exceeds |
| % of SRP | 100% |

#### Employee 7

| Column | Value |
|---|---|
| Employee Name | Carlos Rivera |
| Employee ID | E-20107 |
| Job Title | Software Engineer II |
| Job Level | IC4 |
| Job Family | Engineering |
| Zone | Zone 2 |
| Start Date | 2023-05-08 |

| Current Base Salary | $152,000.00 |
| Bonus Target % | 12% |
| Current Equity (RSUs) | 800 |
| Performance Rating | Met Some |
| % of SRP | 88% |

#### Employee 8 (New Hire — No Equity)

| Column | Value |
|---|---|
| Employee Name | Lena Okafor |
| Employee ID | E-20108 |
| Job Title | Software Engineer I |
| Job Level | IC3 |
| Job Family | Engineering |
| Zone | Zone 1 |
| Start Date | 2025-12-01 |

| Current Base Salary | $140,000.00 |
| Bonus Target % | 10% |
| Current Equity (RSUs) | — |
| Performance Rating | Meets |
| % of SRP | 106% |

---

### Team Summary Card Expected Values

| Card | Value | Derivation |
|---|---|---|
| Team Headcount | 8 | Count of all direct reports |
| Total Current Equity (RSUs) | 14,800 | 2,400 + 1,200 + 4,800 + 600 + 1,800 + 3,200 + 800 + 0 (Lena has no equity) |

---

### View-Specific Data Expectations

| View | What the User Sees | Key Validation |
|---|---|---|
| Manager Team Planner (active cycle) | Read-only grid of 8 direct reports with current comp data, summary cards (headcount: 8, total equity: 14,800) | Grid shows all direct reports; summary card math is correct; all columns are read-only |
| Manager Team Planner (no active cycle) | "No active compensation cycle. Contact your Comp Admin." | Grid and summary cards are not rendered |
| Manager Team Planner (no direct reports) | "You have no direct reports in this cycle." | Grid renders empty state |

---

### Search Test Expectations

| Search Term | Matched Rows | Match Reason |
|---|---|---|
| "Rodriguez" | James Rodriguez | Employee Name match |
| "IC5" | James Rodriguez, David Kim | Job Level match |
| "Zone 2" | Marcus Thompson, Carlos Rivera | Zone match |
| "Quality" | David Kim | Job Family match ("Quality Engineering") |
| "Greatly Exceeds" | James Rodriguez, Aisha Johnson | Performance Rating match |
| "M50" | Aisha Johnson | Job Level match |
| "198800" | James Rodriguez | Current Base Salary match |
| "Engineering Manager" | Aisha Johnson | Job Title match |
| "2024" | Emily Nakamura | Start Date match |
| "xyz123" | (no results) | No column value matches |

---

### Filter Test Expectations

| Filter | Values Selected | Matched Rows | Count |
|---|---|---|---|
| Job Level | IC5 | James Rodriguez, David Kim | 2 |
| Zone | Zone 1 | James Rodriguez, Priya Patel, Emily Nakamura, Aisha Johnson, Lena Okafor | 5 |
| Performance Rating | Greatly Exceeds | James Rodriguez, Aisha Johnson | 2 |
| Performance Rating | Met Some | Carlos Rivera | 1 |
| Job Level + Zone | IC4 + Zone 1 | Priya Patel | 1 |
| Job Level + Zone | IC4 + Zone 2 | Carlos Rivera | 1 |
| Job Level + Performance Rating | IC5 + Exceeds | David Kim | 1 |

---

### Sort Test Expectations

| Sort Column | Direction | First Row | Last Row |
|---|---|---|---|
| Employee Name | Ascending | Aisha Johnson | Priya Patel |
| Employee Name | Descending | Priya Patel | Aisha Johnson |
| Current Base Salary | Ascending | Emily Nakamura ($135,000) | Marcus Thompson ($225,500) |
| Current Base Salary | Descending | Marcus Thompson ($225,500) | Emily Nakamura ($135,000) |
| Performance Rating | Descending (Greatly Exceeds first) | James Rodriguez or Aisha Johnson | Carlos Rivera (Met Some) |
| % of SRP | Ascending | Carlos Rivera (88%) | David Kim (110%) |
| Start Date | Ascending | Marcus Thompson (2019-03-22) | Lena Okafor (2025-12-01) |
| Current Equity (RSUs) | Descending | Marcus Thompson (4,800) | Lena Okafor (—) |

---

### Pin/Unpin Test Expectations

| Action | Pinned Columns (Left) | Scrollable Columns |
|---|---|---|
| Default on load | Employee Name | All other columns |
| Pin Employee ID | Employee Name, Employee ID | All other columns |
| Pin Employee Name + Job Level | Employee Name, Job Level | All other columns |
| Unpin Employee Name | (none, or only other pinned columns) | Employee Name returns to scrollable area |

---

### Edge Case Scenarios

| # | Scenario | Expected Result |
|---|---|---|
| EC-1 | Employee with no Shareworks data (Lena Okafor) | Current Equity column shows "—" or "0 RSUs"; all other columns populated from Workday |
| EC-2 | Manager with exactly 1 direct report | Grid shows 1 row; summary cards show headcount 1; pagination not shown |
| EC-3 | Manager with 15 direct reports (exceeds page size) | Pagination appears; first page shows 10 rows; second page shows 5 rows |
| EC-4 | Manager has no direct reports | "You have no direct reports in this cycle." message; no grid rendered |
| EC-5 | No active compensation cycle | "No active compensation cycle. Contact your Comp Admin." message; no grid or summary cards rendered |
| EC-6 | Workday data unavailable for a field on one employee | Row renders with available data; missing fields show "—" |
| EC-7 | Manager switches from "My Team" to "My View" | Navigation switches to personal Total Rewards dashboard (Milestone 1); Team Planner state is not lost on return |
| EC-8 | Search returns zero results | Grid shows empty state with message; summary cards show 0 headcount and 0 total equity |
| EC-9 | All filters cleared after narrowing results | Full grid restored (8 rows); filter indicators removed; summary cards show full team totals |
| EC-10 | Employee who is also a manager (Aisha Johnson, M50) | Row shows a drill-down indicator; clicking into her row shows her 3 direct reports in the same grid format; breadcrumb shows "My Team > Aisha Johnson's Team" |
| EC-11 | Manager drills into skip-level view, then clicks "My Team" breadcrumb | Grid returns to Sarah Chen's 8 direct reports; summary cards restore to headcount 8, total equity 14,800 |
| EC-12 | Direct report who is not a manager (e.g., James Rodriguez, IC5) | No drill-down indicator on the row; clicking does not navigate anywhere |

---

### Skip-Level Data — Aisha Johnson's Direct Reports (3 employees)

Aisha Johnson (E-20106, Engineering Manager, M50) has 3 direct reports. When Sarah Chen clicks into Aisha's row, the grid shows these employees:

#### Skip-Level Employee 1

| Column | Value |
|---|---|
| Employee Name | Nina Vasquez |
| Employee ID | E-30201 |
| Job Title | Software Engineer II |
| Job Level | IC4 |
| Job Family | Engineering |
| Zone | Zone 1 |
| Start Date | 2023-02-13 |

| Current Base Salary | $158,000.00 |
| Bonus Target % | 12% |
| Current Equity (RSUs) | 1,000 |
| Performance Rating | Exceeds |
| % of SRP | 96% |

#### Skip-Level Employee 2

| Column | Value |
|---|---|
| Employee Name | Ryan O'Brien |
| Employee ID | E-30202 |
| Job Title | Software Engineer I |
| Job Level | IC3 |
| Job Family | Engineering |
| Zone | Zone 1 |
| Start Date | 2024-06-03 |

| Current Base Salary | $132,000.00 |
| Bonus Target % | 10% |
| Current Equity (RSUs) | 400 |
| Performance Rating | Meets |
| % of SRP | 100% |

#### Skip-Level Employee 3

| Column | Value |
|---|---|
| Employee Name | Tomoko Sato |
| Employee ID | E-30203 |
| Job Title | Senior Software Engineer |
| Job Level | IC5 |
| Job Family | Engineering |
| Zone | Zone 2 |
| Start Date | 2021-09-20 |

| Current Base Salary | $185,000.00 |
| Bonus Target % | 15% |
| Current Equity (RSUs) | 2,000 |
| Performance Rating | Greatly Exceeds |
| % of SRP | 101% |

#### Skip-Level Summary Card Expected Values

| Card | Value | Derivation |
|---|---|---|
| Team Headcount | 3 | Count of Aisha Johnson's direct reports |
| Total Current Equity (RSUs) | 3,400 | 1,000 + 400 + 2,000 |

---

### Performance Rating Display

| Rating Value | Lozenge Appearance | Color |
|---|---|---|
| Greatly Exceeds | success | Green |
| Exceeds | inprogress | Blue |
| Meets | default | Default (gray) |
| Met Some | moved | Yellow |

---

### % of SRP Display

| Condition | Color |
|---|---|
| Below 100% | Red |
| At or above 100% | Green |

Employees below 100%: Marcus Thompson (92%), Priya Patel (98%), Carlos Rivera (88%)
Employees at or above 100%: James Rodriguez (105%), Emily Nakamura (102%), David Kim (110%), Aisha Johnson (100%), Lena Okafor (106%)
