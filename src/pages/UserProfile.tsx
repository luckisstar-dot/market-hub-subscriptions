
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/contexts/UserRoleContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  address: any;
  user_type: string;
  plan_type: string;
  created_at: string;
}

const UserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { userRole } = useUserRole();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile(data);
      setFormData({
        full_name: data.full_name || '',
        phone: data.phone || '',
        address: data.address || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        }
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          address: formData.address,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      await fetchProfile();
      setIsEditing(false);
      
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        address: profile.address || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        }
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header userRole={userRole} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header userRole={userRole} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Profile not found</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole={userRole} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Profile</h1>
          <p className="text-gray-600">Manage your account settings and personal information.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={profile.avatar_url || ''} />
                  <AvatarFallback>
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{profile.full_name || profile.email}</CardTitle>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge variant="outline">{userRole}</Badge>
                  <Badge variant="secondary">{profile.plan_type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {profile.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {new Date(profile.created_at).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSave} disabled={saving}>
                        <Save className="w-4 h-4 mr-2" />
                        {saving ? 'Saving...' : 'Save'}
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm text-gray-600 mt-1">{formData.full_name || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <p className="text-sm text-gray-600 mt-1">{profile.email}</p>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm text-gray-600 mt-1">{formData.phone || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Address</Label>
                  {isEditing ? (
                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                      <Input
                        placeholder="Street"
                        value={formData.address.street}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, street: e.target.value }
                        }))}
                      />
                      <Input
                        placeholder="City"
                        value={formData.address.city}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, city: e.target.value }
                        }))}
                      />
                      <Input
                        placeholder="State"
                        value={formData.address.state}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, state: e.target.value }
                        }))}
                      />
                      <Input
                        placeholder="ZIP Code"
                        value={formData.address.zipCode}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, zipCode: e.target.value }
                        }))}
                      />
                      <Input
                        placeholder="Country"
                        value={formData.address.country}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, country: e.target.value }
                        }))}
                      />
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600 mt-1">
                      {formData.address.street || formData.address.city ? (
                        <div>
                          {formData.address.street && <div>{formData.address.street}</div>}
                          <div>
                            {[formData.address.city, formData.address.state, formData.address.zipCode]
                              .filter(Boolean).join(', ')}
                          </div>
                          {formData.address.country && <div>{formData.address.country}</div>}
                        </div>
                      ) : (
                        'Not provided'
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
