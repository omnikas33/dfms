import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "@/components/ui/use-toast";
const cardColors = [
  "bg-gradient-to-tr from-blue-500 to-blue-400 text-white",
  "bg-gradient-to-tr from-green-500 to-green-400 text-white",
  "bg-gradient-to-tr from-yellow-500 to-yellow-400 text-white",
  "bg-gradient-to-tr from-purple-500 to-purple-400 text-white"
];
const dummyWorks = [
  {
    id: 4,
    name: 'जांबुत ते चांडोह रस्ता सुधारणा (ग्रा.पा. जांबुत)',
    scheme: 'ग्रामिण रस्ते विकास व मजबुतीकरण',
    limit: 2500000,
    sanctionedDate: '2024-02-27',
    financialYear: '2024-25',
    vendor:'Om Nikas 1',
    aadhar:'324783489',
    adminApprovedAmount: 1558000,
    workPortionAmount: 1350000,
    taxDeductionAmount: 100000,
    status: 'Pending',
     vendorDetails: {
      name: 'OM Nikas',       // Make sure this matches what you want to show
      aadhar: '1234-5678-9012'
    }
  },
  {
    id: 5,
    name: 'जाधववाडी देव मंदिर मागे रांजणी रस्ता सुधारणा (ग्रा.पा. जाधववाडी)',
    vendor: 'Dipak Jadhav',
    scheme: 'ग्रामिण रस्ते विकास व मजबुतीकरण',
    limit: 2499999,
    sanctionedDate: '2024-02-27',
    financialYear: '2024-25',
    adminApprovedAmount: 1600000,
    workPortionAmount: 1450000,
    taxDeductionAmount: 100000,
    status: 'Pending',
    vendorDetails: null
  },
  {
    id: 6,
    name: 'खडक ते जोगिवहीर फाटा रस्ता सुधारणा (ग्रा.पा. खडक)',
    vendor: null,
    scheme: 'ग्रामिण रस्ते विकास व मजबुतीकरण',
    limit: 1999993,
    sanctionedDate: '2024-02-27',
    financialYear: '2024-25',
    adminApprovedAmount: 1223000,
    workPortionAmount: 1223000,
    taxDeductionAmount: 0,
    status: 'Pending',
    vendorDetails: null
  }
];


const dummyDemands = [
  {
    id: 'DM-2025-02',
    workId: 4,
    workName: 'जांबुत ते चांडोह रस्ता सुधारणा (ग्रा.पा. जांबुत)',
    vendor: 'OM Nikas',
    amount: 200000,
    netPayable: 190000,
    taxes: [
      { id: 4, name: "GST (5%)", amount: 10000 }
    ],
    scheme: 'ग्रामिण रस्ते विकास व मजबुतीकरण',
    status: 'Approved',
    date: '2024-07-01',
    remarks: 'प्रथम हप्ता'
  },
  {
    id: 'DM-2025-03',
    workId: 5,
    workName: 'जाधववाडी देव मंदिर मागे रांजणी रस्ता सुधारणा (ग्रा.पा. जाधववाडी)',
    vendor: 'Sunil Shinde',
    amount: 250000,
    netPayable: 240000,
    taxes: [
      { id: 5, name: "TDS (4%)", amount: 10000 }
    ],
    scheme: 'ग्रामिण रस्ते विकास व मजबुतीकरण',
    status: 'Pending',
    date: '2024-07-02',
    remarks: 'पहिली मागणी'
  },
  {
    id: 'DM-2025-04',
    workId: 6,
    workName: 'खडक ते जोगिवहीर फाटा रस्ता सुधारणा (ग्रा.पा. खडक)',
    vendor: 'OM Nikas',
    amount: 150000,
    netPayable: 147000,
    taxes: [
      { id: 6, name: "GST (2%)", amount: 3000 }
    ],
    scheme: 'ग्रामिण रस्ते विकास व मजबुतीकरण',
    status: 'Approved',
    date: '2024-07-03',
    remarks: 'दुसरी मागणी'
  },
  {
    id: 'DM-2025-05',
    workId: 7,
    workName: 'तोरणे ते आढे बु||, रस्ता सुधारणा (खेड तालुका)',
    vendor: 'Sunil Shinde',
    amount: 300000,
    netPayable: 294000,
    taxes: [
      { id: 7, name: "TDS (2%)", amount: 6000 }
    ],
    scheme: 'ग्रामिण रस्ते विकास व मजबुतीकरण',
    status: 'Approved',
    date: '2024-07-04',
    remarks: 'आदर्श मागणी'
  },
  {
    id: 'DM-2025-06',
    workId: 8,
    workName: 'इंजमा ५२ चबळी माजगाव येथील रस्ता',
    vendor: 'OM Nikas',
    amount: 250000,
    netPayable: 240000,
    taxes: [
      { id: 8, name: "GST (4%)", amount: 10000 }
    ],
    scheme: 'ग्रामिण रस्ते विकास व मजबुतीकरण',
    status: 'Pending',
    date: '2024-07-05',
    remarks: 'पहिली मागणी'
  },
  {
    id: 'DM-2025-07',
    workId: 9,
    workName: 'कवळे कडव ती रस्ता (मागणी क्र. १९२)',
    vendor: 'OM Nikas',
    amount: 100000,
    netPayable: 98000,
    taxes: [
      { id: 9, name: "TDS (2%)", amount: 2000 }
    ],
    scheme: 'ग्रामिण रस्ते विकास व मजबुतीकरण',
    status: 'Approved',
    date: '2024-07-06',
    remarks: 'Initial Demand'
  },
  {
    id: 'DM-2025-08',
    workId: 10,
    workName: 'कवळे हसेव ती रस्ता (मागणी क्र. १९१)',
    vendor: 'Sunil Shinde',
    amount: 180000,
    netPayable: 176400,
    taxes: [
      { id: 10, name: "GST (2%)", amount: 3600 }
    ],
    scheme: 'ग्रामिण रस्ते विकास व मजबुतीकरण',
    status: 'Pending',
    date: '2024-07-07',
    remarks: 'Final Demand'
  }
];
const getStatusBadge = (status) => (
  <Badge variant={status === "Approved" ? "default" : status === "Pending" ? "secondary" : "destructive"}>
    {status}
  </Badge>
);

