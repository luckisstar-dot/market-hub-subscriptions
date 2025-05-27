
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';

const SubscriptionPlans = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$29',
      period: '/month',
      description: 'Perfect for new vendors getting started',
      icon: Zap,
      features: [
        'Up to 100 products',
        'Basic analytics',
        '5% commission rate',
        'Email support',
        'Standard listing',
        'Mobile responsive store',
      ],
      buttonText: 'Start Basic',
      popular: false,
      color: 'bg-gray-50 border-gray-200',
      buttonColor: 'bg-gray-900 hover:bg-gray-800',
    },
    {
      name: 'Premium',
      price: '$79',
      period: '/month',
      description: 'Best for growing businesses',
      icon: Star,
      features: [
        'Up to 1,000 products',
        'Advanced analytics',
        '3% commission rate',
        'Priority support',
        'Featured listings',
        'Custom store themes',
        'Inventory management',
        'Multi-payment options',
      ],
      buttonText: 'Go Premium',
      popular: true,
      color: 'bg-gradient-to-br from-blue-50 to-purple-50 border-marketplace-primary',
      buttonColor: 'bg-marketplace-primary hover:bg-marketplace-primary-dark',
    },
    {
      name: 'Professional',
      price: '$199',
      period: '/month',
      description: 'For established businesses',
      icon: Crown,
      features: [
        'Unlimited products',
        'Real-time analytics',
        '1% commission rate',
        '24/7 phone support',
        'Premium placements',
        'White-label options',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
      ],
      buttonText: 'Go Professional',
      popular: false,
      color: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-marketplace-secondary/10 text-marketplace-secondary border-marketplace-secondary/20">
            Vendor Subscription Plans
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary bg-clip-text text-transparent">
              Growth Plan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your vendor journey with the perfect plan. Scale as you grow with features designed for success.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.color} ${plan.popular ? 'scale-105 shadow-2xl' : 'shadow-lg'} transition-all duration-300 hover:shadow-xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-marketplace-primary text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-4 p-3 rounded-full bg-white shadow-lg">
                  <plan.icon className="h-8 w-8 text-marketplace-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <Button 
                  className={`w-full mb-6 ${plan.buttonColor} text-white`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
          <Button variant="link" className="text-marketplace-primary">
            Compare all features →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
