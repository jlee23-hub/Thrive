import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import Button, { IconButton } from "@atlaskit/button/new";
import Textfield from "@atlaskit/textfield";
import Lozenge from "@atlaskit/lozenge";
import Toggle from "@atlaskit/toggle";
import SectionMessage from "@atlaskit/section-message";
import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import { Checkbox } from "@atlaskit/checkbox";

import DatabaseIcon from "@atlaskit/icon/core/database";
import RefreshIcon from "@atlaskit/icon/core/refresh";
import AddIcon from "@atlaskit/icon/core/add";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";
import CheckCircleIcon from "@atlaskit/icon/core/check-circle";
import UploadIcon from "@atlaskit/icon/core/upload";
import ChartTrendIcon from "@atlaskit/icon/core/chart-trend";
import WarningIcon from "@atlaskit/icon/core/warning";
import ErrorIcon from "@atlaskit/icon/core/error";
import ClockIcon from "@atlaskit/icon/core/clock";
import LinkExternalIcon from "@atlaskit/icon/core/link-external";
import SearchIcon from "@atlaskit/icon/core/search";
import CrossCircleIcon from "@atlaskit/icon/core/cross-circle";

interface FieldMapping {
  sourceField: string;
  thriveField: string;
  dataType: string;
  isRequired: boolean;
  isMapped: boolean;
  transform?: string;
}

interface DataTable {
  id: string;
  name: string;
  records: number;
  lastUpdated: string;
  syncEnabled: boolean;
  fields: { field: string; column: string; desc: string; isUpdated?: boolean }[];
}

interface DataSource {
  id: string;
  name: string;
  type: string;
  status: "connected" | "pending" | "disconnected";
  color: string;
  tables: DataTable[];
  lastSync?: string;
}

interface SyncHistoryEntry {
  id: string;
  source: string;
  table: string;
  timestamp: string;
  status: "success" | "partial" | "failed";
  recordsSynced: number;
  recordsFailed: number;
  duration: string;
  initiatedBy: string;
  errorMessage?: string;
}

interface ErrorEntry {
  id: string;
  source: string;
  type: "connection" | "sync" | "mapping" | "auth" | "timeout";
  severity: "critical" | "warning" | "info";
  message: string;
  timestamp: string;
  resolved: boolean;
  details?: string;
}

const workdayFieldMappings: FieldMapping[] = [
  { sourceField: "Worker_ID", thriveField: "employeeWkRef", dataType: "String", isRequired: true, isMapped: true },
  { sourceField: "Legal_First_Name", thriveField: "firstName", dataType: "String", isRequired: true, isMapped: true },
  { sourceField: "Legal_Last_Name", thriveField: "lastName", dataType: "String", isRequired: true, isMapped: true },
  { sourceField: "Email_Address", thriveField: "email", dataType: "String", isRequired: true, isMapped: true },
  { sourceField: "Business_Title", thriveField: "title", dataType: "String", isRequired: false, isMapped: true },
  { sourceField: "Job_Profile_Level", thriveField: "level", dataType: "String", isRequired: true, isMapped: true, transform: "mapToP-Level" },
  { sourceField: "Supervisory_Organization", thriveField: "department", dataType: "String", isRequired: false, isMapped: true },
  { sourceField: "Primary_Work_Address", thriveField: "location", dataType: "String", isRequired: false, isMapped: true },
  { sourceField: "Manager_Reference", thriveField: "managerId", dataType: "Reference", isRequired: false, isMapped: true },
  { sourceField: "Hire_Date", thriveField: "hireDate", dataType: "Date", isRequired: true, isMapped: true, transform: "ISO8601" },
  { sourceField: "Annual_Base_Pay", thriveField: "currentSalary", dataType: "Currency", isRequired: true, isMapped: true, transform: "toCents" },
  { sourceField: "Bonus_Plan_Percent", thriveField: "bonusTarget", dataType: "Decimal", isRequired: false, isMapped: true },
  { sourceField: "Review_Rating", thriveField: "performanceRating", dataType: "String", isRequired: false, isMapped: true },
  { sourceField: "Employee_Type", thriveField: "employeeType", dataType: "String", isRequired: true, isMapped: true, transform: "filterInternCasual" },
  { sourceField: "Worker_Status", thriveField: "status", dataType: "String", isRequired: true, isMapped: true },
  { sourceField: "Cost_Center_Code", thriveField: "", dataType: "String", isRequired: false, isMapped: false },
  { sourceField: "FTE_Percent", thriveField: "", dataType: "Decimal", isRequired: false, isMapped: false },
];

const shareworksFieldMappings: FieldMapping[] = [
  { sourceField: "Participant_ID", thriveField: "employeeId", dataType: "String", isRequired: true, isMapped: true },
  { sourceField: "Grant_Date", thriveField: "grantDate", dataType: "Date", isRequired: true, isMapped: true, transform: "ISO8601" },
  { sourceField: "Award_Type", thriveField: "grantType", dataType: "Enum", isRequired: true, isMapped: true, transform: "mapAwardType" },
  { sourceField: "Total_Shares_Granted", thriveField: "totalUnits", dataType: "Integer", isRequired: true, isMapped: true },
  { sourceField: "Shares_Vested", thriveField: "vestedUnits", dataType: "Integer", isRequired: true, isMapped: true },
  { sourceField: "Vesting_Schedule_Type", thriveField: "vestingSchedule", dataType: "String", isRequired: false, isMapped: true },
  { sourceField: "Grant_Price_USD", thriveField: "grantPrice", dataType: "Currency", isRequired: true, isMapped: true },
  { sourceField: "Current_FMV", thriveField: "currentPrice", dataType: "Currency", isRequired: false, isMapped: true },
  { sourceField: "Plan_Name", thriveField: "", dataType: "String", isRequired: false, isMapped: false },
  { sourceField: "Expiration_Date", thriveField: "", dataType: "Date", isRequired: false, isMapped: false },
];

