# Atlassian Design System - Component Examples

## Navigation System Boilerplate

### Complete Navigation Layout
```tsx
import React from 'react';
import { token } from '@atlaskit/tokens';

// Navigation system imports
import { Root as PageLayoutRoot } from '@atlaskit/navigation-system/layout/root';
import { TopNav, TopNavStart, TopNavMiddle, TopNavEnd } from '@atlaskit/navigation-system/layout/top-nav';
import { SideNav, SideNavContent, SideNavFooter, SideNavToggleButton } from '@atlaskit/navigation-system/layout/side-nav';
import { Main } from '@atlaskit/navigation-system/layout/main';
import { AppSwitcher, CreateButton, Help, Notifications, Search, Settings } from '@atlaskit/navigation-system/top-nav-items';
import { MenuList } from '@atlaskit/navigation-system/side-nav-items/menu-list';
import { LinkMenuItem } from '@atlaskit/navigation-system/side-nav-items/link-menu-item';
import { ButtonMenuItem } from '@atlaskit/navigation-system/side-nav-items/button-menu-item';
import { TopLevelSpacer } from '@atlaskit/navigation-system/side-nav-items/top-level-spacer';

// Supporting components
import Badge from '@atlaskit/badge';
import Button from '@atlaskit/button/new';
import Avatar from '@atlaskit/avatar';
import { ConfluenceIcon } from '@atlaskit/logo';

// Icons - ALWAYS import from core
import HomeIcon from '@atlaskit/icon/core/home';
import SettingsIcon from '@atlaskit/icon/core/settings';
import SearchIcon from '@atlaskit/icon/core/search';
import PersonIcon from '@atlaskit/icon/core/person';
import DashboardIcon from '@atlaskit/icon/core/dashboard';
import ProjectIcon from '@atlaskit/icon/core/project';

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
        shouldUseNewLogoDesign={true} // 🚨 REQUIRED: Always set to true
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
        <CreateButton>Create</CreateButton>
      </TopNavMiddle>

      <TopNavEnd>
        <Button
          iconBefore={<SearchIcon label="Search" />}
          onClick={() => {}}
        >
          Quick Search
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
          {/* ✅ CORRECT: Icons in elemBefore prop */}
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
          <ButtonMenuItem 
            onClick={() => {}}
            elemBefore={<PersonIcon label="" />}
          >
            Profile
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

## Component API Examples

### Button Components
```tsx
import Button, { IconButton, SplitButton } from '@atlaskit/button/new';
import AddIcon from '@atlaskit/icon/core/add';
import ArrowRightIcon from '@atlaskit/icon/core/arrow-right';

// Primary button
<Button appearance="primary">Create</Button>

// Secondary button (default appearance)
<Button appearance="default">Cancel</Button>

// Danger button
<Button appearance="danger">Delete</Button>

// Button with icon
<Button appearance="primary" iconBefore={AddIcon}>Add Item</Button>

// Loading state
<Button appearance="primary" isLoading>
  Saving...
</Button>

// Disabled state
<Button isDisabled>
  Unavailable
</Button>

// Compact spacing
<Button spacing="compact">
  Small Button
</Button>

// With icons
<Button appearance="primary" iconAfter={ArrowRightIcon}>
  Continue
</Button>

// IconButton
<IconButton icon={AddIcon} label="Add" />

// Primary icon button
<IconButton appearance="primary" icon={AddIcon} label="Add" />

// Circular icon button
<IconButton shape="circle" icon={AddIcon} label="Menu" />

// SplitButton
<SplitButton appearance="primary">
  <Button>Add Item</Button>
  <DropdownMenu
    shouldRenderToParent
    trigger={({ triggerRef, ...triggerProps }) => (
      <IconButton
        ref={triggerRef}
        {...triggerProps}
        icon={ChevronDownIcon}
        label="More add item options"
      />
    )}
  >
    <DropdownItemGroup>
      <DropdownItem>Add from template</DropdownItem>
      <DropdownItem>Add from existing</DropdownItem>
    </DropdownItemGroup>
  </DropdownMenu>
