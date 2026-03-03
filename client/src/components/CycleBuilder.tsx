import React, { useState, useEffect } from "react";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import Button, { IconButton } from "@atlaskit/button/new";
import Textfield from "@atlaskit/textfield";
import TextArea from "@atlaskit/textarea";
import Select from "@atlaskit/select";
import Lozenge from "@atlaskit/lozenge";
import DynamicTable from "@atlaskit/dynamic-table";
import SectionMessage from "@atlaskit/section-message";
import InlineMessage from "@atlaskit/inline-message";
import Checkbox from "@atlaskit/checkbox";
import Toggle from "@atlaskit/toggle";

import PageIcon from "@atlaskit/icon/core/page";
import AddIcon from "@atlaskit/icon/core/add";
import UploadIcon from "@atlaskit/icon/core/upload";
import DownloadIcon from "@atlaskit/icon/core/download";
import CheckMarkIcon from "@atlaskit/icon/core/check-mark";
import ChevronLeftIcon from "@atlaskit/icon/core/chevron-left";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ChevronUpIcon from "@atlaskit/icon/core/chevron-up";
import LockLockedIcon from "@atlaskit/icon/core/lock-locked";
import EditIcon from "@atlaskit/icon/core/edit";
import DeleteIcon from "@atlaskit/icon/core/delete";
import SearchIcon from "@atlaskit/icon/core/search";
import ErrorIcon from "@atlaskit/icon/core/error";
import CrossIcon from "@atlaskit/icon/core/cross";
import ClockIcon from "@atlaskit/icon/core/clock";
import PersonIcon from "@atlaskit/icon/core/person";
import EmailIcon from "@atlaskit/icon/core/email";
import ShieldIcon from "@atlaskit/icon/core/shield";
import SettingsIcon from "@atlaskit/icon/core/settings";
import GlobeIcon from "@atlaskit/icon/core/globe";
import CreditCardIcon from "@atlaskit/icon/core/credit-card";
import ListBulletedIcon from "@atlaskit/icon/core/list-bulleted";
import TableIcon from "@atlaskit/icon/core/table";
import CheckCircleIcon from "@atlaskit/icon/core/check-circle";
import AlertIcon from "@atlaskit/icon/core/alert";
import InformationIcon from "@atlaskit/icon/core/information";
import PeopleGroupIcon from "@atlaskit/icon/core/people-group";
import EyeOpenIcon from "@atlaskit/icon/core/eye-open";
import SpreadsheetIcon from "@atlaskit/icon/core/spreadsheet";
import FilterIcon from "@atlaskit/icon/core/filter";
import SortAscendingIcon from "@atlaskit/icon/core/sort-ascending";
import TableColumnsDistributeIcon from "@atlaskit/icon/core/table-columns-distribute";
import PersonAddIcon from "@atlaskit/icon/core/person-add";
import { RadioGroup } from "@atlaskit/radio";

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: token("border.radius.300"),
  padding: token("space.400"),
  boxShadow: token("elevation.shadow.raised"),
};

type Step = {
  id: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  { id: "details", title: "Cycle Details", description: "Name, year, and type" },
  { id: "import", title: "Data Integrations", description: "Employee and comp data" },
  { id: "columns", title: "Employee data grid", description: "Configure data fields" },
  { id: "eligibility", title: "Eligibility Rules", description: "Define participation criteria" },
  { id: "budget", title: "Configure budget & FX rates", description: "Set budget and exchange rates" },
  { id: "salary-bands", title: "Salary Bands & Equity Targets", description: "Upload and manage salary bands" },
  { id: "users", title: "Users & Role Permissions", description: "Manage user access" },
  { id: "field-permissions", title: "Field Permissions", description: "Configure field access" },
  { id: "reward-letter", title: "Reward Letter", description: "Configure reward letters" },
  { id: "review", title: "Review & Finalize", description: "Review all settings" },
];

interface CycleBuilderProps {
  onBack: () => void;
}

const duplicateOptions = [
  { label: "None - Start from scratch", value: "none" },
  { label: "2025 Annual Merit Cycle", value: "merit-2025" },
  { label: "Q4 2025 Equity Refresh", value: "equity-q4-2025" },
  { label: "2025 Promotion Cycle", value: "promo-2025" },
];

const typeOptions = [
  { label: "Merit", value: "merit" },
  { label: "Promotion", value: "promotion" },
  { label: "Equity", value: "equity" },
  { label: "Combined (Merit + Promo + Equity)", value: "all" },
];

const uploadHistory = [
  {
    name: "employee_comp_data_v3.xlsx",
    date: "Feb 25, 2026 2:45 PM",
    size: "2.4 MB",
    records: 1247,
    status: "failed" as const,
    errors: 5,
    errorDetails: [
      { row: 4, empName: "Sarah Miller", col: "Employee ID", issue: "Missing required value" },
      { row: 12, empName: "James Wilson", col: "Base Salary", issue: "Invalid currency format" },
      { row: 23, empName: "Robert Chen", col: "Employee ID", issue: "Duplicate Employee ID: EMP-2847" },
      { row: 28, empName: "Emily Davis", col: "Start Date", issue: "Date format must be YYYY-MM-DD" },
      { row: 41, empName: "David Martinez", col: "Email", issue: "Non-breaking space detected in email" },
    ],
  },
  {
    name: "employee_comp_data_v2.xlsx",
    date: "Feb 25, 2026 1:30 PM",
    size: "2.3 MB",
    records: 1245,
    status: "success" as const,
    errors: 0,
  },
  {
    name: "employee_comp_data_v1.csv",
    date: "Feb 24, 2026 4:15 PM",
    size: "1.8 MB",
    records: 1240,
    status: "success" as const,
    errors: 0,
  },
];

const workdayFields = [
  { field: "Employee ID", column: "employeeWkRef", desc: "Unique identifier from Workday" },
  { field: "First Name", column: "firstName", desc: "Legal first name" },
  { field: "Last Name", column: "lastName", desc: "Legal last name" },
  { field: "Email", column: "email", desc: "Corporate email address", isUpdated: true },
  { field: "Job Title", column: "title", desc: "Current job title" },
  { field: "Level", column: "level", desc: "Job level (IC1-VP)", isUpdated: true },
  { field: "Department", column: "department", desc: "Organizational department" },
  { field: "Location", column: "location", desc: "Primary work location", isUpdated: true },
  { field: "Manager", column: "managerId", desc: "Reporting manager reference" },
  { field: "Hire Date", column: "hireDate", desc: "Original hire date" },
  { field: "Performance Rating", column: "performanceRating", desc: "Latest annual rating" },
  { field: "H1 Performance", column: "h1PerformanceRating", desc: "Mid-year performance rating" },
  { field: "Base Salary", column: "currentSalary", desc: "Current annual base salary", isUpdated: true },
  { field: "Bonus Target %", column: "bonusTarget", desc: "Target bonus percentage" },
  { field: "Currency", column: "currency", desc: "Pay currency code" },
  { field: "Job Family", column: "jobFamily", desc: "Workday job family classification" },
  { field: "Job Profile", column: "jobProfile", desc: "Specific job profile", isUpdated: true },
  { field: "Job Profile ID", column: "jobProfileWorkdayId", desc: "Workday internal job profile ID" },
  { field: "Geographic Zone", column: "geographicZone", desc: "Compensation zone grouping" },
  { field: "Business Title", column: "businessTitle", desc: "External-facing title" },
  { field: "Position Start", column: "startDate", desc: "Current position start date" },
  { field: "Time in Role", column: "timeInJobProfile", desc: "Duration in current job profile" },
  { field: "Tenure", column: "tenure", desc: "Total years with the organization", isUpdated: true },
  { field: "FTE %", column: "ftePercent", desc: "Full-time equivalent percentage" },
  { field: "Country", column: "country", desc: "Country of employment" },
  { field: "Position ID", column: "positionId", desc: "Workday position identifier" },
  { field: "Subsidiary", column: "subsidiary", desc: "Legal entity / subsidiary" },
  { field: "Supervisory Org", column: "supervisoryOrg", desc: "Supervisory organization" },
  { field: "FX Rate", column: "fxRate", desc: "Foreign exchange rate to USD" },
  { field: "Hourly/Salaried", column: "paidHourly", desc: "Compensation type indicator" },
  { field: "Commission", column: "commission", desc: "Commission amount if applicable" },
  { field: "Target Bonus $", column: "currentTargetBonus", desc: "Calculated target bonus amount" },
];

const shareworksFields = [
  { field: "Grant Date", column: "grantDate", desc: "Date equity was granted" },
  { field: "Grant Type", column: "grantType", desc: "RSU, ISO, NSO, etc." },
  { field: "Total Units", column: "totalUnits", desc: "Total shares/units granted" },
  { field: "Vested Units", column: "vestedUnits", desc: "Units vested to date" },
  { field: "Vesting Schedule", column: "vestingSchedule", desc: "Vesting cadence (e.g. 4-year)" },
  { field: "Grant Price", column: "grantPrice", desc: "Price at grant date" },
  { field: "Current Price", column: "currentPrice", desc: "Current share price" },
  { field: "Vest Start", column: "vestingStartDate", desc: "Vesting commencement date" },
  { field: "Vest End", column: "vestingEndDate", desc: "Final vesting date" },
  { field: "Current Equity $", column: "currentEquity", desc: "Total current equity value on employee record" },
];

const employeeData = [
  { id: "EMP-00001", firstName: "Sarah", lastName: "Chen", title: "VP of Compensation", level: "M90", dept: "HR", location: "Zone A USA", rating: "Greatly Exceeded", salary: 180000, commission: null as number | null, bonus: 20.0, equity: null as number | null },
  { id: "EMP-00002", firstName: "Michael", lastName: "Johnson", title: "SVP of Engineering", level: "M100", dept: "Engineering", location: "Zone B USA", rating: "Exceeded", salary: 220000, commission: null, bonus: 30.0, equity: 150000 },
  { id: "EMP-00003", firstName: "Lisa", lastName: "Patel", title: "Director of Product", level: "M60", dept: "Product", location: "Zone A USA", rating: "Met", salary: 175000, commission: null, bonus: 20.0, equity: 75000 },
  { id: "EMP-00004", firstName: "James", lastName: "Anderson", title: "Senior Product Manager", level: "M50", dept: "Product", location: "Zone C USA", rating: "Exceeded", salary: 155000, commission: null, bonus: 15.0, equity: 50000 },
  { id: "EMP-00005", firstName: "Emily", lastName: "Williams", title: "Engineering Manager", level: "M50", dept: "Engineering", location: "Zone A USA", rating: "Met", salary: 165000, commission: null, bonus: 15.0, equity: 60000 },
  { id: "EMP-00006", firstName: "David", lastName: "Martinez", title: "Staff Engineer", level: "P70", dept: "Engineering", location: "Zone B USA", rating: "Greatly Exceeded", salary: 190000, commission: null, bonus: 15.0, equity: 80000 },
  { id: "EMP-00007", firstName: "Jessica", lastName: "Brown", title: "Senior Designer", level: "P60", dept: "Design", location: "Zone A USA", rating: "Met Some", salary: 145000, commission: null, bonus: 10.0, equity: null },
  { id: "EMP-00008", firstName: "Robert", lastName: "Davis", title: "Senior Software Engineer", level: "P60", dept: "Engineering", location: "Zone B USA", rating: "Met", salary: 160000, commission: null, bonus: 10.0, equity: 45000 },
  { id: "EMP-00009", firstName: "Amanda", lastName: "Wilson", title: "Product Marketing Manager", level: "P50", dept: "Marketing", location: "Zone C USA", rating: "Did Not Meet", salary: 130000, commission: null, bonus: 10.0, equity: null },
  { id: "EMP-00010", firstName: "Christopher", lastName: "Taylor", title: "HR Business Partner", level: "P50", dept: "HR", location: "Zone C USA", rating: "Met", salary: 120000, commission: null, bonus: 10.0, equity: null },
  { id: "EMP-00011", firstName: "Jennifer", lastName: "Moore", title: "Data Scientist", level: "P60", dept: "Data Science", location: "Zone A USA", rating: "Exceeded", salary: 170000, commission: null, bonus: 10.0, equity: 55000 },
  { id: "EMP-00012", firstName: "Daniel", lastName: "Jackson", title: "Sales Director", level: "M60", dept: "Sales", location: "Zone B USA", rating: "Exceeded", salary: 165000, commission: 40.0, bonus: 25.0, equity: null },
];

