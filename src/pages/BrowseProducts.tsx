
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Link, useSearchParams } from 'react-router-dom';
import EnhancedSearch from '@/components/EnhancedSearch';

const BrowseProducts = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentQuery, setCurrentQuery] = useState(searchParams.get('search') || '');
  const { user } = useAuth();
  const { addToCart } = useCart();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to browse products</h1>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="buyer" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Products</h1>
          {currentQuery && (
            <p className="text-gray-600 mb-4">Search results for "{currentQuery}"</p>
          )}
          
          <EnhancedSearch 
            onResults={setSearchResults}
            onQueryChange={setCurrentQuery}
          />
        </div>

        {searchResults.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">
              {currentQuery ? `No products found for "${currentQuery}".` : 'No products found.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="p-4">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-gray-600">{product.vendors?.business_name}</p>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">4.5</span>
                      </div>
                      <Badge variant="outline">{product.categories?.name}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-marketplace-primary">
                        ${product.price}
                      </span>
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(product.id);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BrowseProducts;