</SplitButton>
```

### Form Components
```tsx
import Form, { Field, ErrorMessage, HelperMessage } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import Select from '@atlaskit/select';
import Button from '@atlaskit/button/new';
import { Stack } from '@atlaskit/primitives';

// Basic form
<Form onSubmit={handleSubmit}>
  {({ formProps, submitting }) => (
    <form {...formProps}>
      <Stack space="space.300">
        <Field name="email" label="Email" isRequired>
          {({ fieldProps, error }) => (
            <>
              <Textfield
                {...fieldProps}
                type="email"
                placeholder="Enter your email"
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </>
          )}
        </Field>

        <Field name="role" label="Role" isRequired>
          {({ fieldProps, error }) => (
            <>
              <Select
                {...fieldProps}
                options={[
                  { label: 'Admin', value: 'admin' },
                  { label: 'User', value: 'user' },
                ]}
                placeholder="Select role"
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </>
          )}
        </Field>

        <Button
          type="submit"
          appearance="primary"
          isLoading={submitting}
          shouldFitContainer
        >
          Submit
        </Button>
      </Stack>
    </form>
  )}
</Form>
```

### Data Display Components
```tsx
import Badge from '@atlaskit/badge';
import Lozenge from '@atlaskit/lozenge';
import Avatar from '@atlaskit/avatar';
import AvatarGroup from '@atlaskit/avatar-group';

// Badges
<Badge appearance="primary">Beta</Badge>
<Badge appearance="added">New Feature</Badge>
<Badge appearance="removed">Deprecated</Badge>
<Badge appearance="important">Warning</Badge>
<Badge value={5} />
<Badge value={150} max={99} />

// Lozenges
<Lozenge appearance="success">Done</Lozenge>
<Lozenge appearance="inprogress">In Progress</Lozenge>
<Lozenge appearance="removed">Blocked</Lozenge>
<Lozenge appearance="success" isBold>Online</Lozenge>

// Avatars
<Avatar src="/avatar.jpg" name="John Doe" />
<Avatar name="John Doe" />
<Avatar name="John Doe" appearance="square" />
<Avatar name="John Doe" presence="online" />
<Avatar name="John Doe" status="approved" />

// Avatar Groups
<AvatarGroup
  appearance="stack"
  data={[
    { name: 'John Doe', src: 'https://example.com/avatar1.jpg' },
    { name: 'Jane Smith', src: 'https://example.com/avatar2.jpg' },
    { name: 'Bob Johnson', src: 'https://example.com/avatar3.jpg' },
  ]}
  maxCount={3}
  size="medium"
/>
```

### Modal Dialogs
```tsx
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button/new';

// Confirmation modal
<ModalTransition>
  {isOpen && (
    <Modal onClose={onClose} width="small">
      <ModalHeader>
        <ModalTitle>Confirm Action</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this item?</p>
      </ModalBody>
      <ModalFooter>
        <Button appearance="subtle" onClick={onClose}>
          Cancel
        </Button>
        <Button appearance="danger" onClick={onConfirm}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  )}
</ModalTransition>

// Form modal
<ModalTransition>
  {isOpen && (
    <Modal onClose={onClose} width="medium">
      <ModalHeader hasCloseButton>
        <ModalTitle>Create New Item</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          {({ formProps }) => (
            <form {...formProps}>
              <Field name="name" label="Name" isRequired>
                {({ fieldProps }) => (
                  <Textfield {...fieldProps} placeholder="Enter name" />
                )}
              </Field>
            </form>
          )}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button appearance="subtle" onClick={onClose}>
          Cancel
        </Button>
        <Button appearance="primary" onClick={onSubmit}>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )}
</ModalTransition>
```

### Section Messages
```tsx
import SectionMessage from '@atlaskit/section-message';

// Simple messages
<SectionMessage appearance="success" title="Success">
  <p>Operation completed successfully.</p>
