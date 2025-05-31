
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Shield, Clock, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Returns = () => {
  const returnSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Contact the vendor or use our return portal within 30 days of delivery'
    },
    {
      step: 2,
      title: 'Get Authorization',
      description: 'Receive return authorization and shipping instructions from the vendor'
    },
    {
      step: 3,
      title: 'Ship Item Back',
      description: 'Package item securely and ship using provided return label'
    },
    {
      step: 4,
      title: 'Receive Refund',
      description: 'Get your refund processed within 5-7 business days after vendor receives item'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Returns & Refunds
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Easy returns and hassle-free refunds to ensure your complete satisfaction.
          </p>
        </div>
      </section>

      {/* Return Policy */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Return Policy</h2>
            <p className="text-xl text-gray-600">We want you to be completely satisfied with your purchase</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-marketplace-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-marketplace-primary" />
                </div>
                <CardTitle className="text-center">30-Day Window</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Return items within 30 days of delivery for a full refund or exchange.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-marketplace-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-marketplace-primary" />
                </div>
                <CardTitle className="text-center">Original Condition</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Items must be unused, in original packaging, and in the same condition as received.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-marketplace-primary/10 flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-marketplace-primary" />
                </div>
                <CardTitle className="text-center">Easy Process</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Simple online return process with prepaid shipping labels provided.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-marketplace-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-marketplace-primary" />
                </div>
                <CardTitle className="text-center">Fast Refunds</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Refunds processed within 5-7 business days after we receive your return.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Return an Item</h2>
            <p className="text-xl text-gray-600">Follow these simple steps to return your purchase</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {returnSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-marketplace-primary text-white flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg">
              Start a Return
            </Button>
          </div>
        </div>
      </section>

      {/* Return Conditions */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Return Conditions</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Eligible for Return
              </h3>
              <ul className="space-y-2 text-gray-600 ml-7">
                <li>• Items returned within 30 days of delivery</li>
                <li>• Items in original, unused condition</li>
                <li>• Items with original packaging and tags</li>
                <li>• Items not damaged by normal wear and tear</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-red-600">Not Eligible for Return</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Personalized or custom-made items</li>
                <li>• Perishable goods (food, flowers, etc.)</li>
                <li>• Intimate or sanitary goods</li>
                <li>• Items damaged due to misuse</li>
                <li>• Digital products or downloads</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Refund Methods</h3>
              <p className="text-gray-600 mb-2">
                Refunds will be issued to the original payment method used for the purchase:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Credit cards: 3-5 business days</li>
                <li>• PayPal: 1-2 business days</li>
                <li>• Bank transfers: 5-7 business days</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Returns;
