import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import Select from "@atlaskit/select";
import Textfield from "@atlaskit/textfield";
import SectionMessage from "@atlaskit/section-message";
import Lozenge from "@atlaskit/lozenge";

import GlobeIcon from "@atlaskit/icon/core/globe";
import AddIcon from "@atlaskit/icon/core/add";
import RefreshIcon from "@atlaskit/icon/core/refresh";
import DownloadIcon from "@atlaskit/icon/core/download";
import CrossIcon from "@atlaskit/icon/core/cross";
import InformationIcon from "@atlaskit/icon/core/information";

const PERFORMANCE_RATINGS = [
  { id: "greatly-exceeds", label: "Greatly Exceeded", appearance: "success" as const },
  { id: "exceeds", label: "Exceeds Expectations", appearance: "success" as const },
  { id: "meets", label: "Meets Expectations", appearance: "inprogress" as const },
  { id: "developing", label: "Met Some", appearance: "moved" as const },
  { id: "needs", label: "Did Not Meet", appearance: "removed" as const },
];

const COMPA_RATIO_RANGES = [
  { id: "below", range: "CR 0.80 - 0.90", label: "Below Range" },
  { id: "lower", range: "CR 0.90 - 1.00", label: "Lower Mid" },
  { id: "upper", range: "CR 1.00 - 1.10", label: "Upper Mid" },
  { id: "above", range: "CR 1.10 - 1.20", label: "Above Range" },
];

const cycleOptions = [
  { label: "2026 Annual Merit", value: "2026" },
  { label: "2025 Annual Merit", value: "2025" },
  { label: "2024 Annual Merit", value: "2024" },
];

