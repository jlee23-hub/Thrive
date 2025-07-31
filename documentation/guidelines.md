# Atlassian Design System Development Guidelines

<overview>
This guide will help you build React applications using Atlassian's Design System (Atlaskit). Follow these instructions to ensure consistency with Atlassian's design principles and best practices.
</overview>

<architecture_principles>
- Build with Atlassian's design principles: Bold, Optimistic, and Practical
- Use Atlaskit components over custom implementations
- Follow the 8px grid system for spacing
- Implement proper accessibility from the start
- Use semantic color tokens for theming support
- Keep styling simple with inline styles or Atlassian's official CSS-in-JS solutions
</architecture_principles>

<workflow_steps>
## Step 1: Set Up Your Application
- Install required Atlaskit packages
- Set up the token system
- Import components as needed
- Optionally set up @atlaskit/css for CSS-in-JS

## Step 2: Build with Primitives
Use primitives for layout:
- `Stack` for vertical layouts
- `Inline` for horizontal layouts  
- `Box` for containers with spacing
- `Grid` for complex layouts
</workflow_steps>

<frontend_guidelines>
## Important Frontend Rules
- DO NOT hardcode colors or spacing - use tokens
- Import icons from `@atlaskit/icon/glyph/*`
- Use `token()` function for all design values
- Prefer named imports for better tree-shaking
- Use inline styles for simplicity
- Consider @atlaskit/css for CSS-in-JS needs
</frontend_guidelines>

<styling_guidelines>
## Styling Best Practices

### CRITICAL: Understanding Atlassian's Styling Options

Atlassian provides three official ways to style components:

#### 1. Inline Styles with Tokens (Simplest - Recommended to start)
```tsx
import { token } from '@atlaskit/tokens';
import { Box, Stack } from '@atlaskit/primitives';

// ✅ CORRECT - Simple inline styles
export const Component = () => (
  <Box xcss={{ padding: 'space.200' }}>
    <h1 style={{ 
      fontSize: token('font.size.400'),
      fontWeight: token('font.weight.bold'),
      color: token('color.text'),
      margin: 0 
    }}>
      Welcome
    </h1>
  </Box>
);
```

#### 2. XCSS for Primitives (Limited but safe)
```tsx
import { Box, Stack, xcss } from '@atlaskit/primitives';

// ✅ CORRECT - XCSS for spacing only
const containerStyles = xcss({
  padding: 'space.300',
  margin: 'space.200',
  // Note: Only spacing tokens work as strings
  // Cannot use color, typography, or other tokens here
});

export const Component = () => (
  <Box xcss={containerStyles}>
    <Stack space="space.200">
      {/* Content */}
    </Stack>
  </Box>
);
```

#### 3. @atlaskit/css for CSS-in-JS (Optional - Atlassian's Compiled)
```tsx
import { css } from '@atlaskit/css';
import { token } from '@atlaskit/tokens';

// This uses Atlassian's Compiled CSS-in-JS (zero-runtime)
const styles = css({
  backgroundColor: token('color.background.neutral'),
  padding: token('space.200'),
  borderRadius: token('border.radius.200'),
});

<div css={styles}>Content</div>
```

### XCSS Limitations (Important!)
The `xcss` prop on primitives (Box, Stack, Inline) **only supports**:
- Spacing tokens as strings: `'space.100'`, `'space.200'`
- Basic pseudo-states with the same limitations
- NO color tokens
- NO typography tokens  
- NO token() function usage
- NO complex selectors

