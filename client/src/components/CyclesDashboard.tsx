import React from "react";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import DynamicTable from "@atlaskit/dynamic-table";
import Lozenge from "@atlaskit/lozenge";
import Button from "@atlaskit/button/new";
import AddIcon from "@atlaskit/icon/core/add";
import CalendarIcon from "@atlaskit/icon/core/calendar";
import PeopleGroupIcon from "@atlaskit/icon/core/people-group";
import ShowMoreVerticalIcon from "@atlaskit/icon/core/show-more-vertical";
import { IconButton } from "@atlaskit/button/new";

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: "6px",
  padding: token("space.400"),
  border: `1px solid ${token("color.border")}`,
};

interface Cycle {
  id: string;
  name: string;
  subtitle: string;
  type: string;
  status: "Active" | "Inactive" | "Finalized";
  timeline: string;
  participants: number;
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
    progress: 45,
  },
  {
    id: "3",
    name: "Q1 2026 Equity Refresh",
    subtitle: "Due in 42 days",
    type: "Equity",
    status: "Inactive",
    timeline: "2/28/2026 - 5/29/2026",
    participants: 892,
    progress: 12,
  },
  {
    id: "4",
    name: "FY2025 Annual Merit Cycle",
    subtitle: "",
    type: "Merit",
    status: "Finalized",
    timeline: "1/9/2025 - 3/24/2025",
    participants: 1756,
    progress: 100,
  },
  {
    id: "5",
    name: "FY2025 Mid-Year Adjustment",
    subtitle: "",
    type: "Merit",
    status: "Finalized",
    timeline: "6/30/2025 - 8/14/2025",
    participants: 234,
    progress: 100,
  },
];

function StatusLozenge({ status }: { status: Cycle["status"] }) {
  const appearance = status === "Active"
    ? "success"
    : status === "Inactive"
      ? "default"
      : "moved";
  return <Lozenge appearance={appearance} isBold>{status}</Lozenge>;
}

const head = {
  cells: [
    { key: "name", content: "CYCLE NAME", isSortable: true, width: 20 },
    { key: "type", content: "TYPE", isSortable: true, width: 10 },
    { key: "status", content: "STATUS", width: 10 },
    { key: "timeline", content: "TIMELINE", width: 16 },
    { key: "participants", content: "PARTICIPANTS", isSortable: true, width: 12 },
    { key: "actions", content: "ACTIONS", width: 6 },
  ],
};

interface CyclesDashboardProps {
  onCreateCycle?: () => void;
  onSelectCycle?: (cycle: Cycle) => void;
}

function parseEndDate(timeline: string): number {
  const parts = timeline.split(" - ");
  if (parts.length < 2) return 0;
  return new Date(parts[1]).getTime();
}

const sortedCycles = [...cycles].sort((a, b) => parseEndDate(b.timeline) - parseEndDate(a.timeline));

function buildRows(onSelectCycle?: (cycle: Cycle) => void) {
  return sortedCycles.map((cycle) => ({
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
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.400") }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <Heading size="xlarge">Compensation Cycle Dashboard</Heading>
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

      <div style={{ ...cardStyle, paddingTop: token("space.300"), paddingLeft: token("space.300"), paddingRight: token("space.300"), paddingBottom: token("space.025") }}>
        <div className="no-last-row-border">
          <DynamicTable
            head={head}
            rows={buildRows(onSelectCycle)}
            rowsPerPage={10}
            defaultPage={1}
            isFixedSize
          />
        </div>
      </div>
    </div>
  );
}
