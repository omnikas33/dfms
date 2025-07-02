import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Users, FilePlus2, CheckCircle, AlertTriangle, TrendingUp, Download, Bell, Eye } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

const statsData = {
  totalDemanded: 11230000,
  totalApproved: 8500000,
  utilization: 76,
  works: 12,
  schemes: 4,
  vendors: 6,
  overdue: 2
};

const colors = ["#2563eb", "#14b8a6", "#eab308", "#ef4444", "#7c3aed", "#f59e42"];
const barData = [
  { month: "Apr", Demand: 2000000, Approved: 1600000 },
  { month: "May", Demand: 3200000, Approved: 2500000 },
  { month: "Jun", Demand: 4000000, Approved: 2900000 },
  { month: "Jul", Demand: 2040000, Approved: 1500000 }
];
const pieStatusData = [
  { status: "Approved", value: 8500000 },
  { status: "Pending", value: 2730000 },
  { status: "Rejected", value: 120000 }
];
const schemePieData = [
  { scheme: "ग्रामीण रस्ते", value: 6500000 },
  { scheme: "पुल बांधकाम", value: 3000000 },
  { scheme: "जल व्यवस्थापन", value: 1730000 }
];

const vendors = [
  { id: 1, name: "OM Nikas", demands: 5 },
  { id: 2, name: "Sunil Shinde", demands: 4 },
  { id: 3, name: "Rajesh Kumar", demands: 3 },
  { id: 4, name: "Vikas Bhave", demands: 2 },
];

