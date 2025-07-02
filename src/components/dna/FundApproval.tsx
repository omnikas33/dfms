import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit3, Eye } from 'lucide-react';

// --- DUMMY DATA ---
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

const getStatusBadge = (status) => (
  <Badge variant={
    status === "Approved" ? "default" :
    status === "Pending" ? "secondary" :
    status === "Rejected" ? "destructive" : "secondary"
  }>
    {status}
  </Badge>
);

// --- SCRUTINY MODAL ---
const ScrutinyModal = ({ open, onClose, demand, work, onSave, viewOnly }) => {
  const [amount, setAmount] = useState(demand?.amount ?? 0);
  const [netPayable, setNetPayable] = useState(demand?.netPayable ?? 0);
  const [remarks, setRemarks] = useState(demand?.remarks ?? '');
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (demand) {
      setAmount(demand.amount);
      setNetPayable(demand.netPayable ?? demand.amount - (demand.taxes?.reduce((a, t) => a + (t.amount||0), 0) ?? 0));
      setRemarks(demand.remarks ?? "");
    }
  }, [demand]);

  if (!open || !demand || !work) return null;
  const totalTax = demand.taxes?.reduce((acc, t) => acc + (t.amount || 0), 0) ?? 0;

  const handleAmountChange = (val) => {
    setAmount(val);
    setNetPayable(val - totalTax);
  };

  const handleApprove = () => {
    if (amount <= 0) {
      setError("Amount must be positive");
      return;
    }
    onSave({ ...demand, amount, netPayable, remarks, status: "Approved" });
    onClose();
  };
  const handleReject = () => {
    onSave({ ...demand, amount, netPayable, remarks, status: "Rejected" });
    onClose();
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn">
        <Button variant="ghost" className="absolute top-3 right-3" onClick={onClose}>✕</Button>
        <h3 className="text-xl font-bold mb-4">Demand Scrutiny: <span className="text-primary">{demand.id}</span></h3>
        <div className="grid grid-cols-2 gap-4 text-xs mb-4">
          <div>
            <div className="font-semibold text-gray-500">Scheme</div>
            <div className="text-base font-semibold text-gray-800">{work.scheme}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-500">Work Name</div>
            <div className="text-base">{work.name}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-500">Fin. Year</div>
            <div>{work.financialYear}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-500">Sanctioned Date</div>
            <div>{work.sanctionedDate}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-500">Vendor</div>
            <div>{work.vendorDetails?.name || work.vendor}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-500">Aadhar</div>
            <div>{work.vendorDetails?.aadhar || '-'}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-xs mb-3">
          <div>
            <div className="font-semibold text-gray-500">Admin Approved</div>
            <div>₹{work.adminApprovedAmount?.toLocaleString()}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-500">Work Portion</div>
            <div>₹{work.workPortionAmount?.toLocaleString()}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-500">Tax/Deduction</div>
            <div>₹{work.taxDeductionAmount?.toLocaleString()}</div>
          </div>
        </div>
        <div className="mb-2 text-xs">
          <span className="font-semibold text-gray-500">Gross Total: </span>
          <span className="font-semibold text-primary">₹{(work.workPortionAmount + work.taxDeductionAmount).toLocaleString()}</span>
        </div>
        <hr className="my-2"/>
        <form
          onSubmit={e => { e.preventDefault(); handleApprove(); }}
          className="space-y-3"
        >
          <div>
            <label className="block text-xs font-semibold mb-1">Demand Amount</label>
            <input
              type="number"
              className="border rounded px-2 py-1 w-full text-base"
              min={0}
              value={amount}
              onChange={e => handleAmountChange(Number(e.target.value))}
              disabled={viewOnly}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Net Payable</label>
            <input
              type="number"
              className="border rounded px-2 py-1 w-full bg-gray-100"
              value={netPayable}
              disabled
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Taxes</label>
            <div>
              {demand.taxes && demand.taxes.length > 0
                ? demand.taxes.map((tax) => (
                  <span key={tax.id} className="mr-3">{tax.name}: ₹{tax.amount?.toLocaleString()}</span>
                ))
                : "—"
              }
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">District Remarks</label>
            <textarea
              className="border rounded px-2 py-1 w-full"
              rows={2}
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              placeholder="Add remarks (required for reject)"
              disabled={viewOnly}
            />
          </div>
          {error && <div className="text-xs text-red-600">{error}</div>}
          {!viewOnly &&
            <div className="flex justify-end gap-2 mt-3">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="default">Approve & Forward</Button>
              <Button type="button" variant="destructive" onClick={handleReject}>Reject</Button>
            </div>
          }
        </form>
      </div>
    </div>
  );
};