</SectionMessage>

<SectionMessage appearance="discovery" title="New Feature">
  <p>Check out our new collaboration tools!</p>
</SectionMessage>

// Message with actions
<SectionMessage appearance="warning" title="Action Required">
  <p>Your subscription expires in 7 days.</p>
  <SectionMessage.Actions>
    <SectionMessage.Action href="/billing">Renew Now</SectionMessage.Action>
    <SectionMessage.Action href="/plans">View Plans</SectionMessage.Action>
  </SectionMessage.Actions>
</SectionMessage>

// Rich content message
<SectionMessage appearance="information" title="Getting Started">
  <p>Welcome to the platform! Here's what you can do:</p>
  <ul>
    <li>Create your first project</li>
    <li>Invite team members</li>
    <li>Set up integrations</li>
  </ul>
  <SectionMessage.Actions>
    <SectionMessage.Action href="/onboarding">Start Tutorial</SectionMessage.Action>
  </SectionMessage.Actions>
</SectionMessage>
```

### Text Fields
```tsx
import Textfield from '@atlaskit/textfield';

// Basic input
<Textfield placeholder="Enter text" />

// Required field
<Textfield 
  label="Name" 
  isRequired 
  placeholder="Enter your name"
/>

// Disabled input
<Textfield 
  label="Disabled field" 
  isDisabled 
  value="Cannot edit"
/>

// Controlled input
const [value, setValue] = useState('');

<Textfield 
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Type here..."
/>

// Form integration
<Field name="email" label="Email" isRequired>
  {({ fieldProps, error }) => (
    <>
      <Textfield 
        {...fieldProps}
        type="email"
        placeholder="john@example.com"
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  )}
</Field>
```

### Select Components
```tsx
import Select, { CheckboxSelect, CountrySelect } from '@atlaskit/select';

// Basic select
<Select
  options={[
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]}
  placeholder="Choose an option"
/>

// Multi-select
<Select
  options={[
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Yellow', value: 'yellow' },
  ]}
  isMulti
  placeholder="Select colors"
/>

// Searchable select
<Select
  options={cities}
  placeholder="Search cities..."
  isSearchable
/>

// Grouped options
<Select
  options={[
    {
      label: 'Fruits',
      options: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
      ],
    },
    {
      label: 'Vegetables',
      options: [
        { label: 'Carrot', value: 'carrot' },
        { label: 'Lettuce', value: 'lettuce' },
      ],
    },
  ]}
/>

// Checkbox select
<CheckboxSelect
  options={[
    { label: 'Feature A', value: 'a' },
    { label: 'Feature B', value: 'b' },
    { label: 'Feature C', value: 'c' },
  ]}
  placeholder="Select features"
/>

// Country select
<CountrySelect
  placeholder="Choose a country"
  onChange={(country) => console.log(country)}
/>
```

### Tooltips
```tsx
import Tooltip from '@atlaskit/tooltip';
import { IconButton } from '@atlaskit/button/new';
import SaveIcon from '@atlaskit/icon/core/save';

// Simple text tooltip
<Tooltip content="Save document">
  <IconButton icon={SaveIcon} label="Save" />
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

// Disabled tooltip
<Tooltip content="This feature is disabled">
  <button disabled>Disabled button</button>
</Tooltip>

// Tooltip with custom delay
<Tooltip content="Quick info" delay={0}>
  <span>Instant tooltip</span>
</Tooltip>
```

### IconTile
```tsx
import { IconTile } from '@atlaskit/icon';
import AddIcon from '@atlaskit/icon/core/add';
import CheckMarkIcon from '@atlaskit/icon/core/check-mark';
import WarningIcon from '@atlaskit/icon/core/warning';
import BugIcon from '@atlaskit/icon/core/bug';
import AutomationIcon from '@atlaskit/icon/core/automation';

// ✅ CORRECT: IconTile is for icons only
<IconTile icon={AddIcon} label="Add icon" appearance="blue" shape="circle" size="24" />

