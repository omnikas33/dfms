import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

interface DistrictDemand {
  districtName: string;
  financialYear: string;
  demandCode: string;
  schemeCode: string;
  schemeName: string;
  head: string;
  demandAmount: number;
  status: 'Approved' | 'Pending';
}

// ────────── rawData (20 records) ──────────
interface DistrictDemand {
  districtName: string;
  financialYear: string;
  demandCode: string;
  schemeCode: string;
  schemeName: string;
  head: string;
  demandAmount: number;
  status: 'Approved' | 'Pending';
}

const rawData: DistrictDemand[] = [
  // O-26 (Revenue)
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-26 (Revenue)',
    schemeCode: '2053A233',
    schemeName: 'Strengthening of Dynamic Government Administration and Emergency Management System',
    head: '31',
    demandAmount: 474001,
    status: 'Approved',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-26 (Revenue)',
    schemeCode: '2202J395',
    schemeName: 'Assistance to Zilla Parishad for Special Repairs of School Buildings, Rooms and Latrine',
    head: '31',
    demandAmount: 250000,
    status: 'Pending',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-26 (Revenue)',
    schemeCode: '2202J733',
    schemeName: 'Creating infrastructure for primary/ secondary schools in Zilla Parishad area',
    head: '31',
    demandAmount: 250000,
    status: 'Approved',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-26 (Revenue)',
    schemeCode: '2202K079',
    schemeName: 'Assistance for Aadarsh Schools to construct basic facilities',
    head: '31',
    demandAmount: 250000,
    status: 'Pending',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-26 (Revenue)',
    schemeCode: '2202K426',
    schemeName: 'Creation of Science labs, Computer labs, Digital schools, Internet/Wi-Fi facilities',
    head: '31',
    demandAmount: 250000,
    status: 'Approved',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-26 (Revenue)',
    schemeCode: '22031029',
    schemeName: 'Development of facilities in Pre S.S.C. Vocational Education',
    head: '21',
    demandAmount: 599,
    status: 'Pending',
  },

  // O-27 (Capital)
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-27 (Capital)',
    schemeCode: '40550386',
    schemeName: 'Provide infrastructural facilities to various establishments of Police and Prisons…',
    head: '51',
    demandAmount: 177433,
    status: 'Approved',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-27 (Capital)',
    schemeCode: '40550386',
    schemeName: 'Provide infrastructural facilities to various establishments of Police and Prisons…',
    head: '52',
    demandAmount: 1,
    status: 'Pending',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-27 (Capital)',
    schemeCode: '40550386',
    schemeName: 'Provide infrastructural facilities to various establishments of Police and Prisons…',
    head: '53',
    demandAmount: 136245,
    status: 'Approved',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-27 (Capital)',
    schemeCode: '40591436',
    schemeName: 'Major Works',
    head: '53',
    demandAmount: 150000,
    status: 'Pending',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-27 (Capital)',
    schemeCode: '40592601',
    schemeName: 'Construction of Protection Wall to Prevent Encroachment on Public Lands',
    head: '53',
    demandAmount: 50000,
    status: 'Approved',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-27 (Capital)',
    schemeCode: '42103336',
    schemeName: 'Construction/ Extension, Repairs Maintenance of hospitals',
    head: '53',
    demandAmount: 20000,
    status: 'Pending',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-27 (Capital)',
    schemeCode: '42160736',
    schemeName: 'Major Works (District Plan-Pune) General Pool Accommodation',
    head: '53',
    demandAmount: 50000,
    status: 'Approved',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-27 (Capital)',
    schemeCode: '42350449',
    schemeName: 'Major Works of Women and Child Development Department',
    head: '51',
    demandAmount: 1,
    status: 'Pending',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-27 (Capital)',
    schemeCode: '42350449',
    schemeName: 'Major Works of Women and Child Development Department',
    head: '52',
    demandAmount: 1,
    status: 'Approved',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-27 (Capital)',
    schemeCode: '42350449',
    schemeName: 'Major Works of Women and Child Development Department',
    head: '53',
    demandAmount: 50000,
    status: 'Pending',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-27 (Capital)',
    schemeCode: '42501783',
    schemeName: 'Land acquisition and construction of Workshop building for I.T.Is',
    head: '53',
    demandAmount: 50000,
    status: 'Approved',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-27 (Capital)',
    schemeCode: '42501809',
    schemeName: 'Construction of Government Technical school',
    head: '53',
    demandAmount: 14000,
    status: 'Pending',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-27 (Capital)',
    schemeCode: '42502224',
    schemeName: 'Construction of hostel for ITI students & providing training facilities',
    head: '53',
    demandAmount: 6500,
    status: 'Approved',
  },
  {
    districtName: 'Pune',
    financialYear: '2025-26',
    demandCode: 'O-27 (Capital)',
    schemeCode: '44021765',
    schemeName: 'Land Development through Soil Conservation Measures',
    head: '53',
    demandAmount: 5000,
    status: 'Pending',
  },
];



