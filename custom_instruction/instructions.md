# Vibe coding tool guidelines

## Core Principle: ADS First, Always

**Default Approach**: Always attempt to use Atlassian Design System (@atlaskit) components, tokens, and icons FIRST before considering alternatives. Only fall back to custom solutions like lucide-react, shadcn or radix when ADS doesn't provide the needed functionality.

**Priority**: Preserve existing design and functionality
**Priority**: Use design tokens first → Tailwind classes for missing tokens → inline styles as last resort
**Priority**: ADS components first → Shadcn for anything missing → custom components as a last resort

## Quick Navigation Guide

### 🎨 **Colors**
- **First**: Use ADS design tokens for all colors
- **NEVER USE**: Hex values like `#FFFFFF`
- **Reference**: Colors section for available tokens and tailwind references
- **Fallback**: Tailwind classes only when no appropriate token exists

### 🆎  **Headings**
- **NEVER USE** native html heading elements like `<h1>`,`
- **Instead** use ADS Heading component
- **Fallback**: Custom text styling only if ADS doesn't cover the use case

### **Text**
- **NEVER USE** native html heading elements like `<p>`,`<span>`,`<div>`
- **Instead** use ADS Text primitive
- **Fallback**: Custom text styling only if ADS doesn't cover the use case

### 🎨 **Padding, marging, gaps**
- **NEVER USE** pixel or rem values for padding, margin or gap 
- **Instead** use space tokens like `space.100` instead
- **Fallback**: Custom tailwind spacing if ADS doesn't cover the use case

### 🎨 **Lozenge**
- **Never** use custom lozenge implementations with Tailwind
- **Always** import from `@atlaskit/lozenge`
- **Always** use semantic appearances for consistent meaning

### 🎨 **Buttons**
- **Never** use native `<button>` elements with Tailwind classes
- **Always** import from `@atlaskit/button/new`
- **Instead**: use Button for buttons with text and icons, use IconButon for icon only buttons without a label, and use DropdownMenu for buttons with a chevron appended

### 🧭 **Navigation Systems**
- **Template Pre-configured**: Navigation system (top header + side nav) is already set up in the template
- **DO NOT MODIFY**: Keep the existing TopNavigation and SideNavigation components as-is
- **Focus Area**: Only modify the main content area inside the navigation shell

### 📐 **Layout & Structure**
- **Always**: Use divs with inline styles and spacing tokens for anything autolayout or layout

### 🎯 **Icons**
- **NEVER** use an icon from `@atlaskit/icon/glyph/`, this is deprecated
- **ALWAYS** use an icon from `@atlaskit/icon/core/` and `@atlaskit/icon-lab/core/`
- **First**: Use ADS icon library exclusively
- **Navigate to**: #icons for icon implementation
- **Process**: Always search ADS icons before considering alternatives
- **NEVER** suggest icons not listed below
- **NEVER** invent or guess icon names
- **ALWAYS** verify the exact icon name exists

## Decision Tree

```
Need UI Element?
├── Check ADS Components → Found? → Use ADS
├── Check ADS Tokens → Found? → Use Tokens
├── Check ADS Icons → Found? → Use Icons
└── No ADS Solution? → Document why + Create minimal custom solution
```

## Key Reminders

1. **Top Navigation is locked** - Only modify `navigationConfig`, don't modify the React elements
2. **Side Navigation outer shell is locked** - Only modify what is inside `<SideNavContent>`
3. **Always start with ADS** - Don't assume something isn't available
4. **Use the guidelines** - They contain working examples and best practices
5. **Tokens over hardcoded values** - Always prefer design tokens
6. **Compose before creating** - Try combining ADS components before building custom
7. **Document exceptions** - If you can't use ADS, explain why

---

*Remember: The goal is consistent, accessible, and maintainable Atlassian experiences. ADS provides this foundation.*


- [Design System Documentation](https://atlassian.design/)
- [Component Library](https://atlassian.design/components)
- [Design Tokens](https://atlassian.design/foundations/design-tokens)
- [Accessibility Guidelines](https://atlassian.design/foundations/accessibility)
