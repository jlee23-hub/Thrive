# Atlassian Design System - Implementation Examples

## Using Atlaskit Components

### Token Usage Priority
1. **Semantic tokens** - Preferred for theming support
2. **Base tokens** - Only when semantic tokens don't exist
3. **Never hardcode values** - Always use tokens

### Import Patterns
```tsx
// Components - use default imports
import Button from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import Select from '@atlaskit/select';

// Primitives - use named imports
import { Stack, Inline, Box, Grid } from '@atlaskit/primitives';

// Icons - import from glyph folder
import AddIcon from '@atlaskit/icon/glyph/add';
import EditIcon from '@atlaskit/icon/glyph/edit';

// Tokens - use token function
import { token } from '@atlaskit/tokens';
```

## Complete Implementation Examples

### CRITICAL: Correct Styling Approach

#### Use Inline Styles for Everything Except Spacing
```tsx
// ✅ CORRECT - Inline styles with tokens
import { token } from '@atlaskit/tokens';
import { Box, Stack } from '@atlaskit/primitives';

export const Component = () => (
  <Box xcss={{ padding: 'space.200' }}> {/* Only spacing in xcss */}
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

// ❌ INCORRECT - Don't use Emotion or other CSS-in-JS
// import { css } from '@emotion/react'; // DON'T DO THIS
```

### Complete Home Page Example
```tsx
import { token } from '@atlaskit/tokens';
import { Box, Stack, Inline, Grid } from '@atlaskit/primitives';
import Button from '@atlaskit/button';
import Badge from '@atlaskit/badge';
import Lozenge from '@atlaskit/lozenge';
import SectionMessage from '@atlaskit/section-message';
import HomeIcon from '@atlaskit/icon/glyph/home';
import BoardIcon from '@atlaskit/icon/glyph/board';
import PeopleIcon from '@atlaskit/icon/glyph/people';

// Define reusable style objects
const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: token('color.background.neutral.subtle'),
  },
  hero: {
    backgroundColor: token('color.background.brand.bold'),
    color: token('color.text.inverse'),
    padding: `${token('space.600')} ${token('space.400')}`,
    textAlign: 'center' as const,
  },
  heroHeading: {
    fontSize: token('font.size.600'),
    fontWeight: token('font.weight.bold'),
    lineHeight: token('font.lineHeight.600'),
    margin: 0,
    marginBottom: token('space.200'),
  },
  heroSubheading: {
    fontSize: token('font.size.200'),
    lineHeight: token('font.lineHeight.300'),
    opacity: 0.9,
    margin: 0,
    marginBottom: token('space.400'),
  },
  card: {
    backgroundColor: token('color.background.neutral'),
    borderRadius: token('border.radius.200'),
    padding: token('space.300'),
    boxShadow: token('elevation.shadow.overflow'),
    height: '100%',
    transition: 'box-shadow 0.2s ease',
  },
  cardHeading: {
    fontSize: token('font.size.300'),
    fontWeight: token('font.weight.semibold'),
    color: token('color.text'),
    margin: 0,
    marginBottom: token('space.100'),
  },
  cardText: {
    fontSize: token('font.size.100'),
    color: token('color.text.subtle'),
    lineHeight: token('font.lineHeight.200'),
    margin: 0,
  },
  iconWrapper: {
    display: 'inline-flex',
    padding: token('space.100'),
    backgroundColor: token('color.background.neutral.subtle'),
    borderRadius: token('border.radius.circle'),
    marginBottom: token('space.200'),
  },
  codeBlock: {
    padding: token('space.200'),
    backgroundColor: token('color.background.neutral'),
    borderRadius: token('border.radius.100'),
    fontFamily: 'monospace',
    fontSize: token('font.size.075'),
  },
};

export const HomePage = () => {
  return (
    <div style={styles.pageContainer}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <Stack alignInline="center">
          <h1 style={styles.heroHeading}>
            Welcome to Atlassian Design System
          </h1>
          <p style={styles.heroSubheading}>
            Build beautiful, consistent applications with our comprehensive component library
          </p>
          <Inline space="space.200">
            <Button appearance="primary" size="large">
              Get Started
            </Button>
            <Button appearance="subtle" size="large">
              View Documentation
            </Button>
          </Inline>
        </Stack>
      </section>

      {/* Main Content */}
      <Box xcss={{ padding: 'space.600' }}>
        <Stack space="space.400">
          {/* Info Message */}
          <SectionMessage
            title="New components available"
            appearance="discovery"
          >
            <p>We've added new data visualization components and improved accessibility across all form elements.</p>
          </SectionMessage>

          {/* Features Grid */}
          <Grid 
            templateColumns="repeat(auto-fit, minmax(300px, 1fr))" 
            gap="space.300"
          >
            <div style={styles.card}>
              <Stack space="space.200">
                <div style={styles.iconWrapper}>
                  <HomeIcon 
                    label="Home" 
                    size="medium" 
                    primaryColor={token('color.icon.brand')} 
                  />
                </div>
                <div>
                  <h3 style={styles.cardHeading}>
                    Design Foundations
                  </h3>
                  <p style={styles.cardText}>
                    Learn about our design principles, color system, typography, and spacing guidelines.
                  </p>
                </div>
                <Inline space="space.100">
                  <Badge appearance="primary">12 articles</Badge>
                  <Lozenge appearance="success">Updated</Lozenge>
                </Inline>
              </Stack>
            </div>

            <div style={styles.card}>
              <Stack space="space.200">
                <div style={styles.iconWrapper}>
                  <BoardIcon 
                    label="Components" 
                    size="medium" 
                    primaryColor={token('color.icon.discovery')} 
                  />
                </div>
                <div>
                  <h3 style={styles.cardHeading}>
                    Component Library
                  </h3>
                  <p style={styles.cardText}>
                    Explore our 70+ components with live examples, API documentation, and best practices.
                  </p>
                </div>
                <Inline space="space.100">
                  <Badge appearance="primary">70+ components</Badge>
                  <Lozenge appearance="new">New additions</Lozenge>
                </Inline>
              </Stack>
            </div>

            <div style={styles.card}>
              <Stack space="space.200">
                <div style={styles.iconWrapper}>
                  <PeopleIcon 
                    label="Community" 
                    size="medium" 
                    primaryColor={token('color.icon.success')} 
                  />
                </div>
                <div>
                  <h3 style={styles.cardHeading}>
                    Community & Support
                  </h3>
                  <p style={styles.cardText}>
                    Join our community, get help from experts, and contribute to the design system.
                  </p>
                </div>
                <Inline space="space.100">
                  <Badge appearance="primary">5k+ members</Badge>
                  <Lozenge appearance="inprogress">Active</Lozenge>
                </Inline>
              </Stack>
            </div>
          </Grid>

          {/* Quick Start Section */}
          <Box xcss={{ marginTop: 'space.400' }}>
            <Stack space="space.300">
              <h2 style={{ 
                fontSize: token('font.size.400'), 
                fontWeight: token('font.weight.semibold'),
                margin: 0 
              }}>
                Quick Start
              </h2>

              <Grid templateColumns="1fr 1fr" gap="space.300">
                <div style={styles.codeBlock}>
                  <code>npm install @atlaskit/button</code>
                </div>
                <div style={styles.codeBlock}>
                  <code>npm install @atlaskit/form</code>
                </div>
              </Grid>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};
```

