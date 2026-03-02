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
  ChatButton,
  Notifications,
  Help,
  Settings,
  CustomTitle,
} from "@atlaskit/navigation-system/top-nav-items";

import { LinkMenuItem } from "@atlaskit/navigation-system/side-nav-items/link-menu-item";
import { MenuList } from "@atlaskit/navigation-system/side-nav-items/menu-list";
import { MenuSection } from "@atlaskit/navigation-system/side-nav-items/menu-section";

import Popup from "@atlaskit/popup";
import { ButtonItem, MenuGroup, Section } from "@atlaskit/menu";
import { IconButton } from "@atlaskit/button/new";

import CompensationSummary from "../components/CompensationSummary";
import RSUDetails from "../components/RSUDetails";
import AboutUs from "../components/AboutUs";
import TeamOverview from "../components/TeamOverview";
import CyclesDashboard from "../components/CyclesDashboard";
import CycleBuilder from "../components/CycleBuilder";
import MeritMatrix from "../components/MeritMatrix";
import GroupsManagement from "../components/GroupsManagement";
import SalaryBands from "../components/SalaryBands";
import DataManagement from "../components/DataManagement";
import SystemSettings from "../components/SystemSettings";

import DashboardIcon from "@atlaskit/icon/core/dashboard";
import ChartTrendIcon from "@atlaskit/icon/core/chart-trend";
import InformationIcon from "@atlaskit/icon/core/information";
import SpreadsheetIcon from "@atlaskit/icon/core/spreadsheet";
import PeopleGroupIcon from "@atlaskit/icon/core/people-group";
import PersonIcon from "@atlaskit/icon/core/person";
import ShieldIcon from "@atlaskit/icon/core/shield";
import ListBulletedIcon from "@atlaskit/icon/core/list-bulleted";
import ChartMatrixIcon from "@atlaskit/icon/core/chart-matrix";
import CashIcon from "@atlaskit/icon/core/cash";
import DatabaseIcon from "@atlaskit/icon/core/database";
import SettingsIcon from "@atlaskit/icon/core/settings";

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

type Persona = "employee" | "manager" | "comp-admin";
type NavItem = "compensation" | "rsus" | "about" | "team-overview" | "cycles-dashboard" | "cycle-builder" | "merit-matrix" | "groups" | "salary-bands" | "data-management" | "system-settings";

