
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Store, Users, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const stats = [
    { label: 'Active Vendors', value: '10,000+', icon: Store },
    { label: 'Happy Customers', value: '500,000+', icon: Users },
    { label: 'Products Listed', value: '2M+', icon: ShoppingCart },
    { label: 'Average Rating', value: '4.8/5', icon: Star },
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 pb-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <Badge className="mb-6 bg-gradient-to-r from-marketplace-primary to-marketplace-secondary text-white">
            🚀 Multi-Vendor Marketplace Platform
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Connect{' '}
            <span className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary bg-clip-text text-transparent">
              Buyers & Vendors
            </span>
            <br />
            in One Platform
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join thousands of vendors and millions of customers in our comprehensive marketplace ecosystem. 
            Start selling or shopping with powerful tools and subscription plans tailored for your needs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" className="bg-marketplace-primary hover:bg-marketplace-primary-dark text-white px-8 py-3" asChild>
              <Link to="/vendor-subscription-plans">
                <Store className="mr-2 h-5 w-5" />
                Start Selling
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3" asChild>
              <Link to="/browse-products">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Shop Now
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-marketplace-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="w-3 h-3 bg-marketplace-primary rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-40 right-16 animate-bounce" style={{ animationDelay: '1s' }}>
        <div className="w-2 h-2 bg-marketplace-secondary rounded-full opacity-60"></div>
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce" style={{ animationDelay: '2s' }}>
        <div className="w-4 h-4 bg-marketplace-accent rounded-full opacity-60"></div>
      </div>
    </div>
  );
};

export default HeroSection;
