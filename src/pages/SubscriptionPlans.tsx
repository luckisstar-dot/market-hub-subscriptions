
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const SubscriptionPlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      billing: 'forever',
      description: 'Perfect for getting started',
      icon: Star,
      features: [
        'Up to 10 products',
        'Basic analytics',
        'Email support',
        'Standard listing',
        '5% commission rate'
      ],
      maxProducts: 10,
      maxOrders: 50,
      commission: 5.0,
      popular: false
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 29.99,
      billing: 'monthly',
      description: 'Great for small businesses',
      icon: Zap,
      features: [
        'Up to 100 products',
        'Advanced analytics',
        'Priority email support',
        'Featured listings',
        '3% commission rate',
        'Custom store page'
      ],
      maxProducts: 100,
      maxOrders: 500,
      commission: 3.0,
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 99.99,
      billing: 'monthly',
      description: 'Perfect for growing businesses',
      icon: Crown,
      features: [
        'Up to 1,000 products',
        'Premium analytics & insights',
        'Phone & email support',
        'Priority featured listings',
        '2% commission rate',
        'Custom branding',
        'Marketing tools'
      ],
      maxProducts: 1000,
      maxOrders: 5000,
      commission: 2.0,
      popular: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299.99,
      billing: 'monthly',
      description: 'For large-scale operations',
      icon: Crown,
      features: [
        'Unlimited products',
        'Enterprise analytics',
        'Dedicated account manager',
        'Premium placement',
        '1.5% commission rate',
        'White-label solutions',
        'API access',
        'Custom integrations'
      ],
      maxProducts: -1,
      maxOrders: -1,
      commission: 1.5,
      popular: false
    }
  ];

  const handleSelectPlan = (planId: string, userType: string = 'vendor') => {
    // Store plan information for later use
    const selectedPlan = plans.find(plan => plan.id === planId);
    if (selectedPlan) {
      const planData = {
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        price: selectedPlan.price,
        billing: selectedPlan.billing,
        userType
      };
      
      // Store in sessionStorage for use in signup and onboarding
      sessionStorage.setItem('selectedPlan', JSON.stringify(planData));
    }

    if (planId === 'free') {
      navigate(`/signup?type=${userType}&plan=free`);
    } else {
      // For paid plans, redirect to signup with plan info
      navigate(`/signup?type=${userType}&plan=${planId}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Select the perfect plan for your business needs. Start free and upgrade as you grow.
          </p>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscription Plans</h2>
            <p className="text-xl text-gray-600">All plans include our core marketplace features</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-marketplace-primary' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-marketplace-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-marketplace-primary/10 w-16 h-16 flex items-center justify-center">
                    <plan.icon className="h-8 w-8 text-marketplace-primary" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-marketplace-primary">
                    ${plan.price}
                    <span className="text-sm font-normal text-gray-600">/{plan.billing}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleSelectPlan(plan.id, 'vendor')}
                    >
                      Start as Vendor
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="ghost"
                      onClick={() => handleSelectPlan(plan.id, 'buyer')}
                    >
                      Join as Buyer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">Can I change plans later?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens if I exceed my limits?</h3>
              <p className="text-gray-600">We'll notify you when you're approaching your limits and help you upgrade to a suitable plan.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a setup fee?</h3>
              <p className="text-gray-600">No, there are no setup fees. You only pay the monthly subscription fee for your chosen plan.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription at any time. Your account will remain active until the end of your billing period.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SubscriptionPlans;
