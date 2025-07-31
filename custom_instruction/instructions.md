# Atlassian Design System - Key Considerations

## Overview
This guide focuses on key considerations and decision-making when working with Atlassian's Design System. For setup steps and implementation details, refer to the guidelines file.

## 🚨 MANDATORY SETUP STEPS (ONE-TIME CONFIGURATION)

**CRITICAL: Every app using Atlaskit Design System MUST complete these setup steps first.**

### Step 1: Install Required Packages
```bash
npm install @atlaskit/tokens @atlaskit/primitives @atlaskit/button @atlaskit/form @atlaskit/textfield @atlaskit/select @atlaskit/modal-dialog @atlaskit/avatar @atlaskit/badge @atlaskit/lozenge @atlaskit/icon @atlaskit/navigation-system @atlaskit/logo @atlaskit/app-provider @atlaskit/platform-feature-flags
```

### Step 2: Import App Provider (ONE-TIME SETUP)
**CRITICAL: Only include these imports once. If the imports already exist then skip this step entirely.**

```tsx
import AppProvider from "@atlaskit/app-provider";
```

**Add AppProvider to main file (ONE-TIME SETUP)**
You must wrap the main app in an `<AppProvider>` **only if it's not already wrapped**

```tsx
<AppProvider>...</AppProvider>
```

### Step 3: Import Tokens (IN EVERY FILE)
**NOTE: Include the import below in every file created, but only if it doesn't already exist.**

```tsx
import { token } from "@atlaskit/tokens";
```

### Step 4: Feature Flag Setup (ONE-TIME SETUP)
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

### Step 5: CSS Setup for Navigation (ONE-TIME SETUP)
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

## Design Philosophy

### Core Principles
- **Bold**: Make confident design decisions that drive clarity
- **Optimistic**: Create positive, encouraging experiences  
- **Practical**: Build functional, efficient interfaces that get work done

### Design System Philosophy
Atlassian's design system prioritizes:
- **Consistency** over customization
- **Accessibility** from the start
- **Performance** through zero-runtime styling
- **Semantic meaning** over visual styling

## 🚨 CRITICAL: Strict Component Usage Rules

### Button Component Rules

#### 1. Always Use @atlaskit/button/new
**❌ NEVER use:**
```tsx
import Button from '@atlaskit/button';
```

**✅ ALWAYS use:**
```tsx
import Button, { IconButton } from '@atlaskit/button/new';
```

#### 2. Icon-Only Buttons Must Use IconButton
**❌ WRONG - Never use iconOnly prop:**
```tsx
<Button iconBefore={AddIcon} iconOnly>
  Add
</Button>
```

**✅ CORRECT - Use IconButton component:**
```tsx
<IconButton icon={AddIcon} label="Add item" />
```

#### 3. Button with Icon and Text
**✅ CORRECT - Use iconBefore/iconAfter props:**
```tsx
<Button appearance="primary" iconBefore={AddIcon}>
  Create Item
</Button>

<Button appearance="default" iconAfter={EditIcon}>
  Edit
</Button>
```

### IconTile Component Rules

#### 1. Use IconTile for Icons in Colored Boxes
**❌ WRONG - Don't use IconButton for colored icon boxes:**
```tsx
<IconButton 
  icon={AddIcon} 
  label="Add"
  style={{ 
    backgroundColor: token('color.background.accent.blue'),
    borderRadius: '50%',
    padding: token('space.100')
  }}
/>
```

**✅ CORRECT - Use IconTile for icons in colored containers:**
```tsx
import { IconTile } from '@atlaskit/icon';
import AddIcon from '@atlaskit/icon/core/add';

<IconTile 
  icon={AddIcon} 
  label="Add icon" 
  appearance="blue" 
  shape="circle" 
  size="24" 
/>
```

#### 2. IconTile Usage Guidelines
```tsx
// Status indicators (icon only)
<IconTile 
  icon={CheckMarkIcon} 
  label="Success status" 
  appearance="green" 
  shape="circle" 
  size="24" 
/>

// Category indicators (icon only)
<IconTile 
  icon={BugIcon} 
  label="Bug category" 
  appearance="red" 
  shape="square" 
  size="24" 
/>

// Feature indicators (icon only)
<IconTile 
  icon={AutomationIcon} 
  label="Automation feature" 
  appearance="blueBold" 
  shape="circle" 
  size="40" 
/>
```

