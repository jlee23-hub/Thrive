import React, { useState, useMemo } from "react";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import Tooltip from "@atlaskit/tooltip";
import ProgressBar from "@atlaskit/progress-bar";
import InformationIcon from "@atlaskit/icon/core/information";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import Button from "@atlaskit/button/new";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  grants,
  vestingScheduleData,
  equityData,
  compensationData,
  getGrantVestingData,
  type Grant,
} from "../data/compensationData";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const formatCurrencyDecimal = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: token("border.radius.300"),
  padding: token("space.400"),
  boxShadow: token("elevation.shadow.raised"),
};

function GrantCard({ grant, isSelected }: { grant: Grant; isSelected: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...cardStyle,
        marginBottom: token("space.200"),
        border: isSelected
          ? `2px solid ${token("color.border.selected")}`
          : `2px solid transparent`,
        backgroundColor: isSelected
          ? token("color.background.selected")
          : isHovered
            ? token("color.background.neutral.hovered")
            : token("elevation.surface.raised"),
        transition: "background-color 0.15s ease, border-color 0.15s ease",
      }}
    >
      <Text size="medium" weight="bold">{grant.grantDate} Grant</Text>
      <div style={{ marginTop: token("space.150"), marginBottom: token("space.100") }}>
        <ProgressBar
          appearance="success"
          value={grant.vestingProgress / 100}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Text size="small" color="color.text.success">
          {grant.vestedUnits.toLocaleString()} vested
        </Text>
        <Text size="small" color="color.text.subtlest">
          / {grant.totalUnits.toLocaleString()} total units
        </Text>
        <div style={{ textAlign: "right" }}>
          <Text size="small" color="color.text.success" weight="bold">
            {formatCurrency(grant.vestedValue)}
          </Text>
          <Text size="small" color="color.text.subtlest">
            / {formatCurrency(grant.totalValue)}
          </Text>
        </div>
      </div>
    </div>
  );
}

