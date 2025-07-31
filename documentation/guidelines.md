# Atlassian Design System - Development Guidelines

## Overview
This guide provides comprehensive setup steps and best practices for building React applications using Atlassian's Design System (Atlaskit). Follow these guidelines to ensure consistency with Atlassian's design principles.

## Design Principles
- **Bold**: Make confident design decisions that drive clarity
- **Optimistic**: Create positive, encouraging experiences  
- **Practical**: Build functional, efficient interfaces that get work done

## Setup Steps

### 1. Install Required Packages
```bash
npm install @atlaskit/tokens @atlaskit/primitives @atlaskit/button @atlaskit/form @atlaskit/textfield @atlaskit/select @atlaskit/modal-dialog @atlaskit/avatar @atlaskit/badge @atlaskit/lozenge @atlaskit/icon @atlaskit/navigation-system @atlaskit/logo
```

### 2. Import Patterns
```tsx
// Components - use default imports
import Button from '@atlaskit/button/new';
import Textfield from '@atlaskit/textfield';
import Select from '@atlaskit/select';

// Primitives - use named imports
import { Stack, Inline, Box, Grid, Text } from '@atlaskit/primitives';

// Icons - import from core folder
import AddIcon from '@atlaskit/icon/core/add';
import EditIcon from '@atlaskit/icon/core/edit';

// Tokens - use token function
import { token } from '@atlaskit/tokens';
```

### 3. App Provider Setup (ONE-TIME SETUP)
**CRITICAL: Only include these imports once. If the imports already exist then skip this step entirely.**

```tsx
import AppProvider from "@atlaskit/app-provider";
```

**Add AppProvider to main file (ONE-TIME SETUP)**
You must wrap the main app in an `<AppProvider>` **only if it's not already wrapped**

```tsx
<AppProvider>...</AppProvider>
```

### 4. Feature Flag Setup (ONE-TIME SETUP)
**CRITICAL: You MUST create this file - it does not exist by default**

**Step 4a: Create the utils directory**
- Create a `utils` folder in your project root (same level as your main app file)
- If the `utils` folder already exists, skip this step

**Step 4b: Create the feature flag file**
- Create a new file: `utils/feature-flag.tsx`
- **IMPORTANT: The file extension must be `.tsx` (not `.ts` or `.js`)**
- Copy and paste the exact code below into this new file:

```tsx
import { setBooleanFeatureFlagResolver } from "@atlaskit/platform-feature-flags";

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
```

**Step 4c: Import and call the function**
- In your main app file (like `app/layout.tsx`, `app.tsx`, or `page.tsx`), add this import at the top:

```tsx
import { resolveFeatureFlags } from './utils/feature-flag';
```

- Then call the function near the top of your main component, before any other code:

```tsx
// Call this near the top of your main app file, before your App component
resolveFeatureFlags();
```

### 5. CSS Setup for Navigation (ONE-TIME SETUP)
**CRITICAL: These CSS overrides are REQUIRED for navigation system to display correctly**

**Step 5a: Create or update your global CSS file**
- Find your global CSS file (usually `globals.css`, `app.css`, or `index.css`)
- If it doesn't exist, create it in your project root or src directory

**Step 5b: Add the required CSS overrides**
- Add these CSS overrides to your global CSS file BEFORE any other styles:

```css
/* REQUIRED: Navigation system CSS overrides */
/* Show top nav */
._1e0cglyw {
  display: inherit !important;
}

/* Hide search Icon Button */
._1e0cglyw._1m0a19ly {
  display: none !important;
}

/* Button vertical middle */
._1o9zidpf {
  align-items: center !important;
}

/* Search bar center */
._1bahh9n0 {
  justify-content: center !important;
}

/* Fix navigation layout */
._1e0cglyw._1m0a19ly {
  display: none !important;
}
```

**Step 5c: Import the global CSS file**
- In your main app file (same file where you imported resolveFeatureFlags), add this import:

```tsx
import './globals.css'; // 🚨 CRITICAL: Must import AFTER adding overrides above
```

**VERIFICATION: After adding the CSS overrides, verify:**
- The CSS overrides are added to your global CSS file
- The global CSS file is imported in your main app file
- The import path matches your actual file location

**VERIFICATION: After creating the file, verify it exists at:**
- `./utils/feature-flag.tsx` (relative to your project root)
- The file should contain the exact code above
- The import path in your main file should match the actual file location

**IMPORTANT ICON USAGE NOTE:** 
- When using folder icons, use `FolderClosedIcon` from `@atlaskit/icon/core/folder-closed` or `FolderOpenIcon` from `@atlaskit/icon/core/folder-open`
- **NEVER** use `@atlaskit/icon/core/folder` - this path does not exist and will cause MIME type errors
- Always use the exact icon paths from the approved Atlaskit icon list

