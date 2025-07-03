// SchemeWorkIAMapping.tsx

import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Download } from 'lucide-react';

const schemesList = [
  { id: "SCHEME001", name: "Planning Commission - Innovative Scheme" },
  { id: "SCHEME002", name: "Special Programme for Pilgrimage Places" },
  { id: "SCHEME003", name: "Development of Sericulture Industry" },
  { id: "SCHEME004", name: "Roads and Bridges" },
  { id: "SCHEME005", name: "District and Other Roads" },
  { id: "SCHEME006", name: "Grants for Village Roads" },
  { id: "SCHEME007", name: "Secretariat-Economic Services" },
  { id: "SCHEME008", name: "Innovative Scheme (Planning Board)" }
];

const iaList = [
  { id: "IA001", name: "IA 1" },
  { id: "IA002", name: "IA 2" },
  { id: "IA003", name: "IA 3" }
];

const planTypes = [
  { value: "TypeA", label: "Plan Type A" },
  { value: "TypeB", label: "Plan Type B" }
];

const SchemeWorkIAMapping = () => {
  const { toast } = useToast();
  const [works, setWorks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState('all');
  const [selectedIA, setSelectedIA] = useState('all');

  const [form, setForm] = useState({
    schemeId: '',
    workName: '',
    workDescription: '',
    sanctionedAmount: '',
    startDate: '',
    endDate: '',
    iaId: '',
    planType: '',
    adminApprovedAmount: '',
    adminApprovedLetter: null,
    adminApprovedLetterName: ''
  });

  useEffect(() => {
    setWorks([
      {
        id: 1,
        schemeId: "SCHEME001",
        workName: "Smart Village Center",
        workDescription: "Skill development",
        sanctionedAmount: "1500000",
        startDate: "2025-07-01",
        endDate: "2025-12-31",
        iaId: "IA001"
      },
      {
        id: 2,
        schemeId: "SCHEME004",
        workName: "Road Widening",
        workDescription: "Main road expansion",
        sanctionedAmount: "3000000",
        startDate: "2025-07-05",
        endDate: "2025-11-30",
        iaId: "IA002"
      }
    ]);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm(prev => ({
        ...prev,
        adminApprovedLetter: file,
        adminApprovedLetterName: file.name
      }));
    }
  };

  const handleSubmit = () => {
    const { schemeId, workName, iaId, adminApprovedAmount } = form;
    if (!schemeId || !workName || !iaId || !adminApprovedAmount) {
      toast({ title: 'Fill all required fields', variant: 'destructive' });
      return;
    }
    const newWork = { id: Date.now(), ...form };
    setWorks(prev => [...prev, newWork]);
    toast({ title: 'Work assigned successfully' });
    setForm({
      schemeId: '',
      workName: '',
      workDescription: '',
      sanctionedAmount: '',
      startDate: '',
      endDate: '',
      iaId: '',
      planType: '',
      adminApprovedAmount: '',
      adminApprovedLetter: null,
      adminApprovedLetterName: ''
    });
  };

  const filteredWorks = useMemo(() => {
    return works.filter(work =>
      (searchQuery ? work.workName.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
      (selectedScheme !== "all" ? work.schemeId === selectedScheme : true) &&
      (selectedIA !== "all" ? work.iaId === selectedIA : true)
    );
  }, [works, searchQuery, selectedScheme, selectedIA]);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50"><CardContent><div className="text-xs text-gray-500">Total Schemes</div><div className="text-xl font-bold">{schemesList.length}</div></CardContent></Card>
        <Card className="bg-green-50"><CardContent><div className="text-xs text-gray-500">Total Works</div><div className="text-xl font-bold">{works.length}</div></CardContent></Card>
        <Card className="bg-yellow-50"><CardContent><div className="text-xs text-gray-500">Total IAs</div><div className="text-xl font-bold">{iaList.length}</div></CardContent></Card>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <Input placeholder="Search Work Name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full md:w-1/4" />
        <Select value={selectedScheme} onValueChange={setSelectedScheme}><SelectTrigger className="w-48"><SelectValue placeholder="Scheme" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem>{schemesList.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent></Select>
        <Select value={selectedIA} onValueChange={setSelectedIA}><SelectTrigger className="w-48"><SelectValue placeholder="IA" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem>{iaList.map(ia => <SelectItem key={ia.id} value={ia.id}>{ia.name}</SelectItem>)}</SelectContent></Select>
        <Button variant="secondary"><Download className="h-4 w-4 mr-2" />Download</Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Assign New Work</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div><Label>Plan Type *</Label><Select value={form.planType} onValueChange={val => setForm(p => ({ ...p, planType: val }))}><SelectTrigger><SelectValue placeholder="Select Plan Type" /></SelectTrigger><SelectContent>{planTypes.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent></Select></div>
          <div><Label>Scheme *</Label><Select value={form.schemeId} onValueChange={val => setForm(p => ({ ...p, schemeId: val }))}><SelectTrigger><SelectValue placeholder="Select Scheme" /></SelectTrigger><SelectContent>{schemesList.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent></Select></div>
          <div><Label>IA *</Label><Select value={form.iaId} onValueChange={val => setForm(p => ({ ...p, iaId: val }))}><SelectTrigger><SelectValue placeholder="Select IA" /></SelectTrigger><SelectContent>{iaList.map(ia => <SelectItem key={ia.id} value={ia.id}>{ia.name}</SelectItem>)}</SelectContent></Select></div>
          <div><Label>Work Name *</Label><Input name="workName" value={form.workName} onChange={(e) => setForm(p => ({ ...p, workName: e.target.value }))} /></div>
          <div><Label>Approved Amount *</Label><Input type="number" value={form.adminApprovedAmount} onChange={(e) => setForm(p => ({ ...p, adminApprovedAmount: e.target.value }))} /></div>
          <div><Label>Letter Upload *</Label><Input type="file" onChange={handleFileChange} /><div className="text-sm text-gray-500">{form.adminApprovedLetterName}</div></div>
          <div className="md:col-span-2 text-right"><Button onClick={handleSubmit}>Assign Work</Button></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Works List</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Scheme</TableHead><TableHead>Work Name</TableHead><TableHead>IA</TableHead><TableHead>Amount</TableHead><TableHead>Start</TableHead><TableHead>End</TableHead></TableRow></TableHeader>
            <TableBody>
              {filteredWorks.map((work) => (
                <TableRow key={work.id}>
                  <TableCell>{schemesList.find(s => s.id === work.schemeId)?.name || "-"}</TableCell>
                  <TableCell>{work.workName}</TableCell>
                  <TableCell>{iaList.find(ia => ia.id === work.iaId)?.name || "-"}</TableCell>
                  <TableCell>₹{(+work.sanctionedAmount || +work.adminApprovedAmount).toLocaleString()}</TableCell>
                  <TableCell>{work.startDate || "-"}</TableCell>
                  <TableCell>{work.endDate || "-"}</TableCell>
                </TableRow>
              ))}
              {filteredWorks.length === 0 && <TableRow><TableCell colSpan={6} className="text-center">No works found.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchemeWorkIAMapping;
