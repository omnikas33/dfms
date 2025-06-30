
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ProjectApprovalList from './ProjectApprovalList';
import ProjectApprovalForm from './ProjectApprovalForm';
import ProjectApprovalMasterData from './ProjectApprovalMasterData';

const ProjectApproval = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('list');

  const handleNewProject = () => {
    setShowForm(true);
    setActiveTab('form');
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setActiveTab('list');
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setActiveTab('list');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Project Approval</h1>
          <p className="text-gray-600">Manage IDA project approvals and reviews</p>
        </div>
        <Button onClick={handleNewProject}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">Project List</TabsTrigger>
          <TabsTrigger value="form">Project Form</TabsTrigger>
          <TabsTrigger value="master">Master Data</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <ProjectApprovalList />
        </TabsContent>

        <TabsContent value="form">
          <ProjectApprovalForm 
            onCancel={handleFormCancel}
            onSubmit={handleFormSubmit}
          />
        </TabsContent>

        <TabsContent value="master">
          <ProjectApprovalMasterData />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectApproval;
