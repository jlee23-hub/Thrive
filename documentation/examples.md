## avatar-examples

# Avatar Component Examples

## Basic example
```tsx
import Avatar from '@atlaskit/avatar';

<Avatar src="/avatar.jpg" name="John Doe" />
```

## Key Props

| Prop | Type | Description |
|------|------|-------------|
| `src` | `string` | URL of the avatar image |
| `name` | `string` | Name for fallback initials |
| `appearance` | `'circle' \| 'square'` | Shape of the avatar |
| `size` | `'xsmall' \| 'small' \| 'medium' \| 'large' \| 'xlarge'` | Size of the avatar |
| `onClick` | `() => void` | Click handler for interactive avatars |

## Other examples
```tsx
// Square appearance
<Avatar src="/avatar.jpg" name="John Doe" appearance="square" />

// Different sizes
<Avatar name="John Doe" size="xsmall" />
<Avatar name="John Doe" size="medium" />
<Avatar name="John Doe" size="large" />

// Clickable avatar
<Avatar 
  name="John Doe" 
  onClick={() => console.log('Avatar clicked')}
/>
```


---

## button-examples

# Button Component Examples

## Basic example
```tsx
import Button from '@atlaskit/button/new';

<Button>Create Project</Button>
```

## Other examples
```tsx
// Secondary options
<Button appearance="subtle">Learn More</Button>

// Delete confirmation
<Button appearance="danger">Delete Item</Button>

// Remove from list
<Button appearance="danger" iconBefore={TrashIcon}>
  Remove
</Button>

// Button with Icon
import AddIcon from "@atlaskit/icon/core/add-icon";
<Button appearance="primary" iconBefore={AddIcon}>
  New Item
</Button>

// Button loading
import AddIcon from "@atlaskit/icon/core/add-icon";

<Button appearance="primary" isLoading={true}>
  Submit
</Button>
```

---

## icon-button-examples

# IconButton Component Examples

## Basic example
```tsx
import { IconButton } from '@atlaskit/button/new';
import MoreIcon from '@atlaskit/icon/core/more';

<IconButton 
  icon={MoreIcon} 
  label="Show more options" 
  onClick={() => setShowMenu(true)} 
/>
```

## Key Props

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `ReactNode` | Icon component to display |
| `label` | `string` | Accessible label for screen readers |
| `appearance` | `'default' \| 'primary' \| 'subtle' \| 'danger'` | Visual style of the button |
| `spacing` | `'default' \| 'compact'` | Spacing around the button |
| `shape` | `'square' \| 'circle'` | Shape of the button |

## Other examples
```tsx
// Different appearances
<IconButton icon={AddIcon} label="Add new item" appearance="primary" />
<IconButton icon={InfoIcon} label="Show information" appearance="subtle" />
<IconButton icon={TrashIcon} label="Delete permanently" appearance="danger" />

// Different sizes
<IconButton icon={InfoIcon} label="Show information" appearance="subtle" spacing="compact" />

// Different shapes
<IconButton icon={InfoIcon} label="Show information" appearance="subtle" shape="circle" />

// Menu trigger
<IconButton 
  icon={MoreIcon} 
  label="Show more options" 
  onClick={() => setShowMenu(true)} 
/>
```

---

## link-button-examples

# LinkButton Component Examples

## Basic example
```tsx
import LinkButton from '@atlaskit/button/new';

<LinkButton href="/about" appearance="subtle">
  About Page
</LinkButton>
```

## Key Props

| Prop | Type | Description |
|------|------|-------------|
| `href` | `string \| object` | URL string or router configuration object |
| `appearance` | `'default' \| 'primary' \| 'subtle' \| 'warning' \| 'danger'` | Visual style of the button |
| `target` | `string` | Link target attribute |
| `isDisabled` | `boolean` | Removes href and adds aria-disabled |

## Other examples
```tsx
// External link
<LinkButton
  href="https://atlassian.com"
  target="_blank"
  appearance="subtle"
>
  External Link
</LinkButton>

// Router integration
<LinkButton
  href={{
    to: '/about',
    replace: true,
  }}
>
  About Page
</LinkButton>

// Disabled link
<LinkButton isDisabled href="/unavailable">
  Unavailable Page
</LinkButton>

// Warning appearance
<LinkButton appearance="warning" href="/dangerous-action">
  Proceed with Caution
</LinkButton>
```

---

## split-button-examples

# Split Button Component Examples

## Basic example
```tsx
import SplitButton from '@atlaskit/button/new';

<SplitButton spacing="compact">
  <Button>Link work item</Button>
  <DropdownMenu
    shouldRenderToParent
    trigger={({ triggerRef, ...triggerProps }) => (
      <IconButton
        ref={triggerRef}
        {...triggerProps}
        icon={ChevronDownIcon}
        label="More link work item options"
      />
    )}
  >
    <DropdownItemGroup>
      <DropdownItem>Create new link</DropdownItem>
      <DropdownItem>Link existing item</DropdownItem>
    </DropdownItemGroup>
  </DropdownMenu>
</SplitButton>
```

