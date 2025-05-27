
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BrowseProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    {
      id: 1,
      name: 'Premium Coffee Beans',
      price: '$24.99',
      vendor: 'African Beans Co.',
      rating: 4.8,
      image: '/placeholder.svg',
      category: 'Food & Beverages'
    },
    {
      id: 2,
      name: 'Handcrafted Jewelry',
      price: '$89.99',
      vendor: 'Artisan Crafts',
      rating: 4.9,
      image: '/placeholder.svg',
      category: 'Jewelry'
    },
    {
      id: 3,
      name: 'Organic Spices Set',
      price: '$34.50',
      vendor: 'Spice Masters',
      rating: 4.7,
      image: '/placeholder.svg',
      category: 'Food & Beverages'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Products</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
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

export default BrowseProducts;
