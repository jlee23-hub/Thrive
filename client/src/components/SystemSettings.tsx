import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import Textfield from "@atlaskit/textfield";
import Toggle from "@atlaskit/toggle";
import Lozenge from "@atlaskit/lozenge";
import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";

import ShieldIcon from "@atlaskit/icon/core/shield";
import SettingsIcon from "@atlaskit/icon/core/settings";
import PersonIcon from "@atlaskit/icon/core/person";
import AddIcon from "@atlaskit/icon/core/add";
import SearchIcon from "@atlaskit/icon/core/search";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";
import PeopleGroupIcon from "@atlaskit/icon/core/people-group";

interface RolePermission {
  id: string;
  module: string;
  accessLevel: "Shared" | "Disabled" | "Enabled";
}

interface Role {
  id: string;
  name: string;
  userCount: number;
  description: string;
  permissions: RolePermission[];
}

const ROLES: Role[] = [
  {
    id: "employee",
    name: "Employee",
    userCount: 11178,
    description: "Can only view themselves",
    permissions: [
      { id: "bands", module: "Bands", accessLevel: "Shared" },
      { id: "benchmarking", module: "Benchmarking", accessLevel: "Disabled" },
      { id: "comp-planning", module: "Compensation Planning", accessLevel: "Disabled" },
      { id: "connectors", module: "Connectors", accessLevel: "Disabled" },
      { id: "reward-letters", module: "Reward Letters", accessLevel: "Enabled" },
      { id: "settings", module: "Settings", accessLevel: "Disabled" },
      { id: "team-view", module: "Team View", accessLevel: "Disabled" },
      { id: "total-rewards", module: "Total Rewards", accessLevel: "Enabled" },
    ],
  },
  { id: "standard", name: "Standard", userCount: 0, description: "Standard user permissions", permissions: [] },
  { id: "admin", name: "Admin", userCount: 6, description: "Full administrative access", permissions: [] },
  { id: "apex-exec", name: "APEX Executive Planner", userCount: 9, description: "Executive planning permissions", permissions: [] },
  { id: "columns-comp", name: "Columns_Comp team_MNDD", userCount: 3, description: "Team-specific permissions", permissions: [] },
  { id: "comp-head", name: "Head of Compensation_RH CSS Applicant", userCount: 1, description: "Compensation head permissions", permissions: [] },
  { id: "integrator", name: "Integrator", userCount: 3, description: "Integration permissions", permissions: [] },
  { id: "manager", name: "Manager", userCount: 1070, description: "Manager permissions", permissions: [] },
  { id: "custom", name: "Custom", userCount: 0, description: "Custom role", permissions: [] },
];

