
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { User, UserRole } from '@/contexts/AuthContext';
import UserForm from './UserForm';
import UserList from './UserList';
import UserStats from './UserStats';

export interface UserRecord extends User {
  createdAt: string;
  lastLogin?: string;
}

const UserManagement = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [users, setUsers] = useState<UserRecord[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@mh.gov.in',
      mobile: '9876543210',
      role: 'DNA',
      department: 'Maharashtra Government',
      district: 'Mumbai City',
      isActive: true,
      isFirstLogin: false,
      createdAt: '2024-01-15',
      lastLogin: '2024-06-28'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@mh.gov.in',
      mobile: '9876543211',
      role: 'IDA',
      department: 'Maharashtra Government',
      district: 'Pune',
      isActive: true,
      isFirstLogin: false,
      createdAt: '2024-02-10',
      lastLogin: '2024-06-27'
    },
    {
      id: '3',
      name: 'Amit Patil',
      email: 'amit.patil@mh.gov.in',
      mobile: '9876543212',
      role: 'IA',
      department: 'Maharashtra Government',
      district: 'Nagpur',
      isActive: false,
      isFirstLogin: true,
      createdAt: '2024-06-01'
    }
  ]);

  const handleCreateUser = (userData: Omit<UserRecord, 'id' | 'createdAt'>) => {
    const newUser: UserRecord = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [newUser, ...prev]);
    setIsDialogOpen(false);

    toast({
      title: "User Created Successfully",
      description: `${newUser.name} has been added with ${newUser.role} role.`,
    });
  };

  const handleUpdateUser = (userData: Omit<UserRecord, 'id' | 'createdAt'>) => {
    if (!editingUser) return;

    const updatedUser: UserRecord = {
      ...userData,
      id: editingUser.id,
      createdAt: editingUser.createdAt
    };

    setUsers(prev => prev.map(user => 
      user.id === editingUser.id ? updatedUser : user
    ));
    
    setEditingUser(null);
    setIsDialogOpen(false);

    toast({
      title: "User Updated Successfully",
      description: `${updatedUser.name}'s information has been updated.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      toast({
        title: "User Deleted",
        description: `${user.name} has been removed from the system.`,
        variant: "destructive"
      });
    }
  };

  const handleEditUser = (user: UserRecord) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isActive: !user.isActive }
        : user
    ));

    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: `User ${!user.isActive ? 'Activated' : 'Deactivated'}`,
        description: `${user.name} has been ${!user.isActive ? 'activated' : 'deactivated'}.`,
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage system users and their roles</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#193A9A] hover:bg-[#142f7c] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create New User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? 'Edit User' : 'Create New User'}
              </DialogTitle>
            </DialogHeader>
            <UserForm
              user={editingUser}
              onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
              onCancel={handleCloseDialog}
            />
          </DialogContent>
        </Dialog>
      </div>

      <UserStats users={users} />
      
      <UserList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};

export default UserManagement;
