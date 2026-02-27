import React, { useState } from "react";
import AppProvider from "@atlaskit/app-provider";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import { setBooleanFeatureFlagResolver } from "@atlaskit/platform-feature-flags";

import CompensationSummary from "../components/CompensationSummary";
import RSUDetails from "../components/RSUDetails";
import AboutUs from "../components/AboutUs";

import DashboardIcon from "@atlaskit/icon/core/dashboard";
import ChartTrendIcon from "@atlaskit/icon/core/chart-trend";
import InformationIcon from "@atlaskit/icon/core/information";

const defaultFeatureFlags = [
  "platform_design_system_team_portal_logic_r18_fix",
  "analytics-next-use-modern-context_jira",
  "platform-component-visual-refresh",
  "platform-default-typography-modernized",
];

const resolveFeatureFlags = (featureFlags: string[] = []) => {
  const flags = [...featureFlags, ...defaultFeatureFlags];
  setBooleanFeatureFlagResolver((flagKey) => {
    return flags.includes(flagKey);
  });
};

resolveFeatureFlags();

type NavItem = "compensation" | "rsus" | "about";

interface NavItemConfig {
  id: NavItem;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItemConfig[] = [
  {
    id: "compensation",
    label: "Total Compensation Summary",
    icon: <DashboardIcon label="compensation" />,
  },
  {
    id: "rsus",
    label: "RSUs",
    icon: <ChartTrendIcon label="rsus" />,
  },
  {
    id: "about",
    label: "About Us",
    icon: <InformationIcon label="about" />,
  },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState<NavItem>("compensation");

  const renderContent = () => {
    switch (activeNav) {
      case "compensation":
        return <CompensationSummary />;
      case "rsus":
        return <RSUDetails />;
      case "about":
        return <AboutUs />;
      default:
        return <CompensationSummary />;
    }
  };

  return (
    <AppProvider
      defaultColorMode="light"
      
    >
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: token("elevation.surface.sunken"),
        }}
      >
        <nav
          style={{
            width: 260,
            minHeight: "100vh",
            backgroundColor: token("elevation.surface"),
            borderRight: `1px solid ${token("color.border")}`,
            padding: `${token("space.300")} 0`,
            flexShrink: 0,
          }}
        >
          <div style={{ padding: `0 ${token("space.300")}`, marginBottom: token("space.400") }}>
            <div style={{ display: "flex", alignItems: "center", gap: token("space.150") }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: token("border.radius.100"),
                  background: "linear-gradient(135deg, #1868DB, #36B37E)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text size="medium" weight="bold" color="color.text.inverse">C</Text>
              </div>
              <Heading size="xsmall">CompView</Heading>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: token("space.050") }}>
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: token("space.150"),
                    padding: `${token("space.100")} ${token("space.300")}`,
                    cursor: "pointer",
                    backgroundColor: isActive
                      ? token("color.background.selected")
                      : "transparent",
                    borderLeft: isActive
                      ? `3px solid ${token("color.border.selected")}`
                      : "3px solid transparent",
                    transition: "background-color 0.15s ease, border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = token("color.background.neutral.subtle.hovered");
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <span style={{ color: isActive ? token("color.icon.selected") : token("color.icon") }}>
                    {item.icon}
                  </span>
                  <Text
                    size="medium"
                    weight={isActive ? "bold" : "regular"}
                    color={isActive ? "color.text.selected" : "color.text"}
                  >
                    {item.label}
                  </Text>
                </div>
              );
            })}
          </div>
        </nav>

        <main
          style={{
            flex: 1,
            padding: token("space.500"),
            maxWidth: 960,
            overflowY: "auto",
          }}
        >
          {renderContent()}
        </main>
      </div>
    </AppProvider>
  );
}
