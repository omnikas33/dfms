import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/components/dashboard/Dashboard';
import FundAllocation from '@/components/sna/FundAllocation';
import UserManagement from '@/components/sna/UserManagement';
import DepartmentManagement from '@/components/sna/DepartmentManagement';
import FundApproval from '@/components/dna/FundApproval';
import ReturnFunds from '@/components/dna/ReturnFunds';
import VendorVerification from '@/components/dna/VendorVerification';
import FundDisbursement from '@/components/ia/FundDisbursement';
import ProjectProgress from '@/components/ia/ProjectProgress';
import VendorManagement from '@/components/ia/VendorManagement';
import ProjectApproval from '@/components/ida/ProjectApproval';
import FundEnhancement from '@/components/ida/FundEnhancement';
import FundReturn from '@/components/ida/FundReturn';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Reports from '@/components/reports/Reports';
import Settings from '@/components/settings/Settings';
import TaxMaster from './components/tax-master/tax-master';

const queryClient = new QueryClient();

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

const AuthenticatedApp = () => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (user) {
      setShowLogin(false);
    }
  }, [user]);

  if (showLogin && !user) {
    return <LoginForm onSuccess={() => setShowLogin(false)} />;
  }

  return (
    <Routes>
      <Route path="/login" element={
        user ? <Navigate to="/dashboard" /> : <LoginForm onSuccess={() => setShowLogin(false)} />
      } />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/fund-allocation" element={
        <PrivateRoute>
          <FundAllocation />
        </PrivateRoute>
      } />
      <Route path="/user-management" element={
        <PrivateRoute>
          <UserManagement />
        </PrivateRoute>
      } />
      <Route path="/department-management" element={
        <PrivateRoute>
          <DepartmentManagement />
        </PrivateRoute>
      } />
      <Route path="/fund-approval" element={
        <PrivateRoute>
          <FundApproval />
        </PrivateRoute>
      } />
      <Route path="/return-funds" element={
        <PrivateRoute>
          <ReturnFunds />
        </PrivateRoute>
      } />
      <Route path="/vendor-verification" element={
        <PrivateRoute>
          <VendorVerification />
        </PrivateRoute>
      } />
      <Route path="/project-approval" element={
        <PrivateRoute>
          <ProjectApproval />
        </PrivateRoute>
      } />
      <Route path="/fund-enhancement" element={
        <PrivateRoute>
          <FundEnhancement />
        </PrivateRoute>
      } />
      <Route path="/tax-master" element={
        <PrivateRoute>
          <TaxMaster />
        </PrivateRoute>
      } />
      <Route path="/fund-return" element={
        <PrivateRoute>
          <FundReturn />
        </PrivateRoute>
      } />
      <Route path="/fund-disbursement" element={
        <PrivateRoute>
          <FundDisbursement />
        </PrivateRoute>
      } />
      <Route path="/project-progress" element={
        <PrivateRoute>
          <ProjectProgress />
        </PrivateRoute>
      } />
      <Route path="/vendor-management" element={
        <PrivateRoute>
          <VendorManagement />
        </PrivateRoute>
      } />
      <Route path="/reports" element={
        <PrivateRoute>
          <Reports />
        </PrivateRoute>
      } />
      <Route path="/settings" element={
        <PrivateRoute>
          <Settings />
        </PrivateRoute>
      } />
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AuthenticatedApp />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
