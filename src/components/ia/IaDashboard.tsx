import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FilePlus2,
  Users,
  Download,
  TrendingUp,
  PieChart,
  Eye,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie as RPie,
  PieChart as RChart,
  Cell,
} from "recharts";

const statsData = {
  totalDemanded: 11230000,
  totalApproved: 8500000,
  works: 12,
  schemes: 4,
  vendors: 6,
  demands: 15,
  approvedDemands: 8,
  pendingDemands: 5,
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};
const barData = [
  { month: "Apr", Demand: 2000000, Approved: 1600000 },
  { month: "May", Demand: 3200000, Approved: 2500000 },
  { month: "Jun", Demand: 4000000, Approved: 2900000 },
  { month: "Jul", Demand: 2040000, Approved: 1500000 },
];

const pieStatusData = [
  { status: "Approved", value: 8500000 },
  { status: "Pending", value: 2730000 },
  { status: "Rejected", value: 120000 },
];

const schemePieData = [
  { scheme: "ग्रामीण रस्ते", value: 6500000 },
  { scheme: "पुल बांधकाम", value: 3000000 },
  { scheme: "जल व्यवस्थापन", value: 1730000 },
];

const demandsData = [
  {
    id: "DM-001",
    work: "जांबुत ते चांडोह",
    scheme: "ग्रामीण रस्ते",
    amount: 1200000,
    status: "Pending",
    date: "2025-06-12",
  },
  {
    id: "DM-002",
    work: "खडक ते जोगिवहीर",
    scheme: "पुल बांधकाम",
    amount: 2200000,
    status: "Approved",
    date: "2025-06-10",
  },
  {
    id: "DM-003",
    work: "इंजमा माजगाव",
    scheme: "जल व्यवस्थापन",
    amount: 1800000,
    status: "Pending",
    date: "2025-06-05",
  },
];

const fyList = ["2024-25", "2023-24"];
const schemeList = ["ग्रामीण रस्ते", "पुल बांधकाम", "जल व्यवस्थापन"];
const workList = ["जांबुत ते चांडोह", "खडक ते जोगिवहीर", "इंजमा माजगाव"];
const statusList = ["Approved", "Pending", "Rejected"];

export default function IADashboard() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    fy: "",
    scheme: "",
    work: "",
    status: "",
  });

  const filteredDemands = demandsData.filter((d) => {
    return (
      (!filters.scheme || d.scheme === filters.scheme) &&
      (!filters.work || d.work === filters.work) &&
      (!filters.status || d.status === filters.status)
    );
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Fund Demand Report", 14, 16);
    autoTable(doc, {
      head: [["Demand ID", "Work", "Scheme", "Amount", "Status", "Date"]],
      body: filteredDemands.map((d) => [
        d.id,
        d.work,
        d.scheme,
        `₹${d.amount.toLocaleString()}`,
        d.status,
        d.date,
      ]),
    });
    doc.save("Fund_Demand_Report.pdf");
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Top Actions */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          IA Dashboard
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleDownloadPDF} className="bg-blue-600 text-white hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" /> Download Report
          </Button>
          <Button onClick={() => navigate("/fund-demand")} className="bg-blue-600 text-white hover:bg-blue-700">
            <FilePlus2 className="w-4 h-4 mr-2" /> Raise New Demand
          </Button>
          <Button onClick={() => navigate("/vendor-detail")} variant="outline">
            <Users className="w-4 h-4 mr-2" /> Register Vendor
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
  {[
    { title: "Total Schemes", value: statsData.schemes },
    { title: "Total Works", value: statsData.works },
    { title: "Registered Vendors", value: statsData.vendors },
    { title: "Fund Demanded (Cr)", value: `₹${(statsData.totalDemanded / 1e7).toFixed(2)} Cr` },
    { title: "Fund Approved (Cr)", value: `₹${(statsData.totalApproved / 1e7).toFixed(2)} Cr` },
    {
      title: "Demands Summary",
      value: (
        <div className="space-y-1 text-sm">
          <div>Total: {statsData.demands}</div>
          <div>Approved: {statsData.approvedDemands}</div>
          <div>Pending: {statsData.pendingDemands}</div>
        </div>
      ),
    },
  ].map((card, i) => (
    <motion.div
      key={card.title}
      custom={i}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="bg-white shadow rounded-lg flex flex-col justify-between p-4 hover:shadow-md transition-shadow duration-300"
    >
      <div className="space-y-2">
        <div className="text-gray-600 text-sm font-medium">{card.title}</div>
        <div className="text-2xl font-bold text-gray-800">{card.value}</div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={() => console.log(`View details for ${card.title}`)}
      >
        View Details
      </Button>
    </motion.div>
  ))}
</div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block mb-1 text-sm">Financial Year</label>
          <select className="border rounded px-3 py-2" value={filters.fy} onChange={e => setFilters(f => ({ ...f, fy: e.target.value }))}>
            <option value="">All</option>
            {fyList.map(fy => <option key={fy}>{fy}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm">Scheme</label>
          <select className="border rounded px-3 py-2" value={filters.scheme} onChange={e => setFilters(f => ({ ...f, scheme: e.target.value }))}>
            <option value="">All</option>
            {schemeList.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm">Work</label>
          <select className="border rounded px-3 py-2" value={filters.work} onChange={e => setFilters(f => ({ ...f, work: e.target.value }))}>
            <option value="">All</option>
            {workList.map(w => <option key={w}>{w}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm">Status</label>
          <select className="border rounded px-3 py-2" value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
            <option value="">All</option>
            {statusList.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle className="flex gap-2 items-center"><TrendingUp className="w-4 h-4" /> Demand vs Approved</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(x) => `₹${(x / 1e6).toFixed(0)}M`} />
                <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="Demand" fill="#2563eb" />
                <Bar dataKey="Approved" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex gap-2 items-center"><PieChart className="w-4 h-4" /> Demand Status</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RChart>
                <RPie data={pieStatusData} dataKey="value" nameKey="status" cx="50%" cy="50%" outerRadius={70} label>
                  {pieStatusData.map((entry, index) => (
                    <Cell key={entry.status} fill={["#2563eb", "#eab308", "#ef4444"][index]} />
                  ))}
                </RPie>
                <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
              </RChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex gap-2 items-center"><PieChart className="w-4 h-4" /> Scheme-wise Fund</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RChart>
                <RPie data={schemePieData} dataKey="value" nameKey="scheme" cx="50%" cy="50%" outerRadius={70} label>
                  {schemePieData.map((entry, index) => (
                    <Cell key={entry.scheme} fill={["#2563eb", "#14b8a6", "#7c3aed"][index]} />
                  ))}
                </RPie>
                <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
              </RChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
