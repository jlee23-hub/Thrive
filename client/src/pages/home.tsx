import React, { useState } from "react";
import AppProvider from "@atlaskit/app-provider";
import { token } from "@atlaskit/tokens";
import { setBooleanFeatureFlagResolver } from "@atlaskit/platform-feature-flags";

import { Root } from "@atlaskit/navigation-system/layout/root";
import { TopNav, TopNavStart, TopNavMiddle, TopNavEnd } from "@atlaskit/navigation-system/layout/top-nav";
import { SideNav, SideNavContent, SideNavToggleButton } from "@atlaskit/navigation-system/layout/side-nav";
import { PanelSplitter } from "@atlaskit/navigation-system/layout/panel-splitter";
import { Main } from "@atlaskit/navigation-system/layout/main";

import {
  AppSwitcher,
  Notifications,
  Help,
  Settings,
  CustomTitle,
  Search,
  CreateButton,
} from "@atlaskit/navigation-system/top-nav-items";

import { LinkMenuItem } from "@atlaskit/navigation-system/side-nav-items/link-menu-item";
import { MenuList } from "@atlaskit/navigation-system/side-nav-items/menu-list";
import { MenuSection } from "@atlaskit/navigation-system/side-nav-items/menu-section";

import Popup from "@atlaskit/popup";
import { ButtonItem, MenuGroup, Section } from "@atlaskit/menu";
import Button, { IconButton } from "@atlaskit/button/new";
import { Text } from "@atlaskit/primitives";
const ColoredRovoIcon = () => (
  <img src="/rovo-icon.png" alt="Rovo" width={16} height={16} style={{ display: "block" }} />
);

import CompensationSummary from "../components/CompensationSummary";
import RSUDetails from "../components/RSUDetails";
import AboutUs from "../components/AboutUs";
import TeamOverview, { employees } from "../components/TeamOverview";
import CyclesDashboard from "../components/CyclesDashboard";
import CycleBuilder from "../components/CycleBuilder";
import CycleDetails from "../components/CycleDetails";
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
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";

const defaultFeatureFlags = [
  "platform_design_system_team_portal_logic_r18_fix",
  "analytics-next-use-modern-context_jira",
  "platform-component-visual-refresh",
  "platform-default-typography-modernized",
  "navx-full-height-sidebar",
  "platform_dst_nav4_full_height_sidebar_api_changes",
];

const resolveFeatureFlags = (featureFlags: string[] = []) => {
  const flags = [...featureFlags, ...defaultFeatureFlags];
  setBooleanFeatureFlagResolver((flagKey) => {
    return flags.includes(flagKey);
  });
};

resolveFeatureFlags();

type Persona = "employee" | "manager" | "comp-admin" | "data-integration";
type NavItem = "compensation" | "rsus" | "about" | "team-overview" | "cycles-dashboard" | "cycle-builder" | "cycle-details" | "merit-matrix" | "groups" | "salary-bands" | "data-management" | "system-settings";

