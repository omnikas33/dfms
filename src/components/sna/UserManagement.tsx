import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Eye, Check, X, User } from 'lucide-react';

const statCards = [
  { title: 'Total Work Demand', value: '103', bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  { title: "Today's Work Demands", value: '03', bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  { title: 'Pending Work Demands', value: '113', bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  { title: 'Fund Processed', value: '₹403 Cr', bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
];

const districts = ['All', 'Pune', 'Khed', 'Shirur', 'Ambegaon'];
const schemes = ['All', '30543611 ग्रामीण रस्ते विकास व मजबुतीकरण'];
const works = ['All', 'Road Improvement', 'Bridge Repair', 'Village Road'];

const demandsData = [
  {
    id: 1, district: 'Shirur', scheme: '30543611', work: 'जांबुत ते चांडोह रस्ता सुधारणा', aaAmount: 2500000, woAmount: 2400000, demandAmount: 1558000, paymentType: 'partial', status: 'pending', vendor: 'M/s ABC Infra', taxCompartment: 'TDS 2%',
  },
  {
    id: 2, district: 'Ambegaon', scheme: '30543611', work: 'जाधववाडी द मंदिर माग रांजणी रस्ता', aaAmount: 2499999, woAmount: 2400000, demandAmount: 1600000, paymentType: 'partial', status: 'pending', vendor: 'M/s Ranjani Works', taxCompartment: 'GST 18%',
  },
  {
    id: 3, district: 'Ambegaon', scheme: '30543611', work: 'खडक ते जोगिवहीर फाटा रस्ता', aaAmount: 1999993, woAmount: 1800000, demandAmount: 1223000, paymentType: 'full', status: 'approved', vendor: 'M/s Khadak Constructions', taxCompartment: 'TDS 1%',
  },
  {
    id: 4, district: 'Khed', scheme: '30543611', work: 'तोरणे ते आढे बु||, रस्ता सुधारणा', aaAmount: 3000000, woAmount: 2750000, demandAmount: 2839000, paymentType: 'partial', status: 'pending', vendor: 'M/s Torane Builders', taxCompartment: 'GST 18%',
  },
  {
    id: 5, district: 'Khed', scheme: '30543611', work: 'इजमा ५२ चबळी माजगाव रस्ता', aaAmount: 3999459, woAmount: 3783484, demandAmount: 3188000, paymentType: 'spill', status: 'pending', vendor: 'M/s Chabali Infra', taxCompartment: 'TDS 2%',
  },
];

const paymentTypeColors: any = {
  partial: 'bg-yellow-100 text-yellow-700',
  full: 'bg-green-100 text-green-700',
  spill: 'bg-blue-100 text-blue-700',
};
const statusBadgeColors: any = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const DashboardWorkDemand = () => {
  const [filterDistrict, setFilterDistrict] = useState('All');
  const [filterScheme, setFilterScheme] = useState('All');
  const [filterWork, setFilterWork] = useState('All');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredRows = useMemo(
    () => demandsData.filter((row) =>
      (filterDistrict === 'All' || row.district === filterDistrict) &&
      (filterScheme === 'All' || row.scheme === filterScheme) &&
      (filterWork === 'All' || row.work === filterWork)
    ),
    [filterDistrict, filterScheme, filterWork]
  );

  const footerTotals = useMemo(() => {
    return filteredRows.reduce((totals, row) => ({
      aaAmount: totals.aaAmount + (row.aaAmount || 0),
      woAmount: totals.woAmount + (row.woAmount || 0),
      demandAmount: totals.demandAmount + (row.demandAmount || 0),
    }), { aaAmount: 0, woAmount: 0, demandAmount: 0 });
  }, [filteredRows]);

  const selectedDemandSum = useMemo(() =>
    demandsData
      .filter((row) => selectedIds.includes(row.id))
      .reduce((sum, row) => sum + (row.demandAmount || 0), 0),
    [selectedIds]
  );

  const allVisibleIds = filteredRows.map((r) => r.id);
  const isAllSelected = allVisibleIds.length > 0 && allVisibleIds.every((id) => selectedIds.includes(id));
  const handleSelectAll = () => {
    setSelectedIds(isAllSelected ? selectedIds.filter(id => !allVisibleIds.includes(id)) : Array.from(new Set([...selectedIds, ...allVisibleIds])));
  };
  const handleSelectOne = (id: number) => {
    setSelectedIds(selectedIds.includes(id) ? selectedIds.filter(i => i !== id) : [...selectedIds, id]);
  };

  const handleView = (id: number) => alert('Viewing demand ID: ' + id);
  const handleApprove = (id: number) => alert('Approved demand ID: ' + id);
  const handleReject = (id: number) => alert('Rejected demand ID: ' + id);
  const handleVendorView = (id: number) => {
    const demand = demandsData.find(d => d.id === id);
    alert(`Vendor Details:\nVendor: ${demand?.vendor}`);
  };
  const handlePay = () => {
    alert(`Paying demands: ${selectedIds.join(', ')}\nTotal Demand: ₹${selectedDemandSum.toLocaleString()}`);
  };

  return (
    <div className="space-y-5">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statCards.map((stat, idx) => (
          <Card key={idx} className={`border ${stat.border} ${stat.bg} shadow-none`}>
            <CardContent className="flex flex-col items-center justify-center py-2 px-1">
              <p className={`text-xs font-semibold ${stat.text}`}>{stat.title}</p>
              <p className={`text-lg font-bold mt-1 ${stat.text}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-end px-1">
        <div className="w-32">
          <label className="block text-[10px] font-semibold mb-1 text-gray-600">District</label>
          <Select value={filterDistrict} onValueChange={setFilterDistrict}>
            <SelectTrigger className="h-7 text-xs">
              <SelectValue placeholder="District" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((d) => (
                <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-40">
          <label className="block text-[10px] font-semibold mb-1 text-gray-600">Scheme</label>
          <Select value={filterScheme} onValueChange={setFilterScheme}>
            <SelectTrigger className="h-7 text-xs">
              <SelectValue placeholder="Scheme" />
            </SelectTrigger>
            <SelectContent>
              {schemes.map((s) => (
                <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-36">
          <label className="block text-[10px] font-semibold mb-1 text-gray-600">Work</label>
          <Select value={filterWork} onValueChange={setFilterWork}>
            <SelectTrigger className="h-7 text-xs">
              <SelectValue placeholder="Work" />
            </SelectTrigger>
            <SelectContent>
              {works.map((w) => (
                <SelectItem key={w} value={w} className="text-xs">{w}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-2 ml-auto">
          {selectedIds.length > 0 && (
            <span className="font-semibold text-xs text-green-800 bg-green-100 px-2 py-1 rounded-lg">
              Selected Total: ₹{selectedDemandSum.toLocaleString()}
            </span>
          )}
          <Button
            className="px-4 h-7 bg-green-600 text-white text-xs font-semibold rounded shadow"
            disabled={selectedIds.length === 0}
            onClick={handlePay}
          >
            Pay
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table className="min-w-max">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-8 px-1 py-1 text-xs text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      className="accent-blue-600 w-3 h-3 rounded"
                    />
                  </TableHead>
                  <TableHead className="px-1 py-1 text-xs whitespace-normal">District</TableHead>
                  <TableHead className="px-1 py-1 text-xs whitespace-normal">Scheme</TableHead>
                  <TableHead className="px-1 py-1 text-xs whitespace-normal">Work</TableHead>
                  <TableHead className="px-1 py-1 text-xs whitespace-normal">AA Amt</TableHead>
                  <TableHead className="px-1 py-1 text-xs whitespace-normal">WO Amt</TableHead>
                  <TableHead className="px-1 py-1 text-xs whitespace-normal">Demand Amt</TableHead>
                  <TableHead className="px-1 py-1 text-xs whitespace-normal">Payment</TableHead>
                  <TableHead className="px-1 py-1 text-xs whitespace-normal">Vendor</TableHead>
                  <TableHead className="px-1 py-1 text-xs whitespace-normal">Tax</TableHead>
                  <TableHead className="px-1 py-1 text-xs whitespace-normal">Status</TableHead>
                  <TableHead className="px-1 py-1 text-xs text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center py-2 text-gray-400 text-xs">
                      No demands found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRows.map((row) => (
                    <TableRow key={row.id} className={selectedIds.includes(row.id) ? 'bg-blue-50' : ''}>
                      <TableCell className="text-center px-1 py-1">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(row.id)}
                          onChange={() => handleSelectOne(row.id)}
                          className="accent-blue-600 w-3 h-3 rounded"
                        />
                      </TableCell>
                      <TableCell className="text-xs px-1 py-1 whitespace-normal">{row.district}</TableCell>
                      <TableCell className="text-xs px-1 py-1 whitespace-normal">{row.scheme}</TableCell>
                      <TableCell className="text-xs px-1 py-1 whitespace-normal">{row.work}</TableCell>
                      <TableCell className="text-xs px-1 py-1 whitespace-normal">₹{row.aaAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-xs px-1 py-1 whitespace-normal">₹{row.woAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-xs px-1 py-1 whitespace-normal">₹{row.demandAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-xs px-1 py-1 whitespace-normal">
                        <span className={`inline-block rounded px-1 py-0.5 text-[10px] font-medium ${paymentTypeColors[row.paymentType]}`}>
                          {row.paymentType.charAt(0).toUpperCase() + row.paymentType.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs px-1 py-1 whitespace-normal">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-violet-300 text-violet-700 hover:bg-violet-50 h-6 px-2 text-xs"
                          onClick={() => handleVendorView(row.id)}
                          title="View Vendor"
                        >
                          <User className="w-3 h-3 mr-1" /> View
                        </Button>
                      </TableCell>
                      <TableCell className="text-xs px-1 py-1 whitespace-normal">
                        <span className="inline-block rounded px-1 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-700">
                          {row.taxCompartment}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs px-1 py-1 whitespace-normal">
                        <span className={`inline-block rounded px-1 py-0.5 text-[10px] font-medium ${statusBadgeColors[row.status]}`}>
                          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center px-1 py-1">
                        <div className="flex gap-1 justify-center">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-300 text-blue-700 hover:bg-blue-100 h-6 px-2 text-xs"
                            onClick={() => handleView(row.id)}
                            title="View"
                          >
                            <Eye className="w-3 h-3 mr-0.5" /> View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-300 text-green-700 hover:bg-green-100 h-6 px-2 text-xs"
                            onClick={() => handleApprove(row.id)}
                            title="Approve"
                          >
                            <Check className="w-3 h-3 mr-0.5" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-700 hover:bg-red-100 h-6 px-2 text-xs"
                            onClick={() => handleReject(row.id)}
                            title="Reject"
                          >
                            <X className="w-3 h-3 mr-0.5" /> Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                {/* Table Footer for totals */}
                {filteredRows.length > 0 && (
                  <TableRow className="font-bold bg-blue-100 text-xs">
                    <TableCell colSpan={4} className="text-right px-1 py-1">Total:</TableCell>
                    <TableCell className="px-1 py-1">₹{footerTotals.aaAmount.toLocaleString()}</TableCell>
                    <TableCell className="px-1 py-1">₹{footerTotals.woAmount.toLocaleString()}</TableCell>
                    <TableCell className="px-1 py-1">₹{footerTotals.demandAmount.toLocaleString()}</TableCell>
                    <TableCell colSpan={5}></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardWorkDemand;