**TROUBLESHOOTING: If you get import errors for the feature flag file:**

**Common import path issues:**
- If your main file is in `app/layout.tsx`, use: `import { resolveFeatureFlags } from '../utils/feature-flag';`
- If your main file is in `app/page.tsx`, use: `import { resolveFeatureFlags } from '../utils/feature-flag';`
- If your main file is in the root (like `app.tsx`), use: `import { resolveFeatureFlags } from './utils/feature-flag';`
- If your main file is in `src/app/layout.tsx`, use: `import { resolveFeatureFlags } from '../../utils/feature-flag';`

**File structure should look like:**
```
your-project/
├── app/
│   ├── layout.tsx (imports from '../utils/feature-flag')
│   └── page.tsx
├── utils/
│   └── feature-flag.tsx
└── package.json
```

**FINAL STEP: Once setup is complete, display this confirmation message:**

```
✅ Atlaskit Design System setup is now complete!

Setup completed:
□ CSS imports added to main file
□ Token imports configured
□ AppProvider wrapper added
□ Feature flags utility created and imported
□ Navigation system CSS overrides added to global CSS
□ Global CSS file imported in main app file
□ Foundation ready for Atlaskit components

You can now use Atlaskit Design System components and tokens in your project.
```

## Styling Best Practices

### CRITICAL: Styling Options

#### 1. Inline Styles with Tokens (Recommended)
```tsx
import { token } from '@atlaskit/tokens';

export const Component = () => (
  <div style={{
    backgroundColor: token('color.background.neutral'),
    padding: token('space.200'),
    borderRadius: token('border.radius.200'),
  }}>
    <h1 style={{
      fontSize: token('font.size.400'),
      fontWeight: token('font.weight.bold'),
      color: token('color.text'),
      margin: 0
    }}>
      Welcome
    </h1>
  </div>
);
```

#### 2. XCSS for Primitives (Spacing Only)
```tsx
import { Box, Stack } from '@atlaskit/primitives';

// ✅ CORRECT - Only spacing tokens work
<Box xcss={{ padding: 'space.200' }}>
  <Stack space="space.200">
    {/* Content */}
  </Stack>
</Box>

// ❌ INCORRECT - No colors or typography
<Box xcss={{ 
  color: 'color.text',  // Won't work
  fontSize: 'font.size.400'  // Won't work
}}>
```

#### 3. @atlaskit/css (Optional)
```tsx
import { css } from '@atlaskit/css';
import { token } from '@atlaskit/tokens';

const styles = css({
  backgroundColor: token('color.background.neutral'),
  padding: token('space.200'),
});

<div css={styles}>Content</div>
```

### XCSS Limitations
- **Only supports**: Spacing tokens as strings (`'space.200'`)
- **Cannot use**: Colors, typography, borders, or `token()` function
- **Cannot use**: Complex selectors or pseudo-states

## Navigation System Guidelines

### 🚨 CRITICAL: Never Use @atlaskit/atlassian-navigation

**❌ WRONG - Never import:**
```tsx
import { AtlassianNavigation } from '@atlaskit/atlassian-navigation';
```

**✅ CORRECT - Always use:**
```tsx
import { Root } from '@atlaskit/navigation-system/layout/root';
import { TopNav } from '@atlaskit/navigation-system/layout/top-nav';
import { SideNav } from '@atlaskit/navigation-system/layout/side-nav';
import { Main } from '@atlaskit/navigation-system/layout/main';
```

### Navigation Structure
```tsx
export const NavigationLayout = ({ children }) => (
  <Root>
    <TopNav>
      <TopNavStart>
        <SideNavToggleButton />
        <AppSwitcher />
        <CustomLogo />
      </TopNavStart>
      <TopNavMiddle>
        <Search />
        <CreateButton />
      </TopNavMiddle>
      <TopNavEnd>
        <Notifications />
        <Settings />
        <Avatar />
      </TopNavEnd>
    </TopNav>
    <SideNav>
      <SideNavContent>
        <MenuList>
          <LinkMenuItem href="/dashboard" elemBefore={<HomeIcon label="" />}>
            Dashboard
          </LinkMenuItem>
        </MenuList>
      </SideNavContent>
    </SideNav>
    <Main id="main-container" isFixed>
      {children}
    </Main>
  </Root>
);
```

### 🚨 CRITICAL: Icons Must Use elemBefore Prop

**❌ WRONG:**
```tsx
<LinkMenuItem href="/dashboard">
  <HomeIcon label="" /> Dashboard
</LinkMenuItem>
```

