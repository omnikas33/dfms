
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import FundAllocationForm from './FundAllocationForm';
import AllocationSummary from './AllocationSummary';
import AllocationHistory, { AllocationRecordType } from './AllocationHistory';

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

  const formatCurrency = (amount: string) => {
    if (!amount) return '';
    const numericAmount = parseFloat(amount.replace(/,/g, ''));
    if (isNaN(numericAmount)) return amount;
    return numericAmount.toLocaleString('en-IN');
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
    </div>
  );
};

export default FundAllocation;
