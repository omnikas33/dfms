
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, CheckCircle, XCircle, CreditCard, Download, Edit } from 'lucide-react';

interface FundDisbursementDetailsProps {
  disbursement: any;
  onBack: () => void;
}

const FundDisbursementDetails: React.FC<FundDisbursementDetailsProps> = ({ disbursement, onBack }) => {
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

  // Mock additional data for detailed view
  const detailedData = {
    ...disbursement,
    beneficiaryType: 'Organization',
    projectReference: 'PRJ-2024-001',
    sanctionOrderNo: 'SO-2024-001',
    sanctionDate: '2024-01-10',
    ifscCode: 'SBIN0001234',
    accountHolderName: 'ABC Construction Ltd',
    remarks: 'First installment for road construction project',
    createdBy: 'John Doe',
    createdDate: '2024-01-15',
    lastModified: '2024-01-16',
    approvedBy: 'Jane Smith',
    approvalDate: '2024-01-17',
    documents: [
      { name: 'Sanction Order.pdf', size: '2.5 MB', uploadDate: '2024-01-15' },
      { name: 'Bank Statement.pdf', size: '1.2 MB', uploadDate: '2024-01-15' },
      { name: 'Project Proposal.pdf', size: '3.8 MB', uploadDate: '2024-01-14' }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Disbursement Details</h2>
            <p className="text-muted-foreground">{detailedData.referenceNo}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Basic Information
                {getStatusBadge(detailedData.status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Reference Number</label>
                  <p className="text-gray-900">{detailedData.referenceNo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Beneficiary Name</label>
                  <p className="text-gray-900">{detailedData.beneficiaryName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Beneficiary Type</label>
                  <p className="text-gray-900">{detailedData.beneficiaryType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Amount</label>
                  <p className="text-green-600 font-semibold text-lg">₹{detailedData.amount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">District</label>
                  <p className="text-gray-900">{detailedData.district}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Scheme</label>
                  <p className="text-gray-900">{detailedData.scheme}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Purpose</label>
                <p className="text-gray-900 mt-1">{detailedData.purpose}</p>
              </div>
            </CardContent>
          </Card>

          {/* Bank Details */}
          <Card>
            <CardHeader>
              <CardTitle>Bank Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Bank Name</label>
                  <p className="text-gray-900">{detailedData.bankName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Account Number</label>
                  <p className="text-gray-900">{detailedData.accountNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">IFSC Code</label>
                  <p className="text-gray-900">{detailedData.ifscCode}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Account Holder Name</label>
                  <p className="text-gray-900">{detailedData.accountHolderName}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Project & Sanction Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Project Reference</label>
                  <p className="text-gray-900">{detailedData.projectReference}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Sanction Order No.</label>
                  <p className="text-gray-900">{detailedData.sanctionOrderNo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Sanction Date</label>
                  <p className="text-gray-900">{detailedData.sanctionDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Disbursement Date</label>
                  <p className="text-gray-900">{detailedData.disbursementDate}</p>
                </div>
              </div>
              {detailedData.remarks && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Remarks</label>
                  <p className="text-gray-900 mt-1">{detailedData.remarks}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Supporting documents for this disbursement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {detailedData.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-500">
                        {doc.size} • Uploaded on {doc.uploadDate}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Status Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Created</p>
                    <p className="text-sm text-gray-500">{detailedData.createdDate}</p>
                    <p className="text-sm text-gray-600">by {detailedData.createdBy}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Under Review</p>
                    <p className="text-sm text-gray-500">{detailedData.lastModified}</p>
                    <p className="text-sm text-gray-600">Processing documents</p>
                  </div>
                </div>
                {detailedData.status === 'Completed' && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Approved & Disbursed</p>
                      <p className="text-sm text-gray-500">{detailedData.approvalDate}</p>
                      <p className="text-sm text-gray-600">by {detailedData.approvedBy}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                Generate Receipt
              </Button>
              <Button className="w-full" variant="outline">
                Send Notification
              </Button>
              <Button className="w-full" variant="outline">
                Print Details
              </Button>
              <Separator />
              <Button className="w-full" variant="destructive">
                Cancel Disbursement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FundDisbursementDetails;