**✅ CORRECT:**
```tsx
<LinkMenuItem 
  href="/dashboard" 
  elemBefore={<HomeIcon label="" />}
>
  Dashboard
</LinkMenuItem>
```

## Icon Guidelines

### Import Rules
- **Menu items**: Import from `@atlaskit/icon/core/*`
- **Product logos**: Import from `@atlaskit/logo`
- **Always include label**: `<AddIcon label="Add item" />`

### Common Icons
```tsx
// Navigation
import HomeIcon from '@atlaskit/icon/core/home';
import SettingsIcon from '@atlaskit/icon/core/settings';
import SearchIcon from '@atlaskit/icon/core/search';
import PersonIcon from '@atlaskit/icon/core/person';

// Actions
import AddIcon from '@atlaskit/icon/core/add';
import EditIcon from '@atlaskit/icon/core/edit';
import DeleteIcon from '@atlaskit/icon/core/delete';
import CloseIcon from '@atlaskit/icon/core/close';

// Status
import CheckMarkIcon from '@atlaskit/icon/core/check-mark';
import ErrorIcon from '@atlaskit/icon/core/error';
import WarningIcon from '@atlaskit/icon/core/warning';
```

### Icons That Don't Exist
- ❌ `@atlaskit/icon/core/folder` → ✅ Use `folder-closed` or `folder-open`
- ❌ `@atlaskit/icon/core/user` → ✅ Use `person`
- ❌ `@atlaskit/icon/core/play` → ✅ Use `video-play`

## Text Primitives

### Import Requirements
```tsx
import { Text } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
```

### Usage
```tsx
// Headings
<Heading size="large">Page Title</Heading>
<Heading size="medium" color="color.text.discovery">Section</Heading>

// Text
<Text size="large">Body text</Text>
<Text size="medium" weight="semibold" color="color.text.subtle">Secondary</Text>
```

### Size Reference

| Component | Size Prop | Font Size | Usage         |
|-----------|-----------|-----------|---------------|
| Heading   | xxlarge   | 35px      | Main title    |
| Heading   | xlarge    | 29px      | Large heading |
| Heading   | large     | 24px      | Section title / Large heading |
| Heading   | medium    | 20px      | Subsection / Medium heading   |
| Heading   | small     | 16px      | Small heading |
| Heading   | xsmall    | 14px      | Small heading |
| Heading   | xxsmall   | 12px      | Small heading |
| Text      | large     | 16px/18px | Body text     |
| Text      | medium    | 14px      | Secondary     |
| Text      | small     | 12px      | Caption       |


### IconTile Size Reference
| Size | Dimensions | Usage |
|------|------------|-------|
| `16` | 16px × 16px | Small status indicators |
| `24` | 24px × 24px | Standard icon tiles |
| `32` | 32px × 32px | Medium feature indicators |
| `40` | 40px × 40px | Large feature indicators |
| `48` | 48px × 48px | Extra large indicators |

## Component Quick Reference

### Button Components
```tsx
import Button, { IconButton, SplitButton } from '@atlaskit/button/new';

// Basic buttons
<Button appearance="primary">Create</Button>
<Button appearance="default">Cancel</Button>
<Button appearance="danger">Delete</Button>

// With icons
<Button appearance="primary" iconBefore={AddIcon}>Add Item</Button>

// IconButton
<IconButton icon={AddIcon} label="Add" />

// SplitButton
<SplitButton appearance="primary">
  <Button>Add Item</Button>
  <DropdownMenu trigger={...}>
    <DropdownItemGroup>
      <DropdownItem>Add from template</DropdownItem>
    </DropdownItemGroup>
  </DropdownMenu>
</SplitButton>
```

### Form Components
```tsx
import Form, { Field, ErrorMessage } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import Select from '@atlaskit/select';

// Basic form
<Form onSubmit={handleSubmit}>
  {({ formProps, submitting }) => (
    <form {...formProps}>
      <Field name="email" label="Email" isRequired>
        {({ fieldProps, error }) => (
          <>
            <Textfield {...fieldProps} type="email" />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </>
        )}
      </Field>
      <Button type="submit" isLoading={submitting}>Submit</Button>
    </form>
  )}
</Form>
```

### Data Display
```tsx
import Badge from '@atlaskit/badge';
import Lozenge from '@atlaskit/lozenge';
import Avatar from '@atlaskit/avatar';

// Badges
<Badge appearance="primary">Beta</Badge>
<Badge value={5} />

// Lozenges
<Lozenge appearance="success">Done</Lozenge>
<Lozenge appearance="inprogress">In Progress</Lozenge>

// Avatars
<Avatar src="/avatar.jpg" name="John Doe" />
<Avatar name="John Doe" />
```