### Complete Working Pattern
```tsx
import { token } from '@atlaskit/tokens';
import { Box, Stack, Inline } from '@atlaskit/primitives';
import Button from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';

export const FormExample = () => {
  // Define reusable style objects
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: token('color.background.neutral'),
      borderRadius: token('border.radius.200'),
      boxShadow: token('elevation.shadow.raised'),
      padding: token('space.400'),
    },
    heading: {
      fontSize: token('font.size.400'),
      fontWeight: token('font.weight.bold'),
      color: token('color.text'),
      margin: 0,
      marginBottom: token('space.200'),
    },
    label: {
      fontSize: token('font.size.100'),
      fontWeight: token('font.weight.medium'),
      color: token('color.text'),
      marginBottom: token('space.050'),
    },
    helperText: {
      fontSize: token('font.size.075'),
      color: token('color.text.subtle'),
      marginTop: token('space.050'),
    },
  };

  return (
    <div style={styles.container}>
      <Stack space="space.300">
        <h1 style={styles.heading}>Create New Project</h1>

        <div>
          <label style={styles.label}>Project Name</label>
          <Textfield placeholder="Enter project name" />
          <p style={styles.helperText}>
            Choose a descriptive name for your project
          </p>
        </div>

        <Inline space="space.100">
          <Button appearance="primary">Create</Button>
          <Button>Cancel</Button>
        </Inline>
      </Stack>
    </div>
  );
};
```

### Icon Usage
```tsx
import AddIcon from '@atlaskit/icon/glyph/add';
import { token } from '@atlaskit/tokens';

// ✅ CORRECT - Always include label
<AddIcon 
  label="Add item"
  size="medium"
  primaryColor={token('color.icon.brand')}
/>

// ❌ INCORRECT - Missing label
<AddIcon />
```

### Common Style Patterns
```tsx
// Reusable style objects
const commonStyles = {
  card: {
    backgroundColor: token('color.background.neutral'),
    border: `1px solid ${token('color.border')}`,
    borderRadius: token('border.radius.200'),
    padding: token('space.300'),
    boxShadow: token('elevation.shadow.overflow'),
  },
  primaryHeading: {
    fontSize: token('font.size.500'),
    fontWeight: token('font.weight.bold'),
    lineHeight: token('font.lineHeight.500'),
    color: token('color.text'),
    margin: 0,
  },
  secondaryHeading: {
    fontSize: token('font.size.300'),
    fontWeight: token('font.weight.semibold'),
    lineHeight: token('font.lineHeight.300'),
    color: token('color.text'),
    margin: 0,
  },
  bodyText: {
    fontSize: token('font.size.100'),
    lineHeight: token('font.lineHeight.200'),
    color: token('color.text'),
    margin: 0,
  },
  subtleText: {
    fontSize: token('font.size.075'),
    color: token('color.text.subtle'),
    margin: 0,
  },
};
```
</styling_guidelines>

<atlaskit_packages>
| Package | Purpose | 
|---------|---------|
| `@atlaskit/tokens` | Design tokens for colors, spacing, etc. |
| `@atlaskit/primitives` | Layout components (Box, Stack, Inline, Grid) |
| `@atlaskit/button` | Buttons and button groups |
| `@atlaskit/form` | Form components and validation |
| `@atlaskit/textfield` | Text input fields |
| `@atlaskit/select` | Dropdown selects |
| `@atlaskit/modal-dialog` | Modal dialogs |
| `@atlaskit/flag` | Notification flags |
| `@atlaskit/banner` | Page-level messages |
| `@atlaskit/dynamic-table` | Data tables |
| `@atlaskit/avatar` | User avatars |
| `@atlaskit/badge` | Status badges |
| `@atlaskit/lozenge` | Status lozenges |
| `@atlaskit/tag` | Tags and labels |
| `@atlaskit/icon` | Icon library |
| `@atlaskit/css` | (Optional) Compiled CSS-in-JS |
</atlaskit_packages>

<example_implementations>
## Common Component Patterns

