# Atlassian Design System Template Instructions

## Overview
You have been hired by Atlassian, a collaboration software company that develops products for software developers, project managers, and content management. Your job is to build internal applications for Atlassian using their design system.

## Phase 1: Understanding the Design System

### Key Resources:
1. **TypeScript IntelliSense** - Your primary discovery tool
   - All Atlaskit packages have excellent TypeScript definitions
   - Start typing component names or props to see available options
   - Hover over components to see documentation

2. **Official Documentation** - https://atlassian.design/
   - Use for understanding design principles
   - Reference for complex patterns
   - Accessibility guidelines

3. **Package Structure**
   - Components are in individual packages: `@atlaskit/[component-name]`
   - Icons are in: `@atlaskit/icon/glyph/[icon-name]`
   - Tokens are in: `@atlaskit/tokens`
   - Primitives are in: `@atlaskit/primitives`

### Key Design Principles:
- **Bold**: Make confident design decisions that drive clarity
- **Optimistic**: Create positive, encouraging experiences
- **Practical**: Build functional, efficient interfaces that get work done

## Phase 2: Building with Atlaskit

### Import Patterns:
```typescript
// Components - use default imports
import Button from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';

// Primitives - use named imports
import { Stack, Box, Inline } from '@atlaskit/primitives';

// Icons - import from glyph folder
import AddIcon from '@atlaskit/icon/glyph/add';
import EditIcon from '@atlaskit/icon/glyph/edit';

// Tokens - use token function
import { token } from '@atlaskit/tokens';
```

### Critical Styling Rules:

1. **xcss limitations** (MOST IMPORTANT):
   - ONLY use for spacing with string values: `'space.200'`
   - CANNOT use for colors, typography, borders, etc.
   - CANNOT use token() function inside xcss

2. **Typography & Colors**:
   - Use inline styles with token() function
   - Never hardcode values

3. **No External CSS-in-JS**:
   - Don't use Emotion, styled-components, etc.
   - Use inline styles or @atlaskit/css if needed

### Correct Styling Pattern:
```typescript
// ✅ CORRECT
<Box xcss={{ padding: 'space.200' }}> {/* Only spacing */}
  <h1 style={{ 
    fontSize: token('font.size.400'),    // ✅ Inline style
    fontWeight: token('font.weight.bold'),
    color: token('color.text'),
    margin: 0 
  }}>
    Heading
  </h1>
</Box>

// ❌ INCORRECT
<Box xcss={{ 
  fontSize: token('font.size.400'),  // ❌ Won't work
  color: 'color.text'               // ❌ Won't work
}}>
```

## Phase 3: Common Patterns

### Layout Structure:
```typescript
<Box xcss={{ padding: 'space.400' }}>
  <Stack space="space.300">
    <Inline spread="space-between">
      {/* Header content */}
    </Inline>
    <Grid templateColumns="1fr 1fr" gap="space.200">
      {/* Grid content */}
    </Grid>
  </Stack>
</Box>
```

### Forms:
```typescript
import Form, { Field, ErrorMessage } from '@atlaskit/form';

<Form onSubmit={handleSubmit}>
  {({ formProps }) => (
    <form {...formProps}>
      <Field name="email" label="Email" isRequired>
        {({ fieldProps, error }) => (
          <>
            <Textfield {...fieldProps} />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </>
        )}
      </Field>
    </form>
  )}
</Form>
```

### Data Display:
- Use `DynamicTable` for tables
- Use `Avatar` with `name` prop for user images
- Use `Lozenge` for status indicators
- Use `Badge` for counts

### Icons:
```typescript
// Always include label for accessibility
<AddIcon label="Add item" />
<EditIcon label="Edit" size="medium" primaryColor={token('color.icon.brand')} />
```

## Phase 4: Discovery Process

### When building a feature:

1. **Start with layout**:
   - Use Stack for vertical spacing
   - Use Inline for horizontal alignment
   - Use Grid for complex layouts
   - Use Box only for padding/margin

2. **Find components via TypeScript**:
   ```typescript
   // Start typing and see suggestions
   import  from '@atlaskit/' // IntelliSense will show all packages
   ```

3. **Check component props**:
   ```typescript
   <Button 
     // Type here and IntelliSense shows all available props
     appearance="" // Will show: "primary" | "subtle" | "link" etc.
   />
   ```

4. **Apply styling correctly**:
   - xcss: spacing only (`'space.200'`)
   - inline styles: everything else with token()

### Common Component Locations:
- **Forms**: @atlaskit/form, textfield, select, checkbox, radio
- **Feedback**: @atlaskit/banner, flag, modal-dialog, tooltip
- **Navigation**: @atlaskit/tabs, breadcrumbs, side-navigation
- **Data**: @atlaskit/dynamic-table, avatar, badge, lozenge
- **Actions**: @atlaskit/button, dropdown-menu

### Token Quick Reference:
```typescript
// Spacing (for xcss)
'space.100' // 8px
'space.200' // 16px
'space.300' // 24px

// Everything else (for inline styles)
token('color.text')
token('color.background.neutral')
token('font.size.400')
token('border.radius.200')
token('elevation.shadow.raised')
```

## Best Practices:
1. Let TypeScript guide you - it has all the answers
2. Use semantic components over generic ones
3. Always include accessibility props (labels, ARIA)
4. Start simple with inline styles
5. Use design tokens for every value
6. Check component props with IntelliSense
7. Keep styling patterns consistent

Remember: You don't need to memorize everything. TypeScript IntelliSense will show you available components, props, and values as you type!


# Navigation System Setup Guide

## Overview

This guide provides step-by-step instructions for setting up the Atlassian Design System navigation system layout and top navigation, focusing on replacing existing navigation while preserving configured values and loading appropriate product logos.

## 🚨 CRITICAL: Never Use @atlaskit/atlassian-navigation

**⚠️ WARNING: NEVER use @atlaskit/atlassian-navigation package**

**❌ WRONG - Never import or use atlaskit/atlassian-navigation:**
```tsx
// 🚨 NEVER DO THIS - This package should never be used
import { AtlassianNavigation } from '@atlaskit/atlassian-navigation';
import { PrimaryButton } from '@atlaskit/atlassian-navigation';
import { ProductHome } from '@atlaskit/atlassian-navigation';
```

**✅ CORRECT - Always use @atlaskit/navigation-system:**
```tsx
// ✅ ALWAYS DO THIS - Use navigation-system package
import { Root } from '@atlaskit/navigation-system/layout/root';
import { TopNav } from '@atlaskit/navigation-system/layout/top-nav';
import { SideNav } from '@atlaskit/navigation-system/layout/side-nav';
import { Main } from '@atlaskit/navigation-system/layout/main';
```

**🚨 CRITICAL RULES:**
- **NEVER** install `@atlaskit/atlassian-navigation` package
- **NEVER** import any components from `@atlaskit/atlassian-navigation`
- **NEVER** use `AtlassianNavigation`, `PrimaryButton`, `ProductHome`, or any other components from this package
- **ALWAYS** use `@atlaskit/navigation-system` package instead
- **ALWAYS** import from specific paths like `@atlaskit/navigation-system/layout/root`
- **ALWAYS** use the modern navigation system components and patterns

**Why @atlaskit/atlassian-navigation is Forbidden:**
- It's deprecated and no longer supported
- It causes compatibility issues with modern Atlassian Design System
- It doesn't integrate properly with current design tokens
- It lacks modern accessibility features
- It has performance issues
- It doesn't support the latest design patterns

**✅ REQUIRED: Use Only @atlaskit/navigation-system**
- Modern, supported navigation system
- Proper design token integration
- Built-in accessibility features
- Performance optimized
- Consistent with current design patterns
- Full TypeScript support

## AI Implementation Guidelines

### 🚨 CRITICAL: Always Use Inline Styles with Token Function

**⚠️ WARNING: Never use special CSS bundle imports**

**ALWAYS use inline styles with token function for all component styling:**

```tsx
import { token } from "@atlaskit/tokens";

// ✅ CORRECT: Use inline styles with token function
<div style={{
  display: "flex",
  alignItems: "center",
  gap: token("space.100"),
  // ... other styles
}}>Content</div>

// ❌ WRONG: Never use special CSS bundle imports
```
**NEVER use these patterns:**
- `import "@atlaskit/component?css&bundle-deps"`
- Special CSS bundle imports

### Navigation Instance Management