### Authentication Form
```tsx
import { token } from '@atlaskit/tokens';
import Form, { Field, ErrorMessage, HelperMessage } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { Stack, Box, Inline } from '@atlaskit/primitives';
import PersonIcon from '@atlaskit/icon/glyph/person';
import LockIcon from '@atlaskit/icon/glyph/lock';

export const LoginForm = () => {
  const handleSubmit = (data: { email: string; password: string }) => {
    console.log('Login data:', data);
  };

  const styles = {
    container: {
      width: '400px',
      margin: '0 auto',
      padding: token('space.400'),
      backgroundColor: token('color.background.neutral'),
      borderRadius: token('border.radius.200'),
      boxShadow: token('elevation.shadow.raised'),
    },
    heading: {
      fontSize: token('font.size.400'),
      fontWeight: token('font.weight.bold'),
      color: token('color.text'),
      margin: 0,
      marginBottom: token('space.300'),
    },
    iconWrapper: {
      paddingInline: token('space.100'),
    },
  };

  return (
    <div style={styles.container}>
      <Form onSubmit={handleSubmit}>
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <Stack space="space.300">
              <h2 style={styles.heading}>Sign in to your account</h2>

              <Field
                name="email"
                label="Email"
                isRequired
                defaultValue=""
              >
                {({ fieldProps, error }) => (
                  <>
                    <Textfield
                      {...fieldProps}
                      type="email"
                      placeholder="Enter your email"
                      elemBeforeInput={
                        <div style={styles.iconWrapper}>
                          <PersonIcon label="Email" size="small" />
                        </div>
                      }
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                  </>
                )}
              </Field>

              <Field
                name="password"
                label="Password"
                isRequired
                defaultValue=""
              >
                {({ fieldProps, error }) => (
                  <>
                    <Textfield
                      {...fieldProps}
                      type="password"
                      placeholder="Enter your password"
                      elemBeforeInput={
                        <div style={styles.iconWrapper}>
                          <LockIcon label="Password" size="small" />
                        </div>
                      }
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <HelperMessage>
                      Forgot your password? <a href="/reset">Reset it here</a>
                    </HelperMessage>
                  </>
                )}
              </Field>

              <Button
                type="submit"
                appearance="primary"
                isLoading={submitting}
                shouldFitContainer
              >
                Sign in
              </Button>
            </Stack>
          </form>
        )}
      </Form>
    </div>
  );
};
```

