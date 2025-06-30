
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import FundApprovalForm from './FundApprovalForm';
import ApprovalSummary from './ApprovalSummary';
import ApprovalDetailsDialog from './ApprovalDetailsDialog';
import { ApprovalRecordType } from './ApprovalHistory';

export interface FundRequest {
  id: string;
  idaName: string;
  requestAmount: string;
  requestDate: string;
  purpose: string;
  submittedBy: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  priority: 'Low' | 'Medium' | 'High';
  attachments: string[];
  remarks?: string;
  approvedAmount?: string;
  approvalDate?: string;
  approvedBy?: string;
}

const FundApproval = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<FundRequest | null>(null);
  const [selectedApproval, setSelectedApproval] = useState<ApprovalRecordType | null>(null);

  const [approvals, setApprovals] = useState<ApprovalRecordType[]>([
    {
      id: '1',
      idaName: 'Mumbai IDA',
      requestAmount: '5000000',
      approvedAmount: '4500000',
      requestDate: '2024-06-15',
      approvalDate: '2024-06-18',
      purpose: 'Infrastructure development',
      status: 'Approved',
      priority: 'High',
      approvedBy: 'DNA Officer',
      remarks: 'Approved with reduced amount due to budget constraints'
    },
    {
      id: '2',
      idaName: 'Pune IDA',
      requestAmount: '3500000',
      approvedAmount: '3500000',
      requestDate: '2024-06-10',
      approvalDate: '2024-06-12',
      purpose: 'Rural development projects',
      status: 'Approved',
      priority: 'Medium',
      approvedBy: 'DNA Officer',
      remarks: 'Full amount approved'
    },
    {
      id: '3',
      idaName: 'Nagpur IDA',
      requestAmount: '2750000',
      approvedAmount: '0',
      requestDate: '2024-06-08',
      approvalDate: '2024-06-11',
      purpose: 'Equipment procurement',
      status: 'Rejected',
      priority: 'Low',
      approvedBy: 'DNA Officer',
      remarks: 'Insufficient documentation provided'
    }
  ]);

  const [pendingRequests] = useState<FundRequest[]>([
    {
      id: '4',
      idaName: 'Aurangabad IDA',
      requestAmount: '4200000',
      requestDate: '2024-06-20',
      purpose: 'Emergency infrastructure repair',
      submittedBy: 'IDA Manager',
      status: 'Pending',
      priority: 'High',
      attachments: ['emergency_report.pdf', 'cost_estimate.xlsx']
    },
    {
      id: '5',
      idaName: 'Nashik IDA',
      requestAmount: '1800000',
      requestDate: '2024-06-19',
      purpose: 'Technology upgrade',
      submittedBy: 'IDA Manager',
      status: 'Pending',
      priority: 'Medium',
      attachments: ['tech_proposal.pdf']
    }
  ]);

  const handleApprove = (requestId: string, approvedAmount: string, remarks: string) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (request) {
      const newApproval: ApprovalRecordType = {
        id: requestId,
        idaName: request.idaName,
        requestAmount: request.requestAmount,
        approvedAmount: approvedAmount,
        requestDate: request.requestDate,
        approvalDate: new Date().toISOString().split('T')[0],
        purpose: request.purpose,
        status: 'Approved',
        priority: request.priority,
        approvedBy: 'DNA Officer',
        remarks: remarks
      };

      setApprovals(prev => [newApproval, ...prev]);
      setIsDialogOpen(false);
      setSelectedRequest(null);

      toast({
        title: "Fund Request Approved",
        description: `₹${formatCurrency(approvedAmount)} approved for ${request.idaName}.`,
      });
    }
  };

  const handleReject = (requestId: string, remarks: string) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (request) {
      const newApproval: ApprovalRecordType = {
        id: requestId,
        idaName: request.idaName,
        requestAmount: request.requestAmount,
        approvedAmount: '0',
        requestDate: request.requestDate,
        approvalDate: new Date().toISOString().split('T')[0],
        purpose: request.purpose,
        status: 'Rejected',
        priority: request.priority,
        approvedBy: 'DNA Officer',
        remarks: remarks
      };

      setApprovals(prev => [newApproval, ...prev]);
      setIsDialogOpen(false);
      setSelectedRequest(null);

      toast({
        title: "Fund Request Rejected",
        description: `Request from ${request.idaName} has been rejected.`,
        variant: "destructive"
      });
    }
  };

  const handleDelete = (id: string) => {
    const approval = approvals.find(a => a.id === id);
    if (approval) {
      setApprovals(prev => prev.filter(a => a.id !== id));
      toast({
        title: "Record Deleted",
        description: `Approval record for ${approval.idaName} has been removed.`,
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

  const handleReviewRequest = (request: FundRequest) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleViewDetails = (approval: ApprovalRecordType) => {
    setSelectedApproval(approval);
    setIsDetailsDialogOpen(true);
  };

  const approvedRequests = approvals.filter(approval => approval.status === 'Approved');
  const rejectedRequests = approvals.filter(approval => approval.status === 'Rejected');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderPendingRequestCard = (request: FundRequest) => (
    <div key={request.id} className="border rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium">{request.idaName}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              request.priority === 'High' ? 'bg-red-100 text-red-800' :
              request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {request.priority} Priority
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            Amount: ₹{formatCurrency(request.requestAmount)}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            Purpose: {request.purpose}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            Request Date: {new Date(request.requestDate).toLocaleDateString()}
          </p>
        </div>
        <Button
          onClick={() => handleReviewRequest(request)}
          className="bg-[#193A9A] hover:bg-[#142f7c] text-white"
        >
          <Eye className="h-4 w-4 mr-2" />
          Review
        </Button>
      </div>
    </div>
  );

  const renderApprovalTable = (records: ApprovalRecordType[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>IDA</TableHead>
          <TableHead>Requested</TableHead>
          <TableHead>Approved</TableHead>
          <TableHead>Request Date</TableHead>
          <TableHead>Decision Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((approval) => (
          <TableRow key={approval.id}>
            <TableCell className="font-medium">{approval.idaName}</TableCell>
            <TableCell>₹{formatCurrency(approval.requestAmount)}</TableCell>
            <TableCell>
              {approval.status === 'Approved' 
                ? `₹${formatCurrency(approval.approvedAmount)}` 
                : '-'
              }
            </TableCell>
            <TableCell>{new Date(approval.requestDate).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(approval.approvalDate).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(approval.status)}>
                {approval.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={getPriorityColor(approval.priority)}>
                {approval.priority}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewDetails(approval)}
                  className="hover:bg-blue-50 hover:text-blue-600"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this approval record?')) {
                      handleDelete(approval.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  title="Delete Record"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fund Approval</h1>
          <p className="text-gray-600">Review and approve fund requests from IDAs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary */}
        <div className="lg:col-span-1">
          <ApprovalSummary />
        </div>
        
        {/* Request Management Tabs */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Pending ({pendingRequests.length})
                </TabsTrigger>
                <TabsTrigger value="approved" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Approved ({approvedRequests.length})
                </TabsTrigger>
                <TabsTrigger value="rejected" className="flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  Rejected ({rejectedRequests.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="mt-4">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Pending Fund Requests</h2>
                  {pendingRequests.length > 0 ? (
                    pendingRequests.map((request) => renderPendingRequestCard(request))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No pending requests</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="approved" className="mt-4">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-green-700">Approved Requests History</h2>
                  {approvedRequests.length > 0 ? (
                    renderApprovalTable(approvedRequests)
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No approved requests</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="rejected" className="mt-4">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-red-700">Rejected Requests History</h2>
                  {rejectedRequests.length > 0 ? (
                    renderApprovalTable(rejectedRequests)
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <XCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No rejected requests</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Fund Request</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <FundApprovalForm
              request={selectedRequest}
              onApprove={handleApprove}
              onReject={handleReject}
              formatCurrency={formatCurrency}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <ApprovalDetailsDialog
        approval={selectedApproval}
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};

export default FundApproval;