// Status indicator (icon only)
<IconTile icon={CheckMarkIcon} label="Success status" appearance="green" shape="circle" size="24" />

// Category indicator (icon only)
<IconTile icon={BugIcon} label="Bug category" appearance="red" shape="square" size="24" />

// Large feature indicator (icon only)
<IconTile icon={AutomationIcon} label="Automation feature" appearance="blueBold" shape="circle" size="40" />

// Size comparison example (all icons only)
<Stack space="space.100">
  <Inline space="space.200" shouldWrap={true}>
    <IconTile icon={AddIcon} label="Add icon" appearance="blue" shape="circle" size="16" />
    <IconTile icon={AddIcon} label="Add icon" appearance="blue" shape="circle" size="24" />
    <IconTile icon={AddIcon} label="Add icon" appearance="blue" shape="circle" size="32" />
    <IconTile icon={AddIcon} label="Add icon" appearance="blue" shape="circle" size="40" />
    <IconTile icon={AddIcon} label="Add icon" appearance="blue" shape="circle" size="48" />
  </Inline>
</Stack>
```

## Layout Examples

### Card Layout
```tsx
import { token } from '@atlaskit/tokens';
import { Box, Stack, Inline, Grid } from '@atlaskit/primitives';
import Button from '@atlaskit/button/new';
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

### Dashboard Layout
```tsx
import { token } from '@atlaskit/tokens';
import { Grid, Stack, Box, Inline } from '@atlaskit/primitives';
import Badge from '@atlaskit/badge';
import Lozenge from '@atlaskit/lozenge';
import Button from '@atlaskit/button/new';
import Avatar from '@atlaskit/avatar';
import AvatarGroup from '@atlaskit/avatar-group';
import BoardIcon from '@atlaskit/icon/core/board';
import IssuesIcon from '@atlaskit/icon/core/issues';
import GraphLineIcon from '@atlaskit/icon/core/graph-line';

const StatCard = ({ title, value, icon, trend }) => {
  const styles = {
    card: {
      padding: token('space.300'),
      backgroundColor: token('color.background.neutral'),
      borderRadius: token('border.radius.200'),
      boxShadow: token('elevation.shadow.overflow'),
    },
    iconWrapper: {
      color: token('color.text.subtlest'),
    },
    value: {
      margin: 0,
      fontSize: '24px',
      fontWeight: token('font.weight.bold'),
    },
    title: {
      margin: 0,
      color: token('color.text.subtle'),
      fontSize: token('font.size.100'),
    },
  };

  return (
    <div style={styles.card}>
      <Stack space="space.200">
        <Inline space="space.100" alignBlock="center" spread="space-between">
          <div style={styles.iconWrapper}>{icon}</div>
          {trend && (
            <Lozenge appearance={trend > 0 ? 'success' : 'removed'}>
              {trend > 0 ? '+' : ''}{trend}%
            </Lozenge>
          )}
        </Inline>
        <h3 style={styles.value}>{value}</h3>
        <p style={styles.title}>{title}</p>
      </Stack>
    </div>
  );
};

export const Dashboard = () => {
  const styles = {
    heading: {
      margin: 0,
      fontSize: token('font.size.500'),
      fontWeight: token('font.weight.bold'),
    },
    subheading: {
      margin: 0,
      fontSize: token('font.size.300'),
      fontWeight: token('font.weight.semibold'),
    },
    subtleText: {
      color: token('color.text.subtle'),
      fontSize: token('font.size.075'),
    },
    section: {
      padding: token('space.300'),
      backgroundColor: token('color.background.neutral'),
      borderRadius: token('border.radius.200'),
    },
  };

  const teamMembers = [
    { name: 'John Doe', src: 'https://example.com/avatar1.jpg' },
    { name: 'Jane Smith', src: 'https://example.com/avatar2.jpg' },
    { name: 'Bob Johnson', src: 'https://example.com/avatar3.jpg' },
    { name: 'Alice Brown', src: 'https://example.com/avatar4.jpg' },
  ];

  return (
    <Stack space="space.400">
      {/* Header */}
      <Inline spread="space-between" alignBlock="center">
        <Stack space="space.100">
          <h1 style={styles.heading}>Project Alpha Dashboard</h1>
          <Inline space="space.100" alignBlock="center">
            <Lozenge appearance="success">Active</Lozenge>
            <span style={styles.subtleText}>
              Last updated 2 hours ago
            </span>
          </Inline>
        </Stack>
        <Button appearance="primary">Create Report</Button>
      </Inline>

      {/* Stats Grid */}
      <Grid gap="space.200" templateColumns="repeat(auto-fit, minmax(250px, 1fr))">
        <StatCard
          title="Total Issues"
          value="234"
          icon={<IssuesIcon label="Issues" size="medium" />}
          trend={12}
        />
        <StatCard
          title="Active Sprints"
          value="3"
          icon={<BoardIcon label="Sprints" size="medium" />}
        />
        <StatCard
          title="Completion Rate"
          value="87%"
          icon={<GraphLineIcon label="Completion" size="medium" />}
          trend={-5}
        />
      </Grid>

      {/* Team Section */}
      <div style={styles.section}>
        <Stack space="space.200">
          <Inline spread="space-between" alignBlock="center">
            <h2 style={styles.subheading}>Team Members</h2>
            <Badge appearance="primary">{teamMembers.length}</Badge>
          </Inline>
          <AvatarGroup
            appearance="stack"
            data={teamMembers}
            maxCount={3}
            size="medium"
          />
        </Stack>
      </div>
    </Stack>
  );
};
```