export default function MeritMatrix() {
  const [selectedCycle, setSelectedCycle] = useState(cycleOptions[0]);
  const [selectedCountry, setSelectedCountry] = useState("Global");
  const [matrixData, setMatrixData] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const handleCellChange = (performanceId: string, compaId: string, value: string) => {
    setMatrixData((prev) => ({
      ...prev,
      [`${performanceId}-${compaId}`]: value,
    }));
    setHasChanges(true);
  };

  const getCellValue = (performanceId: string, compaId: string): string => {
    return matrixData[`${performanceId}-${compaId}`] || "";
  };

  const handleLoadDefaults = () => {
    const defaults: Record<string, string> = {
      "greatly-exceeds-below": "7.5",
      "greatly-exceeds-lower": "7.0",
      "greatly-exceeds-upper": "6.0",
      "greatly-exceeds-above": "5.0",
      "exceeds-below": "6.0",
      "exceeds-lower": "5.5",
      "exceeds-upper": "4.5",
      "exceeds-above": "3.5",
      "meets-below": "4.5",
      "meets-lower": "4.0",
      "meets-upper": "3.0",
      "meets-above": "2.0",
      "developing-below": "3.0",
      "developing-lower": "2.5",
      "developing-upper": "1.5",
      "developing-above": "0.0",
      "needs-below": "0.0",
      "needs-lower": "0.0",
      "needs-upper": "0.0",
      "needs-above": "0.0",
    };
    setMatrixData(defaults);
    setHasChanges(true);
  };

  const handleSave = () => {
    setHasChanges(false);
  };

  const handleCancel = () => {
    setMatrixData({});
    setHasChanges(false);
  };

  const isMatrixEmpty = Object.keys(matrixData).length === 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: token("elevation.surface") }}>
      <div
        style={{
          backgroundColor: token("elevation.surface"),
          borderBottom: `1px solid ${token("color.border")}`,
          padding: `${token("space.300")} ${token("space.400")}`,
        }}
      >
        <Heading size="large">Merit Matrix</Heading>
        <div style={{ marginTop: token("space.100") }}>
          <Text size="small" color="color.text.subtlest">
            Configure the formulaic merit increase percentages based on performance rating and compa-ratio position.
            Set a Global default matrix and override by country as needed.
          </Text>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: token("space.400") }}>
        <div style={{ width: "100%" }}>
          <div style={{ marginBottom: token("space.300"), maxWidth: "320px" }}>
            <Text size="small" weight="semibold">Cycle</Text>
            <div style={{ marginTop: token("space.100") }}>
              <Select
                options={cycleOptions}
                value={selectedCycle}
                onChange={(val) => val && setSelectedCycle(val)}
                placeholder="Select cycle"
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: token("space.300"),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: token("space.200") }}>
              <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                <GlobeIcon label="" />
                <Text size="small" weight="semibold">Country:</Text>
              </div>
              <Button
                appearance={selectedCountry === "Global" ? "primary" : "default"}
                onClick={() => setSelectedCountry("Global")}
              >
                Global
              </Button>
              <Button appearance="default" iconBefore={AddIcon}>
                Add Country
              </Button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
              <Button appearance="subtle" iconBefore={RefreshIcon} onClick={handleLoadDefaults}>
                Load Defaults
              </Button>
              <Button
                appearance="primary"
                iconBefore={DownloadIcon}
                onClick={handleSave}
                isDisabled={!hasChanges}
              >
                Save Matrix
              </Button>
              <Button appearance="subtle" onClick={handleCancel} isDisabled={!hasChanges}>
                Cancel
              </Button>
            </div>
          </div>

          {isMatrixEmpty && (
            <div style={{ marginBottom: token("space.300") }}>
              <SectionMessage>
                <Text size="small" weight="semibold">No matrix configured for {selectedCountry}</Text>
                <div style={{ marginTop: token("space.050") }}>
                  <Text size="small" color="color.text.subtlest">Load default values or configure manually</Text>
                </div>
              </SectionMessage>
            </div>
          )}

          <div
            style={{
              backgroundColor: token("elevation.surface.raised"),
              borderRadius: "6px",
              border: `1px solid ${token("color.border")}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr repeat(4, 1fr)",
                borderBottom: `1px solid ${token("color.border")}`,
                backgroundColor: token("elevation.surface.sunken"),
              }}
            >
              <div
                style={{
                  padding: token("space.200"),
                  borderRight: `1px solid ${token("color.border")}`,
                }}
              >
                <Text size="small" weight="semibold">Performance Rating</Text>
              </div>
              {COMPA_RATIO_RANGES.map((range, idx) => (
                <div
                  key={range.id}
                  style={{
                    padding: token("space.200"),
                    textAlign: "center",
                    borderRight: idx < COMPA_RATIO_RANGES.length - 1 ? `1px solid ${token("color.border")}` : undefined,
                  }}
                >
                  <Text size="small" weight="semibold">{range.range}</Text>
                  <div style={{ marginTop: token("space.050") }}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{range.label}</Text>
                  </div>
                </div>
              ))}
            </div>

            <div>
              {PERFORMANCE_RATINGS.map((rating, rowIdx) => (
                <div
                  key={rating.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr repeat(4, 1fr)",
                    borderBottom:
                      rowIdx < PERFORMANCE_RATINGS.length - 1
                        ? `1px solid ${token("color.border")}` : undefined,
                  }}
                >
                  <div
                    style={{
                      padding: token("space.200"),
                      borderRight: `1px solid ${token("color.border")}`,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Lozenge appearance={rating.appearance}>{rating.label}</Lozenge>
                  </div>

                  {COMPA_RATIO_RANGES.map((range, colIdx) => (
                    <div
                      key={range.id}
                      style={{
                        padding: token("space.200"),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRight:
                          colIdx < COMPA_RATIO_RANGES.length - 1
                            ? `1px solid ${token("color.border")}` : undefined,
                      }}
                    >
                      <div style={{ width: "96px", position: "relative" }}>
                        <Textfield
                          value={getCellValue(rating.id, range.id)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleCellChange(rating.id, range.id, e.target.value)
                          }
                          placeholder="0.0"
                          elemAfterInput={
                            <div style={{ paddingRight: token("space.100"), color: token("color.text.subtlest") }}>
                              <Text size="UNSAFE_small">%</Text>
                            </div>
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: token("space.400"),
              backgroundColor: token("elevation.surface.sunken"),
              borderRadius: "6px",
              border: `1px solid ${token("color.border")}`,
              padding: token("space.300"),
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: token("space.200") }}>
              <InformationIcon label="" color={token("color.icon.information")} />
              <div>
                <Text size="small" weight="semibold">How it works:</Text>
                <div style={{ marginTop: token("space.100") }}>
                  <Text size="small" color="color.text.subtlest">
                    The merit matrix defines the formulaic base salary increase percentage for each employee based on two factors:
                  </Text>
                </div>
                <ol style={{ margin: `${token("space.100")} 0 0 ${token("space.200")}`, padding: 0, listStyleType: "decimal" }}>
                  <li>
                    <Text size="small"><strong>Performance Rating</strong> from the most recent review cycle</Text>
                  </li>
                  <li>
                    <Text size="small"><strong>Compa-Ratio (CR)</strong> = Current Salary / Salary Range Midpoint</Text>
                  </li>
                </ol>
                <div style={{ marginTop: token("space.200") }}>
                  <Text size="small" color="color.text.subtlest">
                    Employees below range midpoint (CR &lt; 1.0) receive higher merit increases to move toward market.
                    Employees above range receive lower increases.
                  </Text>
                </div>
                <div style={{ marginTop: token("space.200") }}>
                  <Text size="small" weight="semibold">Country overrides:</Text>
                </div>
                <div style={{ marginTop: token("space.050") }}>
                  <Text size="small" color="color.text.subtlest">
                    The Global matrix applies by default. Add a country-specific matrix to override merit percentages for employees in that country.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
