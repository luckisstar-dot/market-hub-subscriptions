
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NewArrivals = () => {
  const newProducts = [
    {
      id: 1,
      name: 'Artisan Leather Bag',
      price: '$129.99',
      vendor: 'Leather Works Studio',
      rating: 4.9,
      arrivedDate: '2024-01-15',
      isNew: true,
      category: 'Fashion'
    },
    {
      id: 2,
      name: 'Organic Tea Collection',
      price: '$45.00',
      vendor: 'Mountain Tea Co.',
      rating: 4.8,
      arrivedDate: '2024-01-14',
      isNew: true,
      category: 'Food & Beverages'
    },
    {
      id: 3,
      name: 'Handwoven Basket Set',
      price: '$67.50',
      vendor: 'Traditional Crafts',
      rating: 4.7,
      arrivedDate: '2024-01-13',
      isNew: true,
      category: 'Home & Living'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">New Arrivals</h1>
          <p className="text-gray-600">Discover the latest products added to our marketplace</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 relative">
                  {product.isNew && (
                    <Badge className="absolute top-2 left-2 bg-marketplace-primary">NEW</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <p className="text-sm text-gray-600">{product.vendor}</p>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{product.rating}</span>
                  </div>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Added {product.arrivedDate}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-marketplace-primary">{product.price}</span>
                  <Button size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewArrivals;
