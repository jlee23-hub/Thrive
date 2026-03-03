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
  { id: "sh-1", source: "Workday", table: "Employee Data", timestamp: "02/25/26 3:45 PM", status: "success", recordsSynced: 1247, recordsFailed: 0, duration: "2m 14s", initiatedBy: "Scheduled" },
  { id: "sh-2", source: "Shareworks", table: "Equity Grants", timestamp: "02/25/26 3:42 PM", status: "success", recordsSynced: 456, recordsFailed: 0, duration: "58s", initiatedBy: "Scheduled" },
  { id: "sh-3", source: "Workday", table: "Organization Structure", timestamp: "02/25/26 3:45 PM", status: "success", recordsSynced: 89, recordsFailed: 0, duration: "12s", initiatedBy: "Scheduled" },
  { id: "sh-4", source: "Shareworks", table: "Vesting Schedule", timestamp: "02/25/26 3:42 PM", status: "partial", recordsSynced: 884, recordsFailed: 8, duration: "1m 32s", initiatedBy: "Scheduled", errorMessage: "8 records had invalid vesting dates" },
  { id: "sh-5", source: "Workday", table: "Employee Data", timestamp: "02/24/26 3:45 PM", status: "success", recordsSynced: 1245, recordsFailed: 0, duration: "2m 08s", initiatedBy: "Scheduled" },
  { id: "sh-6", source: "Workday", table: "Compensation History", timestamp: "02/24/26 3:45 PM", status: "failed", recordsSynced: 0, recordsFailed: 3421, duration: "0s", initiatedBy: "Manual — jdoe@company.com", errorMessage: "API rate limit exceeded. Retry after 60 seconds." },
  { id: "sh-7", source: "Shareworks", table: "Equity Grants", timestamp: "02/24/26 3:42 PM", status: "success", recordsSynced: 454, recordsFailed: 0, duration: "55s", initiatedBy: "Scheduled" },
  { id: "sh-8", source: "Workday", table: "Employee Data", timestamp: "02/23/26 3:45 PM", status: "success", recordsSynced: 1243, recordsFailed: 0, duration: "2m 11s", initiatedBy: "Scheduled" },
  { id: "sh-9", source: "Workday", table: "Employee Data", timestamp: "02/22/26 3:45 PM", status: "partial", recordsSynced: 1240, recordsFailed: 3, duration: "2m 22s", initiatedBy: "Scheduled", errorMessage: "3 records missing required Manager_Reference field" },
  { id: "sh-10", source: "Shareworks", table: "Vesting Schedule", timestamp: "02/22/26 3:42 PM", status: "success", recordsSynced: 880, recordsFailed: 0, duration: "1m 28s", initiatedBy: "Scheduled" },
];

const errors: ErrorEntry[] = [
  { id: "e-1", source: "Shareworks", type: "sync", severity: "warning", message: "8 vesting records have dates outside the expected range (2024-2030)", timestamp: "02/25/26 3:43 PM", resolved: false, details: "Records with Participant_IDs: SW-1042, SW-1055, SW-1089, SW-1102, SW-1134, SW-1167, SW-1190, SW-1203 have vesting dates before 2024 or after 2030. These records were skipped during sync." },
  { id: "e-2", source: "Workday", type: "auth", severity: "info", message: "API token will expire in 14 days", timestamp: "02/25/26 12:00 AM", resolved: false, details: "The current Workday API token was issued on 01/25/26 and expires on 03/11/26. Generate a new token before expiry to avoid sync interruptions." },
  { id: "e-3", source: "Workday", type: "sync", severity: "critical", message: "Compensation History sync failed — API rate limit exceeded", timestamp: "02/24/26 3:45 PM", resolved: true, details: "Manual sync of Compensation History table triggered rate limiting on Workday API. The scheduled sync at the next interval completed successfully. Consider spacing out manual syncs." },
  { id: "e-4", source: "Workday", type: "mapping", severity: "warning", message: "3 employee records missing required Manager_Reference field", timestamp: "02/22/26 3:47 PM", resolved: true, details: "Employee IDs: WK-00412, WK-00789, WK-01102 have null Manager_Reference values. These employees were synced with empty manager fields. Verify in Workday if these are new hires awaiting manager assignment." },
  { id: "e-5", source: "Shareworks", type: "connection", severity: "info", message: "Shareworks API response time elevated (avg 2.8s vs normal 0.8s)", timestamp: "02/21/26 2:15 PM", resolved: true, details: "Shareworks API experienced higher than normal latency. This may be due to maintenance on their end. Performance returned to normal by 02/21/26 4:00 PM." },
];