- **Create only ONE top navigation and ONE side navigation** per application
- Replace existing navigation completely rather than adding additional instances
- Ensure proper cleanup of old navigation components before implementing new ones

### 🚨 CRITICAL: TopNavStart Component Order

**⚠️ WARNING: TopNavStart components must be in exact order**

**✅ CORRECT - Always use this exact order:**
```tsx
<TopNavStart>
  <SideNavToggleButton />
  <AppSwitcher />
  <CustomLogo />
</TopNavStart>
```

**❌ WRONG - Never change the order:**
```tsx
<TopNavStart>
  <CustomLogo /> {/* ❌ WRONG: Wrong position */}
  <SideNavToggleButton />
  <AppSwitcher />
</TopNavStart>
```

### Create Button Placement

- **Always place the CreateButton in TopNavMiddle next to the Search component**
- Never place the CreateButton in TopNavStart or TopNavEnd
- The correct order in TopNavMiddle is: Search → CreateButton

### 🚨 CRITICAL: CreateButton Import and Usage

**⚠️ WARNING: CreateButton must be imported from navigation system, not from @atlaskit/button**

**❌ WRONG - Never import from @atlaskit/button:**
```tsx
import { CreateButton } from '@atlaskit/button'; // ❌ WRONG: Never import from button
```

**✅ CORRECT - Always import from navigation system:**
```tsx
import { CreateButton } from '@atlaskit/navigation-system/top-nav-items'; // ✅ CORRECT: Import from navigation system
```

**❌ WRONG - Never use onClick prop:**
```tsx
<CreateButton onClick={handleCreate}>Create</CreateButton> // ❌ WRONG: No onClick prop
```

**✅ CORRECT - Use exact API:**
```tsx
<CreateButton>Create</CreateButton> // ✅ CORRECT: Exact API usage
```

### 🚨 CRITICAL: Never Use @atlaskit/menu Components in Navigation

**⚠️ WARNING: Using @atlaskit/menu components in navigation will cause errors and broken functionality.**

**NEVER use these components in side navigation:**
- `@atlaskit/menu` → `MenuGroup`, `Section`, `ButtonItem`, `LinkItem`, `HeadingItem`
- `@atlaskit/dropdown-menu` → `DropdownMenu`, `DropdownItem`, `DropdownItemGroup`
- Any generic menu components

**ALWAYS use Navigation System components instead:**
- `@atlaskit/navigation-system/side-nav-items/menu-list` → `MenuList`
- `@atlaskit/navigation-system/side-nav-items/link-menu-item` → `LinkMenuItem`
- `@atlaskit/navigation-system/side-nav-items/button-menu-item` → `ButtonMenuItem`
- `@atlaskit/navigation-system/side-nav-items/flyout-menu-item` → `FlyoutMenuItem`

### 🚨 CRITICAL: Always Use shouldUseNewLogoDesign on Product Logos

**⚠️ WARNING: All product logos MUST use shouldUseNewLogoDesign={true}**

**ALWAYS set this on ALL product logos:**
```tsx
<ProductIcon
  appearance="brand"
  size="small"
  shouldUseNewLogoDesign={true} // 🚨 REQUIRED: Always true
/>
```

### 🚨 CRITICAL: Icons Must Use elemBefore, Never Inside Children

**⚠️ WARNING: Icons should ALWAYS be placed in elemBefore prop, NEVER inside children**

**❌ WRONG - Never put icons inside children:**
```tsx
<LinkMenuItem href="/dashboard">
  <ClockIcon label="" /> Dashboard
</LinkMenuItem>
<ButtonMenuItem onClick={handleClick}>
  <SettingsIcon label="" /> Settings
</ButtonMenuItem>
```

**✅ CORRECT - Always use elemBefore prop:**
```tsx
<LinkMenuItem 
  href="/dashboard" 
  elemBefore={<ClockIcon label="" />}
>
  Dashboard
</LinkMenuItem>
<ButtonMenuItem 
  onClick={handleClick}
  elemBefore={<SettingsIcon label="" />}
>
  Settings
</ButtonMenuItem>
```

### 🚨 CRITICAL: Never Use NavLogo, Always Use CustomLogo

**⚠️ WARNING: Never use NavLogo component, always use CustomLogo pattern**

### 🚨 CRITICAL: Banner Import Does Not Exist

**⚠️ WARNING: Banner import from @atlaskit/navigation-system/layout/banner does NOT exist**

**❌ WRONG - This import does not exist:**
```tsx
import { Banner } from '@atlaskit/navigation-system/layout/banner'; // ❌ WRONG: This import doesn't exist
```

**✅ CORRECT - Banner should be placed alongside Root, not inside TopNav:**
```tsx
import { Root } from '@atlaskit/navigation-system/layout/root';
import { Banner } from '@atlaskit/navigation-system/layout/banner';

// ✅ CORRECT: Banner alongside Root
<Root>
  <Banner />
  <TopNav>
    {/* TopNav content */}
  </TopNav>
  <SideNav>
    {/* SideNav content */}
  </SideNav>
  <Main>
    {/* Main content */}
  </Main>
</Root>
```

**❌ WRONG - Never use NavLogo:**
```tsx
import { NavLogo } from '@atlaskit/navigation-system/top-nav-items';

<NavLogo
  href="/"
  iconBefore={<JiraIcon />}
  productName="Jira"
/>
```

**✅ CORRECT - Always use CustomLogo pattern:**
```tsx
import { JiraIcon } from '@atlaskit/logo';
import { token } from '@atlaskit/tokens';


const CustomLogo = ({ productName, productIcon: ProductIcon, href }) => {
  return (
    <a
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: token("space.100"),
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <ProductIcon
        appearance="brand"
        size="small"
        shouldUseNewLogoDesign={true}
      />
      <div style={{
        fontWeight: token("font.weight.semibold"),
        color: token("color.text"),
      }}>
        {productName}
      </div>
    </a>
  );
};

<CustomLogo
  href="/"
  productName="Jira"
  productIcon={JiraIcon}
/>
```

### Product Logo Selection Logic

When implementing navigation, follow this priority order for logo selection:

1. **Explicit Product Instructions**: If user specifies a product (Jira, Confluence, Trello, Bitbucket), use the corresponding product icon:

   ```tsx
   // For Jira - 🚨 ALWAYS use shouldUseNewLogoDesign
   import { JiraIcon } from "@atlaskit/logo";

   const CustomLogo = () => {
     return (
       <div style={{
         display: "flex",
         alignItems: "center",
         gap: token("space.100"),
         textDecoration: "none",
       }}>
         <JiraIcon
           appearance="brand"
           size="small"
           shouldUseNewLogoDesign={true} // 🚨 REQUIRED: Always set to true
         />
         <div style={{
           fontWeight: token("font.weight.semibold"),
           color: token("color.text"),
         }}>Jira</div>
       </div>
     );
   };

   // For Confluence - 🚨 ALWAYS use shouldUseNewLogoDesign
   import { ConfluenceIcon } from "@atlaskit/logo";

   const CustomLogo = () => {
     return (
       <div style={{
         display: "flex",
         alignItems: "center",
         gap: token("space.100"),
         textDecoration: "none",
       }}>
         <ConfluenceIcon
           appearance="brand"
           size="small"
           shouldUseNewLogoDesign={true} // 🚨 REQUIRED: Always set to true
         />
         <div style={{
           fontWeight: token("font.weight.semibold"),
           color: token("color.text"),
         }}>Confluence</div>
       </div>
     );
   };

   // For Trello - 🚨 ALWAYS use shouldUseNewLogoDesign
   import { TrelloIcon } from "@atlaskit/logo";

   const CustomLogo = () => {
     return (
       <div style={{
         display: "flex",
         alignItems: "center",
         gap: token("space.100"),
         textDecoration: "none",
       }}>
         <TrelloIcon
           appearance="brand"
           size="small"
           shouldUseNewLogoDesign={true} // 🚨 REQUIRED: Always set to true
         />
         <div style={{
           fontWeight: token("font.weight.semibold"),
           color: token("color.text"),
         }}>Trello</div>
       </div>
     );
   };

   // For Bitbucket - 🚨 ALWAYS use shouldUseNewLogoDesign
   import { BitbucketIcon } from "@atlaskit/logo";

   const CustomLogo = () => {
     return (
       <div style={{
         display: "flex",
         alignItems: "center",
         gap: token("space.100"),
         textDecoration: "none",
       }}>
         <BitbucketIcon
           appearance="brand"
           size="small"
           shouldUseNewLogoDesign={true} // 🚨 REQUIRED: Always set to true
         />
         <div style={{
           fontWeight: token("font.weight.semibold"),
           color: token("color.text"),
         }}>Bitbucket</div>
       </div>
     );
   };
   ```

