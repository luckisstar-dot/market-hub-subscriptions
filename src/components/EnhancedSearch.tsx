
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, X } from 'lucide-react';
import { useEnhancedSearch } from '@/hooks/useEnhancedSearch';
import { useSearchAnalytics } from '@/hooks/useSearchAnalytics';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import React from 'react';

interface EnhancedSearchProps {
  onResults: (results: any[]) => void;
  onQueryChange: (query: string) => void;
}

const EnhancedSearch = ({ onResults, onQueryChange }: EnhancedSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    vendor: '',
    inStock: false,
  });

  const { trackSearch } = useSearchAnalytics();

  // Fetch categories and vendors for filter options
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) throw error;
      return data;
    },
  });

  const { data: vendors } = useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      const { data, error } = await supabase.from('vendors').select('id, business_name');
      if (error) throw error;
      return data;
    },
  });

  const { data: searchResults, isLoading } = useEnhancedSearch(searchQuery, filters);

  // Update parent component when results change
  React.useEffect(() => {
    if (searchResults) {
      onResults(searchResults);
      
      // Track search analytics
      if (searchQuery) {
        trackSearch.mutate({
          searchQuery,
          resultsCount: searchResults.length,
          filtersApplied: filters,
        });
      }
    }
  }, [searchResults, onResults, searchQuery, filters, trackSearch]);

  React.useEffect(() => {
    onQueryChange(searchQuery);
  }, [searchQuery, onQueryChange]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the query hook
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: undefined,
      maxPrice: undefined,
      vendor: '',
      inStock: false,
    });
  };

  const hasActiveFilters = filters.category || filters.minPrice || filters.maxPrice || filters.vendor || filters.inStock;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={hasActiveFilters ? 'bg-blue-50 border-blue-300' : ''}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && <span className="ml-1 text-xs bg-blue-600 text-white rounded-full px-1">•</span>}
        </Button>
      </form>

      {showFilters && (
        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All categories</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Vendor</label>
                <Select
                  value={filters.vendor}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, vendor: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All vendors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All vendors</SelectItem>
                    {vendors?.map((vendor) => (
                      <SelectItem key={vendor.id} value={vendor.id}>
                        {vendor.business_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ''}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      minPrice: e.target.value ? Number(e.target.value) : undefined 
                    }))}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ''}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      maxPrice: e.target.value ? Number(e.target.value) : undefined 
                    }))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id="inStock"
                  checked={filters.inStock}
                  onCheckedChange={(checked) => 
                    setFilters(prev => ({ ...prev, inStock: checked as boolean }))
                  }
                />
                <label htmlFor="inStock" className="text-sm font-medium">
                  In stock only
                </label>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <div className="text-center py-4 text-gray-500">
          Searching...
        </div>
      )}
    </div>
  );
};

export default EnhancedSearch;
