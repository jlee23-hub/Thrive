import { useState } from "react";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import Tabs, { Tab, TabList } from "@atlaskit/tabs";

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState(0);

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
        </Tabs>
      </div>
    </div>
  );
}