2. **Existing Navigation Detection**: If there's existing navigation, read the logo label to match the product:

   ```tsx
   // Check existing navigation for logo labels like:
   // "Jira Home", "Confluence Home", "Trello Home", "Bitbucket Home"
   // Match the detected product accordingly and use the custom logo approach
   ```

3. **Default to Home Logo**: If no product is specified and no existing navigation is detected, use the home icon:

   ```tsx
   import HomeIcon from "@atlaskit/icon/core/home";

   const CustomLogo = () => {
     return (
       <div style={{
         display: "flex",
         alignItems: "center",
         gap: token("space.100"),
         textDecoration: "none",
       }}>
         <HomeIcon size="small" />
         <div style={{
           fontWeight: token("font.weight.semibold"),
           color: token("color.text"),
         }}>{productName}</div>
       </div>
     );
   };
   ```

4. **Generic Atlassian Logo**: As final fallback:

   ```tsx
   import { AtlassianIcon } from "@atlaskit/logo";

   const CustomLogo = () => {
     return (
       <div style={{
         display: "flex",
         alignItems: "center",
         gap: token("space.100"),
         textDecoration: "none",
       }}>
         <AtlassianIcon
           appearance="brand"
           size="small"
           shouldUseNewLogoDesign={true} // 🚨 REQUIRED: Always set to true
         />
         <div style={{
           fontWeight: token("font.weight.semibold"),
           color: token("color.text"),
         }}>Atlassian</div>
       </div>
     );
   };
   ```

### Product Name Display

Use the custom logo component that automatically includes the product name:

```tsx
import { token } from "@atlaskit/tokens";

const CustomLogo = ({ productName, productIcon: ProductIcon }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: token("space.100"),
      textDecoration: "none",
    }}>
      <ProductIcon
        appearance="brand"
        size="small"
        shouldUseNewLogoDesign={true} // 🚨 REQUIRED: Always set to true for ALL product logos
      />
      <div style={{
        fontWeight: token("font.weight.semibold"),
        color: token("color.text"),
      }}>{productName}</div>
    </div>
  );
};

<TopNavStart>
  <SideNavToggleButton
    defaultCollapsed={navigationConfig.sideNavCollapsed}
    collapseLabel={navigationConfig.collapseLabel}
    expandLabel={navigationConfig.expandLabel}
  />
  <AppSwitcher label={navigationConfig.appSwitcherLabel} />
  <CustomLogo 
    productName={navigationConfig.productName}
    productIcon={navigationConfig.productIcon}
  />
</TopNavStart>;
```

## Prerequisites

Ensure you have the following packages installed:

```bash
npm install @atlaskit/navigation-system @atlaskit/logo @atlaskit/badge @atlaskit/css
```

**Required imports for all navigation components:**

```tsx
import { token } from "@atlaskit/tokens";
```

## 🚨 CRITICAL: Import Patterns

**⚠️ WARNING: All navigation system imports must come from specific paths**

**❌ WRONG - Never import from main package:**
```tsx
import { MenuList } from "@atlaskit/navigation-system"; // ❌ WRONG: Main package import
import { LinkMenuItem } from "@atlaskit/navigation-system"; // ❌ WRONG: Main package import
import { ButtonMenuItem } from "@atlaskit/navigation-system"; // ❌ WRONG: Main package import
```

**✅ CORRECT - Always import from specific paths:**
```tsx
import { MenuList } from "@atlaskit/navigation-system/side-nav-items/menu-list"; // ✅ CORRECT: Specific path
import { LinkMenuItem } from "@atlaskit/navigation-system/side-nav-items/link-menu-item"; // ✅ CORRECT: Specific path
import { ButtonMenuItem } from "@atlaskit/navigation-system/side-nav-items/button-menu-item"; // ✅ CORRECT: Specific path
```

# 🚨 CRITICAL FIXES: Navigation System Errors

## Error: "Invariant failed at c (tiny-invariant) at (@atlaskit/primitives)"

This error commonly occurs with navigation system implementation. Here are the complete fixes:

### ❌ Problem 1: Improper Text Component Usage in Navigation

**Before (Causing Error):**
```tsx
import { Text } from "@atlaskit/primitives";

<Text
  as="div"
  weight="semibold" 
  size="small"
  color="subtlest"
  style={{...}}
>
  Starred spaces
</Text>
```

**✅ Fixed:**
```tsx
import { token } from "@atlaskit/tokens";
import { Text } from "@atlaskit/primitives";

<div style={{
  padding: `${token("space.100")} ${token("space.200")}`,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
}}>
  <Text size="small" color="color.text.subtlest" weight="semibold">
    Starred spaces
  </Text>
</div>
```

### ❌ Problem 2: Missing Required Component Imports

**✅ REQUIRED: Add ALL these component imports:**

```tsx
// Core navigation system
import "@atlaskit/navigation-system";

// Side navigation components
import "@atlaskit/navigation-system/side-nav-items/menu-list";
import "@atlaskit/navigation-system/side-nav-items/link-menu-item";
import "@atlaskit/navigation-system/side-nav-items/button-menu-item";
import "@atlaskit/navigation-system/side-nav-items/flyout-menu-item";
import "@atlaskit/navigation-system/side-nav-items/menu-section";
import "@atlaskit/navigation-system/side-nav-items/top-level-spacer";

// Supporting components
import "@atlaskit/badge";
import "@atlaskit/button/new";
import "@atlaskit/icon";
import "@atlaskit/avatar";
import "@atlaskit/logo";
import "@atlaskit/primitives";

// Styling components - ALWAYS required
import "@atlaskit/css";
import "@atlaskit/tokens";
```

### ❌ Problem 3: Incomplete Component Structure

**✅ REQUIRED: Complete Navigation Implementation:**

```tsx
import React from 'react';
import { token } from "@atlaskit/tokens";

// Component imports
import { Root as PageLayoutRoot } from '@atlaskit/navigation-system/layout/root';
import {
  TopNav,
  TopNavEnd,
  TopNavMiddle,
  TopNavStart,
} from '@atlaskit/navigation-system/layout/top-nav';
import { 
  SideNav, 
  SideNavContent, 
  SideNavFooter, 
  SideNavToggleButton 
} from '@atlaskit/navigation-system/layout/side-nav';
import { Main } from '@atlaskit/navigation-system/layout/main';
import {
  AppSwitcher,
  CreateButton,
  Help,
  Notifications,
  Search,
  Settings,
} from '@atlaskit/navigation-system/top-nav-items';
import { MenuList } from "@atlaskit/navigation-system/side-nav-items/menu-list";
import { LinkMenuItem } from "@atlaskit/navigation-system/side-nav-items/link-menu-item";
import { ButtonMenuItem } from "@atlaskit/navigation-system/side-nav-items/button-menu-item";
import { Divider } from "@atlaskit/navigation-system/side-nav-items/menu-section";
import { TopLevelSpacer } from "@atlaskit/navigation-system/side-nav-items/top-level-spacer";
import Badge from '@atlaskit/badge';
import Button from '@atlaskit/button/new';
import Avatar from '@atlaskit/avatar';
import { ConfluenceIcon } from '@atlaskit/logo';
import AiChatIcon from '@atlaskit/icon/core/ai-chat';

// Custom Logo Component (NO primitives Text component!)
const CustomLogo = ({ productName, productIcon: ProductIcon, href }) => {
  return (
    <a
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: token("space.100"),
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <ProductIcon
        appearance="brand"
        size="small"
        shouldUseNewLogoDesign={true} // 🚨 REQUIRED: Always set to true for ALL product logos
      />
      <div style={{
        fontWeight: token("font.weight.semibold"),
        color: token("color.text"),
      }}>
        {productName}
      </div>
    </a>
  );
};

// Complete Navigation Layout
export const NavigationLayout = ({ children }) => (
  <PageLayoutRoot>
    <TopNav>
      <TopNavStart>
        <SideNavToggleButton
          defaultCollapsed={false}
          collapseLabel="Collapse sidebar"
          expandLabel="Expand sidebar"
        />
        <AppSwitcher label="App switcher" />
        <CustomLogo
          href="/"
          productName="Your App"
          productIcon={ConfluenceIcon}
        />
      </TopNavStart>

      <TopNavMiddle>
        {/* IMPORTANT: Always place Search and CreateButton in TopNavMiddle */}
        <Search
          label="Search"
          placeholder="Search..."
          onSearch={() => {}}
        />
        <CreateButton onClick={() => {}}>
          Create
        </CreateButton>
      </TopNavMiddle>

      <TopNavEnd>
        <Button
          iconBefore={AiChatIcon}
          onClick={() => {}}
        >
          Rovo Chat
        </Button>
        <Notifications
          label="Notifications"
          badge={() => (
            <Badge appearance="important">5</Badge>
          )}
          onClick={() => {}}
        />
        <Help
          label="Help"
          onClick={() => {}}
        />
        <Settings
          label="Settings"
          onClick={() => {}}
        />
        <Avatar
          src="https://example.com/avatar.jpg"
          size="medium"
          onClick={() => {}}
        />
      </TopNavEnd>
    </TopNav>

    <SideNav>
          <SideNavContent>
      <MenuList>
        <LinkMenuItem 
          href="/dashboard"
          elemBefore={<DashboardIcon label="" />}
        >
          Dashboard
        </LinkMenuItem>
        <LinkMenuItem 
          href="/projects"
          elemBefore={<ProjectIcon label="" />}
        >
          Projects
        </LinkMenuItem>
        <TopLevelSpacer />
        <ButtonMenuItem 
          onClick={() => {}}
          elemBefore={<SettingsIcon label="" />}
        >
          Settings
        </ButtonMenuItem>
      </MenuList>
    </SideNavContent>
      <SideNavFooter>
        {/* Footer content */}
      </SideNavFooter>
    </SideNav>

    <Main id="main-container" isFixed>
      {children}
    </Main>
  </PageLayoutRoot>
);
```

