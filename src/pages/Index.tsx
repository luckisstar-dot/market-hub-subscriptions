
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryShowcase from '@/components/CategoryShowcase';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import MetaTags from '@/components/SEO/MetaTags';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Determine user role from the database once user is authenticated
  const userRole = user ? 'buyer' : null; // For now, default to buyer. We can enhance this later.

  return (
    <>
      <MetaTags
        title="Modern Marketplace"
        description="Discover a wide range of products from trusted vendors all in one place."
        keywords={['marketplace', 'shopping', 'ecommerce', 'vendors', 'products']}
      />
      
      <div className="min-h-screen bg-white">
        <Header userRole={userRole} />
        <HeroSection />
        
        {/* New Demo Feature Showcase */}
        <div className="bg-blue-50 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                New Platform Features
              </h2>
              <p className="text-lg text-blue-700">
                Experience our latest innovations: real-time chat, advanced search,
                notifications, and more!
              </p>
            </div>

            <div className="flex justify-center">
              <Button size="lg" asChild>
                <Link to="/demo">
                  <Rocket className="mr-2 h-5 w-5" />
                  Explore Demo Features
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <FeaturedProducts />
        <CategoryShowcase />
        <CallToAction />
        <Footer />
      </div>
    </>
  );
};

export default Index;
