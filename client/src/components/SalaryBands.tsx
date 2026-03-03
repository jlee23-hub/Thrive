import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import { IconButton } from "@atlaskit/button/new";
import Select from "@atlaskit/select";
import Textfield from "@atlaskit/textfield";
import Lozenge from "@atlaskit/lozenge";
import Checkbox from "@atlaskit/checkbox";
import AddIcon from "@atlaskit/icon/core/add";
import SearchIcon from "@atlaskit/icon/core/search";
import FilterIcon from "@atlaskit/icon/core/filter";
import DownloadIcon from "@atlaskit/icon/core/download";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import EditIcon from "@atlaskit/icon/core/edit";
import SettingsIcon from "@atlaskit/icon/core/settings";
import SortIcon from "@atlaskit/icon/core/drag-handle";

interface SalaryBandRow {
  name: string;
  zone: string;
  basePayMin: number;
  basePayMax: number;
  srpOrMin: number;
  equityMax: number;
  targetVariablePct: number;
  totalEquityValueMin: number;
  totalEquityValueMax: number;
  function: string;
  leader: string;
  family: string;
  level: string;
  type: string;
  ladderName: string;
  track: string;
  payments: number;
  currency: string;
  equityCurrency: string;
  hrisJobCode: string;
}

const salaryBandRows: SalaryBandRow[] = [
  { name: "Account Associate, Renewals P10", zone: "Zone A", basePayMin: 49800, basePayMax: 83000, srpOrMin: 66400, equityMax: 4150, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 10300, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "P10", type: "P10 - Account Associate, Renewals", ladderName: "P10", track: "Coe A × 6", payments: 100, currency: "P10 - Account Associate, Renewals", equityCurrency: "P10 - Account Associate, Renewals", hrisJobCode: "AAR-P10" },
  { name: "Account Associate, Renewals P20", zone: "Zone A", basePayMin: 66700, basePayMax: 111200, srpOrMin: 88900, equityMax: 8300, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 20600, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "P20", type: "P20 - Account Associate, Renewals", ladderName: "P20", track: "Coe A × 6", payments: 100, currency: "P20 - Account Associate, Renewals", equityCurrency: "P20 - Account Associate, Renewals", hrisJobCode: "AAR-P20" },
  { name: "Account Associate, Renewals P30", zone: "Zone A", basePayMin: 87400, basePayMax: 145600, srpOrMin: 116500, equityMax: 16500, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 33100, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "P30", type: "P30 - Account Associate, Renewals", ladderName: "P30", track: "Coe A × 6", payments: 100, currency: "P30 - Account Associate, Renewals", equityCurrency: "P30 - Account Associate, Renewals", hrisJobCode: "AAR-P30" },
  { name: "Account Associate, Renewals P40", zone: "Zone A", basePayMin: 116500, basePayMax: 194200, srpOrMin: 155400, equityMax: 33100, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 66200, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "P40", type: "P40 - Account Associate, Renewals", ladderName: "P40", track: "Coe A × 6", payments: 100, currency: "P40 - Account Associate, Renewals", equityCurrency: "P40 - Account Associate, Renewals", hrisJobCode: "AAR-P40" },
  { name: "Account Associate, Renewals P50", zone: "Zone A", basePayMin: 155400, basePayMax: 259000, srpOrMin: 207200, equityMax: 66200, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 132400, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "P50", type: "P50 - Account Associate, Renewals", ladderName: "P50", track: "Coe A × 6", payments: 100, currency: "P50 - Account Associate, Renewals", equityCurrency: "P50 - Account Associate, Renewals", hrisJobCode: "AAR-P50" },
  { name: "Account Associate, Renewals P10", zone: "Zone B", basePayMin: 44800, basePayMax: 74700, srpOrMin: 59800, equityMax: 4150, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 10300, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "P10", type: "P10 - Account Associate, Renewals", ladderName: "P10", track: "Coe B × 6", payments: 100, currency: "P10 - Account Associate, Renewals", equityCurrency: "P10 - Account Associate, Renewals", hrisJobCode: "AAR-P10" },
  { name: "Account Associate, Renewals P20", zone: "Zone B", basePayMin: 60000, basePayMax: 100100, srpOrMin: 80000, equityMax: 8300, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 20600, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "P20", type: "P20 - Account Associate, Renewals", ladderName: "P20", track: "Coe B × 6", payments: 100, currency: "P20 - Account Associate, Renewals", equityCurrency: "P20 - Account Associate, Renewals", hrisJobCode: "AAR-P20" },
  { name: "Account Associate, Renewals P30", zone: "Zone B", basePayMin: 78700, basePayMax: 131000, srpOrMin: 104900, equityMax: 16500, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 33100, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "P30", type: "P30 - Account Associate, Renewals", ladderName: "P30", track: "Coe B × 6", payments: 100, currency: "P30 - Account Associate, Renewals", equityCurrency: "P30 - Account Associate, Renewals", hrisJobCode: "AAR-P30" },
  { name: "Account Associate, Renewals P40", zone: "Zone B", basePayMin: 104900, basePayMax: 174800, srpOrMin: 139800, equityMax: 33100, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 66200, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "P40", type: "P40 - Account Associate, Renewals", ladderName: "P40", track: "Coe B × 6", payments: 100, currency: "P40 - Account Associate, Renewals", equityCurrency: "P40 - Account Associate, Renewals", hrisJobCode: "AAR-P40" },
  { name: "Account Associate, Renewals P50", zone: "Zone B", basePayMin: 139800, basePayMax: 233100, srpOrMin: 186400, equityMax: 66200, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 132400, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "P50", type: "P50 - Account Associate, Renewals", ladderName: "P50", track: "Coe B × 6", payments: 100, currency: "P50 - Account Associate, Renewals", equityCurrency: "P50 - Account Associate, Renewals", hrisJobCode: "AAR-P50" },
  { name: "Account Associate, Renewals M50", zone: "Zone A", basePayMin: 194200, basePayMax: 323600, srpOrMin: 258900, equityMax: 99300, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 198600, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "M50", type: "M50 - Account Associate, Renewals", ladderName: "M50", track: "Coe A × 6", payments: 100, currency: "M50 - Account Associate, Renewals", equityCurrency: "M50 - Account Associate, Renewals", hrisJobCode: "AAR-M50" },
  { name: "Account Associate, Renewals M60", zone: "Zone A", basePayMin: 258900, basePayMax: 431500, srpOrMin: 345200, equityMax: 165500, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 331000, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "M60", type: "M60 - Account Associate, Renewals", ladderName: "M60", track: "Coe A × 6", payments: 100, currency: "M60 - Account Associate, Renewals", equityCurrency: "M60 - Account Associate, Renewals", hrisJobCode: "AAR-M60" },
  { name: "Account Associate, Renewals P10", zone: "Zone C", basePayMin: 39800, basePayMax: 66400, srpOrMin: 53100, equityMax: 4150, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 10300, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "P10", type: "P10 - Account Associate, Renewals", ladderName: "P10", track: "Coe C × 6", payments: 100, currency: "P10 - Account Associate, Renewals", equityCurrency: "P10 - Account Associate, Renewals", hrisJobCode: "AAR-P10" },
  { name: "Account Associate, Renewals P20", zone: "Zone C", basePayMin: 53300, basePayMax: 88900, srpOrMin: 71100, equityMax: 8300, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 20600, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "P20", type: "P20 - Account Associate, Renewals", ladderName: "P20", track: "Coe C × 6", payments: 100, currency: "P20 - Account Associate, Renewals", equityCurrency: "P20 - Account Associate, Renewals", hrisJobCode: "AAR-P20" },
  { name: "Account Associate, Renewals P30", zone: "Zone C", basePayMin: 69900, basePayMax: 116500, srpOrMin: 93200, equityMax: 16500, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 33100, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "P30", type: "P30 - Account Associate, Renewals", ladderName: "P30", track: "Coe C × 6", payments: 100, currency: "P30 - Account Associate, Renewals", equityCurrency: "P30 - Account Associate, Renewals", hrisJobCode: "AAR-P30" },
  { name: "Account Associate, Renewals P40", zone: "Zone C", basePayMin: 93200, basePayMax: 155400, srpOrMin: 124300, equityMax: 33100, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 66200, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "P40", type: "P40 - Account Associate, Renewals", ladderName: "P40", track: "Coe C × 6", payments: 100, currency: "P40 - Account Associate, Renewals", equityCurrency: "P40 - Account Associate, Renewals", hrisJobCode: "AAR-P40" },
  { name: "Account Associate, Renewals P50", zone: "Zone C", basePayMin: 124300, basePayMax: 207200, srpOrMin: 165800, equityMax: 66200, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 132400, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "P50", type: "P50 - Account Associate, Renewals", ladderName: "P50", track: "Coe C × 6", payments: 100, currency: "P50 - Account Associate, Renewals", equityCurrency: "P50 - Account Associate, Renewals", hrisJobCode: "AAR-P50" },
  { name: "Account Associate, Renewals M50", zone: "Zone B", basePayMin: 174800, basePayMax: 291200, srpOrMin: 233000, equityMax: 99300, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 198600, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "M50", type: "M50 - Account Associate, Renewals", ladderName: "M50", track: "Coe B × 6", payments: 100, currency: "M50 - Account Associate, Renewals", equityCurrency: "M50 - Account Associate, Renewals", hrisJobCode: "AAR-M50" },
  { name: "Account Associate, Renewals M60", zone: "Zone B", basePayMin: 233000, basePayMax: 388300, srpOrMin: 310700, equityMax: 165500, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 331000, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "M60", type: "M60 - Account Associate, Renewals", ladderName: "M60", track: "Coe B × 6", payments: 100, currency: "M60 - Account Associate, Renewals", equityCurrency: "M60 - Account Associate, Renewals", hrisJobCode: "AAR-M60" },
  { name: "Account Associate, Renewals M50", zone: "Zone C", basePayMin: 155400, basePayMax: 259000, srpOrMin: 207200, equityMax: 99300, targetVariablePct: 0, totalEquityValueMin: 0, totalEquityValueMax: 198600, function: "Account Associate, Renewals", leader: "Account Associate, Renewals", family: "Account Associate, Renewals - 1", level: "M50", type: "M50 - Account Associate, Renewals", ladderName: "M50", track: "Coe C × 6", payments: 100, currency: "M50 - Account Associate, Renewals", equityCurrency: "M50 - Account Associate, Renewals", hrisJobCode: "AAR-M50" },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: "6px",
  padding: token("space.300"),
  border: `1px solid ${token("color.border")}`,
};

