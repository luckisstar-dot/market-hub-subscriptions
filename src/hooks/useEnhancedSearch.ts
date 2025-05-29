
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  vendor?: string;
  inStock?: boolean;
}

interface SearchResult {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  vendor_id: string;
  category_id: string;
  images: string[];
  featured: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  vendors?: { business_name: string };
  categories?: { name: string };
}

export const useEnhancedSearch = (searchQuery: string, filters: SearchFilters = {}) => {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return useQuery({
    queryKey: ['enhanced-search', debouncedQuery, filters],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          vendors(business_name),
          categories(name)
        `)
        .eq('status', 'active');

      // Apply text search
      if (debouncedQuery) {
        query = query.or(`name.ilike.%${debouncedQuery}%,description.ilike.%${debouncedQuery}%`);
      }

      // Apply filters
      if (filters.category) {
        query = query.eq('category_id', filters.category);
      }

      if (filters.vendor) {
        query = query.eq('vendor_id', filters.vendor);
      }

      if (filters.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }

      if (filters.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }

      if (filters.inStock) {
        query = query.gt('stock_quantity', 0);
      }

      // Order by relevance if there's a search query, otherwise by creation date
      if (debouncedQuery) {
        query = query.order('created_at', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;

      return data as SearchResult[];
    },
    enabled: true,
  });
};
