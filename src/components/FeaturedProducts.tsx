
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Ethiopian Coffee',
      price: '$24.99',
      originalPrice: '$34.99',
      vendor: 'Highland Coffee Co.',
      rating: 4.9,
      category: 'Food & Beverages',
      isNew: false,
      onSale: true
    },
    {
      id: 2,
      name: 'Handwoven Silk Scarf',
      price: '$89.99',
      vendor: 'Artisan Textiles',
      rating: 4.8,
      category: 'Fashion',
      isNew: true,
      onSale: false
    },
    {
      id: 3,
      name: 'Organic Spice Collection',
      price: '$45.50',
      vendor: 'Spice Valley',
      rating: 4.7,
      category: 'Food & Beverages',
      isNew: false,
      onSale: false
    },
    {
      id: 4,
      name: 'Ceramic Dinner Set',
      price: '$129.99',
      originalPrice: '$159.99',
      vendor: 'Pottery Masters',
      rating: 4.6,
      category: 'Home & Living',
      isNew: false,
      onSale: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of the best products from trusted vendors around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="p-4">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 relative overflow-hidden">
                  {product.isNew && (
                    <Badge className="absolute top-2 left-2 bg-green-600 text-white">NEW</Badge>
                  )}
                  {product.onSale && (
                    <Badge className="absolute top-2 right-2 bg-red-600 text-white">SALE</Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg group-hover:text-marketplace-primary transition-colors">
                  {product.name}
                </CardTitle>
                <p className="text-sm text-gray-600">{product.vendor}</p>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{product.rating}</span>
                  </div>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-marketplace-primary">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
                
                <Button size="sm" className="w-full">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/browse-products">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