## Key Props

| Prop | Type | Description |
|------|------|-------------|
| `appearance` | `'default' \| 'primary'` | Applied to both Button and IconButton |
| `spacing` | `'default' \| 'compact'` | Controls button spacing |
| `isDisabled` | `boolean` | Disables all child buttons |

## Other examples
```tsx
// With custom button props
<SplitButton appearance="primary">
  <Button 
    iconBefore={AddIcon}
    onClick={() => console.log('Primary action')}
  >
    Create Project
  </Button>
  <DropdownMenu
    shouldRenderToParent
    trigger={({ triggerRef, ...triggerProps }) => (
      <IconButton
        ref={triggerRef}
        {...triggerProps}
        icon={ChevronDownIcon}
        label="More create project options"
      />
    )}
  >
    <DropdownItemGroup>
      <DropdownItem>Create from template</DropdownItem>
      <DropdownItem>Import from file</DropdownItem>
      <DropdownItem>Clone existing</DropdownItem>
    </DropdownItemGroup>
  </DropdownMenu>
</SplitButton>
```

---

## badge-examples

# Badge Component Examples

## Basic example
```tsx
import Badge from '@atlaskit/badge';

<Badge appearance="added">Badge</Badge>
```

## Key Props

| Prop | Type | Description |
|------|------|-------------|
| `appearance` | `'added' \| 'removed' \| 'moved' \| 'new' \| 'primary'` | Visual style of the badge |
| `children` | `ReactNode` | Content to display inside the badge |

## Other examples
```tsx
// Online, success status
<Badge appearance="added">Online</Badge>

// Offline status
<Badge appearance="removed">Offline</Badge>

// Away status
<Badge appearance="moved">Away</Badge>

// Busy status
<Badge appearance="new">Busy</Badge>

// Notification count
<Badge appearance="primary">5</Badge>
```

---

## icon-examples

# Icon Component Examples

## Basic example
```tsx
import AddIcon from '@atlaskit/icon/core/add';

<AddIcon label="Add item" />
```

## Key Props

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Accessible label for screen readers |
| `size` | `'small' \| 'medium' \| 'large'` | Size of the icon |
| `color` | `string` | Color of the icon |

## Other examples
```tsx
// Basic icon with small size
<AddIcon label="Add item" size="small" />

// Icon with custom color
import { token } from '@atlaskit/tokens';
<AddIcon label="Add item" color={token('color.icon.danger')} />

// Icon in button
import Button from '@atlaskit/button/new';
<Button iconBefore={AddIcon}>Create</Button>

// Icon in text field
import Textfield from '@atlaskit/textfield';
<Textfield 
  placeholder="Search..." 
  elemBeforeInput={<SearchIcon label="search" />}
/>

// More menu icon
import ShowMoreHorizontalIcon from '@atlaskit/icon/core/show-more-horizontal';
<ShowMoreHorizontalIcon label="More options" />
```

---

## icon-tile-examples

# IconTile Component Examples

## Basic example
```tsx
import { IconTile } from '@atlaskit/icon';
import AddIcon from '@atlaskit/icon/core/add';

<IconTile icon={AddIcon} label="Add icon" appearance="blue" shape="circle" size="24" />
```

## Key Props

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `ReactNode` | Icon component to display |
| `label` | `string` | Accessible label for screen readers |
| `appearance` | `'blue' \| 'green' \| 'red' \| 'yellow' \| 'gray'` | Color appearance |
| `shape` | `'circle' \| 'square'` | Shape of the tile |
| `size` | `'16' \| '24' \| '32' \| '40' \| '48'` | Size in pixels |

## Other examples
```tsx
// Different shapes and sizes
<IconTile icon={AddIcon} label="Add icon" appearance="blue" shape="square" size="32" />
<IconTile icon={AddIcon} label="Add icon" appearance="blue" shape="circle" size="48" />

// Different appearances
<IconTile icon={StatusSuccessIcon} label="Success status" appearance="green" />
<IconTile icon={StatusErrorIcon} label="Error status" appearance="red" />
<IconTile icon={StatusWarningIcon} label="Warning status" appearance="yellow" />

// Bold appearances for high emphasis
<IconTile icon={PriorityHighIcon} label="High priority" appearance="redBold" />
<IconTile icon={StarIcon} label="Star decoration" appearance="yellowBold" />

// Status indicators
<IconTile icon={UserIcon} label="User online" appearance="green" shape="circle" size="24" />
<IconTile icon={UserIcon} label="User busy" appearance="yellow" shape="circle" size="24" />
<IconTile icon={UserIcon} label="User offline" appearance="gray" shape="circle" size="24" />

// Category indicators
<IconTile icon={BugIcon} label="Bug issue" appearance="red" shape="square" size="24" />
<IconTile icon={FeatureIcon} label="Feature request" appearance="blue" shape="square" size="24" />
<IconTile icon={TaskIcon} label="Task item" appearance="green" shape="square" size="24" />
```

