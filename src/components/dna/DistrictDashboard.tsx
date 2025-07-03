import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Download, Eye } from 'lucide-react';

const fyOptions = ['2024-25', '2023-24'];
const schemeOptions = ['ग्रामीण रस्ते', 'पुल बांधकाम', 'जल व्यवस्थापन'];
const workOptions = ['जांबुत ते चांडोह', 'खडक ते जोगिवहीर', 'इंजमा माजगाव'];

const barData = [
  { month: 'Apr', Demand: 4000000, Approved: 3000000 },
  { month: 'May', Demand: 3200000, Approved: 2500000 },
  { month: 'Jun', Demand: 3000000, Approved: 2000000 },
];

const pieData = [
  { scheme: 'ग्रामीण रस्ते', value: 5000000 },
  { scheme: 'पुल बांधकाम', value: 4000000 },
  { scheme: 'जल व्यवस्थापन', value: 3000000 },
];

const DistrictDashboard = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ fy: '', scheme: '', work: '', status: '' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">District Dashboard</h2>
          <p className="text-muted-foreground text-sm">
            Overview of Demands, Schemes, Works, Agencies and Fund Movement
          </p>
        </div>
        <Button variant="outline" className="gap-2"><Download /> Export Dashboard</Button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <select name="fy" value={filters.fy} onChange={handleFilterChange} className="border rounded px-3 py-2">
          <option value="">Select FY</option>
          {fyOptions.map(fy => <option key={fy} value={fy}>{fy}</option>)}
        </select>
        <select name="scheme" value={filters.scheme} onChange={handleFilterChange} className="border rounded px-3 py-2">
          <option value="">Select Scheme</option>
          {schemeOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select name="work" value={filters.work} onChange={handleFilterChange} className="border rounded px-3 py-2">
          <option value="">Select Work</option>
          {workOptions.map(w => <option key={w} value={w}>{w}</option>)}
        </select>
        <select name="status" value={filters.status} onChange={handleFilterChange} className="border rounded px-3 py-2">
          <option value="">Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card onClick={() => navigate('/fund-demand')} className="cursor-pointer hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>View IA Demand</CardTitle>
            <CardDescription>8 demands filed</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="outline">View more</Badge>
          </CardContent>
        </Card>

        <Card onClick={() => navigate('/budget-sanctioned')} className="cursor-pointer hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Budget Sanctioned to Schemes</CardTitle>
            <CardDescription>₹12,000,000</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="outline">View more</Badge>
          </CardContent>
        </Card>

        <Card onClick={() => navigate('/scheme-master')} className="cursor-pointer hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Scheme Master</CardTitle>
            <CardDescription>5 Schemes Created</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="outline">View more</Badge>
          </CardContent>
        </Card>

        <Card onClick={() => navigate('/ia-master')} className="cursor-pointer hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Implementing Agency Master</CardTitle>
            <CardDescription>4 Agencies</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="outline">View more</Badge>
          </CardContent>
        </Card>

        <Card onClick={() => navigate('/scheme-work-master')} className="cursor-pointer hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Scheme Work Mapping</CardTitle>
            <CardDescription>14 Works Mapped</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="outline">View more</Badge>
          </CardContent>
        </Card>

        <Card onClick={() => navigate('/re-appropriation')} className="cursor-pointer hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Reappropriation of Funds</CardTitle>
            <CardDescription>3 Transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="outline">View more</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Demand vs Sanctioned</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Demand" fill="#1d4ed8" />
                <Bar dataKey="Approved" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheme-wise Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={({ scheme }) => scheme}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={["#1d4ed8", "#9333ea", "#f59e0b"][index % 3]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Table Overview */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Drilldown Table</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">Scheme</th>
                <th className="px-3 py-2 text-left">Work</th>
                <th className="px-3 py-2 text-left">Agency</th>
                <th className="px-3 py-2 text-right">Sanctioned</th>
                <th className="px-3 py-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { scheme: 'ग्रामीण रस्ते', work: 'जांबुत ते चांडोह', agency: 'OM Infra', sanctioned: 1558000, status: 'Approved' },
                { scheme: 'जल व्यवस्थापन', work: 'कवळे कडव', agency: 'Sagar Buildcon', sanctioned: 900000, status: 'Pending' },
              ].map((row, idx) => (
                <tr key={idx} className={idx % 2 ? 'bg-gray-50' : ''}>
                  <td className="px-3 py-2">{row.scheme}</td>
                  <td className="px-3 py-2">{row.work}</td>
                  <td className="px-3 py-2">{row.agency}</td>
                  <td className="px-3 py-2 text-right">₹{row.sanctioned.toLocaleString()}</td>
                  <td className="px-3 py-2 text-center">
                    <Badge variant={row.status === 'Approved' ? 'default' : 'secondary'}>
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DistrictDashboard;
