
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryShowcase from '@/components/CategoryShowcase';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

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
    <div className="min-h-screen bg-white">
      <Header userRole={userRole} />
      <HeroSection />
      <FeaturedProducts />
      <CategoryShowcase />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
