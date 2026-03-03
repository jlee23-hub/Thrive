import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import Textfield from "@atlaskit/textfield";
import Lozenge from "@atlaskit/lozenge";
import Toggle from "@atlaskit/toggle";
import SectionMessage from "@atlaskit/section-message";

import DatabaseIcon from "@atlaskit/icon/core/database";
import RefreshIcon from "@atlaskit/icon/core/refresh";
import AddIcon from "@atlaskit/icon/core/add";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";
import CheckCircleIcon from "@atlaskit/icon/core/check-circle";
import UploadIcon from "@atlaskit/icon/core/upload";
import ChartTrendIcon from "@atlaskit/icon/core/chart-trend";
import DownloadIcon from "@atlaskit/icon/core/download";
import LockLockedIcon from "@atlaskit/icon/core/lock-locked";

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

export default function DataManagement() {
  const [selectedSource, setSelectedSource] = useState<string | null>("workday");
  const [expandedTable, setExpandedTable] = useState<string | null>(null);
  const [isApiSetupExpanded, setIsApiSetupExpanded] = useState(true);
  const [sources, setSources] = useState(dataSources);

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

  const selectedSourceData = sources.find((s) => s.id === selectedSource);

  return (
    <div style={{ backgroundColor: token("elevation.surface.sunken"), minHeight: "100%" }}>
      <div
        style={{
          backgroundColor: token("elevation.surface"),
          borderBottom: `2px solid ${token("color.border")}`,
          padding: `${token("space.300")} ${token("space.400")}`,
        }}
      >
        <Heading size="large">Data Management</Heading>
        <div style={{ marginTop: token("space.100") }}>
          <Text size="small" color="color.text.subtlest">
            Connect and sync data from third-party systems, upload CSV files, and manage data table permissions
          </Text>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: token("space.400") }}>
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
                    Configure API endpoints and authentication before syncing data sources
                  </Text>
                </div>
              </div>
            </div>
            <Lozenge appearance="inprogress">Setup required</Lozenge>
          </div>

          {isApiSetupExpanded && (
            <div style={{ padding: token("space.300") }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: token("space.300") }}>
                {[
                  { name: "Workday API", subtitle: "HRIS Integration", icon: <DatabaseIcon label="" color={token("color.text.inverse")} />, bgColor: token("color.background.brand.bold") },
                  { name: "Shareworks API", subtitle: "Equity Management", icon: <ChartTrendIcon label="" color={token("color.text.inverse")} />, bgColor: token("color.background.success.bold") },
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
                      <div style={{ display: "flex", gap: token("space.100"), marginTop: token("space.100") }}>
                        <Button appearance="primary" iconBefore={CheckCircleIcon}>
                          Test Connection
                        </Button>
                        <Button appearance="default">
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: token("space.300") }}>
                <SectionMessage appearance="information">
                  <Text size="small" weight="semibold">API Configuration Required</Text>
                  <div style={{ marginTop: token("space.050") }}>
                    <Text size="small" color="color.text.subtlest">
                      Configure API credentials for Workday and Shareworks before you can grant permissions and sync data.
                      Contact your IT administrator if you need API access credentials.
                    </Text>
                  </div>
                </SectionMessage>
              </div>
            </div>
          )}
        </div>

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

        {selectedSourceData && selectedSourceData.tables.length > 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.200") }}>
              <Heading size="small">{selectedSourceData.name} Tables</Heading>
              <div style={{ display: "flex", gap: token("space.100") }}>
                <Button appearance="subtle" iconBefore={RefreshIcon}>
                  Sync All
                </Button>
                <Button appearance="primary" iconBefore={AddIcon}>
                  Add Table
                </Button>
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
                      <Button appearance="subtle" spacing="compact" iconBefore={RefreshIcon}>
                        Sync
                      </Button>
                    </div>
                  </div>

                  {expandedTable === table.id && (
                    <div
                      style={{
                        borderTop: `1px solid ${token("color.border")}`,
                        padding: token("space.200"),
                      }}
                    >
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
          <div
            style={{
              ...cardStyle,
              padding: token("space.600"),
              textAlign: "center",
            }}
          >
            <UploadIcon label="" color={token("color.icon.disabled")} />
            <div style={{ marginTop: token("space.200") }}>
              <Text weight="semibold">No tables configured</Text>
            </div>
            <div style={{ marginTop: token("space.050") }}>
              <Text size="small" color="color.text.subtlest">Upload a CSV file to get started</Text>
            </div>
            <div style={{ marginTop: token("space.200") }}>
              <Button appearance="primary" iconBefore={UploadIcon}>
                Upload CSV
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
