import React, { useState } from "react";
import AppProvider from "@atlaskit/app-provider";

import { Root as PageLayoutRoot } from "@atlaskit/navigation-system/layout/root";
import { Main } from "@atlaskit/navigation-system/layout/main";
import { TopNavigation } from "../components/TopNavigation";
import { SideNavigation } from "../components/SideNavigation";

import { setBooleanFeatureFlagResolver } from "@atlaskit/platform-feature-flags";

/**
 * List of default feature flags to enable:
 */
const defaultFeatureFlags = [
  // Enable the fix for portals in React 18 concurrent (should be defaulted, just no one's landed it)
  "platform_design_system_team_portal_logic_r18_fix",
  // Enable the new context (should be defaulted, just no one's landed it)
  "analytics-next-use-modern-context_jira",
  // Enable the Visual Refresh
  "platform-component-visual-refresh",
  "platform-default-typography-modernized",
];

/**
 * Update the feature flag resolver to resolve new feature flags (as well as root defined flags)
 * This could accept feature flags at runtime, but not doing that.
 */
const resolveFeatureFlags = (featureFlags: string[] = []) => {
  const flags = [...featureFlags, ...defaultFeatureFlags];
  setBooleanFeatureFlagResolver((flagKey) => {
    return flags.includes(flagKey);
  });
};

// Initialize feature flags once at module level
resolveFeatureFlags();

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <AppProvider
      defaultColorMode="light"
      defaultTheme={{
        typography: "typography-refreshed",
        shape: "shape",
      }}
    >
      <PageLayoutRoot>
        <TopNavigation
          toggleSidebar={toggleSidebar}
          isCollapsed={isCollapsed}
        />
        <SideNavigation isCollapsed={isCollapsed} />
        <Main>Add content here</Main>
      </PageLayoutRoot>
    </AppProvider>
  );
}
