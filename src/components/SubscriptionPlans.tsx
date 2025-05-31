import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Star, Crown, Zap, Store, Users, Briefcase, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionPlans = () => {
  const navigate = useNavigate();

  const handlePlanSelection = (userType: 'buyer' | 'vendor', planName: string, price: string) => {
    const isFree = price === '$0';
    
    if (isFree) {
      // For free plans, go directly to signup
      if (userType === 'buyer') {
        navigate('/signup?type=buyer&plan=free');
      } else {
        navigate('/signup?type=vendor&plan=free');
      }
    } else {
      // For paid plans, go to checkout first
      const planData = {
        userType,
        planName,
        price: price.split(' ')[0], // Get just the price part before any dash
        redirectUrl: userType === 'buyer' ? '/signup?type=buyer' : '/signup?type=vendor'
      };
      
      // Store plan data in sessionStorage for the checkout process
      sessionStorage.setItem('selectedPlan', JSON.stringify(planData));
      
      // Navigate to checkout with plan context
      navigate('/checkout', { state: planData });
    }
  };

  const vendorPlans = [
    {
      name: 'Basic Listing',
      subtitle: 'Free',
      price: '$0',
      period: '/month',
      description: 'Trial users, hobby sellers, testing platform',
      icon: Zap,
      features: [
        'Max 5 products',
        'Limited customization',
        'No direct buyer contact',
        'Standard listing (not searchable by keyword priority)',
        'Access to OneShop blog community only',
      ],
      buttonText: 'Start Free',
      popular: false,
      color: 'bg-gray-50 border-gray-200',
      buttonColor: 'bg-gray-900 hover:bg-gray-800',
    },
    {
      name: 'Growth Partner',
      subtitle: 'Standard',
      price: '$9.99',
      period: '/month',
      description: 'Serious vendors with limited product catalog',
      icon: Star,
      features: [
        'Up to 20 products',
        'SEO-optimized listings',
        'Limited direct buyer chat (template replies)',
        'Discounted access to product review features',
        'Monthly vendor performance report',
      ],
      buttonText: 'Go Growth',
      popular: false,
      color: 'bg-blue-50 border-blue-200',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Pro Partner',
      subtitle: 'Pro',
      price: '$21.99',
      period: '/month',
      description: 'Mid-size vendors, small African exporters',
      icon: Crown,
      features: [
        'Unlimited products',
        'Full buyer messaging',
        'Access to affiliate program',
        'Featured placement on homepage (rotating)',
        'Discounted logistics/fulfillment services',
        'Inclusion in monthly ad campaigns',
        'Priority customer service',
      ],
      buttonText: 'Go Pro',
      popular: true,
      color: 'bg-gradient-to-br from-purple-50 to-pink-50 border-marketplace-primary',
      buttonColor: 'bg-marketplace-primary hover:bg-marketplace-primary-dark',
    },
    {
      name: 'Power Vendor',
      subtitle: 'Premium/Elite',
      price: '$99.99',
      period: '/month',
      description: 'Large-scale vendors, wholesalers, agencies',
      icon: Building2,
      features: [
        'All Pro features +',
        'Dedicated account manager',
        'Custom promotions with email marketing support',
        'Product review video (1 per quarter)',
        'Analytics dashboard with competitor insights',
        'Exclusive training & vendor webinars',
        'Inclusion in North America Product Expo & Afro Expo list',
      ],
      buttonText: 'Go Premium',
      popular: false,
      color: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
    },
  ];

  const buyerPlans = [
    {
      name: 'Marketplace Viewer',
      subtitle: 'Free Access',
      price: '$0',
      period: '/month',
      description: 'General public, retail window shoppers',
      icon: Users,
      features: [
        'View all products',
        'No supplier contact',
        'Access to public pricing only',
        'Can favorite products (but not engage vendors)',
      ],
      buttonText: 'Browse Free',
      popular: false,
      color: 'bg-gray-50 border-gray-200',
      buttonColor: 'bg-gray-900 hover:bg-gray-800',
    },
    {
      name: 'Buyer Connect',
      subtitle: 'Verified Buyer',
      price: '$9.99',
      period: '/month',
      description: 'Small-scale buyers, boutique stores',
      icon: Store,
      features: [
        'Contact up to 5 vendors/month',
        'Access basic supplier info (company profile, top products)',
        'Request sample availability',
        'One intro email per vendor via platform',
      ],
      buttonText: 'Connect Now',
      popular: false,
      color: 'bg-green-50 border-green-200',
      buttonColor: 'bg-green-600 hover:bg-green-700',
    },
    {
      name: 'Direct Trade',
      subtitle: 'Business Buyer',
      price: '$21.99',
      period: '/month',
      description: 'Resellers, wholesalers, distributors',
      icon: Briefcase,
      features: [
        'Unlimited supplier messaging',
        'Download product catalogs / MOQ lists',
        'Access to verified vendor badge filter',
        'RFQ (Request for Quotation) tool',
        'Priority supplier replies',
      ],
      buttonText: 'Start Trading',
      popular: true,
      color: 'bg-gradient-to-br from-blue-50 to-purple-50 border-marketplace-primary',
      buttonColor: 'bg-marketplace-primary hover:bg-marketplace-primary-dark',
    },
    {
      name: 'Global Access Pass',
      subtitle: 'Corporate Buyer',
      price: '$149.99',
      period: '/month',
      description: 'Corporate procurement teams, export agents',
      icon: Building2,
      features: [
        'Everything in Direct Trade, plus:',
        'Direct Zoom/WhatsApp intro setup (white-glove service)',
        '1-on-1 sourcing consultant (optional add-on)',
        'Buyer showcase feature on platform',
        'Export documentation support',
      ],
      buttonText: 'Get Global Access',
      popular: false,
      color: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  const addOns = [
    { name: 'Sourcing Concierge Service', price: '$49/request' },
    { name: 'Supplier Verification Report', price: '$25/vendor' },
    { name: 'Export Advisory Call', price: '$99/hour' },
    { name: 'Custom Packaging Coordination', price: 'Pricing on request' },
  ];

  const renderPlans = (plans: typeof vendorPlans, userType: 'buyer' | 'vendor') => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
          
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-3 p-2 rounded-full bg-white shadow-lg">
              <plan.icon className="h-6 w-6 text-marketplace-primary" />
            </div>
            <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
            <Badge variant="outline" className="mx-auto">{plan.subtitle}</Badge>
            <div className="mt-3">
              <span className="text-2xl font-bold">{plan.price}</span>
              <span className="text-gray-600 text-sm">{plan.period}</span>
            </div>
            <p className="text-gray-600 mt-2 text-sm">{plan.description}</p>
          </CardHeader>

          <CardContent className="pt-0">
            <Button 
              className={`w-full mb-4 ${plan.buttonColor} text-white`}
              size="sm"
              onClick={() => handlePlanSelection(userType, plan.name, plan.price)}
            >
              {plan.buttonText}
            </Button>

            <ul className="space-y-2">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-marketplace-secondary/10 text-marketplace-secondary border-marketplace-secondary/20">
            Choose Your Plan
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Select Your{' '}
            <span className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose whether you're selling or buying, then select the plan that fits your needs.
          </p>
        </div>

        <Tabs defaultValue="vendors" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="vendors" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Vendor Plans
            </TabsTrigger>
            <TabsTrigger value="buyers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Buyer Plans
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vendors">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Vendor Subscription Tiers</h3>
              <p className="text-gray-600">Sell your products globally with our tiered marketplace access</p>
            </div>
            {renderPlans(vendorPlans, 'vendor')}
          </TabsContent>

          <TabsContent value="buyers">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Buyer Subscription Tiers</h3>
              <p className="text-gray-600">Access suppliers and products with different levels of engagement</p>
            </div>
            {renderPlans(buyerPlans, 'buyer')}
            
            {/* Buyer Add-ons */}
            <div className="mt-12">
              <div className="text-center mb-8">
                <h4 className="text-xl font-bold mb-4">Optional Add-ons for Buyers</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  {addOns.map((addon, index) => (
                    <Card key={index} className="text-center p-4">
                      <h5 className="font-semibold text-sm mb-2">{addon.name}</h5>
                      <p className="text-marketplace-primary font-bold text-sm">{addon.price}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-marketplace-primary/10 to-marketplace-secondary/10 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-bold mb-2">Special Offers</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <Badge className="mb-2">Annual Discount</Badge>
                <p>2 months free on annual payment</p>
              </div>
              <div>
                <Badge className="mb-2">Launch Promo</Badge>
                <p>50% off first 3 months for early adopters</p>
              </div>
              <div>
                <Badge className="mb-2">Included Add-ons</Badge>
                <p>Premium video review ($49), Fulfillment add-on ($30/month)</p>
              </div>
            </div>
          </div>
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
