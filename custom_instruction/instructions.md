# Atlassian Design System - Key Considerations

## Overview
This guide focuses on key considerations and decision-making when working with Atlassian's Design System. For setup steps and implementation details, refer to the guidelines file.

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

The Atlassian Design System is designed to make building consistent, accessible, and performant applications easier. Focus on the principles and let the system guide your decisions.

**For complete icon reference and approved list, see: `modules/use-icon-replit.md`**