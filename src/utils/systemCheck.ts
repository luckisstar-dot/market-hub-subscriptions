
import { supabase } from '@/integrations/supabase/client';

interface SystemCheckResult {
  component: string;
  status: 'healthy' | 'warning' | 'error';
  message: string;
  timestamp: string;
}

export const performSystemCheck = async (): Promise<SystemCheckResult[]> => {
  const results: SystemCheckResult[] = [];
  const timestamp = new Date().toISOString();

  // Check database connection
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    results.push({
      component: 'Database Connection',
      status: error ? 'error' : 'healthy',
      message: error ? `Database error: ${error.message}` : 'Database connection successful',
      timestamp,
    });
  } catch (error) {
    results.push({
      component: 'Database Connection',
      status: 'error',
      message: `Failed to connect to database: ${error}`,
      timestamp,
    });
  }

  // Check authentication
  try {
    const { data: session, error } = await supabase.auth.getSession();
    results.push({
      component: 'Authentication',
      status: error ? 'error' : 'healthy',
      message: error ? `Auth error: ${error.message}` : 'Authentication service operational',
      timestamp,
    });
  } catch (error) {
    results.push({
      component: 'Authentication',
      status: 'error',
      message: `Authentication check failed: ${error}`,
      timestamp,
    });
  }

  // Check real-time functionality
  try {
    const channel = supabase.channel('system-check');
    const subscription = channel.subscribe((status) => {
      results.push({
        component: 'Real-time',
        status: status === 'SUBSCRIBED' ? 'healthy' : 'warning',
        message: status === 'SUBSCRIBED' ? 'Real-time subscriptions working' : `Real-time status: ${status}`,
        timestamp,
      });
    });
    
    // Clean up
    setTimeout(() => {
      supabase.removeChannel(channel);
    }, 2000);
  } catch (error) {
    results.push({
      component: 'Real-time',
      status: 'error',
      message: `Real-time check failed: ${error}`,
      timestamp,
    });
  }

  // Check storage
  try {
    const { data, error } = await supabase.storage.listBuckets();
    const hasProductImages = data?.some(bucket => bucket.name === 'product-images');
    results.push({
      component: 'Storage',
      status: error ? 'error' : hasProductImages ? 'healthy' : 'warning',
      message: error 
        ? `Storage error: ${error.message}` 
        : hasProductImages 
          ? 'Storage buckets configured correctly'
          : 'Product images bucket not found',
      timestamp,
    });
  } catch (error) {
    results.push({
      component: 'Storage',
      status: 'error',
      message: `Storage check failed: ${error}`,
      timestamp,
    });
  }

  // Check edge functions
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: { test: true },
    });
    results.push({
      component: 'Edge Functions',
      status: error ? 'error' : 'healthy',
      message: error ? `Edge function error: ${error.message}` : 'Edge functions operational',
      timestamp,
    });
  } catch (error) {
    results.push({
      component: 'Edge Functions',
      status: 'error',
      message: `Edge function check failed: ${error}`,
      timestamp,
    });
  }

  // Check table existence and structure - only for tables that exist in the database
  const existingTables = [
    'profiles', 'products', 'categories', 'vendors', 'notifications',
    'cart_items', 'orders', 'order_items', 'reviews', 'wishlist_items'
  ] as const;

  for (const table of existingTables) {
    try {
      const { data, error } = await supabase.from(table).select('*').limit(1);
      results.push({
        component: `Table: ${table}`,
        status: error ? 'error' : 'healthy',
        message: error ? `Table error: ${error.message}` : `Table ${table} accessible`,
        timestamp,
      });
    } catch (error) {
      results.push({
        component: `Table: ${table}`,
        status: 'error',
        message: `Failed to access table ${table}: ${error}`,
        timestamp,
      });
    }
  }

  // Check for missing tables that are referenced in code but don't exist
  const missingTables = [
    'chat_rooms', 'chat_messages', 'chat_participants',
    'email_templates', 'email_logs', 'search_analytics', 'performance_metrics'
  ];

  for (const table of missingTables) {
    results.push({
      component: `Table: ${table}`,
      status: 'warning',
      message: `Table ${table} referenced in code but not found in database (using mock implementation)`,
      timestamp,
    });
  }

  return results;
};

export const generateSystemReport = (results: SystemCheckResult[]) => {
  const healthy = results.filter(r => r.status === 'healthy').length;
  const warnings = results.filter(r => r.status === 'warning').length;
  const errors = results.filter(r => r.status === 'error').length;
  const total = results.length;

  return {
    summary: {
      total,
      healthy,
      warnings,
      errors,
      healthScore: Math.round((healthy / total) * 100),
    },
    results,
    recommendations: generateRecommendations(results),
  };
};

const generateRecommendations = (results: SystemCheckResult[]): string[] => {
  const recommendations: string[] = [];
  
  const errors = results.filter(r => r.status === 'error');
  const warnings = results.filter(r => r.status === 'warning');
  
  if (errors.length > 0) {
    recommendations.push('🔴 Critical issues detected - immediate attention required');
    errors.forEach(error => {
      recommendations.push(`• Fix ${error.component}: ${error.message}`);
    });
  }
  
  if (warnings.length > 0) {
    recommendations.push('🟡 Performance improvements available');
    warnings.forEach(warning => {
      recommendations.push(`• Address ${warning.component}: ${warning.message}`);
    });
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    recommendations.push('✅ All systems operational');
    recommendations.push('💡 Consider running regular health checks');
    recommendations.push('📊 Monitor performance metrics regularly');
  }
  
  return recommendations;
};
