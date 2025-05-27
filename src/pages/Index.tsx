
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import RoleShowcase from '@/components/RoleShowcase';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import Footer from '@/components/Footer';

const Index = () => {
  // For demo purposes, you can change this to test different user roles
  // null = not logged in, 'buyer', 'vendor', or 'admin'
  const userRole = null;

  return (
    <div className="min-h-screen bg-white">
      <Header userRole={userRole} />
      <HeroSection />
      <RoleShowcase />
      <SubscriptionPlans />
      <Footer />
    </div>
  );
};

export default Index;