---

## navigation-examples

# Navigation Component Examples

## Basic example
```tsx
import { LinkMenuItem } from "@atlaskit/navigation-system/side-nav-items/link-menu-item";

<LinkMenuItem 
  href="/dashboard"
  elemBefore={<DashboardIcon label="" />}
  isSelected={currentPath === "/dashboard"}
>
  Dashboard
</LinkMenuItem>
```

## Key Props

| Prop | Type | Description |
|------|------|-------------|
| `href` | `string` | URL for navigation (LinkMenuItem) |
| `onClick` | `() => void` | Click handler (ButtonMenuItem) |
| `elemBefore` | `ReactNode` | Icon or element before text |
| `isSelected` | `boolean` | Whether item is currently selected |

## Other examples
```tsx
// Button menu item for actions
import { ButtonMenuItem } from "@atlaskit/navigation-system/side-nav-items/button-menu-item";

<ButtonMenuItem 
  onClick={handleAction}
  elemBefore={<AddIcon label="" />}
  isSelected={isModalOpen}
>
  Create Project
</ButtonMenuItem>

// Flyout menu item for hierarchical navigation
import { 
  FlyoutMenuItem, 
  FlyoutMenuItemContent, 
  FlyoutMenuItemTrigger 
} from "@atlaskit/navigation-system/side-nav-items/flyout-menu-item";

<FlyoutMenuItem>
  <FlyoutMenuItemTrigger elemBefore={<ProjectIcon label="" />}>
    Projects
  </FlyoutMenuItemTrigger>
  <FlyoutMenuItemContent>
    <MenuList>
      <LinkMenuItem href="/projects/web-app">Web Application</LinkMenuItem>
      <LinkMenuItem href="/projects/mobile-app">Mobile Application</LinkMenuItem>
    </MenuList>
  </FlyoutMenuItemContent>
</FlyoutMenuItem>

// Expandable menu item
import {
  ExpandableMenuItem,
  ExpandableMenuItemContent,
  ExpandableMenuItemTrigger,
} from "@atlaskit/navigation-system/side-nav-items/expandable-menu-item";

<ExpandableMenuItem>
  <ExpandableMenuItemTrigger elemBefore={<ProjectIcon label="" />}>
    Projects
  </ExpandableMenuItemTrigger>
  <ExpandableMenuItemContent>
    <MenuSection isMenuListItem>
      <MenuSectionHeading>Starred</MenuSectionHeading>
      <LinkMenuItem elemBefore={<Avatar label="" size="xsmall" />}>
        Teams
      </LinkMenuItem>
    </MenuSection>
  </ExpandableMenuItemContent>
</ExpandableMenuItem>

// Complete navigation structure
import { SideNavContent, MenuList } from "@atlaskit/navigation-system";

<SideNavContent>
  <MenuList>
    <LinkMenuItem 
      href="/" 
      elemBefore={<HomeIcon label="" />}
      isSelected={currentPath === "/"}
    >
      Overview
    </LinkMenuItem>
    <ButtonMenuItem 
      onClick={handleAction} 
      elemBefore={<SettingsIcon label="" />}
      isSelected={activeSection === "settings"}
    >
      Settings
    </ButtonMenuItem>
  </MenuList>
</SideNavContent>
```

---

## lozenge-examples

# Lozenge Component Examples

## Basic example
```tsx
import Lozenge from '@atlaskit/lozenge';

<Lozenge appearance="success">Done</Lozenge>
```

## Key Props

| Prop | Type | Description |
|------|------|-------------|
| `appearance` | `'success' \| 'inprogress' \| 'removed' \| 'new' \| 'moved'` | Visual style of the lozenge |
| `isBold` | `boolean` | Use bold styling for emphasis |
| `children` | `ReactNode` | Content to display inside the lozenge |

## Other examples
```tsx
// Different status appearances
<Lozenge appearance="inprogress">In Progress</Lozenge>
<Lozenge appearance="removed">Error</Lozenge>
<Lozenge appearance="new">New</Lozenge>

// Bold styling for emphasis
<Lozenge appearance="success" isBold>Active</Lozenge>
<Lozenge appearance="removed" isBold>Critical</Lozenge>
<Lozenge appearance="inprogress" isBold>Processing</Lozenge>
```

---

## tooltip-examples

# Tooltip Component Examples

