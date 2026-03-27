import React, { useState, useMemo } from "react";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import Tooltip from "@atlaskit/tooltip";
import InformationIcon from "@atlaskit/icon/core/information";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import Button from "@atlaskit/button/new";
import Range from "@atlaskit/range";
import {
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
  borderRadius: "6px",
  padding: token("space.400"),
  border: `1px solid ${token("color.border")}`,
};


function GrantDetails({ grant, allGrants, onSelectGrant, sharePrice }: { grant: Grant; allGrants: Grant[]; onSelectGrant: (g: Grant) => void; sharePrice: number }) {
  const vestingData = useMemo(() => getGrantVestingData(grant, sharePrice), [grant, sharePrice]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: token("space.200"), marginBottom: token("space.400") }}>
        <Heading size="medium">Grant Details For</Heading>
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              backgroundColor: token("color.background.neutral"),
              borderRadius: "6px",
              padding: `${token("space.050")} ${token("space.200")}`,
              display: "flex",
              alignItems: "center",
              gap: token("space.100"),
              cursor: "pointer",
            }}
          >
            <Text size="small">{grant.grantDate} - {grant.totalUnits.toLocaleString()} total units</Text>
            <ChevronDownIcon label="select" />
          </div>
          {dropdownOpen && (
            <div style={{
              position: "absolute",
              top: "100%",
              left: 0,
              marginTop: token("space.050"),
              backgroundColor: token("elevation.surface.overlay"),
              border: `1px solid ${token("color.border")}`,
              borderRadius: "6px",
              minWidth: 280,
              zIndex: 10,
              overflow: "hidden",
            }}>
              {allGrants.map((g) => (
                <div
                  key={g.id}
                  onClick={() => {
                    onSelectGrant(g);
                    setDropdownOpen(false);
                  }}
                  style={{
                    padding: `${token("space.100")} ${token("space.200")}`,
                    cursor: "pointer",
                    backgroundColor: g.id === grant.id ? token("color.background.selected") : "transparent",
                    borderLeft: g.id === grant.id ? `2px solid ${token("color.border.selected")}` : "2px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (g.id !== grant.id) e.currentTarget.style.backgroundColor = token("color.background.neutral.subtle.hovered");
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = g.id === grant.id ? token("color.background.selected") : "transparent";
                  }}
                >
                  <Text size="small" weight={g.id === grant.id ? "bold" : "regular"}>
                    {g.grantDate} - {g.totalUnits.toLocaleString()} total units
                  </Text>
                  <div>
                    <Text size="UNSAFE_small" color="color.text.subtlest">
                      {g.vestedUnits.toLocaleString()} vested · {formatCurrency(g.totalUnits * sharePrice)}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          )}
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
                  {formatCurrency((grant.totalUnits - grant.vestedUnits) * sharePrice)}
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
              borderRadius: "6px",
              padding: token("space.300"),
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: token("space.100") }}>
              <Text size="medium" weight="bold">Estimated Grant Value Calculator</Text>
              <Heading size="medium">{formatCurrency((grant.totalUnits - grant.vestedUnits) * sharePrice)}</Heading>
            </div>
            <Text size="small" color="color.text.subtlest">
              This is the estimated pre-tax value of your unvested units. Here's the calculation:
            </Text>
            <div style={{ display: "flex", alignItems: "center", gap: token("space.200"), marginTop: token("space.200") }}>
              <div style={{ textAlign: "center" }}>
                <Heading size="small">{(grant.totalUnits - grant.vestedUnits).toLocaleString()}</Heading>
                <Text size="small" color="color.text.subtlest">Unvested units</Text>
              </div>
              <Text size="large" weight="bold" color="color.text.subtlest">×</Text>
              <Text size="medium" weight="medium">(</Text>
              <div style={{ textAlign: "center" }}>
                <Heading size="small" color="color.text.success">
                  {formatCurrencyDecimal(sharePrice)}
                </Heading>
                <div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
                  <Text size="small" color="color.text.subtlest">Modeled share price</Text>
                  <Tooltip content="Based on modeled share price from slider">
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
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const point = vestingData.find((d) => d.date === label);
                    if (!point) return null;
                    return (
                      <div style={{
                        backgroundColor: token("elevation.surface.overlay"),
                        border: `1px solid ${token("color.border")}`,
                        borderRadius: 8,
                        fontSize: 13,
                        padding: token("space.200"),
                        minWidth: 220,
                        boxShadow: token("elevation.shadow.overlay"),
                      }}>
                        <div style={{ fontWeight: 700, marginBottom: token("space.100"), color: token("color.text") }}>
                          {label} – {point.vestingPct}%
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: token("space.050") }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Text size="small" color="color.text.subtlest">Share Price:</Text>
                            <Text size="small" weight="bold">{formatCurrencyDecimal(point.sharePrice)}</Text>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Text size="small" color="color.text.subtlest">Vesting Units:</Text>
                            <Text size="small" weight="bold">{point.vestingUnits.toLocaleString()}</Text>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Text size="small" color="color.text.subtlest">Vesting Value:</Text>
                            <Text size="small" weight="bold">{formatCurrency(point.vestingValue)}</Text>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Text size="small" color="color.text.subtlest">Total Vested Units:</Text>
                            <Text size="small" weight="bold">{point.totalVestedUnits.toLocaleString()}</Text>
                          </div>
                        </div>
                        <div style={{
                          marginTop: token("space.100"),
                          paddingTop: token("space.075"),
                          borderTop: `1px solid ${token("color.border")}`,
                          fontSize: 11,
                          color: point.isFuture ? token("color.text.warning") : token("color.text.subtlest"),
                          fontStyle: "italic",
                        }}>
                          {point.isFuture
                            ? "Projected using modeled share price"
                            : "Based on share price at vest date"}
                        </div>
                      </div>
                    );
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
  const defaultPrice = compensationData.defaultSharePrice;
  const [modeledPrice, setModeledPrice] = useState(defaultPrice);

  const totalUnits = useMemo(() => grants.reduce((sum, g) => sum + g.totalUnits, 0), []);
  const vestedUnits = useMemo(() => grants.reduce((sum, g) => sum + g.vestedUnits, 0), []);
  const unvestedUnits = totalUnits - vestedUnits;

  const vestedValue = useMemo(() => grants.reduce((sum, g) => sum + g.vestedValue, 0), []);
  const unvestedValue = unvestedUnits * modeledPrice;
  const totalValue = vestedValue + unvestedValue;

  const priceDiff = modeledPrice - defaultPrice;
  const priceDiffPct = ((priceDiff / defaultPrice) * 100).toFixed(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.400") }}>
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Text size="medium" weight="bold">Model Share Price</Text>
          <div style={{ display: "flex", alignItems: "center", gap: token("space.150") }}>
            <Heading size="medium">{formatCurrencyDecimal(modeledPrice)}</Heading>
            {priceDiff !== 0 && (
              <Text size="small" color={priceDiff > 0 ? "color.text.success" : "color.text.danger"} weight="semibold">
                {priceDiff > 0 ? "+" : ""}{priceDiffPct}%
              </Text>
            )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.200"), marginTop: token("space.200") }}>
          <Text size="UNSAFE_small" color="color.text.subtlest">{formatCurrencyDecimal(defaultPrice * 0.5)}</Text>
          <div style={{ flex: 1 }} className="hide-range-dot">
            <Range
              min={Math.round(defaultPrice * 0.5 * 100) / 100}
              max={Math.round(defaultPrice * 2 * 100) / 100}
              step={0.01}
              value={modeledPrice}
              onChange={(val) => setModeledPrice(val)}
            />
          </div>
          <Text size="UNSAFE_small" color="color.text.subtlest">{formatCurrencyDecimal(defaultPrice * 2)}</Text>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: token("space.050") }}>
          <Text size="UNSAFE_small" color="color.text.subtlest">
            Current price: {formatCurrencyDecimal(defaultPrice)}
          </Text>
          {modeledPrice !== defaultPrice && (
            <span
              onClick={() => setModeledPrice(defaultPrice)}
              style={{ fontSize: 11, color: token("color.text.brand"), cursor: "pointer", fontWeight: 500 }}
            >
              Reset to current
            </span>
          )}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Heading size="large">RSU's</Heading>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: token("space.300"),
          marginTop: token("space.300"),
        }}>
          <div style={{
            padding: token("space.300"),
            borderRadius: "6px",
            border: `1px solid ${token("color.border")}`,
            backgroundColor: token("elevation.surface.sunken"),
          }}>
            <Text size="small" color="color.text.subtlest" weight="semibold">Total Equity</Text>
            <div style={{ marginTop: token("space.100") }}>
              <Heading size="medium">{formatCurrency(totalValue)}</Heading>
            </div>
            <div style={{ marginTop: token("space.050") }}>
              <Text size="small" color="color.text.subtlest">
                {totalUnits.toLocaleString()} total units
              </Text>
            </div>
          </div>

          <div style={{
            padding: token("space.300"),
            borderRadius: "6px",
            border: `1px solid ${token("color.border")}`,
            backgroundColor: token("elevation.surface.sunken"),
          }}>
            <Text size="small" color="color.text.subtlest" weight="semibold">Vested</Text>
            <div style={{ marginTop: token("space.100") }}>
              <Heading size="medium">{formatCurrency(vestedValue)}</Heading>
            </div>
            <div style={{ marginTop: token("space.050") }}>
              <Text size="small" color="color.text.success">
                {vestedUnits.toLocaleString()} vested units
              </Text>
            </div>
          </div>

          <div style={{
            padding: token("space.300"),
            borderRadius: "6px",
            border: `1px solid ${token("color.border")}`,
            backgroundColor: token("elevation.surface.sunken"),
          }}>
            <Text size="small" color="color.text.subtlest" weight="semibold">Unvested</Text>
            <div style={{ marginTop: token("space.100") }}>
              <Heading size="medium">{formatCurrency(unvestedValue)}</Heading>
            </div>
            <div style={{ marginTop: token("space.050") }}>
              <Text size="small" color="color.text.subtlest">
                {unvestedUnits.toLocaleString()} unvested units
              </Text>
            </div>
          </div>
        </div>

        <div style={{ marginTop: token("space.300") }}>
          <Heading size="small">Equity Summary</Heading>
          <div style={{ display: "flex", gap: token("space.400"), marginTop: token("space.200") }}>
            <div style={{ minWidth: 280, display: "flex", flexDirection: "column", gap: token("space.300") }}>
              {[...grants].reverse().map((g) => {
                const pct = (g.vestedUnits / g.totalUnits) * 100;
                return (
                  <div key={g.id}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: token("space.100"), flexWrap: "wrap" }}>
                      <Text size="medium" weight="bold">{g.grantDate} Grant</Text>
                      <Text size="small" color="color.text.subtlest">
                        {formatCurrency(g.vestedValue)} / {formatCurrency(g.totalValue)}
                      </Text>
                    </div>
                    <div style={{ marginTop: token("space.050") }}>
                      <Text size="small" color="color.text.subtlest">
                        {g.vestedUnits.toLocaleString()} vested / {g.totalUnits.toLocaleString()} total units
                      </Text>
                    </div>
                    <div style={{
                      marginTop: token("space.100"),
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: token("color.background.neutral"),
                      overflow: "hidden",
                    }}>
                      <div style={{
                        width: `${pct}%`,
                        height: "100%",
                        borderRadius: 3,
                        backgroundColor: token("color.chart.success.bold"),
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ flex: 1, height: 280, minWidth: 0 }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={1}>
                <LineChart data={vestingScheduleData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={token("color.border")} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: token("color.text.subtlest"), fontSize: 10 }}
                    interval={1}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: token("color.text.subtlest"), fontSize: 11 }}
                    width={50}
                    tickFormatter={(v) => v.toLocaleString()}
                  />
                  <RechartsTooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      const dataPoint = vestingScheduleData.find((d) => d.date === label);
                      if (!dataPoint) return null;
                      const totalUnits = dataPoint.vested + dataPoint.unvested;
                      return (
                        <div style={{
                          backgroundColor: token("elevation.surface.overlay"),
                          border: `1px solid ${token("color.border")}`,
                          borderRadius: 8,
                          fontSize: 13,
                          padding: token("space.200"),
                          minWidth: 220,
                          boxShadow: token("elevation.shadow.overlay"),
                        }}>
                          <div style={{ fontWeight: 700, marginBottom: token("space.100"), color: token("color.text") }}>
                            {label}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: token("space.050") }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <Text size="small" color="color.text.subtlest">Vested Units:</Text>
                              <Text size="small" weight="bold">{dataPoint.vested.toLocaleString()}</Text>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <Text size="small" color="color.text.subtlest">Unvested Units:</Text>
                              <Text size="small" weight="bold">{dataPoint.unvested.toLocaleString()}</Text>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: token("space.050"), borderTop: `1px solid ${token("color.border")}` }}>
                              <Text size="small" color="color.text.subtlest">Total Units:</Text>
                              <Text size="small" weight="bold">{totalUnits.toLocaleString()}</Text>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="unvested"
                    stroke={token("color.border")}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    dot={{ fill: token("color.border"), r: 3 }}
                    name="Unvested Units"
                  />
                  <Line
                    type="monotone"
                    dataKey="vested"
                    stroke="#36B37E"
                    strokeWidth={2}
                    dot={{ fill: "#36B37E", r: 3 }}
                    name="Vested Units"
                  />
                  <Legend
                    formatter={(value: string) => (
                      <span style={{ color: token("color.text"), fontSize: 12 }}>
                        {value}
                      </span>
                    )}
                    iconType="circle"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      <GrantDetails grant={selectedGrant} allGrants={grants} onSelectGrant={setSelectedGrant} sharePrice={modeledPrice} />
    </div>
  );
}
