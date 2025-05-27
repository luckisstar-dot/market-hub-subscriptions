
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, TrendingUp, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BestSellers = () => {
  const bestSellers = [
    {
      id: 1,
      name: 'Premium Coffee Beans',
      price: '$24.99',
      vendor: 'African Beans Co.',
      rating: 4.8,
      salesCount: 1250,
      rank: 1,
      category: 'Food & Beverages'
    },
    {
      id: 2,
      name: 'Handcrafted Jewelry Set',
      price: '$89.99',
      vendor: 'Artisan Crafts',
      rating: 4.9,
      salesCount: 987,
      rank: 2,
      category: 'Jewelry'
    },
    {
      id: 3,
      name: 'Organic Spice Collection',
      price: '$34.50',
      vendor: 'Spice Masters',
      rating: 4.7,
      salesCount: 756,
      rank: 3,
      category: 'Food & Beverages'
    }
  ];

  const getRankBadge = (rank: number) => {
    const colors = {
      1: 'bg-yellow-500 text-white',
      2: 'bg-gray-400 text-white',
      3: 'bg-orange-600 text-white'
    };
    return colors[rank as keyof typeof colors] || 'bg-blue-500 text-white';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Best Sellers</h1>
          <p className="text-gray-600">Our top-performing products loved by customers worldwide</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 relative">
                  <Badge className={`absolute top-2 left-2 ${getRankBadge(product.rank)}`}>
                    #{product.rank}
                  </Badge>
                  <div className="absolute top-2 right-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                  </div>
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
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">{product.salesCount} sold</span>
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

export default BestSellers;