const syncHistory: SyncHistoryEntry[] = [
  { id: "sh-1", source: "Workday RaaS", table: "CRINT Pave Employee Compensation Records", timestamp: "02/25/26 3:45 PM", status: "success", recordsSynced: 1247, recordsFailed: 0, duration: "2m 14s", initiatedBy: "Scheduled" },
  { id: "sh-2", source: "Shareworks", table: "Equity Grants", timestamp: "02/25/26 3:42 PM", status: "success", recordsSynced: 456, recordsFailed: 0, duration: "58s", initiatedBy: "Scheduled" },
  { id: "sh-3", source: "Workday RaaS", table: "CRINT Pave-Employee Eligible Earnings", timestamp: "02/25/26 3:45 PM", status: "success", recordsSynced: 1198, recordsFailed: 0, duration: "48s", initiatedBy: "Scheduled" },
  { id: "sh-4", source: "Shareworks", table: "Vesting Schedule", timestamp: "02/25/26 3:42 PM", status: "partial", recordsSynced: 884, recordsFailed: 8, duration: "1m 32s", initiatedBy: "Scheduled", errorMessage: "8 records had invalid vesting dates" },
  { id: "sh-5", source: "Workday RaaS", table: "CRINT Pave-Compensation History", timestamp: "02/25/26 3:45 PM", status: "success", recordsSynced: 3421, recordsFailed: 0, duration: "3m 45s", initiatedBy: "Scheduled" },
  { id: "sh-6", source: "Workday Studio", table: "INT_WD_Pave_Integration_Inbound", timestamp: "02/20/26 11:30 AM", status: "success", recordsSynced: 342, recordsFailed: 0, duration: "5m 12s", initiatedBy: "Manual — jdoe@company.com" },
  { id: "sh-7", source: "Workday Studio", table: "INT_WD_Pave_Bonus_Inbound", timestamp: "02/20/26 11:32 AM", status: "partial", recordsSynced: 86, recordsFailed: 3, duration: "1m 08s", initiatedBy: "INT_WD_Pave_Integration_Inbound", errorMessage: "3 bonus payments failed: invalid Bonus_Plan reference for WK-00891, WK-01044, WK-01203" },
  { id: "sh-8", source: "Workday Studio", table: "INT_WD_Pave_Add_Stock_Grant", timestamp: "02/20/26 11:34 AM", status: "success", recordsSynced: 156, recordsFailed: 0, duration: "2m 20s", initiatedBy: "INT_WD_Pave_Integration_Inbound" },
  { id: "sh-9", source: "Workday Studio", table: "INT_WD_PAVE_RequestComp_Inbound", timestamp: "02/20/26 11:36 AM", status: "success", recordsSynced: 97, recordsFailed: 0, duration: "1m 44s", initiatedBy: "INT_WD_Pave_Integration_Inbound" },
  { id: "sh-10", source: "Workday RaaS", table: "CRINT Pave Employee Compensation Records", timestamp: "02/24/26 3:45 PM", status: "success", recordsSynced: 1245, recordsFailed: 0, duration: "2m 08s", initiatedBy: "Scheduled" },
  { id: "sh-11", source: "Workday RaaS", table: "CRINT Pave-Compensation History", timestamp: "02/24/26 3:45 PM", status: "failed", recordsSynced: 0, recordsFailed: 3421, duration: "0s", initiatedBy: "Manual — jdoe@company.com", errorMessage: "RaaS API rate limit exceeded. Retry after 60 seconds." },
  { id: "sh-12", source: "Shareworks", table: "Equity Grants", timestamp: "02/24/26 3:42 PM", status: "success", recordsSynced: 454, recordsFailed: 0, duration: "55s", initiatedBy: "Scheduled" },
  { id: "sh-13", source: "Workday RaaS", table: "CRINT Pave Employee Compensation Records", timestamp: "02/22/26 3:45 PM", status: "partial", recordsSynced: 1240, recordsFailed: 3, duration: "2m 22s", initiatedBy: "Scheduled", errorMessage: "3 records missing required Manager_Reference field" },
];

const errors: ErrorEntry[] = [
  { id: "e-1", source: "Shareworks", type: "sync", severity: "warning", message: "8 vesting records have dates outside the expected range (2024-2030)", timestamp: "02/25/26 3:43 PM", resolved: false, details: "Records with Participant_IDs: SW-1042, SW-1055, SW-1089, SW-1102, SW-1134, SW-1167, SW-1190, SW-1203 have vesting dates before 2024 or after 2030. These records were skipped during sync." },
  { id: "e-2", source: "Workday RaaS", type: "auth", severity: "info", message: "Workday RaaS API token will expire in 14 days", timestamp: "02/25/26 12:00 AM", resolved: false, details: "The current Workday RaaS API token was issued on 01/25/26 and expires on 03/11/26. Generate a new token in Workday Admin before expiry to avoid disruption to CRINT Pave reports." },
  { id: "e-3", source: "Workday Studio", type: "sync", severity: "warning", message: "INT_WD_Pave_Bonus_Inbound — 3 bonus payments failed with invalid Bonus_Plan reference", timestamp: "02/20/26 11:33 AM", resolved: false, details: "Workers WK-00891, WK-01044, and WK-01203 have Bonus_Plan values that do not match any active plan in Workday. This child integration can be re-run individually with a correction file after fixing the Bonus_Plan references." },
  { id: "e-4", source: "Workday RaaS", type: "sync", severity: "critical", message: "CRINT Pave-Compensation History sync failed — RaaS API rate limit exceeded", timestamp: "02/24/26 3:45 PM", resolved: true, details: "Manual sync of CRINT Pave-Compensation History triggered rate limiting on the Workday RaaS endpoint. The 2-year lookback period pulls a large volume of salary and bonus change events. The scheduled sync at the next interval completed successfully. Consider spacing out manual syncs." },
  { id: "e-5", source: "Workday RaaS", type: "mapping", severity: "warning", message: "CRINT Pave Employee Compensation Records — 3 records missing Manager_Reference", timestamp: "02/22/26 3:47 PM", resolved: true, details: "Employee IDs: WK-00412, WK-00789, WK-01102 have null Manager_Reference values in the RaaS report. These active workers were synced with empty manager fields. Verify in Workday if these are new hires awaiting manager assignment. Data selection excludes intern and casual employee types, so these are regular employees." },
  { id: "e-6", source: "Shareworks", type: "connection", severity: "info", message: "Shareworks API response time elevated (avg 2.8s vs normal 0.8s)", timestamp: "02/21/26 2:15 PM", resolved: true, details: "Shareworks API experienced higher than normal latency. This may be due to maintenance on their end. Performance returned to normal by 02/21/26 4:00 PM." },
  { id: "e-7", source: "Workday Studio", type: "sync", severity: "info", message: "INT_WD_Pave_Integration_Inbound completed — promotion file aggregated via Change Job operation", timestamp: "02/20/26 11:38 AM", resolved: true, details: "Parent studio integration successfully processed inbound zip file. Change Job (promotions), Add Stock Grant, Request Comp Change, and Add Bonus Payment operations were submitted via Workday API. 3 bonus payment errors were routed to INT_WD_Pave_Bonus_Inbound for correction file reprocessing." },
];