## Common Style Patterns

### Reusable Style Objects
```tsx
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

### Token Reference
```tsx
// Spacing (for xcss)
'space.100' // 8px
'space.200' // 16px
'space.300' // 24px

// Everything else (for inline styles)
token('color.text')
token('color.background.neutral')
token('border.radius.200')
token('elevation.shadow.raised')
token('font.size.400')
token('font.weight.bold')
```

## Icon Usage Examples

### Basic Icon Usage
```tsx
import AddIcon from '@atlaskit/icon/core/add';
import EditIcon from '@atlaskit/icon/core/edit';
import DeleteIcon from '@atlaskit/icon/core/delete';
import SearchIcon from '@atlaskit/icon/core/search';
import SettingsIcon from '@atlaskit/icon/core/settings';

// Basic icons with labels
<AddIcon label="Add new item" />
<EditIcon label="Edit item" />
<DeleteIcon label="Delete item" />
<SearchIcon label="Search" />
<SettingsIcon label="Settings" />
```

### Icons in Buttons
```tsx
import Button from '@atlaskit/button/new';
import AddIcon from '@atlaskit/icon/core/add';
import EditIcon from '@atlaskit/icon/core/edit';
import DeleteIcon from '@atlaskit/icon/core/delete';

// Button with icon before text
<Button appearance="primary" iconBefore={AddIcon}>
  Create Item
</Button>

// Button with icon after text
<Button appearance="default" iconAfter={EditIcon}>
  Edit
</Button>

// Icon button
<IconButton icon={DeleteIcon} label="Delete item" />

// Primary icon button
<IconButton appearance="primary" icon={AddIcon} label="Add" />
```

### Navigation Menu Icons
```tsx
import { LinkMenuItem } from '@atlaskit/navigation-system/side-nav-items/link-menu-item';
import HomeIcon from '@atlaskit/icon/core/home';
import DashboardIcon from '@atlaskit/icon/core/dashboard';
import ProjectIcon from '@atlaskit/icon/core/project';
import SettingsIcon from '@atlaskit/icon/core/settings';
import PersonIcon from '@atlaskit/icon/core/person';

// ✅ CORRECT: Icons in elemBefore prop
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

<LinkMenuItem 
  href="/settings"
  elemBefore={<SettingsIcon label="" />}