const activities = [
  { type: "Demand Approved", text: "₹16 लाख मंजूर for 'खडक ते जोगिवहीर'", time: "15 mins ago", icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
  { type: "Vendor Registered", text: "Sunil Shinde registered for 'पुल बांधकाम'", time: "45 mins ago", icon: <Users className="w-4 h-4 text-blue-500" /> },
  { type: "Demand Pending", text: "₹12 लाख for 'जांबुत ते चांडोह' awaiting approval", time: "1 hr ago", icon: <AlertTriangle className="w-4 h-4 text-yellow-500" /> },
  { type: "Fund Released", text: "₹5 लाख released for 'कवळे कडव ती रस्ता'", time: "Today", icon: <TrendingUp className="w-4 h-4 text-primary" /> }
];

// Filter options
const fyList = ["2024-25", "2023-24"];
const schemeList = ["ग्रामीण रस्ते", "पुल बांधकाम", "जल व्यवस्थापन"];
const workList = [
  "जांबुत ते चांडोह", "खडक ते जोगिवहीर", "इंजमा माजगाव", "कवळे कडव", "कवळे हसेव"
];
const statusList = ["Approved", "Pending", "Rejected"];

export default function IADashboard() {
  const [filters, setFilters] = useState({ fy: "", scheme: "", work: "", status: "", vendor: "" });

  // (For demo, filtering does not change stats, just UI)
  const utilizationPct = Math.round((statsData.totalApproved / statsData.totalDemanded) * 100);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Top Bar: Actions & Notifications */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">IA Dashboard</h2>
          <p className="text-muted-foreground">संपूर्ण निधी, कामे, योजना, विक्रेते, मागणी आणि अहवाल</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2"><Bell /> Notifications</Button>
          <Button variant="outline" className="gap-2"><Download /> Download Report</Button>
          <Button variant="default" className="gap-2 bg-[#193A9A] text-white"><FilePlus2 /> Raise New Demand</Button>
          <Button variant="secondary" className="gap-2"><Users /> Register Vendor</Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-medium">योजना</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{statsData.schemes}</div>
            <p className="text-xs text-muted-foreground">Total Schemes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-medium">कामे</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{statsData.works}</div>
            <p className="text-xs text-muted-foreground">Total Works</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-medium">विक्रेते</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{statsData.vendors}</div>
            <p className="text-xs text-muted-foreground">Total Vendors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-medium">Fund Demanded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">₹{statsData.totalDemanded.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total Demands</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-medium">Fund Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">₹{statsData.totalApproved.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Approved so far</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-medium">Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-xl font-bold">{utilizationPct}%</div>
              <Progress value={utilizationPct} className="w-24" />
            </div>
            <p className="text-xs text-muted-foreground">Funds Utilized</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-red-600">{statsData.overdue}</div>
            <p className="text-xs text-muted-foreground">Overdue Demands</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Panel */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">आर्थिक वर्ष</label>
          <select className="border rounded px-3 py-2" value={filters.fy} onChange={e => setFilters(f => ({ ...f, fy: e.target.value }))}>
            <option value="">All</option>
            {fyList.map(fy => <option key={fy} value={fy}>{fy}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">योजना</label>
          <select className="border rounded px-3 py-2" value={filters.scheme} onChange={e => setFilters(f => ({ ...f, scheme: e.target.value }))}>
            <option value="">All</option>
            {schemeList.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">काम</label>
          <select className="border rounded px-3 py-2" value={filters.work} onChange={e => setFilters(f => ({ ...f, work: e.target.value }))}>
            <option value="">All</option>
            {workList.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select className="border rounded px-3 py-2" value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
            <option value="">All</option>
            {statusList.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Vendor</label>
          <select className="border rounded px-3 py-2" value={filters.vendor} onChange={e => setFilters(f => ({ ...f, vendor: e.target.value }))}>
            <option value="">All</option>
            {vendors.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
          </select>
        </div>
        <Button variant="outline" className="ml-auto">Reset Filters</Button>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fund Demand/Approval Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5" /> Demand vs Approved (FY)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={x => "₹" + (x / 1e6) + "M"} />
                <Tooltip formatter={v => "₹" + v.toLocaleString()} />
                <Legend />
                <Bar dataKey="Demand" fill={colors[0]} />
                <Bar dataKey="Approved" fill={colors[1]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Pie Chart Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <PieChart className="w-5 h-5" /> Demand Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieStatusData}
                  dataKey="value"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  label={entry => entry.status}
                >
                  {pieStatusData.map((entry, idx) => (
                    <Cell key={entry.status} fill={colors[idx % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={v => "₹" + v.toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-3 mt-3 text-xs">
              {pieStatusData.map((d, idx) => (
                <span key={d.status} className="flex items-center gap-1">
                  <span style={{ backgroundColor: colors[idx % colors.length] }} className="inline-block w-3 h-3 rounded-full"></span>
                  {d.status}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Scheme-wise Fund Donut */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <PieChart className="w-5 h-5" /> Scheme-wise Fund
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={schemePieData}
                  dataKey="value"
                  nameKey="scheme"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={entry => entry.scheme}
                >
                  {schemePieData.map((entry, idx) => (
                    <Cell key={entry.scheme} fill={colors[idx % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={v => "₹" + v.toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Table/Report Drilldown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart /> Fund Demand & Vendor Report</CardTitle>
          <CardDescription>Live fund demand, approvals, vendors and overdue status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="demands">
            <TabsList>
              <TabsTrigger value="demands">Demands</TabsTrigger>
              <TabsTrigger value="vendors">Vendors</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            {/* Demand Table */}
            <TabsContent value="demands">
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full text-sm border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Demand ID</th>
                      <th className="px-3 py-2 text-left font-semibold">Work</th>
                      <th className="px-3 py-2 text-left font-semibold">Scheme</th>
                      <th className="px-3 py-2 text-right font-semibold">Amount</th>
                      <th className="px-3 py-2 text-center font-semibold">Status</th>
                      <th className="px-3 py-2 text-center font-semibold">Date</th>
                      <th className="px-3 py-2 text-center font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "DM-2024-01", work: "जांबुत ते चांडोह", scheme: "ग्रामीण रस्ते", amount: 1558000, status: "Pending", date: "2024-06-10" },
                      { id: "DM-2024-02", work: "खडक ते जोगिवहीर", scheme: "ग्रामीण रस्ते", amount: 1223000, status: "Approved", date: "2024-06-02" },
                      { id: "DM-2024-03", work: "इंजमा माजगाव", scheme: "ग्रामीण रस्ते", amount: 3188000, status: "Pending", date: "2024-05-22" },
                    ].map((row, i) => (
                      <tr key={row.id} className={i % 2 ? "bg-gray-50" : ""}>
                        <td className="px-3 py-2">{row.id}</td>
                        <td className="px-3 py-2">{row.work}</td>
                        <td className="px-3 py-2">{row.scheme}</td>
                        <td className="px-3 py-2 text-right">₹{row.amount.toLocaleString()}</td>
                        <td className="px-3 py-2 text-center">
                          <Badge variant={
                            row.status === "Approved" ? "default" :
                            row.status === "Pending" ? "secondary" :
                            "destructive"
                          }>{row.status}</Badge>
                        </td>
                        <td className="px-3 py-2 text-center">{row.date}</td>
                        <td className="px-3 py-2 text-center">
                          <Button size="icon" variant="outline"><Eye className="w-4 h-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            {/* Vendors Table */}
            <TabsContent value="vendors">
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full text-sm border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Vendor</th>
                      <th className="px-3 py-2 text-left font-semibold">GST</th>
                      <th className="px-3 py-2 text-left font-semibold">Works Assigned</th>
                      <th className="px-3 py-2 text-center font-semibold">Status</th>
                      <th className="px-3 py-2 text-center font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((v, i) => (
                      <tr key={v.id} className={i % 2 ? "bg-gray-50" : ""}>
                        <td className="px-3 py-2">{v.name}</td>
                        <td className="px-3 py-2">GSTIN-{v.id}</td>
                        <td className="px-3 py-2">{v.demands}</td>
                        <td className="px-3 py-2 text-center"><Badge>Active</Badge></td>
                        <td className="px-3 py-2 text-center">
                          <Button size="icon" variant="outline"><Eye className="w-4 h-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            {/* Overdue */}
            <TabsContent value="overdue">
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full text-sm border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Demand ID</th>
                      <th className="px-3 py-2 text-left font-semibold">Work</th>
                      <th className="px-3 py-2 text-left font-semibold">Amount</th>
                      <th className="px-3 py-2 text-center font-semibold">Days Overdue</th>
                      <th className="px-3 py-2 text-center font-semibold">Send Reminder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "DM-2023-09", work: "कवळे कडव", amount: 900000, overdue: 13 },
                      { id: "DM-2023-12", work: "जाधववाडी रस्ता", amount: 1300000, overdue: 8 }
                    ].map((row, i) => (
                      <tr key={row.id} className={i % 2 ? "bg-gray-50" : ""}>
                        <td className="px-3 py-2">{row.id}</td>
                        <td className="px-3 py-2">{row.work}</td>
                        <td className="px-3 py-2 text-right">₹{row.amount.toLocaleString()}</td>
                        <td className="px-3 py-2 text-center">{row.overdue} days</td>
                        <td className="px-3 py-2 text-center">
                          <Button size="sm" variant="destructive" className="gap-1"><Bell className="w-3 h-3" /> Send Reminder</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Activity Feed */}
    </div>
  );
}
