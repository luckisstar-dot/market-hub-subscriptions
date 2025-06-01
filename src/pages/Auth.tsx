
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Loader2, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, user } = useAuth();
  const { userRole } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && userRole) {
      // Redirect based on user role and check if onboarding is needed
      switch (userRole) {
        case 'vendor':
          // Check if vendor onboarding is completed
          // In a real app, you'd check this from the database
          // For now, redirect to vendor dashboard
          navigate('/vendor-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'buyer':
        default:
          navigate('/');
          break;
      }
    }
  }, [user, userRole, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // Note: redirection will be handled by useEffect when user/userRole updates
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Welcome Back
            </CardTitle>
            <p className="text-center text-gray-600">
              Sign in to your OneShop Centrale account
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                className="text-sm text-marketplace-primary"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot your password?
              </Button>
            </div>
            
            <div className="mt-6 text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-50 px-2 text-muted-foreground">New to OneShop?</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate('/subscription-plans')}
                >
                  Choose Your Plan & Sign Up
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full text-sm" 
                  onClick={() => navigate('/signup')}
                >
                  Quick Sign Up (Free Plan)
                </Button>
              </div>
              
              <p className="text-xs text-gray-500">
                New users should select a subscription plan to get started
              </p>
            </div>
            
            {error && (
              <Alert className="mt-4" variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
