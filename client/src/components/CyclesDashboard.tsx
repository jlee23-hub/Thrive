import React from "react";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import DynamicTable from "@atlaskit/dynamic-table";
import Lozenge from "@atlaskit/lozenge";
import ProgressBar from "@atlaskit/progress-bar";
import Button from "@atlaskit/button/new";
import AddIcon from "@atlaskit/icon/core/add";
import CalendarIcon from "@atlaskit/icon/core/calendar";
import PeopleGroupIcon from "@atlaskit/icon/core/people-group";
import PageIcon from "@atlaskit/icon/core/page";
import ShowMoreVerticalIcon from "@atlaskit/icon/core/show-more-vertical";
import { IconButton } from "@atlaskit/button/new";

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: token("border.radius.300"),
  padding: token("space.400"),
  boxShadow: token("elevation.shadow.raised"),
};

interface Cycle {
  id: string;
  name: string;
  subtitle: string;
  type: string;
  status: "Active" | "Planning" | "Completed";
  timeline: string;
  participants: number;
  budget: string;
  progress: number;
}

const cycles: Cycle[] = [
  {
    id: "1",
    name: "FY2026 Annual Merit Cycle",
    subtitle: "Due in 14 days",
    type: "Merit",
    status: "Active",
    timeline: "1/14/2026 - 3/30/2026",
    participants: 1842,
    budget: "$28.5M",
    progress: 67,
  },
  {
    id: "2",
    name: "FY2026 Promotion Cycle",
    subtitle: "Due in 28 days",
    type: "Promotion",
    status: "Active",
    timeline: "1/31/2026 - 4/14/2026",
    participants: 456,
    budget: "$8.2M",
    progress: 45,
  },
  {
    id: "3",
    name: "Q1 2026 Equity Refresh",
    subtitle: "Due in 42 days",
    type: "Equity",
    status: "Planning",
    timeline: "2/28/2026 - 5/29/2026",
    participants: 892,
    budget: "$5.8M",
    progress: 12,
  },
  {
    id: "4",
    name: "FY2025 Annual Merit Cycle",
    subtitle: "Due in Closed",
    type: "Merit",
    status: "Completed",
    timeline: "1/9/2025 - 3/24/2025",
    participants: 1756,
    budget: "$26.3M",
    progress: 100,
  },
  {
    id: "5",
    name: "FY2025 Mid-Year Adjustment",
    subtitle: "Due in Closed",
    type: "Merit",
    status: "Completed",
    timeline: "6/30/2025 - 8/14/2025",
    participants: 234,
    budget: "$1.8M",
    progress: 100,
  },
];

function StatusLozenge({ status }: { status: Cycle["status"] }) {
  const appearance = status === "Active"
    ? "success"
    : status === "Planning"
      ? "moved"
      : "default";
  return <Lozenge appearance={appearance} isBold>{status}</Lozenge>;
}

function SummaryStatCard({
  title,
  value,
  icon,
  borderColor,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  borderColor: string;
}) {
  return (
    <div
      style={{
        ...cardStyle,
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderLeft: `4px solid ${borderColor}`,
      }}
    >
      <div>
        <Text size="small" color="color.text.subtlest">{title}</Text>
        <div style={{ marginTop: token("space.100") }}>
          <Heading size="xlarge">{value}</Heading>
        </div>
      </div>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: token("color.background.neutral"),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
    </div>
  );
}

const head = {
  cells: [
    { key: "name", content: "CYCLE NAME", isSortable: true, width: 20 },
    { key: "type", content: "TYPE", isSortable: true, width: 10 },
    { key: "status", content: "STATUS", width: 10 },
    { key: "timeline", content: "TIMELINE", width: 16 },
    { key: "participants", content: "PARTICIPANTS", isSortable: true, width: 12 },
    { key: "budget", content: "BUDGET", isSortable: true, width: 10 },
    { key: "progress", content: "PROGRESS", width: 16 },
    { key: "actions", content: "ACTIONS", width: 6 },
  ],
};

