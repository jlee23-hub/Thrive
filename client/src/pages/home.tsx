import React, { useState, useCallback, useEffect, useRef } from "react";
import AppProvider from "@atlaskit/app-provider";
import { token } from "@atlaskit/tokens";
import { setBooleanFeatureFlagResolver } from "@atlaskit/platform-feature-flags";

import { Root } from "@atlaskit/navigation-system/layout/root";
import { TopNav, TopNavStart, TopNavMiddle, TopNavEnd } from "@atlaskit/navigation-system/layout/top-nav";
import { SideNav, SideNavContent } from "@atlaskit/navigation-system/layout/side-nav";
import { Main } from "@atlaskit/navigation-system/layout/main";

import {
  AppSwitcher,
  CreateButton,
  ChatButton,
  Notifications,
  Help,
  Settings,
  Profile,
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
import SearchIcon from "@atlaskit/icon/core/search";
import { Text } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";

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

function ContentSearchBar({
  onFocus,
  inputRef,
  query,
  onQueryChange,
  isFocused,
  onBlur,
}: {
  onFocus: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  query: string;
  onQueryChange: (val: string) => void;
  isFocused: boolean;
  onBlur: () => void;
}) {
  return (
    <div
      style={{
        width: "100%",
        padding: `${token("space.200")} 0`,
      }}
    >
      <div
        style={{
          position: "relative",
          height: 48,
          width: "100%",
          border: isFocused
            ? `2px solid ${token("color.border.focused")}`
            : `1px solid ${token("color.border.input")}`,
          borderRadius: token("border.radius.100"),
          backgroundColor: token("color.background.input"),
          display: "flex",
          alignItems: "center",
          transition: "border-color 0.15s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            flexShrink: 0,
          }}
        >
          <SearchIcon label="" color={token("color.icon.subtle")} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Search CompView"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            font: token("font.body"),
            color: token("color.text"),
            padding: 0,
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState<NavItem>("compensation");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
          <div style={{ maxWidth: 960, padding: `0 ${token("space.500")}` }}>
            <ContentSearchBar
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              inputRef={searchInputRef}
              query={searchQuery}
              onQueryChange={setSearchQuery}
              isFocused={searchFocused}
            />
            <div style={{ paddingBottom: token("space.500") }}>
              {renderContent()}
            </div>
          </div>
        </Main>
      </Root>
    </AppProvider>
  );
}
