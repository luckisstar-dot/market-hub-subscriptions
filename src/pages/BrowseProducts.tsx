
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductSearch from '@/components/ProductSearch';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts, useSearchProducts } from '@/hooks/useProducts';

const BrowseProducts = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const { user } = useAuth();
  const { addToCart } = useCart();

  // Use search products if there's a query, otherwise use regular products
  const { data: productsData, isLoading: isLoadingProducts } = useProducts(30, 0, '');
  const { data: searchData, isLoading: isLoadingSearch } = useSearchProducts(searchQuery);
  
  const currentData = searchQuery ? searchData : productsData;
  const isLoading = searchQuery ? isLoadingSearch : isLoadingProducts;
  const products = currentData?.products || [];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Update URL params
    const newSearchParams = new URLSearchParams(searchParams);
    if (query) {
      newSearchParams.set('search', query);
    } else {
      newSearchParams.delete('search');
    }
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
  };

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
          {searchQuery && (
            <p className="text-gray-600 mb-4">
              Search results for "{searchQuery}" ({products.length} products found)
            </p>
          )}
          
          <div className="flex justify-center mb-6">
            <ProductSearch 
              onSearch={handleSearch}
              initialValue={searchQuery}
              placeholder="Search products..."
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-600">Loading products...</div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">
              {searchQuery ? `No products found for "${searchQuery}".` : 'No products found.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="p-4">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.thumbnail} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">{product.rating.toFixed(1)}</span>
                    </div>
                    <Badge variant="outline">{product.category}</Badge>
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
                        addToCart(product.id.toString());
                      }}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {product.stock} in stock
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BrowseProducts;