## 🚨 CRITICAL: CSS Style Overrides Setup

**⚠️ CRUCIAL ORDER: Add CSS overrides to globals.css FIRST, then import globals.css**

**NOTE**: Use inline styles with token function for all component styling. However, these specific CSS overrides are **REQUIRED** for navigation system internal classes:

**Step 1: ADD these CSS overrides to globals.css (or app.css/index.css) FIRST:**

```css
/* globals.css - ADD THESE OVERRIDES FIRST */
/* REQUIRED: Show top nav */
._1e0cglyw {
  display: inherit !important;
}

/* REQUIRED: Hide search Icon Button */
._1e0cglyw._1m0a19ly {
  display: none !important;
}

/* REQUIRED: Button vertical middle */
._1o9zidpf {
  align-items: center !important;
}

/* REQUIRED: Search bar center */
._1bahh9n0 {
  justify-content: center !important;
}

/* REQUIRED: Fix navigation layout */
._1e0cglyw._1m0a19ly {
  display: none !important;
}
```

**Step 2: THEN import globals.css in your app entry point:**

```tsx
// In your app's entry point (e.g., _app.tsx, index.tsx, or App.tsx)
import './globals.css'; // 🚨 CRITICAL: Must import AFTER adding overrides above
```

**CRITICAL**: These CSS overrides target internal navigation system classes and are **REQUIRED** for proper navigation display. You must add these styles to your global CSS file (globals.css) BEFORE importing it.

## 🚨 VALIDATION CHECKLIST: CSS Setup Order

**Before implementing navigation, verify this exact order:**

- [ ] **Step 1**: CSS overrides are ADDED to globals.css file
- [ ] **Step 2**: globals.css is imported in app entry point (e.g., _app.tsx, index.tsx, or App.tsx)
- [ ] **Step 3**: Verify in browser dev tools that CSS overrides are loaded
- [ ] **Step 4**: Only then implement navigation components

**❌ COMMON MISTAKES:**
- Importing globals.css without adding the CSS overrides first
- Adding CSS overrides to a file that isn't imported
- Using wrong CSS file names or paths
- Missing the import statement in the app entry point

**✅ CORRECT ORDER:**
1. Create/update globals.css with CSS overrides
2. Import globals.css in your app entry point
3. Add navigation components
4. Verify navigation displays correctly

### ❌ Problem 4: AppProvider and Feature Flags Not Set

**✅ REQUIRED: Proper Setup:**

```tsx
// 1. Wrap your app in AppProvider
import AppProvider from "@atlaskit/app-provider";

<AppProvider>
  <NavigationLayout>
    <YourApp />
  </NavigationLayout>
</AppProvider>

// 2. Set up feature flags (utils/feature-flag.tsx)
import { setBooleanFeatureFlagResolver } from "@atlaskit/platform-feature-flags";

const defaultFeatureFlags = [
  "platform_design_system_team_portal_logic_r18_fix",
  "analytics-next-use-modern-context_jira",
  "platform-component-visual-refresh",
  "platform-default-typography-modernized",
];

export const resolveFeatureFlags = (featureFlags: string[] = []) => {
  const flags = [...featureFlags, ...defaultFeatureFlags];
  setBooleanFeatureFlagResolver((flagKey) => {
    return flags.includes(flagKey);
  });
};

// 3. Call resolveFeatureFlags() in your root app
```

**Note**: These are the complete fixes that resolve all navigation system errors. Follow ALL steps exactly as shown.

## Core Navigation Structure

### 1. Basic Layout Setup

First, initialize the navigation with the core layout structure:

```tsx
import { Root as PageLayoutRoot } from "@atlaskit/navigation-system/layout/root";
import {
  TopNav,
  TopNavEnd,
  TopNavMiddle,
  TopNavStart,
} from "@atlaskit/navigation-system/layout/top-nav";
import {
  SideNav,
  SideNavContent,
  SideNavFooter,
} from "@atlaskit/navigation-system/layout/side-nav";
import { Main } from "@atlaskit/navigation-system/layout/main";

export const NavigationLayout = ({ children }) => (
  <PageLayoutRoot>
    <TopNav>
      <TopNavStart>{/* Navigation start items */}</TopNavStart>
      <TopNavMiddle>{/* Navigation middle items */}</TopNavMiddle>
      <TopNavEnd>{/* Navigation end items */}</TopNavEnd>
    </TopNav>
    <SideNav>
      <SideNavContent>{/* Side navigation content */}</SideNavContent>
      <SideNavFooter>{/* Side navigation footer */}</SideNavFooter>
    </SideNav>
    <Main id="main-container" isFixed>
      {children}
    </Main>
  </PageLayoutRoot>
);
```

### 2. Top Navigation Components

Import the required top navigation components:

```tsx
import {
  AppSwitcher,
  CreateButton,
  Help,
  Notifications,
  Search,
  Settings,
} from "@atlaskit/navigation-system/top-nav-items";
import { SideNavToggleButton } from "@atlaskit/navigation-system/layout/side-nav";
import Badge from "@atlaskit/badge";
import Button from "@atlaskit/button/new";
import AiChatIcon from "@atlaskit/icon/core/ai-chat";
import Avatar from "@atlaskit/avatar";
import { token } from "@atlaskit/tokens";
```

### 3. Product Logo Configuration

Configure the appropriate product icon based on your application. Import only the icon you need:

```tsx
// Example: For Confluence (replace with your product's icon)
import { ConfluenceIcon } from "@atlaskit/logo";

// Alternative options (import only one icon):
// import { JiraIcon } from '@atlaskit/logo';
// import { TrelloIcon } from '@atlaskit/logo';
// import { BitbucketIcon } from '@atlaskit/logo';
// import HomeIcon from '@atlaskit/icon/core/home';
// import { AtlassianIcon } from '@atlaskit/logo';
```

### 4. Custom Logo Component

Create a reusable custom logo component:

```tsx
const CustomLogo = ({ productName, productIcon: ProductIcon, href }) => {
  return (
    <a
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: token("space.100"),
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <ProductIcon
        appearance="brand"
        size="small"
        shouldUseNewLogoDesign={true} // 🚨 REQUIRED: Always set to true for ALL product logos
      />
      <div style={{
        fontWeight: token("font.weight.semibold"),
        color: token("color.text"),
      }}>{productName}</div>
    </a>
  );
};
```

## Replacing Existing Navigation

### Step 1: Identify Current Navigation Values

Before replacing your existing navigation, document the current configuration:

