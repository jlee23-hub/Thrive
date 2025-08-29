import React from "react";
import {
  SideNav,
  SideNavContent,
  SideNavFooter,
} from "@atlaskit/navigation-system/layout/side-nav";
import {
  FlyoutMenuItem,
  FlyoutMenuItemContent,
  FlyoutMenuItemTrigger,
} from "@atlaskit/navigation-system/side-nav-items/flyout-menu-item";
import { MenuList } from "@atlaskit/navigation-system/side-nav-items/menu-list";
import {
  MenuSection,
  MenuSectionHeading,
} from "@atlaskit/navigation-system/side-nav-items/menu-section";
import {
  ExpandableMenuItem,
  ExpandableMenuItemContent,
  ExpandableMenuItemTrigger,
} from "@atlaskit/navigation-system/side-nav-items/expandable-menu-item";
import { ButtonMenuItem } from "@atlaskit/navigation-system/side-nav-items/button-menu-item";
import { LinkMenuItem } from "@atlaskit/navigation-system/side-nav-items/link-menu-item";
import { TopLevelSpacer } from "@atlaskit/navigation-system/side-nav-items/top-level-spacer";
import Avatar from "@atlaskit/avatar";
import { HubIcon, JiraIcon, ConfluenceIcon, LoomIcon } from "@atlaskit/logo";
import GlobeIcon from "@atlaskit/icon/core/globe";
import ProjectIcon from "@atlaskit/icon/core/project";
import ClockIcon from "@atlaskit/icon/core/clock";
import TeamsIcon from "@atlaskit/icon/core/teams";
import CustomizeIcon from "@atlaskit/icon/core/customize";
import PersonAvatarIcon from "@atlaskit/icon/core/person-avatar";
import StarUnstarredIcon from "@atlaskit/icon/core/star-unstarred";
import LinkExternalIcon from "@atlaskit/icon/core/link-external";
import { useSidebar } from "../pages/home";

export function SideNavigation() {
  const { isCollapsed } = useSidebar();

  return (
    <SideNav id="uid14" defaultCollapsed={isCollapsed}>
      <SideNavContent>
        <MenuList>
          <LinkMenuItem
            isSelected
            href="/"
            elemBefore={<PersonAvatarIcon label="" />}
          >
            For you
          </LinkMenuItem>
          <FlyoutMenuItem>
            <FlyoutMenuItemTrigger elemBefore={<StarUnstarredIcon label="" />}>
              Starred
            </FlyoutMenuItemTrigger>
            <FlyoutMenuItemContent>Insert content here</FlyoutMenuItemContent>
          </FlyoutMenuItem>
          <FlyoutMenuItem>
            <FlyoutMenuItemTrigger elemBefore={<ClockIcon label="" />}>
              Recent
            </FlyoutMenuItemTrigger>
            <FlyoutMenuItemContent>Insert content here</FlyoutMenuItemContent>
          </FlyoutMenuItem>
          <FlyoutMenuItem>
            <FlyoutMenuItemTrigger elemBefore={<GlobeIcon label="" />}>
              Spaces
            </FlyoutMenuItemTrigger>
            <FlyoutMenuItemContent>Insert content here</FlyoutMenuItemContent>
          </FlyoutMenuItem>
          <ExpandableMenuItem>
            <ExpandableMenuItemTrigger
              elemBefore={
                <ProjectIcon label="" color="currentColor" spacing="spacious" />
              }
            >
              Projects
            </ExpandableMenuItemTrigger>
            <ExpandableMenuItemContent>
              <MenuSection isMenuListItem>
                <MenuSectionHeading>Starred</MenuSectionHeading>
                <LinkMenuItem
                  href=""
                  elemBefore={
                    <Avatar label="" size="xsmall" appearance="square" />
                  }
                >
                  Teams
                </LinkMenuItem>
              </MenuSection>
              <MenuSection isMenuListItem>
                <MenuSectionHeading>Recent</MenuSectionHeading>
                <LinkMenuItem
                  href=""
                  elemBefore={
                    <Avatar label="" size="xsmall" appearance="square" />
                  }
                >
                  Teams
                </LinkMenuItem>
              </MenuSection>
            </ExpandableMenuItemContent>
          </ExpandableMenuItem>
          <LinkMenuItem href="" elemBefore={<TeamsIcon label="" />}>
            Teams
          </LinkMenuItem>
          <TopLevelSpacer />
          <LinkMenuItem
            href=""
            elemBefore={
              <HubIcon label="" size="xsmall" shouldUseNewLogoDesign />
            }
            elemAfter={<LinkExternalIcon label="" size="small" />}
          >
            G'Day
          </LinkMenuItem>
          <LinkMenuItem
            href=""
            elemBefore={
              <JiraIcon label="" size="xsmall" shouldUseNewLogoDesign />
            }
            elemAfter={<LinkExternalIcon label="" size="small" />}
          >
            Jira
          </LinkMenuItem>
          <LinkMenuItem
            href=""
            elemBefore={
              <LoomIcon label="" size="xsmall" shouldUseNewLogoDesign />
            }
            elemAfter={<LinkExternalIcon label="" size="small" />}
          >
            Loom
          </LinkMenuItem>
        </MenuList>
        <TopLevelSpacer />
        <ButtonMenuItem elemBefore={<CustomizeIcon label="" />}>
          Customize sidebar
        </ButtonMenuItem>
      </SideNavContent>
      <SideNavFooter>Footer</SideNavFooter>
    </SideNav>
  );
}
