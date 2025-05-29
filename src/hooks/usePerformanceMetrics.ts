
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface PerformanceMetric {
  metric_name: string;
  metric_value: number;
  metadata?: Record<string, any>;
}

export const usePerformanceMetrics = () => {
  const recordMetric = useMutation({
    mutationFn: async (metric: PerformanceMetric) => {
      const { data, error } = await supabase
        .from('performance_metrics')
        .insert(metric);

      if (error) throw error;
      return data;
    },
  });

  const recordPageLoad = (pageName: string, loadTime: number) => {
    recordMetric.mutate({
      metric_name: 'page_load_time',
      metric_value: loadTime,
      metadata: { page: pageName },
    });
  };

  const recordApiCall = (endpoint: string, duration: number, success: boolean) => {
    recordMetric.mutate({
      metric_name: 'api_call_duration',
      metric_value: duration,
      metadata: { endpoint, success },
    });
  };

  const recordUserAction = (action: string, duration: number = 0) => {
    recordMetric.mutate({
      metric_name: 'user_action',
      metric_value: duration,
      metadata: { action },
    });
  };

  // Record page performance metrics
  useEffect(() => {
    const measurePagePerformance = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.navigationStart;
          recordPageLoad(window.location.pathname, loadTime);
        }
      }
    };

    // Measure when page loads
    if (document.readyState === 'complete') {
      measurePagePerformance();
    } else {
      window.addEventListener('load', measurePagePerformance);
      return () => window.removeEventListener('load', measurePagePerformance);
    }
  }, []);

  return {
    recordMetric,
    recordPageLoad,
    recordApiCall,
    recordUserAction,
  };
};