function RangeBar({ min, max, globalMax }: { min: number; max: number; globalMax: number }) {
  const left = (min / globalMax) * 100;
  const width = ((max - min) / globalMax) * 100;
  return (
    <div style={{ position: "relative", height: 8, backgroundColor: token("color.background.neutral"), borderRadius: 4, minWidth: 120 }}>
      <div
        style={{
          position: "absolute",
          left: `${left}%`,
          width: `${Math.max(width, 1)}%`,
          height: "100%",
          backgroundColor: token("color.chart.blue.bold"),
          borderRadius: 4,
        }}
      />
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: `${token("space.100")} ${token("space.150")}`,
  textAlign: "left",
  fontSize: 11,
  fontWeight: 600,
  color: token("color.text.subtlest"),
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  whiteSpace: "nowrap",
  position: "sticky",
  top: 0,
  backgroundColor: token("elevation.surface.sunken"),
  zIndex: 1,
};

const thRightStyle: React.CSSProperties = {
  ...thStyle,
  textAlign: "right",
};

const tdStyle: React.CSSProperties = {
  padding: `${token("space.075")} ${token("space.150")}`,
  verticalAlign: "middle",
  whiteSpace: "nowrap",
  fontSize: 13,
};

const tdRightStyle: React.CSSProperties = {
  ...tdStyle,
  textAlign: "right",
  fontFamily: "monospace",
};

export default function SalaryBands() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const globalBaseMax = Math.max(...salaryBandRows.map((r) => r.basePayMax));
  const globalEquityMax = Math.max(...salaryBandRows.map((r) => r.totalEquityValueMax));

  const filtered = searchQuery
    ? salaryBandRows.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.zone.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : salaryBandRows;

  const toggleRow = (idx: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedRows.size === filtered.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filtered.map((_, i) => i)));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.400") }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <Heading size="large">Salary Bands</Heading>
          <div style={{ marginTop: token("space.050") }}>
            <Text size="medium" color="color.text.subtlest">
              Market-based compensation ranges by role, zone, and level
            </Text>
          </div>
        </div>
        <div style={{ display: "flex", gap: token("space.100") }}>
          <Button appearance="default" iconBefore={DownloadIcon}>
            Export
          </Button>
          <Button appearance="primary" iconBefore={AddIcon}>
            Add Band
          </Button>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: token("space.200") }}>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), flex: 1 }}>
          <div style={{ flex: 1, maxWidth: 360 }}>
            <Textfield
              placeholder={`Search ${salaryBandRows.length} bands...`}
              elemBeforeInput={
                <div style={{ paddingLeft: token("space.100"), display: "flex", alignItems: "center" }}>
                  <SearchIcon label="" color={token("color.icon.subtle")} />
                </div>
              }
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button appearance="subtle" iconBefore={ChevronDownIcon}>
            Sort
          </Button>
          <Button appearance="subtle" iconBefore={FilterIcon}>
            Filter
          </Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
          <Button appearance="subtle" iconBefore={SettingsIcon}>
            Columns
          </Button>
          <IconButton icon={SortIcon} label="View" appearance="subtle" />
        </div>
      </div>

      <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto", maxHeight: 700 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 2200 }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: 36, textAlign: "center" }}>
                  <Checkbox
                    label=""
                    isChecked={selectedRows.size === filtered.length && filtered.length > 0}
                    isIndeterminate={selectedRows.size > 0 && selectedRows.size < filtered.length}
                    onChange={toggleAll}
                  />
                </th>
                <th style={{ ...thStyle, position: "sticky", left: 0, zIndex: 2, backgroundColor: token("elevation.surface.sunken"), minWidth: 260 }}>Name</th>
                <th style={thRightStyle}>Base Pay Min</th>
                <th style={thRightStyle}>SRP (Min)</th>
                <th style={thRightStyle}>Base Pay Max</th>
                <th style={{ ...thStyle, minWidth: 140 }}>Base Pay Range</th>
                <th style={thRightStyle}>Target Variable %</th>
                <th style={thRightStyle}>Total Equity Value Min</th>
                <th style={thRightStyle}>Equity Max</th>
                <th style={{ ...thStyle, minWidth: 140 }}>Total Equity Value Range</th>
                <th style={thStyle}>Function</th>
                <th style={thStyle}>Leader</th>
                <th style={thStyle}>Family</th>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Ladder Name</th>
                <th style={thStyle}>Track</th>
                <th style={thRightStyle}>Payments</th>
                <th style={thStyle}>Currency</th>
                <th style={thStyle}>Equity Currency</th>
                <th style={thStyle}>HRIS Job Code</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderTop: `1px solid ${token("color.border")}`,
                    backgroundColor: selectedRows.has(idx) ? token("color.background.selected") : undefined,
                  }}
                >
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    <Checkbox label="" isChecked={selectedRows.has(idx)} onChange={() => toggleRow(idx)} />
                  </td>
                  <td style={{ ...tdStyle, position: "sticky", left: 0, zIndex: 1, backgroundColor: selectedRows.has(idx) ? token("color.background.selected") : token("elevation.surface.raised") }}>
                    <div>
                      <Text size="small" weight="semibold">{row.name}</Text>
                      <div>
                        <Text size="UNSAFE_small" color="color.text.subtlest">{row.zone}</Text>
                      </div>
                    </div>
                  </td>
                  <td style={tdRightStyle}>{formatCurrency(row.basePayMin)}</td>
                  <td style={{ ...tdRightStyle, fontWeight: 600 }}>{formatCurrency(row.srpOrMin)}</td>
                  <td style={tdRightStyle}>{formatCurrency(row.basePayMax)}</td>
                  <td style={tdStyle}>
                    <RangeBar min={row.basePayMin} max={row.basePayMax} globalMax={globalBaseMax} />
                  </td>
                  <td style={tdRightStyle}>{row.targetVariablePct}%</td>
                  <td style={tdRightStyle}>{formatCurrency(row.totalEquityValueMin)}</td>
                  <td style={{ ...tdRightStyle, fontWeight: 600 }}>{formatCurrency(row.equityMax)}</td>
                  <td style={tdStyle}>
                    <RangeBar min={row.totalEquityValueMin} max={row.totalEquityValueMax} globalMax={globalEquityMax} />
                  </td>
                  <td style={tdStyle}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{row.function}</Text>
                  </td>
                  <td style={tdStyle}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{row.leader}</Text>
                  </td>
                  <td style={tdStyle}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{row.family}</Text>
                  </td>
                  <td style={tdStyle}>
                    <Lozenge appearance={row.level.startsWith("M") ? "success" : "inprogress"}>
                      {row.level}
                    </Lozenge>
                  </td>
                  <td style={tdStyle}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{row.type}</Text>
                  </td>
                  <td style={tdStyle}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{row.ladderName}</Text>
                  </td>
                  <td style={tdStyle}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{row.track}</Text>
                  </td>
                  <td style={tdRightStyle}>{row.payments}</td>
                  <td style={tdStyle}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{row.currency}</Text>
                  </td>
                  <td style={tdStyle}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{row.equityCurrency}</Text>
                  </td>
                  <td style={tdStyle}>
                    <code style={{ fontSize: 11, fontFamily: "monospace", color: token("color.text.subtlest"), backgroundColor: token("color.background.neutral"), padding: `${token("space.025")} ${token("space.075")}`, borderRadius: "6px" }}>
                      {row.hrisJobCode}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          style={{
            backgroundColor: token("elevation.surface.sunken"),
            borderTop: `1px solid ${token("color.border")}`,
            padding: `${token("space.150")} ${token("space.200")}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="small" color="color.text.subtlest">
            Showing <Text size="small" weight="bold" as="span">{filtered.length}</Text> of <Text size="small" weight="bold" as="span">{salaryBandRows.length}</Text> bands
          </Text>
          <div style={{ display: "flex", gap: token("space.100") }}>
            <Button appearance="subtle" spacing="compact" isDisabled>
              Previous
            </Button>
            <Button appearance="subtle" spacing="compact">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
