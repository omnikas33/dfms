
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, CreditCard, Clock, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import FundDisbursementForm from './FundDisbursementForm';
import FundDisbursementList from './FundDisbursementList';
import FundDisbursementMasterData from './FundDisbursementMasterData';

const FundDisbursement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data for statistics
  const stats = {
    totalDisbursements: 156,
    pendingDisbursements: 23,
    completedDisbursements: 98,
    rejectedDisbursements: 12,
    totalAmount: 25600000,
    pendingAmount: 3200000
  };

  const recentDisbursements = [
    {
      id: 1,
      referenceNo: 'FD-2024-001',
      beneficiary: 'ABC Construction Ltd',
      amount: 500000,
      purpose: 'Road Construction Project',
      status: 'Pending',
      date: '2024-01-15'
    },
    {
      id: 2,
      referenceNo: 'FD-2024-002',
      beneficiary: 'XYZ Infrastructure',
      amount: 750000,
      purpose: 'Bridge Development',
      status: 'Completed',
      date: '2024-01-14'
    },
    {
      id: 3,
      referenceNo: 'FD-2024-003',
      beneficiary: 'PQR Contractors',
      amount: 300000,
      purpose: 'School Building',
      status: 'In Progress',
      date: '2024-01-13'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Pending': { variant: 'secondary' as const, icon: Clock },
      'In Progress': { variant: 'default' as const, icon: CreditCard },
      'Completed': { variant: 'default' as const, icon: CheckCircle },
      'Rejected': { variant: 'destructive' as const, icon: XCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Pending'];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Add Fund Proposal Request</h2>
            <p className="text-muted-foreground">Create a new Fund Proposal Request</p>
          </div>
          <Button variant="outline" onClick={() => setShowAddForm(false)}>
            Back to List
          </Button>
        </div>
        <FundDisbursementForm onCancel={() => setShowAddForm(false)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Fund Proposal Request</h2>
          <p className="text-muted-foreground">Manage and track fund Fund Proposal Request</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Fund Proposal Request
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="disbursements">Disbursements</TabsTrigger>
          <TabsTrigger value="master-data">Master Data</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Disbursements</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDisbursements}</div>
                <p className="text-xs text-muted-foreground">All time disbursements</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingDisbursements}</div>
                <p className="text-xs text-muted-foreground">Awaiting processing</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedDisbursements}</div>
                <p className="text-xs text-muted-foreground">Successfully disbursed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{(stats.totalAmount / 10000000).toFixed(1)}Cr</div>
                <p className="text-xs text-muted-foreground">Total disbursed amount</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Disbursements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Disbursements</CardTitle>
              <CardDescription>Latest fund disbursement activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDisbursements.map((disbursement) => (
                  <div key={disbursement.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{disbursement.referenceNo}</p>
                      <p className="text-sm text-gray-600">{disbursement.beneficiary}</p>
                      <p className="text-sm text-gray-500">{disbursement.purpose}</p>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="font-semibold">₹{disbursement.amount.toLocaleString()}</p>
                      {getStatusBadge(disbursement.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disbursements">
          <FundDisbursementList />
        </TabsContent>

        <TabsContent value="master-data">
          <FundDisbursementMasterData />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FundDisbursement;
