import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, FilePlus2 } from 'lucide-react';
import FundDemandForm from './FundDemandForm';
import FundDemandDetails from './FundDemandDetails';

// Dummy Data
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
    workPortionAmount: 1600000,
    taxDeductionAmount: 0,
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
  },
  {
    id: 7,
    name: 'तोरणे ते आढे बु||, रस्ता सुधारणा (खेड तालुका)',
    vendor: null,
    scheme: 'ग्रामिण रस्ते विकास व मजबुतीकरण',
    limit: 3000000,
    sanctionedDate: '2024-02-28',
    financialYear: '2024-25',
    adminApprovedAmount: 2839000,
    workPortionAmount: 2839000,
    taxDeductionAmount: 0,
    status: 'Pending',
    vendorDetails: null
  },
  {
    id: 8,
    name: 'इंजमा ५२ चबळी माजगाव येथील रस्ता',
    vendor: null,
    scheme: 'ग्रामिण रस्ते विकास व मजबुतीकरण',
    limit: 3999459,
    sanctionedDate: '2024-02-28',
    financialYear: '2024-25',
    adminApprovedAmount: 3188000,
    workPortionAmount: 3188000,
    taxDeductionAmount: 0,
    status: 'Pending',
    vendorDetails: null
  },
  {
    id: 9,
    name: 'कवळे कडव ती रस्ता (मागणी क्र. १९२)',
    vendor: null,
    scheme: 'ग्रामिण रस्ते विकास व मजबुतीकरण',
    limit: 1799826,
    sanctionedDate: '2024-03-13',
    financialYear: '2024-25',
    adminApprovedAmount: 1440000,
    workPortionAmount: 1440000,
    taxDeductionAmount: 0,
    status: 'Pending',
    vendorDetails: null
  },
  {
    id: 10,
    name: 'कवळे हसेव ती रस्ता (मागणी क्र. १९१)',
    vendor: null,
    scheme: 'ग्रामिण रस्ते विकास व मजबुतीकरण',
    limit: 1652000,
    sanctionedDate: '2024-03-11',
    financialYear: '2024-25',
    adminApprovedAmount: 1322000,
    workPortionAmount: 1322000,
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
const statusSymbol: Record<string, string> = {
  Approved: "✔️",
  Pending:  "⏳",
  Rejected: "❌",
};
// Badge for status
const getStatusBadge = (status: string) => (
  <Badge variant={
    status === "Approved" ? "default" :
    status === "Pending" ? "secondary" :
    status === "Rejected" ? "destructive" : "secondary"
  }>
    {status}
  </Badge>
);

const FundDemand = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [works] = useState(dummyWorks);
  const [demands, setDemands] = useState(dummyDemands);

  // Filters
  const [fy, setFy] = useState<string>('all');
  const [scheme, setScheme] = useState<string>('all');
  const [work, setWork] = useState<string>('all');
  const [status, setStatus] = useState<string>('all');

  // For popups
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [selectedDemand, setSelectedDemand] = useState<any>(null);

  const addDemand = (demand: any) => setDemands([...demands, demand]);

  // Get filter values
  const fyList = useMemo(() => ["all", ...Array.from(new Set(works.map(w => w.financialYear)))], [works]);
  const schemeList = useMemo(() =>
    fy === 'all'
      ? ["all", ...Array.from(new Set(works.map(w => w.scheme)))]
      : ["all", ...Array.from(new Set(works.filter(w => w.financialYear === fy).map(w => w.scheme)))]
  , [works, fy]);
  const workList = useMemo(() =>
    scheme === 'all'
      ? ["all", ...Array.from(new Set(works.filter(w => fy === 'all' || w.financialYear === fy).map(w => w.name)))]
      : ["all", ...Array.from(new Set(works.filter(w => w.scheme === scheme).map(w => w.name)))]
  , [works, fy, scheme]);

  // Filtered Works
  const filteredWorks = works.filter(w =>
    (fy === 'all' || w.financialYear === fy) &&
    (scheme === 'all' || w.scheme === scheme) &&
    (work === 'all' || w.name === work)
  );

  // Filtered Demands
  const filteredDemands = demands.filter(d => {
    const workObj = works.find(w => w.id === d.workId);
    return (
      (fy === 'all' || workObj?.financialYear === fy) &&
      (scheme === 'all' || workObj?.scheme === scheme) &&
      (work === 'all' || workObj?.name === work) &&
      (status === 'all' || d.status === status)
    );
  });

  // Stats
  const stats = {
    totalWorks: filteredWorks.length,
    totalVendors: [...new Set(filteredWorks.map(w => w.vendor))].length,
    totalLimit: filteredWorks.reduce((acc, w) => acc + (w.limit ?? 0), 0),
    pendingDemands: filteredDemands.filter(d => d.status === 'Pending').length,
    approvedDemands: filteredDemands.filter(d => d.status === 'Approved').length,
    totalDemandAmount: filteredDemands.reduce((acc, d) => acc + (d.amount ?? 0), 0),
    totalDemandApproved: filteredDemands.filter(d => d.status === "Approved").reduce((acc, d) => acc + (d.amount ?? 0), 0)
  };

  return (
    <div className="space-y-6">
      {/* Demand Form Modal */}
      <FundDemandForm
        open={showForm}
        onClose={() => setShowForm(false)}
        work={selectedWork}
        demands={demands}
        addDemand={addDemand}
      />

      {/* Demand Details Modal */}
      <FundDemandDetails
        open={showDetails}
        onClose={() => setShowDetails(false)}
        demand={selectedDemand}
        work={selectedWork}
        vendor={selectedWork?.vendorDetails}
      />

      {/* FILTERS */}
      <div className="flex flex-wrap items-end gap-3 pb-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600">Financial Year</label>
          <select
            value={fy}
            onChange={e => { setFy(e.target.value); setScheme('all'); setWork('all'); }}
            className="block px-3 py-1.5 mt-1 border rounded-md w-40"
          >
            {fyList.map(opt => <option key={opt} value={opt}>{opt === 'all' ? 'All' : opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600">Scheme</label>
          <select
            value={scheme}
            onChange={e => { setScheme(e.target.value); setWork('all'); }}
            className="block px-3 py-1.5 mt-1 border rounded-md w-40"
          >
            {schemeList.map(opt => <option key={opt} value={opt}>{opt === 'all' ? 'All' : opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600">Work</label>
          <select
            value={work}
            onChange={e => setWork(e.target.value)}
            className="block px-3 py-1.5 mt-1 border rounded-md w-48"
          >
            {workList.map(opt => <option key={opt} value={opt}>{opt === 'all' ? 'All' : opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600">Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="block px-3 py-1.5 mt-1 border rounded-md w-32"
          >
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
  {[
    {
      label: "Total Works",
      value: stats.totalWorks,
      desc: "Works under selected filters",
    },
    {
      label: "Vendors Assigned",
      value: stats.totalVendors,
      desc: "Vendors mapped",
    },
    // {
    //   label: "Total Limit",
    //   value: `₹${(stats.totalLimit ?? 0).toLocaleString()}`,
    //   desc: "Works limit (filtered)",
    // },
    {
      label: "Total Demand Amount",
      value: `₹${(stats.totalDemandAmount ?? 0).toLocaleString()}`,
      desc: "Sum of all demands",
    },
    {
      label: "Approved Demand Amount",
      value: `₹${(stats.totalDemandApproved ?? 0).toLocaleString()}`,
      desc: "Sum of approved demands",
    },
    {
      label: " No of Pending Demands",
      value: stats.pendingDemands,
      desc: "Awaiting approval",
    },
  ].map((card, i) => (
    <Card
      key={i}
      className="h-full flex flex-col justify-between rounded-2xl shadow border border-gray-200 bg-white transition hover:shadow-lg"
    >
      <CardHeader className="pb-0 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold tracking-wide text-gray-700">
          {card.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center py-3">
        <div className="text-2xl font-extrabold text-primary mb-1">{card.value}</div>
        <div className="text-xs text-muted-foreground">{card.desc}</div>
      </CardContent>
    </Card>
  ))}
</div>


      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Sanctioned Works</TabsTrigger>
          <TabsTrigger value="pending">Pending Demands</TabsTrigger>
          <TabsTrigger value="approved">Approved Demands</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview">
          <div className="overflow-x-auto rounded-2xl shadow border border-gray-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Scheme</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Work Name</th>
                  {/* <th className="px-4 py-3 text-left font-semibold text-gray-700">Vendor</th> */}
                  {/* <th className="px-4 py-3 text-left font-semibold text-gray-700">Aadhar No</th> */}
                  {/* <th className="px-4 py-3 text-left font-semibold text-gray-700">Sanctioned Date</th> */}
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Fin. Year</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Admin Approved</th>
                  {/* <th className="px-4 py-3 text-right font-semibold text-gray-700">Portion Amt</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Tax/Deduction</th> */}
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Gross Total</th>
                  {/* <th className="px-4 py-3 text-right font-semibold text-gray-700">Work Limit</th> */}
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Total Demanded</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Balance Amt</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>

                </tr>
              </thead>
              <tbody>
                {filteredWorks.map((work, idx) => {
                  const workDemands = demands.filter((d) => d.workId === work.id);
                  const totalDemanded = workDemands.reduce((acc, d) => acc + (d.amount ?? 0), 0);
                  const grossTotal = (work.workPortionAmount ?? 0) + (work.taxDeductionAmount ?? 0);
                  const balanceAmount = grossTotal - totalDemanded;

                  return (
                    <tr
                      key={work.id}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-primary/5 transition border-b last:border-0`}
                    >
                      <td className="px-4 py-2">{work.scheme}</td>
                      <td className="px-4 py-2 font-medium text-gray-900">{work.name}</td>
                      {/* <td className="px-4 py-2">{work.vendorDetails?.name || work.vendor}</td> */}
                      {/* <td className="px-4 py-2">{work.vendorDetails?.aadhar || '3798431498'}</td>
                      <td className="px-4 py-2">{work.sanctionedDate}</td> */}
                      <td className="px-4 py-2">{work.financialYear}</td>
                      <td className="px-4 py-2 text-right">₹{(work.adminApprovedAmount ?? 0).toLocaleString()}</td>
                      {/* <td className="px-4 py-2 text-right">₹{(work.workPortionAmount ?? 0).toLocaleString()}</td>
                      <td className="px-4 py-2 text-right">₹{(work.taxDeductionAmount ?? 0).toLocaleString()}</td> */}
                      <td className="px-4 py-2 text-right">₹{(grossTotal ?? 0).toLocaleString()}</td>
                      {/* <td className="px-4 py-2 text-right">₹{(work.limit ?? 0).toLocaleString()}</td> */}
                      <td className="px-4 py-2 text-right">₹{(totalDemanded ?? 0).toLocaleString()}</td>
                      <td className="px-4 py-2 text-right font-semibold text-primary">
                        ₹{(balanceAmount ?? 0).toLocaleString()}
                      </td>
                      
<td className="px-4 py-2 text-center">
  <span
    className={`
      inline-block px-3 py-1 rounded-full text-xs font-semibold
      ${work.status === "Approved"
        ? "bg-green-100 text-green-700"
        : work.status === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
      }`}
    aria-label={work.status} // keep it accessible
  >
    {statusSymbol[work.status] || "❔"}
  </span>
</td>
                      <td className="px-4 py-2 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedWork(work);
                            setShowForm(true);
                          }}
                          className="w-full"
                        >
                          <FilePlus2 className="w-4 h-4 mr-1" /> Demand
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const demand = workDemands.slice(-1)[0];
                            setSelectedDemand(demand || null);
                            setSelectedWork(work);
                            setShowDetails(true);
                          }}
                          className="w-full"
                        >
                          <Eye className="w-4 h-4 mr-1" /> View
                        </Button>
                      </div>
                    </td>
                    </tr>
                  );
                })}
                {filteredWorks.length === 0 && (
                  <tr>
                    <td colSpan={15} className="text-center text-gray-400 py-6">
                      No works match the selected filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Pending Demands */}
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Demands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl shadow border border-gray-200 bg-white">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Demand ID</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Work Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Vendor</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Amount</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDemands.filter((d) => d.status === "Pending").map((demand, idx) => {
                      const workObj = works.find(w => w.id === demand.workId);
                      return (
                        <tr
                          key={demand.id}
                          className={`${
                            idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } hover:bg-primary/5 transition border-b last:border-0`}
                        >
                          <td className="px-4 py-2 font-medium text-gray-900">{demand.id}</td>
                          <td className="px-4 py-2">{demand.workName}</td>
                          <td className="px-4 py-2">{demand.vendor}</td>
                          <td className="px-4 py-2 text-right">₹{(demand.amount ?? 0).toLocaleString()}</td>
                          <td className="px-4 py-2 text-center">{getStatusBadge(demand.status)}</td>
                          <td className="px-4 py-2 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedDemand(demand);
                                setSelectedWork(workObj);
                                setShowDetails(true);
                              }}
                            >
                              <Eye className="w-4 h-4 mr-1" /> View
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredDemands.filter((d) => d.status === "Pending").length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center text-gray-400 py-6">
                          No pending demands
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Approved Demands */}
        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Demands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl shadow border border-gray-200 bg-white">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Demand ID</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Work Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Vendor</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Amount</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDemands.filter((d) => d.status === "Approved").map((demand, idx) => {
                      const workObj = works.find(w => w.id === demand.workId);
                      return (
                        <tr
                          key={demand.id}
                          className={`${
                            idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } hover:bg-primary/5 transition border-b last:border-0`}
                        >
                          <td className="px-4 py-2 font-medium text-gray-900">{demand.id}</td>
                          <td className="px-4 py-2">{demand.workName}</td>
                          <td className="px-4 py-2">{demand.vendor}</td>
                          <td className="px-4 py-2 text-right">₹{(demand.amount ?? 0).toLocaleString()}</td>
                          <td className="px-4 py-2 text-center">{getStatusBadge(demand.status)}</td>
                          <td className="px-4 py-2 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedDemand(demand);
                                setSelectedWork(workObj);
                                setShowDetails(true);
                              }}
                            >
                              <Eye className="w-4 h-4 mr-1" /> View
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredDemands.filter((d) => d.status === "Approved").length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center text-gray-400 py-6">
                          No approved demands
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FundDemand;
