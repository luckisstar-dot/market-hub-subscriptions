
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, User, Store, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const userType = searchParams.get('type'); // 'buyer' or null
  const planType = searchParams.get('plan'); // 'free' or null
  const isFreePlan = planType === 'free';

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const userData = {
      full_name: fullName,
      user_type: userType || 'buyer',
      plan_type: planType || 'free'
    };
    
    const { error } = await signUp(email, password, userData);
    
    if (error) {
      setError(error.message);
    } else {
      setError('');
      alert('Account created successfully! Check your email for a confirmation link.');
      navigate('/');
    }
    
    setLoading(false);
  };

  const handleGoToPlans = () => {
    navigate('/subscription-plans');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="text-center">
              {userType && (
                <div className="mb-4 flex justify-center">
                  <Badge className="flex items-center gap-2 bg-marketplace-primary/10 text-marketplace-primary">
                    {userType === 'buyer' ? <User className="h-4 w-4" /> : <Store className="h-4 w-4" />}
                    {userType === 'buyer' ? 'Buyer Account' : 'Vendor Account'}
                  </Badge>
                </div>
              )}
              <CardTitle className="text-center text-2xl font-bold">
                Create Your Account
              </CardTitle>
              {isFreePlan && (
                <p className="text-sm text-gray-600 mt-2">
                  Creating your free {userType || 'buyer'} account
                </p>
              )}
              {!userType && !planType && (
                <p className="text-sm text-gray-600 mt-2">
                  Join OneShop Centrale today
                </p>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!userType && !planType ? (
              <div className="space-y-4">
                <p className="text-center text-gray-600 mb-6">
                  Choose your subscription plan to get started
                </p>
                <Button 
                  onClick={handleGoToPlans} 
                  className="w-full"
                  size="lg"
                >
                  View Subscription Plans
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Already have an account?{' '}
                    <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/auth')}>
                      Sign in here
                    </Button>
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
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
                  {isFreePlan ? `Create Free ${userType || 'Buyer'} Account` : 'Create Account'}
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Already have an account?{' '}
                    <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/auth')}>
                      Sign in here
                    </Button>
                  </p>
                </div>
              </form>
            )}
            
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

export default SignUp;