export default function Home() {
  const [persona, setPersona] = useState<Persona>("employee");
  const [activeNav, setActiveNav] = useState<NavItem>("compensation");
  const [profileOpen, setProfileOpen] = useState(false);

  const switchPersona = (newPersona: Persona) => {
    setPersona(newPersona);
    if (newPersona === "manager") {
      setActiveNav("team-overview");
    } else if (newPersona === "comp-admin") {
      setActiveNav("cycles-dashboard");
    } else {
      setActiveNav("compensation");
    }
    setProfileOpen(false);
  };

  const renderContent = () => {
    switch (activeNav) {
      case "compensation":
        return <CompensationSummary />;
      case "rsus":
        return <RSUDetails />;
      case "about":
        return <AboutUs />;
      case "team-overview":
        return <TeamOverview />;
      case "cycles-dashboard":
        return <CyclesDashboard onCreateCycle={() => setActiveNav("cycle-builder")} />;
      case "cycle-builder":
        return <CycleBuilder onBack={() => setActiveNav("cycles-dashboard")} />;
      case "merit-matrix":
        return <MeritMatrix />;
      case "groups":
        return <GroupsManagement />;
      case "salary-bands":
        return <SalaryBands />;
      case "data-management":
        return <DataManagement />;
      case "system-settings":
        return <SystemSettings />;
      default:
        return <CompensationSummary />;
    }
  };

  const renderSideNav = () => {
    if (persona === "comp-admin") {
      return (
        <MenuList>
          <LinkMenuItem
            href="#cycles-dashboard"
            elemBefore={<DashboardIcon label="" color="currentColor" />}
            isSelected={activeNav === "cycles-dashboard"}
            onClick={(e) => { e.preventDefault(); setActiveNav("cycles-dashboard"); }}
          >
            Dashboard
          </LinkMenuItem>
          <LinkMenuItem
            href="#merit-matrix"
            elemBefore={<ChartMatrixIcon label="" color="currentColor" />}
            isSelected={activeNav === "merit-matrix"}
            onClick={(e) => { e.preventDefault(); setActiveNav("merit-matrix"); }}
          >
            Merit Matrix
          </LinkMenuItem>
          <LinkMenuItem
            href="#groups"
            elemBefore={<ShieldIcon label="" color="currentColor" />}
            isSelected={activeNav === "groups"}
            onClick={(e) => { e.preventDefault(); setActiveNav("groups"); }}
          >
            Groups
          </LinkMenuItem>
          <LinkMenuItem
            href="#salary-bands"
            elemBefore={<CashIcon label="" color="currentColor" />}
            isSelected={activeNav === "salary-bands"}
            onClick={(e) => { e.preventDefault(); setActiveNav("salary-bands"); }}
          >
            Salary Bands
          </LinkMenuItem>
          <LinkMenuItem
            href="#data-management"
            elemBefore={<DatabaseIcon label="" color="currentColor" />}
            isSelected={activeNav === "data-management"}
            onClick={(e) => { e.preventDefault(); setActiveNav("data-management"); }}
          >
            Data Management
          </LinkMenuItem>
          <LinkMenuItem
            href="#system-settings"
            elemBefore={<SettingsIcon label="" color="currentColor" />}
            isSelected={activeNav === "system-settings"}
            onClick={(e) => { e.preventDefault(); setActiveNav("system-settings"); }}
          >
            Settings
          </LinkMenuItem>
        </MenuList>
      );
    }

    if (persona === "manager") {
      return (
        <MenuList>
          <LinkMenuItem
            href="#team-overview"
            elemBefore={<PeopleGroupIcon label="" color="currentColor" />}
            isSelected={activeNav === "team-overview"}
            onClick={(e) => { e.preventDefault(); setActiveNav("team-overview"); }}
          >
            Team Overview
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
      );
    }

    return (
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
    );
  };

  return (
    <AppProvider defaultColorMode="light">
      <Root>
        <TopNav>
          <TopNavStart>
            <AppSwitcher label="App Switcher" />
            <SpreadsheetIcon label="Thrive" color={token("color.icon.brand")} />
            <CustomTitle><span style={{ color: token("color.text"), fontWeight: 800 }}>Thrive</span></CustomTitle>
          </TopNavStart>
          <TopNavMiddle />
          <TopNavEnd>
            <ChatButton>Chat</ChatButton>
            <Notifications label="Notifications" badge={() => null} />
            <Help label="Help" />
            <Settings label="Settings" />
            <Popup
              isOpen={profileOpen}
              onClose={() => setProfileOpen(false)}
              placement="bottom-end"
              content={() => (
                <MenuGroup>
                  <Section title="Switch View">
                    <ButtonItem
                      iconBefore={<PersonIcon label="" />}
                      onClick={() => switchPersona("employee")}
                      isSelected={persona === "employee"}
                    >
                      Employee View
                    </ButtonItem>
                    <ButtonItem
                      iconBefore={<PeopleGroupIcon label="" />}
                      onClick={() => switchPersona("manager")}
                      isSelected={persona === "manager"}
                    >
                      Manager View
                    </ButtonItem>
                    <ButtonItem
                      iconBefore={<ShieldIcon label="" />}
                      onClick={() => switchPersona("comp-admin")}
                      isSelected={persona === "comp-admin"}
                    >
                      Comp Admin
                    </ButtonItem>
                  </Section>
                </MenuGroup>
              )}
              trigger={(triggerProps) => (
                <IconButton
                  {...triggerProps}
                  icon={PersonIcon}
                  label="Your profile"
                  appearance="subtle"
                  isSelected={profileOpen}
                  onClick={() => setProfileOpen(!profileOpen)}
                />
              )}
            />
          </TopNavEnd>
        </TopNav>

        <SideNav label="Thrive Navigation">
          <SideNavContent>
            <div className="bold-nav-items">
            <MenuSection>
              {renderSideNav()}
            </MenuSection>
            </div>
          </SideNavContent>
        </SideNav>

        <Main>
          {persona === "comp-admin" && activeNav !== "cycles-dashboard" && activeNav !== "salary-bands" ? (
            renderContent()
          ) : (
            <div style={{ padding: token("space.500") }}>
              {renderContent()}
            </div>
          )}
        </Main>
      </Root>
    </AppProvider>
  );
}
