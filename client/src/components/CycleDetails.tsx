import React, { useState } from "react";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import Button from "@atlaskit/button/new";
import { IconButton } from "@atlaskit/button/new";
import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import Textfield from "@atlaskit/textfield";
import Select from "@atlaskit/select";
import Textarea from "@atlaskit/textarea";
import Lozenge from "@atlaskit/lozenge";
import Toggle from "@atlaskit/toggle";
import DynamicTable from "@atlaskit/dynamic-table";
import PageIcon from "@atlaskit/icon/core/page";
import DownloadIcon from "@atlaskit/icon/core/download";
import ShowMoreVerticalIcon from "@atlaskit/icon/core/show-more-vertical";
import ChevronLeftIcon from "@atlaskit/icon/core/chevron-left";
import CheckCircleIcon from "@atlaskit/icon/core/check-circle";
import DatabaseIcon from "@atlaskit/icon/core/database";
import PersonIcon from "@atlaskit/icon/core/person";
import ShieldIcon from "@atlaskit/icon/core/shield";
import SearchIcon from "@atlaskit/icon/core/search";

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: token("border.radius.300"),
  padding: token("space.400"),
  boxShadow: token("elevation.shadow.raised"),
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

const fiscalYearOptions = [
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
];

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
  { id: "1", name: "Workday - Employee Data", type: "HRIS", status: "connected", lastSync: "2 hours ago", records: 1842 },
  { id: "2", name: "Shareworks - Equity Data", type: "Equity", status: "connected", lastSync: "4 hours ago", records: 956 },
  { id: "3", name: "Budget Allocations", type: "CSV Upload", status: "pending", lastSync: "—", records: 0 },
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

