
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Store, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const VendorRegistration = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    location: '',
    email: '',
    password: '',
    fullName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const planType = searchParams.get('plan');
  const isFreePlan = planType === 'free';

  useEffect(() => {
    if (user) {
      navigate('/vendor-dashboard');
    }
  }, [user, navigate]);

  // Get selected plan data from sessionStorage if it's a paid plan
  const selectedPlan = !isFreePlan ? JSON.parse(sessionStorage.getItem('selectedPlan') || '{}') : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userData = {
        full_name: formData.fullName,
        user_type: 'vendor',
        business_name: formData.businessName,
        business_description: formData.description,
        business_location: formData.location,
        plan_type: planType || 'free'
      };

      const { error: signUpError } = await signUp(formData.email, formData.password, userData);

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (isFreePlan) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/vendor-dashboard');
        }, 2000);
      } else {
        // For paid plans, proceed to payment
        // The actual payment processing would happen here
        // For now, we'll simulate success
        setSuccess(true);
        setTimeout(() => {
          navigate('/vendor-dashboard');
        }, 2000);
      }

    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">
              {isFreePlan 
                ? 'Your free vendor account has been created successfully.'
                : `Your ${selectedPlan?.planName} subscription has been activated.`
              }
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-marketplace-primary/10 text-marketplace-primary">
              <Store className="h-4 w-4 mr-2" />
              Vendor Registration
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Start Your Selling Journey
            </h1>
            {selectedPlan && !isFreePlan && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900">Selected Plan: {selectedPlan.planName}</h3>
                <p className="text-blue-700">Price: {selectedPlan.price}/month</p>
              </div>
            )}
            {isFreePlan && (
              <p className="text-gray-600">Create your free vendor account to start selling</p>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Vendor Registration Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell us about your business..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Business Location</Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isFreePlan 
                    ? 'Create Free Vendor Account'
                    : `Register & Subscribe to ${selectedPlan?.planName || 'Plan'}`
                  }
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By registering, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VendorRegistration;
