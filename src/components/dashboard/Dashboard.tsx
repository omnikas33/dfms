import React, { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DemandRecord {
  districtCode: string;
  districtName: string;
  planType: "District Annual Plan" | "MLA/MLC" | "HADP";
  financialYear: string;
  demandCode: string;
  schemeCode: string;
  schemeName: string;
  head: string;
  demandAmount: number;
  status: "Approved" | "Pending";
  subtype?: string;
  representative?: string;
}

const districtData: DemandRecord[] = [
  { districtCode: "O-26", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-26 (Revenue)", schemeCode: "2053A233", schemeName: "Strengthening of Dynamic Government Administration and Emergency Management System", head: "31", demandAmount: 474001, status: "Approved" },
  { districtCode: "O-26", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-26 (Revenue)", schemeCode: "2202J395", schemeName: "Assistance to Zilla Parishad for Special Repairs of School Buildings, Rooms and Latrine", head: "31", demandAmount: 250000, status: "Pending" },
  { districtCode: "O-26", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-26 (Revenue)", schemeCode: "2202J733", schemeName: "Creating infrastructure for primary/ secondary schools in Zilla Parishad area", head: "31", demandAmount: 250000, status: "Approved" },
  { districtCode: "O-26", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-26 (Revenue)", schemeCode: "2202K079", schemeName: "Assistance for Aadarsh Schools to construct basic facilities", head: "31", demandAmount: 250000, status: "Pending" },
  { districtCode: "O-26", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-26 (Revenue)", schemeCode: "2202K426", schemeName: "Creation of Science labs, Computer labs, Digital schools, Internet/Wi-Fi facilities", head: "31", demandAmount: 250000, status: "Approved" },
  { districtCode: "O-26", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-26 (Revenue)", schemeCode: "22031029", schemeName: "Development of facilities in Pre S.S.C. Vocational Education", head: "21", demandAmount: 599, status: "Pending" },
  { districtCode: "O-27", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-27 (Capital)", schemeCode: "40550386", schemeName: "Provide infrastructural facilities to various establishments of Police and Prisons…", head: "51", demandAmount: 177433, status: "Approved" },
  { districtCode: "O-27", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-27 (Capital)", schemeCode: "40550386", schemeName: "Provide infrastructural facilities to various establishments of Police and Prisons…", head: "52", demandAmount: 1, status: "Pending" },
  { districtCode: "O-27", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-27 (Capital)", schemeCode: "40550386", schemeName: "Provide infrastructural facilities to various establishments of Police and Prisons…", head: "53", demandAmount: 136245, status: "Approved" },
  { districtCode: "O-27", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-27 (Capital)", schemeCode: "40591436", schemeName: "Major Works", head: "53", demandAmount: 150000, status: "Pending" },
  { districtCode: "O-27", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-27 (Capital)", schemeCode: "40592601", schemeName: "Construction of Protection Wall to Prevent Encroachment", head: "53", demandAmount: 50000, status: "Approved" },
  { districtCode: "O-27", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-27 (Capital)", schemeCode: "42103336", schemeName: "Hospital repairs & maintenance", head: "53", demandAmount: 20000, status: "Pending" },
  { districtCode: "O-27", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-27 (Capital)", schemeCode: "42160736", schemeName: "General Pool Accommodation Works", head: "53", demandAmount: 50000, status: "Approved" },
  { districtCode: "O-27", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-27 (Capital)", schemeCode: "42350449", schemeName: "WCD Dept. Major Works", head: "51", demandAmount: 1, status: "Pending" },
  { districtCode: "O-27", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-27 (Capital)", schemeCode: "42350449", schemeName: "WCD Dept. Major Works", head: "52", demandAmount: 1, status: "Approved" },
  { districtCode: "O-27", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-27 (Capital)", schemeCode: "42350449", schemeName: "WCD Dept. Major Works", head: "53", demandAmount: 50000, status: "Pending" },
  { districtCode: "O-27", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-27 (Capital)", schemeCode: "42501783", schemeName: "ITI Workshop Building", head: "53", demandAmount: 50000, status: "Approved" },
  { districtCode: "O-27", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-27 (Capital)", schemeCode: "42501809", schemeName: "Govt Technical School", head: "53", demandAmount: 14000, status: "Pending" },
  { districtCode: "O-27", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-27 (Capital)", schemeCode: "42502224", schemeName: "ITI Hostel & Training Facilities", head: "53", demandAmount: 6500, status: "Approved" },
  { districtCode: "O-27", districtName: "Pune", planType: "District Annual Plan", financialYear: "2025-26", demandCode: "O-27 (Capital)", schemeCode: "44021765", schemeName: "Soil Conservation Measures", head: "53", demandAmount: 5000, status: "Pending" }
];

export const mlaMock: DemandRecord[] = [
  { districtCode: "MLA-01", districtName: "Pune", planType: "MLA/MLC", financialYear: "2025-26", demandCode: "11 MLA", schemeCode: "90923", schemeName: "MLA Development Scheme", head: "1234", demandAmount: 10000000, status: "Approved", subtype: "MLA", representative: "Shri Mahesh Landge" },
  { districtCode: "MLA-02", districtName: "Pune", planType: "MLA/MLC", financialYear: "2025-26", demandCode: "11 MLA", schemeCode: "90923", schemeName: "MLA Development Scheme", head: "323", demandAmount: 20000000, status: "Pending", subtype: "MLA", representative: "Shri Madhuri Misal" }
];

export const mlcMock: DemandRecord[] = [
  { districtCode: "MLC-01", districtName: "Pune", planType: "MLA/MLC", financialYear: "2025-26", demandCode: "90923 MLC", schemeCode: "90923", schemeName: "MLC Development Scheme", head: "—", demandAmount: 30000000, status: "Approved", subtype: "MLC - Nodal", representative: "Shri Vinod Patil" },
  { districtCode: "MLC-02", districtName: "Pune", planType: "MLA/MLC", financialYear: "2025-26", demandCode: "90923 MLC", schemeCode: "90923", schemeName: "MLC Development Scheme", head: "—", demandAmount: 15000000, status: "Pending", subtype: "MLC - Non-Nodal", representative: "Smt. Sneha Jadhav" }
];

export const hadpMock: DemandRecord[] = [
  { districtCode: "HADP-01", districtName: "Pune", planType: "HADP", financialYear: "2025-26", demandCode: "HADP-01", schemeCode: "HADP01", schemeName: "HADP Special Scheme", head: "—", demandAmount: 15000000, status: "Approved" }
];

const AdminDashboard: React.FC = () => {
  const [fy, setFy] = useState<string>("All");
  const [planType, setPlanType] = useState<DemandRecord["planType"]>("District Annual Plan");
  const [demandCode, setDemandCode] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [subtype, setSubtype] = useState<string>("All");
  const [rep, setRep] = useState<string>("All");

  const allData = useMemo(() => [...districtData, ...mlaMock, ...mlcMock, ...hadpMock], []);

  const filtered = useMemo(() => {
    return allData.filter(d => {
      if (fy !== "All" && d.financialYear !== fy) return false;
      if (d.planType !== planType) return false;
      if (planType === "District Annual Plan") {
        if (demandCode !== "All" && d.demandCode !== demandCode) return false;
        if (status !== "All" && d.status !== status) return false;
      }
      if (planType === "MLA/MLC") {
        if (subtype !== "All" && d.subtype !== subtype) return false;
        if (rep !== "All" && d.representative !== rep) return false;
      }
      return true;
    });
  }, [allData, fy, planType, demandCode, status, subtype, rep]);

  interface Sum { budget: number; approved: number; pending: number }
  const map: Record<string, Sum> = {};
  filtered.forEach(d => {
    const key = [d.demandCode, d.districtName, d.schemeCode, d.head, d.schemeName].join("|");
    const s = map[key] ||= { budget: 0, approved: 0, pending: 0 };
    s.budget += d.demandAmount;
    if (d.status === "Approved") s.approved += d.demandAmount;
    else s.pending += d.demandAmount;
  });

  const rows = Object.entries(map).map(([key, s]) => {
    const [code, district, schemeCode, head, schemeName] = key.split("|");
    return { demandCode: code, district, schemeKey: `${schemeCode} - ${head} - ${schemeName}`, ...s, balance: s.budget - s.approved };
  });

  const totalBudget   = rows.reduce((sum, r) => sum + r.budget,    0);
  const totalApproved = rows.reduce((sum, r) => sum + r.approved,  0);
  const totalPending  = rows.reduce((sum, r) => sum + r.pending,   0);
  const totalBalance  = rows.reduce((sum, r) => sum + r.balance,   0);

  const openDetails = (code: string) => window.open(`/demands/${code}`, "_blank");

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[140px]">
          <Label htmlFor="fy-select">Financial Year</Label>
          <Select id="fy-select" value={fy} onValueChange={setFy}>
            <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
            <SelectContent>
              {["All", ...new Set(allData.map(d => d.financialYear))].map(y => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[180px]">
          <Label htmlFor="planType-select">Plan Type</Label>
          <Select id="planType-select" value={planType} onValueChange={setPlanType}>
            <SelectTrigger><SelectValue placeholder="Select plan" /></SelectTrigger>
            <SelectContent>
              {["District Annual Plan", "MLA/MLC", "HADP"].map(pt => (
                <SelectItem key={pt} value={pt}>{pt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {planType === "District Annual Plan" && (
          <>
            <div className="flex-1 min-w-[160px]">
              <Label htmlFor="demandCode-select">Demand Code</Label>
              <Select id="demandCode-select" value={demandCode} onValueChange={setDemandCode}>
                <SelectTrigger><SelectValue placeholder="Select code" /></SelectTrigger>
                <SelectContent>
                  {["All", ...new Set(districtData.map(d => d.demandCode))].map(dc => (
                    <SelectItem key={dc} value={dc}>{dc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[120px]">
              <Label htmlFor="status-select">Status</Label>
              <Select id="status-select" value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  {["All", "Approved", "Pending"].map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {planType === "MLA/MLC" && (
          <>
            <div className="flex-1 min-w-[160px]">
              <Label htmlFor="subtype-select">MLA/MLC Type</Label>
              <Select id="subtype-select" value={subtype} onValueChange={setSubtype}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  {["All", "MLA", "MLC - Nodal", "MLC - Non-Nodal"].map(st => (
                    <SelectItem key={st} value={st}>{st}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[160px]">
              <Label htmlFor="rep-select">Representative</Label>
              <Select id="rep-select" value={rep} onValueChange={setRep}>
                <SelectTrigger><SelectValue placeholder="Select name" /></SelectTrigger>
                <SelectContent>
                  {["All", ...new Set([...mlaMock, ...mlcMock].map(d => d.representative!))].map(n => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader><CardTitle>Total Budget</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">₹{totalBudget.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Approved Demands</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">₹{totalApproved.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pending Demands</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">₹{totalPending.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Balance</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">₹{totalBalance.toLocaleString()}</CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader><CardTitle>Scheme-wise Summary</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          {rows.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Demand Code</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Scheme (Code-Head-Name)</TableHead>
                  <TableHead className="text-right">Total Budget</TableHead>
                  <TableHead className="text-right">Approved</TableHead>
                  <TableHead className="text-right">Pending</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Button variant="link" onClick={() => openDetails(r.demandCode)}>
                        {r.demandCode}
                      </Button>
                    </TableCell>
                    <TableCell>{r.district}</TableCell>
                    <TableCell>{r.schemeKey}</TableCell>
                    <TableCell className="text-right">₹{r.budget.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{r.approved.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{r.pending.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{r.balance.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No data for the selected filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
