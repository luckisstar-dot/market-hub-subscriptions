
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Clock, Percent } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      name: 'Premium Coffee Bundle',
      originalPrice: '$49.99',
      salePrice: '$34.99',
      vendor: 'African Beans Co.',
      rating: 4.8,
      discount: 30,
      timeLeft: '2 days',
      category: 'Food & Beverages'
    },
    {
      id: 2,
      name: 'Handmade Jewelry Collection',
      originalPrice: '$149.99',
      salePrice: '$99.99',
      vendor: 'Artisan Crafts',
      rating: 4.9,
      discount: 33,
      timeLeft: '5 hours',
      category: 'Jewelry'
    },
    {
      id: 3,
      name: 'Organic Spice Mega Pack',
      originalPrice: '$59.99',
      salePrice: '$39.99',
      vendor: 'Spice Masters',
      rating: 4.7,
      discount: 33,
      timeLeft: '1 day',
      category: 'Food & Beverages'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Special Offers</h1>
          <p className="text-gray-600">Limited time deals and exclusive discounts</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="hover:shadow-lg transition-shadow border-red-200">
              <CardHeader className="p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 relative">
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    <Percent className="h-3 w-3 mr-1" />
                    {offer.discount}% OFF
                  </Badge>
                </div>
                <CardTitle className="text-lg">{offer.name}</CardTitle>
                <p className="text-sm text-gray-600">{offer.vendor}</p>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{offer.rating}</span>
                  </div>
                  <Badge variant="outline">{offer.category}</Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600 font-medium">{offer.timeLeft} left</span>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-marketplace-primary">{offer.salePrice}</span>
                    <span className="text-sm text-gray-500 line-through">{offer.originalPrice}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Grab Deal
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SpecialOffers;
