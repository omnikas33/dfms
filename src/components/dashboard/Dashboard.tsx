import React from 'react';
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

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || '';

  const stats = React.useMemo(() => {
    switch (role) {
      case 'SNA':
        return [
          { title: 'Total Allocated Funds', value: '₹125.5 Cr', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-100' },
          { title: 'Active Districts',         value: '36',       icon: Users,        color: 'text-blue-600',  bg: 'bg-blue-100'  },
          { title: 'Pending Approvals',        value: '12',       icon: Clock,        color: 'text-yellow-600',bg: 'bg-yellow-100'},
          { title: 'Projects Completed',       value: '245',      icon: CheckCircle, color: 'text-purple-600',bg: 'bg-purple-100'}
        ];
      case 'DNA':
        return [
          { title: 'Available Funds',   value: '₹45.2 Cr', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-100' },
          { title: 'Pending Requests',  value: '8',         icon: Clock,        color: 'text-yellow-600',bg: 'bg-yellow-100'},
          { title: 'Approved Today',    value: '15',        icon: CheckCircle, color: 'text-blue-600',  bg: 'bg-blue-100'  },
          { title: 'Active Projects',   value: '67',        icon: Activity,    color: 'text-purple-600',bg: 'bg-purple-100'}
        ];
      case 'IDA':
        return [
          { title: 'Project Sanctions', value: '23', icon: FileText,   color: 'text-blue-600',  bg: 'bg-blue-100'  },
          { title: 'Fund Requests',     value: '5',  icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
          { title: 'Pending Approvals', value: '3',  icon: Clock,      color: 'text-yellow-600',bg: 'bg-yellow-100'},
          { title: 'Completed Projects',value: '45', icon: CheckCircle,color: 'text-purple-600',bg: 'bg-purple-100'}
        ];
      case 'IA':
        return [
          { title: 'Assigned Works',    value: '12', icon: FileText,   color: 'text-blue-600',  bg: 'bg-blue-100'  },
          { title: 'Pending Payments',  value: '7',  icon: AlertCircle,color: 'text-red-600',   bg: 'bg-red-100'   },
          { title: 'Active Vendors',    value: '25', icon: Users,      color: 'text-green-600', bg: 'bg-green-100' },
          { title: 'Progress Updates',  value: '18', icon: TrendingUp, color: 'text-purple-600',bg: 'bg-purple-100'}
        ];
      default:
        return [];
    }
  }, [role]);

  const quickActions = React.useMemo(() => {
    switch (role) {
      case 'SNA':
        return [
          { label: 'Allocate Funds', path: '/fund-allocation', variant: 'default' as const },
          { label: 'Add User',       path: '/user-management', variant: 'outline' as const },
          { label: 'View Reports',   path: '/reports',         variant: 'outline' as const }
        ];
      case 'DNA':
        return [
          { label: 'Approve Funds',      path: '/fund-approval',      variant: 'default' as const },
          { label: 'Verify Vendor',      path: '/vendor-verification',variant: 'outline' as const },
          { label: 'Return Funds',       path: '/return-funds',       variant: 'outline' as const }
        ];
      case 'IDA':
        return [
          { label: 'Approve Project',    path: '/project-approval',   variant: 'default' as const },
          { label: 'Request Enhancement',path: '/fund-enhancement',   variant: 'outline' as const },
          { label: 'View Progress',      path: '/reports',            variant: 'outline' as const }
        ];
      case 'IA':
        return [
          { label: 'Disburse Funds',     path: '/fund-disbursement',  variant: 'default' as const },
          { label: 'Add Vendor',         path: '/vendor-management',  variant: 'outline' as const },
          { label: 'Update Progress',    path: '/project-progress',   variant: 'outline' as const }
        ];
      default:
        return [];
    }
  }, [role]);

  // Replace with real data from API
  const schemeLimits = [
    { scheme: 'Rural Development',     total: '50 Cr', used: '20 Cr', remaining: '30 Cr' },
    { scheme: 'Urban Infrastructure',  total: '30 Cr', used: '10 Cr', remaining: '20 Cr' },
    { scheme: 'Education',             total: '25 Cr', used: '15 Cr', remaining: '10 Cr' },
  ];

  const showSchemeLimits = ['DNA','IDA','IA'].includes(role);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary to-primary-hover text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-primary-foreground/80">
          {role} Dashboard —{' '}
          {new Date().toLocaleDateString('en-IN',{
            weekday:'long',year:'numeric',month:'long',day:'numeric'
          })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s,i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">{s.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{s.value}</p>
              </div>
              <div className={`p-3 rounded-full ${s.bg}`}>
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions / Activities / Scheme Limits */}
      <div className={`grid grid-cols-1 lg:gap-6 ${
        showSchemeLimits ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
      }`}>
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for your role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((a,i) => (
              <Button
                key={i}
                variant={a.variant}
                className={`w-full justify-start ${a.variant==='default'?'bg-primary hover:bg-primary-hover':''}`}
                onClick={()=>window.location.href=a.path}
              >
                {a.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action:'Fund allocation approved',        time:'2 hours ago', status:'success' },
                { action:'Vendor verification completed',   time:'4 hours ago', status:'info'    },
                { action:'Project milestone updated',       time:'6 hours ago', status:'warning' },
                { action:'Payment disbursed',               time:'1 day ago',    status:'success' }
              ].map((act,i)=>(
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      act.status==='success'?'bg-green-500':
                      act.status==='warning'?'bg-yellow-500':'bg-blue-500'
                    }`} />
                    <span className="text-sm">{act.action}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">{act.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scheme-Wise Limits */}
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
                    <TableHead>Scheme</TableHead>
                    <TableHead>Total Limit</TableHead>
                    <TableHead>Used</TableHead>
                    <TableHead>Remaining</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schemeLimits.map((r,i)=>(
                    <TableRow key={i}>
                      <TableCell>{r.scheme}</TableCell>
                      <TableCell>{r.total}</TableCell>
                      <TableCell>{r.used}</TableCell>
                      <TableCell>{r.remaining}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
