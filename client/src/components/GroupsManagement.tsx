import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import Textfield from "@atlaskit/textfield";
import Toggle from "@atlaskit/toggle";
import Lozenge from "@atlaskit/lozenge";
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalTransition } from "@atlaskit/modal-dialog";
import { Checkbox } from "@atlaskit/checkbox";

import PeopleGroupIcon from "@atlaskit/icon/core/people-group";
import AddIcon from "@atlaskit/icon/core/add";
import CrossIcon from "@atlaskit/icon/core/cross";
import SearchIcon from "@atlaskit/icon/core/search";
import ShieldIcon from "@atlaskit/icon/core/shield";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";
import PersonIcon from "@atlaskit/icon/core/person";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: User[];
  permissions: { name: string; enabled: boolean }[];
}

const MOCK_USERS: User[] = [
  { id: "1", name: "Sarah Chen", email: "sarah.chen@company.com" },
  { id: "2", name: "Michael Rodriguez", email: "michael.r@company.com" },
  { id: "3", name: "Emily Thompson", email: "emily.t@company.com" },
  { id: "4", name: "David Kim", email: "david.kim@company.com" },
  { id: "5", name: "Jessica Martinez", email: "jessica.m@company.com" },
  { id: "6", name: "Robert Chen", email: "robert.c@company.com" },
  { id: "7", name: "Amanda Foster", email: "amanda.f@company.com" },
];

const INITIAL_GROUPS: Group[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access",
    members: [MOCK_USERS[0], MOCK_USERS[1]],
    permissions: [
      { name: "Bands", enabled: true },
      { name: "Benchmarking", enabled: false },
      { name: "Compensation Planning", enabled: true },
      { name: "Connections", enabled: false },
      { name: "Reward Letters", enabled: true },
      { name: "Settings", enabled: true },
      { name: "Team View", enabled: false },
      { name: "Total Rewards", enabled: true },
    ],
  },
  {
    id: "2",
    name: "APEX Executive Planner",
    description: "Executive compensation planning",
    members: [MOCK_USERS[2], MOCK_USERS[3]],
    permissions: [
      { name: "Bands", enabled: false },
      { name: "Compensation Planning", enabled: true },
      { name: "Total Rewards", enabled: true },
    ],
  },
  {
    id: "3",
    name: "Board Compensation Viewer",
    description: "Board-level compensation visibility",
    members: [MOCK_USERS[4]],
    permissions: [
      { name: "Bands", enabled: true },
      { name: "Total Rewards", enabled: true },
    ],
  },
  {
    id: "4",
    name: "Compensation Analyst",
    description: "Analyze and report on compensation",
    members: [MOCK_USERS[5], MOCK_USERS[6]],
    permissions: [
      { name: "Bands", enabled: true },
      { name: "Benchmarking", enabled: true },
      { name: "Compensation Planning", enabled: false },
      { name: "Total Rewards", enabled: true },
    ],
  },
  {
    id: "5",
    name: "Engineering Managers",
    description: "Engineering team management",
    members: [],
    permissions: [
      { name: "Team View", enabled: true },
      { name: "Compensation Planning", enabled: true },
    ],
  },
];

