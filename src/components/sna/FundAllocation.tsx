import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import FundAllocationForm from './FundAllocationForm';
import AllocationSummary from './AllocationSummary';
import AllocationHistory, { AllocationRecordType } from './AllocationHistory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';

const FundAllocation = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    district: '',
    amount: '',
    allocationDate: new Date().toISOString().split('T')[0],
    remarks: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [allocations, setAllocations] = useState<AllocationRecordType[]>([
    {
      id: '1',
      district: 'Mumbai City',
      amount: '5000000',
      allocationDate: '2024-06-15',
      remarks: 'Initial allocation for Q2 projects',
      status: 'Active'
    },
    {
      id: '2',
      district: 'Pune',
      amount: '3500000',
      allocationDate: '2024-06-10',
      remarks: 'Infrastructure development',
      status: 'Utilized'
    },
    {
      id: '3',
      district: 'Nagpur',
      amount: '2750000',
      allocationDate: '2024-06-08',
      remarks: 'Rural development projects',
      status: 'Active'
    }
  ]);

  // --- MLA Funds Data (local, as per request) ---
  const mlaFundsData = [
    {
      id: 1,
      mlaName: "Shri Ajay Deshmukh",
      constituency: "Pune Central",
      allocated: 50000000,      // 5 cr
      utilized: 37500000,       // 3.75 cr
      works: 23,
    },
    {
      id: 2,
      mlaName: "Smt. Sneha Jadhav",
      constituency: "Aurangabad South",
      allocated: 50000000,
      utilized: 41500000,
      works: 27,
    },
    {
      id: 3,
      mlaName: "Shri Vinod Patil",
      constituency: "Nagpur North",
      allocated: 50000000,
      utilized: 32850000,
      works: 19,
    },
  ];

  const formatCurrency = (amount: string | number) => {
    const numericAmount = typeof amount === 'string'
      ? parseFloat(amount.replace(/,/g, ''))
      : amount;
    if (isNaN(numericAmount)) return amount.toString();
    return numericAmount.toLocaleString('en-IN');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add new allocation to the list
    const newAllocation: AllocationRecordType = {
      id: Date.now().toString(),
      district: formData.district,
      amount: formData.amount,
      allocationDate: formData.allocationDate,
      remarks: formData.remarks,
      status: 'Active'
    };

    setAllocations(prev => [newAllocation, ...prev]);

    toast({
      title: "Fund Allocation Successful",
      description: `₹${formatCurrency(formData.amount)} allocated to ${formData.district} district.`,
    });

    // Reset form and close dialog
    setFormData({
      district: '',
      amount: '',
      allocationDate: new Date().toISOString().split('T')[0],
      remarks: ''
    });
    setIsDialogOpen(false);
    setIsSubmitting(false);
  };

  const handleDelete = (id: string) => {
    const allocation = allocations.find(a => a.id === id);
    if (allocation) {
      setAllocations(prev => prev.filter(a => a.id !== id));
      toast({
        title: "Allocation Deleted",
        description: `Fund allocation to ${allocation.district} has been removed.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fund Allocation</h1>
          <p className="text-gray-600">Allocate funds to district authorities</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#193A9A] hover:bg-[#142f7c] text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Fund Allocation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New Fund Allocation</DialogTitle>
            </DialogHeader>
            <FundAllocationForm
              formData={formData}
              isSubmitting={isSubmitting}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              formatCurrency={formatCurrency}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary */}
        <div className="lg:col-span-1">
          <AllocationSummary />
        </div>
        
        {/* Fund Allocation History */}
        <div className="lg:col-span-2">
          <AllocationHistory
            allocations={allocations}
            onDelete={handleDelete}
            formatCurrency={formatCurrency}
          />
        </div>
      </div>

      {/* MLA Funds Table (inline, not a separate component) */}
      {/* MLA Funds Table (with improved UI) */}
<Card className="shadow border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-100 mt-2">
  <CardHeader className="py-3 px-4 flex flex-col gap-1">
    <CardTitle className="text-base flex items-center gap-2">
      <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded">MLA</span>
      Maharashtra MLA Funds Mapping
    </CardTitle>
    <span className="text-xs text-gray-500 ml-7">Status of MLA fund allocation, utilization and works</span>
  </CardHeader>
  <CardContent className="p-0">
    <div className="w-full">
      <Table className="min-w-max text-xs">
        <TableHeader>
          <TableRow>
            <TableHead className="px-2 py-2">MLA</TableHead>
            <TableHead className="px-2 py-2">Constituency</TableHead>
            <TableHead className="px-2 py-2 text-right">Allocated Fund (₹)</TableHead>
            <TableHead className="px-2 py-2 text-right">Utilized (₹)</TableHead>
            <TableHead className="px-2 py-2 text-right">Remaining (₹)</TableHead>
            <TableHead className="px-2 py-2 text-center">Works</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mlaFundsData.map((mla) => {
            const remain = mla.allocated - mla.utilized;
            const lowFunds = remain < mla.allocated * 0.15;
            return (
              <TableRow
                key={mla.id}
                className="hover:bg-blue-50 transition-colors"
              >
                <TableCell className="flex items-center gap-2 px-2 py-2 whitespace-normal font-medium">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-200 text-blue-700 font-bold text-xs">
                    {
                      mla.mlaName.split(' ')
                        .map(word => word[0])
                        .join('')
                        .substring(0, 2)
                        .toUpperCase()
                    }
                  </span>
                  {mla.mlaName}
                </TableCell>
                <TableCell className="px-2 py-2">{mla.constituency}</TableCell>
                <TableCell className="px-2 py-2 text-right font-semibold text-blue-900">
                  ₹{formatCurrency(mla.allocated)}
                </TableCell>
                <TableCell className="px-2 py-2 text-right">
                  <span className="inline-block bg-green-50 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                    ₹{formatCurrency(mla.utilized)}
                  </span>
                </TableCell>
                <TableCell className={`px-2 py-2 text-right font-semibold ${lowFunds ? "text-red-700" : "text-green-700"}`}>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${lowFunds ? "bg-red-100" : "bg-green-100"}`}>
                    ₹{formatCurrency(remain)}
                  </span>
                </TableCell>
                <TableCell className="px-2 py-2 text-center">
                  <span className="inline-block bg-blue-100 text-blue-700 font-semibold rounded px-2 py-0.5">
                    {mla.works}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  </CardContent>
</Card>

    </div>
  );
};

export default FundAllocation;
