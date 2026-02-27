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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from "recharts";
import {
  compensationData,
  rsuYearlyData,
  equityData,
} from "../data/compensationData";

const COLORS = {
  baseSalary: "#1868DB",
  bonus: "#6554C0",
  rsus: "#36B37E",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: token("border.radius.300"),
  padding: token("space.400"),
  boxShadow: token("elevation.shadow.raised"),
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
    const adjustedRsus = Math.round(compensationData.rsus * ratio);
    const total = compensationData.baseSalary + compensationData.bonusTarget + adjustedRsus;
    return { adjustedRsus, total };
  }, [sharePrice]);

  const pieData = [
    { name: "Base Salary (annualized)", value: compensationData.baseSalary, color: COLORS.baseSalary },
    { name: "Bonus/ Commission Target", value: compensationData.bonusTarget, color: COLORS.bonus },
    { name: "RSUs", value: adjustedData.adjustedRsus, color: COLORS.rsus },
  ];

  const adjustedEquity = useMemo(() => {
    const ratio = sharePrice / compensationData.defaultSharePrice;
    return {
      totalValue: Math.round(equityData.totalValue * ratio),
      vestedValue: Math.round(equityData.vestedValue * ratio),
      unvestedValue: Math.round(equityData.unvestedValue * ratio),
    };
  }, [sharePrice]);

  const adjustedYearlyData = useMemo(() => {
    const ratio = sharePrice / compensationData.defaultSharePrice;
    return rsuYearlyData.map((d) => ({
      ...d,
      value: Math.round(d.value * ratio),
    }));
  }, [sharePrice]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.400") }}>
      <div style={cardStyle}>
        <div style={{ display: "flex", gap: token("space.400"), alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Heading size="xlarge">Total Compensation Summary</Heading>
            <div style={{ display: "flex", gap: token("space.1000"), marginTop: token("space.300") }}>
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
                        borderRadius: token("border.radius.050"),
                        backgroundColor: item.color,
                      }}
                    />
                    <Text size="large">{item.name}</Text>
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
          <div style={{ flex: 1 }}>
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
              borderRadius: token("border.radius.100"),
              padding: `${token("space.100")} ${token("space.150")}`,
              minWidth: 90,
            }}
          >
            <Text size="medium" color="color.text.subtlest">$</Text>
            <Text size="medium" weight="medium">{sharePrice.toFixed(2)}</Text>
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), marginBottom: token("space.300") }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: token("border.radius.100"),
              backgroundColor: token("color.background.success"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text size="small" weight="bold" color="color.text.success">↗</Text>
          </div>
          <Heading size="medium">RSUs</Heading>
        </div>

        <div style={{ display: "flex", gap: token("space.400"), alignItems: "flex-start" }}>
          <div style={{ flex: 1, height: 280, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <BarChart data={adjustedYearlyData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={token("color.border")} />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={(props: any) => {
                    const { x, y, payload } = props;
                    const item = adjustedYearlyData.find((d) => d.year === payload.value);
                    return (
                      <text
                        x={x}
                        y={y + 16}
                        textAnchor="middle"
                        fill={token("color.text")}
                        fontSize={13}
                        fontWeight={item?.isCurrent ? 700 : 400}
                      >
                        {payload.value}
                      </text>
                    );
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                  tick={{ fill: token("color.text.subtlest"), fontSize: 12 }}
                  width={60}
                />
                <RechartsTooltip
                  formatter={(value: number) => [formatCurrency(value), "RSU Value"]}
                  contentStyle={{
                    backgroundColor: token("elevation.surface.overlay"),
                    border: `1px solid ${token("color.border")}`,
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="value" fill="#36B37E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              minWidth: 220,
              backgroundColor: token("color.background.neutral"),
              borderRadius: token("border.radius.200"),
              padding: token("space.300"),
              textAlign: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: token("space.050"), marginBottom: token("space.100") }}>
              <Text size="medium" weight="medium">Equity Value</Text>
              <Tooltip content="Total value of all RSU grants based on current share price">
                <span style={{ display: "inline-flex", cursor: "help" }}>
                  <InformationIcon label="info" />
                </span>
              </Tooltip>
            </div>
            <div style={{ marginBottom: token("space.050") }}>
              <Heading size="large" color="color.text.success">{formatCurrency(adjustedEquity.totalValue)}</Heading>
            </div>
            <Text size="small" color="color.text.subtlest">{equityData.totalUnits.toLocaleString()} units</Text>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: token("space.400"),
                marginTop: token("space.300"),
                paddingTop: token("space.200"),
                borderTop: `1px solid ${token("color.border")}`,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Text size="small" weight="medium">Vested</Text>
                <div>
                  <Text size="medium" weight="bold" color="color.text.success">
                    {formatCurrency(adjustedEquity.vestedValue)}
                  </Text>
                </div>
                <Text size="small" color="color.text.subtlest">
                  {equityData.vestedUnits.toLocaleString()} units
                </Text>
              </div>
              <div style={{ textAlign: "center" }}>
                <Text size="small" weight="medium">Unvested</Text>
                <div>
                  <Text size="medium" weight="bold" color="color.text.success">
                    {formatCurrency(adjustedEquity.unvestedValue)}
                  </Text>
                </div>
                <Text size="small" color="color.text.subtlest">
                  {equityData.unvestedUnits.toLocaleString()} units
                </Text>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: token("space.300"), paddingTop: token("space.200"), borderTop: `1px solid ${token("color.border")}` }}>
          <Text size="small" color="color.text.subtlest">
            You can model theoretical TEAM stock price changes using the slider tool. However, it's important to remember that the stock price could increase or decrease based on performance and market conditions.
          </Text>
          <div style={{ marginTop: token("space.100") }}>
            <Text size="small" color="color.text.subtlest">
              All grant amounts default to today's closing price and currency conversion rate. FX rates are updated daily using the exchangerate.host API.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
