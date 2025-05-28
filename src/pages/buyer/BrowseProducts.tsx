
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, ShoppingCart, Heart } from 'lucide-react';
import Header from '@/components/Header';

const BrowseProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Premium Coffee Beans',
      vendor: 'African Coffee Co.',
      price: 24.99,
      rating: 4.8,
      category: 'Food & Beverages',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Handmade Jewelry Set',
      vendor: 'Artisan Crafts',
      price: 89.99,
      rating: 4.9,
      category: 'Arts & Crafts',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Organic Spice Mix',
      vendor: 'Spice Masters',
      price: 34.50,
      rating: 4.7,
      category: 'Food & Beverages',
      image: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'Wireless Headphones',
      vendor: 'Tech Store',
      price: 199.99,
      rating: 4.6,
      category: 'Electronics',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="buyer" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Products</h1>
          <p className="text-gray-600">Discover amazing products from vendors worldwide.</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input className="pl-10" placeholder="Search products..." />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="food">Food & Beverages</SelectItem>
                  <SelectItem value="crafts">Arts & Crafts</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-25">$0 - $25</SelectItem>
                  <SelectItem value="25-50">$25 - $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100+">$100+</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Image</span>
                </div>
                
                <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.vendor}</p>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-marketplace-primary text-xl">${product.price}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm ml-1">{product.rating}</span>
                  </div>
                </div>
                
                <Badge variant="outline" className="mb-3">{product.category}</Badge>
                
                <div className="flex space-x-2">
                  <Button className="flex-1" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseProducts;