const dataSources: DataSource[] = [
  {
    id: "workday",
    name: "Workday",
    type: "HRIS Integration",
    status: "connected",
    color: token("color.chart.blue.bold"),
    lastSync: "02/25/26 3:45 PM",
    tables: [
      {
        id: "emp-1",
        name: "Employee Data",
        records: 1247,
        lastUpdated: "02/25/26 3:45 PM",
        syncEnabled: true,
        fields: [
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
          { field: "Base Salary", column: "currentSalary", desc: "Current annual base salary", isUpdated: true },
          { field: "Bonus Target %", column: "bonusTarget", desc: "Target bonus percentage" },
          { field: "Performance Rating", column: "performanceRating", desc: "Latest annual rating" },
        ],
      },
      {
        id: "org-1",
        name: "Organization Structure",
        records: 89,
        lastUpdated: "02/25/26 3:45 PM",
        syncEnabled: true,
        fields: [
          { field: "Organization ID", column: "organizationId", desc: "Unique organization identifier" },
          { field: "Organization Name", column: "organizationName", desc: "Name of the organization unit" },
          { field: "Parent Organization", column: "parentOrganizationId", desc: "Parent organization reference" },
          { field: "Org Level", column: "organizationLevel", desc: "Hierarchy level in organization" },
          { field: "Cost Center", column: "costCenter", desc: "Associated cost center code" },
          { field: "Headcount", column: "headcount", desc: "Total headcount in organization" },
        ],
      },
      {
        id: "comp-1",
        name: "Compensation History",
        records: 3421,
        lastUpdated: "02/25/26 3:45 PM",
        syncEnabled: false,
        fields: [
          { field: "Employee ID", column: "employeeId", desc: "Employee reference" },
          { field: "Effective Date", column: "effectiveDate", desc: "Date compensation change became effective" },
          { field: "Comp Change Reason", column: "compensationChangeReason", desc: "Reason for compensation change" },
          { field: "Previous Base Salary", column: "previousBaseSalary", desc: "Base salary before change" },
          { field: "New Base Salary", column: "newBaseSalary", desc: "Base salary after change" },
          { field: "Salary Change %", column: "salaryChangePercent", desc: "Percentage salary increase" },
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
          { field: "Grant Date", column: "grantDate", desc: "Date equity was granted" },
          { field: "Grant Type", column: "grantType", desc: "RSU, ISO, NSO, etc." },
          { field: "Total Units", column: "totalUnits", desc: "Total shares/units granted" },
          { field: "Vested Units", column: "vestedUnits", desc: "Units vested to date" },
          { field: "Vesting Schedule", column: "vestingSchedule", desc: "Vesting cadence" },
          { field: "Grant Price", column: "grantPrice", desc: "Price at grant date" },
          { field: "Current Price", column: "currentPrice", desc: "Current share price" },
        ],
      },
      {
        id: "vest-1",
        name: "Vesting Schedule",
        records: 892,
        lastUpdated: "02/25/26 3:42 PM",
        syncEnabled: true,
        fields: [
          { field: "Grant ID", column: "grantId", desc: "Reference to equity grant" },
          { field: "Vesting Date", column: "vestingDate", desc: "Date shares vest" },
          { field: "Shares to Vest", column: "sharesToVest", desc: "Number of shares vesting this period" },
          { field: "Vesting Status", column: "vestingStatus", desc: "Pending, vested, or forfeited" },
        ],
      },
    ],
  },
  {
    id: "csv-upload",
    name: "CSV Upload",
    type: "Manual Upload",
    status: "disconnected",
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
                    {source.type === "HRIS Integration" ? (
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
            <div style={{ paddingTop: token("space.300") }}>
              <div style={{ ...cardStyle, marginBottom: token("space.300") }}>
                <div
                  onClick={() => setIsApiSetupExpanded(!isApiSetupExpanded)}
                  style={{
                    padding: `${token("space.200")} ${token("space.300")}`,
                    backgroundColor: token("elevation.surface.sunken"),
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
                        { key: "workday" as const, name: "Workday API", subtitle: "HRIS Integration", icon: <DatabaseIcon label="" color={token("color.text.inverse")} />, bgColor: token("color.background.brand.bold"), test: workdayTest },
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
                        <Text size="small" weight="semibold">Admin Access Required</Text>
                        <div style={{ marginTop: token("space.050") }}>
                          <Text size="small" color="color.text.subtlest">
                            You need Workday Admin and Shareworks Admin credentials to configure these connections.
                            Test the connection after entering credentials to verify access before enabling syncs.
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
                          Map source fields from {selectedSourceData.name} to Thrive fields. {currentFieldMappings.filter(f => f.isMapped).length} of {currentFieldMappings.length} fields mapped.
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
                          <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "left", fontSize: "12px", fontWeight: 600, color: token("color.text") }}>Thrive Field</th>
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
                      <Text size="small" weight="semibold">Field Mapping Guide</Text>
                      <div style={{ marginTop: token("space.050") }}>
                        <Text size="small" color="color.text.subtlest">
                          Required fields (marked with *) must be mapped before syncing. Transforms are applied automatically during sync — for example, "ISO8601" converts date formats and "toCents" converts currency to base units. Unmapped fields from the source will be ignored during sync.
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
