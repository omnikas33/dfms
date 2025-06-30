
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeftRight, Plus } from 'lucide-react';
import ReturnFundsForm from './ReturnFundsForm';
import ReturnFundsHistory from './ReturnFundsHistory';
import ReturnFundsSummary from './ReturnFundsSummary';

export interface ReturnFundRecord {
  id: string;
  idaName: string;
  returnAmount: string;
  returnDate: string;
  bankAccountNumber: string;
  ifscCode: string;
  utrNumber: string;
  attachments: string[];
  status: 'Pending' | 'Processing' | 'Completed' | 'Rejected';
  submittedDate: string;
  remarks?: string;
}

const ReturnFunds = () => {
  const [returnRecords, setReturnRecords] = useState<ReturnFundRecord[]>([
    {
      id: '1',
      idaName: 'Mumbai IDA',
      returnAmount: '15000000',
      returnDate: '2024-01-15',
      bankAccountNumber: '1234567890123456',
      ifscCode: 'SBIN0001234',
      utrNumber: 'UTR2024011512345',
      attachments: ['bank_closure_cert.pdf', 'dna_certificate.pdf'],
      status: 'Completed',
      submittedDate: '2024-01-10',
      remarks: 'Project completed successfully'
    },
    {
      id: '2',
      idaName: 'Pune IDA',
      returnAmount: '8500000',
      returnDate: '2024-01-20',
      bankAccountNumber: '9876543210987654',
      ifscCode: 'HDFC0001234',
      utrNumber: 'UTR2024012012345',
      attachments: ['bank_closure_cert.pdf'],
      status: 'Processing',
      submittedDate: '2024-01-18',
    }
  ]);

  const handleSubmitReturn = (data: Omit<ReturnFundRecord, 'id' | 'status' | 'submittedDate'>) => {
    const newRecord: ReturnFundRecord = {
      ...data,
      id: Date.now().toString(),
      status: 'Pending',
      submittedDate: new Date().toISOString().split('T')[0]
    };
    setReturnRecords(prev => [newRecord, ...prev]);
  };

  const handleDeleteRecord = (id: string) => {
    setReturnRecords(prev => prev.filter(record => record.id !== id));
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
    }).format(parseFloat(amount));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <ArrowLeftRight className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Return Funds</h1>
          <p className="text-gray-600 mt-1">Process fund returns from IDAs back to SNA</p>
        </div>
      </div>

      {/* Summary Cards */}
      <ReturnFundsSummary records={returnRecords} formatCurrency={formatCurrency} />

      {/* Main Content */}
      <Tabs defaultValue="new-return" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new-return" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Return
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4" />
            Return History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new-return">
          <ReturnFundsForm onSubmit={handleSubmitReturn} />
        </TabsContent>

        <TabsContent value="history">
          <ReturnFundsHistory 
            records={returnRecords}
            onDelete={handleDeleteRecord}
            formatCurrency={formatCurrency}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReturnFunds;