>
  Settings
</LinkMenuItem>

<LinkMenuItem 
  href="/profile"
  elemBefore={<PersonIcon label="" />}
>
  Profile
</LinkMenuItem>
```

### Status and Feedback Icons
```tsx
import CheckMarkIcon from '@atlaskit/icon/core/check-mark';
import ErrorIcon from '@atlaskit/icon/core/error';
import WarningIcon from '@atlaskit/icon/core/warning';
import InformationIcon from '@atlaskit/icon/core/information';
import SuccessIcon from '@atlaskit/icon/core/success';

// Success states
<CheckMarkIcon label="Completed" />
<SuccessIcon label="Success" />

// Error states
<ErrorIcon label="Error occurred" />

// Warning states
<WarningIcon label="Warning" />

// Information states
<InformationIcon label="Information" />
```

### File and Content Icons
```tsx
import FileIcon from '@atlaskit/icon/core/file';
import FolderClosedIcon from '@atlaskit/icon/core/folder-closed';
import FolderOpenIcon from '@atlaskit/icon/core/folder-open';
import ImageIcon from '@atlaskit/icon/core/image';
import VideoIcon from '@atlaskit/icon/core/video';
import AttachmentIcon from '@atlaskit/icon/core/attachment';

// File types
<FileIcon label="Document" />
<ImageIcon label="Image" />
<VideoIcon label="Video" />
<AttachmentIcon label="Attachment" />

// Folder states
<FolderClosedIcon label="Closed folder" />
<FolderOpenIcon label="Open folder" />
```

### Direction and Navigation Icons
```tsx
import ArrowLeftIcon from '@atlaskit/icon/core/arrow-left';
import ArrowRightIcon from '@atlaskit/icon/core/arrow-right';
import ChevronDownIcon from '@atlaskit/icon/core/chevron-down';
import ChevronUpIcon from '@atlaskit/icon/core/chevron-up';

// Navigation arrows
<ArrowLeftIcon label="Go back" />
<ArrowRightIcon label="Go forward" />

// Expand/collapse
<ChevronDownIcon label="Show more" />
<ChevronUpIcon label="Show less" />
```

### Communication Icons
```tsx
import EmailIcon from '@atlaskit/icon/core/email';
import CommentIcon from '@atlaskit/icon/core/comment';
import NotificationIcon from '@atlaskit/icon/core/notification';
import SendIcon from '@atlaskit/icon/core/send';
import ShareIcon from '@atlaskit/icon/core/share';

// Communication actions
<EmailIcon label="Email" />
<CommentIcon label="Comment" />
<NotificationIcon label="Notifications" />
<SendIcon label="Send" />
<ShareIcon label="Share" />
```

### Data and Analytics Icons
```tsx
import DashboardIcon from '@atlaskit/icon/core/dashboard';
import ChartBarIcon from '@atlaskit/icon/core/chart-bar';
import ChartTrendIcon from '@atlaskit/icon/core/chart-trend';
import ChartPieIcon from '@atlaskit/icon/core/chart-pie';
import DatabaseIcon from '@atlaskit/icon/core/database';

// Analytics and data
<DashboardIcon label="Dashboard" />
<ChartBarIcon label="Bar chart" />
<ChartTrendIcon label="Trend chart" />
<ChartPieIcon label="Pie chart" />
<DatabaseIcon label="Database" />
```

### Work Management Icons
```tsx
import ProjectIcon from '@atlaskit/icon/core/project';
import TaskIcon from '@atlaskit/icon/core/task';
import EpicIcon from '@atlaskit/icon/core/epic';
import SprintIcon from '@atlaskit/icon/core/sprint';
import BoardIcon from '@atlaskit/icon/core/board';

