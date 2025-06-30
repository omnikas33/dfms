import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AllocationSummary from './AllocationSummary';
import AllocationHistory, { AllocationRecordType } from './AllocationHistory';

interface Scheme {
  id: string;
  name: string;
  code: string;
  description: string;
}

interface FundAllocationProps {
  initialSchemes?: Scheme[];
  initialAllocations?: AllocationRecordType[];
}

const districts = [
  'Mumbai City',
  'Pune',
  'Nagpur',
  'Thane',
  'Nashik',
  'Aurangabad'
];

const FundAllocation: React.FC<FundAllocationProps> = ({
  initialSchemes = [],
  initialAllocations = []
}) => {
  const { toast } = useToast();

  // 1️⃣ Change here: now have both schemes and setSchemes  
  const [schemes, setSchemes] = useState<Scheme[]>(initialSchemes);
  const [allocations, setAllocations] = useState<AllocationRecordType[]>(initialAllocations);

  const [allocForm, setAllocForm] = useState({
    schemeId: '',
    district: '',
    amount: '',
    allocationDate: new Date().toISOString().split('T')[0],
    utilizationEndDate: new Date().toISOString().split('T')[0],
    remarks: ''
  });
  const [schemeForm, setSchemeForm] = useState({
    name: '',
    code: '',
    description: ''
  });

  const [isAllocSubmitting, setIsAllocSubmitting] = useState(false);
  const [isSchemeSubmitting, setIsSchemeSubmitting] = useState(false);
  const [isAllocDialogOpen, setIsAllocDialogOpen] = useState(false);
  const [isSchemeDialogOpen, setIsSchemeDialogOpen] = useState(false);

  const handleAllocChange = (field: string, value: string) => {
    setAllocForm(prev => ({ ...prev, [field]: value }));
  };
  const handleSchemeChange = (field: string, value: string) => {
    setSchemeForm(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amt: string) => {
    const num = parseFloat(amt);
    return isNaN(num) ? amt : num.toLocaleString('en-IN');
  };

  const handleAllocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAllocSubmitting(true);
    const { schemeId, district, amount, allocationDate, utilizationEndDate, remarks } = allocForm;
    const scheme = schemes.find(s => s.id === schemeId);
    const newAlloc: AllocationRecordType = {
      id: Date.now().toString(),
      schemeName: scheme?.name || '',
      district,
      amount,
      allocationDate,
      utilizationEndDate,
      remarks,
      status: 'Active'
    };
    setTimeout(() => {
      setAllocations(prev => [newAlloc, ...prev]);
      toast({
        title: 'Allocation Successful',
        description: `₹${formatCurrency(amount)} allocated to ${district} under scheme ${scheme?.name}.`
      });
      setAllocForm({
        schemeId: '',
        district: '',
        amount: '',
        allocationDate: new Date().toISOString().split('T')[0],
        utilizationEndDate: new Date().toISOString().split('T')[0],
        remarks: ''
      });
      setIsAllocSubmitting(false);
      setIsAllocDialogOpen(false);
    }, 500);
  };

  const handleSchemeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSchemeSubmitting(true);

    // build the new scheme object
    const newScheme: Scheme = {
      id: Date.now().toString(),
      name: schemeForm.name,
      code: schemeForm.code,
      description: schemeForm.description
    };

    setTimeout(() => {
      // 2️⃣ Push it into state so it appears in your allocation dropdown
      setSchemes(prev => [...prev, newScheme]);

      toast({
        title: 'Scheme Added',
        description: `Scheme "${newScheme.name}" has been created.`
      });

      // reset form + close
      setSchemeForm({ name: '', code: '', description: '' });
      setIsSchemeSubmitting(false);
      setIsSchemeDialogOpen(false);
    }, 500);
  };

  const handleDeleteAlloc = (id: string) => {
    setAllocations(prev => prev.filter(a => a.id !== id));
    toast({ title: 'Allocation Deleted', variant: 'destructive' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fund Allocation</h1>
          <p className="text-gray-600">Allocate funds to districts or manage schemes</p>
        </div>
        <div className="flex gap-2">
          {/* Add Scheme Dialog */}
          <Dialog open={isSchemeDialogOpen} onOpenChange={setIsSchemeDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Scheme
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Scheme Master</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSchemeSubmit} className="space-y-4 p-4">
                <div>
                  <Label htmlFor="scheme_name">Name</Label>
                  <Input id="scheme_name" value={schemeForm.name} onChange={e => handleSchemeChange('name', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="scheme_code">Code</Label>
                  <Input id="scheme_code" value={schemeForm.code} onChange={e => handleSchemeChange('code', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={schemeForm.description} onChange={e => handleSchemeChange('description', e.target.value)} />
                </div>
                <Button type="submit" disabled={isSchemeSubmitting} className="w-full">
                  {isSchemeSubmitting ? 'Adding...' : 'Add Scheme'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* New Allocation Dialog */}
          <Dialog open={isAllocDialogOpen} onOpenChange={setIsAllocDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#193A9A] hover:bg-[#142f7c] text-white">
                <Plus className="h-4 w-4 mr-1" />
                New Allocation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>New Fund Allocation</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAllocSubmit} className="space-y-4 p-4">
                <div>
                  <Label htmlFor="scheme_select">Scheme</Label>
                  <Select id="scheme_select" value={allocForm.schemeId} onValueChange={val => handleAllocChange('schemeId', val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      {schemes.map(s => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="district_select">District</Label>
                  <Select id="district_select" value={allocForm.district} onValueChange={val => handleAllocChange('district', val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map(d => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input id="amount" type="number" value={allocForm.amount} onChange={e => handleAllocChange('amount', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="utilizationEndDate">Utilization End Date</Label>
                  <Input
                    id="utilizationEndDate"
                    type="date"
                    value={allocForm.utilizationEndDate}
                    onChange={e => handleAllocChange('utilizationEndDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="remarks">Remarks</Label>
                  <Input id="remarks" value={allocForm.remarks} onChange={e => handleAllocChange('remarks', e.target.value)} />
                </div>
                <Button type="submit" disabled={isAllocSubmitting} className="w-full">
                  {isAllocSubmitting ? 'Allocating...' : 'Allocate'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AllocationSummary />
        </div>
        <div className="lg:col-span-2">
          <AllocationHistory
            allocations={allocations}
            onDelete={handleDeleteAlloc}
            formatCurrency={formatCurrency}
          />
        </div>
      </div>
    </div>
  );
};

export default FundAllocation;
