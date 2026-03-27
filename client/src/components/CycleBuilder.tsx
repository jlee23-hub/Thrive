import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";
import { Text } from "@atlaskit/primitives";
import Button, { IconButton } from "@atlaskit/button/new";
import Textfield from "@atlaskit/textfield";
import TextArea from "@atlaskit/textarea";
import Select from "@atlaskit/select";
import Lozenge from "@atlaskit/lozenge";
import DynamicTable from "@atlaskit/dynamic-table";
import SectionMessage from "@atlaskit/section-message";
import InlineMessage from "@atlaskit/inline-message";
import Toggle from "@atlaskit/toggle";

import PageIcon from "@atlaskit/icon/core/page";
import AddIcon from "@atlaskit/icon/core/add";
import UploadIcon from "@atlaskit/icon/core/upload";
import DownloadIcon from "@atlaskit/icon/core/download";
import ChevronLeftIcon from "@atlaskit/icon/core/chevron-left";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ChevronUpIcon from "@atlaskit/icon/core/chevron-up";
import EditIcon from "@atlaskit/icon/core/edit";
import DeleteIcon from "@atlaskit/icon/core/delete";
import PersonIcon from "@atlaskit/icon/core/person";
import EmailIcon from "@atlaskit/icon/core/email";
import SettingsIcon from "@atlaskit/icon/core/settings";
import TableIcon from "@atlaskit/icon/core/table";
import CheckCircleIcon from "@atlaskit/icon/core/check-circle";
import AlertIcon from "@atlaskit/icon/core/alert";
import CheckMarkIcon from "@atlaskit/icon/core/check-mark";
import SpreadsheetIcon from "@atlaskit/icon/core/spreadsheet";
import FilterIcon from "@atlaskit/icon/core/filter";

const cardStyle: React.CSSProperties = {
  backgroundColor: token("elevation.surface.raised"),
  borderRadius: "6px",
  padding: token("space.400"),
  border: `1px solid ${token("color.border")}`,
};

type Step = {
  id: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  { id: "details", title: "Configure Cycle", description: "Name, year, and type" },
  { id: "eligibility", title: "Eligibility Rules", description: "Define participation criteria" },
  { id: "employee-grid", title: "Employee Data", description: "View eligible employees" },
  { id: "upload-comp", title: "Upload Compensation Data", description: "Upload comp data via CSV" },
  { id: "comp-grid", title: "Employee + Comp Data", description: "Review merged data" },
  { id: "salary-bands", title: "Salary Bands", description: "Upload and manage salary bands" },
  { id: "reward-statements", title: "Reward Statements", description: "Configure reward letters" },
];

interface CycleBuilderProps {
  onBack: () => void;
}

const duplicateOptions = [
  { label: "None - Start from scratch", value: "none" },
  { label: "2025 Annual Merit Cycle", value: "merit-2025" },
  { label: "Q4 2025 Equity Refresh", value: "equity-q4-2025" },
  { label: "2025 Promotion Cycle", value: "promo-2025" },
];

const typeOptions = [
  { label: "Merit", value: "merit" },
  { label: "Promotion", value: "promotion" },
  { label: "Equity", value: "equity" },
  { label: "Combined (Merit + Promo + Equity)", value: "all" },
  { label: "Other", value: "other" },
];

const workdayFields = [
  { field: "Employee ID", column: "employeeWkRef", desc: "Unique identifier from Workday" },
  { field: "First Name", column: "firstName", desc: "Legal first name" },
  { field: "Last Name", column: "lastName", desc: "Legal last name" },
  { field: "Email", column: "email", desc: "Corporate email address", isUpdated: true },
  { field: "Job Title", column: "title", desc: "Current job title" },
  { field: "Level", column: "level", desc: "Job level (IC1-VP)", isUpdated: true },
  { field: "Department", column: "department", desc: "Organizational department" },
  { field: "Location", column: "location", desc: "Primary work location", isUpdated: true },
  { field: "Manager", column: "managerId", desc: "Reporting manager reference" },
  { field: "Hire Date", column: "hireDate", desc: "Original hire date" },
  { field: "Performance Rating", column: "performanceRating", desc: "Latest annual rating" },
  { field: "H1 Performance", column: "h1PerformanceRating", desc: "Mid-year performance rating" },
  { field: "Base Salary", column: "currentSalary", desc: "Current annual base salary", isUpdated: true },
  { field: "Bonus Target %", column: "bonusTarget", desc: "Target bonus percentage" },
  { field: "Currency", column: "currency", desc: "Pay currency code" },
  { field: "Job Family", column: "jobFamily", desc: "Workday job family classification" },
  { field: "Job Profile", column: "jobProfile", desc: "Specific job profile", isUpdated: true },
  { field: "Job Profile ID", column: "jobProfileWorkdayId", desc: "Workday internal job profile ID" },
  { field: "Geographic Zone", column: "geographicZone", desc: "Compensation zone grouping" },
  { field: "Business Title", column: "businessTitle", desc: "External-facing title" },
  { field: "Position Start", column: "startDate", desc: "Current position start date" },
  { field: "Time in Role", column: "timeInJobProfile", desc: "Duration in current job profile" },
  { field: "Tenure", column: "tenure", desc: "Total years with the organization", isUpdated: true },
  { field: "FTE %", column: "ftePercent", desc: "Full-time equivalent percentage" },
  { field: "Country", column: "country", desc: "Country of employment" },
  { field: "Position ID", column: "positionId", desc: "Workday position identifier" },
  { field: "Subsidiary", column: "subsidiary", desc: "Legal entity / subsidiary" },
  { field: "Supervisory Org", column: "supervisoryOrg", desc: "Supervisory organization" },
  { field: "FX Rate", column: "fxRate", desc: "Foreign exchange rate to USD" },
  { field: "Hourly/Salaried", column: "paidHourly", desc: "Compensation type indicator" },
  { field: "Commission", column: "commission", desc: "Commission amount if applicable" },
  { field: "Target Bonus $", column: "currentTargetBonus", desc: "Calculated target bonus amount" },
];