#### 3. IconTile Size Reference
| Size | Dimensions | Usage |
|------|------------|-------|
| `16` | 16px × 16px | Small status indicators |
| `24` | 24px × 24px | Standard icon tiles |
| `32` | 32px × 32px | Medium feature indicators |
| `40` | 40px × 40px | Large feature indicators |
| `48` | 48px × 48px | Extra large indicators |

#### 4. IconTile Appearance Options
```tsx
// Color appearances
<IconTile appearance="blue" />      // Blue background
<IconTile appearance="green" />     // Green background
<IconTile appearance="red" />       // Red background
<IconTile appearance="yellow" />    // Yellow background
<IconTile appearance="purple" />    // Purple background
<IconTile appearance="blueBold" />  // Bold blue background
<IconTile appearance="greenBold" /> // Bold green background
<IconTile appearance="redBold" />   // Bold red background
```

#### 5. IconTile Shape Options
```tsx
// Shape options
<IconTile shape="circle" />   // Circular background
<IconTile shape="square" />   // Square background
```

### Text Component Rules

#### 1. Replace All p and span Tags with Text Primitive
**❌ WRONG - Never use HTML text tags:**
```tsx
<p>This is body text</p>
<span>This is small text</span>
<div>This is some content</div>
```

**✅ CORRECT - Use Text primitive:**
```tsx
import { Text } from '@atlaskit/primitives';

<Text size="large">This is body text</Text>
<Text size="small">This is small text</Text>
<Text size="medium">This is medium text</Text>
```

#### 2. Text Size Guidelines
```tsx
// Large text (16px) - Main body content
<Text size="large">Main body text content</Text>

// Medium text (14px) - Secondary content
<Text size="medium">Secondary information</Text>

// Small text (12px) - Captions, metadata
<Text size="small">Caption or metadata</Text>
```

### Heading Component Rules

#### 1. Replace All h1, h2, h3, etc. with Heading Component
**❌ WRONG - Never use HTML heading tags:**
```tsx
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
```

**✅ CORRECT - Use Heading component:**
```tsx
import Heading from '@atlaskit/heading';

<Heading size="xxlarge">Page Title</Heading>
<Heading size="large">Section Title</Heading>
<Heading size="medium">Subsection Title</Heading>
```

#### 2. Heading Size Guidelines
```tsx
// Extra extra large (32px) - Main page title
<Heading size="xxlarge">Main Page Title</Heading>

// Large (24px) - Section titles
<Heading size="large">Section Title</Heading>

// Medium (20px) - Subsection titles
<Heading size="medium">Subsection Title</Heading>
```

### Complete Example of Proper Usage
```tsx
import { Text } from '@atlaskit/primitives';
import Heading from '@atlaskit/heading';
import Button, { IconButton } from '@atlaskit/button/new';
import { IconTile } from '@atlaskit/icon';
import AddIcon from '@atlaskit/icon/core/add';
import EditIcon from '@atlaskit/icon/core/edit';
import CheckMarkIcon from '@atlaskit/icon/core/check-mark';

// ✅ CORRECT - Proper component usage
<div>
  <Heading size="large">Project Dashboard</Heading>
  
  <Text size="large">
    Welcome to your project dashboard. Here you can manage your tasks and track progress.
  </Text>
  
  <Text size="medium" color="color.text.subtle">
    Last updated 2 hours ago
  </Text>
  
  <Button appearance="primary" iconBefore={AddIcon}>
    Create New Task
  </Button>
  
  <IconButton icon={EditIcon} label="Edit project" />
  
  {/* IconTile for status indicators */}
  <IconTile 
    icon={CheckMarkIcon} 
    label="Completed status" 
    appearance="green" 
    shape="circle" 
    size="24" 
  />
</div>
```

## Critical Design Decisions

### 1. Styling Approach Selection

**When to use each styling method:**

#### Inline Styles with Tokens (Recommended for most cases)
- ✅ **Use when**: Building new components, converting existing code, need full control
- ✅ **Benefits**: Zero runtime overhead, full token access, simple debugging
- ❌ **Avoid when**: Need complex CSS selectors or pseudo-states

