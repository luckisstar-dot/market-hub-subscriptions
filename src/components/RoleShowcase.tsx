
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Store, 
  Shield, 
  TrendingUp, 
  Users, 
  Settings,
  BarChart3,
  Package,
  Star
} from 'lucide-react';

const RoleShowcase = () => {
  const roles = [
    {
      title: 'For Buyers',
      subtitle: 'Discover & Shop',
      description: 'Browse thousands of products from verified vendors with secure checkout and order tracking.',
      icon: ShoppingCart,
      features: [
        'Advanced search & filters',
        'Secure payment processing',
        'Order tracking & history',
        'Review & rating system',
        'Wishlist management',
        'Customer support'
      ],
      color: 'from-green-400 to-blue-500',
      buttonText: 'Start Shopping',
    },
    {
      title: 'For Vendors',
      subtitle: 'Sell & Grow',
      description: 'Launch your online store with powerful tools, analytics, and subscription plans that scale with your business.',
      icon: Store,
      features: [
        'Product management suite',
        'Real-time analytics',
        'Inventory tracking',
        'Customer messaging',
        'Sales reporting',
        'Subscription tiers'
      ],
      color: 'from-purple-400 to-pink-500',
      buttonText: 'Become a Vendor',
    },
    {
      title: 'For Admins',
      subtitle: 'Manage & Monitor',
      description: 'Comprehensive control over the entire marketplace with advanced analytics and management tools.',
      icon: Shield,
      features: [
        'Vendor approval system',
        'Revenue monitoring',
        'User management',
        'Content moderation',
        'System configuration',
        'Advanced reporting'
      ],
      color: 'from-red-400 to-yellow-500',
      buttonText: 'Admin Access',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-marketplace-primary/10 text-marketplace-primary border-marketplace-primary/20">
            Three Powerful Roles
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Built for{' '}
            <span className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary bg-clip-text text-transparent">
              Everyone
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're here to buy, sell, or manage, we've built the perfect experience for your role.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 bg-white">
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <CardHeader className="relative pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${role.color} shadow-lg`}>
                    <role.icon className="h-8 w-8 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {index === 1 ? 'Popular' : 'Essential'}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold mb-2">{role.title}</CardTitle>
                <p className="text-marketplace-primary font-semibold text-lg mb-3">{role.subtitle}</p>
                <p className="text-gray-600">{role.description}</p>
              </CardHeader>

              <CardContent className="relative">
                <ul className="space-y-3 mb-8">
                  {role.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-marketplace-primary rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full bg-gradient-to-r ${role.color} hover:shadow-lg transition-all duration-300 text-white border-0`}
                  size="lg"
                >
                  {role.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: TrendingUp, label: 'Revenue Growth', value: '+156%' },
            { icon: Users, label: 'Active Users', value: '50K+' },
            { icon: Package, label: 'Orders/Month', value: '100K+' },
            { icon: Star, label: 'Satisfaction', value: '98%' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-marketplace-primary/10 rounded-lg mb-3">
                <stat.icon className="h-6 w-6 text-marketplace-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoleShowcase;
