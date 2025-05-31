
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const VendorSubscriptionPlans = () => {
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
      popular: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    if (planId === 'free') {
      navigate('/signup?type=vendor&plan=free');
    } else {
      navigate(`/signup?type=vendor&plan=${planId}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Vendor Plans
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan to start selling on our marketplace. Scale as you grow.
          </p>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vendor Subscription Plans</h2>
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
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VendorSubscriptionPlans;