export default function GroupsManagement() {
  const [groups, setGroups] = useState<Group[]>(INITIAL_GROUPS);
  const [selectedGroup, setSelectedGroup] = useState<Group>(INITIAL_GROUPS[0]);
  const [activeTab, setActiveTab] = useState<"permissions" | "users">("permissions");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedUsersToAdd, setSelectedUsersToAdd] = useState<string[]>([]);

  const handleRemoveUser = (userId: string) => {
    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id
        ? { ...group, members: group.members.filter((m) => m.id !== userId) }
        : group
    );
    setGroups(updatedGroups);
    setSelectedGroup(updatedGroups.find((g) => g.id === selectedGroup.id)!);
  };

  const handleAddUsers = () => {
    const usersToAdd = MOCK_USERS.filter((u) => selectedUsersToAdd.includes(u.id));
    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id
        ? { ...group, members: [...group.members, ...usersToAdd] }
        : group
    );
    setGroups(updatedGroups);
    setSelectedGroup(updatedGroups.find((g) => g.id === selectedGroup.id)!);
    setShowAddUserModal(false);
    setSelectedUsersToAdd([]);
  };

  const filteredMembers = selectedGroup.members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unusedUsers = MOCK_USERS.filter(
    (user) => !selectedGroup.members.some((member) => member.id === user.id)
  );

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("");

  return (
    <div style={{ display: "flex", height: "100%", backgroundColor: token("elevation.surface") }}>
      <div
        style={{
          width: "320px",
          borderRight: `1px solid ${token("color.border")}`,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: token("space.200"),
            borderBottom: `1px solid ${token("color.border")}`,
          }}
        >
          <Heading size="small">Groups</Heading>
          <div style={{ marginTop: token("space.050") }}>
            <Text size="UNSAFE_small" color="color.text.subtlest">Manage user groups and permissions</Text>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: token("space.100") }}>
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => {
                setSelectedGroup(group);
                setActiveTab("users");
              }}
              style={{
                padding: token("space.150"),
                borderRadius: token("border.radius.300"),
                marginBottom: token("space.050"),
                cursor: "pointer",
                backgroundColor:
                  selectedGroup.id === group.id
                    ? token("color.background.selected")
                    : "transparent",
                border:
                  selectedGroup.id === group.id
                    ? `1px solid ${token("color.border.selected")}`
                    : "1px solid transparent",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.050") }}>
                <Text
                  size="small"
                  weight="semibold"
                  color={selectedGroup.id === group.id ? "color.text.selected" : "color.text"}
                >
                  {group.name}
                </Text>
                {selectedGroup.id === group.id && (
                  <ChevronRightIcon label="" color={token("color.icon.selected")} />
                )}
              </div>
              <Text size="UNSAFE_small" color="color.text.subtlest">{group.description}</Text>
              <div style={{ display: "flex", alignItems: "center", gap: token("space.050"), marginTop: token("space.050") }}>
                <PeopleGroupIcon label="" LEGACY_size="small" />
                <Text size="UNSAFE_small" color="color.text.subtlest">
                  {group.members.length} member{group.members.length !== 1 ? "s" : ""}
                </Text>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: token("space.200"),
            borderTop: `1px solid ${token("color.border")}`,
          }}
        >
          <Button appearance="primary" iconBefore={AddIcon} shouldFitContainer>
            Create Group
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
              <Heading size="medium">{selectedGroup.name}</Heading>
              <div style={{ marginTop: token("space.050") }}>
                <Text size="small" color="color.text.subtlest">{selectedGroup.description}</Text>
              </div>
            </div>
            <Lozenge appearance="default">
              {selectedGroup.members.length} member{selectedGroup.members.length !== 1 ? "s" : ""}
            </Lozenge>
          </div>

          <div style={{ display: "flex", gap: token("space.300") }}>
            {(["permissions", "users"] as const).map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  paddingBottom: token("space.150"),
                  cursor: "pointer",
                  borderBottom: activeTab === tab ? `2px solid ${token("color.border.selected")}` : "2px solid transparent",
                }}
              >
                <Text
                  size="small"
                  weight="semibold"
                  color={activeTab === tab ? "color.text.selected" : "color.text.subtlest"}
                >
                  {tab === "permissions" ? "Permissions" : `Users (${selectedGroup.members.length})`}
                </Text>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: token("space.300") }}>
          {activeTab === "permissions" ? (
            <div>
              <div
                style={{
                  padding: token("space.200"),
                  backgroundColor: token("color.background.information"),
                  borderRadius: token("border.radius.300"),
                  marginBottom: token("space.300"),
                  border: `1px solid ${token("color.border.information")}`,
                }}
              >
                <Text size="small">
                  <strong>This is your company's default role.</strong> All users receive these base permissions. Changes to this role will affect everyone in your organization.
                </Text>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.200") }}>
                <Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">
                  PERMISSIONS
                </Text>
                <Text size="UNSAFE_small" color="color.text.subtlest">Inherit</Text>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: token("space.050") }}>
                {selectedGroup.permissions.map((permission, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: token("space.150"),
                      backgroundColor: token("elevation.surface"),
                      border: `1px solid ${token("color.border")}`,
                      borderRadius: token("border.radius.200"),
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: token("space.150") }}>
                      <ShieldIcon label="" color={token("color.icon.subtle")} />
                      <Text size="small" weight="medium">{permission.name}</Text>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: token("space.150") }}>
                      <Text size="small" color="color.text.subtlest">
                        {permission.enabled ? "Enabled" : "Disabled"}
                      </Text>
                      <Toggle
                        isChecked={permission.enabled}
                        onChange={() => {}}
                        size="regular"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {selectedGroup.permissions.length > 0 && (
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
                    {selectedGroup.permissions.length} permission{selectedGroup.permissions.length !== 1 ? "s" : ""} assigned to this group
                  </Text>
                  <Button appearance="subtle">View Permission Details</Button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: token("space.200"), marginBottom: token("space.200") }}>
                <div style={{ flex: 1 }}>
                  <Textfield
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    elemBeforeInput={
                      <div style={{ paddingLeft: token("space.100") }}>
                        <SearchIcon label="" color={token("color.icon.subtle")} />
                      </div>
                    }
                  />
                </div>
                <Button appearance="primary" iconBefore={AddIcon} onClick={() => setShowAddUserModal(true)}>
                  Add Users
                </Button>
              </div>

              {filteredMembers.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: `${token("space.600")} 0`,
                  }}
                >
                  <PeopleGroupIcon label="" color={token("color.icon.disabled")} />
                  <div style={{ marginTop: token("space.200") }}>
                    <Text weight="semibold">
                      {searchQuery ? "No members found" : "No members in this group"}
                    </Text>
                  </div>
                  <div style={{ marginTop: token("space.050") }}>
                    <Text size="small" color="color.text.subtlest">
                      {searchQuery ? "Try a different search term" : "Add users to this group to get started"}
                    </Text>
                  </div>
                  {!searchQuery && (
                    <div style={{ marginTop: token("space.200") }}>
                      <Button appearance="primary" iconBefore={AddIcon} onClick={() => setShowAddUserModal(true)}>
                        Add First Member
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: token("space.100") }}>
                    <Text size="small" color="color.text.subtlest">
                      {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""}
                      {searchQuery && ` matching "${searchQuery}"`}
                    </Text>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: token("space.100") }}>
                    {filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: token("space.200"),
                          backgroundColor: token("elevation.surface"),
                          border: `1px solid ${token("color.border")}`,
                          borderRadius: token("border.radius.300"),
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: token("space.150") }}>
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              backgroundColor: token("color.background.brand.bold"),
                              color: token("color.text.inverse"),
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "14px",
                              fontWeight: 500,
                            }}
                          >
                            {getInitials(member.name)}
                          </div>
                          <div>
                            <Text size="small" weight="medium">{member.name}</Text>
                            <div>
                              <Text size="UNSAFE_small" color="color.text.subtlest">{member.email}</Text>
                            </div>
                          </div>
                        </div>
                        <Button appearance="danger" spacing="compact" onClick={() => handleRemoveUser(member.id)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <ModalTransition>
        {showAddUserModal && (
          <Modal onClose={() => { setShowAddUserModal(false); setSelectedUsersToAdd([]); }}>
            <ModalHeader>
              <ModalTitle>Add Users to {selectedGroup.name}</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Text size="small" color="color.text.subtlest">Select users to add to this group</Text>
              <div style={{ marginTop: token("space.200"), display: "flex", flexDirection: "column", gap: token("space.100") }}>
                {unusedUsers.length === 0 ? (
                  <div style={{ textAlign: "center", padding: token("space.400") }}>
                    <Text color="color.text.subtlest">All available users are already in this group</Text>
                  </div>
                ) : (
                  unusedUsers.map((user) => (
                    <div
                      key={user.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: token("space.150"),
                        padding: token("space.150"),
                        border: `1px solid ${token("color.border")}`,
                        borderRadius: token("border.radius.200"),
                      }}
                    >
                      <Checkbox
                        isChecked={selectedUsersToAdd.includes(user.id)}
                        onChange={() =>
                          setSelectedUsersToAdd((prev) =>
                            prev.includes(user.id)
                              ? prev.filter((id) => id !== user.id)
                              : [...prev, user.id]
                          )
                        }
                        label=""
                      />
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: token("color.background.brand.bold"),
                          color: token("color.text.inverse"),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <Text size="small" weight="medium">{user.name}</Text>
                        <div>
                          <Text size="UNSAFE_small" color="color.text.subtlest">{user.email}</Text>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button appearance="subtle" onClick={() => { setShowAddUserModal(false); setSelectedUsersToAdd([]); }}>
                Cancel
              </Button>
              <Button appearance="primary" onClick={handleAddUsers} isDisabled={selectedUsersToAdd.length === 0}>
                Add {selectedUsersToAdd.length > 0 ? `${selectedUsersToAdd.length} ` : ""}User{selectedUsersToAdd.length !== 1 ? "s" : ""}
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </div>
  );
}