### Project Dashboard
```tsx
import { token } from '@atlaskit/tokens';
import { Grid, Stack, Box, Inline } from '@atlaskit/primitives';
import Badge from '@atlaskit/badge';
import Lozenge from '@atlaskit/lozenge';
import Button from '@atlaskit/button';
import Avatar from '@atlaskit/avatar';
import AvatarGroup from '@atlaskit/avatar-group';
import BoardIcon from '@atlaskit/icon/glyph/board';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
import GraphLineIcon from '@atlaskit/icon/glyph/graph-line';

const StatCard = ({ title, value, icon, trend }: any) => {
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

export const ProjectDashboard = () => {
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

### Task Management Table
```tsx
import { token } from '@atlaskit/tokens';
import DynamicTable from '@atlaskit/dynamic-table';
import Avatar from '@atlaskit/avatar';
import Lozenge from '@atlaskit/lozenge';
import DropdownMenu, { 
  DropdownItem,
  DropdownItemGroup 
} from '@atlaskit/dropdown-menu';
import Button from '@atlaskit/button';
import { Inline } from '@atlaskit/primitives';
import MoreIcon from '@atlaskit/icon/glyph/more';
import EditIcon from '@atlaskit/icon/glyph/edit';
import TrashIcon from '@atlaskit/icon/glyph/trash';

interface Task {
  id: string;
  title: string;
  assignee: {
    name: string;
    avatar?: string;
  };
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: string;
}

const statusAppearanceMap = {
  'todo': 'default',
  'in-progress': 'inprogress',
  'done': 'success',
} as const;

const priorityAppearanceMap = {
  'low': 'default',
  'medium': 'new',
  'high': 'important',
  'critical': 'removed',
} as const;

export const TaskTable = ({ tasks }: { tasks: Task[] }) => {
  const styles = {
    title: {
      fontWeight: 500,
    },
    subtitle: {
      fontSize: '12px',
      color: token('color.text.subtle'),
    },
  };

  const head = {
    cells: [
      { key: 'title', content: 'Task', isSortable: true, width: 40 },
      { key: 'assignee', content: 'Assignee', isSortable: true, width: 20 },
      { key: 'status', content: 'Status', isSortable: true, width: 15 },
      { key: 'priority', content: 'Priority', isSortable: true, width: 15 },
      { key: 'actions', content: '', width: 10 },
    ],
  };

  const rows = tasks.map((task) => ({
    key: task.id,
    cells: [
      {
        key: 'title',
        content: (
          <div>
            <div style={styles.title}>{task.title}</div>
            <div style={styles.subtitle}>
              Due: {task.dueDate}
            </div>
          </div>
        ),
      },
      {
        key: 'assignee',
        content: (
          <Inline space="space.100" alignBlock="center">
            <Avatar name={task.assignee.name} src={task.assignee.avatar} size="small" />
            <span>{task.assignee.name}</span>
          </Inline>
        ),
      },
      {
        key: 'status',
        content: (
          <Lozenge appearance={statusAppearanceMap[task.status]}>
            {task.status.replace('-', ' ')}
          </Lozenge>
        ),
      },
      {
        key: 'priority',
        content: (
          <Lozenge appearance={priorityAppearanceMap[task.priority]}>
            {task.priority}
          </Lozenge>
        ),
      },
      {
        key: 'actions',
        content: (
          <DropdownMenu
            trigger={({ triggerRef, ...props }) => (
              <Button
                {...props}
                ref={triggerRef}
                appearance="subtle"
                iconBefore={<MoreIcon label="More actions" />}
              />
            )}
          >
            <DropdownItemGroup>
              <DropdownItem>
                <Inline space="space.100">
                  <EditIcon label="" size="small" />
                  Edit
                </Inline>
              </DropdownItem>
              <DropdownItem>
                <Inline space="space.100">
                  <TrashIcon label="" size="small" />
                  Delete
                </Inline>
              </DropdownItem>
            </DropdownItemGroup>
          </DropdownMenu>
        ),
      },
    ],
  }));

  return (
    <DynamicTable
      head={head}
      rows={rows}
      rowsPerPage={10}
      defaultPage={1}
      isLoading={false}
      emptyView={<h2>No tasks found</h2>}
    />
  );
};
```

### Complex Form with Select Components
```tsx
import { token } from '@atlaskit/tokens';
import Form, { Field } from '@atlaskit/form';
import Select, { CreatableSelect, AsyncSelect } from '@atlaskit/select';
import DatePicker from '@atlaskit/datetime-picker';
import { RadioGroup } from '@atlaskit/radio';
import { CheckboxGroup } from '@atlaskit/checkbox';
import Button from '@atlaskit/button';
import { Stack, Grid } from '@atlaskit/primitives';

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Critical', value: 'critical' },
];

