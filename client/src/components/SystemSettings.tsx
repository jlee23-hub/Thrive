import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import Lozenge from "@atlaskit/lozenge";
import SectionMessage from "@atlaskit/section-message";
import Toggle from "@atlaskit/toggle";
import { Checkbox } from "@atlaskit/checkbox";

import LockLockedIcon from "@atlaskit/icon/core/lock-locked";
import SearchIcon from "@atlaskit/icon/core/search";
import Textfield from "@atlaskit/textfield";

type DataSource = "Integration" | "User Input or Data Upload" | "Computed";
type DataDisplayType = "N/A" | "Text" | "Checkbox" | "Currency" | "Percentage" | "Number" | "Yes / No" | "Boolean";
type ColumnDefault = "Preview" | "Visible" | "Hidden";

interface RolePermission {
  role: string;
  color: "blue" | "green" | "teal" | "purple" | "orange" | "red" | "yellow" | "gray";
}

interface FieldPermission {
  id: string;
  columnName: string;
  fieldKey: string;
  dataSource: DataSource;
  sourceTag?: string;
  dataDisplayType: DataDisplayType;
  rewardLetterEligible: boolean;
  columnDefault: ColumnDefault;
  permissions: RolePermission[];
  allUsersCanView: boolean;
  fallbackPermission: string;
}

const roleColorMap: Record<string, "blue" | "green" | "teal" | "purple" | "orange" | "red" | "yellow" | "gray"> = {
  "Admin": "blue",
  "HRBP Role": "teal",
  "APEX Equity": "green",
  "APEX Planner": "orange",
  "Comp_Lib": "purple",
  "Columns_Lib": "yellow",
  "CBP_Cycle": "red",
  "CBP_Org": "orange",
  "APEX_Subs": "gray",
  "APEX Types": "purple",
};