#### XCSS for Primitives (Limited but safe)
- ✅ **Use when**: Working with Stack, Inline, Box, Grid components
- ✅ **Benefits**: Type-safe spacing, consistent with primitives
- ❌ **Limitations**: Only spacing tokens, no colors/typography

#### @atlaskit/css (Optional for complex cases)
- ✅ **Use when**: Need complex selectors, pseudo-states, or CSS-in-JS features
- ✅ **Benefits**: Compiled CSS-in-JS, full CSS features
- ❌ **Consider**: Adds dependency, more complex setup

### 2. Component Selection Strategy

**Decision tree for choosing components:**

1. **Does Atlaskit have a component for this?**
   - Yes → Use Atlaskit component
   - No → Build custom component with tokens

2. **Is it a layout concern?**
   - Yes → Use primitives (Stack, Inline, Box, Grid)
   - No → Use semantic components

3. **Is it a form element?**
   - Yes → Use @atlaskit/form with Field wrapper
   - No → Use standalone components

4. **Is it text content?**
   - Yes → Use Text primitive (never p or span)
   - No → Use appropriate component

5. **Is it a heading?**
   - Yes → Use Heading component (never h1, h2, etc.)
   - No → Use appropriate component

6. **Is it a button with only an icon?**
   - Yes → Use IconButton (never Button with iconOnly)
   - No → Use Button with iconBefore/iconAfter

### 3. Navigation Architecture

**Critical decisions for navigation:**

#### Navigation System vs Custom Navigation
- **Use Navigation System when**: Building full applications, need consistent Atlassian experience
- **Use Custom Navigation when**: Building embedded components, need minimal navigation

#### Icon Placement Strategy
- **Always use elemBefore**: For navigation menu items
- **Never put icons in children**: Breaks accessibility and layout

## Icon Guidelines

### 🚨 CRITICAL: Icon Usage Rules

**ONLY USE ICONS FROM THE APPROVED LIST**
- You MUST NOT use any icon not explicitly listed in the approved icon list
- You MUST NOT create or suggest custom icons
- You MUST NOT use legacy icons from @atlaskit/icon/glyph or other deprecated packages
- **You MUST NOT hallucinate or invent icon names or paths**
- **ALWAYS verify the exact icon name and path exists before suggesting it**

### 🚨 CRITICAL CONSTRAINTS - ABSOLUTELY MANDATORY

**Common non-existent icons that will break the app:**
- ❌ `@atlaskit/icon/core/folder` → ✅ Use `@atlaskit/icon/core/folder-closed` or `@atlaskit/icon/core/folder-open`
- ❌ `@atlaskit/icon/core/user` → ✅ Use `@atlaskit/icon/core/person`
- ❌ `@atlaskit/icon/core/play` → ✅ Use `@atlaskit/icon/core/video-play`
- ❌ `@atlaskit/icon/core/arrow` → ✅ Use specific direction: `@atlaskit/icon/core/arrow-right`, `@atlaskit/icon/core/arrow-left`, etc.
- ❌ `@atlaskit/icon/core/chevron` → ✅ Use specific direction: `@atlaskit/icon/core/chevron-down`, `@atlaskit/icon/core/chevron-up`, etc.
- ❌ `@atlaskit/icon/core/check` → ✅ Use `@atlaskit/icon/core/check-mark`
- ❌ `@atlaskit/icon/core/eye` → ✅ Use `@atlaskit/icon/core/eye-open`
- ❌ `@atlaskit/icon/core/lock` → ✅ Use `@atlaskit/icon/core/lock-locked` or `@atlaskit/icon/core/lock-unlocked`

### Icon Import Rules
- **Menu items**: Import from `@atlaskit/icon/core/*`
- **Product logos**: Import from `@atlaskit/logo`
- **Always include label**: `<AddIcon label="Add item" />`
- **Always use specific core paths**: `import AddIcon from '@atlaskit/icon/core/add'`

### Icon Selection Process
1. **Search the approved list first** - Verify the exact icon name exists
2. **Check for state variations** - Are there different states (open/closed, checked/unchecked, etc.)?
3. **Verify direction specificity** - Do you need a specific direction (left, right, up, down)?
4. **Consider context** - Is this for status, navigation, actions, or objects?
5. **Check import path** - Does it follow `@atlaskit/icon/core/[exact-name]`?

