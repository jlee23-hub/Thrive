import React, { useState } from "react";
import AppProvider from "@atlaskit/app-provider";
import { token } from "@atlaskit/tokens";
import { setBooleanFeatureFlagResolver } from "@atlaskit/platform-feature-flags";

import { Root } from "@atlaskit/navigation-system/layout/root";
import { TopNav, TopNavStart, TopNavMiddle, TopNavEnd } from "@atlaskit/navigation-system/layout/top-nav";
import { SideNav, SideNavContent } from "@atlaskit/navigation-system/layout/side-nav";
import { Main } from "@atlaskit/navigation-system/layout/main";

import {
  AppSwitcher,
  Search,
  CreateButton,
  ChatButton,
  Notifications,
  Help,
  Settings,
  Profile,
  AppLogo,
  CustomTitle,
} from "@atlaskit/navigation-system/top-nav-items";

import { LinkMenuItem } from "@atlaskit/navigation-system/side-nav-items/link-menu-item";
import { MenuList } from "@atlaskit/navigation-system/side-nav-items/menu-list";
import { MenuSection } from "@atlaskit/navigation-system/side-nav-items/menu-section";

import CompensationSummary from "../components/CompensationSummary";
import RSUDetails from "../components/RSUDetails";
import AboutUs from "../components/AboutUs";

import DashboardIcon from "@atlaskit/icon/core/dashboard";
import ChartTrendIcon from "@atlaskit/icon/core/chart-trend";
import InformationIcon from "@atlaskit/icon/core/information";
import HomeIcon from "@atlaskit/icon/core/home";

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

function CompViewIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="4" fill="url(#compview-gradient)" />
      <text x="14" y="19" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="sans-serif">C</text>
      <defs>
        <linearGradient id="compview-gradient" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1868DB" />
          <stop offset="1" stopColor="#36B37E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

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
    <AppProvider defaultColorMode="light">
      <Root>
        <TopNav>
          <TopNavStart>
            <AppSwitcher label="App Switcher" />
            <HomeIcon label="Home" />
            <CustomTitle>CompView</CustomTitle>
          </TopNavStart>
          <TopNavMiddle>
            <Search label="Search" />
            <CreateButton>Create</CreateButton>
          </TopNavMiddle>
          <TopNavEnd>
            <ChatButton>Chat</ChatButton>
            <Notifications label="Notifications" badge={() => null} />
            <Help label="Help" />
            <Settings label="Settings" />
            <Profile label="Your profile" />
          </TopNavEnd>
        </TopNav>

        <SideNav label="CompView Navigation">
          <SideNavContent>
            <MenuSection>
              <MenuList>
                <LinkMenuItem
                  href="#compensation"
                  elemBefore={<DashboardIcon label="" color="currentColor" />}
                  isSelected={activeNav === "compensation"}
                  onClick={(e) => { e.preventDefault(); setActiveNav("compensation"); }}
                >
                  Total Compensation Summary
                </LinkMenuItem>
                <LinkMenuItem
                  href="#rsus"
                  elemBefore={<ChartTrendIcon label="" color="currentColor" />}
                  isSelected={activeNav === "rsus"}
                  onClick={(e) => { e.preventDefault(); setActiveNav("rsus"); }}
                >
                  RSUs
                </LinkMenuItem>
                <LinkMenuItem
                  href="#about"
                  elemBefore={<InformationIcon label="" color="currentColor" />}
                  isSelected={activeNav === "about"}
                  onClick={(e) => { e.preventDefault(); setActiveNav("about"); }}
                >
                  About Us
                </LinkMenuItem>
              </MenuList>
            </MenuSection>
          </SideNavContent>
        </SideNav>

        <Main>
          <div style={{ padding: token("space.500"), maxWidth: 960 }}>
            {renderContent()}
          </div>
        </Main>
      </Root>
    </AppProvider>
  );
}
