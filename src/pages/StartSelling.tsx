
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Store, Users, TrendingUp, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const StartSelling = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Store,
      title: 'Global Marketplace',
      description: 'Reach customers worldwide with our extensive marketplace platform'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Get personalized assistance from our vendor success team'
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Insights',
      description: 'Track your performance with detailed analytics and reporting'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with multiple options'
    }
  ];

  const steps = [
    {
      step: 1,
      title: 'Create Your Account',
      description: 'Sign up and verify your business information'
    },
    {
      step: 2,
      title: 'Set Up Your Store',
      description: 'Add your products, descriptions, and pricing'
    },
    {
      step: 3,
      title: 'Go Live',
      description: 'Start selling to customers around the world'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Start Selling Today
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of vendors who are growing their business on our global marketplace platform
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-lg px-8 py-4"
            onClick={() => navigate('/vendor-registration')}
          >
            <Store className="h-5 w-5 mr-2" />
            Start Your Journey
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600">Everything you need to succeed as a vendor</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 rounded-full bg-marketplace-primary/10 w-16 h-16 flex items-center justify-center">
                    <benefit.icon className="h-8 w-8 text-marketplace-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in just 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-marketplace-primary text-white flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-marketplace-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Selling?</h2>
          <p className="text-xl text-blue-100 mb-8">Join our marketplace today and grow your business</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/vendor-registration')}
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Create Free Account
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-marketplace-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StartSelling;