### Simple Card Component
```tsx
import { token } from '@atlaskit/tokens';
import { Box, Stack, Inline } from '@atlaskit/primitives';
import Button from '@atlaskit/button';
import Badge from '@atlaskit/badge';

export const Card = ({ title, description, status }) => {
  const cardStyle = {
    backgroundColor: token('color.background.neutral'),
    border: `1px solid ${token('color.border')}`,
    borderRadius: token('border.radius.200'),
    padding: token('space.300'),
    boxShadow: token('elevation.shadow.overflow'),
  };

  const titleStyle = {
    fontSize: token('font.size.200'),
    fontWeight: token('font.weight.semibold'),
    color: token('color.text'),
    margin: 0,
    marginBottom: token('space.100'),
  };

  const descriptionStyle = {
    fontSize: token('font.size.100'),
    color: token('color.text.subtle'),
    margin: 0,
    marginBottom: token('space.200'),
  };

  return (
    <div style={cardStyle}>
      <Stack space="space.200">
        <Inline spread="space-between" alignBlock="center">
          <h3 style={titleStyle}>{title}</h3>
          <Badge appearance="primary">{status}</Badge>
        </Inline>
        <p style={descriptionStyle}>{description}</p>
        <Inline space="space.100">
          <Button appearance="primary" spacing="compact">View</Button>
          <Button spacing="compact">Edit</Button>
        </Inline>
      </Stack>
    </div>
  );
};
```

### Navigation Pattern
```tsx
import { token } from '@atlaskit/tokens';
import { Inline, Stack } from '@atlaskit/primitives';
import Button from '@atlaskit/button';
import HomeIcon from '@atlaskit/icon/glyph/home';
import SettingsIcon from '@atlaskit/icon/glyph/settings';

export const Navigation = () => {
  const navStyle = {
    backgroundColor: token('color.background.neutral'),
    borderBottom: `1px solid ${token('color.border')}`,
    padding: token('space.200'),
  };

  const logoStyle = {
    fontSize: token('font.size.300'),
    fontWeight: token('font.weight.bold'),
    color: token('color.text.brand'),
    margin: 0,
  };

  return (
    <nav style={navStyle}>
      <Inline spread="space-between" alignBlock="center">
        <h1 style={logoStyle}>MyApp</h1>
        <Inline space="space.100">
          <Button 
            iconBefore={<HomeIcon label="Home" />}
            appearance="subtle"
          >
            Home
          </Button>
          <Button 
            iconBefore={<SettingsIcon label="Settings" />}
            appearance="subtle"
          >
            Settings
          </Button>
        </Inline>
      </Inline>
    </nav>
  );
};
```
</example_implementations>

<forbidden_changes>
## NEVER Modify These Patterns:
- Token system configuration - Use tokens as provided
- Component APIs - Don't wrap Atlaskit components unnecessarily  
- Accessibility props - Always include required ARIA labels
- Grid system - Stick to 8px increments
</forbidden_changes>

<best_practices>
## Best Practices

### Styling Approach Decision Tree
1. **Need simple styling?** → Use inline styles with tokens
2. **Using primitives?** → Use xcss for spacing only
3. **Need complex CSS?** → Consider @atlaskit/css
4. **Never use:** Emotion, styled-components, or other CSS-in-JS libraries

### Accessibility
- Always provide `label` prop for icons
- Use semantic HTML elements
- Implement keyboard navigation
- Test with screen readers
- Ensure proper focus management

### Performance
- Inline styles have zero runtime overhead
- Lazy load heavy components
- Use React.memo for expensive renders
- Implement virtualization for long lists
- Code-split by routes

### Responsive Design
- Use primitives for responsive layouts
- Test on various screen sizes
- Consider mobile-first approach
- Use appropriate touch targets
</best_practices>

<common_pitfalls>
## Common Pitfalls to Avoid

### ❌ Don't use token() in xcss
```tsx
// Bad
<Box xcss={{ color: token('color.text') }}>Text</Box>

// Good - use inline styles for non-spacing values
<Box xcss={{ padding: 'space.200' }}>
  <p style={{ color: token('color.text') }}>Text</p>
</Box>
```

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

### ❌ Don't use external CSS-in-JS libraries
```tsx
// Bad - Don't use Emotion
import { css } from '@emotion/react';

// Bad - Don't use styled-components  
import styled from 'styled-components';

// Good - Use Atlassian's approach
import { token } from '@atlaskit/tokens';
// Optionally: import { css } from '@atlaskit/css';
```
</common_pitfalls>