const employeeData = [
  { id: "EMP-00001", firstName: "Sarah", lastName: "Chen", title: "VP of Compensation", level: "M90", dept: "HR", location: "Zone A USA", rating: "Greatly Exceeded", salary: 180000, commission: null as number | null, bonus: 20.0, equity: null as number | null },
  { id: "EMP-00002", firstName: "Michael", lastName: "Johnson", title: "SVP of Engineering", level: "M100", dept: "Engineering", location: "Zone B USA", rating: "Exceeded", salary: 220000, commission: null, bonus: 30.0, equity: 150000 },
  { id: "EMP-00003", firstName: "Lisa", lastName: "Patel", title: "Director of Product", level: "M60", dept: "Product", location: "Zone A USA", rating: "Met", salary: 175000, commission: null, bonus: 20.0, equity: 75000 },
  { id: "EMP-00004", firstName: "James", lastName: "Anderson", title: "Senior Product Manager", level: "M50", dept: "Product", location: "Zone C USA", rating: "Exceeded", salary: 155000, commission: null, bonus: 15.0, equity: 50000 },
  { id: "EMP-00005", firstName: "Emily", lastName: "Williams", title: "Engineering Manager", level: "M50", dept: "Engineering", location: "Zone A USA", rating: "Met", salary: 165000, commission: null, bonus: 15.0, equity: 60000 },
  { id: "EMP-00006", firstName: "David", lastName: "Martinez", title: "Staff Engineer", level: "P70", dept: "Engineering", location: "Zone B USA", rating: "Greatly Exceeded", salary: 190000, commission: null, bonus: 15.0, equity: 80000 },
  { id: "EMP-00007", firstName: "Jessica", lastName: "Brown", title: "Senior Designer", level: "P60", dept: "Design", location: "Zone A USA", rating: "Met Some", salary: 145000, commission: null, bonus: 10.0, equity: null },
  { id: "EMP-00008", firstName: "Robert", lastName: "Davis", title: "Senior Software Engineer", level: "P60", dept: "Engineering", location: "Zone B USA", rating: "Met", salary: 160000, commission: null, bonus: 10.0, equity: 45000 },
  { id: "EMP-00009", firstName: "Amanda", lastName: "Wilson", title: "Product Marketing Manager", level: "P50", dept: "Marketing", location: "Zone C USA", rating: "Did Not Meet", salary: 130000, commission: null, bonus: 10.0, equity: null },
  { id: "EMP-00010", firstName: "Christopher", lastName: "Taylor", title: "HR Business Partner", level: "P50", dept: "HR", location: "Zone C USA", rating: "Met", salary: 120000, commission: null, bonus: 10.0, equity: null },
  { id: "EMP-00011", firstName: "Jennifer", lastName: "Moore", title: "Data Scientist", level: "P60", dept: "Data Science", location: "Zone A USA", rating: "Exceeded", salary: 170000, commission: null, bonus: 10.0, equity: 55000 },
  { id: "EMP-00012", firstName: "Daniel", lastName: "Jackson", title: "Sales Director", level: "M60", dept: "Sales", location: "Zone B USA", rating: "Exceeded", salary: 165000, commission: 40.0, bonus: 25.0, equity: null },
];

const excludedEmployees = [
  { name: "Alex Thompson", id: "EMP-00067", dept: "Engineering", startDate: "April 15, 2026", empType: "Regular", reason: "Start Date", detail: "Started after March 31, 2026 cutoff" },
  { name: "Marcus Johnson", id: "EMP-00089", dept: "Sales", startDate: "January 12, 2024", empType: "Contractor", reason: "Employment Type", detail: "Not Regular or Definite employment type" },
  { name: "Sophie Chen", id: "EMP-00134", dept: "Marketing", startDate: "August 3, 2025", empType: "Temporary", reason: "Employment Type", detail: "Not Regular or Definite employment type" },
  { name: "Daniel Rodriguez", id: "EMP-00421", dept: "Engineering", startDate: "April 8, 2026", empType: "Definite", reason: "Start Date", detail: "Started after March 31, 2026 cutoff" },
  { name: "Emma Watson", id: "EMP-00156", dept: "Design", startDate: "February 20, 2025", empType: "Intern", reason: "Employment Type", detail: "Not Regular or Definite employment type" },
  { name: "James Park", id: "EMP-00398", dept: "Operations", startDate: "May 10, 2026", empType: "Regular", reason: "Start Date", detail: "Started after March 31, 2026 cutoff" },
  { name: "Olivia Martinez", id: "EMP-00267", dept: "Finance", startDate: "November 5, 2024", empType: "Consultant", reason: "Employment Type", detail: "Not Regular or Definite employment type" },
];

const salaryBands = [
  { level: "P30 - Junior", srp: "$75,000", rangeMax: "$95,000", equityMax: "$15,000" },
  { level: "P40 - Mid-Level", srp: "$95,000", rangeMax: "$120,000", equityMax: "$25,000" },
  { level: "P50 - Senior", srp: "$120,000", rangeMax: "$150,000", equityMax: "$40,000" },
  { level: "P60 - Staff", srp: "$150,000", rangeMax: "$185,000", equityMax: "$60,000" },
  { level: "P70 - Principal", srp: "$185,000", rangeMax: "$230,000", equityMax: "$85,000" },
  { level: "P80 - Senior Principal", srp: "$230,000", rangeMax: "$280,000", equityMax: "$120,000" },
  { level: "P90 - Distinguished", srp: "$280,000", rangeMax: "$350,000", equityMax: "$175,000" },
];



