import React, { useState, useMemo } from "react";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import DynamicTable from "@atlaskit/dynamic-table";
import Lozenge from "@atlaskit/lozenge";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button/new";
import Select from "@atlaskit/select";
import Popup from "@atlaskit/popup";
import SearchIcon from "@atlaskit/icon/core/search";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import CrossIcon from "@atlaskit/icon/core/cross";


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
    { key: "name", content: "NAME", isSortable: true, width: 13 },
    { key: "directReports", content: "DIRECT REPORTS", width: 10 },
    { key: "startDate", content: "START DATE", isSortable: true, width: 8 },
    { key: "eligibilityDate", content: "ELIGIBILITY DATE", isSortable: true, width: 9 },
    { key: "jobLevel", content: "JOB LEVEL", isSortable: true, width: 7 },
    { key: "jobFamily", content: "JOB FAMILY", isSortable: true, width: 9 },
    { key: "zone", content: "ZONE", isSortable: true, width: 8 },
    { key: "currentBaseSalary", content: "CURRENT BASE SALARY", isSortable: true, width: 11 },
    { key: "srpPercent", content: "% OF SRP", isSortable: true, width: 6 },
    { key: "currentEquity", content: "CURRENT EQUITY (RSUs)", width: 10 },
    { key: "fy24H2Rating", content: "FY24 H2 RATING", isSortable: true, width: 9 },
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
        key: `directReports-${employee.id}`,
        content: (() => {
          const reports = employees.filter((e) => e.managerId === employee.id);
          if (reports.length === 0) {
            return <Text size="small" color="color.text.subtlest">—</Text>;
          }
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              {reports.slice(0, 4).map((r, i) => (
                <div
                  key={r.id}
                  title={`${r.firstName} ${r.lastName}`}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: token("color.background.accent.blue.subtler"),
                    color: token("color.text.accent.blue"),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    fontSize: 9,
                    flexShrink: 0,
                    marginLeft: i > 0 ? -6 : 0,
                    border: `2px solid ${token("elevation.surface.raised")}`,
                    position: "relative" as const,
                    zIndex: reports.length - i,
                  }}
                >
                  {r.initials}
                </div>
              ))}
              {reports.length > 4 && (
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: token("color.background.neutral"),
                    color: token("color.text.subtlest"),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    fontSize: 9,
                    flexShrink: 0,
                    marginLeft: -6,
                    border: `2px solid ${token("elevation.surface.raised")}`,
                    position: "relative" as const,
                    zIndex: 0,
                  }}
                >
                  +{reports.length - 4}
                </div>
              )}
            </div>
          );
        })(),
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

interface Filters {
  jobLevel: string | null;
  jobFamily: string | null;
  zone: string | null;
  rating: string | null;
}

