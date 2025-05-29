
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SearchEvent {
  searchQuery: string;
  resultsCount: number;
  filtersApplied?: Record<string, any>;
  clickedProductId?: string;
}

export const useSearchAnalytics = () => {
  const { user } = useAuth();

  const trackSearch = useMutation({
    mutationFn: async (event: SearchEvent) => {
      const { data, error } = await supabase
        .from('search_analytics')
        .insert({
          user_id: user?.id,
          search_query: event.searchQuery,
          results_count: event.resultsCount,
          filters_applied: event.filtersApplied || {},
          clicked_product_id: event.clickedProductId,
        });

      if (error) throw error;
      return data;
    },
  });

  const trackProductClick = useMutation({
    mutationFn: async ({ searchQuery, productId }: { searchQuery: string; productId: string }) => {
      const { data, error } = await supabase
        .from('search_analytics')
        .insert({
          user_id: user?.id,
          search_query: searchQuery,
          results_count: 0,
          clicked_product_id: productId,
        });

      if (error) throw error;
      return data;
    },
  });

  return {
    trackSearch,
    trackProductClick,
  };
};