const ScrutinyModal = ({ open, onClose, demand, work, onSave }) => { /* same as previous */ };

const DistrictFundApproval = () => {
  const [works] = useState(dummyWorks);
  const [demands, setDemands] = useState(dummyDemands);
  const [tab, setTab] = useState("pending");
  const [financialYear, setFinancialYear] = useState("");
  const [planType, setPlanType] = useState("");
  const [schemeName, setSchemeName] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [scrutinyOpen, setScrutinyOpen] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState(null);
  const [selectedWork, setSelectedWork] = useState(null);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const handleScrutinySave = (updatedDemand) => {
    setDemands(prev => prev.map(d => d.id === updatedDemand.id ? updatedDemand : d));
  };

  const filteredDemands = useMemo(() => {
    return demands.filter(d => {
      const work = works.find(w => w.id === d.workId);
      return (
        (!financialYear || work?.financialYear === financialYear) &&
        (!planType || planType === "Plan A") &&
        (!schemeName || d.scheme === schemeName) &&
        (!statusFilter || d.status === statusFilter) &&
        d.status === (tab === "pending" ? "Pending" : "Approved")
      );
    });
  }, [demands, works, financialYear, planType, schemeName, statusFilter, tab]);

  const paginatedDemands = filteredDemands.slice((page - 1) * pageSize, page * pageSize);

  const exportToCSV = () => {
    const exportData = filteredDemands.map(d => {
      const work = works.find(w => w.id === d.workId);
      return {
        "Demand ID": d.id,
        Scheme: d.scheme,
        "Work Name": d.workName,
        "Fin. Year": work?.financialYear,
        "Vendor": work?.vendorDetails?.name || work?.vendor || "-",
        "Amount": d.amount,
        // "Net Payable": d.netPayable,
        "Status": d.status,
        "Remarks": d.remarks
      };
    });
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Demands");
    XLSX.writeFile(wb, "Fund_Demands.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Fund Demands Report", 14, 16);
    const tableData = filteredDemands.map(d => {
      const work = works.find(w => w.id === d.workId);
      return [
        d.id,
        d.scheme,
        d.workName,
        work?.financialYear,
        work?.vendorDetails?.name || work?.vendor || "-",
        d.amount,
        d.netPayable,
        d.status,
        d.remarks
      ];
    });
    doc.autoTable({
      head: [["Demand ID", "Scheme", "Work Name", "Fin. Year", "Vendor", "Amount", "Net Payable", "Status", "Remarks"]],
      body: tableData
    });
    doc.save("Fund_Demands.pdf");
  };

  // Auto-refresh polling every 60 sec
  useEffect(() => {
    const interval = setInterval(() => {
      toast({ description: "Data refreshed automatically." });
      setDemands([...demands]); // replace with API call when live
    }, 60000);
    return () => clearInterval(interval);
  }, [demands]);

  return (
    <motion.div
      className="space-y-6 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {["Demands Received Today", "Forwarded Today", "Pending Today", "Total Demands"].map((title, idx) => (
    <motion.div
      key={idx}
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
    >
      <div className={`rounded-xl p-4 shadow-lg ${cardColors[idx]} transition duration-300 ease-in-out`}>
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {idx === 3 ? (
            <div className="text-xs leading-relaxed">
              <p>Received: <span className="font-bold">50</span></p>
              <p>Approved: <span className="font-bold">35</span></p>
              <p>Rejected: <span className="font-bold">5</span></p>
            </div>
          ) : (
            <p className="text-3xl font-bold mt-2">{[5, 3, 2][idx]}</p>
          )}
        </CardContent>
      </div>
    </motion.div>
  ))}
