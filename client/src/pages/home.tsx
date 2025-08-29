import React, { createContext, useContext, useState } from "react";
import AppProvider from "@atlaskit/app-provider";

import { Root as PageLayoutRoot } from "@atlaskit/navigation-system/layout/root";
import { Main } from "@atlaskit/navigation-system/layout/main";
import { TopNavigation } from "../components/TopNavigation";
import { SideNavigation } from "../components/SideNavigation";

import Heading from "@atlaskit/heading";
import { Stack, Text } from "@atlaskit/primitives";
import { ThemeWrapper } from "../lib/ThemeWrapper";
import { token } from "@atlaskit/tokens";
import { Code } from "@atlaskit/code";

import { setBooleanFeatureFlagResolver } from "@atlaskit/platform-feature-flags";

// Create a context for sidebar state management
interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

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

const containerWidth = "100%";

/**
 * Update the feature flag resolver to resolve new feature flags (as well as root defined flags)
 * This could accept feature flags at runtime, but not doing that.
 */
export const resolveFeatureFlags = (featureFlags: string[] = []) => {
  const flags = [...featureFlags, ...defaultFeatureFlags];
  setBooleanFeatureFlagResolver((flagKey) => {
    return flags.includes(flagKey);
  });
};

resolveFeatureFlags();

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarContextValue: SidebarContextType = {
    isCollapsed,
    toggleSidebar,
  };

  return (
    <AppProvider
      defaultTheme={{
        typography: "typography-refreshed",
        shape: "shape",
      }}
    >
      <ThemeWrapper>
        <SidebarContext.Provider value={sidebarContextValue}>
          <PageLayoutRoot>
            <TopNavigation />
            <SideNavigation />
            <Main>
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  paddingInline: token("space.100"),
                  paddingBlock: token("space.050"),
                  borderBottom: `1px solid ${token("color.border")}`,
                  marginBottom: token("space.200"),
                }}
              >
                Sticky header
              </div>
              <div
                className="mx-auto"
                style={{
                  width: containerWidth,
                  paddingLeft: token("space.500"),
                  paddingRight: token("space.500"),
                }}
              >
                <Stack space="space.400">
                  <Stack space="space.200">
                    <Heading size="xxlarge">
                      Atlassian Core Template (Fast)
                    </Heading>
                    <Text>
                      Welcome! This template is built for speed and flexibility
                      whilst reducing the amount of errors. Its intended for
                      simple ideas where the amount of ADS isn't as important.
                      Follow the instructions below to configure the template to
                      your specification.
                    </Text>
                  </Stack>
                  <Stack space="space.200">
                    <Heading size="xxlarge">Using this template</Heading>
                    <Stack space="space.200">
                      <Heading size="small">
                        1. Update the top left logo
                      </Heading>
                      <Text>
                        You can change the logo through a simple config update,
                        replace APPNAME with your chosen app and APPICON with a
                        logo from here, some examples
                      </Text>
                      <Stack space="space.100">
                        <Text>
                          <Code>
                            Change navConfig product name to APPNAME and use
                            APPICON instead of HomeIcon
                          </Code>
                        </Text>
                        <Text>
                          <Code>
                            Change navConfig product name to "Jira" and use
                            JiraIcon instead of HomeIcon
                          </Code>
                        </Text>
                        <Text>
                          <Code>
                            Change navConfig product name to "Confluence" and
                            use ConfluenceIcon instead of HomeIcon
                          </Code>
                        </Text>
                        <Text>
                          <Code>
                            Change navConfig product name to "Bitbucket" and use
                            BitbucketIcon instead of HomeIcon
                          </Code>
                        </Text>
                      </Stack>
                    </Stack>
                    <Stack space="space.200">
                      <Heading size="small">
                        2. Delete what you don't need
                      </Heading>
                      <Text>
                        We've included some common UI to save you precious
                        prompts. Use the point and edit tool (at the bottom of
                        the prompt box) or describe which elements to delete
                      </Text>
                    </Stack>
                    <Stack space="space.200">
                      <Heading size="small">
                        3. Use a prompt recipe to add interaction
                      </Heading>
                      <Text>
                        Use our prompt{" "}
                        <a
                          href="https://hello.atlassian.net/wiki/spaces/MarketsAndTransformations/pages/5620706059/Prompt+recipes+for+vibe+coding+tools"
                          target="_blank"
                          style={{
                            color: token("color.link"),
                            textDecoration: "underline",
                          }}
                        >
                          recipes page
                        </a>{" "}
                        to copy and paste key interations into your prototype
                        like Rovo Chat, Create Button and Search.
                      </Text>
                    </Stack>
                    <Stack space="space.200">
                      <Heading size="small">4. Replace main content</Heading>
                      <Text>
                        We've included some common UI to save you precious
                        prompts. Click the button below to get started:
                      </Text>
                      <div style={{ marginTop: token("space.200") }}>
                        <Button
                          variant="default"
                          size="default"
                          onClick={() =>
                            alert(
                              "Button clicked! Ready to customize your app.",
                            )
                          }
                        >
                          Get Started
                        </Button>
                      </div>
                    </Stack>
                  </Stack>
                </Stack>
              </div>
            </Main>
          </PageLayoutRoot>
        </SidebarContext.Provider>
      </ThemeWrapper>
    </AppProvider>
  );
}