export default function Home() {
  const [persona, setPersona] = useState<Persona>("employee");
  const [activeNav, setActiveNav] = useState<NavItem>("compensation");
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState<{ id: string; name: string; type: string; status: "Active" | "Inactive" | "Finalized"; timeline: string; participants: number; progress: number } | null>(null);
  const [managerStack, setManagerStack] = useState<string[]>([]);
  const [directReportsExpanded, setDirectReportsExpanded] = useState(true);

  const directReports = employees.filter((e) => !e.managerId);
  const subManagers = employees.filter((e) => e.isManager);

  const switchPersona = (newPersona: Persona) => {
    setPersona(newPersona);
    setManagerStack([]);
    if (newPersona === "manager") {
      setActiveNav("team-overview");
    } else if (newPersona === "comp-admin") {
      setActiveNav("cycles-dashboard");
    } else if (newPersona === "data-integration") {
      setActiveNav("data-management");
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
        return (
          <TeamOverview
            managerStack={managerStack}
            onDrillDown={(id) => {
              if (id === "") {
                setManagerStack([]);
              } else {
                setManagerStack((prev) => [...prev, id]);
              }
            }}
            onBreadcrumbNav={(index) => {
              setManagerStack((prev) => prev.slice(0, index));
            }}
          />
        );
      case "cycles-dashboard":
        return (
          <CyclesDashboard
            onCreateCycle={() => setActiveNav("cycle-builder")}
            onSelectCycle={(cycle) => {
              setSelectedCycle(cycle);
              setActiveNav("cycle-details");
            }}
          />
        );
      case "cycle-builder":
        return <CycleBuilder onBack={() => setActiveNav("cycles-dashboard")} />;
      case "cycle-details":
        return selectedCycle ? (
          <CycleDetails
            cycle={selectedCycle}
            onBack={() => setActiveNav("cycles-dashboard")}
          />
        ) : (
          <CyclesDashboard
            onCreateCycle={() => setActiveNav("cycle-builder")}
            onSelectCycle={(cycle) => {
              setSelectedCycle(cycle);
              setActiveNav("cycle-details");
            }}
          />
        );
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
            Permissions
          </LinkMenuItem>
        </MenuList>
      );
    }

    if (persona === "data-integration") {
      return (
        <MenuList>
          <LinkMenuItem
            href="#data-management"
            elemBefore={<DatabaseIcon label="" color="currentColor" />}
            isSelected={activeNav === "data-management"}
            onClick={(e) => { e.preventDefault(); setActiveNav("data-management"); }}
          >
            Data Management
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
            onClick={(e) => { e.preventDefault(); setManagerStack([]); setActiveNav("team-overview"); }}
          >
            Team Overview
          </LinkMenuItem>
          <LinkMenuItem
            href="#compensation"
            elemBefore={<DashboardIcon label="" color="currentColor" />}
            isSelected={activeNav === "compensation"}
            onClick={(e) => { e.preventDefault(); setActiveNav("compensation"); }}
          >
            Total Rewards
          </LinkMenuItem>
          <LinkMenuItem
            href="#about"
            elemBefore={<InformationIcon label="" color="currentColor" />}
            isSelected={activeNav === "about"}
            onClick={(e) => { e.preventDefault(); setActiveNav("about"); }}
          >
            Resources
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
          Total Rewards
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
          Resources
        </LinkMenuItem>
      </MenuList>
    );
  };

  return (
    <AppProvider defaultColorMode="light">
      <Root defaultSideNavCollapsed={false}>
        <TopNav>
          <TopNavStart>
            <SideNavToggleButton
              expandLabel="Expand navigation"
              collapseLabel="Collapse navigation"
            />
            <AppSwitcher label="App Switcher" />
            <CustomTitle>
              <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                <SpreadsheetIcon label="Compensation" color={token("color.icon.brand")} />
                <Text weight="bold">Compensation</Text>
              </div>
            </CustomTitle>
          </TopNavStart>
          <TopNavMiddle>
            <Search label="Search" />
            <CreateButton onClick={() => setActiveNav("cycle-builder")}>Create</CreateButton>
          </TopNavMiddle>
          <TopNavEnd>
            <Button appearance="default" iconBefore={() => <ColoredRovoIcon />}>Ask Rovo</Button>
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
                    <ButtonItem
                      iconBefore={<DatabaseIcon label="" />}
                      onClick={() => switchPersona("data-integration")}
                      isSelected={persona === "data-integration"}
                    >
                      Data Integration
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

        <SideNav label="Compensation Navigation" defaultWidth={280}>
          <SideNavContent>
            <div className="bold-nav-items">
            <MenuSection>
              {renderSideNav()}
            </MenuSection>
            </div>
          </SideNavContent>
          <PanelSplitter label="Resize navigation" />
        </SideNav>

        <Main>
          <div style={{ overflowY: "auto", height: "100%" }}>
            {(persona === "comp-admin" && activeNav !== "cycles-dashboard" && activeNav !== "salary-bands") || persona === "data-integration" ? (
              renderContent()
            ) : (
              <div style={{ padding: token("space.500") }}>
                {renderContent()}
              </div>
            )}
          </div>
        </Main>
      </Root>
    </AppProvider>
  );
}