// Work items
<ProjectIcon label="Project" />
<TaskIcon label="Task" />
<EpicIcon label="Epic" />
<SprintIcon label="Sprint" />
<BoardIcon label="Board" />
```

### Media Control Icons
```tsx
import VideoPlayIcon from '@atlaskit/icon/core/video-play';
import VideoPauseIcon from '@atlaskit/icon/core/video-pause';
import VideoStopIcon from '@atlaskit/icon/core/video-stop';
import VolumeHighIcon from '@atlaskit/icon/core/volume-high';
import VolumeMutedIcon from '@atlaskit/icon/core/volume-muted';

// Video controls
<VideoPlayIcon label="Play video" />
<VideoPauseIcon label="Pause video" />
<VideoStopIcon label="Stop video" />

// Audio controls
<VolumeHighIcon label="High volume" />
<VolumeMutedIcon label="Muted" />
```

### UI Control Icons
```tsx
import MenuIcon from '@atlaskit/icon/core/menu';
import ShowMoreHorizontalIcon from '@atlaskit/icon/core/show-more-horizontal';
import FilterIcon from '@atlaskit/icon/core/filter';
import SortAscendingIcon from '@atlaskit/icon/core/sort-ascending';
import RefreshIcon from '@atlaskit/icon/core/refresh';

// UI controls
<MenuIcon label="Menu" />
<ShowMoreHorizontalIcon label="More options" />
<FilterIcon label="Filter" />
<SortAscendingIcon label="Sort ascending" />
<RefreshIcon label="Refresh" />
```

### Security and Access Icons
```tsx
import LockLockedIcon from '@atlaskit/icon/core/lock-locked';
import LockUnlockedIcon from '@atlaskit/icon/core/lock-unlocked';
import ShieldIcon from '@atlaskit/icon/core/shield';
import EyeOpenIcon from '@atlaskit/icon/core/eye-open';
import EyeOpenStrikethroughIcon from '@atlaskit/icon/core/eye-open-strikethrough';

// Security states
<LockLockedIcon label="Locked" />
<LockUnlockedIcon label="Unlocked" />
<ShieldIcon label="Secure" />

// Visibility states
<EyeOpenIcon label="Visible" />
<EyeOpenStrikethroughIcon label="Hidden" />
```

### Form and Input Icons
```tsx
import CheckboxCheckedIcon from '@atlaskit/icon/core/checkbox-checked';
import CheckboxUncheckedIcon from '@atlaskit/icon/core/checkbox-unchecked';
import RadioCheckedIcon from '@atlaskit/icon/core/radio-checked';
import RadioUncheckedIcon from '@atlaskit/icon/core/radio-unchecked';

// Form controls
<CheckboxCheckedIcon label="Checked" />
<CheckboxUncheckedIcon label="Unchecked" />
<RadioCheckedIcon label="Selected" />
<RadioUncheckedIcon label="Unselected" />
```

### Business and Organization Icons
```tsx
import BriefcaseIcon from '@atlaskit/icon/core/briefcase';
import OfficeBuildingIcon from '@atlaskit/icon/core/office-building';
import GlobeIcon from '@atlaskit/icon/core/globe';
import LocationIcon from '@atlaskit/icon/core/location';
import CalendarIcon from '@atlaskit/icon/core/calendar';

// Business and organization
<BriefcaseIcon label="Business" />
<OfficeBuildingIcon label="Company" />
<GlobeIcon label="Global" />
<LocationIcon label="Location" />
<CalendarIcon label="Calendar" />
```

### Development and Technical Icons
```tsx
import BugIcon from '@atlaskit/icon/core/bug';
import ComponentIcon from '@atlaskit/icon/core/component';
import ApiIcon from '@atlaskit/icon/core/api';
import BranchIcon from '@atlaskit/icon/core/branch';
import PullRequestIcon from '@atlaskit/icon/core/pull-request';