function GrantDetails({ grant }: { grant: Grant }) {
  const vestingData = useMemo(() => getGrantVestingData(grant), [grant]);

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: token("space.200"), marginBottom: token("space.400") }}>
        <Heading size="medium">Grant Details For</Heading>
        <div
          style={{
            backgroundColor: token("color.background.neutral"),
            borderRadius: token("border.radius.100"),
            padding: `${token("space.050")} ${token("space.200")}`,
            display: "flex",
            alignItems: "center",
            gap: token("space.100"),
          }}
        >
          <Text size="small">{grant.grantDate} - {grant.totalUnits.toLocaleString()} total units</Text>
          <ChevronDownIcon label="select" />
        </div>
      </div>

      <div style={{ display: "flex", gap: token("space.600") }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: token("space.400"), marginBottom: token("space.400") }}>
            <div style={{ textAlign: "center" }}>
              <Text size="small" color="color.text.subtlest">Vested</Text>
              <div>
                <Text size="large" weight="bold" color="color.text.success">
                  {formatCurrency(grant.vestedValue)}
                </Text>
              </div>
              <Text size="small" color="color.text.subtlest">
                {grant.vestedUnits.toLocaleString()} units
              </Text>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text size="small" color="color.text.subtlest">Unvested</Text>
              <div>
                <Text size="large" weight="bold" color="color.text.discovery">
                  {formatCurrency(grant.totalValue - grant.vestedValue)}
                </Text>
              </div>
              <Text size="small" color="color.text.subtlest">
                {(grant.totalUnits - grant.vestedUnits).toLocaleString()} units
              </Text>
            </div>
          </div>

          <div
            style={{
              backgroundColor: token("color.background.neutral"),
              borderRadius: token("border.radius.200"),
              padding: token("space.300"),
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: token("space.100") }}>
              <Text size="medium" weight="bold">Estimated Grant Value Calculator</Text>
              <Heading size="medium">{formatCurrency(grant.totalValue)}</Heading>
            </div>
            <Text size="small" color="color.text.subtlest">
              This is the total pre-tax value of your grant. Here's the calculation:
            </Text>
            <div style={{ display: "flex", alignItems: "center", gap: token("space.200"), marginTop: token("space.200") }}>
              <div style={{ textAlign: "center" }}>
                <Heading size="small">{grant.totalUnits.toLocaleString()}</Heading>
                <Text size="small" color="color.text.subtlest">Total number of units</Text>
              </div>
              <Text size="large" weight="bold" color="color.text.subtlest">×</Text>
              <Text size="medium" weight="medium">(</Text>
              <div style={{ textAlign: "center" }}>
                <Heading size="small" color="color.text.success">
                  {formatCurrencyDecimal(compensationData.defaultSharePrice)}
                </Heading>
                <div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
                  <Text size="small" color="color.text.subtlest">Assumed share price</Text>
                  <Tooltip content="Based on current share price">
                    <span style={{ display: "inline-flex", cursor: "help" }}>
                      <InformationIcon label="info" />
                    </span>
                  </Tooltip>
                </div>
              </div>
              <Text size="medium" weight="medium">)</Text>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-around", marginBottom: token("space.200") }}>
            <div style={{ textAlign: "center" }}>
              <Text size="small" color="color.text.subtlest">Vesting Progress</Text>
              <div>
                <Text size="medium" weight="bold">{grant.vestingProgress}%</Text>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text size="small" color="color.text.subtlest">Grant Date</Text>
              <div>
                <Text size="medium" weight="bold">Sep, {grant.grantDate.split(", ")[1]}</Text>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text size="small" color="color.text.subtlest">Vesting Start Date</Text>
              <div>
                <Text size="medium" weight="bold">{grant.vestingStartDate}</Text>
              </div>
            </div>
          </div>

          <div style={{ height: 200, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <LineChart data={vestingData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={token("color.border")} />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: token("color.text.subtlest"), fontSize: 11 }}
                  interval={3}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: token("color.text.subtlest"), fontSize: 11 }}
                  width={45}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: token("elevation.surface.overlay"),
                    border: `1px solid ${token("color.border")}`,
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="vested"
                  stroke="#36B37E"
                  strokeWidth={2}
                  dot={{ fill: "#36B37E", r: 3 }}
                  name="Vested Units"
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke={token("color.border")}
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  dot={false}
                  name="Total Units"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RSUDetails() {
  const [selectedGrant, setSelectedGrant] = useState<Grant>(grants[0]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.400") }}>
      <div style={cardStyle}>
        <Heading size="large">Equity Summary</Heading>
        <div style={{ display: "flex", gap: token("space.400"), marginTop: token("space.300"), alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            {grants.map((grant) => (
              <div
                key={grant.id}
                onClick={() => setSelectedGrant(grant)}
                style={{ cursor: "pointer" }}
              >
                <GrantCard grant={grant} isSelected={selectedGrant.id === grant.id} />
              </div>
            ))}
          </div>

          <div style={{ flex: 1, height: 600, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <AreaChart data={vestingScheduleData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={token("color.border")} />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: token("color.text.subtlest"), fontSize: 11 }}
                  interval={2}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: token("color.text.subtlest"), fontSize: 11 }}
                  tickFormatter={(v) => v.toLocaleString()}
                  width={50}
                />
                <RechartsTooltip
                  formatter={(value: number, name: string) => [
                    value.toLocaleString() + " units",
                    name === "vested" ? "Vested Units" : "Unvested Units",
                  ]}
                  contentStyle={{
                    backgroundColor: token("elevation.surface.overlay"),
                    border: `1px solid ${token("color.border")}`,
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="vested"
                  stackId="1"
                  stroke="#36B37E"
                  fill="#36B37E"
                  fillOpacity={0.4}
                  name="vested"
                />
                <Area
                  type="monotone"
                  dataKey="unvested"
                  stackId="1"
                  stroke="#C1F0D8"
                  fill="#C1F0D8"
                  fillOpacity={0.3}
                  name="unvested"
                />
                <Legend
                  formatter={(value: string) =>
                    value === "vested" ? "Vested Units" : "Unvested Units"
                  }
                  iconType="square"
                  wrapperStyle={{ fontSize: 12, color: token("color.text.subtlest") }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <GrantDetails grant={selectedGrant} />
    </div>
  );
}
