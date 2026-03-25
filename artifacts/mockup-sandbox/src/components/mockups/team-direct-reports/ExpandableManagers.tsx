import { useState } from "react";
import { ChevronDown, ChevronRight, Search, SlidersHorizontal, ArrowUpDown, Users, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Employee {
  id: string;
  initials: string;
  firstName: string;
  lastName: string;
  jobLevel: string;
  jobFamily: string;
  zone: string;
  currentBaseSalary: number;
  srpPercent: string;
  currentEquity: string;
  rating: string;
  isManager?: boolean;
  managerId?: string;
}

const employees: Employee[] = [
  { id: "1", initials: "SJ", firstName: "Sarah", lastName: "Jenkins", jobLevel: "P40", jobFamily: "Design", zone: "Zone A", currentBaseSalary: 145000, srpPercent: "112%", currentEquity: "1,250 RSUs", rating: "Meets Expectations" },
  { id: "2", initials: "MC", firstName: "Michael", lastName: "Chen", jobLevel: "M50", jobFamily: "Engineering", zone: "Zone A", currentBaseSalary: 185000, srpPercent: "125%", currentEquity: "2,800 RSUs", rating: "Exceeds Expectations", isManager: true },
  { id: "3", initials: "JW", firstName: "Jessica", lastName: "Wu", jobLevel: "P30", jobFamily: "Engineering", zone: "Zone B", currentBaseSalary: 120000, srpPercent: "104%", currentEquity: "800 RSUs", rating: "Meets Expectations", managerId: "2" },
  { id: "4", initials: "DM", firstName: "David", lastName: "Miller", jobLevel: "M50", jobFamily: "Product", zone: "Zone A", currentBaseSalary: 195000, srpPercent: "138%", currentEquity: "4,200 RSUs", rating: "Greatly Exceeds", isManager: true },
  { id: "5", initials: "EW", firstName: "Emma", lastName: "Wilson", jobLevel: "P20", jobFamily: "Marketing", zone: "Zone C", currentBaseSalary: 75000, srpPercent: "95%", currentEquity: "400 RSUs", rating: "Meets Expectations", managerId: "4" },
  { id: "6", initials: "JR", firstName: "James", lastName: "Rodriguez", jobLevel: "P40", jobFamily: "Customer Success", zone: "Zone B", currentBaseSalary: 110000, srpPercent: "108%", currentEquity: "950 RSUs", rating: "Met Some", managerId: "2" },
  { id: "7", initials: "LC", firstName: "Lisa", lastName: "Chang", jobLevel: "P40", jobFamily: "Data Science", zone: "Zone A", currentBaseSalary: 135000, srpPercent: "118%", currentEquity: "1,600 RSUs", rating: "Exceeds Expectations" },
  { id: "8", initials: "RT", firstName: "Robert", lastName: "Taylor", jobLevel: "P30", jobFamily: "Engineering", zone: "Zone C", currentBaseSalary: 95000, srpPercent: "102%", currentEquity: "600 RSUs", rating: "Meets Expectations", managerId: "4" },
  { id: "9", initials: "AP", firstName: "Anika", lastName: "Patel", jobLevel: "P30", jobFamily: "Engineering", zone: "Zone A", currentBaseSalary: 128000, srpPercent: "110%", currentEquity: "900 RSUs", rating: "Exceeds Expectations", managerId: "2" },
  { id: "10", initials: "KN", firstName: "Kevin", lastName: "Nguyen", jobLevel: "P20", jobFamily: "Product", zone: "Zone B", currentBaseSalary: 98000, srpPercent: "100%", currentEquity: "500 RSUs", rating: "Meets Expectations", managerId: "4" },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value);

type LozengeAppearance = "success" | "inprogress" | "default" | "moved" | "removed" | "new";

const lozengeStyles: Record<LozengeAppearance, { bg: string; text: string }> = {
  success:    { bg: "#DFFCF0", text: "#216E4E" },
  inprogress: { bg: "#E9F2FF", text: "#0055CC" },
  default:    { bg: "#F1F2F4", text: "#44546F" },
  moved:      { bg: "#FFF7D6", text: "#7F5F01" },
  removed:    { bg: "#FFECEB", text: "#AE2E24" },
  new:        { bg: "#F3F0FF", text: "#6E5DC6" },
};

function Lozenge({ appearance = "default", children, isBold = false }: { appearance?: LozengeAppearance; children: React.ReactNode; isBold?: boolean }) {
  const style = lozengeStyles[appearance];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 6px",
        borderRadius: "3px",
        fontSize: "11px",
        fontWeight: isBold ? 700 : 600,
        lineHeight: "16px",
        textTransform: "uppercase" as const,
        maxWidth: 200,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap" as const,
        backgroundColor: isBold ? style.text : style.bg,
        color: isBold ? "#FFFFFF" : style.text,
      }}
    >
      {children}
    </span>
  );
}

