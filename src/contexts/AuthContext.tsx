
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'SNA' | 'DNA' | 'IDA' | 'IA';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  department?: string;
  district?: string;
  designation?: string;
  isActive: boolean;
  isFirstLogin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { username: string; password: string; captcha: string }) => Promise<boolean>;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('fms_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('fms_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: { username: string; password: string; captcha: string }): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on username
    const mockUser: User = {
      id: '1',
      name: 'Test User',
      email: credentials.username,
      mobile: '9876543210',
      role: credentials.username.includes('sna') ? 'SNA' : 
            credentials.username.includes('dna') ? 'DNA' : 
            credentials.username.includes('ida') ? 'IDA' : 'IA',
      department: 'Maharashtra Government',
      district: 'Mumbai',
      designation: 'Deputy Director',
      isActive: true,
      isFirstLogin: credentials.password === 'admin123'
    };

    if (credentials.username && credentials.password && credentials.captcha) {
      setUser(mockUser);
      localStorage.setItem('fms_user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fms_user');
  };

  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (user && oldPassword && newPassword) {
      const updatedUser = { ...user, isFirstLogin: false };
      setUser(updatedUser);
      localStorage.setItem('fms_user', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const value = {
    user,
    login,
    logout,
    changePassword,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
