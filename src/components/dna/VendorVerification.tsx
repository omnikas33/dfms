
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';
import VendorForm from './VendorForm';
import VendorList from './VendorList';
import VendorDetails from './VendorDetails';
import VendorMasterData from './VendorMasterData';

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  gstNumber: string;
  panNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  category: string;
  type: 'Individual' | 'Company' | 'Partnership' | 'LLP';
  registrationDate: string;
  verificationStatus: 'Pending' | 'Verified' | 'Rejected' | 'Under Review';
  documentsSubmitted: string[];
  remarks?: string;
  verifiedBy?: string;
  verificationDate?: string;
  contactPerson?: string;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
  };
  workExperience?: string;
  annualTurnover?: string;
  rating?: number;
}

const VendorVerification = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isMasterDataDialogOpen, setIsMasterDataDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);

  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: '1',
      name: 'Tech Solutions Pvt Ltd',
      email: 'contact@techsolutions.com',
      phone: '+91-9876543210',
      gstNumber: '27AABCT1234C1Z5',
      panNumber: 'AABCT1234C',
      address: '123, Tech Park, Bandra',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      category: 'IT Services',
      type: 'Company',
      registrationDate: '2024-01-15',
      verificationStatus: 'Verified',
      documentsSubmitted: ['GST Certificate', 'PAN Card', 'Bank Statement'],
      verifiedBy: 'DNA Officer',
      verificationDate: '2024-01-20',
      contactPerson: 'Rahul Sharma',
      bankDetails: {
        bankName: 'HDFC Bank',
        accountNumber: '1234567890',
        ifscCode: 'HDFC0001234',
        accountHolderName: 'Tech Solutions Pvt Ltd'
      },
      workExperience: '5+ years',
      annualTurnover: '2 Crore',
      rating: 4.5
    },
    {
      id: '2',
      name: 'Construction Works',
      email: 'info@constructionworks.com',
      phone: '+91-9876543211',
      gstNumber: '27AABCT5678D1Z5',
      panNumber: 'AABCT5678D',
      address: '456, Builder Street, Andheri',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400053',
      category: 'Construction',
      type: 'Partnership',
      registrationDate: '2024-02-10',
      verificationStatus: 'Pending',
      documentsSubmitted: ['GST Certificate', 'Partnership Deed'],
      contactPerson: 'Amit Patel',
      workExperience: '10+ years',
      annualTurnover: '5 Crore'
    },
    {
      id: '3',
      name: 'Office Supplies Co',
      email: 'sales@officesupplies.com',
      phone: '+91-9876543212',
      gstNumber: '27AABCT9012E1Z5',
      panNumber: 'AABCT9012E',
      address: '789, Market Road, Borivali',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400092',
      category: 'Supplies',
      type: 'Company',
      registrationDate: '2024-01-25',
      verificationStatus: 'Under Review',
      documentsSubmitted: ['GST Certificate', 'PAN Card', 'MOA'],
      contactPerson: 'Priya Singh',
      workExperience: '3 years',
      annualTurnover: '1.5 Crore',
      rating: 4.0
    }
  ]);

  const handleAddVendor = (vendorData: Omit<Vendor, 'id'>) => {
    const newVendor: Vendor = {
      ...vendorData,
      id: Date.now().toString(),
    };
    setVendors(prev => [newVendor, ...prev]);
    setIsDialogOpen(false);
    toast({
      title: "Vendor Added",
      description: `${vendorData.name} has been added successfully.`,
    });
  };

  const handleEditVendor = (vendorData: Omit<Vendor, 'id'>) => {
    if (editingVendor) {
      setVendors(prev => prev.map(vendor => 
        vendor.id === editingVendor.id 
          ? { ...vendorData, id: editingVendor.id }
          : vendor
      ));
      setEditingVendor(null);
      setIsDialogOpen(false);
      toast({
        title: "Vendor Updated",
        description: `${vendorData.name} has been updated successfully.`,
      });
    }
  };

  const handleVerifyVendor = (vendorId: string, status: 'Verified' | 'Rejected', remarks?: string) => {
    setVendors(prev => prev.map(vendor => 
      vendor.id === vendorId 
        ? { 
            ...vendor, 
            verificationStatus: status,
            verifiedBy: 'DNA Officer',
            verificationDate: new Date().toISOString().split('T')[0],
            remarks: remarks
          }
        : vendor
    ));
    
    const vendor = vendors.find(v => v.id === vendorId);
    toast({
      title: `Vendor ${status}`,
      description: `${vendor?.name} has been ${status.toLowerCase()}.`,
      variant: status === 'Rejected' ? 'destructive' : 'default'
    });
  };

  const handleDeleteVendor = (vendorId: string) => {
    const vendor = vendors.find(v => v.id === vendorId);
    setVendors(prev => prev.filter(v => v.id !== vendorId));
    toast({
      title: "Vendor Deleted",
      description: `${vendor?.name} has been removed.`,
      variant: "destructive"
    });
  };

  const handleViewDetails = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsDetailsDialogOpen(true);
  };

  const handleEditClick = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setIsDialogOpen(true);
  };

  const pendingVendors = vendors.filter(v => v.verificationStatus === 'Pending');
  const verifiedVendors = vendors.filter(v => v.verificationStatus === 'Verified');
  const rejectedVendors = vendors.filter(v => v.verificationStatus === 'Rejected');
  const underReviewVendors = vendors.filter(v => v.verificationStatus === 'Under Review');

  const getStatusStats = () => [
    { title: 'Total Vendors', value: vendors.length.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Verified', value: verifiedVendors.length.toString(), icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Pending', value: pendingVendors.length.toString(), icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { title: 'Under Review', value: underReviewVendors.length.toString(), icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-100' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Verification</h1>
          <p className="text-gray-600">Manage and verify vendor registrations</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsMasterDataDialogOpen(true)}
          >
            Master Data
          </Button>
          <Button
            onClick={() => {
              setEditingVendor(null);
              setIsDialogOpen(true);
            }}
            className="bg-[#193A9A] hover:bg-[#142f7c] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Vendor
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStatusStats().map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vendor Management Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <Tabs defaultValue="all" className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                All ({vendors.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending ({pendingVendors.length})
              </TabsTrigger>
              <TabsTrigger value="review" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Under Review ({underReviewVendors.length})
              </TabsTrigger>
              <TabsTrigger value="verified" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Verified ({verifiedVendors.length})
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Rejected ({rejectedVendors.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="all">
              <VendorList
                vendors={vendors}
                onViewDetails={handleViewDetails}
                onEdit={handleEditClick}
                onDelete={handleDeleteVendor}
                onVerify={handleVerifyVendor}
              />
            </TabsContent>

            <TabsContent value="pending">
              <VendorList
                vendors={pendingVendors}
                onViewDetails={handleViewDetails}
                onEdit={handleEditClick}
                onDelete={handleDeleteVendor}
                onVerify={handleVerifyVendor}
              />
            </TabsContent>

            <TabsContent value="review">
              <VendorList
                vendors={underReviewVendors}
                onViewDetails={handleViewDetails}
                onEdit={handleEditClick}
                onDelete={handleDeleteVendor}
                onVerify={handleVerifyVendor}
              />
            </TabsContent>

            <TabsContent value="verified">
              <VendorList
                vendors={verifiedVendors}
                onViewDetails={handleViewDetails}
                onEdit={handleEditClick}
                onDelete={handleDeleteVendor}
                onVerify={handleVerifyVendor}
              />
            </TabsContent>

            <TabsContent value="rejected">
              <VendorList
                vendors={rejectedVendors}
                onViewDetails={handleViewDetails}
                onEdit={handleEditClick}
                onDelete={handleDeleteVendor}
                onVerify={handleVerifyVendor}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Add/Edit Vendor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
            </DialogTitle>
          </DialogHeader>
          <VendorForm
            vendor={editingVendor}
            onSubmit={editingVendor ? handleEditVendor : handleAddVendor}
            onCancel={() => {
              setIsDialogOpen(false);
              setEditingVendor(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Vendor Details Dialog */}
      <VendorDetails
        vendor={selectedVendor}
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        onVerify={handleVerifyVendor}
      />

      {/* Master Data Dialog */}
      <Dialog open={isMasterDataDialogOpen} onOpenChange={setIsMasterDataDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Vendor Master Data Management</DialogTitle>
          </DialogHeader>
          <VendorMasterData />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorVerification;
