
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import DepartmentForm from './DepartmentForm';
import DepartmentList from './DepartmentList';
import DepartmentStats from './DepartmentStats';

export interface DepartmentRecord {
  id: string;
  name: string;
  code: string;
  description: string;
  headName: string;
  headEmail: string;
  headMobile: string;
  district: string;
  address: string;
  isActive: boolean;
  totalUsers: number;
  totalProjects: number;
  totalBudget: number;
  createdAt: string;
  lastUpdated?: string;
}

const DepartmentManagement = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<DepartmentRecord | null>(null);
  const [departments, setDepartments] = useState<DepartmentRecord[]>([
    {
      id: '1',
      name: 'Mumbai Collector Office',
      code: 'MUM001293',
      description: 'Responsible for infrastructure development and maintenance',
      headName: 'Dr. Rajesh Sharma',
      headEmail: 'rajesh.sharma@pwd.mh.gov.in',
      headMobile: '9876543210',
      district: 'Mumbai City',
      address: 'PWD Office, Fort, Mumbai - 400001',
      isActive: true,
      totalUsers: 25,
      totalProjects: 12,
      totalBudget: 50000000,
      createdAt: '2024-01-15',
      lastUpdated: '2024-06-28'
    },
    {
      id: '2',
      name: 'Pune Collector Office',
      code: 'PNQ02789',
      description: 'Managing All Devlopment Progress Under the Department',
      headName: 'Shri Kiran Indalkar',
      headEmail: 'dcpune@mh.gov.in',
      headMobile: '9876543211',
      district: 'Pune',
      address: 'Education Office, Shivajinagar, Pune - 411005',
      isActive: true,
      totalUsers: 45,
      totalProjects: 8,
      totalBudget: 75000000,
      createdAt: '2024-02-10',
      lastUpdated: '2024-06-27'
    },
    {
      id: '3',
      name: 'Buldhana Collector Office',
      code: 'HLT',
      description: 'Public health services and medical facilities',
      headName: 'Dr. Amit Kumar',
      headEmail: 'amit.kumar@dc.mh.gov.in',
      headMobile: '9876543212',
      district: 'Nagpur',
      address: 'Health Office, Civil Lines, Nagpur - 440001',
      isActive: false,
      totalUsers: 30,
      totalProjects: 5,
      totalBudget: 40000000,
      createdAt: '2024-03-05',
      lastUpdated: '2024-06-15'
    }
  ]);

  const handleCreateDepartment = (departmentData: Omit<DepartmentRecord, 'id' | 'createdAt' | 'totalUsers' | 'totalProjects' | 'totalBudget'>) => {
    const newDepartment: DepartmentRecord = {
      ...departmentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      totalUsers: 0,
      totalProjects: 0,
      totalBudget: 0
    };

    setDepartments(prev => [newDepartment, ...prev]);
    setIsDialogOpen(false);

    toast({
      title: "Department Created Successfully",
      description: `${newDepartment.name} (${newDepartment.code}) has been added.`,
    });
  };

  const handleUpdateDepartment = (departmentData: Omit<DepartmentRecord, 'id' | 'createdAt' | 'totalUsers' | 'totalProjects' | 'totalBudget'>) => {
    if (!editingDepartment) return;

    const updatedDepartment: DepartmentRecord = {
      ...departmentData,
      id: editingDepartment.id,
      createdAt: editingDepartment.createdAt,
      totalUsers: editingDepartment.totalUsers,
      totalProjects: editingDepartment.totalProjects,
      totalBudget: editingDepartment.totalBudget,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setDepartments(prev => prev.map(dept => 
      dept.id === editingDepartment.id ? updatedDepartment : dept
    ));
    
    setEditingDepartment(null);
    setIsDialogOpen(false);

    toast({
      title: "Department Updated Successfully",
      description: `${updatedDepartment.name} information has been updated.`,
    });
  };

  const handleDeleteDepartment = (departmentId: string) => {
    const department = departments.find(d => d.id === departmentId);
    if (department) {
      setDepartments(prev => prev.filter(d => d.id !== departmentId));
      toast({
        title: "Department Deleted",
        description: `${department.name} has been removed from the system.`,
        variant: "destructive"
      });
    }
  };

  const handleEditDepartment = (department: DepartmentRecord) => {
    setEditingDepartment(department);
    setIsDialogOpen(true);
  };

  const handleToggleStatus = (departmentId: string) => {
    setDepartments(prev => prev.map(dept => 
      dept.id === departmentId 
        ? { ...dept, isActive: !dept.isActive, lastUpdated: new Date().toISOString().split('T')[0] }
        : dept
    ));

    const department = departments.find(d => d.id === departmentId);
    if (department) {
      toast({
        title: `Department ${!department.isActive ? 'Activated' : 'Deactivated'}`,
        description: `${department.name} has been ${!department.isActive ? 'activated' : 'deactivated'}.`,
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingDepartment(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Department Management</h1>
          <p className="text-gray-600">Manage government departments and their information</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#193A9A] hover:bg-[#142f7c] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create New Department
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingDepartment ? 'Edit Department' : 'Create New Department'}
              </DialogTitle>
            </DialogHeader>
            <DepartmentForm
              department={editingDepartment}
              onSubmit={editingDepartment ? handleUpdateDepartment : handleCreateDepartment}
              onCancel={handleCloseDialog}
            />
          </DialogContent>
        </Dialog>
      </div>

      <DepartmentStats departments={departments} />
      
      <DepartmentList
        departments={departments}
        onEdit={handleEditDepartment}
        onDelete={handleDeleteDepartment}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};

export default DepartmentManagement;
