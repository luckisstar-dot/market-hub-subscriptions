
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, Store, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const steps = [
  { id: 1, title: 'Business Information', description: 'Tell us about your business' },
  { id: 2, title: 'Contact Details', description: 'How customers can reach you' },
  { id: 3, title: 'Business Verification', description: 'Verify your business documents' },
  { id: 4, title: 'Plan Selection', description: 'Choose your subscription plan' },
  { id: 5, title: 'Review & Complete', description: 'Review and complete setup' }
];

const VendorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const planType = searchParams.get('plan');
  const isFreePlan = planType === 'free';

  const [formData, setFormData] = useState({
    // Step 1: Business Information
    businessName: '',
    businessType: '',
    description: '',
    website: '',
    
    // Step 2: Contact Details
    location: '',
    phone: '',
    supportEmail: '',
    
    // Step 3: Business Verification
    businessLicense: '',
    taxId: '',
    
    // Step 4: Plan Selection (from URL params)
    selectedPlan: planType || 'free'
  });

  useEffect(() => {
    if (user) {
      // Check if user is already a vendor
      navigate('/vendor-dashboard');
    }
  }, [user, navigate]);

  const selectedPlan = !isFreePlan ? JSON.parse(sessionStorage.getItem('selectedPlan') || '{}') : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.businessName && formData.businessType && formData.description;
      case 2:
        return formData.location && formData.phone;
      case 3:
        return true; // Optional verification
      case 4:
        return formData.selectedPlan;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
      setError('');
    } else {
      setError('Please fill in all required fields');
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // Simulate vendor profile setup
      // In a real app, this would create vendor profile in database
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/vendor-dashboard');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Setup failed');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="businessType">Business Type *</Label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marketplace-primary"
                required
              >
                <option value="">Select business type</option>
                <option value="retail">Retail</option>
                <option value="wholesale">Wholesale</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="service">Service Provider</option>
                <option value="digital">Digital Products</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="description">Business Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your business and what you sell..."
                rows={4}
                required
              />
            </div>
            <div>
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Business Location *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, State, Country"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="supportEmail">Support Email (Optional)</Label>
              <Input
                id="supportEmail"
                name="supportEmail"
                type="email"
                value={formData.supportEmail}
                onChange={handleInputChange}
                placeholder="support@yourbusiness.com"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Business Verification</h3>
              <p className="text-gray-600">These documents help us verify your business (optional for now)</p>
            </div>
            <div>
              <Label htmlFor="businessLicense">Business License Number</Label>
              <Input
                id="businessLicense"
                name="businessLicense"
                value={formData.businessLicense}
                onChange={handleInputChange}
                placeholder="Enter your business license number"
              />
            </div>
            <div>
              <Label htmlFor="taxId">Tax ID / EIN</Label>
              <Input
                id="taxId"
                name="taxId"
                value={formData.taxId}
                onChange={handleInputChange}
                placeholder="Enter your tax identification number"
              />
            </div>
            <Alert>
              <AlertDescription>
                You can skip verification for now and complete it later from your vendor dashboard.
              </AlertDescription>
            </Alert>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Plan Selection</h3>
              <p className="text-gray-600">Choose the plan that best fits your business needs</p>
            </div>
            
            {selectedPlan && !isFreePlan ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900">Selected Plan: {selectedPlan.planName}</h4>
                <p className="text-blue-700">Price: {selectedPlan.price}/month</p>
                <p className="text-sm text-blue-600 mt-2">{selectedPlan.description}</p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900">Free Plan Selected</h4>
                <p className="text-green-700">Perfect for getting started</p>
                <ul className="text-sm text-green-600 mt-2 list-disc list-inside">
                  <li>Up to 10 products</li>
                  <li>Basic analytics</li>
                  <li>Standard support</li>
                </ul>
              </div>
            )}
            
            <div className="text-center">
              <Button variant="outline" onClick={() => navigate('/vendor-subscription-plans')}>
                Change Plan
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Review Your Information</h3>
              <p className="text-gray-600">Please review your information before completing setup</p>
            </div>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Business Information</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Name:</strong> {formData.businessName}</p>
                  <p><strong>Type:</strong> {formData.businessType}</p>
                  <p><strong>Description:</strong> {formData.description}</p>
                  {formData.website && <p><strong>Website:</strong> {formData.website}</p>}
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Contact Details</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Location:</strong> {formData.location}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  {formData.supportEmail && <p><strong>Support Email:</strong> {formData.supportEmail}</p>}
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Selected Plan</h4>
                <div className="text-sm text-gray-600">
                  <p>{isFreePlan ? 'Free Plan' : selectedPlan?.planName || 'Free Plan'}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Welcome to OneShop!</h2>
            <p className="text-gray-600 mb-4">
              Your vendor account has been set up successfully.
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-marketplace-primary/10 text-marketplace-primary">
              <Store className="h-4 w-4 mr-2" />
              Vendor Onboarding
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {steps[currentStep - 1].title}
            </h1>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>Step {currentStep} of {steps.length}</span>
              <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
            </div>
            <Progress value={(currentStep / steps.length) * 100} className="h-2" />
          </div>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Step {currentStep}: {steps[currentStep - 1].title}</span>
                <Badge variant="outline">{currentStep}/{steps.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderStepContent()}

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < steps.length ? (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Complete Setup
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VendorOnboarding;
