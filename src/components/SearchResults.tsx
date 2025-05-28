
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';

interface SearchResultsProps {
  searchQuery: string;
  onClose: () => void;
}

const SearchResults = ({ searchQuery, onClose }: SearchResultsProps) => {
  const { addToCart } = useCart();

  const { data: results, isLoading } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          vendors(business_name),
          categories(name)
        `)
        .eq('status', 'active')
        .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
        .limit(6);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!searchQuery.trim(),
  });

  if (!searchQuery.trim() || isLoading) {
    return null;
  }

  if (!results || results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 p-4 z-50">
        <p className="text-gray-500 text-center">No products found for "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-96 overflow-y-auto z-50">
      <div className="p-2">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-sm">Search Results</h3>
          <Link to={`/browse-products?search=${encodeURIComponent(searchQuery)}`} onClick={onClose}>
            <Button variant="link" size="sm">View all</Button>
          </Link>
        </div>
        <div className="space-y-2">
          {results.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} onClick={onClose}>
              <Card className="hover:bg-gray-50 transition-colors">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{product.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{product.vendors?.business_name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-semibold text-marketplace-primary">${product.price}</span>
                        <Badge variant="outline" className="text-xs">{product.categories?.name}</Badge>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product.id);
                      }}
                    >
                      <ShoppingCart className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