const fieldPermissions = [
  { field: "Employee Name", admin: "Edit", hrbp: "Edit", manager: "View", finance: "View" },
  { field: "Base Salary", admin: "Edit", hrbp: "Edit", manager: "View", finance: "View" },
  { field: "Merit Increase %", admin: "Edit", hrbp: "Edit", manager: "Edit", finance: "View" },
  { field: "New Salary", admin: "Edit", hrbp: "View", manager: "View", finance: "View" },
  { field: "Compa-Ratio", admin: "Edit", hrbp: "View", manager: "View", finance: "View" },
  { field: "Performance Rating", admin: "Edit", hrbp: "View", manager: "View", finance: "Hidden" },
  { field: "Promotion", admin: "Edit", hrbp: "Edit", manager: "View", finance: "Hidden" },
  { field: "Equity Grant", admin: "Edit", hrbp: "View", manager: "Hidden", finance: "View" },
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

function getFiscalYear(name: string) {
  const match = name.match(/FY(\d{4})|(\d{4})/);
  if (match) {
    const year = match[1] || match[2];
    return fiscalYearOptions.find((o) => o.value === year) || fiscalYearOptions[2];
  }
  return fiscalYearOptions[2];
}

export default function CycleDetails({ cycle, onBack }: CycleDetailsProps) {
  const dates = parseCycleDates(cycle.timeline);
  const [cycleName, setCycleName] = useState(cycle.name);
  const [fiscalYear, setFiscalYear] = useState(getFiscalYear(cycle.name));
  const [cycleType, setCycleType] = useState(getCycleTypeDefault(cycle.type));
  const [status, setStatus] = useState(statusOptions.find((o) => o.value === cycle.status) || statusOptions[0]);
  const [startDate, setStartDate] = useState(dates.start);
  const [endDate, setEndDate] = useState(dates.end);
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState(eligibilityRules);

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

  const fpHead = {
    cells: [
      { key: "field", content: "FIELD", width: 20 },
      { key: "admin", content: "COMP ADMIN", width: 16 },
      { key: "hrbp", content: "HRBP", width: 16 },
      { key: "manager", content: "MANAGER", width: 16 },
      { key: "finance", content: "FINANCE", width: 16 },
    ],
  };

  const fpRows = fieldPermissions.map((fp, i) => ({
    key: String(i),
    cells: [
      { key: fp.field, content: <Text weight="semibold">{fp.field}</Text> },
      { key: fp.admin, content: <PermBadge level={fp.admin} /> },
      { key: fp.hrbp, content: <PermBadge level={fp.hrbp} /> },
      { key: fp.manager, content: <PermBadge level={fp.manager} /> },
      { key: fp.finance, content: <PermBadge level={fp.finance} /> },
    ],
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
        <Text size="small" color="color.text.subtlest">
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={onBack}
          >
            Home
          </span>
        </Text>
        <Text size="small" color="color.text.subtlest">/</Text>
        <Text size="small" color="color.text.subtlest">
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={onBack}
          >
            Cycles
          </span>
        </Text>
        <Text size="small" color="color.text.subtlest">/</Text>
        <Text size="small" weight="bold">{breadcrumbName}</Text>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.150") }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: token("border.radius.100"),
              backgroundColor: token("color.background.brand.bold"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PageIcon label="" color={token("color.text.inverse")} />
          </div>
          <Heading size="large">{breadcrumbName}</Heading>
        </div>
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

      <style dangerouslySetInnerHTML={{ __html: "#cycle-details-tabs div[id$='-tab'] { max-width: none !important; width: 100% !important; }" }} />
      <Tabs id="cycle-details-tabs">
        <TabList>
          <Tab>Cycle Details</Tab>
          <Tab>Data Sources</Tab>
          <Tab>Employee Data</Tab>
          <Tab>Eligibility Rules</Tab>
          <Tab>User Role Permissions</Tab>
          <Tab>Field Permissions</Tab>
        </TabList>

        <TabPanel>
          <div style={{ paddingTop: token("space.300") }}>
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), marginBottom: token("space.300") }}>
                <PageIcon label="" color={token("color.icon.brand")} />
                <Heading size="small">Cycle Details</Heading>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: token("space.300"), marginBottom: token("space.300") }}>
                <div>
                  <Text size="small" weight="bold" color="color.text.subtlest">
                    <span style={{ textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "11px" }}>Cycle Name</span>
                  </Text>
                  <div style={{ marginTop: token("space.050") }}>
                    <Textfield
                      placeholder="Enter cycle name"
                      value={cycleName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCycleName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Text size="small" weight="bold" color="color.text.subtlest">
                    <span style={{ textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "11px" }}>Fiscal Year</span>
                  </Text>
                  <div style={{ marginTop: token("space.050") }}>
                    <Select
                      options={fiscalYearOptions}
                      value={fiscalYear}
                      onChange={(val: any) => val && setFiscalYear(val)}
                    />
                  </div>
                </div>
                <div>
                  <Text size="small" weight="bold" color="color.text.subtlest">
                    <span style={{ textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "11px" }}>Cycle Type</span>
                  </Text>
                  <div style={{ marginTop: token("space.050") }}>
                    <Select
                      options={cycleTypeOptions}
                      value={cycleType}
                      onChange={(val: any) => val && setCycleType(val)}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: token("space.300"), marginBottom: token("space.300") }}>
                <div>
                  <Text size="small" weight="bold" color="color.text.subtlest">
                    <span style={{ textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "11px" }}>Status</span>
                  </Text>
                  <div style={{ marginTop: token("space.050") }}>
                    <Select
                      options={statusOptions}
                      value={status}
                      onChange={(val: any) => val && setStatus(val)}
                    />
                  </div>
                </div>
                <div>
                  <Text size="small" weight="bold" color="color.text.subtlest">
                    <span style={{ textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "11px" }}>Start Date</span>
                  </Text>
                  <div style={{ marginTop: token("space.050") }}>
                    <Textfield
                      placeholder="mm/dd/yyyy"
                      value={startDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Text size="small" weight="bold" color="color.text.subtlest">
                    <span style={{ textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "11px" }}>End Date</span>
                  </Text>
                  <div style={{ marginTop: token("space.050") }}>
                    <Textfield
                      placeholder="mm/dd/yyyy"
                      value={endDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Text size="small" weight="bold" color="color.text.subtlest">
                  <span style={{ textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "11px" }}>Description</span>
                </Text>
                <div style={{ marginTop: token("space.050") }}>
                  <Textarea
                    placeholder="Enter cycle description..."
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    minimumRows={4}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: token("space.100"), marginTop: token("space.400") }}>
                <Button appearance="subtle" onClick={onBack}>Cancel</Button>
                <Button appearance="primary" iconBefore={PageIcon}>Save Changes</Button>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div style={{ paddingTop: token("space.300") }}>
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), marginBottom: token("space.300") }}>
                <DatabaseIcon label="" color={token("color.icon.brand")} />
                <Heading size="small">Connected Data Sources</Heading>
              </div>
              <DynamicTable
                head={dsHead}
                rows={dsRows}
                isFixedSize
              />
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div style={{ paddingTop: token("space.300") }}>
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.300") }}>
                <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                  <PersonIcon label="" color={token("color.icon.brand")} />
                  <Heading size="small">Employee Data Fields</Heading>
                </div>
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
          </div>
        </TabPanel>

        <TabPanel>
          <div style={{ paddingTop: token("space.300") }}>
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), marginBottom: token("space.300") }}>
                <CheckCircleIcon label="" color={token("color.icon.brand")} />
                <Heading size="small">Eligibility Rules</Heading>
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
                      borderRadius: token("border.radius.200"),
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
          </div>
        </TabPanel>

        <TabPanel>
          <div style={{ paddingTop: token("space.300") }}>
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), marginBottom: token("space.300") }}>
                <ShieldIcon label="" color={token("color.icon.brand")} />
                <Heading size="small">User Role Permissions</Heading>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${token("color.border")}` }}>
                    <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "left", fontSize: "11px", fontWeight: 700, color: token("color.text.subtlest"), textTransform: "uppercase", letterSpacing: "0.5px" }}>Role</th>
                    <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "center", fontSize: "11px", fontWeight: 700, color: token("color.text.subtlest"), textTransform: "uppercase", letterSpacing: "0.5px" }}>View</th>
                    <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "center", fontSize: "11px", fontWeight: 700, color: token("color.text.subtlest"), textTransform: "uppercase", letterSpacing: "0.5px" }}>Edit</th>
                    <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "center", fontSize: "11px", fontWeight: 700, color: token("color.text.subtlest"), textTransform: "uppercase", letterSpacing: "0.5px" }}>Approve</th>
                    <th style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "center", fontSize: "11px", fontWeight: 700, color: token("color.text.subtlest"), textTransform: "uppercase", letterSpacing: "0.5px" }}>Export</th>
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
          </div>
        </TabPanel>

        <TabPanel>
          <div style={{ paddingTop: token("space.300") }}>
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), marginBottom: token("space.300") }}>
                <ShieldIcon label="" color={token("color.icon.brand")} />
                <Heading size="small">Field-Level Permissions</Heading>
              </div>
              <DynamicTable
                head={fpHead}
                rows={fpRows}
                isFixedSize
              />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: token("space.100"), marginTop: token("space.300") }}>
                <Button appearance="subtle">Reset</Button>
                <Button appearance="primary">Save Permissions</Button>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

function PermBadge({ level }: { level: string }) {
  const appearance = level === "Edit"
    ? "success"
    : level === "View"
      ? "inprogress"
      : "default";
  return <Lozenge appearance={appearance}>{level}</Lozenge>;
}
