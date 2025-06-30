
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, FileText, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ReturnFundRecord } from './ReturnFunds';

interface ReturnFundsFormProps {
  onSubmit: (data: Omit<ReturnFundRecord, 'id' | 'status' | 'submittedDate'>) => void;
}

// Mock IDA data - this would come from master data
const idaOptions = [
  { value: 'mumbai-ida', label: 'Mumbai IDA' },
  { value: 'pune-ida', label: 'Pune IDA' },
  { value: 'nagpur-ida', label: 'Nagpur IDA' },
  { value: 'nashik-ida', label: 'Nashik IDA' },
  { value: 'aurangabad-ida', label: 'Aurangabad IDA' },
];

const ReturnFundsForm: React.FC<ReturnFundsFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    idaName: '',
    returnAmount: '',
    returnDate: '',
    bankAccountNumber: '',
    ifscCode: '',
    utrNumber: '',
    attachments: [] as string[],
    remarks: ''
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map(file => file.name);
      setFormData(prev => ({ 
        ...prev, 
        attachments: [...prev.attachments, ...fileNames] 
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!declarationAccepted) {
      alert('Please accept the declaration to proceed.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit({
      ...formData,
      returnDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''
    });

    // Reset form
    setFormData({
      idaName: '',
      returnAmount: '',
      returnDate: '',
      bankAccountNumber: '',
      ifscCode: '',
      utrNumber: '',
      attachments: [],
      remarks: ''
    });
    setSelectedDate(undefined);
    setDeclarationAccepted(false);
    setIsSubmitting(false);
  };

  const isFormValid = formData.idaName && formData.returnAmount && selectedDate && 
                     formData.bankAccountNumber && formData.ifscCode && formData.utrNumber && 
                     formData.attachments.length >= 2 && declarationAccepted;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          New Fund Return Request
        </CardTitle>
        <CardDescription>
          Process fund return from IDA back to SNA
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* IDA Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ida-select">Select IDA *</Label>
              <Select value={formData.idaName} onValueChange={(value) => handleInputChange('idaName', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose IDA" />
                </SelectTrigger>
                <SelectContent>
                  {idaOptions.map((ida) => (
                    <SelectItem key={ida.value} value={ida.label}>
                      {ida.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="return-amount">Return Amount (₹) *</Label>
              <Input
                id="return-amount"
                type="number"
                placeholder="Enter amount to return"
                value={formData.returnAmount}
                onChange={(e) => handleInputChange('returnAmount', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Return Date */}
          <div className="space-y-2">
            <Label>Return Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Select return date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Bank Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bank-account">Bank Account Number *</Label>
              <Input
                id="bank-account"
                placeholder="Enter bank account number"
                value={formData.bankAccountNumber}
                onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ifsc-code">IFSC Code *</Label>
              <Input
                id="ifsc-code"
                placeholder="Enter IFSC code"
                value={formData.ifscCode}
                onChange={(e) => handleInputChange('ifscCode', e.target.value.toUpperCase())}
                required
              />
            </div>
          </div>

          {/* UTR Number */}
          <div className="space-y-2">
            <Label htmlFor="utr-number">UTR Number *</Label>
            <Input
              id="utr-number"
              placeholder="Enter UTR number"
              value={formData.utrNumber}
              onChange={(e) => handleInputChange('utrNumber', e.target.value)}
              required
            />
          </div>

          {/* File Attachments */}
          <div className="space-y-4">
            <Label>Attachments *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Upload Bank Closure Certificate and DNA Certificate
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button type="button" variant="outline" className="mt-2">
                  Choose Files
                </Button>
              </Label>
            </div>

            {/* Display uploaded files */}
            {formData.attachments.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files:</Label>
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{file}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks (Optional)</Label>
            <Input
              id="remarks"
              placeholder="Add any additional remarks"
              value={formData.remarks}
              onChange={(e) => handleInputChange('remarks', e.target.value)}
            />
          </div>

          {/* Declaration Checkbox */}
          <div className="flex items-start space-x-2 p-4 bg-blue-50 rounded-lg">
            <Checkbox
              id="declaration"
              checked={declarationAccepted}
              onCheckedChange={(checked) => setDeclarationAccepted(checked === true)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="declaration"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Declaration *
              </Label>
              <p className="text-xs text-muted-foreground">
                I hereby declare that all the information provided is true and accurate. 
                The fund return is being processed as per the prescribed guidelines and 
                all necessary approvals have been obtained.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing Return...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Submit Return Request
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReturnFundsForm;
