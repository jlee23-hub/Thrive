# Evaluation Data Set — Milestone 1

## Employee Total Rewards View & RSU Modeling

---

### Data Sources

| Source | Type | Purpose |
|---|---|---|
| Workday (Employee Compensation Records) | Production | Employee demographics, salary, level, job data |
| Workday (Compensation History) | Production | 2-year salary/bonus change history |
| Shareworks (Equity Grants + Vesting Schedule) | Production | RSU grants, vesting events, current FMV |
| Synthetic test records | Generated | Edge cases (e.g., no equity, fully vested) |

---

### View-Specific Data Expectations

| View | What the User Sees | Key Validation |
|---|---|---|
| Employee Total Rewards | Own base salary, bonus %, equity value, total comp, per-source sync timestamps | Values match Workday + Shareworks source data exactly; timestamps reflect actual last sync per system |
| Employee Total Rewards (no equity) | Error message in equity section; salary and bonus still display | "Equity data is currently unavailable" message shown; base salary and bonus render correctly |
| Employee RSUs | Own grants only, vesting timeline, share price modeler | Modeled value updates when slider moves; vesting dates and units are correct |
| Employee RSUs (fully vested) | All grants at 100% progress; no future vesting events | Progress bar shows 100%; no upcoming vesting dates |

---

### Example Test Cases

| # | Scenario | Expected Result |
|---|---|---|
| TC-1 | Employee at P40, Zone 1, with 2 RSU grants | Total Rewards shows correct base + bonus + equity sum; RSU tab shows 2 grants; both Workday and Shareworks sync timestamps visible |
| TC-2 | Employee with no Shareworks data (new hire, no grants) | Equity section shows error message; base salary and bonus display correctly from Workday |
| TC-3 | Employee adjusts share price slider from $80 to $150 | Equity value, total compensation, and donut chart update proportionally in real-time |
| TC-4 | Employee with a single grant, all shares vested | Vesting progress shows 100%; no future vesting events on timeline |
| TC-5 | Employee views RSU tab with 3 grants, selects second grant | Vesting schedule chart and area chart update to show the selected grant's data |
| TC-6 | Employee with base salary but no bonus target in Workday | Bonus section shows $0 or "N/A"; total comp is base + equity only |
