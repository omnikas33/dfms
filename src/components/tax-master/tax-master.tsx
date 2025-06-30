import React, { useState, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@/components/ui/table';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Edit2, Trash2, Plus } from 'lucide-react';

interface TaxRecord {
  id: string;
  type: string;
  percentage: number;
}

const TaxMaster: React.FC = () => {
  const [taxes, setTaxes] = useState<TaxRecord[]>([]);
  const [open, setOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TaxRecord | null>(null);
  const [typeInput, setTypeInput] = useState('');
  const [percentInput, setPercentInput] = useState<number>(0);

  const resetForm = () => {
    setEditTarget(null);
    setTypeInput('');
    setPercentInput(0);
  };

  const openNew = () => {
    resetForm();
    setOpen(true);
  };

  const openEdit = (tax: TaxRecord) => {
    setEditTarget(tax);
    setTypeInput(tax.type);
    setPercentInput(tax.percentage);
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = typeInput.trim();
    if (!trimmed || percentInput < 0) return;

    if (editTarget) {
      setTaxes(prev =>
        prev.map(t =>
          t.id === editTarget.id
            ? { ...t, type: trimmed, percentage: percentInput }
            : t
        )
      );
    } else {
      const newTax: TaxRecord = {
        id: Date.now().toString(),
        type: trimmed,
        percentage: percentInput
      };
      setTaxes(prev => [newTax, ...prev]);
    }
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    setTaxes(prev => prev.filter(t => t.id !== id));
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Tax Master</CardTitle>
          <CardDescription>Define and manage tax types</CardDescription>
        </div>
        <Button variant="outline" onClick={openNew} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Tax
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-full border border-gray-200">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="py-2 px-4 text-left">Tax Type</TableHead>
                <TableHead className="py-2 px-4 text-right">Rate (%)</TableHead>
                <TableHead className="py-2 px-4 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxes.map((tax, idx) => (
                <TableRow key={tax.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <TableCell className="py-2 px-4">{tax.type}</TableCell>
                  <TableCell className="py-2 px-4 text-right">{tax.percentage.toFixed(2)}</TableCell>
                  <TableCell className="py-2 px-4 text-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(tax)}>
                      <Edit2 className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(tax.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {taxes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="py-4 px-4 text-center text-gray-500">
                    No tax types defined.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Dialog for Add/Edit */}
      <Dialog open={open} onOpenChange={val => { if (!val) resetForm(); setOpen(val); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editTarget ? 'Edit Tax' : 'Add New Tax'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div className="space-y-1">
              <Label htmlFor="taxType">Tax Type</Label>
              <Input
                id="taxType"
                value={typeInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTypeInput(e.target.value)}
                placeholder="e.g. GST"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="taxRate">Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                step="0.01"
                min="0"
                value={percentInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPercentInput(parseFloat(e.target.value))}
                placeholder="e.g. 18.00"
                required
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editTarget ? 'Update' : 'Add'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TaxMaster;
