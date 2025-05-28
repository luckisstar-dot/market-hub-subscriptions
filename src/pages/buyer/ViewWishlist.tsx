
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Header from '@/components/Header';

const ViewWishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      name: 'Premium Leather Handbag',
      vendor: 'Leather Works',
      price: 129.99,
      originalPrice: 149.99,
      inStock: true,
      rating: 4.8,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Organic Tea Collection',
      vendor: 'Mountain Tea Co.',
      price: 45.00,
      originalPrice: 45.00,
      inStock: true,
      rating: 4.9,
      image: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Vintage Silk Scarf',
      vendor: 'Traditional Textiles',
      price: 67.50,
      originalPrice: 67.50,
      inStock: false,
      rating: 4.7,
      image: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'Smart Fitness Tracker',
      vendor: 'Tech Gadgets',
      price: 199.99,
      originalPrice: 249.99,
      inStock: true,
      rating: 4.6,
      image: '/placeholder.svg'
    }
  ];

  const handleRemoveFromWishlist = (itemId: number) => {
    console.log('Removing item from wishlist:', itemId);
  };

  const handleAddToCart = (itemId: number) => {
    console.log('Adding item to cart:', itemId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="buyer" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">Items you've saved for later purchase.</p>
        </div>

        {/* Wishlist Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Total Items</h3>
                <p className="text-3xl font-bold text-marketplace-primary">{wishlistItems.length}</p>
                <p className="text-sm text-gray-600">In your wishlist</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Total Value</h3>
                <p className="text-3xl font-bold text-green-600">
                  ${wishlistItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Current prices</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Available Items</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {wishlistItems.filter(item => item.inStock).length}
                </p>
                <p className="text-sm text-gray-600">Ready to purchase</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wishlist Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-500" />
              Wishlist Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-500 text-xs">IMG</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.vendor}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm ml-1">{item.rating}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-marketplace-primary text-xl">${item.price}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                      )}
                    </div>
                    <Badge variant={item.inStock ? 'default' : 'destructive'} className="mt-1">
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>

                  <div className="flex flex-col space-y-2">
                    {item.inStock ? (
                      <Button 
                        size="sm"
                        onClick={() => handleAddToCart(item.id)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    ) : (
                      <Button size="sm" disabled>
                        Out of Stock
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button size="lg">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add All Available to Cart
          </Button>
          <Button variant="outline" size="lg">
            Clear Wishlist
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewWishlist;
