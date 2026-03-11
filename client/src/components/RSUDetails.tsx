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
  BarChart,
  Bar,
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
  const vestingData = useMemo(() => getGrantVestingData(grant), [grant]);
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
                  {formatCurrency(grant.vestedUnits * sharePrice)}
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
              <Heading size="medium">{formatCurrency(grant.totalUnits * sharePrice)}</Heading>
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
  const defaultPrice = compensationData.defaultSharePrice;
  const [modeledPrice, setModeledPrice] = useState(defaultPrice);

  const totalUnits = useMemo(() => grants.reduce((sum, g) => sum + g.totalUnits, 0), []);
  const vestedUnits = useMemo(() => grants.reduce((sum, g) => sum + g.vestedUnits, 0), []);
  const unvestedUnits = totalUnits - vestedUnits;

  const totalValue = totalUnits * modeledPrice;
  const vestedValue = vestedUnits * modeledPrice;
  const unvestedValue = unvestedUnits * modeledPrice;

  const priceDiff = modeledPrice - defaultPrice;
  const priceDiffPct = ((priceDiff / defaultPrice) * 100).toFixed(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.400") }}>
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Heading size="large">Equity Summary</Heading>
        </div>

        <div style={{
          marginTop: token("space.300"),
          padding: token("space.300"),
          borderRadius: "6px",
          border: `1px solid ${token("color.border")}`,
          backgroundColor: token("elevation.surface.sunken"),
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: token("space.100") }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: token("space.200") }}>
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
          <Heading size="small">Vesting Schedule</Heading>
          <div style={{ marginTop: token("space.200"), height: 320 }}>
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <BarChart data={vestingScheduleData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={token("color.border")} />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: token("color.text.subtlest"), fontSize: 11 }}
                  interval={1}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: token("color.text.subtlest"), fontSize: 11 }}
                  tickFormatter={(v) => v.toLocaleString()}
                  width={50}
                />
                <RechartsTooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div style={{
                        backgroundColor: token("elevation.surface.overlay"),
                        border: `1px solid ${token("color.border")}`,
                        borderRadius: 8,
                        fontSize: 13,
                        padding: token("space.150"),
                      }}>
                        <div style={{ marginBottom: token("space.050"), fontWeight: 600 }}>{label}</div>
                        {payload.map((entry) => (
                          <div key={entry.name} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: token("space.100"),
                            marginTop: token("space.025"),
                          }}>
                            <div style={{
                              width: 10,
                              height: 10,
                              borderRadius: 2,
                              backgroundColor: entry.color,
                            }} />
                            <span style={{
                              color: entry.name === "unvested"
                                ? token("color.text")
                                : token("color.text.success"),
                              fontWeight: 500,
                            }}>
                              {entry.name === "vested" ? "Vested" : "Unvested"}:
                            </span>
                            <span style={{ color: token("color.text"), fontWeight: 600 }}>
                              {(entry.value as number).toLocaleString()} units
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                />
                <Bar
                  dataKey="vested"
                  stackId="1"
                  fill={token("color.chart.success.bold")}
                  name="vested"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="unvested"
                  stackId="1"
                  fill={token("color.background.neutral")}
                  name="unvested"
                  radius={[4, 4, 0, 0]}
                />
                <Legend
                  formatter={(value: string) => (
                    <span style={{ color: token("color.text"), fontSize: 12 }}>
                      {value === "vested" ? "Vested Units" : "Unvested Units"}
                    </span>
                  )}
                  iconType="square"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <GrantDetails grant={selectedGrant} allGrants={grants} onSelectGrant={setSelectedGrant} sharePrice={modeledPrice} />
    </div>
  );
}