```typescript
// Navigation configuration - customize these values for your application
const navigationConfig = {
  // Logo and branding
  logoHref: "https://your-app.com",
  productName: "Your App", // Product name to display
  productIcon: ConfluenceIcon, // Replace with your product icon

  // Search configuration
  searchLabel: "Search your app",
  searchPlaceholder: "Search...",

  // Create button - ALWAYS place in TopNavMiddle next to Search
  createButtonLabel: "Create",
  createButtonActions: [...],

  // Rovo chat
  rovoChatLabel: "Rovo Chat",

  // Notifications
  notificationCount: 5,
  notificationLabel: "Notifications",

  // User settings
  settingsLabel: "Settings",
  helpLabel: "Help",

  // User avatar
  avatarSrc: "https://example.com/user-avatar.jpg",

  // Side navigation
  sideNavCollapsed: false,
  collapseLabel: "Collapse sidebar",
  expandLabel: "Expand sidebar",

  // App switcher
  appSwitcherLabel: "App switcher"
};
```

### Step 2: Update Navigation Implementation

Replace your existing navigation with the new structure while preserving values:

```tsx
import React from 'react';
import { Root as PageLayoutRoot } from '@atlaskit/navigation-system/layout/root';
import {
  TopNav,
  TopNavEnd,
  TopNavMiddle,
  TopNavStart,
} from '@atlaskit/navigation-system/layout/top-nav';
import { SideNav, SideNavContent, SideNavFooter, SideNavToggleButton } from '@atlaskit/navigation-system/layout/side-nav';
import { Main } from '@atlaskit/navigation-system/layout/main';
import {
  AppSwitcher,
  CreateButton,
  Help,
  Notifications,
  Search,
  Settings,
} from '@atlaskit/navigation-system/top-nav-items';
import Badge from '@atlaskit/badge';
import { IconButton } from '@atlaskit/button/new';
import AiChatIcon from '@atlaskit/icon/core/ai-chat';

// Import appropriate product icon - Replace with your product
import { ConfluenceIcon } from '@atlaskit/logo';

// Custom Logo Component
const CustomLogo = ({ productName, productIcon: ProductIcon, href }) => {
  return (
    <a
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: token("space.100"),
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <ProductIcon
        appearance="brand"
        size="small"
        shouldUseNewLogoDesign={true} // 🚨 REQUIRED: Always set to true for ALL product logos
      />
      <div style={{
        fontWeight: token("font.weight.semibold"),
        color: token("color.text"),
      }}>{productName}</div>
    </a>
  );
};

export const AppNavigationLayout = ({
  children,
  onSearch,
  onCreateClick,
  onRovoChatClick,
  onNotificationClick,
  onSettingsClick,
  onHelpClick,
  onAvatarClick
}) => (
  <PageLayoutRoot>
    <TopNav>
      <TopNavStart>
        <SideNavToggleButton
          defaultCollapsed={navigationConfig.sideNavCollapsed}
          collapseLabel={navigationConfig.collapseLabel}
          expandLabel={navigationConfig.expandLabel}
        />
        <AppSwitcher label={navigationConfig.appSwitcherLabel} />
        <CustomLogo
          href={navigationConfig.logoHref}
          productName={navigationConfig.productName}
          productIcon={navigationConfig.productIcon}
        />
      </TopNavStart>

      <TopNavMiddle>
        <Search
          label={navigationConfig.searchLabel}
          placeholder={navigationConfig.searchPlaceholder}
          onSearch={onSearch}
        />
        <CreateButton onClick={onCreateClick}>
          {navigationConfig.createButtonLabel}
        </CreateButton>
      </TopNavMiddle>

      <TopNavEnd>
        <Button
          iconBefore={AiChatIcon}
          onClick={onRovoChatClick}
        >
          {navigationConfig.rovoChatLabel}
        </Button>
        <Notifications
          label={navigationConfig.notificationLabel}
          badge={() => (
            <Badge appearance="important">
              {navigationConfig.notificationCount}
            </Badge>
          )}
          onClick={onNotificationClick}
        />
        <Help
          label={navigationConfig.helpLabel}
          onClick={onHelpClick}
        />
        <Settings
          label={navigationConfig.settingsLabel}
          onClick={onSettingsClick}
        />
        <Avatar
          src={navigationConfig.avatarSrc}
          size="medium"
          onClick={onAvatarClick}
        />
      </TopNavEnd>
    </TopNav>

    <SideNav>
      <SideNavContent>
        {/* Your existing side navigation content */}
      </SideNavContent>
      <SideNavFooter>
        {/* Your existing side navigation footer */}
      </SideNavFooter>
    </SideNav>

    <Main id="main-container" isFixed>
      {children}
    </Main>
  </PageLayoutRoot>
);
```

### Step 3: Side Navigation Content Migration

For side navigation content, use the Navigation System specific menu components instead of generic Menu components. The navigation system provides specialized menu items that integrate properly with the navigation layout:

```tsx
import { MenuList } from "@atlaskit/navigation-system/side-nav-items/menu-list";
import { LinkMenuItem } from "@atlaskit/navigation-system/side-nav-items/link-menu-item";
import { ButtonMenuItem } from "@atlaskit/navigation-system/side-nav-items/button-menu-item";
import { FlyoutMenuItem, FlyoutMenuItemContent, FlyoutMenuItemTrigger } from "@atlaskit/navigation-system/side-nav-items/flyout-menu-item";
import { Divider } from "@atlaskit/navigation-system/side-nav-items/menu-section";
import { TopLevelSpacer } from "@atlaskit/navigation-system/side-nav-items/top-level-spacer";

const SideNavigationContent = ({ primaryItems, sections, flyoutItems }) => (
  <SideNavContent>
    <MenuList>
      {/* Primary navigation items - use LinkMenuItem for navigation */}
      {primaryItems.map((item) => (
        <LinkMenuItem 
          key={item.id} 
          href={item.href}
          elemBefore={item.icon && <item.icon label="" />} // ✅ CORRECT: Icon in elemBefore
          elemAfter={item.badge && <item.badge />}
        >
          {item.label} {/* ✅ CORRECT: Only text in children */}
        </LinkMenuItem>
      ))}

      <TopLevelSpacer />

      {/* Action items - use ButtonMenuItem for actions */}
      {sections.map((section) => (
        <div key={section.id}>
          {section.items.map((item) => (
            <ButtonMenuItem 
              key={item.id} 
              onClick={item.onClick}
              elemBefore={item.icon && <item.icon label="" />} // ✅ CORRECT: Icon in elemBefore
              elemAfter={item.badge && <item.badge />}
            >
              {item.label} {/* ✅ CORRECT: Only text in children */}
            </ButtonMenuItem>
          ))}
          {section.divider && <Divider />}
        </div>
      ))}

      {/* Flyout menu items for nested navigation */}
      {flyoutItems.map((flyoutItem) => (
        <FlyoutMenuItem key={flyoutItem.id}>
          <FlyoutMenuItemTrigger
            elemBefore={flyoutItem.icon && <flyoutItem.icon label="" />} // ✅ CORRECT: Icon in elemBefore
            elemAfter={flyoutItem.badge && <flyoutItem.badge />}
          >
            {flyoutItem.label} {/* ✅ CORRECT: Only text in children */}
          </FlyoutMenuItemTrigger>
          <FlyoutMenuItemContent>
            <MenuList>
              {flyoutItem.children.map((child) => (
                <LinkMenuItem 
                  key={child.id} 
                  href={child.href}
                  elemBefore={child.icon && <child.icon label="" />} // ✅ CORRECT: Icon in elemBefore
                >
                  {child.label} {/* ✅ CORRECT: Only text in children */}
                </LinkMenuItem>
              ))}
            </MenuList>
          </FlyoutMenuItemContent>
        </FlyoutMenuItem>
      ))}
    </MenuList>
  </SideNavContent>
);
```

## Navigation System Menu Items

### LinkMenuItem

Use `LinkMenuItem` for navigation links that take users to different pages or sections. This is the primary component for navigation items in the side navigation.

```tsx
import { LinkMenuItem } from "@atlaskit/navigation-system/side-nav-items/link-menu-item";

<LinkMenuItem 
  href="/dashboard"
  elemBefore={<DashboardIcon label="" />}
  elemAfter={<Badge>New</Badge>}
>
  Dashboard
</LinkMenuItem>
```

**Props:**
- `href`: The URL to navigate to
- `elemBefore`: Icon or element to display before the text
- `elemAfter`: Badge or element to display after the text
- `children`: The menu item text content
- `isSelected`: Whether this item is currently selected
- `onClick`: Optional click handler (for analytics or custom behavior)

**When to use:**
- Navigation to different pages or sections
- Links to external resources
- Primary navigation items
- Breadcrumb-style navigation

