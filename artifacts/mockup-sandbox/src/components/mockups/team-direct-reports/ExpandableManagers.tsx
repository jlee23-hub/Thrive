import { useState } from "react";
import { ChevronDown, ChevronRight, Search, SlidersHorizontal, ArrowUpDown, Users, User, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

function RatingBadge({ rating }: { rating: string }) {
  const variant = rating === "Greatly Exceeds" ? "default" : rating === "Exceeds Expectations" ? "secondary" : rating === "Met Some" ? "outline" : "outline";
  const colorClass = rating === "Greatly Exceeds" ? "bg-emerald-100 text-emerald-800 border-emerald-200" : rating === "Exceeds Expectations" ? "bg-blue-100 text-blue-800 border-blue-200" : rating === "Met Some" ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-slate-100 text-slate-700 border-slate-200";
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colorClass}`}>{rating}</span>;
}

function SrpIndicator({ value }: { value: string }) {
  const num = parseInt(value);
  const color = num < 100 ? "text-red-600" : num >= 120 ? "text-emerald-600" : "text-slate-900";
  return <span className={`text-sm font-medium ${color}`}>{value}</span>;
}

function EmployeeRow({ emp, indent = false }: { emp: Employee; indent?: boolean }) {
  return (
    <div className={`grid grid-cols-[1fr_80px_100px_80px_120px_80px_100px_140px_32px] items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors border-b border-slate-100 ${indent ? "pl-12" : ""}`}>
      <div className="flex items-center gap-2.5 min-w-0">
        <Avatar className="h-7 w-7 flex-shrink-0">
          <AvatarFallback className="text-[10px] font-semibold bg-blue-100 text-blue-700">{emp.initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="text-sm font-medium text-slate-900 truncate">{emp.firstName} {emp.lastName}</div>
        </div>
      </div>
      <div><span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${emp.jobLevel.startsWith("M") ? "bg-emerald-100 text-emerald-700" : "bg-sky-100 text-sky-700"}`}>{emp.jobLevel}</span></div>
      <div className="text-sm text-slate-600 truncate">{emp.jobFamily}</div>
      <div className="text-sm text-slate-500">{emp.zone}</div>
      <div className="text-sm font-semibold text-slate-900">{formatCurrency(emp.currentBaseSalary)}</div>
      <SrpIndicator value={emp.srpPercent} />
      <div className="text-sm text-slate-600">{emp.currentEquity}</div>
      <RatingBadge rating={emp.rating} />
      <button className="p-1 hover:bg-slate-100 rounded transition-colors">
        <MoreHorizontal className="w-4 h-4 text-slate-400" />
      </button>
    </div>
  );
}

function ManagerGroup({ manager, reports }: { manager: Employee; reports: Employee[] }) {
  const [isOpen, setIsOpen] = useState(true);
  const totalSalary = reports.reduce((sum, e) => sum + e.currentBaseSalary, 0);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border border-slate-200 rounded-lg overflow-hidden mb-3">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50/80 cursor-pointer hover:bg-slate-100/80 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-slate-500">
                {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs font-semibold bg-indigo-100 text-indigo-700">{manager.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">{manager.firstName} {manager.lastName}</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-100 text-indigo-700">{manager.jobLevel}</span>
                  <span className="text-xs text-slate-500">{manager.jobFamily}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Users className="w-3.5 h-3.5" />
                <span>{reports.length} reports</span>
              </div>
              <div className="text-xs text-slate-500">
                Team salary: <span className="font-semibold text-slate-700">{formatCurrency(totalSalary)}</span>
              </div>
              <RatingBadge rating={manager.rating} />
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div>
            {reports.map((emp) => (
              <EmployeeRow key={emp.id} emp={emp} indent />
            ))}
          </div>
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
    <div className="min-h-screen bg-white p-8 font-['Inter',sans-serif]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Team</h1>
          <p className="text-sm text-slate-500 mt-0.5">View and understand your team's compensation</p>
        </div>

        <div className="border border-slate-200 rounded-lg p-5 mb-6">
          <div className="text-sm font-semibold text-slate-900 mb-3">Filter {employees.length} employees</div>
          <div className="flex items-center gap-3">
            <div className="relative w-44">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search" className="pl-8 h-9 text-sm" />
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 h-9">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 h-9">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort
            </Button>
            <Select>
              <SelectTrigger className="w-48 h-9 text-sm">
                <SelectValue placeholder="Filter by manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All managers</SelectItem>
                {managers.map((m) => (
                  <SelectItem key={m.id} value={m.id}>{m.firstName} {m.lastName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Checkbox id="direct-only" />
              <label htmlFor="direct-only" className="text-sm text-slate-600 cursor-pointer">Show direct reports only</label>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1fr_80px_100px_80px_120px_80px_100px_140px_32px] items-center gap-3 px-4 py-2.5 bg-slate-50 border-b border-slate-200">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Level</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Family</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Zone</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Base Salary</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">% SRP</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Equity</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Rating</div>
            <div></div>
          </div>

          {standaloneReports.map((emp) => (
            <EmployeeRow key={emp.id} emp={emp} />
          ))}

          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1 bg-slate-200"></div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Managers & Their Reports</span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
          </div>

          <div className="px-3 pb-3">
            {managers.map((manager) => {
              const reports = employees.filter((e) => e.managerId === manager.id);
              return <ManagerGroup key={manager.id} manager={manager} reports={reports} />;
            })}
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-400">
          Showing {employees.length} of {employees.length} employees
        </div>
      </div>
    </div>
  );
}