interface CyclesDashboardProps {
  onCreateCycle?: () => void;
  onSelectCycle?: (cycle: Cycle) => void;
}

function buildRows(onSelectCycle?: (cycle: Cycle) => void) {
  return cycles.map((cycle) => ({
    key: cycle.id,
    cells: [
      {
        key: cycle.name,
        content: (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => onSelectCycle?.(cycle)}
          >
            <Text size="medium" weight="bold" color="color.link">{cycle.name}</Text>
            <div>
              <Text size="small" color="color.text.subtlest">{cycle.subtitle}</Text>
            </div>
          </div>
        ),
      },
      {
        key: cycle.type,
        content: <Text size="small">{cycle.type}</Text>,
      },
      {
        key: cycle.status,
        content: <StatusLozenge status={cycle.status} />,
      },
      {
        key: cycle.timeline,
        content: (
          <div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
            <CalendarIcon label="" color={token("color.icon.subtle")} />
            <Text size="small">{cycle.timeline}</Text>
          </div>
        ),
      },
      {
        key: cycle.participants,
        content: (
          <div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
            <PeopleGroupIcon label="" color={token("color.icon.subtle")} />
            <Text size="small">{cycle.participants.toLocaleString()}</Text>
          </div>
        ),
      },
      {
        key: cycle.budget,
        content: <Text size="small" weight="bold">{cycle.budget}</Text>,
      },
      {
        key: cycle.progress,
        content: (
          <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), minWidth: 120 }}>
            <div style={{ flex: 1 }}>
              <ProgressBar
                appearance={cycle.progress === 100 ? "success" : "default"}
                value={cycle.progress / 100}
              />
            </div>
            <Text size="small" color="color.text.subtlest">{cycle.progress}%</Text>
          </div>
        ),
      },
      {
        key: "actions",
        content: (
          <IconButton
            icon={ShowMoreVerticalIcon}
            label="More actions"
            appearance="subtle"
          />
        ),
      },
    ],
  }));
}

export default function CyclesDashboard({ onCreateCycle, onSelectCycle }: CyclesDashboardProps) {
  const activeCycles = cycles.filter((c) => c.status === "Active").length;
  const inactiveCycles = cycles.filter((c) => c.status === "Planning").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.400") }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <Heading size="xlarge">Compensation Cycle Dash</Heading>
          <div style={{ marginTop: token("space.050") }}>
            <Text size="medium" color="color.text.subtlest">
              Manage and monitor all compensation cycles across your organization
            </Text>
          </div>
        </div>
        <Button appearance="primary" iconBefore={AddIcon} onClick={onCreateCycle}>
          Create New Cycle
        </Button>
      </div>

      <div style={{ display: "flex", gap: token("space.400") }}>
        <SummaryStatCard
          title="Total Cycles"
          value={String(cycles.length)}
          icon={<PageIcon label="" color={token("color.icon.brand")} />}
          borderColor={token("color.border.brand")}
        />
        <SummaryStatCard
          title="Active Cycles"
          value={String(activeCycles)}
          icon={<PageIcon label="" color={token("color.icon.success")} />}
          borderColor={token("color.border.success")}
        />
        <SummaryStatCard
          title="Inactive Cycles"
          value={String(inactiveCycles)}
          icon={<PageIcon label="" color={token("color.icon.subtle")} />}
          borderColor={token("color.border")}
        />
      </div>

      <div style={cardStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: token("space.100"),
            marginBottom: token("space.400"),
          }}
        >
          <PageIcon label="" color={token("color.icon")} />
          <Heading size="medium">All Cycles</Heading>
        </div>

        <DynamicTable
          head={head}
          rows={buildRows(onSelectCycle)}
          rowsPerPage={10}
          defaultPage={1}
          isFixedSize
          defaultSortKey="name"
          defaultSortOrder="ASC"
        />
      </div>
    </div>
  );
}
