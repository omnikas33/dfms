import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

// --- Dummy Data ---
const statCards = [
  { title: 'Total Funds Allocated', value: '₹403 Cr' },
  { title: 'Active Districts', value: '01' },
  { title: 'Total Schemes', value: '160' },
  { title: 'Pending Demands', value: '1' },
  { title: 'Total Demand Approved', value: '₹403 Cr' },
];

// District-wise table data
const districtTableData = [
  {
    id: 'pune',
    name: 'Pune',
    limit: 403,
    activeSchemes: 60,
    fundUtilized: 230,
  },
  // Add more districts here if needed
];

// For dropdowns and detailed tables
const schemesByDistrict = {
  pune: [
    {
      id: 'sch1',
      name: '३०५४३६११ ग्रामीण रस्ते विकास व मजबुतीकरण',
      limit: 200,
      works: [
        { id: 'w1', name: 'काम क्र. ४२: जांबूत ते चांडोह (0/500–1/500) रस्ता सुधारित करणे', fundUtilized: 100 },
        { id: 'w2', name: 'खडक ते जोगिव्हीर फाटा (0/500–1/500) रस्ता सुधारणा – ता. आंबेगाव', fundUtilized: 60 },
      ],
    },
    {
      id: 'sch2',
      name: '३५४७८९९९ रस्ता दुरुस्ती योजना',
      limit: 120,
      works: [
        { id: 'w3', name: 'ता. आंबेगाव: खडक ते जोगिव्हीर फाटा (0/500–1/500) दुरुस्ती', fundUtilized: 40 },
      ],
    },
  ],
  // ...other districts
};

const Dashboard = () => {
  // Dropdown State
  const [selectedDistrict, setSelectedDistrict] = useState('pune');
  const [selectedScheme, setSelectedScheme] = useState('');
  const [selectedWork, setSelectedWork] = useState('');

  // Prepare dropdown options
  const districtOptions = districtTableData.map((d) => ({
    id: d.id,
    name: d.name,
  }));
  const schemeOptions = schemesByDistrict[selectedDistrict] || [];
  const workOptions =
    schemeOptions.find((s) => s.id === selectedScheme)?.works || [];

  // Helper: Show scheme+work data for selected filters
  const renderSchemeWorkTable = () => {
    if (!selectedScheme) {
      // Show all schemes with limit and all works with fund utilized
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Scheme Name</TableHead>
              <TableHead>Scheme Limit (Cr)</TableHead>
              <TableHead>Work</TableHead>
              <TableHead>Fund Utilized (Cr)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schemeOptions.map((scheme) =>
              scheme.works.length ? (
                scheme.works.map((work, idx) => (
                  <TableRow key={work.id}>
                    {idx === 0 && (
                      <>
                        <TableCell rowSpan={scheme.works.length}>
                          {scheme.name}
                        </TableCell>
                        <TableCell rowSpan={scheme.works.length}>
                          {scheme.limit}
                        </TableCell>
                      </>
                    )}
                    {idx !== 0 && null}
                    <TableCell>{work.name}</TableCell>
                    <TableCell>{work.fundUtilized}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow key={scheme.id}>
                  <TableCell>{scheme.name}</TableCell>
                  <TableCell>{scheme.limit}</TableCell>
                  <TableCell colSpan={2} className="text-center text-gray-400">
                    No works found
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      );
    } else {
      // Show selected scheme and optionally selected work
      const scheme = schemeOptions.find((s) => s.id === selectedScheme);
      if (!scheme) return null;
      if (!selectedWork) {
        // Show all works for this scheme
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scheme Name</TableHead>
                <TableHead>Scheme Limit (Cr)</TableHead>
                <TableHead>Work</TableHead>
                <TableHead>Fund Utilized (Cr)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheme.works.map((work) => (
                <TableRow key={work.id}>
                  <TableCell>{scheme.name}</TableCell>
                  <TableCell>{scheme.limit}</TableCell>
                  <TableCell>{work.name}</TableCell>
                  <TableCell>{work.fundUtilized}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      } else {
        // Show only the selected work under this scheme
        const work = scheme.works.find((w) => w.id === selectedWork);
        if (!work)
          return (
            <div className="text-center text-gray-500 p-4">No work found</div>
          );
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scheme Name</TableHead>
                <TableHead>Scheme Limit (Cr)</TableHead>
                <TableHead>Work</TableHead>
                <TableHead>Fund Utilized (Cr)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{scheme.name}</TableCell>
                <TableCell>{scheme.limit}</TableCell>
                <TableCell>{work.name}</TableCell>
                <TableCell>{work.fundUtilized}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-sm text-gray-600">Total Funds Allocated</p>
            <p className="text-2xl font-bold mt-2">₹403 Cr</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-sm text-gray-600">Active Districts</p>
            <p className="text-2xl font-bold mt-2">01</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-sm text-gray-600">Total Schemes</p>
            <p className="text-2xl font-bold mt-2">160</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-sm text-gray-600">Pending Demands</p>
            <p className="text-2xl font-bold mt-2">0</p>
          </CardContent>
        </Card>
        {/* If you want Total Demand Approved as a 5th card, add below */}
        {/* <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-sm text-gray-600">Total Demand Approved</p>
            <p className="text-2xl font-bold mt-2">₹403 Cr</p>
          </CardContent>
        </Card> */}
      </div>

      {/* District Wise Table */}
      <Card>
        <CardHeader>
          <CardTitle>District Wise Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>District</TableHead>
                <TableHead>Limit (Cr)</TableHead>
                <TableHead>Active Schemes</TableHead>
                <TableHead>Fund Utilized (Cr)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {districtTableData.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.limit}</TableCell>
                  <TableCell>{d.activeSchemes}</TableCell>
                  <TableCell>{d.fundUtilized}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dropdowns */}
      <div className="flex flex-wrap gap-1">
        {/* District Dropdown */}
        <div className="w-48">
          <Select
            value={selectedDistrict}
            onValueChange={(val) => {
              setSelectedDistrict(val);
              setSelectedScheme('');
              setSelectedWork('');
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              {districtOptions.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Scheme Dropdown */}
        <div className="w-48">
          <Select
            value={selectedScheme}
            onValueChange={(val) => {
              setSelectedScheme(val);
              setSelectedWork('');
            }}
            disabled={!schemeOptions.length}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Scheme" />
            </SelectTrigger>
            <SelectContent>
              {schemeOptions.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Work Dropdown */}
        <div className="w-48">
          <Select
            value={selectedWork}
            onValueChange={setSelectedWork}
            disabled={!selectedScheme || !workOptions.length}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Work" />
            </SelectTrigger>
            <SelectContent>
              {workOptions.map((w) => (
                <SelectItem key={w.id} value={w.id}>
                  {w.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table for selected district/scheme/work */}
      <Card>
        <CardHeader>
          <CardTitle>
            {districtOptions.find((d) => d.id === selectedDistrict)?.name} - Scheme & Work Utilization
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderSchemeWorkTable()}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
