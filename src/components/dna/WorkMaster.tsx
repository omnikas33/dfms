// SchemeWorkIAMapping.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

const SchemeWorkIAMapping = () => {
  const [works, setWorks] = useState([]);
  const [form, setForm] = useState({
    schemeId: '',
    workName: '',
    workDescription: '',
    sanctionedAmount: '',
    startDate: '',
    endDate: '',
    iaId: ''
  });

  const { toast } = useToast();

  useEffect(() => {
    // Fetch existing works here
    setWorks([]); // replace with API call to fetch works
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // validation can be added
    const newWork = { id: Date.now(), ...form };
    setWorks((prev) => [...prev, newWork]);
    toast({ title: 'Work added successfully' });
    setForm({ schemeId: '', workName: '', workDescription: '', sanctionedAmount: '', startDate: '', endDate: '', iaId: '' });
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Add New Work and Map to Scheme & IA</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Scheme</Label>
            <Select value={form.schemeId} onValueChange={(value) => setForm((prev) => ({ ...prev, schemeId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Scheme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheme1">Scheme 1</SelectItem>
                <SelectItem value="scheme2">Scheme 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Implementing Agency</Label>
            <Select value={form.iaId} onValueChange={(value) => setForm((prev) => ({ ...prev, iaId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select IA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ia1">IA 1</SelectItem>
                <SelectItem value="ia2">IA 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Work Name</Label>
            <Input name="workName" value={form.workName} onChange={handleChange} placeholder="Enter work name" />
          </div>
          <div>
            <Label>Sanctioned Amount</Label>
            <Input name="sanctionedAmount" value={form.sanctionedAmount} onChange={handleChange} placeholder="Enter sanctioned amount" type="number" />
          </div>
          <div className="md:col-span-2">
            <Label>Work Description</Label>
            <Input name="workDescription" value={form.workDescription} onChange={handleChange} placeholder="Enter work description" />
          </div>
          <div>
            <Label>Start Date</Label>
            <Input name="startDate" value={form.startDate} onChange={handleChange} type="date" />
          </div>
          <div>
            <Label>End Date</Label>
            <Input name="endDate" value={form.endDate} onChange={handleChange} type="date" />
          </div>
          <div className="md:col-span-2 text-right">
            <Button onClick={handleSubmit}>Add Work</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Works List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scheme</TableHead>
                <TableHead>Work Name</TableHead>
                <TableHead>IA</TableHead>
                <TableHead>Sanctioned Amount</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {works.map((work) => (
                <TableRow key={work.id}>
                  <TableCell>{work.schemeId}</TableCell>
                  <TableCell>{work.workName}</TableCell>
                  <TableCell>{work.iaId}</TableCell>
                  <TableCell>{work.sanctionedAmount}</TableCell>
                  <TableCell>{work.startDate}</TableCell>
                  <TableCell>{work.endDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchemeWorkIAMapping;