// Development and technical
<BugIcon label="Bug" />
<ComponentIcon label="Component" />
<ApiIcon label="API" />
<BranchIcon label="Branch" />
<PullRequestIcon label="Pull request" />
```

### Feedback and Interaction Icons
```tsx
import ThumbsUpIcon from '@atlaskit/icon/core/thumbs-up';
import ThumbsDownIcon from '@atlaskit/icon/core/thumbs-down';
import StarUnstarredIcon from '@atlaskit/icon/core/star-unstarred';
import StarStarredIcon from '@atlaskit/icon/core/star-starred';
import HeartIcon from '@atlaskit/icon/core/heart';
import FlagIcon from '@atlaskit/icon/core/flag';

// Feedback and interaction
<ThumbsUpIcon label="Like" />
<ThumbsDownIcon label="Dislike" />
<StarUnstarredIcon label="Star" />
<StarStarredIcon label="Starred" />
<HeartIcon label="Love" />
<FlagIcon label="Flag" />
```

### Icon with Custom Colors
```tsx
import { token } from '@atlaskit/tokens';
import AddIcon from '@atlaskit/icon/core/add';
import ErrorIcon from '@atlaskit/icon/core/error';

// Icon with custom color
<AddIcon 
  label="Add item" 
  color={token('color.icon.brand')} 
/>

<ErrorIcon 
  label="Error" 
  color={token('color.icon.danger')} 
/>
```

### Icon in Different Contexts
```tsx
import { Stack, Inline } from '@atlaskit/primitives';
import AddIcon from '@atlaskit/icon/core/add';
import EditIcon from '@atlaskit/icon/core/edit';
import DeleteIcon from '@atlaskit/icon/core/delete';

// Icons in a toolbar
<Inline space="space.100">
  <IconButton icon={AddIcon} label="Add" />
  <IconButton icon={EditIcon} label="Edit" />
  <IconButton icon={DeleteIcon} label="Delete" />
</Inline>

// Icons in a list
<Stack space="space.200">
  <Inline space="space.100" alignBlock="center">
    <AddIcon label="Add" />
    <span>Add new item</span>
  </Inline>
  <Inline space="space.100" alignBlock="center">
    <EditIcon label="Edit" />
    <span>Edit existing item</span>
  </Inline>
</Stack>
```

### Migration from lucide-react
```tsx
// Before (lucide-react)
import { Plus, X, Search, User, Settings } from 'lucide-react';
<Plus size={16} />
<X size={16} />
<Search size={16} />
<User size={16} />
<Settings size={16} />

// After (ADS)
import AddIcon from '@atlaskit/icon/core/add';
import CloseIcon from '@atlaskit/icon/core/close';
import SearchIcon from '@atlaskit/icon/core/search';
import PersonIcon from '@atlaskit/icon/core/person';
import SettingsIcon from '@atlaskit/icon/core/settings';

<AddIcon label="Add" />
<CloseIcon label="Close" />
<SearchIcon label="Search" />
<PersonIcon label="Person" />
<SettingsIcon label="Settings" />
```

### Common Icon Patterns
```tsx
// Loading state with icon
<Button appearance="primary" isLoading>
  <RefreshIcon label="Loading" />
  Loading...
</Button>

// Disabled state with icon
<IconButton 
  icon={DeleteIcon} 
  label="Delete" 
  isDisabled 
/>

// Icon with tooltip
<Tooltip content="Add new item">
  <IconButton icon={AddIcon} label="Add" />
</Tooltip>

// Icon in badge
<Badge appearance="important">
  <NotificationIcon label="Notifications" />
  5
</Badge>
```

### Icon Accessibility Best Practices
```tsx
// ✅ Good - Descriptive labels
<AddIcon label="Add new project" />
<EditIcon label="Edit user profile" />
<DeleteIcon label="Delete selected items" />

// ✅ Good - Context-appropriate labels
<SearchIcon label="Search projects" />
<SettingsIcon label="Account settings" />
<PersonIcon label="User profile" />

// ❌ Avoid - Generic labels
<AddIcon label="Add" />
<EditIcon label="Edit" />
<DeleteIcon label="Delete" />

// ❌ Avoid - Missing labels
<AddIcon />
<EditIcon />
<DeleteIcon />
```