const dataSources: DataSource[] = [
  {
    id: "workday",
    name: "Workday",
    type: "HRIS",
    status: "connected",
    color: token("color.chart.blue.bold"),
    lastSync: "02/25/26 3:45 PM",
    tables: [
      {
        id: "raas-emp",
        name: "CRINT Pave Employee Compensation Records",
        records: 1247,
        lastUpdated: "02/25/26 3:45 PM",
        syncEnabled: true,
        fields: [
          { field: "Worker ID", column: "Worker_ID", desc: "Unique worker identifier from Workday" },
          { field: "Legal First Name", column: "Legal_First_Name", desc: "Legal first name" },
          { field: "Legal Last Name", column: "Legal_Last_Name", desc: "Legal last name" },
          { field: "Email Address", column: "Email_Address", desc: "Corporate email address", isUpdated: true },
          { field: "Business Title", column: "Business_Title", desc: "Current job title" },
          { field: "Job Profile Level", column: "Job_Profile_Level", desc: "Job level (P20, P30, P40, etc.)", isUpdated: true },
          { field: "Supervisory Organization", column: "Supervisory_Organization", desc: "Department / org unit" },
          { field: "Primary Work Address", column: "Primary_Work_Address", desc: "Primary work location", isUpdated: true },
          { field: "Manager Reference", column: "Manager_Reference", desc: "Reporting manager worker reference" },
          { field: "Hire Date", column: "Hire_Date", desc: "Original hire date" },
          { field: "Annual Base Pay", column: "Annual_Base_Pay", desc: "Current annual base salary", isUpdated: true },
          { field: "Bonus Plan Percent", column: "Bonus_Plan_Percent", desc: "Target bonus percentage" },
          { field: "Review Rating", column: "Review_Rating", desc: "Latest annual performance rating" },
          { field: "Employee Type", column: "Employee_Type", desc: "Employee type (excludes intern/casual)" },
          { field: "Worker Status", column: "Worker_Status", desc: "Active or terminated status" },
        ],
      },
      {
        id: "raas-comp",
        name: "CRINT Pave-Compensation History",
        records: 3421,
        lastUpdated: "02/25/26 3:45 PM",
        syncEnabled: true,
        fields: [
          { field: "Worker ID", column: "Worker_ID", desc: "Employee reference" },
          { field: "Effective Date", column: "Effective_Date", desc: "Date compensation change became effective" },
          { field: "Comp Change Reason", column: "Compensation_Change_Reason", desc: "Reason for compensation change" },
          { field: "Previous Base Salary", column: "Previous_Base_Salary", desc: "Base salary before change" },
          { field: "New Base Salary", column: "New_Base_Salary", desc: "Base salary after change" },
          { field: "Salary Change %", column: "Salary_Change_Percent", desc: "Percentage salary increase" },
          { field: "Previous Bonus Target", column: "Previous_Bonus_Target", desc: "Bonus target before change" },
          { field: "New Bonus Target", column: "New_Bonus_Target", desc: "Bonus target after change" },
        ],
      },
      {
        id: "raas-earnings",
        name: "CRINT Pave-Employee Eligible Earnings",
        records: 1198,
        lastUpdated: "02/25/26 3:45 PM",
        syncEnabled: true,
        fields: [
          { field: "Worker ID", column: "Worker_ID", desc: "Employee reference" },
          { field: "Eligible Earnings Override", column: "Eligible_Earnings_Override", desc: "Current eligible earnings override amount" },
          { field: "Bonus Plan Name", column: "Bonus_Plan_Name", desc: "Name of the bonus plan" },
          { field: "Bonus Target Amount", column: "Bonus_Target_Amount", desc: "Target bonus amount for the period" },
          { field: "Override Period", column: "Override_Period", desc: "Current eligible earnings override period" },
          { field: "Plan Assignment Date", column: "Plan_Assignment_Date", desc: "Date employee was assigned to plan" },
        ],
      },
      {
        id: "int-parent",
        name: "INT_WD_Pave_Integration_Inbound",
        records: 342,
        lastUpdated: "02/20/26 11:30 AM",
        syncEnabled: true,
        fields: [
          { field: "Operation Type", column: "Operation_Type", desc: "Change Job, Add Stock Grant, Request Comp Change, or Add Bonus Payment" },
          { field: "Worker ID", column: "Worker_ID", desc: "Target employee for the operation" },
          { field: "Effective Date", column: "Effective_Date", desc: "Effective date of the change" },
          { field: "File Name", column: "Source_File", desc: "Source zip file containing inbound records" },
          { field: "Submission Status", column: "Submission_Status", desc: "API request submission status" },
          { field: "Error Message", column: "Error_Message", desc: "Error details if submission failed" },
        ],
      },
      {
        id: "int-bonus",
        name: "INT_WD_Pave_Bonus_Inbound",
        records: 89,
        lastUpdated: "02/20/26 11:30 AM",
        syncEnabled: true,
        fields: [
          { field: "Worker ID", column: "Worker_ID", desc: "Target employee for bonus payment" },
          { field: "Bonus Amount", column: "Bonus_Amount", desc: "Bonus payment amount" },
          { field: "Bonus Plan", column: "Bonus_Plan", desc: "Bonus plan name" },
          { field: "Payment Date", column: "Payment_Date", desc: "Scheduled payment date" },
          { field: "Submission Status", column: "Submission_Status", desc: "API request submission status" },
        ],
      },
      {
        id: "int-stock",
        name: "INT_WD_Pave_Add_Stock_Grant",
        records: 156,
        lastUpdated: "02/20/26 11:30 AM",
        syncEnabled: true,
        fields: [
          { field: "Worker ID", column: "Worker_ID", desc: "Target employee for stock grant" },
          { field: "Grant Type", column: "Grant_Type", desc: "RSU, ISO, NSO, etc." },
          { field: "Shares Granted", column: "Shares_Granted", desc: "Number of shares/units" },
          { field: "Grant Date", column: "Grant_Date", desc: "Date of stock grant" },
          { field: "Vesting Schedule", column: "Vesting_Schedule", desc: "Vesting schedule type" },
          { field: "Submission Status", column: "Submission_Status", desc: "API request submission status" },
        ],
      },
      {
        id: "int-comp",
        name: "INT_WD_PAVE_RequestComp_Inbound",
        records: 97,
        lastUpdated: "02/20/26 11:30 AM",
        syncEnabled: true,
        fields: [
          { field: "Worker ID", column: "Worker_ID", desc: "Target employee for comp change" },
          { field: "New Base Salary", column: "New_Base_Salary", desc: "New annual base salary" },
          { field: "Comp Change Reason", column: "Compensation_Change_Reason", desc: "Reason for compensation change" },
          { field: "Effective Date", column: "Effective_Date", desc: "Date change takes effect" },
          { field: "Submission Status", column: "Submission_Status", desc: "API request submission status" },
        ],
      },
    ],
  },
  {
    id: "shareworks",
    name: "Shareworks",
    type: "Equity Management",
    status: "connected",
    color: token("color.chart.green.bold"),
    lastSync: "02/25/26 3:42 PM",
    tables: [
      {
        id: "equity-1",
        name: "Equity Grants",
        records: 456,
        lastUpdated: "02/25/26 3:42 PM",
        syncEnabled: true,
        fields: [
          { field: "Participant ID", column: "Participant_ID", desc: "Employee identifier in Shareworks" },
          { field: "Grant Date", column: "Grant_Date", desc: "Date equity was granted" },
          { field: "Award Type", column: "Award_Type", desc: "RSU, ISO, NSO, etc." },
          { field: "Total Shares Granted", column: "Total_Shares_Granted", desc: "Total shares/units granted" },
          { field: "Shares Vested", column: "Shares_Vested", desc: "Units vested to date" },
          { field: "Vesting Schedule Type", column: "Vesting_Schedule_Type", desc: "Vesting cadence" },
          { field: "Grant Price (USD)", column: "Grant_Price_USD", desc: "Price at grant date" },
          { field: "Current FMV", column: "Current_FMV", desc: "Current fair market value" },
        ],
      },
      {
        id: "vest-1",
        name: "Vesting Schedule",
        records: 892,
        lastUpdated: "02/25/26 3:42 PM",
        syncEnabled: true,
        fields: [
          { field: "Grant ID", column: "Grant_ID", desc: "Reference to equity grant" },
          { field: "Vesting Date", column: "Vesting_Date", desc: "Date shares vest" },
          { field: "Shares to Vest", column: "Shares_To_Vest", desc: "Number of shares vesting this period" },
          { field: "Vesting Status", column: "Vesting_Status", desc: "Pending, vested, or forfeited" },
        ],
      },
    ],
  },
  {
    id: "csv-upload",
    name: "CSV Upload",
    type: "Manual Upload",
    status: "connected",
    color: token("color.chart.purple.bold"),
    tables: [],
  },
];

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: "6px",
  border: `1px solid ${token("color.border")}`,
  overflow: "hidden",
};