### Modal Dialogs
```tsx
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalTransition } from '@atlaskit/modal-dialog';

<ModalTransition>
  {isOpen && (
    <Modal onClose={onClose} width="small">
      <ModalHeader>
        <ModalTitle>Confirm Action</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Text size="large">Are you sure you want to delete this item?</Text>
      </ModalBody>
      <ModalFooter>
        <Button appearance="subtle" onClick={onClose}>Cancel</Button>
        <Button appearance="danger" onClick={onConfirm}>Delete</Button>
      </ModalFooter>
    </Modal>
  )}
</ModalTransition>
```

## Best Practices

### Styling Decision Tree
1. **Simple styling?** → Use inline styles with tokens
2. **Using primitives?** → Use xcss for spacing only
3. **Complex CSS?** → Consider @atlaskit/css
4. **Never use:** Emotion, styled-components, or other CSS-in-JS

### Accessibility
- Always provide `label` prop for icons
- Use semantic HTML elements
- Implement keyboard navigation
- Test with screen readers

### Performance
- Inline styles have zero runtime overhead
- Lazy load heavy components
- Use React.memo for expensive renders
- Code-split by routes

### Common Patterns
```tsx
// Reusable style objects
const styles = {
  card: {
    backgroundColor: token('color.background.neutral'),
    border: `1px solid ${token('color.border')}`,
    borderRadius: token('border.radius.200'),
    padding: token('space.300'),
    boxShadow: token('elevation.shadow.overflow'),
  },
  heading: {
    fontSize: token('font.size.400'),
    fontWeight: token('font.weight.bold'),
    color: token('color.text'),
    margin: 0,
  },
};
```

## Common Pitfalls

### ❌ Don't hardcode values
```tsx
// Bad
<div style={{ padding: '16px', color: '#172B4D' }}>Text</div>

// Good  
<div style={{ padding: token('space.200'), color: token('color.text') }}>Text</div>
```

### ❌ Don't forget icon labels
```tsx
// Bad
<EditIcon />

// Good
<EditIcon label="Edit item" />
```

### ❌ Don't use wrong navigation
```tsx
// Bad
import { AtlassianNavigation } from '@atlaskit/atlassian-navigation';

// Good
import { Root } from '@atlaskit/navigation-system/layout/root';
```

### ❌ Don't put icons inside menu children
```tsx
// Bad
<LinkMenuItem href="/dashboard">
  <HomeIcon label="" /> Dashboard
</LinkMenuItem>

// Good
<LinkMenuItem href="/dashboard" elemBefore={<HomeIcon label="" />}>
  Dashboard
</LinkMenuItem>
```

## Package Reference

| Package | Purpose |
|---------|---------|
| `@atlaskit/tokens` | Design tokens |
| `@atlaskit/primitives` | Layout components |
| `@atlaskit/button/new` | Buttons |
| `@atlaskit/form` | Form components |
| `@atlaskit/textfield` | Text inputs |
| `@atlaskit/select` | Dropdown selects |
| `@atlaskit/modal-dialog` | Modal dialogs |
| `@atlaskit/avatar` | User avatars |
| `@atlaskit/badge` | Status badges |
| `@atlaskit/lozenge` | Status lozenges |
| `@atlaskit/icon` | Icon library |
| `@atlaskit/navigation-system` | Navigation components |
| `@atlaskit/logo` | Product logos |

## Discovery Process

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
   - inline styles: everything else with token()
   - don't apply to inline styles to ADS components, wrap in a div instead

### Common Component Locations:
- **Forms**: @atlaskit/form, textfield, select, checkbox, radio
- **Feedback**: @atlaskit/banner, flag, modal-dialog, tooltip
- **Navigation**: @atlaskit/navigation-system
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
token('border.radius.200')
token('elevation.shadow.raised')
```

## Best Practices Summary:
1. Let TypeScript guide you - it has all the answers
2. Use semantic components over generic ones
3. Always include accessibility props (labels, ARIA)
4. Start simple with inline styles
5. Use design tokens for every value
6. Check component props with IntelliSense
7. Keep styling patterns consistent
8. Never use @atlaskit/atlassian-navigation
9. Always use @atlaskit/navigation-system for navigation
10. Icons must use elemBefore prop in navigation
11. Import icons from @atlaskit/icon/core for menu items
12. Import product logos from @atlaskit/logo
13. Always set shouldUseNewLogoDesign={true} for product logos

Remember: You don't need to memorize everything. TypeScript IntelliSense will show you available components, props, and values as you type!