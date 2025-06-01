
import { supabase } from '@/integrations/supabase/client';

interface HealthCheckResult {
  service: string;
  status: 'healthy' | 'warning' | 'error';
  message: string;
  timestamp: string;
}

export const performSystemHealthCheck = async (): Promise<HealthCheckResult[]> => {
  const results: HealthCheckResult[] = [];
  const timestamp = new Date().toISOString();

  // Database Connection Test
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    results.push({
      service: 'Database Connection',
      status: error ? 'error' : 'healthy',
      message: error ? `Database error: ${error.message}` : 'Database connection successful',
      timestamp
    });
  } catch (error) {
    results.push({
      service: 'Database Connection',
      status: 'error',
      message: `Connection failed: ${error}`,
      timestamp
    });
  }

  // User Roles System Test
  try {
    const { data, error } = await supabase.from('user_roles').select('role').limit(1);
    results.push({
      service: 'User Roles System',
      status: error ? 'error' : 'healthy',
      message: error ? `User roles error: ${error.message}` : 'User roles system operational',
      timestamp
    });
  } catch (error) {
    results.push({
      service: 'User Roles System',
      status: 'error',
      message: `Roles system failed: ${error}`,
      timestamp
    });
  }

  // Email Notifications System Test
  try {
    const { data, error } = await supabase.from('email_notifications').select('id').limit(1);
    results.push({
      service: 'Email Notifications',
      status: error ? 'error' : 'healthy',
      message: error ? `Email system error: ${error.message}` : 'Email notifications system ready',
      timestamp
    });
  } catch (error) {
    results.push({
      service: 'Email Notifications',
      status: 'error',
      message: `Email system failed: ${error}`,
      timestamp
    });
  }

  // Blog Posts System Test
  try {
    const { data, error } = await supabase.from('blog_posts').select('id').limit(1);
    results.push({
      service: 'Content Management',
      status: error ? 'error' : 'healthy',
      message: error ? `CMS error: ${error.message}` : 'Content management system ready',
      timestamp
    });
  } catch (error) {
    results.push({
      service: 'Content Management',
      status: 'error',
      message: `CMS failed: ${error}`,
      timestamp
    });
  }

  // Analytics System Test
  try {
    const { data, error } = await supabase.from('analytics_events').select('id').limit(1);
    results.push({
      service: 'Analytics System',
      status: error ? 'error' : 'healthy',
      message: error ? `Analytics error: ${error.message}` : 'Analytics system operational',
      timestamp
    });
  } catch (error) {
    results.push({
      service: 'Analytics System',
      status: 'error',
      message: `Analytics failed: ${error}`,
      timestamp
    });
  }

  // Authentication Test
  try {
    const { data: { user } } = await supabase.auth.getUser();
    results.push({
      service: 'Authentication',
      status: 'healthy',
      message: user ? 'User authenticated' : 'Authentication service ready',
      timestamp
    });
  } catch (error) {
    results.push({
      service: 'Authentication',
      status: 'error',
      message: `Auth failed: ${error}`,
      timestamp
    });
  }

  return results;
};

export const generateHealthReport = (results: HealthCheckResult[]) => {
  const healthyCount = results.filter(r => r.status === 'healthy').length;
  const warningCount = results.filter(r => r.status === 'warning').length;
  const errorCount = results.filter(r => r.status === 'error').length;
  
  const overallStatus = errorCount > 0 ? 'error' : warningCount > 0 ? 'warning' : 'healthy';
  
  return {
    overallStatus,
    summary: {
      total: results.length,
      healthy: healthyCount,
      warnings: warningCount,
      errors: errorCount
    },
    results
  };
};
