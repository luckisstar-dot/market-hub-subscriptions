
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Users, Store, Briefcase, Building2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const BuyerSubscriptionPlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: 'free',
      name: 'Marketplace Viewer',
      price: 0,
      billing: 'forever',
      description: 'General public, retail window shoppers',
      icon: Users,
      features: [
        'View all products',
        'No supplier contact',
        'Access to public pricing only',
        'Can favorite products (but not engage vendors)'
      ],
      popular: false
    },
    {
      id: 'connect',
      name: 'Buyer Connect',
      price: 9.99,
      billing: 'monthly',
      description: 'Small-scale buyers, boutique stores',
      icon: Store,
      features: [
        'Contact up to 5 vendors/month',
        'Access basic supplier info',
        'Request sample availability',
        'One intro email per vendor via platform'
      ],
      popular: false
    },
    {
      id: 'trade',
      name: 'Direct Trade',
      price: 21.99,
      billing: 'monthly',
      description: 'Resellers, wholesalers, distributors',
      icon: Briefcase,
      features: [
        'Unlimited supplier messaging',
        'Download product catalogs / MOQ lists',
        'Access to verified vendor badge filter',
        'RFQ (Request for Quotation) tool',
        'Priority supplier replies'
      ],
      popular: true
    },
    {
      id: 'global',
      name: 'Global Access Pass',
      price: 149.99,
      billing: 'monthly',
      description: 'Corporate procurement teams, export agents',
      icon: Building2,
      features: [
        'Everything in Direct Trade, plus:',
        'Direct Zoom/WhatsApp intro setup',
        '1-on-1 sourcing consultant',
        'Buyer showcase feature on platform',
        'Export documentation support'
      ],
      popular: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    if (planId === 'free') {
      navigate('/signup?type=buyer&plan=free');
    } else {
      navigate(`/signup?type=buyer&plan=${planId}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Buyer Plans
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan to access suppliers and products with different levels of engagement.
          </p>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Buyer Subscription Plans</h2>
            <p className="text-xl text-gray-600">Find the right level of marketplace access for your business</p>
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

export default BuyerSubscriptionPlans;
