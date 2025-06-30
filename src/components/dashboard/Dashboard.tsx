import React, { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@/components/ui/table';
import {
  TrendingUp,
  IndianRupee,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';

// Dummy data types and mocks (replace with API calls)
interface Scheme { id: string; name: string; }
interface WorkRecord { id: string; title: string; totalLimit: number; demand: number; allocated: number; }

const schemesList: Scheme[] = [
  { id: 's1', name: 'Rural Development' },
  { id: 's2', name: 'Urban Infrastructure' },
  { id: 's3', name: 'Education' }
];
const worksData: Record<string, WorkRecord[]> = {
  s1: [
    { id: 'w1', title: 'Road Construction', totalLimit: 400000000, demand: 20000000, allocated: 15000000 },
    { id: 'w2', title: 'Well Digging', totalLimit: 100000000 , demand: 10000000, allocated: 8000000 }
  ],
  s2: [
    { id: 'w3', title: 'Bridge Repair', totalLimit: 4000000, demand: 300000, allocated: 2000000 }
  ],
  s3: [
    { id: 'w4', title: 'School Renovation', totalLimit: 35, demand: 15, allocated: 12 }
  ]
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || '';

  // Dashboard Stats
  const stats = useMemo(() => {
    switch (role) {
      case 'SNA': return [
        { title: 'Total Allocated Funds', value: '₹125.5 Cr', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Active Districts', value: '36', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Pending Approvals', value: '12', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { title: 'Projects Completed', value: '245', icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-100' }
      ];
      case 'DNA': return [
        { title: 'Available Funds', value: '₹45.2 Cr', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Pending Requests', value: '8', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { title: 'Approved Today', value: '15', icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Active Works', value: '67', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-100' }
      ];
      case 'IDA': return [
        { title: 'Project Sanctions', value: '23', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Fund Requests', value: '5', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Pending Approvals', value: '3', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { title: 'Completed Projects', value: '45', icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-100' }
      ];
      case 'IA': return [
        { title: 'Assigned Works', value: '12', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Pending Payments', value: '7', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
        { title: 'Active Vendors', value: '25', icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Progress Updates', value: '18', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' }
      ];
      default: return [];
    }
  }, [role]);

  // Quick Actions
  // const quickActions = useMemo(() => {
  //   switch (role) {
  //     case 'SNA': return [
  //       { label: 'Allocate Funds', path: '/fund-allocation', variant: 'default' },
  //       { label: 'Add User', path: '/user-management', variant: 'outline' },
  //       { label: 'View Reports', path: '/reports', variant: 'outline' }
  //     ];
  //     case 'DNA': return [
  //       { label: 'Approve Funds', path: '/fund-approval', variant: 'default' },
  //       { label: 'Verify Vendor', path: '/vendor-verification', variant: 'outline' },
  //       { label: 'Return Funds', path: '/return-funds', variant: 'outline' }
  //     ];
  //     case 'IDA': return [
  //       { label: 'Approve Project', path: '/project-approval', variant: 'default' },
  //       { label: 'Request Enhancement', path: '/fund-enhancement', variant: 'outline' },
  //       { label: 'View Progress', path: '/reports', variant: 'outline' }
  //     ];
  //     case 'IA': return [
  //       { label: 'Disburse Funds', path: '/fund-disbursement', variant: 'default' },
  //       { label: 'Add Vendor', path: '/vendor-management', variant: 'outline' },
  //       { label: 'Update Progress', path: '/project-progress', variant: 'outline' }
  //     ];
  //     default: return [];
  //   }
  // }, [role]);

  // Scheme-wise Limits stub
  const schemeLimits = [
    { scheme: 'Rural Development', total: '50 Cr', used: '20 Cr', remaining: '30 Cr' },
    { scheme: 'Urban Infrastructure', total: '30 Cr', used: '10 Cr', remaining: '20 Cr' },
    { scheme: 'Education', total: '25 Cr', used: '15 Cr', remaining: '10 Cr' }
  ];
  const showSchemeLimits = ['SNA','DNA','IDA','IA'].includes(role);

  // Workwise Demands state
  const [selectedScheme, setSelectedScheme] = useState<string>(schemesList[0].id);
  const works = useMemo(() => worksData[selectedScheme] || [], [selectedScheme]);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-hover text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-primary-foreground/80">{role} Dashboard — {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">{s.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{s.value}</p>
              </div>
              <div className={`p-3 rounded-full ${s.bg}`}><s.icon className={`h-6 w-6 ${s.color}`}/></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions / Activities / Scheme Limits */}
      <div className={`grid grid-cols-1 lg:gap-6 ${showSchemeLimits ? 'lg:grid-cols-1' : 'lg:grid-cols-2'}`}>      
       

        {/* Scheme-Wise Limits Card */}
        {showSchemeLimits && (
          <Card>
            <CardHeader>
              <CardTitle>Scheme-Wise Limits</CardTitle>
              <CardDescription>Allocated vs Used vs Remaining</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scheme</TableHead><TableHead>Total</TableHead><TableHead>Used</TableHead><TableHead>Remaining</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schemeLimits.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell>{r.scheme}</TableCell><TableCell>{r.total}</TableCell><TableCell>{r.used}</TableCell><TableCell>{r.remaining}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Workwise Demands Card */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Workwise Demands</CardTitle>
            <CardDescription>Select a scheme to view works and funding</CardDescription>
          </div>
          <div className="w-60">
            <Select value={selectedScheme} onValueChange={setSelectedScheme}>
              <SelectTrigger><SelectValue placeholder="Select Scheme"/></SelectTrigger>
              <SelectContent>
                {schemesList.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Work Title</TableHead>
                  <TableHead className="text-right">Total Limit</TableHead>
                  <TableHead className="text-right">Demand</TableHead>
                  <TableHead className="text-right">Allocated</TableHead>
                  <TableHead className="text-right">Remaining</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {works.map(w => {
                  const remaining = w.totalLimit - w.allocated;
                  return (
                    <TableRow key={w.id}>
                      <TableCell>{w.title}</TableCell>
                      <TableCell className="text-right">{w.totalLimit}</TableCell>
                      <TableCell className="text-right">{w.demand}</TableCell>
                      <TableCell className="text-right">{w.allocated}</TableCell>
                      <TableCell className="text-right">{remaining}</TableCell>
                    </TableRow>
                  );
                })}
                {works.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500">No works found.</TableCell>
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

export default Dashboard;
