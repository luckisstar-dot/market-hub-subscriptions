
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Users, UserCheck } from 'lucide-react';

interface UserWithRole {
  id: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'vendor' | 'buyer' | null;
}

const AdminUserRoleManager = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // First get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name');

      if (profilesError) throw profilesError;

      // Then get user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine the data
      const usersWithRoles = profiles?.map(profile => {
        const userRole = userRoles?.find(role => role.user_id === profile.id);
        return {
          ...profile,
          role: userRole?.role || null
        };
      }) || [];

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const sendRoleChangeNotification = async (userId: string, userEmail: string, userName: string, newRole: string, oldRole: string | null) => {
    try {
      // Create email notification in database
      await supabase
        .from('email_notifications')
        .insert({
          user_id: userId,
          template_name: 'role_change_notification',
          subject: 'Your Account Role Has Been Updated - OneShop Centrale',
          content: `Your role has been changed from ${oldRole || 'No Role'} to ${newRole}`,
          status: 'pending'
        });

      console.log(`Role change notification queued for ${userEmail}`);
    } catch (error) {
      console.error('Error sending role change notification:', error);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'vendor' | 'buyer') => {
    try {
      setUpdating(userId);

      // Get current role for notification
      const currentUser = users.find(u => u.id === userId);
      const oldRole = currentUser?.role;

      // Check if user already has a role
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existingRole) {
        // Update existing role
        const { error } = await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('user_id', userId);

        if (error) throw error;
      } else {
        // Insert new role
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: newRole });

        if (error) throw error;
      }

      // Send notification email
      if (currentUser) {
        await sendRoleChangeNotification(
          userId, 
          currentUser.email, 
          currentUser.full_name || currentUser.email,
          newRole, 
          oldRole
        );
      }

      // Update local state
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));

      toast({
        title: 'Success',
        description: 'User role updated successfully and notification sent',
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user role',
        variant: 'destructive',
      });
    } finally {
      setUpdating(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleBadgeVariant = (role: string | null) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'vendor': return 'default';
      case 'buyer': return 'secondary';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading users...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Role Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="font-medium">{user.full_name || user.email}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
                <Badge variant={getRoleBadgeVariant(user.role)} className="mt-1">
                  {user.role || 'No Role'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={user.role || ''}
                  onValueChange={(newRole) => updateUserRole(user.id, newRole as 'admin' | 'vendor' | 'buyer')}
                  disabled={updating === user.id}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                {updating === user.id && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
              </div>
            </div>
          ))}
          {users.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUserRoleManager;
