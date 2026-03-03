import React, { useState } from "react";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import DynamicTable from "@atlaskit/dynamic-table";
import Lozenge from "@atlaskit/lozenge";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button/new";
import SearchIcon from "@atlaskit/icon/core/search";
import FilterIcon from "@atlaskit/icon/core/filter";
import DownloadIcon from "@atlaskit/icon/core/download";
import EditIcon from "@atlaskit/icon/core/edit";

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: token("border.radius.400"),
  padding: token("space.400"),
  border: `1px solid ${token("color.border")}`,
};

interface Employee {
  id: string;
  initials: string;
  firstName: string;
  lastName: string;
  jobProfile: string;
  level: string;
  promotion: string;
  performance: string;
  currentSalary: number;
  smpPercent: string;
  newSalary: number;
  newSmpPercent: string;
  bonus: number;
  newEquity: string;
  status: string;
}

const employees: Employee[] = [
  {
    id: "1",
    initials: "SJ",
    firstName: "Sarah",
    lastName: "Jenkins",
    jobProfile: "Senior Product Designer",
    level: "P4",
    promotion: "No",
    performance: "Meets Expectations",
    currentSalary: 145000,
    smpPercent: "+45.0%",
    newSalary: 0,
    newSmpPercent: "-45.0% (-100.0)",
    bonus: 0,
    newEquity: "0k units",
    status: "pending",
  },
  {
    id: "2",
    initials: "MC",
    firstName: "Michael",
    lastName: "Chen",
    jobProfile: "Engineering Manager",
    level: "M3",
    promotion: "No",
    performance: "Meets Expectations",
    currentSalary: 185000,
    smpPercent: "+85.0%",
    newSalary: 0,
    newSmpPercent: "-85.0% (-100.0)",
    bonus: 0,
    newEquity: "0k units",
    status: "pending",
  },
  {
    id: "3",
    initials: "JW",
    firstName: "Jessica",
    lastName: "Wu",
    jobProfile: "Software Engineer II",
    level: "P3",
    promotion: "No",
    performance: "Meets Expectations",
    currentSalary: 120000,
    smpPercent: "+20.0%",
    newSalary: 0,
    newSmpPercent: "-20.0% (-100.0)",
    bonus: 0,
    newEquity: "0k units",
    status: "pending",
  },
  {
    id: "4",
    initials: "DM",
    firstName: "David",
    lastName: "Miller",
    jobProfile: "Principal Product Manager",
    level: "P6",
    promotion: "No",
    performance: "Meets Expectations",
    currentSalary: 195000,
    smpPercent: "+95.0%",
    newSalary: 0,
    newSmpPercent: "-95.0% (-100.0)",
    bonus: 0,
    newEquity: "0k units",
    status: "pending",
  },
  {
    id: "5",
    initials: "EW",
    firstName: "Emma",
    lastName: "Wilson",
    jobProfile: "Marketing Specialist",
    level: "P2",
    promotion: "No",
    performance: "Meets Expectations",
    currentSalary: 75000,
    smpPercent: "-25.0%",
    newSalary: 0,
    newSmpPercent: "+25.0% (+100.0)",
    bonus: 0,
    newEquity: "0k units",
    status: "pending",
  },
  {
    id: "6",
    initials: "JR",
    firstName: "James",
    lastName: "Rodriguez",
    jobProfile: "Customer Success Lead",
    level: "P4",
    promotion: "No",
    performance: "Meets Expectations",
    currentSalary: 110000,
    smpPercent: "+10.0%",
    newSalary: 0,
    newSmpPercent: "-10.0% (-100.0)",
    bonus: 0,
    newEquity: "0k units",
    status: "pending",
  },
  {
    id: "7",
    initials: "LC",
    firstName: "Lisa",
    lastName: "Chang",
    jobProfile: "Data Scientist",
    level: "P4",
    promotion: "No",
    performance: "Meets Expectations",
    currentSalary: 135000,
    smpPercent: "+35.0%",
    newSalary: 0,
    newSmpPercent: "-35.0% (-100.0)",
    bonus: 0,
    newEquity: "0k units",
    status: "pending",
  },
  {
    id: "8",
    initials: "RT",
    firstName: "Robert",
    lastName: "Taylor",
    jobProfile: "DevOps Engineer",
    level: "P3",
    promotion: "No",
    performance: "Meets Expectations",
    currentSalary: 95000,
    smpPercent: "-5.0%",
    newSalary: 0,
    newSmpPercent: "+5.0% (+100.0)",
    bonus: 0,
    newEquity: "0k units",
    status: "pending",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

function AvatarInitials({ initials }: { initials: string }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        backgroundColor: token("color.background.accent.blue.subtler"),
        color: token("color.text.accent.blue"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: 12,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function SummaryCard({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) {
  return (
    <div
      style={{
        ...cardStyle,
        flex: 1,
      }}
    >
      <Text size="medium" color="color.text.subtlest">{title}</Text>
      <div style={{ marginTop: token("space.100") }}>
        <Heading size="xlarge">{value}</Heading>
      </div>
      {subtitle && (
        <div style={{ marginTop: token("space.050") }}>
          <Text size="small" color="color.text.subtlest">{subtitle}</Text>
        </div>
      )}
    </div>
  );
}

const head = {
  cells: [
    { key: "name", content: "NAME", isSortable: true, width: 12 },
    { key: "jobProfile", content: "JOB PROFILE", isSortable: true, width: 10 },
    { key: "level", content: "LEVEL", isSortable: true, width: 5 },
    { key: "promotion", content: "PROMOTION", width: 5 },
    { key: "performance", content: "PERFORMANCE", width: 9 },
    { key: "currentSalary", content: "CURRENT SALARY", isSortable: true, width: 8 },
    { key: "smpPercent", content: "SMP %", width: 6 },
    { key: "newSalary", content: "NEW SALARY (AM'T)", width: 7 },
    { key: "newSmpPercent", content: "NEW SMP %", width: 10 },
    { key: "bonus", content: "BONUS", width: 5 },
    { key: "newEquity", content: "NEW EQUITY", width: 6 },
    { key: "status", content: "STATUS", width: 6 },
    { key: "actions", content: "", width: 3 },
  ],
};

const createRows = (data: Employee[], searchQuery: string) => {
  const filtered = searchQuery
    ? data.filter(
        (e) =>
          `${e.firstName} ${e.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.jobProfile.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data;

  return filtered.map((employee) => ({
    key: employee.id,
    cells: [
      {
        key: employee.lastName,
        content: (
          <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
            <AvatarInitials initials={employee.initials} />
            <Text size="medium" weight="medium">
              {employee.firstName} {employee.lastName}
            </Text>
          </div>
        ),
      },
      {
        key: employee.jobProfile,
        content: <Text size="small">{employee.jobProfile}</Text>,
      },
      {
        key: employee.level,
        content: <Text size="small">{employee.level}</Text>,
      },
      {
        key: employee.promotion,
        content: <Text size="small">{employee.promotion}</Text>,
      },
      {
        key: employee.performance,
        content: <Text size="small">{employee.performance}</Text>,
      },
      {
        key: employee.currentSalary,
        content: <Text size="small" weight="bold">{formatCurrency(employee.currentSalary)}</Text>,
      },
      {
        key: employee.smpPercent,
        content: (
          <Text
            size="small"
            color={employee.smpPercent.startsWith("-") ? "color.text.danger" : "color.text.success"}
          >
            {employee.smpPercent}
          </Text>
        ),
      },
      {
        key: employee.newSalary,
        content: <Text size="small">{formatCurrency(employee.newSalary)}</Text>,
      },
      {
        key: employee.newSmpPercent,
        content: (
          <Text
            size="small"
            color={employee.newSmpPercent.startsWith("+") ? "color.text.success" : "color.text.danger"}
          >
            {employee.newSmpPercent}
          </Text>
        ),
      },
      {
        key: employee.bonus,
        content: <Text size="small">{formatCurrency(employee.bonus)}</Text>,
      },
      {
        key: employee.newEquity,
        content: <Text size="small">{employee.newEquity}</Text>,
      },
      {
        key: employee.status,
        content: <Lozenge appearance="moved">{employee.status}</Lozenge>,
      },
      {
        key: "actions",
        content: (
          <Button appearance="subtle" iconBefore={EditIcon} label="Edit" />
        ),
      },
    ],
  }));
};

export default function TeamOverview() {
  const [searchQuery, setSearchQuery] = useState("");

  const rows = createRows(employees, searchQuery);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.400") }}>
      <div style={{ display: "flex", gap: token("space.400") }}>
        <SummaryCard title="Equity Allocated" value="$0" />
        <SummaryCard title="Equity Spent" value="$0" />
        <SummaryCard title="Team Risk" value="9" subtitle="Expiring shares" />
      </div>

      <div style={cardStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: token("space.400"),
          }}
        >
          <Heading size="large">Team Assignments</Heading>
          <div style={{ display: "flex", gap: token("space.200"), alignItems: "center" }}>
            <div style={{ width: 200 }}>
              <Textfield
                placeholder="Search by name"
                elemBeforeInput={
                  <div style={{ paddingLeft: token("space.100"), display: "flex", alignItems: "center" }}>
                    <SearchIcon label="search" color={token("color.icon.subtle")} />
                  </div>
                }
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button appearance="default" iconBefore={FilterIcon}>
              Filters
            </Button>
            <Button appearance="default" iconBefore={DownloadIcon}>
              Export
            </Button>
          </div>
        </div>

        <DynamicTable
          head={head}
          rows={rows}
          rowsPerPage={10}
          defaultPage={1}
          isFixedSize
          defaultSortKey="name"
          defaultSortOrder="ASC"
        />

        <div style={{ marginTop: token("space.200") }}>
          <Text size="small" color="color.text.subtlest">
            Showing {rows.length} of {employees.length} employees
          </Text>
        </div>
      </div>
    </div>
  );
}
