
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Store, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-marketplace-primary to-marketplace-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - For Buyers */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-8 text-center">
              <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-white" />
              <h3 className="text-2xl font-bold mb-4">Start Shopping Today</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Discover unique products from verified vendors worldwide. 
                Enjoy secure payments, fast shipping, and excellent customer service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/browse-products">
                    Browse Products
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-marketplace-primary" asChild>
                  <Link to="/categories">
                    View Categories
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right side - For Vendors */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-8 text-center">
              <Store className="h-16 w-16 mx-auto mb-6 text-white" />
              <h3 className="text-2xl font-bold mb-4">Become a Vendor</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Join thousands of successful vendors on our platform. 
                Reach global customers and grow your business with our powerful tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/start-selling">
                    Start Selling
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-marketplace-primary" asChild>
                  <Link to="/subscription-plans">
                    View Plans
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div>
            <Users className="h-8 w-8 mx-auto mb-3 text-blue-200" />
            <div className="text-3xl font-bold mb-1">500K+</div>
            <div className="text-blue-200">Happy Customers</div>
          </div>
          <div>
            <Store className="h-8 w-8 mx-auto mb-3 text-blue-200" />
            <div className="text-3xl font-bold mb-1">10K+</div>
            <div className="text-blue-200">Active Vendors</div>
          </div>
          <div>
            <ShoppingCart className="h-8 w-8 mx-auto mb-3 text-blue-200" />
            <div className="text-3xl font-bold mb-1">2M+</div>
            <div className="text-blue-200">Products</div>
          </div>
          <div>
            <TrendingUp className="h-8 w-8 mx-auto mb-3 text-blue-200" />
            <div className="text-3xl font-bold mb-1">98%</div>
            <div className="text-blue-200">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