</div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {[
          { label: "Financial Year", value: financialYear, setter: setFinancialYear, options: ["2024-25"] },
          { label: "Plan Type", value: planType, setter: setPlanType, options: ["Plan A"] },
          { label: "Scheme Name", value: schemeName, setter: setSchemeName, options: ["Scheme X", "Scheme Y"] },
          { label: "Status", value: statusFilter, setter: setStatusFilter, options: ["Pending", "Approved", "Rejected"] }
        ].map((filter, idx) => (
          <select
            key={idx}
            value={filter.value}
            onChange={e => filter.setter(e.target.value)}
            className="border p-2 rounded text-sm"
          >
            <option value="">All {filter.label}s</option>
            {filter.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ))}
        <Button size="sm" onClick={exportToCSV} className="flex items-center gap-1"><Download size={14} /> Export CSV</Button>
        <Button size="sm" onClick={exportToPDF} className="flex items-center gap-1"><Download size={14} /> Export PDF</Button>
      </div>

      {/* Scrutiny Modal */}
      <ScrutinyModal
        open={scrutinyOpen}
        onClose={() => setScrutinyOpen(false)}
        demand={selectedDemand}
        work={selectedWork}
        onSave={handleScrutinySave}
      />

      {/* Table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="shadow">
          <CardHeader>
            <CardTitle>IA Fund Demands</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
              </TabsList>
              <TabsContent value={tab}>
                <div className="overflow-x-auto rounded border">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        {["Action", "Demand ID", "Scheme", "Work", "Fin. Year", "Vendor", "Amount", "Status", "Remarks"].map(h => (
                          <th key={h} className="p-2">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedDemands.map((d, idx) => {
                        const work = works.find(w => w.id === d.workId);
                        return (
                          <tr key={d.id} className="hover:bg-blue-50 transition">
                            <td className="p-2">
                              <Button size="sm" onClick={() => {
                                setSelectedDemand(d);
                                setSelectedWork(work);
                                setScrutinyOpen(true);
                              }}>
                                {tab === "pending" ? "Scrutiny" : "View"}
                              </Button>
                            </td>
                            <td className="p-2">{d.id}</td>
                            <td className="p-2">{d.scheme}</td>
                            <td className="p-2">{d.workName}</td>
                            <td className="p-2">{work?.financialYear}</td>
                            <td className="p-2">{work?.vendorDetails?.name || work?.vendor || "-"}</td>
                            <td className="p-2 text-right">₹{d.amount.toLocaleString()}</td>
                            {/* <td className="p-2 text-right">₹{d.netPayable.toLocaleString()}</td> */}
                            <td className="p-2">{getStatusBadge(d.status)}</td>
                            <td className="p-2">{d.remarks}</td>
                          </tr>
                        );
                      })}
                      {paginatedDemands.length === 0 && (
                        <tr>
                          <td colSpan={10} className="text-center p-4 text-gray-400">No records found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
            {/* Pagination */}
            <div className="flex justify-between mt-2">
              <p className="text-xs text-gray-500">Page {page} of {Math.ceil(filteredDemands.length / pageSize)}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
                <Button size="sm" variant="outline" disabled={page * pageSize >= filteredDemands.length} onClick={() => setPage(p => p + 1)}>Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default DistrictFundApproval;