## Basic example
```tsx
import Tooltip from '@atlaskit/tooltip';

<Tooltip content="Save document">
  <IconButton icon={SaveIcon} label="Save" />
</Tooltip>
```

## Key Props

| Prop | Type | Description |
|------|------|-------------|
| `content` | `ReactNode` | Content to display in the tooltip |
| `position` | `'top' \| 'right' \| 'bottom' \| 'left'` | Position of the tooltip |
| `children` | `ReactNode` | Element that triggers the tooltip |

## Other examples
```tsx
// Different positions
<Tooltip content="Top tooltip" position="top">
  <button>Top</button>
</Tooltip>

<Tooltip content="Right tooltip" position="right">
  <button>Right</button>
</Tooltip>

<Tooltip content="Bottom tooltip" position="bottom">
  <button>Bottom</button>
</Tooltip>

// Rich content tooltip
<Tooltip content={
  <div>
    <strong>Keyboard shortcut:</strong><br />
    Cmd + S (Mac) or Ctrl + S (Windows)
  </div>
}>
  <IconButton icon={SaveIcon} label="Save" />
</Tooltip>

// Multi-line tooltip
<Tooltip content={
  <div>
    <div>Click to expand</div>
    <div style={{ fontSize: '12px', color: token('color.text.subtle') }}>
      Shows additional options
    </div>
  </div>
}>
  <IconButton icon={ExpandIcon} label="Expand" />
</Tooltip>
```

---

## text-examples

# Text Component Examples

## Basic example
```tsx
import { Text } from "@atlaskit/primitives";

<Text size="large">Body text</Text>
```

## Key Props

| Prop | Type | Description |
|------|------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | Size of the text |
| `weight` | `'normal' \| 'semibold' \| 'bold'` | Font weight of the text |
| `color` | `string` | Color token for the text |

## Other examples
```tsx
// Different sizes
<Text size="small">Small text</Text>
<Text size="medium">Medium text</Text>
<Text size="large">Large text</Text>

// Different weights
<Text weight="semibold">Semibold text</Text>
<Text weight="bold">Bold text</Text>

// Colored text
<Text weight="semibold" color="color.text.accent.purple.bolder">
  Colored text
</Text>

// ❌ Wrong - don't use `as` prop
<Text size="large" as="h1">Body text</Text>

// ✅ Right - use proper heading component
<Text size="large">Body text</Text>
```


---

## color-examples

# Color Token Examples

## Basic example
```tsx
import { token } from '@atlaskit/tokens';

<div style={{ backgroundColor: token('elevation.surface') }} />
```

## Key Props

| Prop | Type | Description |
|------|------|-------------|
| `token()` | `function` | Function to access design system color tokens |
| `'elevation.surface'` | `string` | Token name for background colors |
| `'color.text'` | `string` | Token name for text colors |

## Other examples
```tsx
// Background colors
<div style={{ backgroundColor: token('elevation.surface') }} />

// Text colors
<div style={{ color: token('color.text') }} />

// Avoid direct Tailwind classes
// ❌ <div className="bg-blue-100" />
// ❌ <div className="text-black" />
```


---

## radius-examples

# Radius Token Examples

## Basic example
```tsx
import { token } from '@atlaskit/tokens';

<div style={{ borderRadius: token('border.radius.100') }} />
```

## Key Props

| Prop | Type | Description |
|------|------|-------------|
| `token()` | `function` | Function to access design system radius tokens |
| `'border.radius.100'` | `string` | Small border radius |
| `'border.radius.200'` | `string` | Medium border radius |
| `'border.radius.300'` | `string` | Large border radius |

## Other examples
```tsx
// Small radius for buttons
<div style={{ borderRadius: token('border.radius.100') }} />

// Medium radius for cards
<div style={{ borderRadius: token('border.radius.200') }} />

// Large radius for modals
<div style={{ borderRadius: token('border.radius.300') }} />
```


---

## spacing-examples

# Spacing Token Examples

## Basic example
```tsx
import { token } from '@atlaskit/tokens';

<div style={{ padding: token('space.200') }}>
  Content here
</div>
```

## Key Props

| Prop | Type | Description |
|------|------|-------------|
| `token()` | `function` | Function to access design system spacing tokens |
| `'space.100'` | `string` | 8px spacing |
| `'space.150'` | `string` | 12px spacing |
| `'space.200'` | `string` | 16px spacing |

## Other examples
```tsx
// Container with consistent spacing
<div style={{
  padding: token('space.200'),
  margin: token('space.100'),
  gap: token('space.150')
}}>
  Content here
</div>

// Button spacing
<button style={{ padding: token('space.100') }}>
  Click me
</button>

// List item spacing
<li style={{ marginBottom: token('space.150') }}>
  List item
</li>
```

---

