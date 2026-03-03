import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import Select from "@atlaskit/select";
import AddIcon from "@atlaskit/icon/core/add";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const salaryBandData = [
  { level: "P30", label: "Junior", min: 140000, mid: 175000, max: 210000, p10: 135000, p25: 155000, p50: 175000, p75: 195000, p90: 215000, spread: 50 },
  { level: "P40", label: "Mid-Level", min: 175000, mid: 220000, max: 265000, p10: 170000, p25: 195000, p50: 220000, p75: 245000, p90: 270000, spread: 51 },
  { level: "P50", label: "Senior", min: 220000, mid: 280000, max: 340000, p10: 215000, p25: 245000, p50: 280000, p75: 315000, p90: 345000, spread: 55 },
  { level: "P60", label: "Staff", min: 280000, mid: 360000, max: 440000, p10: 275000, p25: 315000, p50: 360000, p75: 405000, p90: 445000, spread: 57 },
  { level: "P70", label: "Principal", min: 360000, mid: 465000, max: 570000, p10: 355000, p25: 405000, p50: 465000, p75: 525000, p90: 575000, spread: 58 },
  { level: "P80", label: "Distinguished", min: 465000, mid: 605000, max: 745000, p10: 460000, p25: 525000, p50: 605000, p75: 685000, p90: 750000, spread: 60 },
];

const managerBandData = [
  { level: "M10", label: "Manager", min: 130000, mid: 160000, max: 190000, p10: 125000, p25: 145000, p50: 160000, p75: 175000, p90: 195000, spread: 46 },
  { level: "M20", label: "Senior Manager", min: 165000, mid: 205000, max: 245000, p10: 160000, p25: 185000, p50: 205000, p75: 225000, p90: 250000, spread: 48 },
  { level: "M30", label: "Director", min: 210000, mid: 265000, max: 320000, p10: 205000, p25: 235000, p50: 265000, p75: 295000, p90: 325000, spread: 52 },
  { level: "M40", label: "Senior Director", min: 270000, mid: 345000, max: 420000, p10: 265000, p25: 305000, p50: 345000, p75: 385000, p90: 425000, spread: 56 },
  { level: "M50", label: "VP", min: 350000, mid: 450000, max: 550000, p10: 345000, p25: 395000, p50: 450000, p75: 505000, p90: 555000, spread: 57 },
  { level: "M60", label: "Senior VP", min: 455000, mid: 590000, max: 725000, p10: 450000, p25: 515000, p50: 590000, p75: 665000, p90: 730000, spread: 59 },
  { level: "M70", label: "EVP", min: 595000, mid: 775000, max: 955000, p10: 590000, p25: 675000, p50: 775000, p75: 875000, p90: 960000, spread: 61 },
];

const jobFamilyOptions = [
  { label: "Engineering", value: "engineering" },
  { label: "Product", value: "product" },
  { label: "Design", value: "design" },
  { label: "Sales", value: "sales" },
  { label: "Marketing", value: "marketing" },
];

const levelTypeOptions = [
  { label: "Individual Contributor (P-Levels)", value: "ic" },
  { label: "Manager (M-Levels)", value: "manager" },
];

const locationOptions = [
  { label: "San Francisco Bay Area", value: "san-francisco" },
  { label: "New York City", value: "new-york" },
  { label: "Seattle", value: "seattle" },
  { label: "Austin", value: "austin" },
  { label: "Boston", value: "boston" },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: token("border.radius.400"),
  padding: token("space.300"),
  border: `1px solid ${token("color.border")}`,
  marginBottom: token("space.300"),
};

