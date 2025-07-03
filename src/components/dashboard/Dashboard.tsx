import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Download, Building, Users, Layers, FileText, ClipboardList, Clock, Hourglass, CheckCircle } from "lucide-react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const AdminDashboard = () => {
  const summaryStats = {
    districts: { total: 36, active: 30, inactive: 6 },
    users: 150,
    projects: 140,
    schemes: 60000,
    demands: { total: 1200, today: 108, pending: 45 },
    funds: {
      processed: 8300000000,
      budget: 12500000000,
      allocated: 7400000000,
      utilizationPercent: 59.2
    }
  };

  const filters = {
    fy: ["2022-23", "2023-24", "2024-25"],
    scheme: ["PMGSY", "NABARD", "RRR"],
    district: ["Mumbai", "Pune", "Nagpur"]
  };

  const chartBarData = {
    labels: ["Mumbai", "Pune", "Nagpur"],
    datasets: [
      {
        label: "Allocated",
        data: [3000000000, 2500000000, 1900000000],
        backgroundColor: "#36A2EB"
      },
      {
        label: "Total Budget",
        data: [3500000000, 3000000000, 2800000000],
        backgroundColor: "#FFCE56"
      }
    ]
  };

  const pieData = {
    labels: ["Infrastructure", "Education", "Healthcare", "Agriculture"],
    datasets: [
      {
        label: "Funds by Sector",
        data: [3400000000, 1800000000, 1500000000, 700000000],
        backgroundColor: ["#4BC0C0", "#FF6384", "#9966FF", "#FF9F40"]
      }
    ]
  };

  const lineData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Fund Disbursed Over Quarters",
        data: [1800000000, 2000000000, 2200000000, 2300000000],
        fill: false,
        borderColor: "#36A2EB"
      }
    ]
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet([summaryStats]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Summary");
    XLSX.writeFile(wb, "AdminDashboardSummary.xlsx");
  };

  const handlePdfExport = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Category", "Value"]],
      body: [
        ["Total Districts", summaryStats.districts.total],
        ["Active Districts", summaryStats.districts.active],
        ["Inactive Districts", summaryStats.districts.inactive],
        ["Users", summaryStats.users],
        ["Projects", summaryStats.projects],
        ["Schemes", summaryStats.schemes],
        ["Total Demands", summaryStats.demands.total],
        ["Today's Demands", summaryStats.demands.today],
        ["Pending Demands", summaryStats.demands.pending],
        ["Fund Processed", `₹${(summaryStats.funds.processed / 1e7).toFixed(2)} Cr`],
        ["Budget", `₹${(summaryStats.funds.budget / 1e7).toFixed(2)} Cr`],
        ["Allocated", `₹${(summaryStats.funds.allocated / 1e7).toFixed(2)} Cr`],
        ["Utilization", `${summaryStats.funds.utilizationPercent}%`]
      ]
    });
    doc.save("AdminDashboardSummary.pdf");
  };

  const cardData = [
    {
      title: " Active Districts",
      value: summaryStats.districts.total,
      icon: <Building className="w-6 h-6 text-white" />,
      href: "/district-master",
      bg: "from-blue-500 to-blue-700"
    },
    {
      title: "No of Implementing Agencies",
      value: summaryStats.users,
      icon: <Users className="w-6 h-6 text-white" />,
      href: "/user-master",
      bg: "from-indigo-500 to-indigo-700"
    },
    {
      title: "Total Schemes",
      value: summaryStats.projects,
      icon: <Layers className="w-6 h-6 text-white" />,
      href: "/projects",
      bg: "from-green-500 to-green-700"
    },
    {
      title: "Total Works",
      value: summaryStats.schemes,
      icon: <FileText className="w-6 h-6 text-white" />,
      href: "/scheme-master",
      bg: "from-teal-500 to-teal-700"
    },
    {
      title: "Work Demands",
      value: summaryStats.demands.total,
      icon: <ClipboardList className="w-6 h-6 text-white" />,
      href: "/fund-demand",
      bg: "from-orange-500 to-orange-700"
    },
    {
      title: "Today's Demands",
      value: summaryStats.demands.today,
      icon: <Clock className="w-6 h-6 text-white" />,
      href: "/fund-demand",
      bg: "from-yellow-500 to-yellow-700"
    },
    {
      title: "Pending Demands",
      value: summaryStats.demands.pending,
      icon: <Hourglass className="w-6 h-6 text-white" />,
      href: "/fund-demand",
      bg: "from-red-500 to-red-700"
    },
    {
      title: "Funds Processed",
      value: `₹${(summaryStats.funds.processed / 1e7).toFixed(2)} Cr`,
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      href: "/fund-allocation",
      bg: "from-purple-500 to-purple-700"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(filters).map(([key, options]) => (
          <Select key={key}>
            <SelectTrigger><SelectValue placeholder={`Select ${key}`} /></SelectTrigger>
            <SelectContent>
              {options.map(val => (
                <SelectItem key={val} value={val}>{val}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      {/* Stylish Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cardData.map((card, index) => (
          <Card
            key={index}
            onClick={() => window.location.href = card.href}
            className={`cursor-pointer bg-gradient-to-tr ${card.bg} text-white shadow-md hover:shadow-xl hover:scale-105 transition-all rounded-2xl`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">{card.title}</CardTitle>
              <div className="p-2 bg-white bg-opacity-20 rounded-full">{card.icon}</div>
            </CardHeader>
            <CardContent className="text-2xl font-bold pt-1">
              {card.value}
              <div className="text-sm underline mt-1">View More</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Card><CardHeader><CardTitle>District-wise Allocation</CardTitle></CardHeader><CardContent><Bar data={chartBarData} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Sector-wise Fund Distribution</CardTitle></CardHeader><CardContent><Pie data={pieData} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Quarterly Fund Disbursal</CardTitle></CardHeader><CardContent><Line data={lineData} /></CardContent></Card>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-4 justify-end">
        <Button onClick={handleExport}><Download className="mr-1 h-4 w-4" />Export Excel</Button>
        <Button onClick={handlePdfExport}><Download className="mr-1 h-4 w-4" />Export PDF</Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