const categoryOptions = [
  { label: 'Bug', value: 'bug' },
  { label: 'Feature', value: 'feature' },
  { label: 'Task', value: 'task' },
  { label: 'Epic', value: 'epic' },
];

export const IssueForm = () => {
  const loadAssignees = (inputValue: string) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const options = [
          { label: 'John Doe', value: 'john' },
          { label: 'Jane Smith', value: 'jane' },
          { label: 'Bob Johnson', value: 'bob' },
        ].filter(i => 
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        resolve(options);
      }, 1000);
    });
  };

  return (
    <Form onSubmit={(data) => console.log('Form data:', data)}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <Stack space="space.300">
            <Field name="type" label="Issue Type" isRequired defaultValue="task">
              {({ fieldProps }) => (
                <RadioGroup
                  {...fieldProps}
                  options={[
                    { name: 'type', value: 'task', label: 'Task' },
                    { name: 'type', value: 'bug', label: 'Bug' },
                    { name: 'type', value: 'story', label: 'Story' },
                  ]}
                />
              )}
            </Field>

            <Grid gap="space.200" templateColumns="1fr 1fr">
              <Field name="priority" label="Priority" defaultValue={priorityOptions[1]}>
                {({ fieldProps }) => (
                  <Select
                    {...fieldProps}
                    options={priorityOptions}
                    placeholder="Select priority"
                  />
                )}
              </Field>

              <Field name="dueDate" label="Due Date">
                {({ fieldProps }) => (
                  <DatePicker
                    {...fieldProps}
                    placeholder="Select date"
                    dateFormat="DD/MM/YYYY"
                  />
                )}
              </Field>
            </Grid>

            <Field name="assignee" label="Assignee">
              {({ fieldProps }) => (
                <AsyncSelect
                  {...fieldProps}
                  loadOptions={loadAssignees}
                  placeholder="Search for assignee..."
                />
              )}
            </Field>

            <Field name="labels" label="Labels">
              {({ fieldProps }) => (
                <CreatableSelect
                  {...fieldProps}
                  isMulti
                  placeholder="Add labels..."
                />
              )}
            </Field>

            <Field name="categories" label="Categories">
              {({ fieldProps }) => (
                <CheckboxGroup
                  {...fieldProps}
                  options={categoryOptions.map(opt => ({
                    label: opt.label,
                    value: opt.value,
                  }))}
                />
              )}
            </Field>

            <Button
              type="submit"
              appearance="primary"
              isLoading={submitting}
            >
              Create Issue
            </Button>
          </Stack>
        </form>
      )}
    </Form>
  );
};
```

## Best Practices Summary

1. **Always use design tokens** - Never hardcode colors, spacing, or shadows
2. **Use inline styles** - Simple and performant approach
3. **xcss for spacing only** - Remember the limitations
4. **Prefer Atlaskit components** - Don't recreate existing functionality
5. **Use primitives for layout** - Stack, Inline, Box, Grid
6. **Include accessibility** - Labels for icons, ARIA attributes
7. **Handle loading states** - Show appropriate feedback during async operations
8. **Implement error handling** - Clear messages and recovery options
9. **Test responsive behavior** - Ensure components work on all screen sizes
10. **No external CSS-in-JS** - Don't use Emotion, styled-components, etc.