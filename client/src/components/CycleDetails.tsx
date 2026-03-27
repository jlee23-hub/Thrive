import React, { useState } from "react";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import Button from "@atlaskit/button/new";
import { IconButton } from "@atlaskit/button/new";
import Tabs, { Tab, TabList } from "@atlaskit/tabs";
import Textfield from "@atlaskit/textfield";
import Select from "@atlaskit/select";
import Textarea from "@atlaskit/textarea";
import Lozenge from "@atlaskit/lozenge";
import Toggle from "@atlaskit/toggle";
import DynamicTable from "@atlaskit/dynamic-table";
import PageIcon from "@atlaskit/icon/core/page";
import DownloadIcon from "@atlaskit/icon/core/download";
import ShowMoreVerticalIcon from "@atlaskit/icon/core/show-more-vertical";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import LockLockedIcon from "@atlaskit/icon/core/lock-locked";
import UploadIcon from "@atlaskit/icon/core/upload";
import ProgressBar from "@atlaskit/progress-bar";

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: "6px",
  padding: token("space.400"),
  border: `1px solid ${token("color.border")}`,
};

interface CycleInfo {
  id: string;
  name: string;
  type: string;
  status: "Active" | "Planning" | "Completed";
  timeline: string;
  participants: number;
  budget: string;
  progress: number;
}

interface CycleDetailsProps {
  cycle: CycleInfo;
  onBack: () => void;
}

const cycleTypeOptions = [
  { label: "Merit Only", value: "merit" },
  { label: "Promotion", value: "promotion" },
  { label: "Equity Refresh", value: "equity" },
  { label: "Merit + Promotion", value: "merit-promotion" },
  { label: "Annual Review", value: "annual" },
];

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Planning", value: "Planning" },
  { label: "Inactive", value: "Inactive" },
  { label: "Completed", value: "Completed" },
];

const dataSourceRows = [
  { id: "1", name: "Workday Employee Data", type: "HRIS", status: "connected", lastSync: "2 hours ago", records: 1842 },
  { id: "2", name: "Workday Compensation Data", type: "HRIS", status: "connected", lastSync: "2 hours ago", records: 1842 },
  { id: "3", name: "Shareworks", type: "Equity", status: "connected", lastSync: "4 hours ago", records: 956 },
];

const budgetRows = [
  { department: "Engineering", allocated: 2400000, used: 1860000, headcount: 120 },
  { department: "Product", allocated: 1200000, used: 980000, headcount: 45 },
  { department: "Design", allocated: 600000, used: 420000, headcount: 28 },
  { department: "Marketing", allocated: 800000, used: 640000, headcount: 35 },
  { department: "Sales", allocated: 1500000, used: 1350000, headcount: 60 },
  { department: "Operations", allocated: 500000, used: 375000, headcount: 22 },
];

const employeeFields = [
  { field: "Employee ID", column: "emp_id", type: "String", required: true },
  { field: "Full Name", column: "full_name", type: "String", required: true },
  { field: "Department", column: "department", type: "String", required: true },
  { field: "Job Title", column: "job_title", type: "String", required: true },
  { field: "Base Salary", column: "base_salary", type: "Currency", required: true },
  { field: "Compa-Ratio", column: "compa_ratio", type: "Decimal", required: false },
  { field: "Performance Rating", column: "perf_rating", type: "Integer", required: false },
  { field: "Manager", column: "manager_name", type: "String", required: false },
  { field: "Location", column: "location", type: "String", required: false },
  { field: "Hire Date", column: "hire_date", type: "Date", required: false },
];

const eligibilityRules = [
  { id: "1", name: "Minimum Tenure", description: "Employee must have 6+ months tenure", enabled: true },
  { id: "2", name: "Active Status", description: "Employee must be in active status", enabled: true },
  { id: "3", name: "Performance Minimum", description: "Must have rating of 2 or above", enabled: true },
  { id: "4", name: "Not on PIP", description: "Exclude employees currently on PIP", enabled: false },
  { id: "5", name: "Full-Time Only", description: "Only full-time employees eligible", enabled: false },
];

