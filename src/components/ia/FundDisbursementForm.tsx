import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FundDisbursementFormProps {
  onCancel: () => void;
  disbursement?: any;
}

const schemeOptions = [
  { id: '1', name: 'Scheme A' },
  { id: '2', name: 'Scheme B' },
];

const vendorOptions = [
  { id: 'v1', name: 'Vendor 1' },
  { id: 'v2', name: 'Vendor 2' },
];

const entityTypeOptions = [
  { id: 'internal', label: 'Internal' },
  { id: 'external', label: 'External' },
];

const FundDisbursementForm: React.FC<FundDisbursementFormProps> = ({
  onCancel,
  disbursement
}) => {
  const { toast } = useToast();

  // Auto‐generated IDs
  const [workId]   = useState(() => disbursement?.workId   || `W-${Date.now()}`);
  const [demandId] = useState(() => disbursement?.demandId || `D-${Date.now()}`);

  // Files
  const [documents, setDocuments] = useState<File[]>(disbursement?.documents || []);

  // Form state
  const [formData, setFormData] = useState({
    // Work details
    schemeId: disbursement?.schemeId || '',
    workTitle: disbursement?.workTitle || '',
    workDescription: disbursement?.workDescription || '',
    startDate: disbursement?.startDate || '',
    endDate: disbursement?.endDate || '',
    estimatedExpenses: disbursement?.estimatedExpenses || 0,
    expensesTillDate: disbursement?.expensesTillDate || 0,
    expensesInProgress: disbursement?.expensesInProgress || 0,
    remainingExpenses: 0,
    activity: disbursement?.activity || '',
    sanctionDate: disbursement?.sanctionDate || '',
    paymentType: disbursement?.paymentType || 'final',

    // Demand details
    financialYear: disbursement?.financialYear || '',
    entityTypeOfPayment: disbursement?.entityTypeOfPayment || '',
    demandActivity: disbursement?.demandActivity || '',
    demandWorkTitle: disbursement?.demandWorkTitle || '',
    demandWorkDescription: disbursement?.demandWorkDescription || '',
    demandStartDate: disbursement?.demandStartDate || '',
    demandEndDate: disbursement?.demandEndDate || '',
    demandSanctionDate: disbursement?.demandSanctionDate || '',
    demandEstimatedExpenses: disbursement?.demandEstimatedExpenses || 0,
    demandExpensesTillDate: disbursement?.demandExpensesTillDate || 0,
    demandExpensesInProgress: disbursement?.demandExpensesInProgress || 0,
    demandRemainingExpenses: 0,
    demandPaymentType: disbursement?.demandPaymentType || 'partial',
    vendorId: disbursement?.vendorId || '',
  });

  // Recalculate remaining expenses for both sections
  useEffect(() => {
    const rem = formData.estimatedExpenses
      - (formData.expensesTillDate + formData.expensesInProgress);
    const demRem = formData.demandEstimatedExpenses
      - (formData.demandExpensesTillDate + formData.demandExpensesInProgress);

    setFormData(fd => ({
      ...fd,
      remainingExpenses: rem >= 0 ? rem : 0,
      demandRemainingExpenses: demRem >= 0 ? demRem : 0
    }));
  }, [
    formData.estimatedExpenses,
    formData.expensesTillDate,
    formData.expensesInProgress,
    formData.demandEstimatedExpenses,
    formData.demandExpensesTillDate,
    formData.demandExpensesInProgress
  ]);

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setDocuments(Array.from(e.target.files));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.workTitle || !formData.demandWorkTitle) {
      toast({
        title: 'Validation Error',
        description: 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }

    // Submit payload
    const payload = {
      workId,
      demandId,
      ...formData,
      documents
    };

    // TODO: send payload to API
    console.log('Submitting', payload);
    toast({ title: 'Success', description: 'Data submitted successfully' });
    onCancel();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{disbursement ? 'Edit' : 'Add'} Work & Demand</CardTitle>
        <CardDescription>Enter work, demand and document details</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="work" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="work">Work Details</TabsTrigger>
            <TabsTrigger value="demand">Demand Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Work Details */}
          <TabsContent value="work" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Work ID</Label>
                <Input value={workId} disabled />
              </div>
              <div>
                <Label htmlFor="schemeId">Scheme</Label>
                <Select
                  value={formData.schemeId}
                  onValueChange={val => handleChange('schemeId', val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    {schemeOptions.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="workTitle">Work Title</Label>
                <Input
                  id="workTitle"
                  value={formData.workTitle}
                  onChange={e => handleChange('workTitle', e.target.value)}
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <Label htmlFor="workDescription">Work Description</Label>
                <Textarea
                  id="workDescription"
                  value={formData.workDescription}
                  onChange={e => handleChange('workDescription', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={e => handleChange('startDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={e => handleChange('endDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="estimatedExpenses">Estimated Expenses</Label>
                <Input
                  id="estimatedExpenses"
                  type="number"
                  value={formData.estimatedExpenses}
                  onChange={e => handleChange('estimatedExpenses', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="expensesTillDate">Expenses Till Date</Label>
                <Input
                  id="expensesTillDate"
                  type="number"
                  value={formData.expensesTillDate}
                  onChange={e => handleChange('expensesTillDate', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="expensesInProgress">Expenses In Progress</Label>
                <Input
                  id="expensesInProgress"
                  type="number"
                  value={formData.expensesInProgress}
                  onChange={e => handleChange('expensesInProgress', Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Remaining Expenses</Label>
                <Input value={formData.remainingExpenses} disabled />
              </div>
              <div>
                <Label htmlFor="activity">Activity</Label>
                <Input
                  id="activity"
                  value={formData.activity}
                  onChange={e => handleChange('activity', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="sanctionDate">Sanction Date</Label>
                <Input
                  id="sanctionDate"
                  type="date"
                  value={formData.sanctionDate}
                  onChange={e => handleChange('sanctionDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="paymentType">Payment Type</Label>
                <Select
                  value={formData.paymentType}
                  onValueChange={val => handleChange('paymentType', val)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="final">Final</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Demand Details */}
          <TabsContent value="demand" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Demand ID</Label>
                <Input value={demandId} disabled />
              </div>
              <div>
                <Label htmlFor="financialYear">Financial Year</Label>
                <Input
                  id="financialYear"
                  value={formData.financialYear}
                  onChange={e => handleChange('financialYear', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="entityTypeOfPayment">Entity Type of Payment</Label>
                <Select
                  value={formData.entityTypeOfPayment}
                  onValueChange={val => handleChange('entityTypeOfPayment', val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {entityTypeOptions.map(opt => (
                      <SelectItem key={opt.id} value={opt.id}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="demandActivity">Activity</Label>
                <Input
                  id="demandActivity"
                  value={formData.demandActivity}
                  onChange={e => handleChange('demandActivity', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="demandWorkTitle">Work Title</Label>
                <Input
                  id="demandWorkTitle"
                  value={formData.demandWorkTitle}
                  onChange={e => handleChange('demandWorkTitle', e.target.value)}
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <Label htmlFor="demandWorkDescription">Work Description</Label>
                <Textarea
                  id="demandWorkDescription"
                  value={formData.demandWorkDescription}
                  onChange={e => handleChange('demandWorkDescription', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="demandStartDate">Start Date</Label>
                <Input
                  id="demandStartDate"
                  type="date"
                  value={formData.demandStartDate}
                  onChange={e => handleChange('demandStartDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="demandEndDate">End Date</Label>
                <Input
                  id="demandEndDate"
                  type="date"
                  value={formData.demandEndDate}
                  onChange={e => handleChange('demandEndDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="demandSanctionDate">Sanction Date</Label>
                <Input
                  id="demandSanctionDate"
                  type="date"
                  value={formData.demandSanctionDate}
                  onChange={e => handleChange('demandSanctionDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="demandEstimatedExpenses">Estimated Expenses</Label>
                <Input
                  id="demandEstimatedExpenses"
                  type="number"
                  value={formData.demandEstimatedExpenses}
                  onChange={e => handleChange('demandEstimatedExpenses', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="demandExpensesTillDate">Expenses Till Date</Label>
                <Input
                  id="demandExpensesTillDate"
                  type="number"
                  value={formData.demandExpensesTillDate}
                  onChange={e => handleChange('demandExpensesTillDate', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="demandExpensesInProgress">Expenses In Progress</Label>
                <Input
                  id="demandExpensesInProgress"
                  type="number"
                  value={formData.demandExpensesInProgress}
                  onChange={e => handleChange('demandExpensesInProgress', Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Remaining Expenses</Label>
                <Input value={formData.demandRemainingExpenses} disabled />
              </div>
              <div>
                <Label htmlFor="demandPaymentType">Payment Type</Label>
                <Select
                  value={formData.demandPaymentType}
                  onValueChange={val => handleChange('demandPaymentType', val)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="final">Final</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="vendorId">Vendor</Label>
                <Select
                  value={formData.vendorId}
                  onValueChange={val => handleChange('vendorId', val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendorOptions.map(v => (
                      <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Documents */}
          <TabsContent value="documents" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-10 w-10 mx-auto mb-2 text-gray-400" />
              <p className="mb-2 text-gray-600">Upload supporting documents</p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full cursor-pointer text-sm text-gray-600"
              />
            </div>
            {documents.length > 0 && (
              <div>
                <Label>Selected Files:</Label>
                <ul className="list-disc list-inside text-sm">
                  {documents.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>{disbursement ? 'Update' : 'Create'}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundDisbursementForm;
