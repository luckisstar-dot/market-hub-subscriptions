
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface UserRoleContextType {
  userRole: 'admin' | 'vendor' | 'buyer' | null;
  loading: boolean;
  setUserRole: (role: 'admin' | 'vendor' | 'buyer' | null) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<'admin' | 'vendor' | 'buyer' | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, session } = useAuth();

  useEffect(() => {
    if (user && session) {
      // For now, we'll determine role based on email or user metadata
      // In a real app, this would come from a database
      const email = user.email;
      if (email?.includes('admin')) {
        setUserRole('admin');
      } else if (email?.includes('vendor') || user.user_metadata?.role === 'vendor') {
        setUserRole('vendor');
      } else {
        setUserRole('buyer');
      }
    } else {
      setUserRole(null);
    }
    setLoading(false);
  }, [user, session]);

  const value = {
    userRole,
    loading,
    setUserRole,
  };

  return <UserRoleContext.Provider value={value}>{children}</UserRoleContext.Provider>;
};