const excludedEmployees = [
  { name: "Alex Thompson", id: "EMP-00067", dept: "Engineering", startDate: "April 15, 2026", empType: "Regular", reason: "Start Date", detail: "Started after March 31, 2026 cutoff" },
  { name: "Marcus Johnson", id: "EMP-00089", dept: "Sales", startDate: "January 12, 2024", empType: "Contractor", reason: "Employment Type", detail: "Not Regular or Definite employment type" },
  { name: "Sophie Chen", id: "EMP-00134", dept: "Marketing", startDate: "August 3, 2025", empType: "Temporary", reason: "Employment Type", detail: "Not Regular or Definite employment type" },
  { name: "Daniel Rodriguez", id: "EMP-00421", dept: "Engineering", startDate: "April 8, 2026", empType: "Definite", reason: "Start Date", detail: "Started after March 31, 2026 cutoff" },
  { name: "Emma Watson", id: "EMP-00156", dept: "Design", startDate: "February 20, 2025", empType: "Intern", reason: "Employment Type", detail: "Not Regular or Definite employment type" },
  { name: "James Park", id: "EMP-00398", dept: "Operations", startDate: "May 10, 2026", empType: "Regular", reason: "Start Date", detail: "Started after March 31, 2026 cutoff" },
  { name: "Olivia Martinez", id: "EMP-00267", dept: "Finance", startDate: "November 5, 2024", empType: "Consultant", reason: "Employment Type", detail: "Not Regular or Definite employment type" },
];

const fxRates = [
  { currency: "Euro", code: "EUR", rate: "0.92", updated: "2024-01-15", updatedBy: "Sarah Chen" },
  { currency: "British Pound", code: "GBP", rate: "0.79", updated: "2024-01-15", updatedBy: "Sarah Chen" },
  { currency: "Indian Rupee", code: "INR", rate: "83.12", updated: "2024-01-15", updatedBy: "Sarah Chen" },
  { currency: "Canadian Dollar", code: "CAD", rate: "1.34", updated: "2024-01-15", updatedBy: "Sarah Chen" },
  { currency: "Australian Dollar", code: "AUD", rate: "1.48", updated: "2024-01-15", updatedBy: "Sarah Chen" },
  { currency: "Japanese Yen", code: "JPY", rate: "148.23", updated: "2024-01-15", updatedBy: "Sarah Chen" },
];

const deptBudgets = [
  { dept: "Engineering", headcount: 145, meritBudget: "725,000", meritPct: "3.5", bonusBudget: "290,000", bonusPct: "10.0" },
  { dept: "Product", headcount: 42, meritBudget: "189,000", meritPct: "3.0", bonusBudget: "84,000", bonusPct: "8.0" },
  { dept: "Sales", headcount: 78, meritBudget: "312,000", meritPct: "2.5", bonusBudget: "390,000", bonusPct: "15.0" },
  { dept: "Marketing", headcount: 35, meritBudget: "122,500", meritPct: "2.5", bonusBudget: "70,000", bonusPct: "7.0" },
  { dept: "Operations", headcount: 56, meritBudget: "168,000", meritPct: "3.0", bonusBudget: "84,000", bonusPct: "6.0" },
  { dept: "Finance", headcount: 28, meritBudget: "98,000", meritPct: "3.5", bonusBudget: "56,000", bonusPct: "8.0" },
];

const salaryBands = [
  { level: "P30 - Junior", srp: "$75,000", rangeMax: "$95,000", equityMax: "$15,000" },
  { level: "P40 - Mid-Level", srp: "$95,000", rangeMax: "$120,000", equityMax: "$25,000" },
  { level: "P50 - Senior", srp: "$120,000", rangeMax: "$150,000", equityMax: "$40,000" },
  { level: "P60 - Staff", srp: "$150,000", rangeMax: "$185,000", equityMax: "$60,000" },
  { level: "P70 - Principal", srp: "$185,000", rangeMax: "$230,000", equityMax: "$85,000" },
  { level: "P80 - Senior Principal", srp: "$230,000", rangeMax: "$280,000", equityMax: "$120,000" },
  { level: "P90 - Distinguished", srp: "$280,000", rangeMax: "$350,000", equityMax: "$175,000" },
];

const users = [
  { name: "System Administrator", username: "@admin1", email: "admin@compvista.com", linked: "Sarah Chen (EMP-00001)", role: "admin", permissions: "APEX System Admin | Comp", active: true },
  { name: "Team Manager", username: "@manager1", email: "manager@compvista.com", linked: "Lisa Patel (EMP-00003)", role: "manager", permissions: "", active: true },
  { name: "Org Leader", username: "@leader1", email: "leader@compvista.com", linked: "Michael Johnson (EMP-00002)", role: "leader", permissions: "APEX Executive Planner", active: true },
  { name: "Comp Planner", username: "@planner1", email: "planner@compvista.com", linked: "Emily Williams (EMP-00005)", role: "planner", permissions: "APEX Planner + Full Budget View", active: true },
  { name: "HR Business Partner", username: "@hrbp1", email: "hrbp@compvista.com", linked: "Christopher Taylor (EMP-00010)", role: "hrbp", permissions: "APEX System Admin | HRBP", active: true },
  { name: "Demo Employee", username: "@employee1", email: "employee@compvista.com", linked: "Chris Williams (EMP-00004)", role: "employee", permissions: "", active: true },
];

type ColumnField = {
  id: string;
  name: string;
  variable: string;
  dataSource: "Integration" | "User Input or Data Upload" | "Computed" | "Checkbox";
  displayType: "Text" | "Number" | "Currency" | "Percentage" | "Yes/No" | "Frozen";
  rewardLetter: boolean;
  columnDefault: "Visible" | "Hidden";
  locked: boolean;
  visible: boolean;
  editable: boolean;
  permissions: { role: string; appearance: "default" | "success" | "inprogress" | "moved" | "removed" | "new" }[];
};

