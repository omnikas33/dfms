
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle } from 'lucide-react';
import ApprovalRecord from './ApprovalRecord';

export interface ApprovalRecordType {
  id: string;
  idaName: string;
  requestAmount: string;
  approvedAmount: string;
  requestDate: string;
  approvalDate: string;
  purpose: string;
  status: 'Approved' | 'Rejected';
  priority: 'Low' | 'Medium' | 'High';
  approvedBy: string;
  remarks: string;
}

interface ApprovalHistoryProps {
  approvals: ApprovalRecordType[];
  onDelete: (id: string) => void;
  formatCurrency: (amount: string) => string;
}

const ApprovalHistory: React.FC<ApprovalHistoryProps> = ({
  approvals,
  onDelete,
  formatCurrency
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          Fund Approval History
        </CardTitle>
        <CardDescription>
          View and manage all fund approval decisions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IDA</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead>Approved</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Approval Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {approvals.map((approval) => (
              <ApprovalRecord
                key={approval.id}
                approval={approval}
                onDelete={onDelete}
                formatCurrency={formatCurrency}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ApprovalHistory;