### ButtonMenuItem

Use `ButtonMenuItem` for actions that trigger functionality without navigation. This component handles click events and state changes.

```tsx
import { ButtonMenuItem } from "@atlaskit/navigation-system/side-nav-items/button-menu-item";

<ButtonMenuItem 
  onClick={handleCreateProject}
  elemBefore={<AddIcon label="" />}
  elemAfter={<KeyboardShortcut>⌘N</KeyboardShortcut>}
>
  Create Project
</ButtonMenuItem>
```

**Props:**
- `onClick`: Function to call when the item is clicked
- `elemBefore`: Icon or element to display before the text
- `elemAfter`: Badge or element to display after the text
- `children`: The menu item text content
- `isSelected`: Whether this item is currently selected
- `isDisabled`: Whether the item is disabled

**When to use:**
- Actions that trigger modals or dialogs
- State changes or toggles
- Commands or operations
- Settings or configuration actions

### FlyoutMenuItem

Use `FlyoutMenuItem` for hierarchical navigation with nested menu items. This creates a flyout panel that appears when hovering or clicking the trigger.

```tsx
import { 
  FlyoutMenuItem, 
  FlyoutMenuItemContent, 
  FlyoutMenuItemTrigger 
} from "@atlaskit/navigation-system/side-nav-items/flyout-menu-item";

<FlyoutMenuItem>
  <FlyoutMenuItemTrigger
    elemBefore={<ProjectIcon label="" />}
    elemAfter={<ChevronRightIcon label="" />}
  >
    Projects
  </FlyoutMenuItemTrigger>
  <FlyoutMenuItemContent>
    <MenuList>
      <LinkMenuItem href="/projects/web-app">
        Web Application
      </LinkMenuItem>
      <LinkMenuItem href="/projects/mobile-app">
        Mobile Application
      </LinkMenuItem>
      <Divider />
      <ButtonMenuItem onClick={handleCreateProject}>
        Create New Project
      </ButtonMenuItem>
    </MenuList>
  </FlyoutMenuItemContent>
</FlyoutMenuItem>
```

**Components:**
- `FlyoutMenuItem`: Container for the entire flyout
- `FlyoutMenuItemTrigger`: The clickable trigger element
- `FlyoutMenuItemContent`: The content panel that appears

**FlyoutMenuItemTrigger Props:**
- `elemBefore`: Icon or element to display before the text
- `elemAfter`: Icon or element to display after the text (typically a chevron)
- `children`: The trigger text content

**When to use:**
- Hierarchical navigation structures
- Grouping related navigation items
- Complex navigation trees
- Category-based organization

### ExpandableMenuItem (Alternative Pattern)

While there's no specific `ExpandableMenuItem` component, you can create expandable behavior using state management with `ButtonMenuItem` and conditional rendering:

```tsx
import { useState } from "react";
import { ButtonMenuItem } from "@atlaskit/navigation-system/side-nav-items/button-menu-item";
import { LinkMenuItem } from "@atlaskit/navigation-system/side-nav-items/link-menu-item";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";



const ExpandableMenuSection = ({ title, items, icon: Icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <ButtonMenuItem
        onClick={() => setIsExpanded(!isExpanded)}
        elemBefore={<Icon label="" />} // ✅ CORRECT: Icon in elemBefore
        elemAfter={isExpanded ? <ChevronDownIcon label="" /> : <ChevronRightIcon label="" />}
      >
        {title} {/* ✅ CORRECT: Only text in children */}
      </ButtonMenuItem>
      {isExpanded && items.map((item) => (
        <LinkMenuItem 
          key={item.id} 
          href={item.href}
          elemBefore={<div style={{ width: "24px" }} />} // Indent using elemBefore
        >
          {item.label} {/* ✅ CORRECT: Only text in children */}
        </LinkMenuItem>
      ))}
    </>
  );
};

// Usage
<ExpandableMenuSection
  title="Team Settings"
  icon={SettingsIcon}
  items={[
    { id: 1, href: "/team/members", label: "Members" },
    { id: 2, href: "/team/permissions", label: "Permissions" },
    { id: 3, href: "/team/billing", label: "Billing" }
  ]}
/>
```

**When to use:**
- In-place expansion of menu sections
- Collapsible navigation groups
- Progressive disclosure of options
- Space-efficient navigation

## Menu Item Best Practices

### 1. Choose the Right Component

- **LinkMenuItem**: For navigation between pages/sections
- **ButtonMenuItem**: For actions and commands
- **FlyoutMenuItem**: For hierarchical navigation
- **Expandable Pattern**: For collapsible sections

### 2. Icon Usage

```tsx
// ✅ CORRECT: Icons always in elemBefore prop
<LinkMenuItem 
  href="/dashboard" 
  elemBefore={<DashboardIcon label="" />}
>
  Dashboard
</LinkMenuItem>

// ✅ CORRECT: Icons with proper labels for accessibility
<ButtonMenuItem 
  onClick={handleSave}
  elemBefore={<SaveIcon label="Save document" />}
>
  Save
</ButtonMenuItem>

// ❌ WRONG: Never put icons inside children
<LinkMenuItem href="/dashboard">
  <DashboardIcon label="" /> Dashboard  // DON'T DO THIS
</LinkMenuItem>
```

### 3. Badge and Status Indicators

```tsx
// ✅ CORRECT: Using badges for status with icon in elemBefore
<LinkMenuItem 
  href="/notifications" 
  elemBefore={<NotificationIcon label="" />}
  elemAfter={<Badge appearance="important">5</Badge>}
>
  Notifications
</LinkMenuItem>

// ✅ CORRECT: Using status indicators with icon in elemBefore
<LinkMenuItem 
  href="/project/status" 
  elemBefore={<ProjectIcon label="" />}
  elemAfter={<Lozenge appearance="success">Active</Lozenge>}
>
  Project Status
</LinkMenuItem>
```

### 4. Keyboard Navigation

All navigation system menu items support keyboard navigation automatically:
- **Tab**: Navigate between items
- **Enter/Space**: Activate items
- **Arrow keys**: Navigate within flyout menus
- **Escape**: Close flyout menus

### 5. Accessibility Guidelines

```tsx
// ✅ CORRECT: Proper labeling with icon in elemBefore
<LinkMenuItem 
  href="/settings" 
  elemBefore={<SettingsIcon label="Settings" />}
  aria-label="Navigate to application settings"
>
  Settings
</LinkMenuItem>

// ✅ CORRECT: Descriptive text with icon in elemBefore
<ButtonMenuItem 
  onClick={handleLogout}
  elemBefore={<LogoutIcon label="Logout" />}
  aria-label="Sign out of your account"
>
  Sign Out
</ButtonMenuItem>
```

### 6. Grouping and Organization

```tsx
// ✅ CORRECT: Logical grouping with spacers and dividers (icons in elemBefore)
<MenuList>
  {/* Primary navigation */}
  <LinkMenuItem 
    href="/dashboard"
    elemBefore={<DashboardIcon label="" />}
  >
    Dashboard
  </LinkMenuItem>
  <LinkMenuItem 
    href="/projects"
    elemBefore={<ProjectIcon label="" />}
  >
    Projects
  </LinkMenuItem>

  <TopLevelSpacer />

  {/* Secondary actions */}
  <ButtonMenuItem 
    onClick={handleSettings}
    elemBefore={<SettingsIcon label="" />}
  >
    Settings
  </ButtonMenuItem>
  <ButtonMenuItem 
    onClick={handleHelp}
    elemBefore={<HelpIcon label="" />}
  >
    Help
  </ButtonMenuItem>

  <Divider />

  {/* Account actions */}
  <ButtonMenuItem 
    onClick={handleLogout}
    elemBefore={<LogoutIcon label="" />}
  >
    Sign Out
  </ButtonMenuItem>
</MenuList>
```

## 🚨 CRITICAL: Never Use @atlaskit/menu Components

**⚠️ NEVER IMPORT OR USE THESE COMPONENTS:**

```tsx
// 🚨 NEVER DO THIS - These will cause errors
import { MenuGroup, Section, ButtonItem, LinkItem, HeadingItem } from "@atlaskit/menu";
import { DropdownMenu, DropdownItem, DropdownItemGroup } from "@atlaskit/dropdown-menu";
import Menu, { MenuGroup, Section } from "@atlaskit/menu";

// 🚨 NEVER USE THESE IN SIDE NAVIGATION
<MenuGroup>
  <ButtonItem>Dashboard</ButtonItem>
  <LinkItem href="/projects">Projects</LinkItem>
</MenuGroup>
```

