import React from "react";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import LinkExternalIcon from "@atlaskit/icon/core/link-external";
import PeopleGroupIcon from "@atlaskit/icon/core/people-group";
import GlobeIcon from "@atlaskit/icon/core/globe";
import OfficeIcon from "@atlaskit/icon/core/office-building";
import Button from "@atlaskit/button/new";

export default function AboutUs() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.400") }}>
      <div
        style={{
          backgroundColor: token("elevation.surface"),
          borderRadius: token("border.radius.200"),
          padding: token("space.400"),
          border: `1px solid ${token("color.border")}`,
        }}
      >
        <Heading size="large">About Your Compensation</Heading>
        <div style={{ marginTop: token("space.300") }}>
          <Text size="medium">
            This tool provides a comprehensive view of your total compensation package, including base salary, bonus targets, and equity grants. Use it to understand and model how changes in share price may affect your total compensation.
          </Text>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: token("space.300") }}>
        <div
          style={{
            backgroundColor: token("elevation.surface"),
            borderRadius: token("border.radius.200"),
            padding: token("space.400"),
            border: `1px solid ${token("color.border")}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: token("space.150"), marginBottom: token("space.200") }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: token("border.radius.100"),
                backgroundColor: token("color.background.discovery"),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PeopleGroupIcon label="team" color={token("color.icon.discovery")} />
            </div>
            <Heading size="small">Compensation Philosophy</Heading>
          </div>
          <Text size="medium">
            We believe in competitive, transparent compensation. Our packages are benchmarked against top-tier technology companies and reviewed annually to ensure market competitiveness.
          </Text>
        </div>

        <div
          style={{
            backgroundColor: token("elevation.surface"),
            borderRadius: token("border.radius.200"),
            padding: token("space.400"),
            border: `1px solid ${token("color.border")}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: token("space.150"), marginBottom: token("space.200") }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: token("border.radius.100"),
                backgroundColor: token("color.background.success"),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GlobeIcon label="equity" color={token("color.icon.success")} />
            </div>
            <Heading size="small">Equity Program</Heading>
          </div>
          <Text size="medium">
            RSUs (Restricted Stock Units) vest over a 4-year schedule, typically with a 1-year cliff. This aligns your interests with long-term company performance and shareholder value.
          </Text>
        </div>

        <div
          style={{
            backgroundColor: token("elevation.surface"),
            borderRadius: token("border.radius.200"),
            padding: token("space.400"),
            border: `1px solid ${token("color.border")}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: token("space.150"), marginBottom: token("space.200") }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: token("border.radius.100"),
                backgroundColor: token("color.background.warning"),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <OfficeIcon label="company" color={token("color.icon.warning")} />
            </div>
            <Heading size="small">Bonus Structure</Heading>
          </div>
          <Text size="medium">
            Your bonus target is based on a combination of company performance and individual contribution. Actual payouts may vary based on achievement against goals.
          </Text>
        </div>

        <div
          style={{
            backgroundColor: token("elevation.surface"),
            borderRadius: token("border.radius.200"),
            padding: token("space.400"),
            border: `1px solid ${token("color.border")}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: token("space.150"), marginBottom: token("space.200") }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: token("border.radius.100"),
                backgroundColor: token("color.background.information"),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LinkExternalIcon label="resources" color={token("color.icon.information")} />
            </div>
            <Heading size="small">Resources</Heading>
          </div>
          <Text size="medium">
            For questions about your compensation, contact the People Team or visit the internal compensation FAQ. Stock-related inquiries can be directed to your equity administrator.
          </Text>
          <div style={{ marginTop: token("space.200") }}>
            <Button appearance="primary">Contact People Team</Button>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: token("color.background.neutral"),
          borderRadius: token("border.radius.200"),
          padding: token("space.300"),
        }}
      >
        <Text size="small" color="color.text.subtlest">
          Disclaimer: The information presented in this tool is for informational purposes only and does not constitute financial advice. Actual compensation may vary. Stock prices are subject to market fluctuations. Please consult with a financial advisor for personalized guidance.
        </Text>
      </div>
    </div>
  );
}