### 🚨 MANDATORY VERIFICATION PROCESS
**Before suggesting ANY icon, you MUST:**
1. **FIRST** - Search for the exact icon name in the approved icon list
2. **SECOND** - Verify the component name matches exactly (case-sensitive)
3. **THIRD** - Confirm the package path follows the pattern: `@atlaskit/icon/core/[icon-name]`
4. **FOURTH** - If the icon doesn't exist, consult the Component Reference Table to find an appropriate alternative
5. **NEVER** suggest an icon that is not in the approved list

**For complete icon reference and approved list, see: `modules/use-icon-replit.md`**

## Token Philosophy

### Design Token Hierarchy
1. **Semantic tokens** (preferred) - `color.text`, `color.background.neutral`
2. **Specific tokens** (when needed) - `color.icon.brand`, `color.border.focus`
3. **Never hardcode values** - Always use tokens for consistency

### Token Selection Guidelines
- **Colors**: Start with semantic tokens, use specific tokens for special cases
- **Spacing**: Use 8px grid system (`space.100`, `space.200`, etc.)
- **Typography**: Use Text/Heading components over inline styles
- **Shadows**: Use elevation tokens for depth hierarchy

## Accessibility Considerations

### Critical Accessibility Rules
1. **Always include labels** for icons and interactive elements
2. **Use semantic HTML** through Atlaskit components
3. **Test keyboard navigation** for all interactive elements
4. **Ensure color contrast** through semantic tokens
5. **Provide alternative text** for images and icons

### Screen Reader Support
- Atlaskit components include built-in accessibility features
- Use `label` prop for all icons
- Test with screen readers during development
- Ensure proper heading hierarchy

## Performance Considerations

### Styling Performance
- **Inline styles**: Zero runtime overhead, recommended
- **XCSS**: Compiled at build time, very fast
- **@atlaskit/css**: Compiled CSS-in-JS, no runtime cost
- **Avoid**: Emotion, styled-components, or other runtime CSS-in-JS

### Component Performance
- **Lazy load** heavy components (modals, complex forms)
- **Use React.memo** for expensive renders
- **Code-split** by routes and features
- **Optimize bundle size** by importing specific components

## Common Anti-Patterns

### ❌ What NOT to do

#### Button Anti-Patterns
```tsx
// ❌ WRONG - Using old button import
import Button from '@atlaskit/button';

// ❌ WRONG - Using iconOnly prop instead of IconButton
<Button iconBefore={AddIcon} iconOnly>
  Add
</Button>

// ❌ WRONG - Using IconButton for buttons with text
<IconButton icon={AddIcon} label="Add">
  Create Item
</IconButton>
```

#### Text Anti-Patterns
```tsx
// ❌ WRONG - Using HTML text tags
<p>This is body text</p>
<span>This is small text</span>
<h1>This is a heading</h1>
<h2>This is a subheading</h2>

// ❌ WRONG - Using inline styles for text
<div style={{ fontSize: '16px', color: '#172B4D' }}>
  This is text
</div>
```

#### Styling Anti-Patterns
```tsx
// ❌ Don't hardcode values
<div style={{ padding: '16px', color: '#172B4D' }}>

// ❌ Don't use external CSS-in-JS
import { css } from '@emotion/react';

// ❌ Don't use deprecated navigation
import { AtlassianNavigation } from '@atlaskit/atlassian-navigation';
```

#### Component Anti-Patterns
```tsx
// ❌ Don't forget icon labels
<EditIcon />

// ❌ Don't put icons in menu children
<LinkMenuItem href="/dashboard">
  <HomeIcon label="" /> Dashboard
</LinkMenuItem>

// ❌ Don't use wrong import paths
import AddIcon from '@atlaskit/icon/glyph/add';
```

#### Icon Anti-Patterns
```tsx
// ❌ Don't use non-existent icons
import FolderIcon from '@atlaskit/icon/core/folder';
import UserIcon from '@atlaskit/icon/core/user';
import PlayIcon from '@atlaskit/icon/core/play';

// ❌ Don't use deprecated paths
import AddIcon from '@atlaskit/icon/glyph/add';

// ❌ Don't forget labels
<AddIcon />
```

## Decision-Making Framework

### When Building New Features

1. **Start with TypeScript IntelliSense**
   - Let the type system guide your component selection
   - Explore available props and options

