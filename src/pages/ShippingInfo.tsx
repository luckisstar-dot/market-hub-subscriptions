
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Clock, MapPin, Package } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ShippingInfo = () => {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      timeframe: '5-7 business days',
      cost: 'Free on orders over $50',
      description: 'Reliable delivery for most orders'
    },
    {
      name: 'Express Shipping',
      timeframe: '2-3 business days',
      cost: '$9.99',
      description: 'Faster delivery for urgent orders'
    },
    {
      name: 'Overnight Shipping',
      timeframe: '1 business day',
      cost: '$19.99',
      description: 'Next day delivery available in select areas'
    },
    {
      name: 'International Shipping',
      timeframe: '7-21 business days',
      cost: 'Varies by destination',
      description: 'Worldwide delivery available'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Shipping Information
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Fast, reliable shipping options to get your orders delivered safely and on time.
          </p>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shipping Options</h2>
            <p className="text-xl text-gray-600">Choose the delivery speed that works best for you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {shippingOptions.map((option, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{option.name}</CardTitle>
                    <Badge variant="outline">{option.cost}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-2 text-marketplace-primary" />
                    <span className="font-semibold">{option.timeframe}</span>
                  </div>
                  <p className="text-gray-600">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Policies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shipping Policies</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-marketplace-primary/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-marketplace-primary" />
                </div>
                <CardTitle className="text-center">Processing Time</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Orders are typically processed within 1-2 business days. Custom or made-to-order items may take longer.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-marketplace-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-marketplace-primary" />
                </div>
                <CardTitle className="text-center">Delivery Areas</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  We ship to all 50 US states and over 100 countries worldwide. Shipping rates vary by location.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-marketplace-primary/10 flex items-center justify-center">
                  <Truck className="h-6 w-6 text-marketplace-primary" />
                </div>
                <CardTitle className="text-center">Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  All orders include tracking information. You'll receive an email with tracking details once your order ships.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Important Notes</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Free standard shipping is available on orders over $50 within the continental United States.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Holiday Shipping</h3>
              <p className="text-gray-600">
                During peak holiday seasons, shipping times may be extended. We recommend placing orders early to ensure timely delivery.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">International Customs</h3>
              <p className="text-gray-600">
                International orders may be subject to customs duties and taxes. These fees are the responsibility of the recipient.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Shipping Restrictions</h3>
              <p className="text-gray-600">
                Some products may have shipping restrictions based on local laws and regulations. Check product pages for specific restrictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShippingInfo;