export default function SalaryBands() {
  const [jobFamily, setJobFamily] = useState(jobFamilyOptions[0]);
  const [levelType, setLevelType] = useState(levelTypeOptions[0]);
  const [location, setLocation] = useState(locationOptions[0]);

  const currentData = levelType.value === "ic" ? salaryBandData : managerBandData;

  return (
    <div style={{ padding: token("space.400") }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.300") }}>
        <div>
          <Heading size="large">Salary Bands</Heading>
          <div style={{ marginTop: token("space.100") }}>
            <Text size="small" color="color.text.subtlest">Market-based compensation ranges by level and location</Text>
          </div>
        </div>
        <Button appearance="primary" iconBefore={AddIcon}>
          Create New Band
        </Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: token("space.200"), marginBottom: token("space.300") }}>
        <div>
          <Text size="small" weight="semibold">Job Family</Text>
          <div style={{ marginTop: token("space.100") }}>
            <Select options={jobFamilyOptions} value={jobFamily} onChange={(val) => val && setJobFamily(val)} />
          </div>
        </div>
        <div>
          <Text size="small" weight="semibold">Level Type</Text>
          <div style={{ marginTop: token("space.100") }}>
            <Select options={levelTypeOptions} value={levelType} onChange={(val) => val && setLevelType(val)} />
          </div>
        </div>
        <div>
          <Text size="small" weight="semibold">Location</Text>
          <div style={{ marginTop: token("space.100") }}>
            <Select options={locationOptions} value={location} onChange={(val) => val && setLocation(val)} />
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <Heading size="small">Salary Bands by Level</Heading>
        <div style={{ marginTop: token("space.200") }}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke={token("color.border")} />
              <XAxis
                dataKey="level"
                stroke={token("color.text.subtlest")}
                style={{ fontSize: "12px" }}
                tickFormatter={(value: string) => {
                  const item = currentData.find((d) => d.level === value);
                  return item ? `${value} - ${item.label}` : value;
                }}
              />
              <YAxis
                stroke={token("color.text.subtlest")}
                style={{ fontSize: "12px" }}
                tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: any) => formatCurrency(Number(value))}
                labelFormatter={(label: any) => {
                  const item = currentData.find((d) => d.level === label);
                  return item ? `${item.level} - ${item.label}` : String(label);
                }}
                contentStyle={{
                  backgroundColor: token("elevation.surface.overlay"),
                  border: `1px solid ${token("color.border")}`,
                  borderRadius: token("border.radius.200"),
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line type="monotone" dataKey="min" stroke={token("color.text.subtlest")} strokeWidth={2} name="Min" dot={{ fill: token("color.text.subtlest"), r: 4 }} />
              <Line type="monotone" dataKey="p25" stroke={token("color.chart.purple.bold")} strokeWidth={2} name="25th Percentile" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="mid" stroke={token("color.chart.blue.bold")} strokeWidth={3} name="Midpoint" dot={{ r: 5 }} />
              <Line type="monotone" dataKey="p75" stroke={token("color.chart.green.bold")} strokeWidth={2} name="75th Percentile" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="max" stroke={token("color.chart.red.bold")} strokeWidth={2} name="Max" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={cardStyle}>
        <Heading size="small">Band Spread by Level</Heading>
        <div style={{ marginTop: token("space.200") }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke={token("color.border")} />
              <XAxis
                dataKey="level"
                stroke={token("color.text.subtlest")}
                style={{ fontSize: "12px" }}
                tickFormatter={(value: string) => {
                  const item = currentData.find((d) => d.level === value);
                  return item ? `${value} - ${item.label}` : value;
                }}
              />
              <YAxis stroke={token("color.text.subtlest")} style={{ fontSize: "12px" }} />
              <Tooltip
                labelFormatter={(label: any) => {
                  const item = currentData.find((d) => d.level === label);
                  return item ? `${item.level} - ${item.label}` : String(label);
                }}
                contentStyle={{
                  backgroundColor: token("elevation.surface.overlay"),
                  border: `1px solid ${token("color.border")}`,
                  borderRadius: token("border.radius.200"),
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="spread" fill={token("color.chart.blue.bold")} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={cardStyle}>
        <Heading size="small">Market Data Summary</Heading>
        <div style={{ marginTop: token("space.200"), overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${token("color.border")}` }}>
                {["Level", "10th %ile", "25th %ile", "50th %ile", "75th %ile", "90th %ile"].map((h, i) => (
                  <th
                    key={h}
                    style={{
                      padding: `${token("space.150")} ${token("space.200")}`,
                      textAlign: i === 0 ? "left" : "right",
                      color: token("color.text"),
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((row) => (
                <tr key={row.level} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                  <td style={{ padding: `${token("space.150")} ${token("space.200")}`, fontSize: "13px", fontWeight: 500, color: token("color.text") }}>
                    {row.level} - {row.label}
                  </td>
                  <td style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "right", fontSize: "13px", color: token("color.text.subtlest") }}>{formatCurrency(row.p10)}</td>
                  <td style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "right", fontSize: "13px", color: token("color.text.subtlest") }}>{formatCurrency(row.p25)}</td>
                  <td style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "right", fontSize: "13px", fontWeight: 600, color: token("color.text") }}>{formatCurrency(row.p50)}</td>
                  <td style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "right", fontSize: "13px", color: token("color.text.subtlest") }}>{formatCurrency(row.p75)}</td>
                  <td style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "right", fontSize: "13px", color: token("color.text.subtlest") }}>{formatCurrency(row.p90)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={cardStyle}>
        <Heading size="small">Band Positioning</Heading>
        <div style={{ marginTop: token("space.200"), overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${token("color.border")}` }}>
                {["Level", "Min", "Midpoint", "Max", "Spread"].map((h, i) => (
                  <th
                    key={h}
                    style={{
                      padding: `${token("space.150")} ${token("space.200")}`,
                      textAlign: i === 0 ? "left" : "right",
                      color: token("color.text"),
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((row) => (
                <tr key={row.level} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                  <td style={{ padding: `${token("space.150")} ${token("space.200")}`, fontSize: "13px", fontWeight: 500, color: token("color.text") }}>
                    {row.level} - {row.label}
                  </td>
                  <td style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "right", fontSize: "13px", color: token("color.text.subtlest") }}>{formatCurrency(row.min)}</td>
                  <td style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "right", fontSize: "13px", fontWeight: 600, color: token("color.text") }}>{formatCurrency(row.mid)}</td>
                  <td style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "right", fontSize: "13px", color: token("color.text.subtlest") }}>{formatCurrency(row.max)}</td>
                  <td style={{ padding: `${token("space.150")} ${token("space.200")}`, textAlign: "right", fontSize: "13px", color: token("color.text.subtlest") }}>{row.spread}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