type ActiveTab = "connections" | "field-mapping" | "errors" | "history";

interface ConnectionTestResult {
  status: "idle" | "testing" | "success" | "failed";
  message?: string;
  latency?: string;
}

export default function DataManagement() {
  const [selectedSource, setSelectedSource] = useState<string | null>("workday");
  const [expandedTable, setExpandedTable] = useState<string | null>(null);
  const [isApiSetupExpanded, setIsApiSetupExpanded] = useState(true);
  const [sources, setSources] = useState(dataSources);
  const [activeTab, setActiveTab] = useState(0);
  const [workdayTest, setWorkdayTest] = useState<ConnectionTestResult>({ status: "idle" });
  const [shareworksTest, setShareworksTest] = useState<ConnectionTestResult>({ status: "idle" });
  const [errorFilter, setErrorFilter] = useState<"all" | "unresolved" | "resolved">("all");
  const [historySearch, setHistorySearch] = useState("");

  const handleToggleSync = (sourceId: string, tableId: string) => {
    setSources((prev) =>
      prev.map((source) => {
        if (source.id === sourceId) {
          return {
            ...source,
            tables: source.tables.map((table) =>
              table.id === tableId ? { ...table, syncEnabled: !table.syncEnabled } : table
            ),
          };
        }
        return source;
      })
    );
  };

  const handleTestConnection = (api: "workday" | "shareworks") => {
    const setter = api === "workday" ? setWorkdayTest : setShareworksTest;
    setter({ status: "testing" });
    setTimeout(() => {
      setter({ status: "success", message: "Connection established successfully", latency: api === "workday" ? "142ms" : "89ms" });
    }, 2000);
  };

  const selectedSourceData = sources.find((s) => s.id === selectedSource);
  const currentFieldMappings = selectedSource === "workday" ? workdayFieldMappings : selectedSource === "shareworks" ? shareworksFieldMappings : [];

  const filteredErrors = errors.filter((e) => {
    if (errorFilter === "unresolved") return !e.resolved;
    if (errorFilter === "resolved") return e.resolved;
    return true;
  });

  const filteredHistory = syncHistory.filter((h) => {
    if (!historySearch) return true;
    const search = historySearch.toLowerCase();
    return h.source.toLowerCase().includes(search) || h.table.toLowerCase().includes(search) || h.status.includes(search);
  });

  const unresolvedCount = errors.filter((e) => !e.resolved).length;

  const tabLabels = ["Connections & API Setup", "Field Mapping", `Errors${unresolvedCount > 0 ? ` (${unresolvedCount})` : ""}`, "Sync History"];

  return (
    <div style={{ backgroundColor: token("elevation.surface.sunken"), minHeight: "100%" }}>
      <div
        style={{
          backgroundColor: token("elevation.surface"),
          borderBottom: `2px solid ${token("color.border")}`,
          padding: `${token("space.300")} ${token("space.400")}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <Heading size="large">Data Management</Heading>
            <div style={{ marginTop: token("space.100") }}>
              <Text size="small" color="color.text.subtlest">
                Connect APIs, map fields, monitor sync status, and troubleshoot data integration issues
              </Text>
            </div>
          </div>
          <div style={{ display: "flex", gap: token("space.100") }}>
            <Button appearance="subtle" iconBefore={RefreshIcon}>Sync All</Button>
            <Button appearance="primary" iconBefore={AddIcon}>Add Source</Button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: token("space.400") }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: token("space.300"), marginBottom: token("space.400") }}>
          {sources.map((source) => (
            <div
              key={source.id}
              onClick={() => setSelectedSource(source.id)}
              style={{
                ...cardStyle,
                cursor: "pointer",
                border: selectedSource === source.id ? `2px solid ${source.color}` : `1px solid ${token("color.border")}`,
                padding: token("space.300"),
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.200") }}>
                <div style={{ display: "flex", alignItems: "center", gap: token("space.150") }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "6px",
                      backgroundColor: source.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {source.type === "HRIS" ? (
                      <DatabaseIcon label="" color={token("color.text.inverse")} />
                    ) : source.type === "Equity Management" ? (
                      <ChartTrendIcon label="" color={token("color.text.inverse")} />
                    ) : (
                      <UploadIcon label="" color={token("color.text.inverse")} />
                    )}
                  </div>
                  <div>
                    <Text weight="semibold">{source.name}</Text>
                    <div>
                      <Text size="UNSAFE_small" color="color.text.subtlest">{source.type}</Text>
                    </div>
                  </div>
                </div>
                <Lozenge
                  appearance={
                    source.status === "connected" ? "success" : source.status === "pending" ? "moved" : "default"
                  }
                >
                  {source.status}
                </Lozenge>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Text size="UNSAFE_small" color="color.text.subtlest">
                  {source.tables.length} table{source.tables.length !== 1 ? "s" : ""}
                </Text>
                {source.lastSync && (
                  <Text size="UNSAFE_small" color="color.text.subtlest">
                    Last sync: {source.lastSync}
                  </Text>
                )}
              </div>
            </div>
          ))}
        </div>

        <Tabs id="data-management-tabs" onChange={setActiveTab} selected={activeTab}>
          <TabList>
            {tabLabels.map((label, i) => (
              <Tab key={i}>{label}</Tab>
            ))}
          </TabList>

          <TabPanel>
            <div style={{ paddingTop: token("space.300"), width: "100%", minWidth: 0, flex: 1 }}>
              <div style={{ ...cardStyle, marginBottom: token("space.300") }}>
                <div
                  onClick={() => setIsApiSetupExpanded(!isApiSetupExpanded)}
                  style={{
                    padding: `${token("space.200")} ${token("space.300")}`,
                    backgroundColor: token("elevation.surface"),
                    borderBottom: isApiSetupExpanded ? `1px solid ${token("color.border")}` : undefined,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: token("space.150") }}>
                    {isApiSetupExpanded ? <ChevronDownIcon label="" /> : <ChevronRightIcon label="" />}
                    <div>
                      <Text weight="semibold">API Setup Configuration</Text>
                      <div>
                        <Text size="small" color="color.text.subtlest">
                          Configure API endpoints, authentication, and test connections
                        </Text>
                      </div>
                    </div>
                  </div>
                  <Lozenge appearance="inprogress">2 connected</Lozenge>
                </div>

                {isApiSetupExpanded && (
                  <div style={{ padding: token("space.300") }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: token("space.300") }}>
                      {[
                        { key: "workday" as const, name: "Workday API", subtitle: "RaaS & Studio Integrations", icon: <DatabaseIcon label="" color={token("color.text.inverse")} />, bgColor: token("color.background.brand.bold"), test: workdayTest },
                        { key: "shareworks" as const, name: "Shareworks API", subtitle: "Equity Management", icon: <ChartTrendIcon label="" color={token("color.text.inverse")} />, bgColor: token("color.background.success.bold"), test: shareworksTest },
                      ].map((api) => (
                        <div
                          key={api.name}
                          style={{
                            padding: token("space.300"),
                            borderRadius: "6px",
                            border: `1px solid ${token("color.border")}`,
                            backgroundColor: token("elevation.surface.sunken"),
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: token("space.150"), marginBottom: token("space.200") }}>
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "6px",
                                backgroundColor: api.bgColor,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {api.icon}
                            </div>
                            <div>
                              <Text weight="semibold">{api.name}</Text>
                              <div>
                                <Text size="UNSAFE_small" color="color.text.subtlest">{api.subtitle}</Text>
                              </div>
                            </div>
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", gap: token("space.150") }}>
                            <div>
                              <Text size="small" weight="medium">API Code / Client ID</Text>
                              <div style={{ marginTop: token("space.050") }}>
                                <Textfield placeholder={`Enter ${api.name} code or client ID`} />
                              </div>
                            </div>
                            <div>
                              <Text size="small" weight="medium">API Endpoint URL</Text>
                              <div style={{ marginTop: token("space.050") }}>
                                <Textfield placeholder="https://api..." />
                              </div>
                            </div>
                            <div>
                              <Text size="small" weight="medium">API Key / Secret</Text>
                              <div style={{ marginTop: token("space.050") }}>
                                <Textfield type="password" placeholder="••••••••••••••••" />
                              </div>
                            </div>
                            <div>
                              <Text size="small" weight="medium">Tenant ID (Optional)</Text>
                              <div style={{ marginTop: token("space.050") }}>
                                <Textfield placeholder="Enter tenant identifier" />
                              </div>
                            </div>

                            {api.test.status === "success" && (
                              <div style={{
                                padding: token("space.150"),
                                borderRadius: "6px",
                                backgroundColor: token("color.background.success"),
                                display: "flex",
                                alignItems: "center",
                                gap: token("space.100"),
                              }}>
                                <CheckCircleIcon label="" color={token("color.icon.success")} />
                                <div>
                                  <Text size="small" color="color.text.success">{api.test.message}</Text>
                                  <div>
                                    <Text size="UNSAFE_small" color="color.text.subtlest">Latency: {api.test.latency}</Text>
                                  </div>
                                </div>
                              </div>
                            )}

                            {api.test.status === "failed" && (
                              <div style={{
                                padding: token("space.150"),
                                borderRadius: "6px",
                                backgroundColor: token("color.background.danger"),
                                display: "flex",
                                alignItems: "center",
                                gap: token("space.100"),
                              }}>
                                <ErrorIcon label="" color={token("color.icon.danger")} />
                                <Text size="small" color="color.text.danger">{api.test.message}</Text>
                              </div>
                            )}

                            <div style={{ display: "flex", gap: token("space.100"), marginTop: token("space.100") }}>
                              <Button
                                appearance="primary"
                                iconBefore={CheckCircleIcon}
                                isLoading={api.test.status === "testing"}
                                onClick={() => handleTestConnection(api.key)}
                              >
                                Test Connection
                              </Button>
                              <Button appearance="default">Save</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: token("space.300") }}>
                      <SectionMessage appearance="information">
                        <Text size="small" weight="semibold">Workday Admin & Shareworks Admin Access Required</Text>
                        <div style={{ marginTop: token("space.050") }}>
                          <Text size="small" color="color.text.subtlest">
                            Workday API powers the CRINT Pave RaaS reports (outbound) and Studio integrations (inbound writeback for comp changes, stock grants, bonus payments, and promotions). Shareworks API provides equity grant and vesting data. Test connections after entering credentials to verify access before enabling syncs.
                          </Text>
                        </div>
                      </SectionMessage>
                    </div>
                  </div>
                )}
              </div>

              {selectedSourceData && selectedSourceData.tables.length > 0 && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.200") }}>
                    <Heading size="small">{selectedSourceData.name} Tables</Heading>
                    <div style={{ display: "flex", gap: token("space.100") }}>
                      <Button appearance="subtle" iconBefore={RefreshIcon}>Sync All</Button>
                      <Button appearance="primary" iconBefore={AddIcon}>Add Table</Button>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: token("space.200") }}>
                    {selectedSourceData.tables.map((table) => (
                      <div key={table.id} style={cardStyle}>
                        <div
                          onClick={() => setExpandedTable(expandedTable === table.id ? null : table.id)}
                          style={{
                            padding: token("space.200"),
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: token("space.150") }}>
                            {expandedTable === table.id ? <ChevronDownIcon label="" /> : <ChevronRightIcon label="" />}
                            <div>
                              <Text weight="semibold">{table.name}</Text>
                              <div style={{ display: "flex", gap: token("space.200"), marginTop: token("space.050") }}>
                                <Text size="UNSAFE_small" color="color.text.subtlest">
                                  {table.records.toLocaleString()} records
                                </Text>
                                <Text size="UNSAFE_small" color="color.text.subtlest">
                                  {table.fields.length} fields
                                </Text>
                                <Text size="UNSAFE_small" color="color.text.subtlest">
                                  Updated: {table.lastUpdated}
                                </Text>
                              </div>
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: token("space.200") }}>
                            <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                              <Text size="UNSAFE_small" color="color.text.subtlest">Sync</Text>
                              <Toggle
                                isChecked={table.syncEnabled}
                                onChange={() => handleToggleSync(selectedSourceData.id, table.id)}
                                size="regular"
                              />
                            </div>
                            <Button appearance="subtle" spacing="compact" iconBefore={RefreshIcon}>Sync</Button>
                          </div>
                        </div>

                        {expandedTable === table.id && (
                          <div style={{ borderTop: `1px solid ${token("color.border")}`, padding: token("space.200") }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                              <thead>
                                <tr style={{ borderBottom: `2px solid ${token("color.border")}` }}>
                                  <th style={{ padding: `${token("space.100")} ${token("space.150")}`, textAlign: "left", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Field</th>
                                  <th style={{ padding: `${token("space.100")} ${token("space.150")}`, textAlign: "left", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Column</th>
                                  <th style={{ padding: `${token("space.100")} ${token("space.150")}`, textAlign: "left", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Description</th>
                                  <th style={{ padding: `${token("space.100")} ${token("space.150")}`, textAlign: "center", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {table.fields.map((f, i) => (
                                  <tr key={i} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                                    <td style={{ padding: `${token("space.100")} ${token("space.150")}`, fontSize: "13px", fontWeight: 500, color: token("color.text") }}>{f.field}</td>
                                    <td style={{ padding: `${token("space.100")} ${token("space.150")}`, fontSize: "12px", color: token("color.text.subtlest"), fontFamily: "monospace" }}>{f.column}</td>
                                    <td style={{ padding: `${token("space.100")} ${token("space.150")}`, fontSize: "12px", color: token("color.text.subtlest") }}>{f.desc}</td>
                                    <td style={{ padding: `${token("space.100")} ${token("space.150")}`, textAlign: "center" }}>
                                      {f.isUpdated ? (
                                        <Lozenge appearance="moved">Updated</Lozenge>
                                      ) : (
                                        <Lozenge appearance="default">Synced</Lozenge>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedSourceData && selectedSourceData.tables.length === 0 && (
                <div style={{ ...cardStyle, padding: token("space.600"), textAlign: "center" }}>
                  <UploadIcon label="" color={token("color.icon.disabled")} />
                  <div style={{ marginTop: token("space.200") }}>
                    <Text weight="semibold">No tables configured</Text>
                  </div>
                  <div style={{ marginTop: token("space.050") }}>
                    <Text size="small" color="color.text.subtlest">Upload a CSV file to get started</Text>
                  </div>
                  <div style={{ marginTop: token("space.200") }}>
                    <Button appearance="primary" iconBefore={UploadIcon}>Upload CSV</Button>
                  </div>
                </div>
              )}
            </div>
          </TabPanel>

          <TabPanel>
            <div style={{ paddingTop: token("space.300") }}>
              {selectedSourceData && currentFieldMappings.length > 0 ? (
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.300") }}>
                    <div>
                      <Heading size="small">{selectedSourceData.name} Field Mapping</Heading>
                      <div style={{ marginTop: token("space.050") }}>
                        <Text size="small" color="color.text.subtlest">
                          Map source fields from {selectedSourceData.name} to system fields. {currentFieldMappings.filter(f => f.isMapped).length} of {currentFieldMappings.length} fields mapped.
                        </Text>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: token("space.100") }}>
                      <Button appearance="subtle">Auto-Map</Button>
                      <Button appearance="primary">Save Mappings</Button>
                    </div>
                  </div>

                  <div style={cardStyle}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${token("color.border")}`, backgroundColor: token("elevation.surface.sunken") }}>
                          <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "left", fontSize: "12px", fontWeight: 600, color: token("color.text"), width: "32px" }}></th>
                          <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "left", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Source Field ({selectedSourceData.name})</th>
                          <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "center", fontSize: "12px", fontWeight: 600, color: token("color.text"), width: "40px" }}></th>
                          <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "left", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>System Field</th>
                          <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "left", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Data Type</th>
                          <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "left", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Transform</th>
                          <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "center", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentFieldMappings.map((mapping, i) => (
                          <tr key={i} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                            <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                              <Checkbox isChecked={mapping.isMapped} />
                            </td>
                            <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                              <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                                <Text size="small" weight="medium">{mapping.sourceField}</Text>
                                {mapping.isRequired && (
                                  <span style={{ color: token("color.text.danger"), fontSize: "12px" }}>*</span>
                                )}
                              </div>
                            </td>
                            <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "center" }}>
                              <Text size="small" color="color.text.subtlest">→</Text>
                            </td>
                            <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                              {mapping.isMapped ? (
                                <span style={{ fontFamily: "monospace", fontSize: "12px", color: token("color.text"), backgroundColor: token("color.background.neutral"), padding: `${token("space.025")} ${token("space.075")}`, borderRadius: "4px" }}>
                                  {mapping.thriveField}
                                </span>
                              ) : (
                                <Text size="small" color="color.text.disabled">Not mapped</Text>
                              )}
                            </td>
                            <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                              <Lozenge appearance="default">{mapping.dataType}</Lozenge>
                            </td>
                            <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                              {mapping.transform ? (
                                <span style={{ fontFamily: "monospace", fontSize: "11px", color: token("color.text.subtlest"), backgroundColor: token("color.background.neutral"), padding: `${token("space.025")} ${token("space.075")}`, borderRadius: "4px" }}>
                                  {mapping.transform}
                                </span>
                              ) : (
                                <Text size="UNSAFE_small" color="color.text.disabled">—</Text>
                              )}
                            </td>
                            <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "center" }}>
                              {mapping.isMapped ? (
                                <Lozenge appearance="success">Mapped</Lozenge>
                              ) : (
                                <Lozenge appearance="moved">Unmapped</Lozenge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ marginTop: token("space.300") }}>
                    <SectionMessage appearance="information">
                      <Text size="small" weight="semibold">Field Mapping & Data Selection</Text>
                      <div style={{ marginTop: token("space.050") }}>
                        <Text size="small" color="color.text.subtlest">
                          Required fields (marked with *) must be mapped before syncing. Transforms are applied automatically — "ISO8601" converts dates, "toCents" converts currency, "filterInternCasual" excludes intern and casual employee types, and "mapToP-Level" converts job profiles to P-level format. RaaS reports pull active and eligible employees only. Compensation History uses a 2-year lookback for salary and bonus change events.
                        </Text>
                      </div>
                    </SectionMessage>
                  </div>
                </div>
              ) : (
                <div style={{ ...cardStyle, padding: token("space.600"), textAlign: "center" }}>
                  <LinkExternalIcon label="" color={token("color.icon.disabled")} />
                  <div style={{ marginTop: token("space.200") }}>
                    <Text weight="semibold">Select a data source</Text>
                  </div>
                  <div style={{ marginTop: token("space.050") }}>
                    <Text size="small" color="color.text.subtlest">Choose Workday or Shareworks from above to configure field mappings</Text>
                  </div>
                </div>
              )}
            </div>
          </TabPanel>

          <TabPanel>
            <div style={{ paddingTop: token("space.300") }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.300") }}>
                <div>
                  <Heading size="small">Errors & Alerts</Heading>
                  <div style={{ marginTop: token("space.050") }}>
                    <Text size="small" color="color.text.subtlest">
                      {unresolvedCount} unresolved issue{unresolvedCount !== 1 ? "s" : ""} across all integrations
                    </Text>
                  </div>
                </div>
                <div style={{ display: "flex", gap: token("space.100") }}>
                  {(["all", "unresolved", "resolved"] as const).map((filter) => (
                    <Button
                      key={filter}
                      appearance={errorFilter === filter ? "primary" : "subtle"}
                      onClick={() => setErrorFilter(filter)}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: token("space.200") }}>
                {filteredErrors.map((error) => (
                  <div key={error.id} style={cardStyle}>
                    <div style={{ padding: `${token("space.200")} ${token("space.300")}` }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: token("space.200") }}>
                        <div style={{ marginTop: token("space.025"), flexShrink: 0 }}>
                          {error.severity === "critical" ? (
                            <ErrorIcon label="" color={token("color.icon.danger")} />
                          ) : error.severity === "warning" ? (
                            <WarningIcon label="" color={token("color.icon.warning")} />
                          ) : (
                            <CheckCircleIcon label="" color={token("color.icon.information")} />
                          )}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                              <Text weight="semibold">{error.message}</Text>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                              <Lozenge appearance={error.severity === "critical" ? "removed" : error.severity === "warning" ? "moved" : "inprogress"}>
                                {error.severity}
                              </Lozenge>
                              <Lozenge appearance={error.resolved ? "success" : "default"}>
                                {error.resolved ? "Resolved" : "Open"}
                              </Lozenge>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: token("space.200"), marginTop: token("space.050") }}>
                            <Text size="UNSAFE_small" color="color.text.subtlest">{error.source}</Text>
                            <Text size="UNSAFE_small" color="color.text.subtlest">•</Text>
                            <Text size="UNSAFE_small" color="color.text.subtlest">{error.type}</Text>
                            <Text size="UNSAFE_small" color="color.text.subtlest">•</Text>
                            <Text size="UNSAFE_small" color="color.text.subtlest">{error.timestamp}</Text>
                          </div>
                          {error.details && (
                            <div style={{
                              marginTop: token("space.150"),
                              padding: token("space.150"),
                              borderRadius: "6px",
                              backgroundColor: token("elevation.surface.sunken"),
                              fontSize: "12px",
                              color: token("color.text.subtlest"),
                              lineHeight: "18px",
                            }}>
                              {error.details}
                            </div>
                          )}
                          {!error.resolved && (
                            <div style={{ marginTop: token("space.150") }}>
                              <Button appearance="subtle" spacing="compact">Mark Resolved</Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div style={{ paddingTop: token("space.300") }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.300") }}>
                <div>
                  <Heading size="small">Sync History</Heading>
                  <div style={{ marginTop: token("space.050") }}>
                    <Text size="small" color="color.text.subtlest">
                      Complete log of all data synchronization events
                    </Text>
                  </div>
                </div>
                <div style={{ width: "280px" }}>
                  <Textfield
                    placeholder="Search by source, table, or status..."
                    elemBeforeInput={<div style={{ paddingLeft: token("space.075") }}><SearchIcon label="" color={token("color.icon.subtle")} /></div>}
                    value={historySearch}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHistorySearch(e.target.value)}
                  />
                </div>
              </div>

              <div style={cardStyle}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${token("color.border")}`, backgroundColor: token("elevation.surface.sunken") }}>
                      <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "left", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Timestamp</th>
                      <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "left", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Source</th>
                      <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "left", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Table</th>
                      <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "center", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Status</th>
                      <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "right", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Records</th>
                      <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "right", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Failed</th>
                      <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "right", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Duration</th>
                      <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "left", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Initiated By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.map((entry) => (
                      <tr key={entry.id} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                        <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                          <div style={{ display: "flex", alignItems: "center", gap: token("space.075") }}>
                            <ClockIcon label="" LEGACY_size="small" color={token("color.icon.subtle")} />
                            <Text size="small">{entry.timestamp}</Text>
                          </div>
                        </td>
                        <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                          <Text size="small" weight="medium">{entry.source}</Text>
                        </td>
                        <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                          <Text size="small">{entry.table}</Text>
                        </td>
                        <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "center" }}>
                          <Lozenge
                            appearance={entry.status === "success" ? "success" : entry.status === "partial" ? "moved" : "removed"}
                          >
                            {entry.status}
                          </Lozenge>
                        </td>
                        <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "right" }}>
                          <Text size="small">{entry.recordsSynced.toLocaleString()}</Text>
                        </td>
                        <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "right" }}>
                          <Text size="small" color={entry.recordsFailed > 0 ? "color.text.danger" : "color.text.subtlest"}>
                            {entry.recordsFailed}
                          </Text>
                        </td>
                        <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "right" }}>
                          <Text size="small" color="color.text.subtlest">{entry.duration}</Text>
                        </td>
                        <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                          <Text size="UNSAFE_small" color="color.text.subtlest">{entry.initiatedBy}</Text>
                          {entry.errorMessage && (
                            <div style={{ marginTop: token("space.025") }}>
                              <Text size="UNSAFE_small" color="color.text.danger">{entry.errorMessage}</Text>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: token("space.200"),
                padding: `${token("space.100")} ${token("space.200")}`,
              }}>
                <Text size="UNSAFE_small" color="color.text.subtlest">
                  Showing {filteredHistory.length} of {syncHistory.length} entries
                </Text>
                <Button appearance="subtle" spacing="compact">Load More</Button>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