function ratingAppearance(rating: string): LozengeAppearance {
  if (rating === "Greatly Exceeds") return "success";
  if (rating === "Exceeds Expectations") return "inprogress";
  if (rating === "Meets Expectations") return "default";
  if (rating === "Met Some") return "moved";
  return "removed";
}

function levelAppearance(level: string): LozengeAppearance {
  return level.startsWith("M") ? "success" : "inprogress";
}

function SrpIndicator({ value }: { value: string }) {
  const num = parseInt(value);
  const color = num < 100 ? "#AE2E24" : num >= 120 ? "#216E4E" : "#44546F";
  return <span style={{ fontSize: 14, fontWeight: 500, color }}>{value}</span>;
}

const headerStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#44546F",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  padding: "8px 12px",
  borderBottom: "2px solid #DFE1E6",
  backgroundColor: "#FAFBFC",
};

const cellStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#172B4D",
  padding: "10px 12px",
  borderBottom: "1px solid #EBECF0",
  verticalAlign: "middle",
};

const subtleCellStyle: React.CSSProperties = {
  ...cellStyle,
  color: "#626F86",
};

function EmployeeRow({ emp, indent = false }: { emp: Employee; indent?: boolean }) {
  return (
    <tr style={{ cursor: "default" }} className="hover:bg-[#F4F5F7] transition-colors">
      <td style={{ ...cellStyle, paddingLeft: indent ? 48 : 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar className="h-7 w-7 flex-shrink-0">
            <AvatarFallback className="text-[10px] font-semibold" style={{ backgroundColor: "#E9F2FF", color: "#0055CC" }}>{emp.initials}</AvatarFallback>
          </Avatar>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#172B4D" }}>{emp.firstName} {emp.lastName}</span>
        </div>
      </td>
      <td style={cellStyle}>
        <Lozenge appearance={levelAppearance(emp.jobLevel)}>{emp.jobLevel}</Lozenge>
      </td>
      <td style={subtleCellStyle}>{emp.jobFamily}</td>
      <td style={subtleCellStyle}>{emp.zone}</td>
      <td style={{ ...cellStyle, fontWeight: 600 }}>{formatCurrency(emp.currentBaseSalary)}</td>
      <td style={cellStyle}><SrpIndicator value={emp.srpPercent} /></td>
      <td style={subtleCellStyle}>{emp.currentEquity}</td>
      <td style={cellStyle}>
        <Lozenge appearance={ratingAppearance(emp.rating)}>{emp.rating}</Lozenge>
      </td>
      <td style={cellStyle}>
        <button style={{ padding: 4, borderRadius: 3, border: "none", background: "transparent", cursor: "pointer" }} className="hover:bg-[#EBECF0]">
          <MoreHorizontal className="w-4 h-4" style={{ color: "#626F86" }} />
        </button>
      </td>
    </tr>
  );
}

function ManagerGroup({ manager, reports }: { manager: Employee; reports: Employee[] }) {
  const [isOpen, setIsOpen] = useState(true);
  const totalSalary = reports.reduce((sum, e) => sum + e.currentBaseSalary, 0);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div style={{ border: "1px solid #DFE1E6", borderRadius: 6, overflow: "hidden", marginBottom: 12 }}>
        <CollapsibleTrigger asChild>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              backgroundColor: "#FAFBFC",
              cursor: "pointer",
              userSelect: "none",
            }}
            className="hover:bg-[#F4F5F7] transition-colors"
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ color: "#626F86", display: "flex" }}>
                {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs font-semibold" style={{ backgroundColor: "#F3F0FF", color: "#6E5DC6" }}>{manager.initials}</AvatarFallback>
              </Avatar>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#172B4D" }}>{manager.firstName} {manager.lastName}</span>
                <Lozenge appearance="new">{manager.jobLevel}</Lozenge>
                <span style={{ fontSize: 12, color: "#626F86" }}>{manager.jobFamily}</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#626F86" }}>
                <Users className="w-3.5 h-3.5" />
                <span>{reports.length} reports</span>
              </div>
              <div style={{ fontSize: 12, color: "#626F86" }}>
                Team salary: <span style={{ fontWeight: 600, color: "#44546F" }}>{formatCurrency(totalSalary)}</span>
              </div>
              <Lozenge appearance={ratingAppearance(manager.rating)}>{manager.rating}</Lozenge>
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {reports.map((emp) => (
                <EmployeeRow key={emp.id} emp={emp} indent />
              ))}
            </tbody>
          </table>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export function ExpandableManagers() {
  const directReports = employees.filter((e) => !e.managerId);
  const managers = employees.filter((e) => e.isManager);
  const standaloneReports = directReports.filter((e) => !e.isManager);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FFFFFF", padding: 32, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "#172B4D", margin: 0 }}>Team</h1>
          <p style={{ fontSize: 14, color: "#626F86", marginTop: 4, marginBottom: 0 }}>View and understand your team's compensation</p>
        </div>

        <div style={{ border: "1px solid #DFE1E6", borderRadius: 6, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#172B4D", marginBottom: 12 }}>Filter {employees.length} employees</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="relative" style={{ width: 176 }}>
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#626F86" }} />
              <Input placeholder="Search" className="pl-8 h-9 text-sm" style={{ borderColor: "#DFE1E6" }} />
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 h-9" style={{ borderColor: "#DFE1E6", color: "#44546F" }}>
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 h-9" style={{ borderColor: "#DFE1E6", color: "#44546F" }}>
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort
            </Button>
            <Select>
              <SelectTrigger className="w-48 h-9 text-sm" style={{ borderColor: "#DFE1E6", color: "#44546F" }}>
                <SelectValue placeholder="Filter by manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All managers</SelectItem>
                {managers.map((m) => (
                  <SelectItem key={m.id} value={m.id}>{m.firstName} {m.lastName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Checkbox id="direct-only" />
              <label htmlFor="direct-only" style={{ fontSize: 14, color: "#44546F", cursor: "pointer" }}>Show direct reports only</label>
            </div>
          </div>
        </div>

        <div style={{ border: "1px solid #DFE1E6", borderRadius: 6, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ ...headerStyle, textAlign: "left", width: "18%" }}>Name</th>
                <th style={{ ...headerStyle, textAlign: "left", width: "8%" }}>Level</th>
                <th style={{ ...headerStyle, textAlign: "left", width: "12%" }}>Family</th>
                <th style={{ ...headerStyle, textAlign: "left", width: "8%" }}>Zone</th>
                <th style={{ ...headerStyle, textAlign: "left", width: "12%" }}>Base Salary</th>
                <th style={{ ...headerStyle, textAlign: "left", width: "8%" }}>% SRP</th>
                <th style={{ ...headerStyle, textAlign: "left", width: "10%" }}>Equity</th>
                <th style={{ ...headerStyle, textAlign: "left", width: "16%" }}>Rating</th>
                <th style={{ ...headerStyle, width: "4%" }}></th>
              </tr>
            </thead>
            <tbody>
              {standaloneReports.map((emp) => (
                <EmployeeRow key={emp.id} emp={emp} />
              ))}
            </tbody>
          </table>

          <div style={{ padding: "16px 16px 8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ height: 1, flex: 1, backgroundColor: "#DFE1E6" }}></div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#8993A4", textTransform: "uppercase", letterSpacing: "0.06em" }}>Managers & Their Reports</span>
              <div style={{ height: 1, flex: 1, backgroundColor: "#DFE1E6" }}></div>
            </div>
          </div>

          <div style={{ padding: "0 12px 12px" }}>
            {managers.map((manager) => {
              const reports = employees.filter((e) => e.managerId === manager.id);
              return <ManagerGroup key={manager.id} manager={manager} reports={reports} />;
            })}
          </div>
        </div>

        <div style={{ marginTop: 12, fontSize: 12, color: "#8993A4" }}>
          Showing {employees.length} of {employees.length} employees
        </div>
      </div>
    </div>
  );
}
