# Canonical Data Tables — Milestone 1

---

## Shareworks (Equity Management)

| # | Source Field | Data Type | Description |
|---|---|---|---|
| 1 | Full Name | String | Employee's full legal name |
| 2 | Email | String | Employee's email address |
| 3 | Employee Number | String | Unique employee identifier (used to join with Workday) |
| 4 | Plan Name | String | Name of the equity plan |
| 5 | Employee Grant Number | String | Unique identifier for the specific grant |
| 6 | Grant Date | Date | Date the equity grant was issued |
| 7 | Award Name - Full | String | Full descriptive name of the award |
| 8 | Equity Award Type | String | Type of equity award (e.g., RSU, ISO, NSO) |
| 9 | Employee Grant Creation Date | Date | Date the grant record was created in Shareworks |
| 10 | Grant Price | Currency | Price per share at the time of grant |
| 11 | Grant Quantity | Integer | Total number of shares granted |
| 12 | Exercised/Released Unvested | Integer | Number of shares exercised or released while unvested |
| 13 | Expire Date | Date | Expiration date of the grant |
| 14 | Vesting Start Date | Date | Date vesting begins for the grant |
| 15 | Vested | Integer | Number of shares that have vested |
| 16 | Cancelled or Expired Vested | Integer | Number of vested shares that were cancelled or expired |
| 17 | Cancelled or Expired Unvested | Integer | Number of unvested shares that were cancelled or expired |
| 18 | Vest Schedule Name | String | Name of the vesting schedule applied to the grant |
| 19 | Vest Schedule Description | String | Description of the vesting schedule terms |
| 20 | Vest Date | Date | Date of a specific vesting event |
| 21 | Vest Quantity | Integer | Number of shares vesting on the vest date |

---

## Workday — Compensation Table

| # | Source Field | Data Type | Description |
|---|---|---|---|
| 1 | Employee ID | String | Unique employee identifier (used to join with Shareworks) |
| 2 | CF Worker Email ID | String | Employee's email address |
| 3 | Effective Date | Date | Date the compensation change takes effect |
| 4 | Date and Time Completed | DateTime | Timestamp when the compensation action was completed |
| 5 | Status | String | Status of the compensation event |
| 6 | Pay Rate Type - Proposed | String | Type of pay rate (e.g., salary, hourly) |
| 7 | Primary Compensation Basis Amount - Proposed | Currency | Proposed base compensation amount |
| 8 | Currency - Proposed | String | Currency code for the proposed compensation (e.g., USD) |
| 9 | Bonus Percent - Proposed | Decimal | Proposed bonus target as a percentage |
| 10 | CF EVAL Proposed Unprorated Annualized Base Pay | Currency | Proposed annualized base pay (unprorated) |
| 11 | Bonus Amount - Proposed | Currency | Proposed bonus dollar amount |
| 12 | Commission Amount - Proposed | Currency | Proposed commission dollar amount |