const fieldPermissionsData: ColumnField[] = [
  { id: "employeeName", name: "Employee", variable: "empName", dataSource: "Integration", displayType: "Frozen", rewardLetter: false, columnDefault: "Visible", locked: true, visible: true, editable: true, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "employeeId", name: "Employee ID", variable: "empId001", dataSource: "Integration", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: true, visible: true, editable: true, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "geographicZone", name: "Geographic Zone", variable: "geo", dataSource: "Integration", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "prorated", name: "Prorated?", variable: "isProrated", dataSource: "User Input or Data Upload", displayType: "Checkbox", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "Admin", appearance: "removed" }, { role: "All Other Users Can View", appearance: "default" }] },
  { id: "jobFamily", name: "Non - Process Job Family Charge", variable: "csPharmact7MrCharge", dataSource: "User Input or Data Upload", displayType: "Checkbox", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "jobProfile", name: "New Job Profile (Proposed)", variable: "newJobProfile", dataSource: "User Input or Data Upload", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "Admin", appearance: "removed" }] },
  { id: "h1Rating", name: "H1 Rating # FY23", variable: "h1RatingNumericValue", dataSource: "Computed", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "h2Rating", name: "H2 Rating FY23", variable: "h2RatingMadebyManager", dataSource: "Computed", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "newSalary", name: "New Salary (Annualized)", variable: "newSalary", dataSource: "Computed", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "apexEquityTarget", name: "APEX Equity Target (pre-vested)", variable: "fullBaseEquityTargetCompBase", dataSource: "User Input or Data Upload", displayType: "Number", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "CRP Zone", appearance: "inprogress" }, { role: "Columns Gr...", appearance: "moved" }, { role: "All Other Users Can Not View", appearance: "default" }] },
  { id: "meritApex", name: "Modeled APEX Multiplier", variable: "modeledApexMultiplier", dataSource: "User Input or Data Upload", displayType: "Percentage", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "CRP Zone", appearance: "inprogress" }, { role: "CRP ZU an...", appearance: "inprogress" }, { role: "HRBP All Role...", appearance: "moved" }, { role: "APEX Syste...", appearance: "success" }] },
  { id: "refreshEquity", name: "Refresh Equity (USD)", variable: "equity1RefreshAmount", dataSource: "User Input or Data Upload", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "CRP Zone", appearance: "inprogress" }, { role: "APEX Plans...", appearance: "success" }, { role: "CRP Org an...", appearance: "inprogress" }, { role: "All Other Users Can View", appearance: "default" }] },
  { id: "maxEquity", name: "Max Equity - (USD)", variable: "maxEquity", dataSource: "Computed", displayType: "Number", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "All Other Users Can View", appearance: "default" }] },
  { id: "futureTermination", name: "Future termination", variable: "futureTermDate", dataSource: "User Input or Data Upload", displayType: "Checkbox", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "All Users Can Not View", appearance: "default" }] },
  { id: "equityDiscretionJustification", name: "Equity Discretion Justification", variable: "deviationFromModelRat", dataSource: "User Input or Data Upload", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "APEX Basis...", appearance: "success" }, { role: "CRP Org an...", appearance: "inprogress" }] },
  { id: "equityDiscretionComments", name: "Equity Discretion Comments - Other", variable: "comments", dataSource: "User Input or Data Upload", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "CRP Zone", appearance: "inprogress" }, { role: "APEX Basis...", appearance: "success" }] },
  { id: "declineAppeal", name: "Decline/decline appeal?", variable: "isDeclined", dataSource: "Computed", displayType: "Yes/No", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "fy25SpecialEquity", name: "FY25 Special Equity Top", variable: "specialEquityTop", dataSource: "User Input or Data Upload", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "All Users Can Not View", appearance: "default" }] },
  { id: "fy19SpecialEquity", name: "FY19 Special Equity Recipient", variable: "fy19SpecialEquityRecipient", dataSource: "User Input or Data Upload", displayType: "Yes/No", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "HRBP Intro...", appearance: "moved" }, { role: "APEX Basis...", appearance: "success" }] },
  { id: "stockRank", name: "Stock Rank", variable: "stockRank", dataSource: "User Input or Data Upload", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "HRBP Role...", appearance: "moved" }, { role: "Columns De...", appearance: "moved" }] },
  { id: "specialEquityComponent", name: "Special Equity - Components", variable: "specialEquityBreakdownPayline", dataSource: "User Input or Data Upload", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "All Users Can Not View", appearance: "default" }] },
  { id: "specialEquityGrant", name: "Special Equity Grant (USD)", variable: "equityGrants", dataSource: "User Input or Data Upload", displayType: "Number", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "Admin", appearance: "removed" }, { role: "APEX Basis...", appearance: "success" }, { role: "Columns De...", appearance: "moved" }, { role: "APEX Syste...", appearance: "success" }] },
  { id: "lusoProm", name: "L500+ Promotion Equity (USD)", variable: "promoEquityGrantUsd", dataSource: "User Input or Data Upload", displayType: "Number", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "APEX Basis...", appearance: "success" }, { role: "Columns De...", appearance: "moved" }] },
  { id: "lusoRetention", name: "L500+ Retention Equity (USD)", variable: "retentionEquity", dataSource: "User Input or Data Upload", displayType: "Number", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [] },
  { id: "finalEquityMultiplier", name: "Final Equity Multiplier (%)", variable: "fullBaseEquityMultiplierPercentage", dataSource: "Computed", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, visible: true, editable: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "inti", name: "INTI Status", visible: true, editable: false, variable: "intiStatus", dataSource: "Integration", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "paidHourly", name: "Paid Hourly", visible: true, editable: false, variable: "paidHourly", dataSource: "Integration", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "location", name: "Location", visible: true, editable: false, variable: "location", dataSource: "Integration", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "businessTitle", name: "Business Title", visible: true, editable: false, variable: "businessTitle", dataSource: "User Input or Data Upload", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "CRP Zone", appearance: "inprogress" }, { role: "Admin", appearance: "removed" }, { role: "All Other Users Can Not View", appearance: "default" }] },
  { id: "department", name: "Department", visible: true, editable: true, variable: "dept", dataSource: "Integration", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "manager", name: "Manager", visible: true, editable: false, variable: "managerName", dataSource: "Integration", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "startDate", name: "Start Date", visible: true, editable: false, variable: "startDate", dataSource: "Integration", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "timeInJobProfile", name: "Time in Job Profile", visible: true, editable: false, variable: "timeInJobProfile", dataSource: "Computed", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "tenure", name: "Tenure", visible: true, editable: false, variable: "tenure", dataSource: "Computed", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "fte", name: "FTE %", visible: true, editable: false, variable: "ftePct", dataSource: "Computed", displayType: "Percentage", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "currentSalary", name: "Current Salary", visible: true, editable: true, variable: "currentSalary", dataSource: "Integration", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "Admin", appearance: "removed" }, { role: "APEX Basis...", appearance: "success" }, { role: "All Other Users Can Not View", appearance: "default" }] },
  { id: "currentTargetBonus", name: "Current Target Bonus", visible: true, editable: false, variable: "currentTargetBonus", dataSource: "Integration", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "currentEquity", name: "Current Equity", visible: true, editable: false, variable: "currentEquity", dataSource: "Integration", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "proposedSalary", name: "Proposed Salary", visible: true, editable: true, variable: "proposedSalary", dataSource: "User Input or Data Upload", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "CRP Zone", appearance: "inprogress" }, { role: "Admin", appearance: "removed" }, { role: "All Other Users Can Not View", appearance: "default" }] },
  { id: "proposedTargetBonus", name: "Proposed Target Bonus", visible: true, editable: false, variable: "proposedBonus", dataSource: "User Input or Data Upload", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "proposedEquity", name: "Proposed Equity", visible: true, editable: false, variable: "proposedEquity", dataSource: "User Input or Data Upload", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "CRP Zone", appearance: "inprogress" }, { role: "APEX Plans...", appearance: "success" }] },
  { id: "meritIncrease", name: "Merit Increase %", visible: true, editable: true, variable: "meritIncreasePct", dataSource: "Computed", displayType: "Percentage", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "meritIncreaseAmount", name: "Merit Increase Amount", visible: true, editable: false, variable: "meritIncreaseAmt", dataSource: "Computed", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "promotionIncrease", name: "Promotion Increase %", visible: true, editable: false, variable: "promotionIncrPct", dataSource: "Computed", displayType: "Percentage", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "promotionAmount", name: "Promotion Amount", visible: true, editable: false, variable: "promotionAmt", dataSource: "Computed", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "oneTimeBonus", name: "One-Time Bonus", visible: true, editable: true, variable: "oneTimeBonus", dataSource: "User Input or Data Upload", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "Admin", appearance: "removed" }, { role: "APEX Basis...", appearance: "success" }] },
  { id: "equityGrant", name: "Equity Grant", visible: true, editable: false, variable: "equityGrant", dataSource: "User Input or Data Upload", displayType: "Number", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
  { id: "totalCompensation", name: "Total Compensation", visible: true, editable: false, variable: "totalComp", dataSource: "Computed", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" }] },
];

const fxChangeHistory = [
  { date: "2024-01-15 14:23:45", user: "Sarah Chen", action: "Imported FX Rates", details: "Updated 6 currencies from CSV file", source: "CSV Import" },
  { date: "2024-01-10 09:15:22", user: "Michael Johnson", action: "Updated EUR Rate", details: "Changed from 0.89 to 0.92", source: "Manual Edit" },
  { date: "2024-01-08 16:42:18", user: "Sarah Chen", action: "Updated INR Rate", details: "Changed from 82.45 to 83.12", source: "Manual Edit" },
];

function SuccessAnimation({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"circle" | "check" | "text" | "confetti" | "done">("circle");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("check"), 500);
    const t2 = setTimeout(() => setPhase("confetti"), 1000);
    const t3 = setTimeout(() => setPhase("text"), 1600);
    const t4 = setTimeout(() => setPhase("done"), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const confettiColors = [
    token("color.background.brand.bold"),
    token("color.background.success.bold"),
    token("color.background.warning.bold"),
    token("color.background.danger.bold"),
    token("color.background.discovery.bold"),
    token("color.background.information.bold"),
  ];

  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => {
      const angle = (i / 40) * 360;
      const distance = 80 + Math.random() * 160;
      const size = 4 + Math.random() * 8;
      const color = confettiColors[i % confettiColors.length];
      const delay = Math.random() * 0.3;
      const isRect = i % 3 !== 0;
      return { angle, distance, size, color, delay, isRect };
    })
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: token("elevation.surface"),
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes circleScale {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes drawCheck {
          0% { stroke-dashoffset: 48; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes circleStroke {
          0% { stroke-dashoffset: 283; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>

      <div style={{ position: "relative", width: 200, height: 200 }}>
        {(phase === "confetti" || phase === "text" || phase === "done") && (
          <div style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0 }}>
            {particles.map((p, i) => {
              const radians = (p.angle * Math.PI) / 180;
              const tx = Math.cos(radians) * p.distance;
              const ty = Math.sin(radians) * p.distance;
              const name = `confetti-${i}`;
              return (
                <React.Fragment key={i}>
                  <style>{`
                    @keyframes ${name} {
                      0% { transform: translate(0, 0) scale(0); opacity: 1; }
                      50% { opacity: 1; }
                      100% { transform: translate(${tx}px, ${ty}px) scale(1); opacity: 0; }
                    }
                  `}</style>
                  <div
                    style={{
                      position: "absolute",
                      width: p.size,
                      height: p.isRect ? p.size * 0.4 : p.size,
                      borderRadius: p.isRect ? 2 : "50%",
                      backgroundColor: p.color,
                      animation: `${name} 0.9s ${p.delay}s ease-out forwards`,
                      opacity: 0,
                    }}
                  />
                </React.Fragment>
              );
            })}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `3px solid ${token("color.border.success")}`,
            animation: phase !== "circle" ? "pulseRing 1s ease-out forwards" : "none",
            opacity: phase !== "circle" ? 0.4 : 0,
          }}
        />

        <svg
          viewBox="0 0 100 100"
          style={{
            width: 200,
            height: 200,
            animation: "circleScale 0.5s ease-out forwards",
          }}
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={token("color.border.success")}
            strokeWidth="3"
            strokeDasharray="283"
            strokeDashoffset="283"
            strokeLinecap="round"
            style={{
              animation: "circleStroke 0.7s 0.1s ease-out forwards",
              transformOrigin: "center",
              transform: "rotate(-90deg)",
            }}
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill={token("color.background.success")}
            opacity={phase !== "circle" ? 1 : 0}
            style={{ transition: "opacity 0.4s ease" }}
          />
          {(phase === "check" || phase === "confetti" || phase === "text" || phase === "done") && (
            <polyline
              points="30,52 44,66 70,38"
              fill="none"
              stroke={token("color.icon.success")}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="48"
              strokeDashoffset="48"
              style={{ animation: "drawCheck 0.4s 0.1s ease-out forwards" }}
            />
          )}
        </svg>
      </div>

      <div
        style={{
          marginTop: token("space.400"),
          textAlign: "center",
          opacity: phase === "text" || phase === "done" ? 1 : 0,
          transform: phase === "text" || phase === "done" ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease-out",
        }}
      >
        <Heading size="large">Cycle Finalized</Heading>
        <div style={{ marginTop: token("space.100"), maxWidth: 400 }}>
          <Text size="medium" color="color.text.subtlest">
            Your compensation cycle has been successfully created and is ready for activation.
          </Text>
        </div>
      </div>

      <div
        style={{
          marginTop: token("space.400"),
          opacity: phase === "done" ? 1 : 0,
          transform: phase === "done" ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.4s ease-out",
        }}
      >
        <Button appearance="primary" onClick={onDone}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}

export default function CycleBuilder({ onBack }: CycleBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [expandedErrorFile, setExpandedErrorFile] = useState<number | null>(null);
  const [workdayExpanded, setWorkdayExpanded] = useState(true);
  const [shareworksExpanded, setShareworksExpanded] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [fieldPermissions, setFieldPermissions] = useState(fieldPermissionsData);
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [includePerformance, setIncludePerformance] = useState(true);
  const [includeComparison, setIncludeComparison] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    fiscalYear: new Date().getFullYear().toString(),
    type: "merit",
    description: "",
    startDate: "",
    endDate: "",
    effectiveDate: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const toggleFieldPermission = (fieldId: string, type: "visible" | "editable") => {
    setFieldPermissions((prev) =>
      prev.map((f) => (f.id === fieldId ? { ...f, [type]: !f[type] } : f))
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <CycleDetailsStep formData={formData} updateField={updateField} />;
      case 1:
        return (
          <DataIntegrationsStep
            expandedErrorFile={expandedErrorFile}
            setExpandedErrorFile={setExpandedErrorFile}
            workdayExpanded={workdayExpanded}
            setWorkdayExpanded={setWorkdayExpanded}
            shareworksExpanded={shareworksExpanded}
            setShareworksExpanded={setShareworksExpanded}
          />
        );
      case 2:
        return <EmployeeDataGridStep />;
      case 3:
        return <EligibilityRulesStep />;
      case 4:
        return <BudgetFxStep />;
      case 5:
        return <SalaryBandsStep />;
      case 6:
        return <UsersRolesStep />;
      case 7:
        return (
          <FieldPermissionsStep
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            fieldPermissions={fieldPermissions}
            toggleFieldPermission={toggleFieldPermission}
          />
        );
      case 8:
        return (
          <RewardLetterStep
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            includePerformance={includePerformance}
            setIncludePerformance={setIncludePerformance}
            includeComparison={includeComparison}
            setIncludeComparison={setIncludeComparison}
            customMessage={customMessage}
            setCustomMessage={setCustomMessage}
          />
        );
      case 9:
        return <ReviewFinalizeStep formData={formData} setCurrentStep={setCurrentStep} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: token("elevation.surface"),
        borderRadius: token("border.radius.300"),
        boxShadow: token("elevation.shadow.raised"),
        overflow: "hidden",
        position: "relative",
      }}
    >
      {showComplete && <SuccessAnimation onDone={onBack} />}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `${token("space.400")} ${token("space.500")}`,
          borderBottom: `1px solid ${token("color.border")}`,
          backgroundColor: token("elevation.surface"),
        }}
      >
        <div>
          <Heading size="large">Cycle Builder</Heading>
          <div style={{ marginTop: token("space.050") }}>
            <Text size="medium" color="color.text.subtlest">
              Configure cycle details, integrate data sources, define eligibility rules, set budgets and FX rates, manage salary bands, assign user permissions, and finalize reward letters — all in one guided workflow.
            </Text>
          </div>
        </div>
        <div style={{ display: "flex", gap: token("space.100") }}>
          <Button appearance="subtle" onClick={onBack}>
            Cancel
          </Button>
          <Button appearance="default">Save Draft</Button>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div
          style={{
            width: 250,
            backgroundColor: token("elevation.surface.sunken"),
            borderRight: `1px solid ${token("color.border")}`,
            padding: `${token("space.300")} ${token("space.300")}`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {(() => {
            const circleSize = 28;
            const circleCenter = circleSize / 2;
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: 1,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: circleCenter - 1,
                    top: circleCenter,
                    bottom: circleCenter,
                    width: 2,
                    backgroundColor: token("color.border"),
                    zIndex: 0,
                  }}
                />
                {currentStep > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      left: circleCenter - 1,
                      top: circleCenter,
                      height: `${((currentStep) / (STEPS.length - 1)) * 100}%`,
                      width: 2,
                      backgroundColor: token("color.border.brand"),
                      zIndex: 0,
                    }}
                  />
                )}
                {STEPS.map((step, index) => {
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;

                  return (
                    <div
                      key={step.id}
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: token("space.100"),
                        cursor: "pointer",
                      }}
                      onClick={() => setCurrentStep(index)}
                    >
                      <div
                        style={{
                          position: "relative",
                          zIndex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: circleSize,
                          height: circleSize,
                          borderRadius: "50%",
                          border: `2px solid ${
                            isActive
                              ? token("color.border.brand")
                              : isCompleted
                              ? token("color.border.brand")
                              : token("color.border")
                          }`,
                          backgroundColor: isCompleted
                            ? token("color.background.brand.bold")
                            : isActive
                            ? token("color.background.selected")
                            : token("elevation.surface"),
                          color: isCompleted
                            ? token("color.text.inverse")
                            : isActive
                            ? token("color.text.brand")
                            : token("color.text.subtlest"),
                          flexShrink: 0,
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {isCompleted ? (
                          <CheckMarkIcon label="" color={token("color.icon.inverse")} />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>

                      <div style={{ paddingTop: token("space.025") }}>
                        <Text
                          size="medium"
                          weight="semibold"
                          color={isActive ? "color.text.brand" : "color.text"}
                        >
                          {step.title}
                        </Text>
                        <div style={{ lineHeight: 1.2 }}>
                          <Text size="UNSAFE_small" color="color.text.subtlest">
                            {step.description}
                          </Text>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>

        <div
          style={{
            flex: 1,
            padding: token("space.500"),
            overflowY: "auto",
          }}
        >
          {renderStepContent()}
        </div>
      </div>

      <div
        style={{
          padding: `${token("space.200")} ${token("space.500")}`,
          borderTop: `1px solid ${token("color.border")}`,
          backgroundColor: token("elevation.surface"),
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          appearance="subtle"
          iconBefore={ChevronLeftIcon}
          onClick={handleBack}
          isDisabled={currentStep === 0}
        >
          Back
        </Button>
        <Button
          appearance={currentStep === STEPS.length - 1 ? "primary" : "default"}
          iconAfter={ChevronRightIcon}
          onClick={handleNext}
        >
          {currentStep === STEPS.length - 1 ? "Finalize Cycle" : "Next Step"}
        </Button>
      </div>
    </div>
  );
}

function LabelText({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <div style={{ marginBottom: token("space.050") }}>
      <Text size="small" weight="semibold" color="color.text.subtle">
        {children}
        {required && (
          <span style={{ color: token("color.text.danger") }}> *</span>
        )}
      </Text>
    </div>
  );
}

function CycleDetailsStep({
  formData,
  updateField,
}: {
  formData: { name: string; type: string; startDate: string; endDate: string; effectiveDate: string; description: string };
  updateField: (field: string, value: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.400") }}>
      <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
        <PageIcon label="" color={token("color.icon.brand")} />
        <Heading size="medium">Cycle Details</Heading>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
        <div>
          <LabelText>Duplicate Existing Cycle (Optional)</LabelText>
          <Select
            options={duplicateOptions}
            placeholder="Select a cycle to duplicate settings from..."
            defaultValue={duplicateOptions[0]}
          />
          <div style={{ marginTop: token("space.050") }}>
            <Text size="UNSAFE_small" color="color.text.subtlest">
              Copy settings from a previous cycle to speed up configuration
            </Text>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: token("space.300") }}>
          <div>
            <LabelText required>Cycle Name</LabelText>
            <Textfield
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateField("name", e.target.value)
              }
              placeholder="e.g., 2026 Annual Merit"
            />
          </div>
          <div>
            <LabelText required>Cycle Type</LabelText>
            <Select
              options={typeOptions}
              value={typeOptions.find((o) => o.value === formData.type)}
              onChange={(opt) => opt && updateField("type", opt.value)}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: token("space.300") }}>
          <div>
            <LabelText required>Start Date</LabelText>
            <Textfield
              type="date"
              value={formData.startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateField("startDate", e.target.value)
              }
            />
          </div>
          <div>
            <LabelText required>End Date</LabelText>
            <Textfield
              type="date"
              value={formData.endDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateField("endDate", e.target.value)
              }
            />
          </div>
          <div>
            <LabelText required>Effective Date</LabelText>
            <Textfield
              type="date"
              value={formData.effectiveDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateField("effectiveDate", e.target.value)
              }
            />
          </div>
        </div>

        <div>
          <LabelText>Description</LabelText>
          <TextArea
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateField("description", e.target.value)
            }
            placeholder="Describe the cycle purpose and scope..."
            minimumRows={5}
          />
          <div style={{ marginTop: token("space.050") }}>
            <Text size="UNSAFE_small" color="color.text.subtlest">
              Provide details about this compensation cycle's objectives and scope
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationCard({
  name,
  rows,
  lastSynced,
  iconColor,
  icon,
  isFile,
}: {
  name: string;
  rows?: string;
  lastSynced: string;
  iconColor: string;
  icon: React.ReactNode;
  isFile?: boolean;
}) {
  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: token("space.150") }}>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: token("border.radius.100"),
              backgroundColor: iconColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </div>
          <div>
            <Text size="small" weight="bold">{name}</Text>
            {!isFile && (
              <div>
                <Lozenge appearance="success">Connected</Lozenge>
              </div>
            )}
          </div>
        </div>
        {!isFile && (
          <Button appearance="link" spacing="none">
            Sync now
          </Button>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: token("space.025") }}>
        {rows && <Text size="UNSAFE_small" color="color.text.subtlest">{rows}</Text>}
        <Text size="UNSAFE_small" color="color.text.subtlest">{isFile ? "Uploaded" : "Last synced"}: {lastSynced}</Text>
      </div>
    </div>
  );
}

function DataIntegrationsStep({
  expandedErrorFile,
  setExpandedErrorFile,
  workdayExpanded,
  setWorkdayExpanded,
  shareworksExpanded,
  setShareworksExpanded,
}: {
  expandedErrorFile: number | null;
  setExpandedErrorFile: (v: number | null) => void;
  workdayExpanded: boolean;
  setWorkdayExpanded: (v: boolean) => void;
  shareworksExpanded: boolean;
  setShareworksExpanded: (v: boolean) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
        <UploadIcon label="" color={token("color.icon.brand")} />
        <Heading size="medium">Data Integrations</Heading>
      </div>

      <Heading size="small">Data Upload</Heading>

      <div
        style={{
          border: `2px dashed ${token("color.border")}`,
          borderRadius: token("border.radius.200"),
          backgroundColor: token("elevation.surface.sunken"),
          padding: token("space.500"),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: token("color.background.selected"),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: token("space.200"),
          }}
        >
          <UploadIcon label="" color={token("color.icon.brand")} />
        </div>
        <Heading size="small">Upload Data</Heading>
        <div style={{ marginTop: token("space.100"), marginBottom: token("space.200"), maxWidth: 400 }}>
          <Text size="small" color="color.text.subtlest">
            Drag and drop your file here, or click to browse. Use our template to ensure data compatibility.
          </Text>
        </div>
        <Button appearance="primary" iconBefore={UploadIcon}>
          Choose File
        </Button>
        <div style={{ marginTop: token("space.200") }}>
          <Text size="UNSAFE_small" color="color.text.subtlest">
            Supported formats: .xlsx, .xls, .csv (Max size: 50MB)
          </Text>
        </div>
      </div>

      <Heading size="small">Current Integrations</Heading>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: token("space.200") }}>
        <IntegrationCard
          name="Workday"
          rows="100 rows"
          lastSynced="02/20/26 10:34 PM PST"
          iconColor={token("color.background.brand.bold")}
          icon={<PageIcon label="" color={token("color.icon.inverse")} />}
        />
        <IntegrationCard
          name="Shareworks"
          rows="80 rows"
          lastSynced="02/20/26 10:34 PM PST"
          iconColor={token("color.background.success.bold")}
          icon={<CreditCardIcon label="" color={token("color.icon.inverse")} />}
        />
        <IntegrationCard
          name="Compensation data.csv"
          lastSynced="02/20/26 10:34 PM PST"
          iconColor={token("color.background.success.bold")}
          icon={<SpreadsheetIcon label="" color={token("color.icon.inverse")} />}
          isFile
        />
      </div>

      <div style={cardStyle}>
        <div style={{ marginBottom: token("space.200") }}>
          <Heading size="small">Upload History</Heading>
          <Text size="small" color="color.text.subtlest">Previous data uploads for this compensation cycle</Text>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${token("color.border")}` }}>
              {["File Name", "Uploaded", "Size", "Records", "Status"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: `${token("space.100")} ${token("space.200")}`,
                    textAlign: "left",
                    fontSize: 11,
                    fontWeight: 600,
                    color: token("color.text.subtlest"),
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uploadHistory.map((file, i) => (
              <React.Fragment key={i}>
                <tr
                  style={{
                    borderBottom: `1px solid ${token("color.border")}`,
                    cursor: file.status === "failed" ? "pointer" : "default",
                  }}
                  onClick={() => {
                    if (file.status === "failed") {
                      setExpandedErrorFile(expandedErrorFile === i ? null : i);
                    }
                  }}
                >
                  <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                      <SpreadsheetIcon label="" color={token("color.icon.subtle")} />
                      <Text size="small" weight="semibold">{file.name}</Text>
                    </div>
                  </td>
                  <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                    <Text size="small" color="color.text.subtlest">{file.date}</Text>
                  </td>
                  <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                    <Text size="small" color="color.text.subtlest">{file.size}</Text>
                  </td>
                  <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                    <Text size="small" color="color.text.subtlest">{file.records.toLocaleString()}</Text>
                  </td>
                  <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                    {file.status === "success" ? (
                      <Lozenge appearance="success">Success</Lozenge>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
                        <Lozenge appearance="removed">{file.errors} Errors</Lozenge>
                        {expandedErrorFile === i ? (
                          <ChevronUpIcon label="" color={token("color.icon.subtle")} />
                        ) : (
                          <ChevronDownIcon label="" color={token("color.icon.subtle")} />
                        )}
                      </div>
                    )}
                  </td>
                </tr>
                {file.status === "failed" && expandedErrorFile === i && file.errorDetails && (
                  <tr>
                    <td colSpan={5} style={{ padding: 0 }}>
                      <div
                        style={{
                          backgroundColor: token("color.background.danger"),
                          padding: token("space.200"),
                        }}
                      >
                        <div style={cardStyle}>
                          <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), marginBottom: token("space.150") }}>
                            <ErrorIcon label="" color={token("color.icon.danger")} />
                            <Text size="small" weight="bold">Data Validation Errors</Text>
                          </div>
                          <Text size="UNSAFE_small" color="color.text.subtlest">
                            {file.errorDetails.length} critical errors requiring attention
                          </Text>
                          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: token("space.150") }}>
                            <thead>
                              <tr style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                                {["Row", "Employee", "Column", "Issue", "Action"].map((h) => (
                                  <th
                                    key={h}
                                    style={{
                                      padding: `${token("space.100")} ${token("space.200")}`,
                                      textAlign: h === "Action" ? "right" : "left",
                                      fontSize: 11,
                                      fontWeight: 600,
                                      color: token("color.text.subtlest"),
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {file.errorDetails.map((err, ei) => (
                                <tr key={ei} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                                  <td style={{ padding: `${token("space.100")} ${token("space.200")}`, fontFamily: "monospace", fontSize: 12, color: token("color.text.subtlest") }}>
                                    {err.row}
                                  </td>
                                  <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                                    <Text size="small" weight="semibold">{err.empName}</Text>
                                  </td>
                                  <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                                    <Text size="small">{err.col}</Text>
                                  </td>
                                  <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
                                      <ErrorIcon label="" color={token("color.icon.danger")} />
                                      <Text size="small" color="color.text.danger">{err.issue}</Text>
                                    </div>
                                  </td>
                                  <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "right" }}>
                                    <Button appearance="subtle" spacing="compact">
                                      Fix
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <Heading size="small">Data sources</Heading>
      <div style={cardStyle}>
        <div
          onClick={() => setWorkdayExpanded(!workdayExpanded)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            marginBottom: workdayExpanded ? token("space.200") : 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
            <PageIcon label="" color={token("color.icon.brand")} />
            <Text size="small" weight="bold">Workday</Text>
          </div>
          {workdayExpanded ? (
            <ChevronUpIcon label="" color={token("color.icon.subtle")} />
          ) : (
            <ChevronDownIcon label="" color={token("color.icon.subtle")} />
          )}
        </div>
        {workdayExpanded && (
          <div style={{ display: "flex", flexDirection: "column", gap: token("space.200") }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <Text size="small" weight="bold">Workday Field Mapping</Text>
                <div>
                  <Text size="UNSAFE_small" color="color.text.subtlest">
                    {workdayFields.length} fields - Employee and compensation data from Workday
                  </Text>
                </div>
              </div>
              <Lozenge appearance="inprogress">Workday</Lozenge>
            </div>

            <FieldMappingTable fields={workdayFields} />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button appearance="primary">Sync now</Button>
            </div>
          </div>
        )}
      </div>

      <div style={cardStyle}>
        <div
          onClick={() => setShareworksExpanded(!shareworksExpanded)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            marginBottom: shareworksExpanded ? token("space.200") : 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
            <CreditCardIcon label="" color={token("color.icon.success")} />
            <Text size="small" weight="bold">Shareworks</Text>
          </div>
          {shareworksExpanded ? (
            <ChevronUpIcon label="" color={token("color.icon.subtle")} />
          ) : (
            <ChevronDownIcon label="" color={token("color.icon.subtle")} />
          )}
        </div>
        {shareworksExpanded && (
          <div style={{ display: "flex", flexDirection: "column", gap: token("space.200") }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <Text size="small" weight="bold">Shareworks Field Mapping</Text>
                <div>
                  <Text size="UNSAFE_small" color="color.text.subtlest">
                    {shareworksFields.length} fields - Equity and stock data from Shareworks
                  </Text>
                </div>
              </div>
              <Lozenge appearance="success">Shareworks</Lozenge>
            </div>

            <FieldMappingTable fields={shareworksFields} />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button appearance="primary">Sync now</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FieldMappingTable({ fields }: { fields: typeof workdayFields }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: `2px solid ${token("color.border")}` }}>
          {["Field", "Column Name", "Description"].map((h) => (
            <th
              key={h}
              style={{
                padding: `${token("space.100")} ${token("space.200")}`,
                textAlign: "left",
                fontSize: 11,
                fontWeight: 600,
                color: token("color.text.subtlest"),
                textTransform: "uppercase",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {fields.map((row, i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
            <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                <Text size="small" weight="semibold">{row.field}</Text>
                {"isUpdated" in row && row.isUpdated && (
                  <Lozenge appearance="inprogress">Updated</Lozenge>
                )}
              </div>
            </td>
            <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
              <code
                style={{
                  fontSize: 11,
                  color: token("color.text.subtlest"),
                  backgroundColor: token("color.background.neutral"),
                  padding: `${token("space.025")} ${token("space.075")}`,
                  borderRadius: token("border.radius.100"),
                  fontFamily: "monospace",
                }}
              >
                {row.column}
              </code>
            </td>
            <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
              <Text size="small" color="color.text.subtlest">{row.desc}</Text>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function EmployeeDataGridStep() {
  const levelAppearance = (level: string): "inprogress" | "success" | "moved" => {
    if (level.startsWith("P")) return "inprogress";
    if (level.startsWith("M")) return "success";
    return "moved";
  };

  const ratingAppearance = (rating: string): "success" | "inprogress" | "removed" | "moved" | "default" => {
    if (rating === "Greatly Exceeded") return "success";
    if (rating === "Exceeded") return "inprogress";
    if (rating === "Met") return "default";
    if (rating === "Met Some") return "moved";
    return "removed";
  };

  const head = {
    cells: [
      { key: "id", content: <div><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Employee ID</Text><div style={{ color: token("color.text.information"), fontSize: 11 }}>Workday</div></div> },
      { key: "firstName", content: <div><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">First Name</Text><div style={{ color: token("color.text.information"), fontSize: 11 }}>Workday</div></div> },
      { key: "lastName", content: <div><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Last Name</Text><div style={{ color: token("color.text.information"), fontSize: 11 }}>Workday</div></div> },
      { key: "title", content: <div><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Job Title</Text><div style={{ color: token("color.text.information"), fontSize: 11 }}>Workday</div></div> },
      { key: "level", content: <div><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Level</Text><div style={{ color: token("color.text.information"), fontSize: 11 }}>Workday</div></div> },
      { key: "dept", content: <div><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Job Family</Text><div style={{ color: token("color.text.information"), fontSize: 11 }}>Workday</div></div> },
      { key: "location", content: <div><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Location</Text><div style={{ color: token("color.text.information"), fontSize: 11 }}>Workday</div></div> },
      { key: "rating", content: <div><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Performance Rating</Text><div style={{ color: token("color.text.information"), fontSize: 11 }}>Workday</div></div> },
      { key: "salary", content: <div><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Base Salary</Text><div style={{ color: token("color.text.information"), fontSize: 11 }}>Workday</div></div> },
      { key: "commission", content: <div><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Commission %</Text><div style={{ color: token("color.text.information"), fontSize: 11 }}>Workday</div></div> },
      { key: "bonus", content: <div><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Bonus %</Text><div style={{ color: token("color.text.information"), fontSize: 11 }}>Workday</div></div> },
      { key: "equity", content: <div><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Current Equity $</Text><div style={{ color: token("color.text.success"), fontSize: 11 }}>Shareworks</div></div> },
    ],
  };

  const rows = employeeData.map((emp, i) => ({
    key: `row-${i}`,
    cells: [
      { key: "id", content: <Text size="small"><code style={{ fontFamily: "monospace", fontSize: 12 }}>{emp.id}</code></Text> },
      { key: "firstName", content: <Text size="small" weight="medium">{emp.firstName}</Text> },
      { key: "lastName", content: <Text size="small" weight="medium">{emp.lastName}</Text> },
      { key: "title", content: <Text size="small" color="color.text.subtle">{emp.title}</Text> },
      { key: "level", content: <Lozenge appearance={levelAppearance(emp.level)}>{emp.level}</Lozenge> },
      { key: "dept", content: <Text size="small" color="color.text.subtle">{emp.dept}</Text> },
      { key: "location", content: <Text size="small" color="color.text.subtle">{emp.location}</Text> },
      { key: "rating", content: <Lozenge appearance={ratingAppearance(emp.rating)}>{emp.rating}</Lozenge> },
      { key: "salary", content: <Text size="small">${emp.salary.toLocaleString()}</Text> },
      { key: "commission", content: <Text size="small" color={emp.commission ? "color.text" : "color.text.disabled"}>{emp.commission ? `${emp.commission.toFixed(1)}%` : "—"}</Text> },
      { key: "bonus", content: <Text size="small">{emp.bonus.toFixed(1)}%</Text> },
      { key: "equity", content: <Text size="small" color={emp.equity ? "color.text" : "color.text.disabled"}>{emp.equity ? `$${emp.equity.toLocaleString()}` : "—"}</Text> },
    ],
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div>
        <Heading size="medium">Employee Data</Heading>
        <Text size="small" color="color.text.subtlest">
          Unified view of all employee fields with data source attribution
        </Text>
        <div style={{ display: "flex", gap: token("space.100"), marginTop: token("space.150") }}>
          <Lozenge appearance="inprogress">Workday</Lozenge>
          <Lozenge appearance="success">Shareworks</Lozenge>
          <Lozenge appearance="moved">CSV</Lozenge>
          <Text size="small" color="color.text.subtlest">52 employees - 18 of 37 columns visible</Text>
        </div>
      </div>

      <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: `0 ${token("space.200")}` }}>
          <DynamicTable
            head={head}
            rows={rows}
            isFixedSize
            defaultSortKey="id"
            defaultSortOrder="ASC"
          />
        </div>
        <div
          style={{
            backgroundColor: token("elevation.surface.sunken"),
            borderTop: `1px solid ${token("color.border")}`,
            padding: `${token("space.150")} ${token("space.200")}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="small" color="color.text.subtlest">
            Showing <Text size="small" weight="bold">1-12</Text> of <Text size="small" weight="bold">52</Text> employees
          </Text>
          <div style={{ display: "flex", gap: token("space.100") }}>
            <Button appearance="subtle" spacing="compact" isDisabled iconBefore={ChevronLeftIcon}>
              Previous
            </Button>
            <Button appearance="subtle" spacing="compact" iconAfter={ChevronRightIcon}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EligibilityRulesStep() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
          <LockLockedIcon label="" color={token("color.icon.brand")} />
          <Heading size="medium">Eligibility Rules</Heading>
        </div>
        <Button appearance="primary" iconBefore={AddIcon}>
          New Rule
        </Button>
      </div>

      <div style={cardStyle}>
        <Heading size="xsmall">Active Rules</Heading>
        <div style={{ marginTop: token("space.200"), display: "flex", flexDirection: "column", gap: token("space.200") }}>
          {[
            { name: "Employment Type Filter", field: "Employment Type", operator: "IS ONE OF", values: "Regular, Definite", count: "45 employees matched" },
            { name: "Start Date Cutoff", field: "Start Date", operator: "IS BEFORE", values: "March 31, 2026", count: "48 employees matched" },
            { name: "FTE Threshold", field: "FTE %", operator: "GREATER THAN", values: "0.5", count: "50 employees matched" },
          ].map((rule, i) => (
            <div
              key={i}
              style={{
                border: `1px solid ${token("color.border")}`,
                borderRadius: token("border.radius.200"),
                padding: token("space.200"),
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.100") }}>
                <Text size="small" weight="bold">{rule.name}</Text>
                <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                  <Lozenge appearance="success">Active</Lozenge>
                  <IconButton appearance="subtle" spacing="compact" icon={EditIcon} label="Edit" />
                </div>
              </div>
              <div style={{ display: "flex", gap: token("space.200"), alignItems: "center" }}>
                <Text size="UNSAFE_small" color="color.text.subtlest">{rule.field}</Text>
                <Lozenge>{rule.operator}</Lozenge>
                <Text size="UNSAFE_small" weight="semibold">{rule.values}</Text>
                <Text size="UNSAFE_small" color="color.text.subtlest">{rule.count}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ marginBottom: token("space.200") }}>
          <Heading size="xsmall">New Eligibility Rule</Heading>
        </div>

        <SectionMessage appearance="information">
          <Text size="small" weight="bold">Note: </Text>
          <Text size="small">
            Employee type is used for overall APEX and comp eligibility.
          </Text>
          <div style={{ marginTop: token("space.050") }}>
            <Text size="UNSAFE_small" color="color.text.subtlest">
              You can combine multiple conditions with AND logic (e.g., Start Date &lt; 31 March 2026 AND Employee Type = Regular or Definite)
            </Text>
          </div>
        </SectionMessage>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: token("space.300"), marginTop: token("space.300") }}>
          <div>
            <LabelText required>Rule Name</LabelText>
            <Textfield placeholder="e.g., Full-time employees only" />
          </div>
          <div>
            <LabelText required>Field</LabelText>
            <Select
              options={[
                { label: "Employment Type", value: "empType" },
                { label: "Start Date", value: "startDate" },
                { label: "FTE %", value: "fte" },
                { label: "Location", value: "location" },
                { label: "Department", value: "department" },
              ]}
              placeholder="Select field..."
            />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: token("space.300"), marginTop: token("space.300") }}>
          <div>
            <LabelText required>Operator</LabelText>
            <Select
              options={[
                { label: "IS ONE OF", value: "isOneOf" },
                { label: "IS NOT ONE OF", value: "isNotOneOf" },
                { label: "EQUALS", value: "equals" },
                { label: "GREATER THAN", value: "greaterThan" },
                { label: "LESS THAN", value: "lessThan" },
                { label: "IS BEFORE", value: "isBefore" },
                { label: "IS AFTER", value: "isAfter" },
              ]}
              placeholder="Select operator..."
            />
          </div>
          <div>
            <LabelText required>Value</LabelText>
            <Textfield placeholder="Value" />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: token("space.300"), paddingTop: token("space.200"), borderTop: `1px solid ${token("color.border")}` }}>
          <Button appearance="subtle" iconBefore={AddIcon}>
            Add AND Condition
          </Button>
          <div style={{ display: "flex", gap: token("space.100") }}>
            <Button appearance="subtle">Cancel</Button>
            <Button appearance="primary">Save Rule</Button>
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.200") }}>
          <div>
            <Heading size="xsmall">Excluded Employees</Heading>
            <Text size="UNSAFE_small" color="color.text.subtlest">{excludedEmployees.length} employees excluded by eligibility rules</Text>
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${token("color.border")}` }}>
              {["Employee", "Department", "Start Date", "Type", "Reason", "Action"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: `${token("space.100")} ${token("space.200")}`,
                    textAlign: h === "Action" ? "right" : "left",
                    fontSize: 11,
                    fontWeight: 600,
                    color: token("color.text.subtlest"),
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excludedEmployees.map((emp, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Text size="small" weight="semibold">{emp.name}</Text>
                  <div>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{emp.id}</Text>
                  </div>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Text size="small">{emp.dept}</Text>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Text size="small" color="color.text.subtlest">{emp.startDate}</Text>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Lozenge
                    appearance={
                      emp.empType === "Regular" || emp.empType === "Definite"
                        ? "success"
                        : "removed"
                    }
                  >
                    {emp.empType}
                  </Lozenge>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <InlineMessage appearance="error" title={emp.reason}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{emp.detail}</Text>
                  </InlineMessage>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "right" }}>
                  <Button appearance="subtle" spacing="compact">
                    Override
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BudgetFxStep() {
  const budgetsList = [
    { id: 1, name: "Broad-based APEX Equity", lastUpdated: "Aug 09, 2025" },
    { id: 2, name: "L100+ APEX Equity", lastUpdated: "Aug 08, 2025" },
    { id: 3, name: "Broad-based Special Equity", lastUpdated: "Aug 08, 2025" },
    { id: 4, name: "L100+ Retention Equity", lastUpdated: "Aug 08, 2025" },
    { id: 5, name: "TOTAL- Broad-based APEX + Special Equity", lastUpdated: "Aug 08, 2025" },
    { id: 6, name: "TOTAL L100+ APEX + Retention Equity", lastUpdated: "Aug 09, 2025" },
  ];

  const columnOptions = [
    { id: "salary-increase", label: "Salary Increase", checked: false },
    { id: "new-commission", label: "New Commission", checked: false },
    { id: "special-equity", label: "Special Equity - Budget", checked: true },
    { id: "modeled-equity", label: "Modeled Equity Broad-base Value - Budget", checked: true },
    { id: "retention-equity", label: "Retention Equity - Budget", checked: false },
    { id: "promotion-equity", label: "Promotion Equity - Budget", checked: false },
    { id: "modeled-exec", label: "Modeled Equity Exec Value - Budget", checked: false },
  ];

  const calcMethodOptions = [
    { name: "calc-method", value: "percentage", label: "Apply a percentage of Current Pay", description: "Define your budget as a percentage of a specified pay type" },
    { name: "calc-method", value: "sum-column", label: "Sum values stored in a column", description: "Define your budget using the values stored in another column" },
    { name: "calc-method", value: "sum-target", label: "Sum target recommendation values", description: "Define your budget using the sum of target recommendation values for this column" },
    { name: "calc-method", value: "sum-uploaded", label: "Sum uploaded values", description: "Define your budget using uploaded values via Data Upload" },
  ];

  const [selectedBudgetId, setSelectedBudgetId] = useState(5);
  const [budgetTab, setBudgetTab] = useState<"general" | "permissions">("general");
  const [budgetType, setBudgetType] = useState("equity");
  const [budgetCreation, setBudgetCreation] = useState("bottoms-up");
  const [budgetLimit, setBudgetLimit] = useState("yes");
  const [columnChecks, setColumnChecks] = useState(columnOptions);
  const [calcMethods, setCalcMethods] = useState<Record<string, string>>({
    "special-equity": "sum-uploaded",
    "modeled-equity": "sum-uploaded",
  });

  const selectedBudget = budgetsList.find((b) => b.id === selectedBudgetId)!;
  const selectedColumns = columnChecks.filter((c) => c.checked);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
        <CreditCardIcon label="" color={token("color.icon.brand")} />
        <Heading size="medium">Configure budget & FX rates</Heading>
      </div>

      <div style={cardStyle}>
        <Heading size="xsmall">Budget Allocation</Heading>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: token("space.300"), marginTop: token("space.200") }}>
          <div>
            <LabelText>Broadbased Equity Budget (USD)</LabelText>
            <Textfield type="number" placeholder="e.g., 3000000" />
          </div>
          <div>
            <LabelText>L100+ Equity Budget (USD)</LabelText>
            <Textfield type="number" placeholder="e.g., 2000000" />
          </div>
          <div>
            <LabelText>Total Equity Budget</LabelText>
            <Textfield value="$0" isReadOnly />
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.200") }}>
          <div>
            <Heading size="xsmall">Budgets</Heading>
            <Text size="small" color="color.text.subtlest">
              Create budgets that your planners will see and have their changes compared against.
            </Text>
          </div>
          <Button appearance="primary">Create a Budget</Button>
        </div>

        <div style={{ display: "flex", border: `1px solid ${token("color.border")}`, borderRadius: token("border.radius.200"), overflow: "hidden" }}>
          <div
            style={{
              width: 280,
              borderRight: `1px solid ${token("color.border")}`,
              flexShrink: 0,
            }}
          >
            {budgetsList.map((budget) => (
              <div
                key={budget.id}
                onClick={() => setSelectedBudgetId(budget.id)}
                style={{
                  padding: `${token("space.150")} ${token("space.200")}`,
                  cursor: "pointer",
                  borderBottom: `1px solid ${token("color.border")}`,
                  borderLeft: selectedBudgetId === budget.id ? `3px solid ${token("color.border.selected")}` : "3px solid transparent",
                  backgroundColor: selectedBudgetId === budget.id ? token("color.background.selected") : "transparent",
                }}
              >
                <Text size="small" weight={selectedBudgetId === budget.id ? "semibold" : "regular"}>
                  {budget.id}. {budget.name}
                </Text>
                <div>
                  <Text size="UNSAFE_small" color="color.text.subtlest">Last Updated: {budget.lastUpdated}</Text>
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, padding: token("space.300") }}>
            <Heading size="small">Editing {selectedBudget.id}. {selectedBudget.name}</Heading>

            <div style={{ display: "flex", gap: token("space.300"), marginTop: token("space.200"), marginBottom: token("space.300") }}>
              {(["general", "permissions"] as const).map((tab) => (
                <div
                  key={tab}
                  onClick={() => setBudgetTab(tab)}
                  style={{
                    paddingBottom: token("space.100"),
                    cursor: "pointer",
                    borderBottom: budgetTab === tab ? `2px solid ${token("color.border.selected")}` : "2px solid transparent",
                  }}
                >
                  <Text
                    size="small"
                    weight="semibold"
                    color={budgetTab === tab ? "color.text.selected" : "color.text.subtlest"}
                  >
                    {tab === "general" ? "General" : "Permissions"}
                  </Text>
                </div>
              ))}
            </div>

            {budgetTab === "general" && (
              <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
                <div>
                  <LabelText>Budget Name</LabelText>
                  <Textfield defaultValue={`${selectedBudget.id}. ${selectedBudget.name}`} />
                </div>

                <div>
                  <Text size="small" weight="semibold">What type of budget do you want to create?</Text>
                  <div style={{ marginTop: token("space.150") }}>
                    <RadioGroup
                      options={[
                        { name: "budget-type", value: "cash", label: "Cash" },
                        { name: "budget-type", value: "equity", label: "Equity" },
                      ]}
                      value={budgetType}
                      onChange={(e) => setBudgetType(e.target.value)}
                    />
                  </div>
                  <div style={{ marginTop: token("space.050") }}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">
                      {budgetType === "cash"
                        ? "Cash can include salary, as well as other pay types such as bonuses and variable raises"
                        : "Equity includes performance, promotion, and refresher shares"}
                    </Text>
                  </div>
                </div>

                <div>
                  <Text size="small" weight="semibold">Which columns should contribute to this budget?</Text>
                  <div style={{ display: "flex", flexDirection: "column", gap: token("space.100"), marginTop: token("space.150") }}>
                    {columnChecks.map((col) => (
                      <Checkbox
                        key={col.id}
                        isChecked={col.checked}
                        onChange={() =>
                          setColumnChecks((prev) =>
                            prev.map((c) => (c.id === col.id ? { ...c, checked: !c.checked } : c))
                          )
                        }
                        label={col.label}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Text size="small" weight="semibold">How would you like to create your budget?</Text>
                  <div style={{ marginTop: token("space.150") }}>
                    <RadioGroup
                      options={[
                        { name: "budget-creation", value: "bottoms-up", label: "Bottoms Up Budget" },
                        { name: "budget-creation", value: "award", label: "Award Budget" },
                      ]}
                      value={budgetCreation}
                      onChange={(e) => setBudgetCreation(e.target.value)}
                    />
                  </div>
                  <div style={{ marginTop: token("space.050") }}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">
                      {budgetCreation === "bottoms-up"
                        ? "These budgets are assigned on the employee level and calculated based on their current pay"
                        : "These budgets simply display the sum of the specified columns"}
                    </Text>
                  </div>
                </div>

                <div>
                  <Text size="small" weight="semibold">Do you want to set a limit for this budget?</Text>
                  <div style={{ display: "flex", gap: token("space.200"), marginTop: token("space.150") }}>
                    <RadioGroup
                      options={[
                        { name: "budget-limit", value: "yes", label: "Yes" },
                        { name: "budget-limit", value: "no", label: "No" },
                      ]}
                      value={budgetLimit}
                      onChange={(e) => setBudgetLimit(e.target.value)}
                    />
                  </div>
                </div>

                {selectedColumns.length > 0 && (
                  <div>
                    <Text size="small" color="color.text.subtlest">
                      For each column selected, specify how budget should be calculated on a per-employee basis
                    </Text>
                    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300"), marginTop: token("space.200") }}>
                      {selectedColumns.map((col) => (
                        <div
                          key={col.id}
                          style={{
                            border: `1px solid ${token("color.border")}`,
                            borderRadius: token("border.radius.200"),
                            padding: token("space.300"),
                          }}
                        >
                          <Heading size="xsmall">{col.label}</Heading>
                          <div style={{ marginTop: token("space.150") }}>
                            <Text size="small" weight="semibold">Calculation Method</Text>
                            <div style={{ marginTop: token("space.100") }}>
                              <RadioGroup
                                options={calcMethodOptions.map((opt) => ({
                                  ...opt,
                                  name: `calc-${col.id}`,
                                }))}
                                value={calcMethods[col.id] || "sum-uploaded"}
                                onChange={(e) =>
                                  setCalcMethods((prev) => ({ ...prev, [col.id]: e.target.value }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {budgetTab === "permissions" && (
              <div style={{ textAlign: "center", padding: token("space.600") }}>
                <ShieldIcon label="" color={token("color.icon.disabled")} />
                <div style={{ marginTop: token("space.200") }}>
                  <Text weight="semibold">Budget Permissions</Text>
                </div>
                <div style={{ marginTop: token("space.050") }}>
                  <Text size="small" color="color.text.subtlest">
                    Configure who can view and edit this budget
                  </Text>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <Heading size="xsmall">Exchange Rates</Heading>
            <Text size="small" color="color.text.subtlest">
              Set FX rates for employees to view compensation in their local currency
            </Text>
          </div>
          <Button appearance="default" iconBefore={ClockIcon}>
            View History
          </Button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: token("space.300"), marginTop: token("space.200") }}>
          <div>
            <LabelText>Base Currency</LabelText>
            <Select
              options={[
                { label: "USD - US Dollar", value: "usd" },
                { label: "EUR - Euro", value: "eur" },
                { label: "GBP - British Pound", value: "gbp" },
              ]}
              defaultValue={{ label: "USD - US Dollar", value: "usd" }}
            />
          </div>
          <div>
            <LabelText>Rate Date</LabelText>
            <Textfield type="date" />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: token("space.100"), marginTop: token("space.200") }}>
          <Button appearance="default" iconBefore={DownloadIcon}>
            Export FX Rates
          </Button>
          <Button appearance="primary">Import FX Rates</Button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: token("space.200") }}>
          <thead>
            <tr style={{ backgroundColor: token("elevation.surface.sunken"), borderBottom: `1px solid ${token("color.border")}` }}>
              {["Currency", "Currency Code", "Rate to USD", "Last Updated"].map((h, i) => (
                <th
                  key={h}
                  style={{
                    padding: `${token("space.100")} ${token("space.200")}`,
                    textAlign: i >= 2 ? "right" : "left",
                    fontSize: 12,
                    fontWeight: 600,
                    color: token("color.text.subtlest"),
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fxRates.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Text size="small">{row.currency}</Text>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}`, fontFamily: "monospace" }}>
                  <Text size="small">{row.code}</Text>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "right", fontFamily: "monospace" }}>
                  <Text size="small">{row.rate}</Text>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "right" }}>
                  <Text size="small">{row.updated}</Text>
                  <div>
                    <Text size="UNSAFE_small" color="color.text.subtlest">by {row.updatedBy}</Text>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: token("space.300"), paddingTop: token("space.200") }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.150") }}>
            <Text size="small" weight="bold">Recent Changes</Text>
            <Button appearance="link" spacing="none">View All History</Button>
          </div>
          {fxChangeHistory.map((log, idx) => (
            <div
              key={idx}
              style={{
                padding: `${token("space.150")} 0`,
                borderBottom: idx < fxChangeHistory.length - 1 ? `1px solid ${token("color.border")}` : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), marginBottom: token("space.050") }}>
                <Text size="small" weight="semibold">{log.action}</Text>
                <Lozenge appearance={log.source === "CSV Import" ? "inprogress" : "default"}>
                  {log.source}
                </Lozenge>
              </div>
              <Text size="UNSAFE_small" color="color.text.subtlest">{log.details}</Text>
              <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), marginTop: token("space.050") }}>
                <PersonIcon label="" color={token("color.icon.subtle")} />
                <Text size="UNSAFE_small" color="color.text.subtlest">{log.user}</Text>
                <ClockIcon label="" color={token("color.icon.subtle")} />
                <Text size="UNSAFE_small" color="color.text.subtlest">{log.date}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.200") }}>
          <div>
            <Heading size="xsmall">Department Budget Allocations</Heading>
            <Text size="small" color="color.text.subtlest">
              Review and adjust budget allocations by department
            </Text>
          </div>
          <Button appearance="default">Recalculate Budgets</Button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: token("elevation.surface.sunken"), borderBottom: `1px solid ${token("color.border")}` }}>
              {["Department", "Headcount", "Merit Budget ($)", "Merit %", "Bonus Budget ($)", "Bonus %"].map((h, i) => (
                <th
                  key={h}
                  style={{
                    padding: `${token("space.100")} ${token("space.200")}`,
                    textAlign: i >= 1 ? "right" : "left",
                    fontSize: 12,
                    fontWeight: 600,
                    color: token("color.text.subtlest"),
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {deptBudgets.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Text size="small" weight="semibold">{row.dept}</Text>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "right" }}>
                  <Text size="small" color="color.text.subtlest">{row.headcount}</Text>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "right", fontFamily: "monospace" }}>
                  <Text size="small">${row.meritBudget}</Text>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "right", fontFamily: "monospace" }}>
                  <Text size="small">{row.meritPct}%</Text>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "right", fontFamily: "monospace" }}>
                  <Text size="small">${row.bonusBudget}</Text>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "right", fontFamily: "monospace" }}>
                  <Text size="small">{row.bonusPct}%</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SalaryBandsStep() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
        <SpreadsheetIcon label="" color={token("color.icon.brand")} />
        <Heading size="medium">Salary Bands</Heading>
      </div>

      <Text size="small" color="color.text.subtlest">
        Upload salary band data via CSV or update bands individually.
      </Text>

      <div style={cardStyle}>
        <div
          style={{
            border: `2px dashed ${token("color.border")}`,
            borderRadius: token("border.radius.200"),
            padding: token("space.500"),
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: token("space.150"),
          }}
        >
          <UploadIcon label="" color={token("color.icon.subtle")} />
          <Text size="small" weight="semibold">Upload CSV file</Text>
          <Text size="UNSAFE_small" color="color.text.subtlest">Required: Level, SRP, Range Max, Equity Max</Text>
          <Button appearance="primary">Select File</Button>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.200") }}>
          <Heading size="xsmall">Current Bands ({salaryBands.length})</Heading>
          <div style={{ display: "flex", gap: token("space.100") }}>
            <Button appearance="default" iconBefore={DownloadIcon} spacing="compact">
              Export
            </Button>
            <Button appearance="primary" iconBefore={AddIcon} spacing="compact">
              Add
            </Button>
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${token("color.border")}`, backgroundColor: token("elevation.surface.sunken") }}>
              {["Level", "SRP", "Range Max", "Equity Max", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: `${token("space.100")} ${token("space.200")}`,
                    textAlign: h === "Actions" ? "right" : "left",
                    fontSize: 11,
                    fontWeight: 600,
                    color: token("color.text.subtlest"),
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {salaryBands.map((band, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Textfield defaultValue={band.level} isCompact />
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Textfield defaultValue={band.srp} isCompact />
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Textfield defaultValue={band.rangeMax} isCompact />
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Textfield defaultValue={band.equityMax} isCompact />
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "right" }}>
                  <IconButton icon={DeleteIcon} label="Delete" appearance="subtle" spacing="compact" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cityMap: Record<string, string> = {
  "Zone A USA": "San Francisco",
  "Zone B USA": "Seattle",
  "Zone C USA": "Boston",
};

const userRoleAssignments: Record<string, string> = {
  "EMP-00001": "APEX System Admin | Comp",
  "EMP-00002": "APEX Executive Planner",
  "EMP-00003": "APEX Planner",
  "EMP-00004": "APEX Planner",
  "EMP-00005": "APEX Planner",
  "EMP-00006": "APEX Planner + Full Budget View",
  "EMP-00007": "APEX Planner",
  "EMP-00008": "APEX Planner",
  "EMP-00009": "APEX Planner",
  "EMP-00010": "APEX System Admin | HRBP",
  "EMP-00011": "APEX Planner",
  "EMP-00012": "APEX Planner",
};

const TOTAL_USERS = 13128;

function UsersTabContent() {
  const [usersSubTab, setUsersSubTab] = useState<"users" | "guests">("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const filteredEmployees = employeeData.filter((emp) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(q) ||
      `${emp.firstName.toLowerCase().charAt(0)}.${emp.lastName.toLowerCase()}@company.com`.includes(q)
    );
  });

  const subTabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: `${token("space.050")} ${token("space.150")}`,
    cursor: "pointer",
    background: "none",
    border: isActive ? `1px solid ${token("color.border")}` : `1px solid transparent`,
    borderRadius: token("border.radius.100"),
    color: isActive ? token("color.text") : token("color.text.subtlest"),
    fontWeight: isActive ? 600 : 400,
    fontSize: 14,
    backgroundColor: isActive ? token("elevation.surface.raised") : "transparent",
  });

  const avatarColors = [
    token("color.background.accent.blue.subtler"),
    token("color.background.accent.green.subtler"),
    token("color.background.accent.orange.subtler"),
    token("color.background.accent.purple.subtler"),
    token("color.background.accent.teal.subtler"),
  ];

  const avatarTextColors = [
    token("color.text.accent.blue"),
    token("color.text.accent.green"),
    token("color.text.accent.orange"),
    token("color.text.accent.purple"),
    token("color.text.accent.teal"),
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.200") }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: token("space.200") }}>
        <div style={{ flex: 1, maxWidth: 400 }}>
          <Textfield
            placeholder={`Search ${TOTAL_USERS.toLocaleString()} users by name or email`}
            elemBeforeInput={
              <div style={{ paddingLeft: token("space.100"), display: "flex", alignItems: "center" }}>
                <SearchIcon label="" color={token("color.icon.subtle")} />
              </div>
            }
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
          <Button appearance="subtle" iconBefore={ChevronDownIcon}>
            1 sort
          </Button>
          <Button appearance="subtle" iconBefore={TableColumnsDistributeIcon}>
            Columns
          </Button>
          <Button appearance="subtle" iconBefore={FilterIcon}>
            Filters
          </Button>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: token("space.100") }}>
          <button style={subTabStyle(usersSubTab === "users")} onClick={() => setUsersSubTab("users")}>
            Users
          </button>
          <button style={subTabStyle(usersSubTab === "guests")} onClick={() => setUsersSubTab("guests")}>
            Guests
          </button>
        </div>
        <div style={{ display: "flex", gap: token("space.100") }}>
          <Button appearance="default" iconBefore={TableColumnsDistributeIcon}>
            Add column
          </Button>
          <Button appearance="default" iconBefore={PersonAddIcon}>
            Add guest
          </Button>
          <Button appearance="default" iconBefore={DownloadIcon}>
            Download CSV
          </Button>
        </div>
      </div>

      {usersSubTab === "users" && (
        <>
          <div style={{ border: `1px solid ${token("color.border")}`, borderRadius: token("border.radius.200"), overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: token("elevation.surface.sunken") }}>
                  <th style={{ padding: `${token("space.100")} ${token("space.150")}`, width: 40, textAlign: "center" }}>
                    <Checkbox label="" />
                  </th>
                  {["USER", "DEPARTMENT", "TITLE", "LEVEL", "CITY", "ROLES"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: `${token("space.100")} ${token("space.150")}`,
                        textAlign: "left",
                        fontSize: 11,
                        fontWeight: 600,
                        color: token("color.text.subtlest"),
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp, i) => {
                  const email = `${emp.firstName.toLowerCase()}.${emp.lastName.charAt(0).toLowerCase()}@company.com`;
                  const city = cityMap[emp.location] || "Austin";
                  const roleLabel = userRoleAssignments[emp.id] || "APEX Planner";
                  const colorIdx = i % avatarColors.length;
                  const isManagerLevel = emp.level.startsWith("M");

                  return (
                    <tr
                      key={emp.id}
                      style={{
                        borderTop: `1px solid ${token("color.border")}`,
                      }}
                    >
                      <td style={{ padding: `${token("space.100")} ${token("space.150")}`, textAlign: "center" }}>
                        <Checkbox label="" />
                      </td>
                      <td style={{ padding: `${token("space.100")} ${token("space.150")}` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              backgroundColor: avatarColors[colorIdx],
                              color: avatarTextColors[colorIdx],
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 13,
                              fontWeight: 600,
                              flexShrink: 0,
                            }}
                          >
                            {emp.firstName.charAt(0)}
                          </div>
                          <div>
                            <Text size="small" weight="semibold">{emp.firstName} {emp.lastName}</Text>
                            <div>
                              <Text size="UNSAFE_small" color="color.text.subtlest">{email}</Text>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: `${token("space.100")} ${token("space.150")}` }}>
                        <Text size="small">{emp.dept}</Text>
                      </td>
                      <td style={{ padding: `${token("space.100")} ${token("space.150")}` }}>
                        <Text size="small">{emp.title}</Text>
                      </td>
                      <td style={{ padding: `${token("space.100")} ${token("space.150")}` }}>
                        <Lozenge appearance={isManagerLevel ? "success" : "inprogress"}>
                          {emp.level}
                        </Lozenge>
                      </td>
                      <td style={{ padding: `${token("space.100")} ${token("space.150")}` }}>
                        <Text size="small">{city}</Text>
                      </td>
                      <td style={{ padding: `${token("space.100")} ${token("space.150")}` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                          <Lozenge appearance="default">{roleLabel}</Lozenge>
                          <Button appearance="link" spacing="none">
                            + Add role
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Text size="small" color="color.text.subtlest">
              Showing <Text size="small" weight="bold" as="span">1-{filteredEmployees.length}</Text> of <Text size="small" weight="bold" as="span">{TOTAL_USERS.toLocaleString()}</Text> users
            </Text>
            <div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
              <Button appearance="subtle" spacing="compact" isDisabled>
                Previous
              </Button>
              {[1, 2, 3].map((p) => (
                <Button
                  key={p}
                  appearance={currentPage === p ? "primary" : "subtle"}
                  spacing="compact"
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </Button>
              ))}
              <Text size="small" color="color.text.subtlest">...</Text>
              <Button appearance="subtle" spacing="compact" onClick={() => setCurrentPage(1313)}>
                1313
              </Button>
              <Button appearance="subtle" spacing="compact">
                Next
              </Button>
            </div>
          </div>
        </>
      )}

      {usersSubTab === "guests" && (
        <div
          style={{
            border: `1px solid ${token("color.border")}`,
            borderRadius: token("border.radius.200"),
            padding: token("space.500"),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: token("space.200"),
          }}
        >
          <PersonAddIcon label="" color={token("color.icon.subtle")} />
          <Heading size="xsmall">No guests yet</Heading>
          <Text size="small" color="color.text.subtlest">
            Invite external collaborators to participate in compensation cycles with limited access.
          </Text>
          <Button appearance="primary" iconBefore={PersonAddIcon}>
            Add guest
          </Button>
        </div>
      )}
    </div>
  );
}

function UsersRolesStep() {
  const [activeTab, setActiveTab] = useState<"roles" | "users">("roles");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<typeof users[0] | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
    peopleGroups: "",
    permissions: "",
    linked: "",
  });

  const roleOptions = [
    { label: "admin", value: "admin" },
    { label: "manager", value: "manager" },
    { label: "leader", value: "leader" },
    { label: "planner", value: "planner" },
    { label: "hrbp", value: "hrbp" },
    { label: "employee", value: "employee" },
  ];

  const permissionOptions = [
    { label: "APEX System Admin | Comp", value: "APEX System Admin | Comp" },
    { label: "APEX Executive Planner", value: "APEX Executive Planner" },
    { label: "APEX Planner + Full Budget View", value: "APEX Planner + Full Budget View" },
    { label: "APEX System Admin | HRBP", value: "APEX System Admin | HRBP" },
    { label: "None", value: "" },
  ];

  const employeeLinkOptions = users.map((u) => ({
    label: u.linked,
    value: u.linked,
  }));

  const openEditDrawer = (user: typeof users[0]) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      peopleGroups: "",
      permissions: user.permissions,
      linked: user.linked,
    });
    setDrawerOpen(true);
  };

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: `${token("space.100")} ${token("space.200")}`,
    cursor: "pointer",
    color: isActive ? token("color.text.brand") : token("color.text.subtlest"),
    fontWeight: isActive ? 600 : 400,
    fontSize: 14,
    background: "none",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottomStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: isActive ? token("color.border.brand") : "transparent",
  });

  const LabelText = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginBottom: token("space.050") }}>
      <Text size="small" weight="semibold">{children}</Text>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
        <PeopleGroupIcon label="" color={token("color.icon.brand")} />
        <Heading size="medium">Users & Role Permissions</Heading>
      </div>

      <div style={{ display: "flex", gap: token("space.200"), borderBottom: `1px solid ${token("color.border")}` }}>
        <button style={tabStyle(activeTab === "roles")} onClick={() => setActiveTab("roles")}>
          Roles
        </button>
        <button style={tabStyle(activeTab === "users")} onClick={() => setActiveTab("users")}>
          Users
        </button>
      </div>

      {activeTab === "roles" && (
        <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Heading size="small">Role Permissions</Heading>
            <Button appearance="primary" iconBefore={PeopleGroupIcon}>
              Add Role
            </Button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: token("space.200") }}>
            {users.map((user, i) => (
              <div
                key={i}
                style={{
                  border: `1px solid ${token("color.border")}`,
                  borderRadius: token("border.radius.200"),
                  padding: token("space.300"),
                  backgroundColor: token("elevation.surface"),
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: token("space.050") }}>
                    <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), flexWrap: "wrap" }}>
                      <Text size="medium" weight="bold">{user.name}</Text>
                      <Lozenge
                        appearance={
                          user.role === "admin"
                            ? "removed"
                            : user.role === "manager"
                            ? "success"
                            : user.role === "leader"
                            ? "inprogress"
                            : user.role === "hrbp"
                            ? "moved"
                            : "default"
                        }
                      >
                        {user.role}
                      </Lozenge>
                      {user.permissions && (
                        <div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
                          <ShieldIcon label="" color={token("color.icon.subtle")} />
                          <Text size="small" color="color.text.subtlest">{user.permissions}</Text>
                        </div>
                      )}
                    </div>
                    <Text size="small" color="color.text.subtlest">
                      {user.username} · {user.email}
                    </Text>
                    <Text size="UNSAFE_small" color="color.text.subtlest">
                      Linked: {user.linked}
                    </Text>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                    <IconButton icon={EditIcon} label="Edit" appearance="subtle" spacing="compact" onClick={() => openEditDrawer(user)} />
                    <IconButton icon={DeleteIcon} label="Delete" appearance="subtle" spacing="compact" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <UsersTabContent />
      )}

      {drawerOpen && (
        <div
          style={{
            position: "fixed",
            top: "calc(var(--n_bnrM, 0px) + var(--n_tNvM, 0px))",
            right: 0,
            height: "calc(100vh - var(--n_bnrM, 0px) - var(--n_tNvM, 0px))",
            width: 480,
            backgroundColor: token("elevation.surface.overlay"),
            boxShadow: token("elevation.shadow.overlay"),
            zIndex: 500,
            overflowY: "auto",
            animation: "slideInRight 200ms ease-out",
          }}
        >
          <div style={{ position: "absolute", top: token("space.200"), right: token("space.200"), zIndex: 1 }}>
            <IconButton icon={CrossIcon} label="Close" appearance="subtle" onClick={() => setDrawerOpen(false)} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: token("space.300"), padding: token("space.400") }}>
            <Heading size="large">Edit Role</Heading>
            <div>
              <LabelText>Display Name</LabelText>
              <Textfield
                value={editForm.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
            </div>

            <div>
              <LabelText>Username</LabelText>
              <Textfield
                value={editForm.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditForm({ ...editForm, username: e.target.value })
                }
              />
            </div>

            <div>
              <LabelText>Email</LabelText>
              <Textfield
                value={editForm.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
              />
            </div>

            <div>
              <LabelText>Role</LabelText>
              <Select
                options={roleOptions}
                value={roleOptions.find((o) => o.value === editForm.role)}
                onChange={(opt) => opt && setEditForm({ ...editForm, role: opt.value })}
              />
            </div>

            <div>
              <LabelText>People and Groups</LabelText>
              <Textfield
                value={editForm.peopleGroups}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditForm({ ...editForm, peopleGroups: e.target.value })
                }
                placeholder="Search and add people or groups..."
              />
            </div>

            <div>
              <LabelText>Permissions</LabelText>
              <Select
                options={permissionOptions}
                value={permissionOptions.find((o) => o.value === editForm.permissions)}
                onChange={(opt) => opt && setEditForm({ ...editForm, permissions: opt.value })}
              />
            </div>

            <div>
              <LabelText>Employee Link</LabelText>
              <Select
                options={employeeLinkOptions}
                value={employeeLinkOptions.find((o) => o.value === editForm.linked)}
                onChange={(opt) => opt && setEditForm({ ...editForm, linked: opt.value })}
              />
            </div>

            <div style={{ display: "flex", gap: token("space.200"), marginTop: token("space.200") }}>
              <Button appearance="primary" onClick={() => setDrawerOpen(false)}>Save</Button>
              <Button appearance="subtle" onClick={() => setDrawerOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldPermissionsStep({
  selectedRole,
  setSelectedRole,
  fieldPermissions,
  toggleFieldPermission,
}: {
  selectedRole: string;
  setSelectedRole: (v: string) => void;
  fieldPermissions: typeof fieldPermissionsData;
  toggleFieldPermission: (id: string, type: "visible" | "editable") => void;
}) {
  const thStyle: React.CSSProperties = {
    padding: `${token("space.100")} ${token("space.150")}`,
    textAlign: "left",
    fontSize: 11,
    fontWeight: 600,
    color: token("color.text.subtlest"),
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
  };

  const tdStyle: React.CSSProperties = {
    padding: `${token("space.075")} ${token("space.150")}`,
    verticalAlign: "middle",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: token("space.200") }}>
            <Heading size="medium">Columns</Heading>
            <Button appearance="link" spacing="none">View Audit Log</Button>
          </div>
          <div style={{ marginTop: token("space.100") }}>
            <Text size="small" color="color.text.subtlest">
              Specify the columns that will appear in the Planner and surrogate which roles will be able to view and edit them.{" "}
              <Button appearance="link" spacing="none">Learn more about columns</Button>
            </Text>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: token("space.100") }}>
        <Button appearance="default" iconBefore={EyeOpenIcon}>
          View Columns by Role
        </Button>
        <Button appearance="default" iconBefore={EditIcon}>
          Edit Column Order
        </Button>
        <Button appearance="primary" iconBefore={AddIcon}>
          Add New Column
        </Button>
      </div>

      <div style={{ border: `1px solid ${token("color.border")}`, borderRadius: token("border.radius.200"), overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1100 }}>
            <thead>
              <tr style={{ backgroundColor: token("elevation.surface.sunken") }}>
                <th style={{ ...thStyle, width: 36, textAlign: "center" }}>
                  <Checkbox label="" />
                </th>
                <th style={{ ...thStyle, width: 28 }}></th>
                <th style={{ ...thStyle, minWidth: 200 }}>Column Name</th>
                <th style={thStyle}>Data Source</th>
                <th style={thStyle}>Data Display Type</th>
                <th style={thStyle}>Reward Letter Status</th>
                <th style={thStyle}>Column Default</th>
                <th style={{ ...thStyle, minWidth: 280 }}>Permissions</th>
              </tr>
            </thead>
            <tbody>
              {fieldPermissions.map((field) => (
                <tr key={field.id} style={{ borderTop: `1px solid ${token("color.border")}` }}>
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    <Checkbox label="" />
                  </td>
                  <td style={tdStyle}>
                    {field.locked && <LockLockedIcon label="Locked" color={token("color.icon.subtle")} />}
                  </td>
                  <td style={tdStyle}>
                    <div>
                      <Text size="small" weight="medium">{field.name}</Text>
                      {field.variable && (
                        <div>
                          <Text size="UNSAFE_small" color="color.text.subtlest">{field.variable}</Text>
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{field.dataSource || ""}</Text>
                  </td>
                  <td style={tdStyle}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{field.displayType || ""}</Text>
                  </td>
                  <td style={tdStyle}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{field.rewardLetter ? "Yes" : "No"}</Text>
                  </td>
                  <td style={tdStyle}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{field.columnDefault || "Visible"}</Text>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: token("space.050"), flexWrap: "wrap" }}>
                      {(field.permissions || []).map((p, pi) => (
                        <Lozenge key={pi} appearance={p.appearance}>{p.role}</Lozenge>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function RewardLetterStep({
  selectedTemplate,
  setSelectedTemplate,
  includePerformance,
  setIncludePerformance,
  includeComparison,
  setIncludeComparison,
  customMessage,
  setCustomMessage,
}: {
  selectedTemplate: string;
  setSelectedTemplate: (v: string) => void;
  includePerformance: boolean;
  setIncludePerformance: (v: boolean) => void;
  includeComparison: boolean;
  setIncludeComparison: (v: boolean) => void;
  customMessage: string;
  setCustomMessage: (v: string) => void;
}) {
  const templateOptions = [
    { label: "Standard Template", value: "standard" },
    { label: "Executive Template", value: "executive" },
    { label: "Minimal Template", value: "minimal" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
        <EmailIcon label="" color={token("color.icon.brand")} />
        <Heading size="medium">Reward Letter</Heading>
      </div>

      <div style={cardStyle}>
        <Heading size="xsmall">Template Selection</Heading>
        <div style={{ marginTop: token("space.200") }}>
          <LabelText>Letter Template</LabelText>
          <Select
            options={templateOptions}
            value={templateOptions.find((o) => o.value === selectedTemplate)}
            onChange={(opt) => opt && setSelectedTemplate(opt.value)}
          />
        </div>
      </div>

      <div style={cardStyle}>
        <Heading size="xsmall">Content Options</Heading>
        <div style={{ display: "flex", flexDirection: "column", gap: token("space.200"), marginTop: token("space.200") }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <Text size="small" weight="semibold">Include Performance Summary</Text>
              <div>
                <Text size="UNSAFE_small" color="color.text.subtlest">Show performance rating and summary in the reward letter</Text>
              </div>
            </div>
            <Toggle
              isChecked={includePerformance}
              onChange={() => setIncludePerformance(!includePerformance)}
              label="Include performance"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <Text size="small" weight="semibold">Include Year-over-Year Comparison</Text>
              <div>
                <Text size="UNSAFE_small" color="color.text.subtlest">Show comparison with previous compensation</Text>
              </div>
            </div>
            <Toggle
              isChecked={includeComparison}
              onChange={() => setIncludeComparison(!includeComparison)}
              label="Include comparison"
            />
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <Heading size="xsmall">Custom Message</Heading>
        <div style={{ marginTop: token("space.200") }}>
          <TextArea
            value={customMessage}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomMessage(e.target.value)}
            placeholder="Add a personalized message to include in all reward letters..."
            minimumRows={4}
          />
        </div>
      </div>

      <div style={cardStyle}>
        <Heading size="xsmall">Preview</Heading>
        <div
          style={{
            marginTop: token("space.200"),
            border: `1px solid ${token("color.border")}`,
            borderRadius: token("border.radius.200"),
            padding: token("space.300"),
            backgroundColor: token("elevation.surface.sunken"),
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), marginBottom: token("space.200") }}>
            <EmailIcon label="" color={token("color.icon.brand")} />
            <Heading size="xsmall">Your Compensation Update</Heading>
          </div>
          <Text size="small" color="color.text.subtlest">
            Dear [Employee Name],
          </Text>
          <div style={{ marginTop: token("space.150") }}>
            <Text size="small" color="color.text.subtlest">
              We are pleased to inform you of your compensation adjustment effective [Effective Date]. Your new base salary will be [New Salary], reflecting a [Merit %] merit increase.
            </Text>
          </div>
          {includePerformance && (
            <div style={{ marginTop: token("space.150") }}>
              <Text size="small" color="color.text.subtlest">
                This adjustment recognizes your [Performance Rating] performance rating and contributions to the team.
              </Text>
            </div>
          )}
          {customMessage && (
            <div style={{ marginTop: token("space.150") }}>
              <Text size="small" color="color.text.subtlest">
                {customMessage}
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewFinalizeStep({
  formData,
  setCurrentStep,
}: {
  formData: { name: string; type: string; startDate: string; endDate: string; description: string };
  setCurrentStep: (v: number) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
        <CheckCircleIcon label="" color={token("color.icon.brand")} />
        <Heading size="medium">Review & Finalize</Heading>
      </div>

      <SectionMessage appearance="information">
        <Text size="small">
          Review all your cycle settings before finalizing. You can click on any section header to go back and make changes.
        </Text>
      </SectionMessage>

      <div style={cardStyle}>
        <div
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
          onClick={() => setCurrentStep(0)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
            <CheckCircleIcon label="" color={token("color.icon.success")} />
            <Heading size="xsmall">Cycle Details</Heading>
          </div>
          <Button appearance="link" spacing="none" onClick={() => setCurrentStep(0)}>
            Edit
          </Button>
        </div>
        <div style={{ marginTop: token("space.200"), paddingLeft: token("space.300") }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: token("space.200") }}>
            <div>
              <Text size="UNSAFE_small" color="color.text.subtlest">Cycle Name</Text>
              <div>
                <Text size="small" weight="semibold">{formData.name || "Not set"}</Text>
              </div>
            </div>
            <div>
              <Text size="UNSAFE_small" color="color.text.subtlest">Cycle Type</Text>
              <div>
                <Text size="small" weight="semibold">
                  {typeOptions.find((o) => o.value === formData.type)?.label || formData.type}
                </Text>
              </div>
            </div>
            <div>
              <Text size="UNSAFE_small" color="color.text.subtlest">Timeline</Text>
              <div>
                <Text size="small" weight="semibold">
                  {formData.startDate && formData.endDate
                    ? `${formData.startDate} - ${formData.endDate}`
                    : "Not set"}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      {[
        { step: 1, label: "Data Integrations", status: "3 data sources configured" },
        { step: 2, label: "Employee Data Grid", status: "52 employees loaded" },
        { step: 3, label: "Eligibility Rules", status: "3 active rules" },
        { step: 4, label: "Budget & FX Rates", status: "Budget and 6 FX rates configured" },
        { step: 5, label: "Salary Bands", status: "7 bands configured" },
        { step: 6, label: "Users & Roles", status: "6 users configured" },
        { step: 7, label: "Field Permissions", status: "30 fields configured" },
        { step: 8, label: "Reward Letter", status: "Template selected" },
      ].map((section) => (
        <div key={section.step} style={cardStyle}>
          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
            onClick={() => setCurrentStep(section.step)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
              <CheckCircleIcon label="" color={token("color.icon.success")} />
              <Heading size="xsmall">{section.label}</Heading>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: token("space.200") }}>
              <Text size="UNSAFE_small" color="color.text.subtlest">{section.status}</Text>
              <Button appearance="link" spacing="none" onClick={() => setCurrentStep(section.step)}>
                Edit
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