function SuccessAnimation({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"circle" | "check" | "text" | "confetti" | "done">("circle");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("check"), 500);
    const t2 = setTimeout(() => setPhase("confetti"), 1000);
    const t3 = setTimeout(() => setPhase("text"), 1600);
    const t4 = setTimeout(() => setPhase("done"), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const confettiColors = [
    token("color.background.brand.bold"),
    token("color.background.success.bold"),
    token("color.background.warning.bold"),
    token("color.background.danger.bold"),
    token("color.background.discovery.bold"),
    token("color.background.information.bold"),
  ];

  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => {
      const angle = (i / 40) * 360;
      const distance = 80 + Math.random() * 160;
      const size = 4 + Math.random() * 8;
      const color = confettiColors[i % confettiColors.length];
      const delay = Math.random() * 0.3;
      const isRect = i % 3 !== 0;
      return { angle, distance, size, color, delay, isRect };
    })
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: token("elevation.surface"),
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes circleScale {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes drawCheck {
          0% { stroke-dashoffset: 48; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes circleStroke {
          0% { stroke-dashoffset: 283; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>

      <div style={{ position: "relative", width: 200, height: 200 }}>
        {(phase === "confetti" || phase === "text" || phase === "done") && (
          <div style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0 }}>
            {particles.map((p, i) => {
              const radians = (p.angle * Math.PI) / 180;
              const tx = Math.cos(radians) * p.distance;
              const ty = Math.sin(radians) * p.distance;
              const name = `confetti-${i}`;
              return (
                <React.Fragment key={i}>
                  <style>{`
                    @keyframes ${name} {
                      0% { transform: translate(0, 0) scale(0); opacity: 1; }
                      50% { opacity: 1; }
                      100% { transform: translate(${tx}px, ${ty}px) scale(1); opacity: 0; }
                    }
                  `}</style>
                  <div
                    style={{
                      position: "absolute",
                      width: p.size,
                      height: p.isRect ? p.size * 0.4 : p.size,
                      borderRadius: p.isRect ? 2 : "50%",
                      backgroundColor: p.color,
                      animation: `${name} 0.9s ${p.delay}s ease-out forwards`,
                      opacity: 0,
                    }}
                  />
                </React.Fragment>
              );
            })}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `3px solid ${token("color.border.success")}`,
            animation: phase !== "circle" ? "pulseRing 1s ease-out forwards" : "none",
            opacity: phase !== "circle" ? 0.4 : 0,
          }}
        />

        <svg
          viewBox="0 0 100 100"
          style={{
            width: 200,
            height: 200,
            animation: "circleScale 0.5s ease-out forwards",
          }}
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={token("color.border.success")}
            strokeWidth="3"
            strokeDasharray="283"
            strokeDashoffset="283"
            strokeLinecap="round"
            style={{
              animation: "circleStroke 0.7s 0.1s ease-out forwards",
              transformOrigin: "center",
              transform: "rotate(-90deg)",
            }}
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill={token("color.background.success")}
            opacity={phase !== "circle" ? 1 : 0}
            style={{ transition: "opacity 0.4s ease" }}
          />
          {(phase === "check" || phase === "confetti" || phase === "text" || phase === "done") && (
            <polyline
              points="30,52 44,66 70,38"
              fill="none"
              stroke={token("color.icon.success")}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="48"
              strokeDashoffset="48"
              style={{ animation: "drawCheck 0.4s 0.1s ease-out forwards" }}
            />
          )}
        </svg>
      </div>

      <div
        style={{
          marginTop: token("space.400"),
          textAlign: "center",
          opacity: phase === "text" || phase === "done" ? 1 : 0,
          transform: phase === "text" || phase === "done" ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease-out",
        }}
      >
        <Heading size="large">Cycle Finalized</Heading>
        <div style={{ marginTop: token("space.100"), maxWidth: 400 }}>
          <Text size="medium" color="color.text.subtlest">
            Your compensation cycle has been successfully created and is ready for activation.
          </Text>
        </div>
      </div>

      <div
        style={{
          marginTop: token("space.400"),
          opacity: phase === "done" ? 1 : 0,
          transform: phase === "done" ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.4s ease-out",
        }}
      >
        <Button appearance="primary" onClick={onDone}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}

export default function CycleBuilder({ onBack }: CycleBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [includePerformance, setIncludePerformance] = useState(true);
  const [includeComparison, setIncludeComparison] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    fiscalYear: new Date().getFullYear().toString(),
    type: "merit",
    customType: "",
    description: "",
    startDate: "",
    endDate: "",
    effectiveDate: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const triggerAutosave = useCallback(() => {
    setLastSaved(new Date());
  }, []);

  const handleNext = () => {
    triggerAutosave();
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <CycleDetailsStep formData={formData} updateField={updateField} />;
      case 1:
        return <EligibilityRulesStep />;
      case 2:
        return <EmployeeDataGridStep />;
      case 3:
        return <UploadCompensationDataStep />;
      case 4:
        return <CompDataGridStep />;
      case 5:
        return <SalaryBandsStep />;
      case 6:
        return (
          <RewardStatementsStep
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            includePerformance={includePerformance}
            setIncludePerformance={setIncludePerformance}
            includeComparison={includeComparison}
            setIncludeComparison={setIncludeComparison}
            customMessage={customMessage}
            setCustomMessage={setCustomMessage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: token("elevation.surface"),
        borderRadius: "6px",
        border: `1px solid ${token("color.border")}`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {showComplete && <SuccessAnimation onDone={onBack} />}

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div
          style={{
            width: 250,
            backgroundColor: token("elevation.surface.sunken"),
            borderRight: `1px solid ${token("color.border")}`,
            padding: `${token("space.300")} ${token("space.300")}`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <StepperNav steps={STEPS} currentStep={currentStep} onStepClick={setCurrentStep} />
        </div>

        <div
          style={{
            flex: 1,
            padding: token("space.500"),
            overflowY: "auto",
          }}
        >
          {renderStepContent()}
        </div>
      </div>

      <div
        style={{
          padding: `${token("space.200")} ${token("space.500")}`,
          borderTop: `1px solid ${token("color.border")}`,
          backgroundColor: token("elevation.surface"),
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
          <Button
            appearance="subtle"
            iconBefore={ChevronLeftIcon}
            onClick={handleBack}
            isDisabled={currentStep === 0}
          >
            Back
          </Button>
          <Button appearance="subtle" onClick={onBack}>
            Cancel
          </Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.200") }}>
          {lastSaved && (
            <div style={{ display: "flex", alignItems: "center", gap: token("space.075") }}>
              <CheckCircleIcon label="" color={token("color.icon.success")} LEGACY_size="small" />
              <Text size="UNSAFE_small" color="color.text.subtlest">
                Saved {lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
            </div>
          )}
          <Button
            appearance={currentStep === STEPS.length - 1 || currentStep === 0 ? "primary" : "default"}
            iconAfter={ChevronRightIcon}
            onClick={handleNext}
          >
            {currentStep === STEPS.length - 1 ? "Finalize Cycle" : currentStep === 0 ? "Create Cycle" : "Next Step"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function StepperNav({
  steps,
  currentStep,
  onStepClick,
}: {
  steps: typeof STEPS;
  currentStep: number;
  onStepClick: (index: number) => void;
}) {
  const circleSize = 28;
  const circleCenter = circleSize / 2;
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [blueLineHeight, setBlueLineHeight] = useState(0);
  const [greyLineTop, setGreyLineTop] = useState(0);
  const [greyLineHeight, setGreyLineHeight] = useState(0);

  const updateLineHeight = useCallback(() => {
    const container = containerRef.current;
    const firstCircle = circleRefs.current[0];
    const lastCircle = circleRefs.current[steps.length - 1];
    if (!container || !firstCircle || !lastCircle) return;

    const containerRect = container.getBoundingClientRect();
    const firstCenter = firstCircle.getBoundingClientRect().top + circleCenter - containerRect.top;
    const lastCenter = lastCircle.getBoundingClientRect().top + circleCenter - containerRect.top;
    setGreyLineTop(firstCenter);
    setGreyLineHeight(lastCenter - firstCenter);

    if (currentStep > 0) {
      const activeCircle = circleRefs.current[currentStep];
      if (activeCircle) {
        const activeCenter = activeCircle.getBoundingClientRect().top + circleCenter - containerRect.top;
        setBlueLineHeight(activeCenter - firstCenter);
      }
    } else {
      setBlueLineHeight(0);
    }
  }, [currentStep, circleCenter, steps.length]);

  useLayoutEffect(() => {
    updateLineHeight();
  }, [updateLineHeight]);

  useEffect(() => {
    const observer = new ResizeObserver(() => updateLineHeight());
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [updateLineHeight]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: token("space.300"),
        position: "relative",
      }}
    >
      {greyLineHeight > 0 && (
        <div
          style={{
            position: "absolute",
            left: circleCenter - 1,
            top: greyLineTop,
            height: greyLineHeight,
            width: 2,
            backgroundColor: token("color.border"),
            zIndex: 0,
          }}
        />
      )}
      {currentStep > 0 && blueLineHeight > 0 && (
        <div
          style={{
            position: "absolute",
            left: circleCenter - 1,
            top: greyLineTop,
            height: blueLineHeight,
            width: 2,
            backgroundColor: token("color.border.brand"),
            zIndex: 0,
            transition: "height 0.2s ease",
          }}
        />
      )}
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div
            key={step.id}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "flex-start",
              gap: token("space.100"),
              cursor: "pointer",
            }}
            onClick={() => onStepClick(index)}
          >
            <div
              ref={(el) => { circleRefs.current[index] = el; }}
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: circleSize,
                height: circleSize,
                borderRadius: "50%",
                border: `2px solid ${
                  isActive
                    ? token("color.border.brand")
                    : isCompleted
                    ? token("color.border.brand")
                    : token("color.border")
                }`,
                backgroundColor: isCompleted
                  ? token("color.background.brand.bold")
                  : isActive
                  ? token("color.background.selected")
                  : token("elevation.surface"),
                color: isCompleted
                  ? token("color.text.inverse")
                  : isActive
                  ? token("color.text.brand")
                  : token("color.text.subtlest"),
                flexShrink: 0,
              }}
            >
              {isCompleted ? (
                <CheckMarkIcon label="" color={token("color.icon.inverse")} />
              ) : (
                <Text size="UNSAFE_small" weight="semibold">{index + 1}</Text>
              )}
            </div>

            <div style={{ paddingTop: token("space.025") }}>
              <Text
                size="medium"
                weight="semibold"
                color={isActive ? "color.text.brand" : "color.text"}
              >
                {step.title}
              </Text>
              <div style={{ lineHeight: 1.2 }}>
                <Text size="UNSAFE_small" color="color.text.subtlest">
                  {step.description}
                </Text>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LabelText({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <div style={{ marginBottom: token("space.050") }}>
      <Text size="small" weight="semibold" color="color.text.subtle">
        {children}
        {required && (
          <span style={{ color: token("color.text.danger") }}> *</span>
        )}
      </Text>
    </div>
  );
}

function CycleDetailsStep({
  formData,
  updateField,
}: {
  formData: { name: string; type: string; startDate: string; endDate: string; effectiveDate: string; description: string };
  updateField: (field: string, value: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
          <SettingsIcon label="" color={token("color.icon.brand")} />
          <Heading size="medium">Configure Cycle</Heading>
        </div>
        <Text size="small" color="color.text.subtlest">Define the basic settings for your compensation cycle</Text>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
        <div>
          <LabelText>Duplicate Existing Cycle (Optional)</LabelText>
          <Select
            options={duplicateOptions}
            placeholder="Select a cycle to duplicate settings from..."
            defaultValue={duplicateOptions[0]}
          />
          <div style={{ marginTop: token("space.050") }}>
            <Text size="UNSAFE_small" color="color.text.subtlest">
              Copy settings from a previous cycle to speed up configuration
            </Text>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: token("space.300") }}>
          <div>
            <LabelText required>Cycle Name</LabelText>
            <Textfield
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateField("name", e.target.value)
              }
              placeholder="e.g., 2026 Annual Merit"
            />
          </div>
          <div>
            <LabelText required>Cycle Type</LabelText>
            <Select
              options={typeOptions}
              value={typeOptions.find((o) => o.value === formData.type)}
              onChange={(opt) => opt && updateField("type", opt.value)}
            />
          </div>
          {formData.type === "other" && (
            <div>
              <LabelText required>Specify Type</LabelText>
              <Textfield
                placeholder="Enter custom cycle type"
                value={formData.customType}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateField("customType", e.target.value)
                }
              />
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: token("space.300") }}>
          <div>
            <LabelText required>Start Date</LabelText>
            <Textfield
              type="date"
              value={formData.startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateField("startDate", e.target.value)
              }
            />
          </div>
          <div>
            <LabelText required>End Date</LabelText>
            <Textfield
              type="date"
              value={formData.endDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateField("endDate", e.target.value)
              }
            />
          </div>
          <div>
            <LabelText required>Effective Date</LabelText>
            <Textfield
              type="date"
              value={formData.effectiveDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateField("effectiveDate", e.target.value)
              }
            />
          </div>
        </div>

        <div>
          <LabelText>Description</LabelText>
          <TextArea
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateField("description", e.target.value)
            }
            placeholder="Describe the cycle purpose and scope..."
            minimumRows={5}
          />
          <div style={{ marginTop: token("space.050") }}>
            <Text size="UNSAFE_small" color="color.text.subtlest">
              Provide details about this compensation cycle's objectives and scope
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}


function FieldMappingTable({ fields }: { fields: typeof workdayFields }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: `2px solid ${token("color.border")}` }}>
          {["Field", "Column Name", "Description"].map((h) => (
            <th
              key={h}
              style={{
                padding: `${token("space.100")} ${token("space.200")}`,
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              <Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">{h}</Text>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {fields.map((row, i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
            <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                <Text size="small" weight="semibold">{row.field}</Text>
                {"isUpdated" in row && row.isUpdated && (
                  <Lozenge appearance="inprogress">Updated</Lozenge>
                )}
              </div>
            </td>
            <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
              <Text size="UNSAFE_small" color="color.text.subtlest">
                <code
                  style={{
                    backgroundColor: token("color.background.neutral"),
                    padding: `${token("space.025")} ${token("space.075")}`,
                    borderRadius: "6px",
                    fontFamily: "monospace",
                  }}
                >
                  {row.column}
                </code>
              </Text>
            </td>
            <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
              <Text size="small" color="color.text.subtlest">{row.desc}</Text>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function EmployeeDataGridStep() {
  const levelAppearance = (level: string): "inprogress" | "success" | "moved" => {
    if (level.startsWith("P")) return "inprogress";
    if (level.startsWith("M")) return "success";
    return "moved";
  };

  const ratingAppearance = (rating: string): "success" | "inprogress" | "removed" | "moved" | "default" => {
    if (rating === "Greatly Exceeded") return "success";
    if (rating === "Exceeded") return "inprogress";
    if (rating === "Met") return "default";
    if (rating === "Met Some") return "moved";
    return "removed";
  };

  const colHeader = (label: string, source: string, sourceColor: "color.text.information" | "color.text.success") => (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.025") }}>
      <Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">{label}</Text>
      <Text size="UNSAFE_small" color={sourceColor}>{source}</Text>
    </div>
  );

  const head = {
    cells: [
      { key: "id", content: colHeader("Employee ID", "Workday", "color.text.information") },
      { key: "firstName", content: colHeader("First Name", "Workday", "color.text.information") },
      { key: "lastName", content: colHeader("Last Name", "Workday", "color.text.information") },
      { key: "title", content: colHeader("Job Title", "Workday", "color.text.information") },
      { key: "level", content: colHeader("Level", "Workday", "color.text.information") },
      { key: "dept", content: colHeader("Job Family", "Workday", "color.text.information") },
      { key: "location", content: colHeader("Location", "Workday", "color.text.information") },
      { key: "rating", content: colHeader("Performance Rating", "Workday", "color.text.information") },
      { key: "salary", content: colHeader("Base Salary", "Workday", "color.text.information") },
      { key: "commission", content: colHeader("Commission %", "Workday", "color.text.information") },
      { key: "bonus", content: colHeader("Bonus %", "Workday", "color.text.information") },
      { key: "equity", content: colHeader("Current Equity $", "Shareworks", "color.text.success") },
    ],
  };

  const rows = employeeData.map((emp, i) => ({
    key: `row-${i}`,
    cells: [
      { key: "id", content: <Text size="UNSAFE_small"><code style={{ fontFamily: "monospace" }}>{emp.id}</code></Text> },
      { key: "firstName", content: <Text size="small" weight="medium">{emp.firstName}</Text> },
      { key: "lastName", content: <Text size="small" weight="medium">{emp.lastName}</Text> },
      { key: "title", content: <Text size="small" color="color.text.subtle">{emp.title}</Text> },
      { key: "level", content: <Lozenge appearance={levelAppearance(emp.level)}>{emp.level}</Lozenge> },
      { key: "dept", content: <Text size="small" color="color.text.subtle">{emp.dept}</Text> },
      { key: "location", content: <Text size="small" color="color.text.subtle">{emp.location}</Text> },
      { key: "rating", content: <Lozenge appearance={ratingAppearance(emp.rating)}>{emp.rating}</Lozenge> },
      { key: "salary", content: <Text size="small">${emp.salary.toLocaleString()}</Text> },
      { key: "commission", content: <Text size="small" color={emp.commission ? "color.text" : "color.text.disabled"}>{emp.commission ? `${emp.commission.toFixed(1)}%` : "—"}</Text> },
      { key: "bonus", content: <Text size="small">{emp.bonus.toFixed(1)}%</Text> },
      { key: "equity", content: <Text size="small" color={emp.equity ? "color.text" : "color.text.disabled"}>{emp.equity ? `$${emp.equity.toLocaleString()}` : "—"}</Text> },
    ],
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
          <PersonIcon label="" color={token("color.icon.brand")} />
          <Heading size="medium">Employee Data</Heading>
        </div>
        <Text size="small" color="color.text.subtlest">
          Eligible employees based on active eligibility rules — export to CSV for review
        </Text>
        <div style={{ display: "flex", gap: token("space.100"), marginTop: token("space.150") }}>
          <Lozenge appearance="inprogress">Workday</Lozenge>
          <Lozenge appearance="success">Shareworks</Lozenge>
          <Text size="small" color="color.text.subtlest">52 eligible employees · 12 columns</Text>
        </div>
      </div>

      <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto", padding: `0 ${token("space.200")}` }}>
          <div style={{ minWidth: 1200 }}>
            <DynamicTable
              head={head}
              rows={rows}
              isFixedSize
              defaultSortKey="id"
              defaultSortOrder="ASC"
            />
          </div>
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
            Showing <Text size="small" weight="bold">1-12</Text> of <Text size="small" weight="bold">52</Text> eligible employees
          </Text>
          <div style={{ display: "flex", gap: token("space.100") }}>
            <Button appearance="subtle" spacing="compact" iconBefore={DownloadIcon}>
              Export
            </Button>
            <Button appearance="subtle" spacing="compact" isDisabled iconBefore={ChevronLeftIcon}>
              Previous
            </Button>
            <Button appearance="subtle" spacing="compact" iconAfter={ChevronRightIcon}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EligibilityRulesStep() {
  const [workdayExpanded, setWorkdayExpanded] = useState(true);

  const manualExclusions = [
    { name: "Rachel Kim", id: "EMP-00045", dept: "Engineering", reason: "On extended leave" },
    { name: "Tom Nguyen", id: "EMP-00078", dept: "Sales", reason: "Transferring to new entity" },
    { name: "Priya Sharma", id: "EMP-00112", dept: "Finance", reason: "Pending termination" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
            <FilterIcon label="" color={token("color.icon.brand")} />
            <Heading size="medium">Eligibility Rules</Heading>
          </div>
          <Text size="small" color="color.text.subtlest">Define data sources, exclusion lists, and rules to determine which employees are eligible for this cycle</Text>
        </div>
      </div>

      <div style={{ ...cardStyle, padding: `${token("space.200")} ${token("space.400")}` }}>
        <div
          onClick={() => setWorkdayExpanded(!workdayExpanded)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            marginBottom: workdayExpanded ? token("space.200") : 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
            <PageIcon label="" color={token("color.icon.brand")} />
            <Text size="medium" weight="bold">Workday Data Source</Text>
            <Lozenge appearance="success">Connected</Lozenge>
          </div>
          {workdayExpanded ? (
            <ChevronUpIcon label="" color={token("color.icon.subtle")} />
          ) : (
            <ChevronDownIcon label="" color={token("color.icon.subtle")} />
          )}
        </div>
        {workdayExpanded && (
          <div style={{ display: "flex", flexDirection: "column", gap: token("space.200") }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <Text size="small" weight="bold">Workday Field Mapping</Text>
                <div>
                  <Text size="UNSAFE_small" color="color.text.subtlest">
                    {workdayFields.length} fields — Employee and compensation data from Workday
                  </Text>
                </div>
              </div>
              <Lozenge appearance="inprogress">Workday</Lozenge>
            </div>
            <FieldMappingTable fields={workdayFields} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Text size="UNSAFE_small" color="color.text.subtlest">Last synced: 02/20/26 10:34 PM PST</Text>
              <Button appearance="primary">Sync now</Button>
            </div>
          </div>
        )}
      </div>

      <div style={{ ...cardStyle, padding: `${token("space.300")} ${token("space.400")}` }}>
        <Heading size="xsmall">Exclude Employee IDs</Heading>
        <div style={{ marginTop: token("space.100") }}>
          <Text size="UNSAFE_small" color="color.text.subtlest">
            Upload a CSV file containing employee IDs to manually exclude from this cycle
          </Text>
        </div>
        <div
          style={{
            marginTop: token("space.200"),
            border: `2px dashed ${token("color.border")}`,
            borderRadius: "6px",
            padding: token("space.400"),
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: token("space.150"),
            cursor: "pointer",
          }}
        >
          <UploadIcon label="" color={token("color.icon.subtle")} />
          <Text size="small" weight="semibold">Upload exclusion list</Text>
          <Text size="UNSAFE_small" color="color.text.subtlest">CSV with a single column: Employee ID</Text>
          <Button appearance="primary" iconBefore={UploadIcon}>Choose File</Button>
        </div>

        {manualExclusions.length > 0 && (
          <div style={{ marginTop: token("space.300") }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.150") }}>
              <Text size="small" weight="bold">{manualExclusions.length} manually excluded</Text>
              <Button appearance="subtle" spacing="compact" iconBefore={DownloadIcon}>Export list</Button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${token("color.border")}` }}>
                  {["Employee", "Employee ID", "Department", "Reason"].map((h) => (
                    <th key={h} style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "left", textTransform: "uppercase" }}>
                      <Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">{h}</Text>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {manualExclusions.map((emp, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                    <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                      <Text size="small" weight="semibold">{emp.name}</Text>
                    </td>
                    <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                      <Text size="UNSAFE_small"><code style={{ fontFamily: "monospace" }}>{emp.id}</code></Text>
                    </td>
                    <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                      <Text size="small" color="color.text.subtle">{emp.dept}</Text>
                    </td>
                    <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                      <Text size="small" color="color.text.subtlest">{emp.reason}</Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ ...cardStyle, padding: `${token("space.300")} ${token("space.400")}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Heading size="xsmall">Column-Based Rules</Heading>
          <Button appearance="primary" iconBefore={AddIcon}>New Rule</Button>
        </div>

        <div style={{ marginTop: token("space.150") }}>
          <SectionMessage appearance="information">
            <Text size="small">
              Rules use AND logic — employees must match all active rules to be eligible. Employee type is used for overall APEX and comp eligibility.
            </Text>
          </SectionMessage>
        </div>

        <div style={{ marginTop: token("space.200"), display: "flex", flexDirection: "column", gap: token("space.200") }}>
          {[
            { name: "Start Date Cutoff", field: "Start Date", operator: "IS BEFORE", values: "March 31, 2026", count: "48 matched" },
            { name: "Employment Type", field: "Employee Type", operator: "IS ONE OF", values: "Regular, Definite", count: "45 matched" },
            { name: "Department Filter", field: "Department", operator: "IS NOT ONE OF", values: "Intern Programs", count: "51 matched" },
            { name: "Reporting Line", field: "Report To", operator: "IS NOT", values: "Vacant", count: "50 matched" },
            { name: "Country Scope", field: "Country", operator: "IS ONE OF", values: "United States, Canada, United Kingdom", count: "42 matched" },
            { name: "Level Minimum", field: "Level", operator: "GREATER THAN OR EQUAL", values: "P30", count: "49 matched" },
            { name: "Cost Center Active", field: "Cost Center", operator: "IS NOT", values: "CLOSED", count: "52 matched" },
          ].map((rule, i) => (
            <div
              key={i}
              style={{
                border: `1px solid ${token("color.border")}`,
                borderRadius: "6px",
                padding: token("space.200"),
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.100") }}>
                <Text size="small" weight="bold">{rule.name}</Text>
                <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
                  <Lozenge appearance="success">Active</Lozenge>
                  <IconButton appearance="subtle" spacing="compact" icon={EditIcon} label="Edit" />
                  <IconButton appearance="subtle" spacing="compact" icon={DeleteIcon} label="Delete" />
                </div>
              </div>
              <div style={{ display: "flex", gap: token("space.200"), alignItems: "center", flexWrap: "wrap" }}>
                <Text size="UNSAFE_small" color="color.text.subtlest">{rule.field}</Text>
                <Lozenge>{rule.operator}</Lozenge>
                <Text size="UNSAFE_small" weight="semibold">{rule.values}</Text>
                <Text size="UNSAFE_small" color="color.text.subtlest">· {rule.count}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...cardStyle, padding: `${token("space.300")} ${token("space.400")}` }}>
        <Heading size="xsmall">New Eligibility Rule</Heading>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: token("space.300"), marginTop: token("space.200") }}>
          <div>
            <LabelText required>Rule Name</LabelText>
            <Textfield placeholder="e.g., Full-time employees only" />
          </div>
          <div>
            <LabelText required>Field</LabelText>
            <Select
              options={[
                { label: "Start Date", value: "startDate" },
                { label: "Employee Type", value: "empType" },
                { label: "Department", value: "department" },
                { label: "Report To", value: "reportTo" },
                { label: "Country", value: "country" },
                { label: "Level", value: "level" },
                { label: "Cost Center", value: "costCenter" },
              ]}
              placeholder="Select field..."
            />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: token("space.300"), marginTop: token("space.300") }}>
          <div>
            <LabelText required>Operator</LabelText>
            <Select
              options={[
                { label: "IS ONE OF", value: "isOneOf" },
                { label: "IS NOT ONE OF", value: "isNotOneOf" },
                { label: "EQUALS", value: "equals" },
                { label: "IS NOT", value: "isNot" },
                { label: "GREATER THAN", value: "greaterThan" },
                { label: "GREATER THAN OR EQUAL", value: "gte" },
                { label: "LESS THAN", value: "lessThan" },
                { label: "IS BEFORE", value: "isBefore" },
                { label: "IS AFTER", value: "isAfter" },
              ]}
              placeholder="Select operator..."
            />
          </div>
          <div>
            <LabelText required>Value</LabelText>
            <Textfield placeholder="Value" />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: token("space.300"), paddingTop: token("space.200"), borderTop: `1px solid ${token("color.border")}` }}>
          <Button appearance="subtle" iconBefore={AddIcon}>Add AND Condition</Button>
          <div style={{ display: "flex", gap: token("space.100") }}>
            <Button appearance="subtle">Cancel</Button>
            <Button appearance="primary">Save Rule</Button>
          </div>
        </div>
      </div>

      <div style={{ ...cardStyle, padding: `${token("space.300")} ${token("space.400")}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.200") }}>
          <div>
            <Heading size="xsmall">Excluded Employees</Heading>
            <Text size="UNSAFE_small" color="color.text.subtlest">{excludedEmployees.length} employees excluded by eligibility rules</Text>
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${token("color.border")}` }}>
              {["Employee", "Department", "Start Date", "Type", "Reason", ""].map((h) => (
                <th
                  key={h || "action"}
                  style={{
                    padding: `${token("space.100")} ${token("space.200")}`,
                    textAlign: "left",
                    textTransform: "uppercase",
                    width: h === "" ? "100px" : undefined,
                  }}
                >
                  <Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">{h}</Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excludedEmployees.map((emp, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Text size="small" weight="semibold">{emp.name}</Text>
                  <div>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{emp.id}</Text>
                  </div>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Text size="small">{emp.dept}</Text>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Text size="small" color="color.text.subtlest">{emp.startDate}</Text>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Lozenge
                    appearance={
                      emp.empType === "Regular" || emp.empType === "Definite"
                        ? "success"
                        : "removed"
                    }
                  >
                    {emp.empType}
                  </Lozenge>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <InlineMessage appearance="error" title={emp.reason}>
                    <Text size="UNSAFE_small" color="color.text.subtlest">{emp.detail}</Text>
                  </InlineMessage>
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Button appearance="default" spacing="compact">
                    Override
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function SalaryBandsStep() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
          <SpreadsheetIcon label="" color={token("color.icon.brand")} />
          <Heading size="medium">Salary Bands</Heading>
        </div>
        <Text size="small" color="color.text.subtlest">
          Upload salary band data via CSV or update bands individually.
        </Text>
      </div>

      <div style={{ ...cardStyle, padding: `${token("space.300")} ${token("space.400")}` }}>
        <div
          style={{
            border: `2px dashed ${token("color.border")}`,
            borderRadius: "6px",
            padding: token("space.500"),
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: token("space.150"),
          }}
        >
          <UploadIcon label="" color={token("color.icon.subtle")} />
          <Text size="small" weight="semibold">Upload CSV file</Text>
          <Text size="UNSAFE_small" color="color.text.subtlest">Required: Level, SRP, Range Max, Equity Max</Text>
          <Button appearance="primary">Select File</Button>
        </div>
      </div>

      <div style={{ ...cardStyle, padding: `${token("space.300")} ${token("space.400")}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.200") }}>
          <Heading size="xsmall">Current Bands ({salaryBands.length})</Heading>
          <div style={{ display: "flex", gap: token("space.100") }}>
            <Button appearance="default" iconBefore={DownloadIcon} spacing="compact">
              Export
            </Button>
            <Button appearance="primary" iconBefore={AddIcon} spacing="compact">
              Add
            </Button>
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${token("color.border")}`, backgroundColor: token("elevation.surface.sunken") }}>
              {["Level", "SRP", "Range Max", "Equity Max", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: `${token("space.100")} ${token("space.200")}`,
                    textAlign: h === "Actions" ? "right" : "left",
                  }}
                >
                  <Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">{h}</Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {salaryBands.map((band, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Textfield defaultValue={band.level} isCompact />
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Textfield defaultValue={band.srp} isCompact />
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Textfield defaultValue={band.rangeMax} isCompact />
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                  <Textfield defaultValue={band.equityMax} isCompact />
                </td>
                <td style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "right" }}>
                  <IconButton icon={DeleteIcon} label="Delete" appearance="subtle" spacing="compact" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


const compUploadErrors = [
  { row: 15, field: "email", value: "john.smith@", error: "Invalid email format" },
  { row: 23, field: "meritIncrease", value: "abc", error: "Expected a numeric value" },
  { row: 31, field: "email", value: "unknown@company.com", error: "Employee not found in system" },
  { row: 45, field: "proposedSalary", value: "-50000", error: "Value must be positive" },
];

const compUploadData = [
  { email: "sarah.chen@company.com", id: "EMP-00001", meritPct: "4.5%", promoIncrease: "—", proposedSalary: "$188,100", equityGrant: "$12,000", oneTimeBonus: "—" },
  { email: "michael.johnson@company.com", id: "EMP-00002", meritPct: "3.8%", promoIncrease: "8.0%", proposedSalary: "$245,960", equityGrant: "$25,000", oneTimeBonus: "$15,000" },
  { email: "lisa.patel@company.com", id: "EMP-00003", meritPct: "3.0%", promoIncrease: "—", proposedSalary: "$180,250", equityGrant: "$10,000", oneTimeBonus: "—" },
  { email: "james.anderson@company.com", id: "EMP-00004", meritPct: "5.2%", promoIncrease: "—", proposedSalary: "$163,060", equityGrant: "$8,000", oneTimeBonus: "$5,000" },
  { email: "emily.williams@company.com", id: "EMP-00005", meritPct: "3.5%", promoIncrease: "—", proposedSalary: "$170,775", equityGrant: "$9,000", oneTimeBonus: "—" },
  { email: "david.martinez@company.com", id: "EMP-00006", meritPct: "6.0%", promoIncrease: "10.0%", proposedSalary: "$220,400", equityGrant: "$18,000", oneTimeBonus: "$10,000" },
];

function UploadCompensationDataStep() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
          <UploadIcon label="" color={token("color.icon.brand")} />
          <Heading size="medium">Upload Compensation Data</Heading>
        </div>
        <Text size="small" color="color.text.subtlest">
          Upload a CSV file with compensation decisions. Employee email is used as the unique identifier to match records.
        </Text>
      </div>

      <SectionMessage appearance="information">
        <Text size="small">
          Your CSV must include an <Text size="small" weight="bold">email</Text> column as the unique identifier. Supported compensation columns: Merit Increase %, Promotion Increase %, Proposed Salary, Equity Grant, One-Time Bonus.
        </Text>
      </SectionMessage>

      {!uploaded ? (
        <div style={{ ...cardStyle, padding: `${token("space.300")} ${token("space.400")}` }}>
          <div
            onClick={() => setUploaded(true)}
            style={{
              border: `2px dashed ${token("color.border")}`,
              borderRadius: "6px",
              padding: token("space.500"),
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: token("space.150"),
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: token("color.background.selected"),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UploadIcon label="" color={token("color.icon.brand")} />
            </div>
            <Heading size="small">Upload Compensation CSV</Heading>
            <div style={{ maxWidth: 400 }}>
              <Text size="small" color="color.text.subtlest">
                Drag and drop your file here, or click to browse
              </Text>
            </div>
            <Button appearance="primary" iconBefore={UploadIcon}>Choose File</Button>
            <Text size="UNSAFE_small" color="color.text.subtlest">
              Supported format: .csv (Max size: 50MB)
            </Text>
          </div>

          <div style={{ marginTop: token("space.300") }}>
            <Button appearance="subtle" iconBefore={DownloadIcon}>Download CSV Template</Button>
          </div>
        </div>
      ) : (
        <>
          <div style={{ ...cardStyle, padding: `${token("space.300")} ${token("space.400")}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: token("space.150") }}>
                <CheckCircleIcon label="" color={token("color.icon.success")} />
                <div>
                  <Text size="small" weight="bold">compensation_decisions_2026.csv</Text>
                  <div>
                    <Text size="UNSAFE_small" color="color.text.subtlest">52 rows · 6 columns · Uploaded Mar 25, 2026</Text>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: token("space.100") }}>
                <Button appearance="subtle" spacing="compact">Replace File</Button>
                <Button appearance="subtle" spacing="compact" iconBefore={DeleteIcon}>Remove</Button>
              </div>
            </div>
          </div>

          {compUploadErrors.length > 0 && (
            <div style={{ ...cardStyle, padding: `${token("space.300")} ${token("space.400")}`, borderColor: token("color.border.danger") }}>
              <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), marginBottom: token("space.200") }}>
                <AlertIcon label="" color={token("color.icon.danger")} />
                <Heading size="xsmall">{compUploadErrors.length} Validation Errors</Heading>
              </div>
              <Text size="UNSAFE_small" color="color.text.subtlest">
                The following rows have errors that need to be fixed. You can correct the CSV and re-upload, or proceed with valid rows only.
              </Text>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: token("space.200") }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${token("color.border")}` }}>
                    {["Row", "Field", "Value", "Error"].map((h) => (
                      <th key={h} style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "left", textTransform: "uppercase" }}>
                        <Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">{h}</Text>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compUploadErrors.map((err, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                      <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                        <Text size="small">{err.row}</Text>
                      </td>
                      <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                        <code style={{ fontFamily: "monospace", backgroundColor: token("color.background.neutral"), padding: `${token("space.025")} ${token("space.075")}`, borderRadius: "6px" }}>
                          <Text size="UNSAFE_small">{err.field}</Text>
                        </code>
                      </td>
                      <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                        <Text size="small" color="color.text.danger">{err.value}</Text>
                      </td>
                      <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                        <Text size="small" color="color.text.subtlest">{err.error}</Text>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: "flex", gap: token("space.100"), marginTop: token("space.200") }}>
                <Button appearance="warning" spacing="compact">Proceed with valid rows only</Button>
                <Button appearance="subtle" spacing="compact">Re-upload corrected CSV</Button>
              </div>
            </div>
          )}

          <div style={{ ...cardStyle, padding: `${token("space.300")} ${token("space.400")}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.200") }}>
              <Heading size="xsmall">Data Preview</Heading>
              <Text size="UNSAFE_small" color="color.text.subtlest">Showing first {compUploadData.length} of 52 rows</Text>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${token("color.border")}` }}>
                    {["Email (Key)", "Employee ID", "Merit %", "Promo Increase", "Proposed Salary", "Equity Grant", "One-Time Bonus"].map((h) => (
                      <th key={h} style={{ padding: `${token("space.100")} ${token("space.200")}`, textAlign: "left", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                        <Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">{h}</Text>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compUploadData.map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${token("color.border")}` }}>
                      <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                        <Text size="UNSAFE_small" weight="medium">{row.email}</Text>
                      </td>
                      <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                        <Text size="UNSAFE_small"><code style={{ fontFamily: "monospace" }}>{row.id}</code></Text>
                      </td>
                      <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                        <Text size="small">{row.meritPct}</Text>
                      </td>
                      <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                        <Text size="small" color={row.promoIncrease === "—" ? "color.text.disabled" : "color.text"}>{row.promoIncrease}</Text>
                      </td>
                      <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                        <Text size="small">{row.proposedSalary}</Text>
                      </td>
                      <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                        <Text size="small">{row.equityGrant}</Text>
                      </td>
                      <td style={{ padding: `${token("space.100")} ${token("space.200")}` }}>
                        <Text size="small" color={row.oneTimeBonus === "—" ? "color.text.disabled" : "color.text"}>{row.oneTimeBonus}</Text>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function CompDataGridStep() {
  const levelAppearance = (level: string): "inprogress" | "success" | "moved" => {
    if (level.startsWith("P")) return "inprogress";
    if (level.startsWith("M")) return "success";
    return "moved";
  };

  const ratingAppearance = (rating: string): "success" | "inprogress" | "removed" | "moved" | "default" => {
    if (rating === "Greatly Exceeded") return "success";
    if (rating === "Exceeded") return "inprogress";
    if (rating === "Met") return "default";
    if (rating === "Met Some") return "moved";
    return "removed";
  };

  const colHeader = (label: string, source: string, sourceColor: "color.text.information" | "color.text.success" | "color.text.warning") => (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.025") }}>
      <Text size="UNSAFE_small" weight="semibold" color="color.text.subtlest">{label}</Text>
      <Text size="UNSAFE_small" color={sourceColor}>{source}</Text>
    </div>
  );

  const head = {
    cells: [
      { key: "id", content: colHeader("Employee ID", "Workday", "color.text.information") },
      { key: "firstName", content: colHeader("First Name", "Workday", "color.text.information") },
      { key: "lastName", content: colHeader("Last Name", "Workday", "color.text.information") },
      { key: "title", content: colHeader("Job Title", "Workday", "color.text.information") },
      { key: "level", content: colHeader("Level", "Workday", "color.text.information") },
      { key: "salary", content: colHeader("Base Salary", "Workday", "color.text.information") },
      { key: "rating", content: colHeader("Rating", "Workday", "color.text.information") },
      { key: "meritPct", content: colHeader("Merit %", "CSV Upload", "color.text.warning") },
      { key: "proposedSalary", content: colHeader("Proposed Salary", "CSV Upload", "color.text.warning") },
      { key: "equityGrant", content: colHeader("Equity Grant", "CSV Upload", "color.text.warning") },
      { key: "oneTimeBonus", content: colHeader("One-Time Bonus", "CSV Upload", "color.text.warning") },
    ],
  };

  const mergedData = employeeData.slice(0, 6).map((emp, idx) => ({
    ...emp,
    meritPct: compUploadData[idx]?.meritPct || "—",
    proposedSalary: compUploadData[idx]?.proposedSalary || "—",
    equityGrant: compUploadData[idx]?.equityGrant || "—",
    oneTimeBonus: compUploadData[idx]?.oneTimeBonus || "—",
  }));

  const rows = mergedData.map((emp, i) => ({
    key: `row-${i}`,
    cells: [
      { key: "id", content: <Text size="UNSAFE_small"><code style={{ fontFamily: "monospace" }}>{emp.id}</code></Text> },
      { key: "firstName", content: <Text size="small" weight="medium">{emp.firstName}</Text> },
      { key: "lastName", content: <Text size="small" weight="medium">{emp.lastName}</Text> },
      { key: "title", content: <Text size="small" color="color.text.subtle">{emp.title}</Text> },
      { key: "level", content: <Lozenge appearance={levelAppearance(emp.level)}>{emp.level}</Lozenge> },
      { key: "salary", content: <Text size="small">${emp.salary.toLocaleString()}</Text> },
      { key: "rating", content: <Lozenge appearance={ratingAppearance(emp.rating)}>{emp.rating}</Lozenge> },
      { key: "meritPct", content: <Text size="small" weight="semibold" color="color.text.warning">{emp.meritPct}</Text> },
      { key: "proposedSalary", content: <Text size="small" weight="semibold" color="color.text.warning">{emp.proposedSalary}</Text> },
      { key: "equityGrant", content: <Text size="small" color={emp.equityGrant === "—" ? "color.text.disabled" : "color.text.warning"}>{emp.equityGrant}</Text> },
      { key: "oneTimeBonus", content: <Text size="small" color={emp.oneTimeBonus === "—" ? "color.text.disabled" : "color.text.warning"}>{emp.oneTimeBonus}</Text> },
    ],
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
          <TableIcon label="" color={token("color.icon.brand")} />
          <Heading size="medium">Employee + Compensation Data</Heading>
        </div>
        <Text size="small" color="color.text.subtlest">
          Merged view of Workday employee data and uploaded compensation decisions
        </Text>
        <div style={{ display: "flex", gap: token("space.100"), marginTop: token("space.150") }}>
          <Lozenge appearance="inprogress">Workday</Lozenge>
          <Lozenge appearance="moved">CSV Upload</Lozenge>
          <Text size="small" color="color.text.subtlest">52 employees · 11 columns</Text>
        </div>
      </div>

      <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto", padding: `0 ${token("space.200")}` }}>
          <div style={{ minWidth: 1200 }}>
            <DynamicTable
              head={head}
              rows={rows}
              isFixedSize
              defaultSortKey="id"
              defaultSortOrder="ASC"
            />
          </div>
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
            Showing <Text size="small" weight="bold">1-6</Text> of <Text size="small" weight="bold">52</Text> employees
          </Text>
          <div style={{ display: "flex", gap: token("space.100") }}>
            <Button appearance="subtle" spacing="compact" iconBefore={DownloadIcon}>
              Export
            </Button>
            <Button appearance="subtle" spacing="compact" isDisabled iconBefore={ChevronLeftIcon}>
              Previous
            </Button>
            <Button appearance="subtle" spacing="compact" iconAfter={ChevronRightIcon}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RewardStatementsStep({
  selectedTemplate,
  setSelectedTemplate,
  includePerformance,
  setIncludePerformance,
  includeComparison,
  setIncludeComparison,
  customMessage,
  setCustomMessage,
}: {
  selectedTemplate: string;
  setSelectedTemplate: (v: string) => void;
  includePerformance: boolean;
  setIncludePerformance: (v: boolean) => void;
  includeComparison: boolean;
  setIncludeComparison: (v: boolean) => void;
  customMessage: string;
  setCustomMessage: (v: string) => void;
}) {
  const templateOptions = [
    { label: "Standard Template", value: "standard" },
    { label: "Executive Template", value: "executive" },
    { label: "Minimal Template", value: "minimal" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: token("space.300") }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
          <EmailIcon label="" color={token("color.icon.brand")} />
          <Heading size="medium">Reward Statements</Heading>
        </div>
        <Text size="small" color="color.text.subtlest">Configure the reward statement template and content for employee notifications</Text>
      </div>

      <div style={{ ...cardStyle, padding: `${token("space.300")} ${token("space.400")}` }}>
        <Heading size="xsmall">Template Selection</Heading>
        <div style={{ marginTop: token("space.200") }}>
          <LabelText>Statement Template</LabelText>
          <Select
            options={templateOptions}
            value={templateOptions.find((o) => o.value === selectedTemplate)}
            onChange={(opt) => opt && setSelectedTemplate(opt.value)}
          />
        </div>
      </div>

      <div style={{ ...cardStyle, padding: `${token("space.300")} ${token("space.400")}` }}>
        <Heading size="xsmall">Content Options</Heading>
        <div style={{ display: "flex", flexDirection: "column", gap: token("space.200"), marginTop: token("space.200") }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <Text size="small" weight="semibold">Include Performance Summary</Text>
              <div>
                <Text size="UNSAFE_small" color="color.text.subtlest">Show performance rating and summary in the reward statement</Text>
              </div>
            </div>
            <Toggle
              isChecked={includePerformance}
              onChange={() => setIncludePerformance(!includePerformance)}
              label="Include performance"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <Text size="small" weight="semibold">Include Year-over-Year Comparison</Text>
              <div>
                <Text size="UNSAFE_small" color="color.text.subtlest">Show comparison with previous compensation</Text>
              </div>
            </div>
            <Toggle
              isChecked={includeComparison}
              onChange={() => setIncludeComparison(!includeComparison)}
              label="Include comparison"
            />
          </div>
        </div>
      </div>

      <div style={{ ...cardStyle, padding: `${token("space.300")} ${token("space.400")}` }}>
        <Heading size="xsmall">Custom Message</Heading>
        <div style={{ marginTop: token("space.200") }}>
          <TextArea
            value={customMessage}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomMessage(e.target.value)}
            placeholder="Add a personalized message to include in all reward statements..."
            minimumRows={4}
          />
        </div>
      </div>

      <div style={{ ...cardStyle, padding: `${token("space.300")} ${token("space.400")}` }}>
        <Heading size="xsmall">Preview</Heading>
        <div
          style={{
            marginTop: token("space.200"),
            border: `1px solid ${token("color.border")}`,
            borderRadius: "6px",
            padding: token("space.300"),
            backgroundColor: token("elevation.surface.sunken"),
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: token("space.100"), marginBottom: token("space.200") }}>
            <EmailIcon label="" color={token("color.icon.brand")} />
            <Heading size="xsmall">Your Compensation Update</Heading>
          </div>
          <Text size="small" color="color.text.subtlest">
            Dear [Employee Name],
          </Text>
          <div style={{ marginTop: token("space.150") }}>
            <Text size="small" color="color.text.subtlest">
              We are pleased to inform you of your compensation adjustment effective [Effective Date]. Your new base salary will be [New Salary], reflecting a [Merit %] merit increase.
            </Text>
          </div>
          {includePerformance && (
            <div style={{ marginTop: token("space.150") }}>
              <Text size="small" color="color.text.subtlest">
                This adjustment recognizes your [Performance Rating] performance rating and contributions to the team.
              </Text>
            </div>
          )}
          {customMessage && (
            <div style={{ marginTop: token("space.150") }}>
              <Text size="small" color="color.text.subtlest">
                {customMessage}
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