export default function TeamOverview({ viewManagerId, onDrillDown }: { viewManagerId?: string; onDrillDown?: (managerId: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [managerFilter, setManagerFilter] = useState<string | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({ jobLevel: null, jobFamily: null, zone: null, rating: null });

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const filteredEmployees = useMemo(() => {
    let result = viewManagerId
      ? employees.filter((e) => e.managerId === viewManagerId)
      : employees;
    if (filters.jobLevel) result = result.filter((e) => e.jobLevel === filters.jobLevel);
    if (filters.jobFamily) result = result.filter((e) => e.jobFamily === filters.jobFamily);
    if (filters.zone) result = result.filter((e) => e.zone === filters.zone);
    if (filters.rating) result = result.filter((e) => e.fy24H2Rating === filters.rating);
    return result;
  }, [viewManagerId, filters]);

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

  const uniqueValues = (key: keyof Employee) =>
    [...new Set(employees.map((e) => String(e[key])))].sort().map((v) => ({ label: v, value: v }));

  const filterFields: { key: keyof Filters; label: string; employeeKey: keyof Employee }[] = [
    { key: "jobLevel", label: "Job Level", employeeKey: "jobLevel" },
    { key: "jobFamily", label: "Job Family", employeeKey: "jobFamily" },
    { key: "zone", label: "Zone", employeeKey: "zone" },
    { key: "rating", label: "FY24 H2 Rating", employeeKey: "fy24H2Rating" },
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: token("space.200"),
          marginBottom: token("space.300"),
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
        <div style={{ width: 200 }}>
          <Select
            inputId="manager-filter"
            options={managerOptions}
            placeholder="Manager"
            isClearable
            value={managerFilter ? managerOptions.find((o) => o.value === managerFilter) : null}
            onChange={(opt: any) => {
              const val = opt?.value || "";
              setManagerFilter(val || null);
              if (val) {
                onDrillDown?.(val);
              } else {
                onDrillDown?.("");
              }
            }}
            styles={{
              control: (base: any) => ({ ...base, minHeight: 36 }),
            }}
          />
        </div>
        <Popup
          isOpen={moreOpen}
          onClose={() => setMoreOpen(false)}
          placement="bottom-start"
          shouldRenderToParent
          content={() => (
            <div style={{ padding: token("space.300"), width: 320 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: token("space.200") }}>
                <Text size="medium" weight="semibold">Filters</Text>
                {activeFilterCount > 0 && (
                  <Button
                    appearance="subtle"
                    spacing="compact"
                    onClick={() => setFilters({ jobLevel: null, jobFamily: null, zone: null, rating: null })}
                  >
                    Clear all
                  </Button>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: token("space.200") }}>
                {filterFields.map((f) => (
                  <div key={f.key}>
                    <div style={{ marginBottom: token("space.050") }}>
                      <Text size="small" weight="medium" color="color.text.subtlest">{f.label}</Text>
                    </div>
                    <Select
                      inputId={`filter-${f.key}`}
                      options={uniqueValues(f.employeeKey)}
                      placeholder={`All ${f.label.toLowerCase()}`}
                      isClearable
                      value={filters[f.key] ? { label: filters[f.key]!, value: filters[f.key]! } : null}
                      onChange={(opt: any) => setFilters((prev) => ({ ...prev, [f.key]: opt?.value || null }))}
                      styles={{ control: (base: any) => ({ ...base, minHeight: 36 }) }}
                      menuPortalTarget={document.body}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          trigger={(triggerProps) => (
            <Button
              {...triggerProps}
              appearance="default"
              iconBefore={ShowMoreHorizontalIcon}
              onClick={() => setMoreOpen(!moreOpen)}
            >
              More{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </Button>
          )}
        />
      </div>

      {activeFilterCount > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), flexWrap: "wrap" }}>
          {filterFields.map((f) =>
            filters[f.key] ? (
              <div
                key={f.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: token("space.050"),
                  padding: `${token("space.025")} ${token("space.100")}`,
                  borderRadius: "3px",
                  backgroundColor: token("color.background.selected"),
                  color: token("color.text.selected"),
                }}
              >
                <Text size="small" weight="medium" color="color.text.selected">
                  {f.label}: {filters[f.key]}
                </Text>
                <span
                  style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                  onClick={() => setFilters((prev) => ({ ...prev, [f.key]: null }))}
                >
                  <CrossIcon label={`Remove ${f.label} filter`} LEGACY_size="small" color={token("color.icon.selected")} />
                </span>
              </div>
            ) : null
          )}
        </div>
      )}

      <div className="charlie-table">
        <DynamicTable
          head={head}
          rows={rows}
          rowsPerPage={10}
          defaultPage={1}
          isFixedSize
          defaultSortKey="name"
          defaultSortOrder="ASC"
        />
      </div>

      <div style={{ marginTop: token("space.200") }}>
        <Text size="small" color="color.text.subtlest">
          Showing {rows.length} of {filteredEmployees.length} employees
        </Text>
      </div>
    </div>
  );
}
