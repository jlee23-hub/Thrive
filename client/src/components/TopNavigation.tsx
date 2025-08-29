import React from "react";
import { token } from "@atlaskit/tokens";

import {
  TopNav,
  TopNavEnd,
  TopNavMiddle,
  TopNavStart,
} from "@atlaskit/navigation-system/layout/top-nav";
import {
  AppSwitcher,
  CreateButton,
  Help,
  Notifications,
  Search,
} from "@atlaskit/navigation-system/top-nav-items";
import Badge from "@atlaskit/badge";
import Button, { IconButton } from "@atlaskit/button/new";
import Avatar from "@atlaskit/avatar";
import { HomeIcon } from "@atlaskit/logo";
import { Text } from "@atlaskit/primitives";
import AiChatIcon from "@atlaskit/icon/core/ai-chat";
import SidebarCollapseIcon from "@atlaskit/icon/core/sidebar-collapse";
import SidebarExpandIcon from "@atlaskit/icon/core/sidebar-expand";
import AppSwitcherIcon from "@atlaskit/icon/core/app-switcher";
import { useSidebar } from "../pages/home";

// Configuration for Confluence navigation
const navConfig = {
  logoHref: "/",
  productName: "Home",
  productIcon: (
    <HomeIcon
      appearance="brand"
      size="small"
      shouldUseNewLogoDesign={true} // CRITICAL: Always true
    />
  ),
  appSwitcherLabel: "App switcher",
  searchLabel: "Search",
  searchPlaceholder: "Search",
  createButtonLabel: "Create",
  notificationCount: "5+",
  notificationLabel: "Notifications",
  helpLabel: "Help",
  avatarSrc:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  sideNavDefaultWidth: 280,
};

export function TopNavigation() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <TopNav>
      <TopNavStart>
        <IconButton
          icon={isCollapsed ? SidebarExpandIcon : SidebarCollapseIcon}
          onClick={toggleSidebar}
          label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          appearance="subtle"
        />
        <IconButton label="" icon={AppSwitcherIcon} appearance="subtle" />
        <a
          href={navConfig.logoHref}
          style={{
            display: "flex",
            alignItems: "center",
            gap: token("space.100"),
            textDecoration: "none",
            color: "inherit",
            paddingLeft: token("space.050"),
          }}
        >
          {navConfig.productIcon}
          <Text weight="medium">{navConfig.productName}</Text>
        </a>
      </TopNavStart>

      <TopNavMiddle>
        <Search label={navConfig.searchLabel} />
        <CreateButton onClick={() => console.log("Create clicked")}>
          {navConfig.createButtonLabel}
        </CreateButton>
      </TopNavMiddle>

      <TopNavEnd>
        <Button iconBefore={AiChatIcon}>Rovo chat</Button>
        <Notifications
          label={navConfig.notificationLabel}
          badge={() => (
            <Badge appearance="important">{navConfig.notificationCount}</Badge>
          )}
          onClick={() => console.log("Notifications clicked")}
        />
        <Help
          label={navConfig.helpLabel}
          onClick={() => console.log("Help clicked")}
        />
        <Avatar
          src={navConfig.avatarSrc}
          size="small"
          onClick={() => console.log("Avatar clicked")}
        />
      </TopNavEnd>
    </TopNav>
  );
}