const DistrictFundApproval = () => {
  const [works] = useState(dummyWorks);
  const [demands, setDemands] = useState(dummyDemands);

  const [tab, setTab] = useState('pending');

  const [showScrutiny, setShowScrutiny] = useState(false);
  const [scrutinyDemand, setScrutinyDemand] = useState(null);
  const [scrutinyWork, setScrutinyWork] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);

  // Filter by status
  const filteredDemands = useMemo(() =>
    demands.filter(d => d.status === (tab === 'pending' ? 'Pending' : 'Approved')),
    [demands, tab]
  );

  // Scrutiny Save Handler
  const handleScrutinySave = (updatedDemand) => {
    setDemands(demands.map(d => d.id === updatedDemand.id ? updatedDemand : d));
  };

  return (
    <div className="space-y-8">
      <ScrutinyModal
        open={showScrutiny}
        onClose={() => setShowScrutiny(false)}
        demand={scrutinyDemand}
        work={scrutinyWork}
        onSave={handleScrutinySave}
        viewOnly={viewOnly}
      />

      <Card>
        <CardHeader>
          <CardTitle>Fund Demand Scrutiny</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="forwarded">Forwarded</TabsTrigger>
            </TabsList>
            <TabsContent value={tab}>
              <div className="overflow-x-auto rounded-2xl shadow border border-gray-200 bg-gray-50">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-center font-semibold">Action</th>
                      <th className="px-4 py-3 font-semibold">Demand ID</th>
                      <th className="px-4 py-3 font-semibold">Scheme</th>
                      <th className="px-4 py-3 font-semibold">Work Name</th>
                      <th className="px-4 py-3 font-semibold">Fin. Year</th>
                      <th className="px-4 py-3 font-semibold">Sanctioned Date</th>
                      <th className="px-4 py-3 font-semibold">Vendor</th>
                      <th className="px-4 py-3 font-semibold">Admin Approved</th>
                      <th className="px-4 py-3 font-semibold">Work Portion</th>
                      <th className="px-4 py-3 font-semibold">Tax/Deduction</th>
                      <th className="px-4 py-3 font-semibold">Gross Total</th>
                      <th className="px-4 py-3 font-semibold">Demand Amount</th>
                      <th className="px-4 py-3 font-semibold">Net Payable</th>
                      <th className="px-4 py-3 font-semibold">Remarks</th>
                      <th className="px-4 py-3 font-semibold text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDemands.map((demand, idx) => {
                      const workObj = works.find(w => w.id === demand.workId);
                      if (!workObj) return null;
                      const grossTotal = (workObj.workPortionAmount ?? 0) + (workObj.taxDeductionAmount ?? 0);

                      return (
                        <tr
                          key={demand.id}
                          className={`
                            ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                            hover:bg-primary/10 transition border-b last:border-0
                          `}
                        >
                          <td className="px-2 py-2 text-center">
                            {tab === 'pending' ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="mr-2"
                                onClick={() => {
                                  setScrutinyDemand(demand);
                                  setScrutinyWork(workObj);
                                  setViewOnly(false);
                                  setShowScrutiny(true);
                                }}
                              >
                                <Edit3 className="w-4 h-4 mr-1" /> Scrutiny
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setScrutinyDemand(demand);
                                  setScrutinyWork(workObj);
                                  setViewOnly(true);
                                  setShowScrutiny(true);
                                }}
                              >
                                <Eye className="w-4 h-4 mr-1" /> View
                              </Button>
                            )}
                          </td>
                          <td className="px-2 py-2 font-medium">{demand.id}</td>
                          <td className="px-2 py-2">{workObj.scheme}</td>
                          <td className="px-2 py-2">{workObj.name}</td>
                          <td className="px-2 py-2">{workObj.financialYear}</td>
                          <td className="px-2 py-2">{workObj.sanctionedDate}</td>
                          <td className="px-2 py-2">{workObj.vendorDetails?.name || workObj.vendor}</td>
                          <td className="px-2 py-2 text-right">₹{(workObj.adminApprovedAmount ?? 0).toLocaleString()}</td>
                          <td className="px-2 py-2 text-right">₹{(workObj.workPortionAmount ?? 0).toLocaleString()}</td>
                          <td className="px-2 py-2 text-right">₹{(workObj.taxDeductionAmount ?? 0).toLocaleString()}</td>
                          <td className="px-2 py-2 text-right">₹{(grossTotal ?? 0).toLocaleString()}</td>
                          <td className="px-2 py-2 text-right">₹{(demand.amount ?? 0).toLocaleString()}</td>
                          <td className="px-2 py-2 text-right">₹{(demand.netPayable ?? 0).toLocaleString()}</td>
                          <td className="px-2 py-2">{demand.remarks}</td>
                          <td className="px-2 py-2 text-center">{getStatusBadge(demand.status)}</td>
                        </tr>
                      );
                    })}
                    {filteredDemands.length === 0 && (
                      <tr>
                        <td colSpan={15} className="text-center text-gray-400 py-6">
                          No {tab === 'pending' ? "pending" : "forwarded"} demands
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DistrictFundApproval;