const rolePermissions = [
  { role: "Comp Admin", view: true, edit: true, approve: true, export: true },
  { role: "HR Business Partner", view: true, edit: true, approve: false, export: true },
  { role: "Manager", view: true, edit: false, approve: false, export: false },
  { role: "Finance", view: true, edit: false, approve: false, export: true },
  { role: "Employee", view: false, edit: false, approve: false, export: false },
];

const columnPermissionsData = [
  { id: "employeeName", name: "Employee", variable: "empName", dataSource: "Integration", displayType: "Frozen", rewardLetter: false, columnDefault: "Visible", locked: true, permissions: [{ role: "All Users Can View", appearance: "default" as const }] },
  { id: "employeeId", name: "Employee ID", variable: "empId001", dataSource: "Integration", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: true, permissions: [{ role: "All Users Can View", appearance: "default" as const }] },
  { id: "geographicZone", name: "Geographic Zone", variable: "geo", dataSource: "Integration", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" as const }] },
  { id: "prorated", name: "Prorated?", variable: "isProrated", dataSource: "User Input or Data Upload", displayType: "Checkbox", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "Admin", appearance: "removed" as const }, { role: "All Other Users Can View", appearance: "default" as const }] },
  { id: "jobFamily", name: "Non - Process Job Family Charge", variable: "csPharmact7MrCharge", dataSource: "User Input or Data Upload", displayType: "Checkbox", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" as const }] },
  { id: "jobProfile", name: "New Job Profile (Proposed)", variable: "newJobProfile", dataSource: "User Input or Data Upload", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "Admin", appearance: "removed" as const }] },
  { id: "h1Rating", name: "H1 Rating # FY23", variable: "h1RatingNumericValue", dataSource: "Computed", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" as const }] },
  { id: "h2Rating", name: "H2 Rating FY23", variable: "h2RatingMadebyManager", dataSource: "Computed", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" as const }] },
  { id: "newSalary", name: "New Salary (Annualized)", variable: "newSalary", dataSource: "Computed", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" as const }] },
  { id: "apexEquityTarget", name: "APEX Equity Target (pre-vested)", variable: "fullBaseEquityTargetCompBase", dataSource: "User Input or Data Upload", displayType: "Number", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "CRP Zone", appearance: "inprogress" as const }, { role: "Columns Gr...", appearance: "moved" as const }, { role: "All Other Users Can Not View", appearance: "default" as const }] },
  { id: "meritApex", name: "Modeled APEX Multiplier", variable: "modeledApexMultiplier", dataSource: "User Input or Data Upload", displayType: "Percentage", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "CRP Zone", appearance: "inprogress" as const }, { role: "CRP ZU an...", appearance: "inprogress" as const }, { role: "HRBP All Role...", appearance: "moved" as const }, { role: "APEX Syste...", appearance: "success" as const }] },
  { id: "refreshEquity", name: "Refresh Equity (USD)", variable: "equity1RefreshAmount", dataSource: "User Input or Data Upload", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "CRP Zone", appearance: "inprogress" as const }, { role: "APEX Plans...", appearance: "success" as const }, { role: "CRP Org an...", appearance: "inprogress" as const }, { role: "All Other Users Can View", appearance: "default" as const }] },
  { id: "maxEquity", name: "Max Equity - (USD)", variable: "maxEquity", dataSource: "Computed", displayType: "Number", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Other Users Can View", appearance: "default" as const }] },
  { id: "futureTermination", name: "Future termination", variable: "futureTermDate", dataSource: "User Input or Data Upload", displayType: "Checkbox", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can Not View", appearance: "default" as const }] },
  { id: "location", name: "Location", variable: "location", dataSource: "Integration", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" as const }] },
  { id: "businessTitle", name: "Business Title", variable: "businessTitle", dataSource: "User Input or Data Upload", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "CRP Zone", appearance: "inprogress" as const }, { role: "Admin", appearance: "removed" as const }, { role: "All Other Users Can Not View", appearance: "default" as const }] },
  { id: "department", name: "Department", variable: "dept", dataSource: "Integration", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" as const }] },
  { id: "manager", name: "Manager", variable: "managerName", dataSource: "Integration", displayType: "Text", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" as const }] },
  { id: "currentSalary", name: "Current Salary", variable: "currentSalary", dataSource: "Integration", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "Admin", appearance: "removed" as const }, { role: "APEX Basis...", appearance: "success" as const }, { role: "All Other Users Can Not View", appearance: "default" as const }] },
  { id: "proposedSalary", name: "Proposed Salary", variable: "proposedSalary", dataSource: "User Input or Data Upload", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "CRP Zone", appearance: "inprogress" as const }, { role: "Admin", appearance: "removed" as const }, { role: "All Other Users Can Not View", appearance: "default" as const }] },
  { id: "meritIncrease", name: "Merit Increase %", variable: "meritIncreasePct", dataSource: "Computed", displayType: "Percentage", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" as const }] },
  { id: "equityGrant", name: "Equity Grant", variable: "equityGrant", dataSource: "User Input or Data Upload", displayType: "Number", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" as const }] },
  { id: "totalCompensation", name: "Total Compensation", variable: "totalComp", dataSource: "Computed", displayType: "Currency", rewardLetter: false, columnDefault: "Visible", locked: false, permissions: [{ role: "All Users Can View", appearance: "default" as const }] },
];

function parseCycleDates(timeline: string) {
  const parts = timeline.split(" - ");
  return { start: parts[0] || "", end: parts[1] || "" };
}

function getCycleTypeDefault(type: string) {
  if (type === "Merit") return cycleTypeOptions[0];
  if (type === "Promotion") return cycleTypeOptions[1];
  if (type === "Equity") return cycleTypeOptions[2];
  return cycleTypeOptions[0];
}

export default function CycleDetails({ cycle, onBack }: CycleDetailsProps) {
  const dates = parseCycleDates(cycle.timeline);
  const [cycleName, setCycleName] = useState(cycle.name);
  const [cycleType, setCycleType] = useState(getCycleTypeDefault(cycle.type));
  const [status, setStatus] = useState(statusOptions.find((o) => o.value === cycle.status) || statusOptions[0]);
  const [startDate, setStartDate] = useState(dates.start);
  const [endDate, setEndDate] = useState(dates.end);
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState(eligibilityRules);
  const [selectedTab, setSelectedTab] = useState(0);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const shortName = cycle.name.replace(/^FY\d{4}\s+/, "").replace(/\s+Cycle$/, "");
  const breadcrumbName = shortName || cycle.name;

  const toggleRule = (id: string) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
  };

  const dsHead = {
    cells: [
      { key: "name", content: "SOURCE", width: 30 },
      { key: "type", content: "TYPE", width: 15 },
      { key: "status", content: "STATUS", width: 15 },
      { key: "lastSync", content: "LAST SYNC", width: 20 },
      { key: "records", content: "RECORDS", width: 20 },
    ],
  };

  const dsRows = dataSourceRows.map((ds) => ({
    key: ds.id,
    cells: [
      { key: ds.name, content: <Text weight="semibold">{ds.name}</Text> },
      { key: ds.type, content: <Text size="small">{ds.type}</Text> },
      {
        key: ds.status,
        content: (
          <Lozenge appearance={ds.status === "connected" ? "success" : "moved"}>
            {ds.status}
          </Lozenge>
        ),
      },
      { key: ds.lastSync, content: <Text size="small" color="color.text.subtlest">{ds.lastSync}</Text> },
      { key: String(ds.records), content: <Text size="small">{ds.records > 0 ? ds.records.toLocaleString() : "—"}</Text> },
    ],
  }));

  const empHead = {
    cells: [
      { key: "field", content: "FIELD", width: 20 },
      { key: "column", content: "COLUMN", width: 20 },
      { key: "type", content: "TYPE", width: 15 },
      { key: "required", content: "REQUIRED", width: 15 },
      { key: "status", content: "STATUS", width: 15 },
    ],
  };

  const empRows = employeeFields.map((f, i) => ({
    key: String(i),
    cells: [
      { key: f.field, content: <Text weight="semibold">{f.field}</Text> },
      { key: f.column, content: <Text size="small" color="color.text.subtlest"><span style={{ fontFamily: "monospace" }}>{f.column}</span></Text> },
      { key: f.type, content: <Lozenge appearance="default">{f.type}</Lozenge> },
      { key: String(f.required), content: f.required ? <Lozenge appearance="inprogress">Required</Lozenge> : <Lozenge appearance="default">Optional</Lozenge> },
      { key: "mapped", content: <Lozenge appearance="success">Mapped</Lozenge> },
    ],
  }));

  const handleCsvSelect = (file: File) => {
    if (file.name.endsWith(".csv")) {
      setCsvFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleCsvSelect(file);
  };

  const fmt = (n: number) => "$" + n.toLocaleString();

  const budgetHead = {
    cells: [
      { key: "department", content: "DEPARTMENT", width: 25 },
      { key: "headcount", content: "HEADCOUNT", width: 15 },
      { key: "allocated", content: "ALLOCATED", width: 20 },
      { key: "used", content: "USED", width: 20 },
      { key: "remaining", content: "REMAINING", width: 20 },
    ],
  };

  const budgetTableRows = budgetRows.map((b, i) => ({
    key: String(i),
    cells: [
      { key: b.department, content: <Text weight="semibold">{b.department}</Text> },
      { key: String(b.headcount), content: <Text size="small">{b.headcount}</Text> },
      { key: String(b.allocated), content: <Text size="small">{fmt(b.allocated)}</Text> },
      { key: String(b.used), content: <Text size="small">{fmt(b.used)}</Text> },
      {
        key: String(b.allocated - b.used),
        content: (
          <Lozenge appearance={b.allocated - b.used > 0 ? "success" : "removed"}>
            {fmt(b.allocated - b.used)}
          </Lozenge>
        ),
      },
    ],
  }));

  const totalAllocated = budgetRows.reduce((s, b) => s + b.allocated, 0);
  const totalUsed = budgetRows.reduce((s, b) => s + b.used, 0);

  const [expandedPermissions, setExpandedPermissions] = useState<Set<string>>(new Set());

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: token("elevation.surface"),
          borderBottom: `1px solid ${token("color.border")}`,
          paddingTop: token("space.300"),
          paddingLeft: token("space.400"),
          paddingRight: token("space.400"),
        }}
      >
        <Breadcrumbs label="Cycle navigation">
          <BreadcrumbsItem text="Dashboard" onClick={onBack} />
          <BreadcrumbsItem text={breadcrumbName} />
        </Breadcrumbs>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: token("space.100"), marginBottom: token("space.200") }}>
          <Heading size="xlarge">{breadcrumbName}</Heading>
          <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
            <Button appearance="default" iconBefore={DownloadIcon}>
              Export
            </Button>
            <IconButton
              icon={ShowMoreVerticalIcon}
              label="More actions"
              appearance="subtle"
            />
          </div>
        </div>

        <Tabs id="cycle-details-tabs" onChange={setSelectedTab} selected={selectedTab}>
          <TabList>
            <Tab>Cycle Details</Tab>
            <Tab>Data Sources</Tab>
            <Tab>Employee Data</Tab>
            <Tab>Eligibility Rules</Tab>
            <Tab>Budget Allocation</Tab>
            <Tab>User Role Permissions</Tab>
            <Tab>Field Permissions</Tab>
          </TabList>
        </Tabs>
      </div>

      <div style={{ padding: token("space.400") }}>
        {selectedTab === 0 && (
          <div style={cardStyle}>
            <div style={{ marginBottom: token("space.300") }}>
              <Heading size="medium">Cycle Details</Heading>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: token("space.300"), marginBottom: token("space.300") }}>
              <div>
                <label>
                  <Text size="small" weight="semibold">Cycle Name</Text>
                  <div style={{ marginTop: token("space.050") }}>
                    <Textfield
                      placeholder="Enter cycle name"
                      value={cycleName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCycleName(e.target.value)}
                    />
                  </div>
                </label>
              </div>
              <div>
                <label>
                  <Text size="small" weight="semibold">Cycle Type</Text>
                  <div style={{ marginTop: token("space.050") }}>
                    <Select
                      options={cycleTypeOptions}
                      value={cycleType}
                      onChange={(val: any) => val && setCycleType(val)}
                    />
                  </div>
                </label>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: token("space.300"), marginBottom: token("space.300") }}>
              <div>
                <label>
                  <Text size="small" weight="semibold">Status</Text>
                  <div style={{ marginTop: token("space.050") }}>
                    <Select
                      options={statusOptions}
                      value={status}
                      onChange={(val: any) => val && setStatus(val)}
                    />
                  </div>
                </label>
              </div>
              <div>
                <label>
                  <Text size="small" weight="semibold">Start Date</Text>
                  <div style={{ marginTop: token("space.050") }}>
                    <Textfield
                      placeholder="mm/dd/yyyy"
                      value={startDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
                    />
                  </div>
                </label>
              </div>
              <div>
                <label>
                  <Text size="small" weight="semibold">End Date</Text>
                  <div style={{ marginTop: token("space.050") }}>
                    <Textfield
                      placeholder="mm/dd/yyyy"
                      value={endDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                    />
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label>
                <Text size="small" weight="semibold">Description</Text>
                <div style={{ marginTop: token("space.050") }}>
                  <Textarea
                    placeholder="Enter cycle description..."
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    minimumRows={4}
                  />
                </div>
              </label>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: token("space.100"), marginTop: token("space.400") }}>
              <Button appearance="subtle" onClick={onBack}>Cancel</Button>
              <Button appearance="primary" iconBefore={PageIcon}>Save Changes</Button>
            </div>
          </div>
        )}

        {selectedTab === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
            <div style={cardStyle}>
              <div style={{ marginBottom: token("space.300") }}>
                <Heading size="medium">Connected Data Sources</Heading>
              </div>
              <DynamicTable
                head={dsHead}
                rows={dsRows}
                isFixedSize
              />
            </div>

            <div style={cardStyle}>
              <div style={{ marginBottom: token("space.100") }}>
                <Heading size="medium">Compensation Modeling CSV</Heading>
              </div>
              <div style={{ marginBottom: token("space.300") }}>
                <Text size="small" color="color.text.subtlest">
                  Upload a CSV file with compensation modeling data to supplement connected sources.
                </Text>
              </div>

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${isDragOver ? token("color.border.brand") : token("color.border")}`,
                  borderRadius: "6px",
                  padding: token("space.500"),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: token("space.200"),
                  backgroundColor: isDragOver ? token("color.background.selected") : token("elevation.surface.sunken"),
                  transition: "all 0.15s ease",
                }}
              >
                <UploadIcon label="" color={token("color.icon.subtle")} LEGACY_size="large" />
                {csvFile ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: token("space.100") }}>
                    <Text weight="semibold">{csvFile.name}</Text>
                    <Text size="small" color="color.text.subtlest">
                      {(csvFile.size / 1024).toFixed(1)} KB
                    </Text>
                    <div style={{ display: "flex", gap: token("space.100") }}>
                      <Button
                        appearance="subtle"
                        onClick={() => setCsvFile(null)}
                      >
                        Remove
                      </Button>
                      <Button appearance="primary">Upload</Button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: token("space.100") }}>
                    <Text weight="semibold">Drag and drop a CSV file here</Text>
                    <Text size="small" color="color.text.subtlest">or</Text>
                    <Button
                      appearance="default"
                      iconBefore={UploadIcon}
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = ".csv";
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) handleCsvSelect(file);
                        };
                        input.click();
                      }}
                    >
                      Browse Files
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 2 && (
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.300") }}>
              <Heading size="medium">Employee Data Fields</Heading>
              <Text size="small" color="color.text.subtlest">
                {employeeFields.filter((f) => f.required).length} required · {employeeFields.length} total fields
              </Text>
            </div>
            <DynamicTable
              head={empHead}
              rows={empRows}
              isFixedSize
            />
          </div>
        )}

        {selectedTab === 3 && (
          <div style={cardStyle}>
            <div style={{ marginBottom: token("space.300") }}>
              <Heading size="medium">Eligibility Rules</Heading>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: token("space.200") }}>
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: token("space.200"),
                    borderRadius: "6px",
                    border: `1px solid ${token("color.border")}`,
                    backgroundColor: rule.enabled ? token("elevation.surface") : token("elevation.surface.sunken"),
                  }}
                >
                  <div>
                    <Text weight="semibold">{rule.name}</Text>
                    <div style={{ marginTop: token("space.025") }}>
                      <Text size="small" color="color.text.subtlest">{rule.description}</Text>
                    </div>
                  </div>
                  <Toggle
                    isChecked={rule.enabled}
                    onChange={() => toggleRule(rule.id)}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: token("space.100"), marginTop: token("space.300") }}>
              <Button appearance="subtle">Reset</Button>
              <Button appearance="primary">Save Rules</Button>
            </div>
          </div>
        )}

        {selectedTab === 4 && (
          <div style={cardStyle}>
            <div style={{ marginBottom: token("space.100") }}>
              <Heading size="medium">Budget Allocation</Heading>
            </div>
            <div style={{ marginBottom: token("space.300") }}>
              <Text size="small" color="color.text.subtlest">
                Department-level budget allocation and utilization for this compensation cycle.
              </Text>
            </div>

            <div style={{ display: "flex", gap: token("space.300"), marginBottom: token("space.300") }}>
              <div style={{
                flex: 1,
                padding: token("space.300"),
                borderRadius: "6px",
                border: `1px solid ${token("color.border")}`,
                backgroundColor: token("elevation.surface"),
              }}>
                <Text size="small" color="color.text.subtlest">Total Allocated</Text>
                <div style={{ marginTop: token("space.050") }}>
                  <Heading size="medium">{fmt(totalAllocated)}</Heading>
                </div>
              </div>
              <div style={{
                flex: 1,
                padding: token("space.300"),
                borderRadius: "6px",
                border: `1px solid ${token("color.border")}`,
                backgroundColor: token("elevation.surface"),
              }}>
                <Text size="small" color="color.text.subtlest">Total Used</Text>
                <div style={{ marginTop: token("space.050") }}>
                  <Heading size="medium">{fmt(totalUsed)}</Heading>
                </div>
              </div>
              <div style={{
                flex: 1,
                padding: token("space.300"),
                borderRadius: "6px",
                border: `1px solid ${token("color.border")}`,
                backgroundColor: token("elevation.surface"),
              }}>
                <Text size="small" color="color.text.subtlest">Remaining</Text>
                <div style={{ marginTop: token("space.050") }}>
                  <Heading size="medium">{fmt(totalAllocated - totalUsed)}</Heading>
                </div>
              </div>
              <div style={{
                flex: 1,
                padding: token("space.300"),
                borderRadius: "6px",
                border: `1px solid ${token("color.border")}`,
                backgroundColor: token("elevation.surface"),
              }}>
                <Text size="small" color="color.text.subtlest">Utilization</Text>
                <div style={{ marginTop: token("space.050") }}>
                  <Heading size="medium">{Math.round((totalUsed / totalAllocated) * 100)}%</Heading>
                </div>
                <div style={{ marginTop: token("space.100") }}>
                  <ProgressBar value={totalUsed / totalAllocated} />
                </div>
              </div>
            </div>

            <DynamicTable
              head={budgetHead}
              rows={budgetTableRows}
              isFixedSize
            />
          </div>
        )}

        {selectedTab === 5 && (
          <div style={cardStyle}>
            <div style={{ marginBottom: token("space.300") }}>
              <Heading size="medium">User Role Permissions</Heading>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${token("color.border")}` }}>
                  <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.5px" }}><Text size="UNSAFE_small" weight="bold" color="color.text.subtlest">Role</Text></th>
                  <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.5px" }}><Text size="UNSAFE_small" weight="bold" color="color.text.subtlest">View</Text></th>
                  <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.5px" }}><Text size="UNSAFE_small" weight="bold" color="color.text.subtlest">Edit</Text></th>
                  <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.5px" }}><Text size="UNSAFE_small" weight="bold" color="color.text.subtlest">Approve</Text></th>
                  <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.5px" }}><Text size="UNSAFE_small" weight="bold" color="color.text.subtlest">Export</Text></th>
                </tr>
              </thead>
              <tbody>
                {rolePermissions.map((rp, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                    <td style={{ padding: `${token("space.150")} ${token("space.200")}` }}>
                      <Text weight="semibold">{rp.role}</Text>
                    </td>
                    <td style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "center" }}>
                      <Toggle isChecked={rp.view} onChange={() => {}} size="regular" />
                    </td>
                    <td style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "center" }}>
                      <Toggle isChecked={rp.edit} onChange={() => {}} size="regular" />
                    </td>
                    <td style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "center" }}>
                      <Toggle isChecked={rp.approve} onChange={() => {}} size="regular" />
                    </td>
                    <td style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "center" }}>
                      <Toggle isChecked={rp.export} onChange={() => {}} size="regular" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: token("space.100"), marginTop: token("space.300") }}>
              <Button appearance="subtle">Reset</Button>
              <Button appearance="primary">Save Permissions</Button>
            </div>
          </div>
        )}

        {selectedTab === 6 && (
          <div style={cardStyle}>
            <div style={{ marginBottom: token("space.200") }}>
              <Heading size="medium">Column Permissions</Heading>
            </div>
            <div style={{ marginBottom: token("space.300") }}>
              <Text size="small" color="color.text.subtlest">
                Columns configured for this cycle and their role-based access permissions.
              </Text>
            </div>
            <div style={{ border: `1px solid ${token("color.border")}`, borderRadius: "6px", overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
                  <thead>
                    <tr style={{ backgroundColor: token("elevation.surface.sunken") }}>
                      <th style={{ padding: `${token("space.100")} ${token("space.150")}`, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap", width: 28 }}></th>
                      <th style={{ padding: `${token("space.100")} ${token("space.150")}`, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap", minWidth: 180 }}><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Column Name</Text></th>
                      <th style={{ padding: `${token("space.100")} ${token("space.150")}`, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Data Source</Text></th>
                      <th style={{ padding: `${token("space.100")} ${token("space.150")}`, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Display Type</Text></th>
                      <th style={{ padding: `${token("space.100")} ${token("space.150")}`, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Column Default</Text></th>
                      <th style={{ padding: `${token("space.100")} ${token("space.150")}`, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap", minWidth: 240 }}><Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">Permissions</Text></th>
                    </tr>
                  </thead>
                  <tbody>
                    {columnPermissionsData.map((field) => {
                      const perms = field.permissions || [];
                      const isExpanded = expandedPermissions.has(field.id);
                      const visiblePerms = isExpanded ? perms : perms.slice(0, 3);
                      const hiddenCount = perms.length - 3;
                      return (
                        <tr key={field.id} style={{ borderTop: `1px solid ${token("color.border")}` }}>
                          <td style={{ padding: `${token("space.075")} ${token("space.150")}`, verticalAlign: "middle" }}>
                            {field.locked && <LockLockedIcon label="Locked" LEGACY_size="small" color={token("color.icon.subtle")} />}
                          </td>
                          <td style={{ padding: `${token("space.075")} ${token("space.150")}`, verticalAlign: "middle" }}>
                            <div>
                              <Text size="small" weight="medium">{field.name}</Text>
                              <div>
                                <Text size="UNSAFE_small" color="color.text.subtlest">{field.variable}</Text>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: `${token("space.075")} ${token("space.150")}`, verticalAlign: "middle" }}>
                            <Text size="UNSAFE_small" color="color.text.subtlest">{field.dataSource}</Text>
                          </td>
                          <td style={{ padding: `${token("space.075")} ${token("space.150")}`, verticalAlign: "middle" }}>
                            <Text size="UNSAFE_small" color="color.text.subtlest">{field.displayType}</Text>
                          </td>
                          <td style={{ padding: `${token("space.075")} ${token("space.150")}`, verticalAlign: "middle" }}>
                            <Text size="UNSAFE_small" color="color.text.subtlest">{field.columnDefault}</Text>
                          </td>
                          <td style={{ padding: `${token("space.075")} ${token("space.150")}`, verticalAlign: "middle" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: token("space.050"), flexWrap: "wrap" }}>
                              {visiblePerms.map((p, pi) => (
                                <Lozenge key={pi} appearance={p.appearance}>{p.role}</Lozenge>
                              ))}
                              {!isExpanded && hiddenCount > 0 && (
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setExpandedPermissions((prev) => { const next = new Set(prev); next.add(field.id); return next; })}
                                >
                                  <Text size="UNSAFE_small" color="color.text.subtle" weight="medium">+ {hiddenCount} other{hiddenCount > 1 ? "s" : ""}</Text>
                                </span>
                              )}
                              {isExpanded && perms.length > 3 && (
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setExpandedPermissions((prev) => { const next = new Set(prev); next.delete(field.id); return next; })}
                                >
                                  <Text size="UNSAFE_small" color="color.text.subtle" weight="medium">Show less</Text>
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: token("space.100"), marginTop: token("space.300") }}>
              <Button appearance="subtle">Reset</Button>
              <Button appearance="primary">Save Permissions</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

