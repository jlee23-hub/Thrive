import React, { useState, useMemo } from "react";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import Range from "@atlaskit/range";
import Tooltip from "@atlaskit/tooltip";
import InformationIcon from "@atlaskit/icon/core/information";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import {
  compensationData,
  equityData,
} from "../data/compensationData";

const COLORS = {
  baseSalary: "#1868DB",
  bonus: "#6554C0",
  rsus: "#36B37E",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: "6px",
  padding: token("space.400"),
  border: `1px solid ${token("color.border")}`,
};

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

export default function CompensationSummary() {
  const [sharePrice, setSharePrice] = useState(compensationData.defaultSharePrice);

  const adjustedData = useMemo(() => {
    const ratio = sharePrice / compensationData.defaultSharePrice;
    const adjustedRsus = equityData.vestedValue + Math.round(equityData.unvestedValue * ratio);
    const total = compensationData.baseSalary + compensationData.bonusTarget + adjustedRsus;
    return { adjustedRsus, total };
  }, [sharePrice]);

  const pieData = [
    { name: "Base Salary (annualized)", value: compensationData.baseSalary, color: COLORS.baseSalary },
    { name: "Bonus/ Commission Target", value: compensationData.bonusTarget, color: COLORS.bonus },
    { name: "RSUs", value: adjustedData.adjustedRsus, color: COLORS.rsus },
  ];


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.400") }}>
      <Heading size="xlarge">Welcome Anand, here are your total rewards</Heading>
      <div style={cardStyle}>
        <div style={{ display: "flex", gap: token("space.400"), alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", gap: token("space.1000"), marginTop: token("space.050") }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                  <Text size="medium" weight="medium">Your Annual Compensation</Text>
                  <Tooltip content="Total annual compensation including base salary, bonus target, and RSU value">
                    <span style={{ display: "inline-flex", cursor: "help" }}>
                      <InformationIcon label="info" />
                    </span>
                  </Tooltip>
                </div>
                <div style={{ marginTop: token("space.050") }}>
                  <Heading size="xxlarge">{formatCurrency(adjustedData.total)}</Heading>
                </div>
              </div>
              <div>
                <Text size="medium" weight="medium">Job Role</Text>
                <div style={{ marginTop: token("space.050") }}>
                  <Heading size="small">Senior Engineer</Heading>
                </div>
              </div>
              <div>
                <Text size="medium" weight="medium">Job Level</Text>
                <div style={{ marginTop: token("space.050") }}>
                  <Heading size="small">P50</Heading>
                </div>
              </div>
            </div>

            <div style={{ marginTop: token("space.600"), display: "flex", flexDirection: "column", gap: token("space.300") }}>
              {pieData.map((item) => (
                <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 400 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: token("space.150") }}>
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "6px",
                        backgroundColor: item.color,
                      }}
                    />
                    <Text size="large">{item.name}</Text>
                    {item.name === "RSUs" && (
                      <Text size="small" color="color.text.subtlest">
                        ({Math.round(adjustedData.adjustedRsus / sharePrice).toLocaleString()} units)
                      </Text>
                    )}
                  </div>
                  <Heading size="medium">{formatCurrency(item.value)}</Heading>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: 320, height: 320, position: "relative" }}>
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={90}
                  outerRadius={130}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <Heading size="medium">{formatCurrency(adjustedData.total)}</Heading>
              <Text size="small" color="color.text.subtlest">per year</Text>
            </div>
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), marginBottom: token("space.050") }}>
          <Text size="medium" weight="medium">Model your target compensation by share price</Text>
          <Tooltip content="Adjust the share price to see how it affects your total compensation">
            <span style={{ display: "inline-flex", cursor: "help" }}>
              <InformationIcon label="info" />
            </span>
          </Tooltip>
        </div>
        <Text size="small" color="color.text.subtlest">
          {formatCurrencyDecimal(compensationData.defaultSharePrice)} is the default share price
        </Text>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.300"), marginTop: token("space.200") }}>
          <div style={{ flex: 1 }} className="hide-range-dot">
            <Range
              min={20}
              max={200}
              step={0.01}
              value={sharePrice}
              onChange={(val) => setSharePrice(val)}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: token("space.050"),
              backgroundColor: token("color.background.input"),
              border: `1px solid ${token("color.border.input")}`,
              borderRadius: "6px",
              padding: `${token("space.100")} ${token("space.150")}`,
              minWidth: 90,
            }}
          >
            <Text size="medium" color="color.text.subtlest">$</Text>
            <Text size="medium" weight="medium">{sharePrice.toFixed(2)}</Text>
          </div>
        </div>
      </div>

    </div>
  );
}