export default function SystemSettings() {
  const [selectedRole, setSelectedRole] = useState<Role>(ROLES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [roleTab, setRoleTab] = useState<"permissions" | "users">("permissions");

  const filteredRoles = ROLES.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: token("elevation.surface") }}>
      <div
        style={{
          padding: `${token("space.300")} ${token("space.400")}`,
          borderBottom: `1px solid ${token("color.border")}`,
        }}
      >
        <Heading size="large">System Settings</Heading>
        <div style={{ marginTop: token("space.100") }}>
          <Text size="small" color="color.text.subtlest">
            Manage roles, permissions, workflows, and system configurations
          </Text>
        </div>
      </div>

      <div style={{ borderBottom: `1px solid ${token("color.border")}` }}>
        <Tabs
          id="system-settings-tabs"
          selected={activeTab}
          onChange={(index) => setActiveTab(index)}
        >
          <TabList>
            <Tab>Roles & Permissions</Tab>
            <Tab>Company Info</Tab>
            <Tab>Workflow</Tab>
            <Tab>Users</Tab>
            <Tab>Notifications</Tab>
            <Tab>Compensation</Tab>
            <Tab>Currencies</Tab>
          </TabList>

          <TabPanel>
            <div style={{ display: "flex", height: "calc(100vh - 240px)", backgroundColor: token("elevation.surface") }}>
              <div
                style={{
                  width: "320px",
                  borderRight: `1px solid ${token("color.border")}`,
                  display: "flex",
                  flexDirection: "column",
                  flexShrink: 0,
                }}
              >
                <div style={{ padding: token("space.200"), borderBottom: `1px solid ${token("color.border")}` }}>
                  <Heading size="small">Roles</Heading>
                  <div style={{ marginTop: token("space.050") }}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">Manage user roles and permissions</Text>
                  </div>
                </div>

                <div style={{ padding: token("space.200"), borderBottom: `1px solid ${token("color.border")}` }}>
                  <Textfield
                    placeholder="Search roles..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    elemBeforeInput={
                      <div style={{ paddingLeft: token("space.100") }}>
                        <SearchIcon label="" color={token("color.icon.subtle")} />
                      </div>
                    }
                  />
                </div>

                <div style={{ flex: 1, overflowY: "auto", padding: token("space.100") }}>
                  {filteredRoles.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role)}
                      style={{
                        padding: token("space.150"),
                        borderRadius: token("border.radius.200"),
                        marginBottom: token("space.050"),
                        cursor: "pointer",
                        backgroundColor:
                          selectedRole.id === role.id
                            ? token("color.background.selected")
                            : "transparent",
                        border:
                          selectedRole.id === role.id
                            ? `1px solid ${token("color.border.selected")}`
                            : "1px solid transparent",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.050") }}>
                        <Text
                          size="small"
                          weight="semibold"
                          color={selectedRole.id === role.id ? "color.text.selected" : "color.text"}
                        >
                          {role.name}
                        </Text>
                        {selectedRole.id === role.id && (
                          <ChevronRightIcon label="" color={token("color.icon.selected")} />
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
                        <PeopleGroupIcon label="" LEGACY_size="small" />
                        <Text size="UNSAFE_small" color="color.text.subtlest">
                          {role.userCount} user{role.userCount !== 1 ? "s" : ""}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ padding: token("space.200"), borderTop: `1px solid ${token("color.border")}` }}>
                  <Button appearance="primary" iconBefore={AddIcon} shouldFitContainer>
                    Create Role
                  </Button>
                </div>
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div
                  style={{
                    padding: `${token("space.300")} ${token("space.300")} 0`,
                    borderBottom: `1px solid ${token("color.border")}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: token("space.200") }}>
                    <div>
                      <Heading size="medium">{selectedRole.name}</Heading>
                      <div style={{ marginTop: token("space.050") }}>
                        <Text size="small" color="color.text.subtlest">{selectedRole.description}</Text>
                      </div>
                    </div>
                    <Lozenge appearance="default">
                      {selectedRole.userCount} user{selectedRole.userCount !== 1 ? "s" : ""}
                    </Lozenge>
                  </div>

                  <div style={{ display: "flex", gap: token("space.300") }}>
                    {(["permissions", "users"] as const).map((tab) => (
                      <div
                        key={tab}
                        onClick={() => setRoleTab(tab)}
                        style={{
                          paddingBottom: token("space.150"),
                          cursor: "pointer",
                          borderBottom: roleTab === tab ? `2px solid ${token("color.border.selected")}` : "2px solid transparent",
                        }}
                      >
                        <Text
                          size="small"
                          weight="semibold"
                          color={roleTab === tab ? "color.text.selected" : "color.text.subtlest"}
                        >
                          {tab === "permissions" ? "Permissions" : `Users (${selectedRole.userCount})`}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ flex: 1, overflowY: "auto", padding: token("space.300") }}>
                  {roleTab === "permissions" ? (
                    <>
                      {selectedRole.id === "employee" && (
                        <div
                          style={{
                            padding: token("space.200"),
                            backgroundColor: token("color.background.information"),
                            borderRadius: token("border.radius.200"),
                            marginBottom: token("space.300"),
                            border: `1px solid ${token("color.border.information")}`,
                          }}
                        >
                          <Text size="small">
                            <strong>This is your company's default role.</strong> All users receive these base permissions. Changes to this role will affect everyone in your organization.
                          </Text>
                        </div>
                      )}

                      {selectedRole.permissions.length > 0 ? (
                        <>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.200") }}>
                            <Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">
                              PERMISSIONS
                            </Text>
                            <Text size="UNSAFE_small" color="color.text.subtlest">Inherit</Text>
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", gap: token("space.050") }}>
                            {selectedRole.permissions.map((permission) => (
                              <div
                                key={permission.id}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  padding: token("space.150"),
                                  backgroundColor: token("elevation.surface"),
                                  border: `1px solid ${token("color.border")}`,
                                  borderRadius: token("border.radius.100"),
                                }}
                              >
                                <div style={{ display: "flex", alignItems: "center", gap: token("space.150") }}>
                                  <SettingsIcon label="" color={token("color.icon.subtle")} />
                                  <Text size="small" weight="medium">{permission.module}</Text>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: token("space.150") }}>
                                  <Text size="small" color="color.text.subtlest">{permission.accessLevel}</Text>
                                  <Toggle
                                    isChecked={permission.accessLevel !== "Disabled"}
                                    onChange={() => {}}
                                    size="regular"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          <div
                            style={{
                              paddingTop: token("space.200"),
                              marginTop: token("space.300"),
                              borderTop: `1px solid ${token("color.border")}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text size="small" color="color.text.subtlest">
                              {selectedRole.permissions.length} permission{selectedRole.permissions.length !== 1 ? "s" : ""} configured
                            </Text>
                            <Button appearance="subtle">View Permission Details</Button>
                          </div>
                        </>
                      ) : (
                        <div style={{ textAlign: "center", padding: token("space.600") }}>
                          <ShieldIcon label="" color={token("color.icon.disabled")} />
                          <div style={{ marginTop: token("space.200") }}>
                            <Text weight="semibold">No permissions configured</Text>
                          </div>
                          <div style={{ marginTop: token("space.050") }}>
                            <Text size="small" color="color.text.subtlest">
                              Configure permissions for this role to define access
                            </Text>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ textAlign: "center", padding: token("space.600") }}>
                      <PeopleGroupIcon label="" color={token("color.icon.disabled")} />
                      <div style={{ marginTop: token("space.200") }}>
                        <Text weight="semibold">{selectedRole.userCount} users with this role</Text>
                      </div>
                      <div style={{ marginTop: token("space.050") }}>
                        <Text size="small" color="color.text.subtlest">
                          User management for individual roles coming soon
                        </Text>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabPanel>

          {["Company Info", "Workflow", "Users", "Notifications", "Compensation", "Currencies"].map((tabName) => (
            <TabPanel key={tabName}>
              <div style={{ padding: token("space.400"), textAlign: "center" }}>
                <Text color="color.text.subtlest">{tabName} settings coming soon...</Text>
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
