
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UserRoleContextType {
  userRole: 'admin' | 'vendor' | 'buyer' | null;
  loading: boolean;
  setUserRole: (role: 'admin' | 'vendor' | 'buyer' | null) => void;
  refreshUserRole: () => Promise<void>;
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

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }

      return data?.role || null;
    } catch (error) {
      console.error('Error in fetchUserRole:', error);
      return null;
    }
  };

  const refreshUserRole = async () => {
    if (user) {
      setLoading(true);
      const role = await fetchUserRole(user.id);
      setUserRole(role);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserRole = async () => {
      if (user && session) {
        const role = await fetchUserRole(user.id);
        setUserRole(role);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    };

    getUserRole();
  }, [user, session]);

  const value = {
    userRole,
    loading,
    setUserRole,
    refreshUserRole,
  };

  return <UserRoleContext.Provider value={value}>{children}</UserRoleContext.Provider>;
};
