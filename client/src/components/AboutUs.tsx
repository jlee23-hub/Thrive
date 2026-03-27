import React from "react";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import { token } from "@atlaskit/tokens";
import LinkExternalIcon from "@atlaskit/icon/core/link-external";

const sectionDivider: React.CSSProperties = {
  borderTop: `1px solid ${token("color.border")}`,
  marginTop: token("space.400"),
  paddingTop: token("space.400"),
};

const linkStyle: React.CSSProperties = {
  color: token("color.link"),
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: token("space.050"),
  fontSize: 14,
};

export default function AboutUs() {
  return (
    <div style={{ maxWidth: 900 }}>
      <div>
        <Heading size="medium">Resources</Heading>
        <div style={{ marginTop: token("space.200") }}>
          <Text size="medium">
            Explore the links below to learn more about the three major parts of your compensation – base salary, bonus/commission, and equity. We've written an "About" page for each component that takes you into more detail about how each program works.
          </Text>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: token("space.100"), marginTop: token("space.200") }}>
          <a href="https://atlassian.design" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            Atlassian Compensation <LinkExternalIcon label="" LEGACY_size="small" />
          </a>
          <a href="https://atlassian.design" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            About Base Salary <LinkExternalIcon label="" LEGACY_size="small" />
          </a>
          <a href="https://atlassian.design" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            About Equity <LinkExternalIcon label="" LEGACY_size="small" />
          </a>
          <a href="https://atlassian.design" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            About Bonus <LinkExternalIcon label="" LEGACY_size="small" />
          </a>
        </div>
        <div style={{ marginTop: token("space.200") }}>
          <Text size="medium">
            Visit{" "}
            <a href="https://atlassian.design" target="_blank" rel="noopener noreferrer" style={{ color: token("color.link"), textDecoration: "none" }}>
              Stock Central <LinkExternalIcon label="" LEGACY_size="small" />
            </a>
            {" "}for links to FAQs, country-specific tax guides, and more!
          </Text>
        </div>
      </div>

      <div style={sectionDivider}>
        <Heading size="medium">Legal Disclaimer</Heading>
        <div style={{ marginTop: token("space.200") }}>
          <Text size="medium">
            This tool provides estimates based on current information, and is not a promise of any future entitlement. Actual results may vary due to potential performance measurements, account corrections, termination and other adjustments. Fluctuations in market price, foreign exchange rates, and changes to fees, commissions and taxes will also impact actual proceeds. Results have been simplified for demonstration purposes. Results do not take into account any applicable taxes that may be due on exercise, vest, delivery, or sale. Atlassian does not provide tax or legal advice. You are encouraged to consult your tax advisor for information about any taxes that may apply. This tool is informational only and will not result in an exercise or transaction of any kind. Vesting is contingent on active employment on designated vesting dates. You should review your employment and/or grant agreements for more information.
          </Text>
        </div>
      </div>
    </div>
  );
}