2. **Choose the right styling approach**
   - Simple styling → Inline styles with tokens
   - Layout spacing → XCSS with primitives
   - Complex CSS → @atlaskit/css

3. **Follow the component hierarchy**
   - Layout → Primitives (Stack, Inline, Box, Grid)
   - Content → Text/Heading components
   - Interactions → Atlaskit components
   - Custom → Build with tokens

4. **Test accessibility early**
   - Include labels for all icons
   - Test keyboard navigation
   - Verify screen reader compatibility

5. **Verify icon selection**
   - Check approved icon list first
   - Use exact icon names and paths
   - Include proper labels

6. **Use correct button patterns**
   - Icon-only buttons → IconButton
   - Buttons with text → Button with iconBefore/iconAfter
   - Always import from @atlaskit/button/new

7. **Use text primitives**
   - All text content → Text component
   - All headings → Heading component
   - Never use HTML p, span, h1, h2, etc.

8. **Never add style props to primitives**
   - **❌ WRONG** - Never use style props on Box, Stack, Inline, Grid
   - **✅ CORRECT** - Wrap primitives in div with inline styles when additional styling needed
   - **Example:**
     ```tsx
     // ❌ WRONG
     <Box style={{ backgroundColor: token('color.background.neutral') }}>
       Content
     </Box>
     
     // ✅ CORRECT
     <div style={{ backgroundColor: token('color.background.neutral') }}>
       <Box>
         Content
       </Box>
     </div>
     ```

### When Converting Existing Code

1. **Map existing patterns to Atlaskit**
   - CSS classes → Inline styles with tokens
   - Custom components → Atlaskit equivalents
   - Layout divs → Primitives

2. **Preserve semantic meaning**
   - Use appropriate Text/Heading components
   - Maintain accessibility features
   - Keep interaction patterns

3. **Optimize for performance**
   - Remove unnecessary dependencies
   - Use zero-runtime styling
   - Leverage built-in optimizations

4. **Verify icon migrations**
   - Check if icons exist in approved list
   - Use correct import paths
   - Add proper labels

5. **Update button usage**
   - Replace iconOnly buttons with IconButton
   - Update button imports to @atlaskit/button/new
   - Ensure proper icon placement

6. **Replace HTML text tags**
   - p tags → Text component
   - span tags → Text component
   - h1, h2, etc. → Heading component

## Key Takeaways

### Remember These Critical Points:
1. **TypeScript is your guide** - Use IntelliSense for discovery
2. **Tokens over hardcoded values** - Always use design tokens
3. **Semantic over visual** - Choose components for meaning, not appearance
4. **Accessibility first** - Include labels and test with screen readers
5. **Performance matters** - Use zero-runtime styling approaches
6. **Navigation system only** - Never use @atlaskit/atlassian-navigation
7. **Icons in elemBefore** - Never put icons in menu item children
8. **Verify icons exist** - Always check approved icon list before suggesting
9. **Use exact icon paths** - Follow `@atlaskit/icon/core/[exact-name]` pattern
10. **Include icon labels** - Always add meaningful labels for accessibility
11. **IconButton for icon-only** - Never use Button with iconOnly prop
12. **Button/new only** - Never use @atlaskit/button, always use @atlaskit/button/new
13. **Text primitive for text** - Never use p or span tags, always use Text component
14. **Heading component for headings** - Never use h1, h2, etc., always use Heading component
15. **No style props on primitives** - Never add style props to Box, Stack, Inline, Grid; wrap in div instead

### Success Metrics:
- ✅ Components use semantic tokens
- ✅ All icons have labels
- ✅ Navigation uses @atlaskit/navigation-system
- ✅ Styling uses tokens, not hardcoded values
- ✅ Accessibility features are included
- ✅ Performance is optimized
- ✅ Icons are from approved list only
- ✅ Icon import paths are correct
- ✅ Icon labels are meaningful and accessible
- ✅ Icon-only buttons use IconButton component
- ✅ All buttons import from @atlaskit/button/new
- ✅ All text content uses Text primitive
- ✅ All headings use Heading component
- ✅ No HTML p, span, h1, h2, etc. tags used

The Atlassian Design System is designed to make building consistent, accessible, and performant applications easier. Focus on the principles and let the system guide your decisions.

**For complete icon reference and approved list, see: `modules/use-icon-replit.md`**