import React, { useState } from "react";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import DynamicTable from "@atlaskit/dynamic-table";
import Lozenge from "@atlaskit/lozenge";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button/new";
import Select from "@atlaskit/select";
import { Checkbox } from "@atlaskit/checkbox";
import SearchIcon from "@atlaskit/icon/core/search";
import FilterIcon from "@atlaskit/icon/core/filter";
import SortAscendingIcon from "@atlaskit/icon/core/sort-ascending";
import EditIcon from "@atlaskit/icon/core/edit";

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: "6px",
  padding: token("space.400"),
  border: `1px solid ${token("color.border")}`,
};

interface Employee {
  id: string;
  initials: string;
  firstName: string;
  lastName: string;
  startDate: string;
  eligibilityDate: string;
  jobLevel: string;
  jobFamily: string;
  zone: string;
  currentBaseSalary: number;
  srpPercent: string;
  currentEquity: string;
  fy24H2Rating: string;
  managerId?: string;
  isManager?: boolean;
}

const employees: Employee[] = [
  {
    id: "1",
    initials: "SJ",
    firstName: "Sarah",
    lastName: "Jenkins",
    startDate: "Mar 15, 2019",
    eligibilityDate: "Mar 15, 2020",
    jobLevel: "P40",
    jobFamily: "Design",
    zone: "Zone A USA",
    currentBaseSalary: 145000,
    srpPercent: "112%",
    currentEquity: "1,250 RSUs",
    fy24H2Rating: "Meets Expectations",
  },
  {
    id: "2",
    initials: "MC",
    firstName: "Michael",
    lastName: "Chen",
    startDate: "Jun 01, 2018",
    eligibilityDate: "Jun 01, 2019",
    jobLevel: "M50",
    jobFamily: "Engineering",
    zone: "Zone A USA",
    currentBaseSalary: 185000,
    srpPercent: "125%",
    currentEquity: "2,800 RSUs",
    fy24H2Rating: "Exceeds Expectations",
    isManager: true,
  },
  {
    id: "3",
    initials: "JW",
    firstName: "Jessica",
    lastName: "Wu",
    startDate: "Jan 10, 2021",
    eligibilityDate: "Jan 10, 2022",
    jobLevel: "P30",
    jobFamily: "Engineering",
    zone: "Zone B USA",
    currentBaseSalary: 120000,
    srpPercent: "104%",
    currentEquity: "800 RSUs",
    fy24H2Rating: "Meets Expectations",
    managerId: "2",
  },
  {
    id: "4",
    initials: "DM",
    firstName: "David",
    lastName: "Miller",
    startDate: "Sep 22, 2017",
    eligibilityDate: "Sep 22, 2018",
    jobLevel: "M50",
    jobFamily: "Product",
    zone: "Zone A USA",
    currentBaseSalary: 195000,
    srpPercent: "138%",
    currentEquity: "4,200 RSUs",
    fy24H2Rating: "Greatly Exceeds",
    isManager: true,
  },
  {
    id: "5",
    initials: "EW",
    firstName: "Emma",
    lastName: "Wilson",
    startDate: "Aug 05, 2022",
    eligibilityDate: "Aug 05, 2023",
    jobLevel: "P20",
    jobFamily: "Marketing",
    zone: "Zone C USA",
    currentBaseSalary: 75000,
    srpPercent: "95%",
    currentEquity: "400 RSUs",
    fy24H2Rating: "Meets Expectations",
    managerId: "4",
  },
  {
    id: "6",
    initials: "JR",
    firstName: "James",
    lastName: "Rodriguez",
    startDate: "Feb 14, 2020",
    eligibilityDate: "Feb 14, 2021",
    jobLevel: "P40",
    jobFamily: "Customer Success",
    zone: "Zone B USA",
    currentBaseSalary: 110000,
    srpPercent: "108%",
    currentEquity: "950 RSUs",
    fy24H2Rating: "Met Some",
    managerId: "2",
  },
  {
    id: "7",
    initials: "LC",
    firstName: "Lisa",
    lastName: "Chang",
    startDate: "Nov 30, 2019",
    eligibilityDate: "Nov 30, 2020",
    jobLevel: "P40",
    jobFamily: "Data Science",
    zone: "Zone A USA",
    currentBaseSalary: 135000,
    srpPercent: "118%",
    currentEquity: "1,600 RSUs",
    fy24H2Rating: "Exceeds Expectations",
  },
  {
    id: "8",
    initials: "RT",
    firstName: "Robert",
    lastName: "Taylor",
    startDate: "Apr 18, 2021",
    eligibilityDate: "Apr 18, 2022",
    jobLevel: "P30",
    jobFamily: "Engineering",
    zone: "Zone C USA",
    currentBaseSalary: 95000,
    srpPercent: "102%",
    currentEquity: "600 RSUs",
    fy24H2Rating: "Meets Expectations",
    managerId: "4",
  },
  {
    id: "9",
    initials: "AP",
    firstName: "Anika",
    lastName: "Patel",
    startDate: "May 12, 2020",
    eligibilityDate: "May 12, 2021",
    jobLevel: "P30",
    jobFamily: "Engineering",
    zone: "Zone A USA",
    currentBaseSalary: 128000,
    srpPercent: "110%",
    currentEquity: "900 RSUs",
    fy24H2Rating: "Exceeds Expectations",
    managerId: "2",
  },
  {
    id: "10",
    initials: "KN",
    firstName: "Kevin",
    lastName: "Nguyen",
    startDate: "Jul 08, 2021",
    eligibilityDate: "Jul 08, 2022",
    jobLevel: "P20",
    jobFamily: "Product",
    zone: "Zone B USA",
    currentBaseSalary: 98000,
    srpPercent: "100%",
    currentEquity: "500 RSUs",
    fy24H2Rating: "Meets Expectations",
    managerId: "4",
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

const ratingAppearance = (rating: string): "success" | "inprogress" | "default" | "moved" | "removed" => {
  if (rating === "Greatly Exceeds") return "success";
  if (rating === "Exceeds Expectations") return "inprogress";
  if (rating === "Meets Expectations") return "default";
  if (rating === "Met Some") return "moved";
  return "removed";
};

const head = {
  cells: [
    { key: "name", content: "NAME", isSortable: true, width: 14 },
    { key: "startDate", content: "START DATE", isSortable: true, width: 9 },
    { key: "eligibilityDate", content: "ELIGIBILITY DATE", isSortable: true, width: 10 },
    { key: "jobLevel", content: "JOB LEVEL", isSortable: true, width: 7 },
    { key: "jobFamily", content: "JOB FAMILY", isSortable: true, width: 10 },
    { key: "zone", content: "ZONE", isSortable: true, width: 9 },
    { key: "currentBaseSalary", content: "CURRENT BASE SALARY", isSortable: true, width: 12 },
    { key: "srpPercent", content: "% OF SRP", isSortable: true, width: 7 },
    { key: "currentEquity", content: "CURRENT EQUITY (RSUs)", width: 12 },
    { key: "fy24H2Rating", content: "FY24 H2 RATING", isSortable: true, width: 10 },
  ],
};

const createRows = (data: Employee[], searchQuery: string, onDrillDown?: (id: string) => void) => {
  const filtered = searchQuery
    ? data.filter(
        (e) =>
          `${e.firstName} ${e.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.jobFamily.toLowerCase().includes(searchQuery.toLowerCase())
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
            {employee.isManager && onDrillDown ? (
              <span
                style={{ cursor: "pointer", color: token("color.text.brand") }}
                onClick={() => onDrillDown(employee.id)}
              >
                <Text size="medium" weight="medium" color="color.text.brand">
                  {employee.firstName} {employee.lastName}
                </Text>
              </span>
            ) : (
              <Text size="medium" weight="medium">
                {employee.firstName} {employee.lastName}
              </Text>
            )}
            {employee.isManager && (
              <Lozenge appearance="new">Mgr</Lozenge>
            )}
          </div>
        ),
      },
      {
        key: employee.startDate,
        content: <Text size="small">{employee.startDate}</Text>,
      },
      {
        key: employee.eligibilityDate,
        content: <Text size="small">{employee.eligibilityDate}</Text>,
      },
      {
        key: employee.jobLevel,
        content: (
          <Lozenge appearance={employee.jobLevel.startsWith("M") ? "success" : "inprogress"}>
            {employee.jobLevel}
          </Lozenge>
        ),
      },
      {
        key: employee.jobFamily,
        content: <Text size="small">{employee.jobFamily}</Text>,
      },
      {
        key: employee.zone,
        content: <Text size="small">{employee.zone}</Text>,
      },
      {
        key: employee.currentBaseSalary,
        content: <Text size="small" weight="bold">{formatCurrency(employee.currentBaseSalary)}</Text>,
      },
      {
        key: employee.srpPercent,
        content: (
          <Text
            size="small"
            color={parseInt(employee.srpPercent) < 100 ? "color.text.danger" : "color.text.success"}
          >
            {employee.srpPercent}
          </Text>
        ),
      },
      {
        key: employee.currentEquity,
        content: <Text size="small">{employee.currentEquity}</Text>,
      },
      {
        key: employee.fy24H2Rating,
        content: (
          <Lozenge appearance={ratingAppearance(employee.fy24H2Rating)}>
            {employee.fy24H2Rating}
          </Lozenge>
        ),
      },
    ],
  }));
};

export { employees };

export default function TeamOverview({ viewManagerId, onDrillDown }: { viewManagerId?: string; onDrillDown?: (managerId: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDirectOnly, setShowDirectOnly] = useState(false);
  const [managerFilter, setManagerFilter] = useState<string | null>(null);

  const filteredEmployees = viewManagerId
    ? employees.filter((e) => e.managerId === viewManagerId)
    : employees;

  const viewingManager = viewManagerId
    ? employees.find((e) => e.id === viewManagerId)
    : null;

  const rows = createRows(filteredEmployees, searchQuery, onDrillDown);

  const managerOptions = [
    { label: "All managers", value: "" },
    ...employees
      .filter((e) => e.isManager)
      .map((m) => ({ label: `${m.firstName} ${m.lastName}`, value: m.id })),
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.400") }}>
      <div>
        {viewingManager && (
          <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), marginBottom: token("space.100") }}>
            <Text size="small" color="color.text.subtlest">
              <span style={{ cursor: "pointer" }} onClick={() => onDrillDown?.("")}>
                All Reports
              </span>
            </Text>
            <Text size="small" color="color.text.subtlest">/</Text>
            <Text size="small" weight="bold">{viewingManager.firstName} {viewingManager.lastName}'s Team</Text>
          </div>
        )}
        <Heading size="xlarge">{viewingManager ? `${viewingManager.firstName} ${viewingManager.lastName}'s Team` : "Team"}</Heading>
        <div style={{ marginTop: token("space.050") }}>
          <Text size="medium" color="color.text.subtlest">View and understand your team's compensation</Text>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ marginBottom: token("space.300") }}>
          <Text size="medium" weight="semibold">Filter {filteredEmployees.length} employees</Text>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: token("space.200"),
            marginBottom: token("space.400"),
          }}
        >
          <div style={{ width: 180 }}>
            <Textfield
              placeholder="Search"
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
            Filter
          </Button>
          <Button appearance="default" iconBefore={SortAscendingIcon}>
            Sort
          </Button>
          <div style={{ width: 200 }}>
            <Select
              inputId="manager-filter"
              options={managerOptions}
              placeholder="Filter by manager"
              isClearable
              onChange={(opt: any) => {
                if (opt && opt.value) {
                  onDrillDown?.(opt.value);
                } else {
                  onDrillDown?.("");
                }
              }}
              styles={{
                control: (base: any) => ({ ...base, minHeight: 36 }),
              }}
            />
          </div>
          <Checkbox
            label="Show direct reports only"
            isChecked={showDirectOnly}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShowDirectOnly(e.target.checked)}
          />
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
            Showing {rows.length} of {filteredEmployees.length} employees
          </Text>
        </div>
      </div>
    </div>
  );
}