**✅ ALWAYS USE Navigation System Components:**

```tsx
// ✅ ALWAYS DO THIS - Navigation system components
import { MenuList } from "@atlaskit/navigation-system/side-nav-items/menu-list";
import { LinkMenuItem } from "@atlaskit/navigation-system/side-nav-items/link-menu-item";
import { ButtonMenuItem } from "@atlaskit/navigation-system/side-nav-items/button-menu-item";
import { FlyoutMenuItem } from "@atlaskit/navigation-system/side-nav-items/flyout-menu-item";
import HomeIcon from "@atlaskit/icon/core/home";
import ProjectIcon from "@atlaskit/icon/core/folder";
import SettingsIcon from "@atlaskit/icon/core/settings";

// ✅ CORRECT STRUCTURE: SideNavContent > MenuList > LinkMenuItem
<SideNavContent>
  <MenuList>
    <LinkMenuItem
      href="#"
      elemBefore={<HomeIcon label="" />}
    >
      Overview
    </LinkMenuItem>
    <LinkMenuItem 
      href="/projects"
      elemBefore={<ProjectIcon label="" />}
    >
      Projects
    </LinkMenuItem>
    <ButtonMenuItem 
      onClick={handleAction}
      elemBefore={<SettingsIcon label="" />}
    >
      Settings
    </ButtonMenuItem>
  </MenuList>
</SideNavContent>
```

**⚠️ COMPONENT REPLACEMENT MAPPING:**

| ❌ Never Use | ✅ Use Instead |
|--------------|----------------|
| `@atlaskit/menu` → `ButtonItem` | `@atlaskit/navigation-system/side-nav-items/button-menu-item` → `ButtonMenuItem` |
| `@atlaskit/menu` → `LinkItem` | `@atlaskit/navigation-system/side-nav-items/link-menu-item` → `LinkMenuItem` |
| `@atlaskit/menu` → `MenuGroup` | `@atlaskit/navigation-system/side-nav-items/menu-list` → `MenuList` |
| `@atlaskit/menu` → `Section` | `@atlaskit/navigation-system/side-nav-items/menu-section` → `Divider` |
| `@atlaskit/menu` → `HeadingItem` | Use section headers or `TopLevelSpacer` |

**🚨 ICON USAGE PATTERNS:**

| ❌ Never Do | ✅ Always Do |
|-------------|-------------|
| `<LinkMenuItem><Icon />Text</LinkMenuItem>` | `<LinkMenuItem elemBefore={<Icon />}>Text</LinkMenuItem>` |
| `<ButtonMenuItem><Icon />Text</ButtonMenuItem>` | `<ButtonMenuItem elemBefore={<Icon />}>Text</ButtonMenuItem>` |
| `<FlyoutMenuItem><Icon />Text</FlyoutMenuItem>` | `<FlyoutMenuItem elemBefore={<Icon />}>Text</FlyoutMenuItem>` |

**Why Navigation System Components Are Better:**
- Proper integration with navigation layout
- Consistent styling and behavior
- Built-in accessibility features
- Optimized performance
- Better keyboard navigation
- Proper focus management
- Theme integration

**🚨 REQUIRED STRUCTURE PATTERN:**
```tsx
// ✅ ALWAYS follow this exact structure:
<SideNavContent>
  <MenuList>
    <LinkMenuItem
      href="#"
      elemBefore={<HomeIcon label="" />}
    >
      Overview
    </LinkMenuItem>
    // ... more menu items
  </MenuList>
</SideNavContent>
```

**⚠️ NEVER use these patterns:**
- `MenuGroup` instead of `MenuList`
- `Section` instead of `Divider`
- Icons inside children instead of `elemBefore`
- Missing `SideNavContent` wrapper
- `NavLogo` instead of `CustomLogo`

## Logo Usage Example

### Custom Logo Implementation

```tsx
// Use the imported icon components with your navigation config
<CustomLogo
  href={navigationConfig.logoHref}
  productName={navigationConfig.productName}
  productIcon={navigationConfig.productIcon}
/>
```

### Customizing for Different Products

Update your `navigationConfig` object and import the appropriate icon:

```tsx
// Example: For Jira
import { JiraIcon } from "@atlaskit/logo";

const navigationConfig = {
  logoHref: "https://your-jira-instance.atlassian.net",
  productName: "Jira",
  productIcon: JiraIcon,
  // ... other config values
};

// Example: For Confluence
import { ConfluenceIcon } from "@atlaskit/logo";

const navigationConfig = {
  logoHref: "https://your-confluence-instance.atlassian.net",
  productName: "Confluence",
  productIcon: ConfluenceIcon,
  // ... other config values
};

// Example: For generic product with home icon
import HomeIcon from "@atlaskit/icon/core/home";

const navigationConfig = {
  logoHref: "https://your-app.com",
  productName: "Your App",
  productIcon: HomeIcon,
  // ... other config values
};
```

## Migration Checklist

### Before Migration

- [ ] **Check for existing navigation** and document current logo labels to determine product type
- [ ] Document current navigation structure and values
- [ ] Identify your product type (Jira, Confluence, Trello, Bitbucket, etc.) or plan to use home logo
- [ ] List all navigation event handlers
- [ ] Note any custom styling or themes
- [ ] Backup existing navigation components

### During Migration

- [ ] **Remove ALL existing navigation instances** before implementing new ones
- [ ] Install required packages
- [ ] Replace root layout structure with **single** navigation instance
- [ ] Update top navigation components
- [ ] **Select appropriate product logo** based on detection logic or user instructions
- [ ] Configure appropriate product logo with `shouldUseNewLogoDesign`
- [ ] **Migrate side navigation content using Navigation System menu items**
- [ ] **Replace generic Menu components with LinkMenuItem, ButtonMenuItem, and FlyoutMenuItem**
- [ ] Update event handlers
- [ ] Test navigation functionality

### After Migration

- [ ] **Verify only one navigation instance exists** in the application
- [ ] Verify all navigation values are preserved
- [ ] **Confirm correct product logo is displayed** with proper labeling
- [ ] **Ensure side navigation uses Navigation System menu items, not generic Menu components**
- [ ] Test responsive behavior
- [ ] Validate accessibility
- [ ] Check theme compatibility
- [ ] Test all interactive elements
- [ ] Verify proper logo display and product name if using home logo

## Common Issues and Solutions

### Issue: "Invariant failed at c (tiny-invariant) at (@atlaskit/primitives)"

**Solution**: This is caused by improper usage of `@atlaskit/primitives` components. See the complete fixes above.

**Key fixes:**
- Replace `@atlaskit/primitives` Text components with simple divs and design tokens
- Ensure AppProvider wraps your app
- Set up feature flags properly

### Issue: Navigation not displaying correctly

**Root Cause**: Missing CSS overrides or globals.css not imported, or CSS overrides not added to globals.css before importing.

**Solution**: 
1. **FIRST**: Ensure ALL required CSS overrides are added to globals.css:

```css
/* globals.css - ADD THESE OVERRIDES FIRST */
/* REQUIRED: Show top nav */
._1e0cglyw {
  display: inherit !important;
}

/* REQUIRED: Hide search Icon Button */
._1e0cglyw._1m0a19ly {
  display: none !important;
}

/* REQUIRED: Button vertical middle */
._1o9zidpf {
  align-items: center !important;
}

/* REQUIRED: Search bar center */
._1bahh9n0 {
  justify-content: center !important;
}
```

2. **SECOND**: THEN ensure globals.css is imported in your app entry point:
   ```tsx
   // In _app.tsx, index.tsx, or App.tsx
   import './globals.css'; // 🚨 CRITICAL: Must be imported AFTER adding overrides
   ```

**These overrides are already included above.**

### Issue: Multiple navigation instances

**Solution**: Ensure you remove existing navigation before implementing new ones:

```tsx
// Remove old navigation components completely
// Then implement single navigation instance
<PageLayoutRoot>
  {/* Only ONE TopNav */}
  <TopNav>...</TopNav>
  {/* Only ONE SideNav */}
  <SideNav>...</SideNav>
  <Main>...</Main>
</PageLayoutRoot>
```

### Issue: Wrong product logo displayed

**Solution**: Check existing navigation labels and match accordingly:

```tsx
// Read existing logo labels like "Jira Home", "Confluence Home", etc.
// Then import and use the matching product icon
import { JiraIcon } from "@atlaskit/logo";

const navigationConfig = {
  productName: "Jira",
  productIcon: JiraIcon,
  // ... other config
};

// Use simple div instead of Text component
const CustomLogo = ({ productName, productIcon: ProductIcon, href }) => (
  <a href={href} style={{
    display: "flex",
    alignItems: "center",
    gap: token("space.100"),
  }}>
    <ProductIcon appearance="brand" size="small" shouldUseNewLogoDesign={true} />
    <div style={{
      fontWeight: token("font.weight.semibold"),
      color: token("color.text"),
    }}>
      {productName}
    </div>
  </a>
);
```

### Issue: No product specified

**Solution**: Use home icon with product name:

```tsx
import HomeIcon from "@atlaskit/icon/core/home";

const navigationConfig = {
  productName: detectedProductName,
  productIcon: HomeIcon,
  // ... other config
};

<CustomLogo
  productName={navigationConfig.productName}
  productIcon={navigationConfig.productIcon}
  href={navigationConfig.logoHref}
/>
```

### Issue: Navigation values not preserved

**Solution**: Update your single configuration object to maintain existing values:

```tsx
const navigationConfig = {
  // Map your existing values here
  searchLabel: existingApp.searchConfig.label,
  notificationCount: existingApp.notifications.count,
  logoHref: existingApp.logoConfig.href,
  logoLabel: existingApp.logoConfig.label,
  // ... other preserved values
};
```

### Issue: Side navigation not collapsing

**Solution**: Ensure proper event handlers are passed:

```tsx
<SideNavToggleButton
  defaultCollapsed={navigationConfig.sideNavCollapsed}
  collapseLabel={navigationConfig.collapseLabel}
  expandLabel={navigationConfig.expandLabel}
  onToggle={handleSideNavToggle} // Add this handler
/>
```

### Issue: Generic Menu components used in side navigation

**Solution**: Replace with Navigation System specific components:

```tsx
// Replace this:
import { MenuGroup, Section, ButtonItem } from "@atlaskit/menu";

// With this:
import { MenuList } from "@atlaskit/navigation-system/side-nav-items/menu-list";
import { LinkMenuItem } from "@atlaskit/navigation-system/side-nav-items/link-menu-item";
import { ButtonMenuItem } from "@atlaskit/navigation-system/side-nav-items/button-menu-item";
```

## 🚨 CRITICAL REMINDERS

### 1. Never Use @atlaskit/menu Components
- **NEVER** import or use `@atlaskit/menu` components in navigation
- **ALWAYS** use `@atlaskit/navigation-system/side-nav-items/*` components
- Replace `ButtonItem` → `ButtonMenuItem`, `LinkItem` → `LinkMenuItem`, `MenuGroup` → `MenuList`

### 2. Always Use shouldUseNewLogoDesign
- **ALWAYS** set `shouldUseNewLogoDesign={true}` on ALL product logos
- This applies to `JiraIcon`, `ConfluenceIcon`, `TrelloIcon`, `BitbucketIcon`, `AtlassianIcon`
- **NEVER** omit this prop or set it to false

### 3. Icons Must Use elemBefore Prop
- **ALWAYS** place icons in `elemBefore` prop: `<LinkMenuItem elemBefore={<Icon />}>Text</LinkMenuItem>`
- **NEVER** put icons inside children: `<LinkMenuItem><Icon />Text</LinkMenuItem>`
- This applies to ALL menu items: `LinkMenuItem`, `ButtonMenuItem`, `FlyoutMenuItem`

### 4. Never Use NavLogo Component
- **NEVER** use `NavLogo` from `@atlaskit/navigation-system/top-nav-items`
- **ALWAYS** use CustomLogo pattern with `shouldUseNewLogoDesign={true}`
- **ALWAYS** wrap in proper styling with design tokens

### 5. Always Use MenuList Structure
- **NEVER** use `MenuGroup` or `Section` from `@atlaskit/menu`
- **ALWAYS** use `MenuList` from `@atlaskit/navigation-system/side-nav-items/menu-list`
- **ALWAYS** structure as: `<SideNavContent><MenuList><LinkMenuItem /></MenuList></SideNavContent>`

### 6. Single Navigation Instance
- **ONLY ONE** `TopNav` and **ONLY ONE** `SideNav` per application
- **REMOVE** existing navigation completely before implementing new navigation
- **VERIFY** no multiple navigation instances exist

These are the most common causes of navigation errors and must be followed strictly.

### Avatar Configuration

The Avatar component in TopNavEnd displays the current user's profile image. Configure it through the navigationConfig object:

```typescript
const navigationConfig = {
  // ... other configuration

  // User avatar
  avatarSrc: "https://example.com/user-avatar.jpg", // User's profile image URL
};
```

**Avatar Component Props:**
- `src`: URL to the user's profile image
- `size`: Avatar size (use "medium" for navigation consistency)
- `onClick`: Handler for avatar click events (typically opens user menu)

**Usage Example:**
```tsx
<Avatar
  src={navigationConfig.avatarSrc}
  size="medium"
  onClick={onAvatarClick}
/>
```

**Common Avatar Click Handlers:**
- Open user profile dropdown menu
- Navigate to user settings page
- Display user account information
- Show logout options

## Best Practices

1. **Single Navigation Instance**: Always ensure only one top navigation and one side navigation exists in your application
2. **Create Button Placement**: Always place the CreateButton in TopNavMiddle next to the Search component, never in TopNavStart or TopNavEnd
3. **Smart Product Logo Selection**: Use the priority logic to select the most appropriate product logo:
   - Check for explicit product instructions first
   - Detect existing navigation product labels
   - Default to home logo with product name
   - Use generic Atlassian logo as final fallback
4. **Use Navigation System Menu Items**: Always use LinkMenuItem, ButtonMenuItem, and FlyoutMenuItem instead of generic Menu components
5. **Choose the Right Menu Item Type**: 
   - LinkMenuItem for navigation
   - ButtonMenuItem for actions
   - FlyoutMenuItem for hierarchical navigation
6. **Preserve existing functionality**: Map all existing navigation features to new components
7. **Clean migration**: Remove old navigation components completely before implementing new ones
8. **Test thoroughly**: Verify all navigation actions work as expected and only one navigation exists
9. **Consider accessibility**: Ensure proper labeling and keyboard navigation
10. **Maintain consistency**: Use consistent styling and behavior patterns
11. **Document changes**: Keep track of what was changed for future reference
12. **Product name visibility**: When using home logo, ensure product name is clearly visible through labels or text
13. **Always use inline styles with token function**: Use inline styles with token function for proper styling

## Additional Resources

- [Navigation System Documentation](https://atlassian.design/components/navigation-system)
- [Logo Component Documentation](https://atlassian.design/components/logo)
- [Badge Component Documentation](https://atlassian.design/components/badge)
- [Menu Component Documentation](https://atlassian.design/components/menu)
- [Avatar Component Documentation](https://atlassian.design/components/avatar)
- [CSS in JS Documentation](https://atlassian.design/components/css) - Inline styles with token function usage
- [Design Tokens Documentation](https://atlassian.design/tokens) - Token usage

### 🚨 CRITICAL: Icon Import Source Rules

> **Never use `@atlaskit/icon/glyph` or any glyph icon imports for navigation components. Only use icons from `@atlaskit/icon/core` for navigation system menu items (`LinkMenuItem`, `ButtonMenuItem`, etc). For product logos in `CustomLogo`, only use icons from `@atlaskit/logo`.**
>
> **Never import product icons (like Jira, Confluence, Trello, etc) from `@atlaskit/icon/core` (e.g., `@atlaskit/icon/core/jira`). Product icons only exist in `@atlaskit/logo`.**

**For menu items (LinkMenuItem, ButtonMenuItem):**
- **ALWAYS** import from `@atlaskit/icon/core` (for generic icons only, e.g., home, settings, search, teams, etc)
- **NEVER** import from `@atlaskit/icon/glyph` or any glyph path
- **NEVER** import product icons (jira, confluence, trello, etc) from `@atlaskit/icon/core`
- Examples: `import HomeIcon from "@atlaskit/icon/core/home"`

**For CustomLogo components:**
- **ALWAYS** import from `@atlaskit/logo` (for product icons and Atlassian logos)
- **NEVER** import from `@atlaskit/icon/core` or `@atlaskit/icon/glyph`
- Examples: `import { JiraIcon } from "@atlaskit/logo"`