const fields: FieldPermission[] = [
  { id: "f1", columnName: "Employee", fieldKey: "employee", dataSource: "Integration", dataDisplayType: "N/A", rewardLetterEligible: false, columnDefault: "Preview", permissions: [], allUsersCanView: true, fallbackPermission: "All Users Can View" },
  { id: "f2", columnName: "Employee ID", fieldKey: "employeeId", dataSource: "Integration", dataDisplayType: "Text", rewardLetterEligible: false, columnDefault: "Visible", permissions: [], allUsersCanView: true, fallbackPermission: "All Users Can View" },
  { id: "f3", columnName: "Geographic Zone", fieldKey: "zone", dataSource: "Integration", dataDisplayType: "Text", rewardLetterEligible: false, columnDefault: "Visible", permissions: [], allUsersCanView: true, fallbackPermission: "All Users Can View" },
  { id: "f4", columnName: "isIncluded", fieldKey: "isIncluded", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Checkbox", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "Admin", color: "blue" }, { role: "APEX Equity", color: "green" }], allUsersCanView: false, fallbackPermission: "All Other Users Can View" },
  { id: "f5", columnName: "Rev. Money Job Family change", fieldKey: "revMoneyJobFamilyChange", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Checkbox", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "Admin", color: "blue" }, { role: "APEX Equity", color: "green" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f6", columnName: "New Job Profile (proposed)", fieldKey: "newJobProfile", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Text", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "Admin", color: "blue" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f7", columnName: "H1 Rating P.Y.", fieldKey: "h1RatingPY", dataSource: "Computed", dataDisplayType: "Text", rewardLetterEligible: false, columnDefault: "Visible", permissions: [], allUsersCanView: true, fallbackPermission: "All Users Can View" },
  { id: "f8", columnName: "H2 Rating (current)", fieldKey: "h2RatingCurrent", dataSource: "Computed", dataDisplayType: "Text", rewardLetterEligible: false, columnDefault: "Visible", permissions: [], allUsersCanView: true, fallbackPermission: "All Users Can View" },
  { id: "f9", columnName: "v2 Rating FY25", fieldKey: "v2RatingFY25", dataSource: "Computed", dataDisplayType: "Text", rewardLetterEligible: false, columnDefault: "Visible", permissions: [], allUsersCanView: true, fallbackPermission: "All Users Can View" },
  { id: "f10", columnName: "New Salary (Annualized)", fieldKey: "newSalaryAnnualized", dataSource: "Computed", dataDisplayType: "Currency", rewardLetterEligible: false, columnDefault: "Visible", permissions: [], allUsersCanView: true, fallbackPermission: "All Users Can View" },
  { id: "f11", columnName: "APEX Equity Target (ex - stock)", fieldKey: "apexEquityTargetExStock", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Number", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "Admin", color: "blue" }, { role: "Columns_Lib", color: "yellow" }, { role: "HRBP Role", color: "teal" }, { role: "CBP_Cycle", color: "red" }, { role: "CBP_Org", color: "orange" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f12", columnName: "Moderate APEX Multiplier", fieldKey: "moderateApexMultiplier", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Text", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "APEX Equity", color: "green" }, { role: "Admin", color: "blue" }, { role: "APEX Planner", color: "orange" }, { role: "CBP_Cycle", color: "red" }, { role: "APEX Types", color: "purple" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f13", columnName: "Bottom Equity (USD)", fieldKey: "bottomEquityUsd", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Currency", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "Admin", color: "blue" }, { role: "CBP_Cycle", color: "red" }, { role: "Comp_Lib", color: "purple" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f14", columnName: "Equity Discretion Comments – Other", fieldKey: "equityDiscretionComments", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Text", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "CBP_Cycle", color: "red" }, { role: "Admin", color: "blue" }, { role: "APEX Equity", color: "green" }, { role: "APEX Planner", color: "orange" }, { role: "CBP_Org", color: "orange" }, { role: "APEX_Subs", color: "gray" }, { role: "APEX Types", color: "purple" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f15", columnName: "Max Equity ~ (USD)", fieldKey: "maxEquity", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Number", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "Admin", color: "blue" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f16", columnName: "Final Equity Multiplier FY25", fieldKey: "finalEquityMultiplierFY25", dataSource: "Computed", dataDisplayType: "Text", rewardLetterEligible: false, columnDefault: "Visible", permissions: [], allUsersCanView: true, fallbackPermission: "All Users Can View" },
  { id: "f17", columnName: "Discretion approved", fieldKey: "discretionApproved", dataSource: "Computed", dataDisplayType: "Yes / No", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "Columns_Lib", color: "yellow" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Ref View" },
  { id: "f18", columnName: "Future termination", fieldKey: "futureTermination", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Checkbox", rewardLetterEligible: false, columnDefault: "Visible", permissions: [], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f19", columnName: "Equity Shortterm Justification", fieldKey: "equityShorttermJustification", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Text", rewardLetterEligible: false, columnDefault: "Visible", permissions: [], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f20", columnName: "2025 Special Equity Tax", fieldKey: "specialEquityTax2025", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Text", rewardLetterEligible: false, columnDefault: "Visible", permissions: [], allUsersCanView: false, fallbackPermission: "All Users Can Not View" },
  { id: "f21", columnName: "FY25 Special Equity Recipient", fieldKey: "fy25SpecialEquityRecipient", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Yes / No", rewardLetterEligible: false, columnDefault: "Visible", permissions: [], allUsersCanView: false, fallbackPermission: "All Users Can Not View" },
  { id: "f22", columnName: "Stock Vests", fieldKey: "stockVests", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Text", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "HRBP Role", color: "teal" }, { role: "APEX Equity", color: "green" }, { role: "Columns_Lib", color: "yellow" }, { role: "APEX_Subs", color: "gray" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f23", columnName: "Special Equity – Components", fieldKey: "specialEquityComponents", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Text", rewardLetterEligible: false, columnDefault: "Visible", permissions: [], allUsersCanView: false, fallbackPermission: "All Users Can Not View" },
  { id: "f24", columnName: "Special Equity Grant (USD)", fieldKey: "specialEquityGrantUsd", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Number", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "Admin", color: "blue" }, { role: "HRBP Role", color: "teal" }, { role: "APEX Equity", color: "green" }, { role: "Comp_Lib", color: "purple" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f25", columnName: "L100+ Promotion Equity (USD)", fieldKey: "l100PromotionEquityUsd", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Number", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "APEX Equity", color: "green" }, { role: "Comp_Lib", color: "purple" }, { role: "APEX Types", color: "purple" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f26", columnName: "L100+ Retention Equity (USD)", fieldKey: "l100RetentionEquityUsd", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Number", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "APEX Equity", color: "green" }, { role: "Comp_Lib", color: "purple" }, { role: "APEX Types", color: "purple" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f27", columnName: "Retention Equity Justification", fieldKey: "retentionEquityJustification", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Text", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "APEX Equity", color: "green" }, { role: "APEX Types", color: "purple" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f28", columnName: "Prior Year APEX Equity", fieldKey: "priorYearApexEquity", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Number", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "Admin", color: "blue" }, { role: "HRBP Role", color: "teal" }, { role: "APEX Equity", color: "green" }, { role: "Columns_Lib", color: "yellow" }, { role: "APEX_Subs", color: "gray" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f29", columnName: "Prior Year Other Equity", fieldKey: "priorYearOtherEquity", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Number", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "Admin", color: "blue" }, { role: "HRBP Role", color: "teal" }, { role: "APEX Equity", color: "green" }, { role: "Columns_Lib", color: "yellow" }, { role: "APEX_Subs", color: "gray" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
  { id: "f30", columnName: "Prior Year Promotion Equity", fieldKey: "priorYearPromotionEquity", dataSource: "User Input or Data Upload", sourceTag: "ValueOverrides", dataDisplayType: "Number", rewardLetterEligible: false, columnDefault: "Visible", permissions: [{ role: "Admin", color: "blue" }, { role: "HRBP Role", color: "teal" }, { role: "APEX Equity", color: "green" }, { role: "Columns_Lib", color: "yellow" }, { role: "APEX_Subs", color: "gray" }], allUsersCanView: false, fallbackPermission: "All Other Users Can Not View" },
];

const roleColors: Record<string, string> = {
  blue: token("color.background.information"),
  green: token("color.background.success"),
  teal: token("color.background.discovery"),
  purple: token("color.background.discovery"),
  orange: token("color.background.warning"),
  red: token("color.background.danger"),
  yellow: token("color.background.warning"),
  gray: token("color.background.neutral"),
};

const roleTextColors: Record<string, string> = {
  blue: token("color.text.information"),
  green: token("color.text.success"),
  teal: token("color.text.discovery"),
  purple: token("color.text.discovery"),
  orange: token("color.text.warning"),
  red: token("color.text.danger"),
  yellow: token("color.text.warning"),
  gray: token("color.text.subtlest"),
};

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: "6px",
  border: `1px solid ${token("color.border")}`,
  overflow: "hidden",
};

const thStyle: React.CSSProperties = {
  padding: `${token("space.100")} ${token("space.150")}`,
  textAlign: "left",
  fontSize: "11px",
  fontWeight: 600,
  color: token("color.text.subtlest"),
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  whiteSpace: "nowrap" as const,
  borderBottom: `2px solid ${token("color.border")}`,
  backgroundColor: token("elevation.surface.sunken"),
  position: "sticky" as const,
  top: 0,
  zIndex: 1,
};

const tdStyle: React.CSSProperties = {
  padding: `${token("space.100")} ${token("space.150")}`,
  fontSize: "13px",
  color: token("color.text"),
  borderBottom: `1px solid ${token("color.border")}`,
  verticalAlign: "middle",
};

export default function SystemSettings() {
  const [search, setSearch] = useState("");
  const [isLocked, setIsLocked] = useState(true);

  const filteredFields = fields.filter((f) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return f.columnName.toLowerCase().includes(s) || f.fieldKey.toLowerCase().includes(s) || f.dataSource.toLowerCase().includes(s);
  });

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
            <Heading size="large">Columns</Heading>
            <div style={{ display: "flex", alignItems: "center", gap: token("space.200"), marginTop: token("space.100") }}>
              <Text size="small" color="color.text.subtlest">
                Specify the columns that will appear in the Planner and customize which roles will be able to view and edit from.
              </Text>
              <button
                onClick={() => {}}
                style={{
                  background: "none",
                  border: "none",
                  color: token("color.link"),
                  fontSize: "13px",
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                Learn more about columns
              </button>
            </div>
          </div>
          <div style={{ display: "flex", gap: token("space.100"), alignItems: "center" }}>
            <Button appearance="subtle">View Audit Log</Button>
            <Button appearance="primary">View Columns by Role</Button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: token("space.400") }}>
        {isLocked && (
          <div style={{ marginBottom: token("space.300") }}>
            <SectionMessage appearance="information">
              <Text size="small">
                The cycle is <Text size="small" weight="bold">finalized</Text> so you can no longer edit columns. All columns with the "Can Edit" permission are now view-only. The original permissions will still be visible and will only take effect if the cycle is unfinalized for any reason.
              </Text>
            </SectionMessage>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.300") }}>
          <div style={{ width: "320px" }}>
            <Textfield
              placeholder="Search columns by name or field key..."
              elemBeforeInput={<div style={{ paddingLeft: token("space.075") }}><SearchIcon label="" color={token("color.icon.subtle")} /></div>}
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: token("space.200") }}>
            <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
              <LockLockedIcon label="" color={token("color.icon.subtle")} LEGACY_size="small" />
              <Text size="small" color="color.text.subtlest">Locked</Text>
              <Toggle isChecked={isLocked} onChange={() => setIsLocked(!isLocked)} size="regular" />
            </div>
            <Text size="small" color="color.text.subtlest">
              {filteredFields.length} column{filteredFields.length !== 1 ? "s" : ""}
            </Text>
          </div>
        </div>

        <div style={{ ...cardStyle, overflow: "auto", maxHeight: "calc(100vh - 300px)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1200px" }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: "32px", padding: `${token("space.100")} ${token("space.100")}` }}></th>
                <th style={{ ...thStyle, minWidth: "260px" }}>Column Name</th>
                <th style={{ ...thStyle, minWidth: "180px" }}>Data Source</th>
                <th style={{ ...thStyle, minWidth: "110px" }}>Data Display Type</th>
                <th style={{ ...thStyle, minWidth: "120px", textAlign: "center" }}>Reward Letter Eligible</th>
                <th style={{ ...thStyle, minWidth: "100px", textAlign: "center" }}>Column Default</th>
                <th style={{ ...thStyle, minWidth: "380px" }}>Permissions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFields.map((field) => (
                <tr key={field.id} style={{ cursor: "pointer" }}>
                  <td style={{ ...tdStyle, padding: `${token("space.100")} ${token("space.100")}` }}>
                    <Checkbox />
                  </td>
                  <td style={tdStyle}>
                    <div>
                      <Text size="small" weight="medium">{field.columnName}</Text>
                      <div>
                        <span style={{ fontSize: "11px", color: token("color.text.subtlest"), fontFamily: "monospace" }}>
                          {field.fieldKey}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: token("space.075"), flexWrap: "wrap" }}>
                      <Text size="small">{field.dataSource}</Text>
                      {field.sourceTag && (
                        <span style={{
                          fontSize: "10px",
                          fontWeight: 600,
                          color: token("color.text.warning"),
                          backgroundColor: token("color.background.warning"),
                          padding: `1px ${token("space.050")}`,
                          borderRadius: "3px",
                          textTransform: "uppercase",
                        }}>
                          {field.sourceTag}
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <Text size="small">{field.dataDisplayType}</Text>
                  </td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    <Text size="small" color="color.text.subtlest">{field.rewardLetterEligible ? "Yes" : "No"}</Text>
                  </td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    <Lozenge appearance={field.columnDefault === "Preview" ? "inprogress" : field.columnDefault === "Visible" ? "default" : "moved"}>
                      {field.columnDefault}
                    </Lozenge>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: token("space.050"), flexWrap: "wrap" }}>
                      {field.permissions.map((perm, i) => (
                        <span
                          key={i}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            fontSize: "11px",
                            fontWeight: 600,
                            color: roleTextColors[perm.color] || token("color.text"),
                            backgroundColor: roleColors[perm.color] || token("color.background.neutral"),
                            padding: `2px ${token("space.075")}`,
                            borderRadius: "3px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {perm.role}
                        </span>
                      ))}
                      {field.permissions.length > 0 && (
                        <span style={{
                          fontSize: "11px",
                          color: token("color.text.subtlest"),
                          whiteSpace: "nowrap",
                          marginLeft: token("space.050"),
                        }}>
                          {field.fallbackPermission}
                        </span>
                      )}
                      {field.permissions.length === 0 && (
                        <span style={{
                          fontSize: "11px",
                          color: field.allUsersCanView ? token("color.text.subtlest") : token("color.text.disabled"),
                          whiteSpace: "nowrap",
                        }}>
                          {field.fallbackPermission}
                        </span>
                      )}
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
