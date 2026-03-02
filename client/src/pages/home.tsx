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
import Button, { IconButton } from "@atlaskit/button/new";
const ColoredRovoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rovo-gradient" x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1868DB" />
        <stop offset="50%" stopColor="#0B6E4F" />
        <stop offset="100%" stopColor="#6A9A23" />
      </linearGradient>
    </defs>
    <path fill="url(#rovo-gradient)" fillRule="evenodd" d="M6.687.64a2.63 2.63 0 0 1 2.625 0l4.404 2.544a2.63 2.63 0 0 1 1.313 2.273v5.084c0 .938-.5 1.804-1.313 2.274l-4.404 2.542a2.63 2.63 0 0 1-2.625 0l-4.403-2.542A2.63 2.63 0 0 1 .97 10.54V5.457c0-.938.5-1.804 1.313-2.273zM3.034 4.483a1.13 1.13 0 0 0-.563.975v5.084c0 .402.215.774.563.975l4.403 2.543c.348.2.777.2 1.125 0l.688-.398v-1.997L5.896 9.568a1.38 1.38 0 0 1-.646-1.166V3.203zM8.562 1.94a1.13 1.13 0 0 0-1.125 0l-.687.398v1.996l3.354 2.097c.402.251.646.692.646 1.166v5.199l2.216-1.28c.348-.2.563-.572.563-.974V5.457c0-.402-.215-.774-.563-.975zM6.75 8.333l2.5 1.563V7.663l-2.5-1.561z" clipRule="evenodd"/>
  </svg>
);

import CompensationSummary from "../components/CompensationSummary";
import RSUDetails from "../components/RSUDetails";
import AboutUs from "../components/AboutUs";
import TeamOverview from "../components/TeamOverview";
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
type NavItem = "compensation" | "rsus" | "about" | "team-overview" | "cycles-dashboard" | "cycle-builder" | "cycle-details" | "merit-matrix" | "groups" | "salary-bands" | "data-management" | "system-settings";

export default function Home() {
  const [persona, setPersona] = useState<Persona>("employee");
  const [activeNav, setActiveNav] = useState<NavItem>("compensation");
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState<{ id: string; name: string; type: string; status: "Active" | "Planning" | "Completed"; timeline: string; participants: number; budget: string; progress: number } | null>(null);

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