export const DistrictDashboard: React.FC = () => {
  const navigate = useNavigate();

  // — Filters State —
  const [fy, setFy] = useState<'All' | string>('All');
  const [demandCode, setDemandCode] = useState<'All' | string>('All');
  const [head, setHead] = useState<'All' | string>('All');
  const [status, setStatus] = useState<'All' | string>('All');

  // — Unique options for each dropdown —
  const fyOptions        = useMemo(() => ['All', ...new Set(rawData.map(d => d.financialYear))], []);
  const demandOptions   = useMemo(() => ['All', ...new Set(rawData.map(d => d.demandCode))], []);
  const headOptions     = useMemo(() => ['All', ...new Set(rawData.map(d => d.head))], []);
  const statusOptions   = ['All', 'Approved', 'Pending'] as const;

  // — Filter rawData —
  const filtered = useMemo(() => {
    return rawData.filter(d => {
      if (fy !== 'All'        && d.financialYear !== fy) return false;
      if (demandCode !== 'All'&& d.demandCode   !== demandCode) return false;
      if (head !== 'All'      && d.head         !== head) return false;
      if (status !== 'All'    && d.status       !== status) return false;
      return true;
    });
  }, [fy, demandCode, head, status]);

  // — Detect if single district —
  const districts = useMemo(() => [...new Set(filtered.map(d => d.districtName))], [filtered]);
  const singleDistrict = districts.length === 1 ? districts[0] : null;

  // — Scheme-level summary grouping —
  interface Sum { budget: number; approved: number; pending: number }
  const map: Record<string, Sum> = {};
  filtered.forEach(d => {
    const key = [ d.demandCode, d.districtName, d.schemeCode, d.head, d.schemeName ].join('|');
    const s = map[key] ||= { budget: 0, approved: 0, pending: 0 };
    s.budget += d.demandAmount;
    if (d.status === 'Approved') s.approved += d.demandAmount;
    else s.pending += d.demandAmount;
  });
  const rows = Object.entries(map).map(([key, s]) => {
    const [dCode, district, sc, hd, name] = key.split('|');
    return {
      demandCode: dCode,
      district,
      schemeKey: `${sc} - ${hd} - ${name}`,
      budget:   s.budget,
      approved: s.approved,
      pending:  s.pending,
      balance:  s.budget - s.approved,
    };
  });

  // — Cards totals —
  const totalBudget   = rows.reduce((sum, r) => sum + r.budget,    0);
  const totalApproved = rows.reduce((sum, r) => sum + r.approved,  0);
  const totalPending  = rows.reduce((sum, r) => sum + r.pending,   0);
  const totalBalance  = rows.reduce((sum, r) => sum + r.balance,   0);

  const openDetails = (code: string) => navigate(`/demands/${code}`);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">District Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Scheme-level summary{singleDistrict ? ` for ${singleDistrict}` : ''}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download /> Export
        </Button>
      </div>

      {/* Filters */}
<div className="flex flex-wrap gap-4">
  <div className="flex-1 min-w-[140px]">
    <label className="block mb-1 font-medium text-gray-700">Financial Year</label>
    <Select value={fy} onValueChange={setFy}>
      <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
      <SelectContent>
        {fyOptions.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
      </SelectContent>
    </Select>
  </div>

  <div className="flex-1 min-w-[180px]">
    <label className="block mb-1 font-medium text-gray-700">Demand Code</label>
    <Select value={demandCode} onValueChange={setDemandCode}>
      <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
      <SelectContent>
        {demandOptions.map(dc => <SelectItem key={dc} value={dc}>{dc}</SelectItem>)}
      </SelectContent>
    </Select>
  </div>

  <div className="flex-1 min-w-[140px]">
    <label className="block mb-1 font-medium text-gray-700">Object Code</label>
    <Select value={head} onValueChange={setHead}>
      <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
      <SelectContent>
        {headOptions.map(hd => <SelectItem key={hd} value={hd}>{hd}</SelectItem>)}
      </SelectContent>
    </Select>
  </div>

  <div className="flex-1 min-w-[140px]">
    <label className="block mb-1 font-medium text-gray-700">Status</label>
    <Select value={status} onValueChange={setStatus}>
      <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
      <SelectContent>
        {statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
      </SelectContent>
    </Select>
  </div>
</div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader><CardTitle>Total Budget</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">₹{totalBudget.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Approved Demands</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">₹{totalApproved.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pending Demands</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">₹{totalPending.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Balance</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">₹{totalBalance.toLocaleString()}</CardContent>
        </Card>
      </div>

      {/* Scheme-Level Summary Table */}
      <Card>
        <CardHeader><CardTitle>Scheme-Level Summary</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Demand Code</TableHead>
                {!singleDistrict && <TableHead>District Name</TableHead>}
                <TableHead>Scheme (Code-Head-Name)</TableHead>
                <TableHead className="text-right">Total Budget</TableHead>
                <TableHead className="text-right">Approved</TableHead>
                <TableHead className="text-right">Pending</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r,i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Button variant="link" onClick={() => openDetails(r.demandCode)}>
                      {r.demandCode}
                    </Button>
                  </TableCell>
                  {!singleDistrict && <TableCell>{r.district}</TableCell>}
                  <TableCell>{r.schemeKey}</TableCell>
                  <TableCell className="text-right">₹{r.budget.toLocaleString()}</TableCell>
                  <TableCell className="text-right">₹{r.approved.toLocaleString()}</TableCell>
                  <TableCell className="text-right">₹{r.pending.toLocaleString()}</TableCell>
                  <TableCell className="text-right">₹{r.balance.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {rows.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No records match the selected filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DistrictDashboard;
