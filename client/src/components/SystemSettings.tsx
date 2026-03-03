import React from "react";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import Lozenge from "@atlaskit/lozenge";

import PersonIcon from "@atlaskit/icon/core/person";
import PeopleGroupIcon from "@atlaskit/icon/core/people-group";
import ShieldIcon from "@atlaskit/icon/core/shield";
import DatabaseIcon from "@atlaskit/icon/core/database";

interface RolePermission {
  role: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  access: { area: string; permission: string; appearance: "success" | "removed" | "inprogress" | "default" }[];
}

const roles: RolePermission[] = [
  {
    role: "Employee",
    description: "Individual contributors who can view their own compensation data only.",
    icon: <PersonIcon label="" color={token("color.icon.information")} />,
    color: token("color.background.information"),
    access: [
      { area: "Total Rewards", permission: "View own data", appearance: "success" },
      { area: "RSUs", permission: "View own grants", appearance: "success" },
      { area: "Team Overview", permission: "No access", appearance: "removed" },
      { area: "Data Management", permission: "No access", appearance: "removed" },
      { area: "Permissions", permission: "No access", appearance: "removed" },
    ],
  },
  {
    role: "Manager",
    description: "People managers who can view compensation data for their direct reports.",
    icon: <PeopleGroupIcon label="" color={token("color.icon.success")} />,
    color: token("color.background.success"),
    access: [
      { area: "Total Rewards", permission: "View own data", appearance: "success" },
      { area: "RSUs", permission: "View own grants", appearance: "success" },
      { area: "Team Overview", permission: "View direct reports", appearance: "success" },
      { area: "Data Management", permission: "No access", appearance: "removed" },
      { area: "Permissions", permission: "No access", appearance: "removed" },
    ],
  },
  {
    role: "Comp Admin",
    description: "Compensation administrators who manage data, permissions, and system configuration.",
    icon: <ShieldIcon label="" color={token("color.icon.warning")} />,
    color: token("color.background.warning"),
    access: [
      { area: "Total Rewards", permission: "View all employees", appearance: "success" },
      { area: "RSUs", permission: "View all employees", appearance: "success" },
      { area: "Team Overview", permission: "View all employees", appearance: "success" },
      { area: "Data Management", permission: "Full access", appearance: "success" },
      { area: "Permissions", permission: "Full access", appearance: "success" },
    ],
  },
  {
    role: "Data Integration Engineer",
    description: "Technical administrators who configure and maintain API integrations with Workday and Shareworks.",
    icon: <DatabaseIcon label="" color={token("color.icon.discovery")} />,
    color: token("color.background.discovery"),
    access: [
      { area: "Total Rewards", permission: "No access", appearance: "removed" },
      { area: "RSUs", permission: "No access", appearance: "removed" },
      { area: "Team Overview", permission: "No access", appearance: "removed" },
      { area: "Data Management", permission: "Full access", appearance: "success" },
      { area: "Permissions", permission: "No access", appearance: "removed" },
    ],
  },
];

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: "6px",
  border: `1px solid ${token("color.border")}`,
  overflow: "hidden",
};

const thStyle: React.CSSProperties = {
  padding: `${token("space.100")} ${token("space.200")}`,
  textAlign: "left",
  fontSize: "11px",
  fontWeight: 600,
  color: token("color.text.subtlest"),
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  whiteSpace: "nowrap" as const,
  borderBottom: `2px solid ${token("color.border")}`,
  backgroundColor: token("elevation.surface.sunken"),
};

const tdStyle: React.CSSProperties = {
  padding: `${token("space.100")} ${token("space.200")}`,
  fontSize: "13px",
  color: token("color.text"),
  borderBottom: `1px solid ${token("color.border")}`,
  verticalAlign: "middle",
};

export default function SystemSettings() {
  return (
    <div style={{ backgroundColor: token("elevation.surface.sunken"), minHeight: "100%" }}>
      <div
        style={{
          backgroundColor: token("elevation.surface"),
          borderBottom: `2px solid ${token("color.border")}`,
          padding: `${token("space.300")} ${token("space.400")}`,
        }}
      >
        <Heading size="large">Permissions</Heading>
        <div style={{ marginTop: token("space.100") }}>
          <Text size="small" color="color.text.subtlest">
            Role-based access control for Thrive. Each role determines what areas a user can see and interact with.
          </Text>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: token("space.400") }}>
        <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
          {roles.map((role) => (
            <div key={role.role} style={cardStyle}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: token("space.150"),
                  padding: `${token("space.200")} ${token("space.300")}`,
                  borderBottom: `1px solid ${token("color.border")}`,
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    backgroundColor: role.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {role.icon}
                </div>
                <div>
                  <Text size="medium" weight="bold">{role.role}</Text>
                  <div>
                    <Text size="small" color="color.text.subtlest">{role.description}</Text>
                  </div>
                </div>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Area</th>
                    <th style={thStyle}>Permission</th>
                  </tr>
                </thead>
                <tbody>
                  {role.access.map((item) => (
                    <tr key={item.area}>
                      <td style={tdStyle}>
                        <Text size="small" weight="medium">{item.area}</Text>
                      </td>
                      <td style={tdStyle}>
                        <Lozenge appearance={item.appearance}>{item.permission}</Lozenge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
