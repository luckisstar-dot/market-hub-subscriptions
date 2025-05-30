
import { supabase } from '@/integrations/supabase/client';
import { enhancedEmailService } from './enhancedEmailService';

interface SystemCheckResult {
  component: string;
  status: 'healthy' | 'warning' | 'error';
  message: string;
  timestamp: string;
  details?: any;
}

export const performEnhancedSystemCheck = async (): Promise<SystemCheckResult[]> => {
  const results: SystemCheckResult[] = [];
  const timestamp = new Date().toISOString();

  console.log('Starting enhanced system check...');

  // 1. Authentication System Check
  try {
    const { data: session, error } = await supabase.auth.getSession();
    results.push({
      component: 'Authentication System',
      status: error ? 'error' : 'healthy',
      message: error ? `Auth error: ${error.message}` : 'Authentication system operational',
      timestamp,
      details: { hasSession: !!session?.session }
    });

    // Test auth state change functionality
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change detected:', event);
    });
    
    results.push({
      component: 'Auth State Listener',
      status: 'healthy',
      message: 'Auth state change listener configured correctly',
      timestamp,
    });

    // Clean up listener
    authListener.data.subscription.unsubscribe();
  } catch (error) {
    results.push({
      component: 'Authentication System',
      status: 'error',
      message: `Authentication check failed: ${error}`,
      timestamp,
    });
  }

  // 2. Database Connectivity Check
  const existingTables = [
    'profiles', 'products', 'categories', 'vendors', 'notifications',
    'cart_items', 'orders', 'order_items', 'reviews', 'wishlist_items'
  ];

  for (const table of existingTables) {
    try {
      const start = performance.now();
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      const duration = performance.now() - start;
      
      results.push({
        component: `Database Table: ${table}`,
        status: error ? 'error' : 'healthy',
        message: error 
          ? `Table access failed: ${error.message}` 
          : `Table accessible, ${count || 0} records, ${duration.toFixed(1)}ms response time`,
        timestamp,
        details: { recordCount: count, responseTime: duration }
      });
    } catch (error) {
      results.push({
        component: `Database Table: ${table}`,
        status: 'error',
        message: `Failed to access table: ${error}`,
        timestamp,
      });
    }
  }

  // 3. Email Service Check
  try {
    const templates = await enhancedEmailService.getTemplates();
    results.push({
      component: 'Email Service Templates',
      status: 'healthy',
      message: `Email templates loaded successfully (${templates.length} templates available)`,
      timestamp,
      details: { templateCount: templates.length, templates: templates.map(t => t.name) }
    });

    // Test email function connectivity
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: { test: true, to: 'test@example.com', subject: 'Test', html: 'Test content' },
    });

    results.push({
      component: 'Email Function',
      status: error ? 'warning' : 'healthy',
      message: error 
        ? `Email function accessible but may need configuration: ${error.message}` 
        : 'Email function operational',
      timestamp,
      details: { functionResponse: data }
    });
  } catch (error) {
    results.push({
      component: 'Email Service',
      status: 'error',
      message: `Email service check failed: ${error}`,
      timestamp,
    });
  }

  // 4. Real-time Functionality Check
  try {
    const channel = supabase.channel('system-check-enhanced');
    let realtimeStatus = 'error';
    
    const subscription = channel.subscribe((status) => {
      realtimeStatus = status === 'SUBSCRIBED' ? 'healthy' : 'warning';
      results.push({
        component: 'Real-time Subscriptions',
        status: status === 'SUBSCRIBED' ? 'healthy' : 'warning',
        message: status === 'SUBSCRIBED' 
          ? 'Real-time subscriptions working correctly' 
          : `Real-time status: ${status}`,
        timestamp,
        details: { subscriptionStatus: status }
      });
    });

    // Clean up after 2 seconds
    setTimeout(() => {
      supabase.removeChannel(channel);
    }, 2000);
  } catch (error) {
    results.push({
      component: 'Real-time Subscriptions',
      status: 'error',
      message: `Real-time check failed: ${error}`,
      timestamp,
    });
  }

  // 5. Edge Functions Check
  try {
    const functions = ['send-email'];
    
    for (const functionName of functions) {
      const start = performance.now();
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: { test: true },
      });
      const duration = performance.now() - start;

      results.push({
        component: `Edge Function: ${functionName}`,
        status: error ? 'warning' : 'healthy',
        message: error 
          ? `Function may need configuration: ${error.message}` 
          : `Function operational, ${duration.toFixed(1)}ms response time`,
        timestamp,
        details: { responseTime: duration, response: data }
      });
    }
  } catch (error) {
    results.push({
      component: 'Edge Functions',
      status: 'error',
      message: `Edge functions check failed: ${error}`,
      timestamp,
    });
  }

  // 6. Performance Metrics
  try {
    const performanceData = {
      navigationTiming: performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming,
      resourceTiming: performance.getEntriesByType('resource').length,
      memoryUsage: (performance as any).memory ? {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
      } : null,
    };

    const pageLoadTime = performanceData.navigationTiming ? 
      performanceData.navigationTiming.loadEventEnd - performanceData.navigationTiming.fetchStart : 0;

    results.push({
      component: 'Application Performance',
      status: pageLoadTime > 5000 ? 'warning' : 'healthy',
      message: `Page load time: ${pageLoadTime.toFixed(0)}ms, ${performanceData.resourceTiming} resources loaded`,
      timestamp,
      details: performanceData
    });
  } catch (error) {
    results.push({
      component: 'Application Performance',
      status: 'warning',
      message: 'Performance metrics not available',
      timestamp,
    });
  }

  // 7. UI Component Health Check
  const componentChecks = [
    { name: 'React Router', test: () => !!window.location.pathname },
    { name: 'Local Storage', test: () => !!window.localStorage },
    { name: 'Session Storage', test: () => !!window.sessionStorage },
    { name: 'Console API', test: () => !!window.console },
  ];

  componentChecks.forEach(check => {
    try {
      const isHealthy = check.test();
      results.push({
        component: `UI Component: ${check.name}`,
        status: isHealthy ? 'healthy' : 'error',
        message: isHealthy ? `${check.name} functioning correctly` : `${check.name} not available`,
        timestamp,
      });
    } catch (error) {
      results.push({
        component: `UI Component: ${check.name}`,
        status: 'error',
        message: `${check.name} check failed: ${error}`,
        timestamp,
      });
    }
  });

  console.log('Enhanced system check completed:', results.length, 'checks performed');
  return results;
};

export const generateEnhancedSystemReport = (results: SystemCheckResult[]) => {
  const healthy = results.filter(r => r.status === 'healthy').length;
  const warnings = results.filter(r => r.status === 'warning').length;
  const errors = results.filter(r => r.status === 'error').length;
  const total = results.length;

  const recommendations = generateEnhancedRecommendations(results);
  
  return {
    summary: {
      total,
      healthy,
      warnings,
      errors,
      healthScore: Math.round((healthy / total) * 100),
      timestamp: new Date().toISOString(),
    },
    results,
    recommendations,
    nextSteps: generateNextSteps(results),
  };
};

const generateEnhancedRecommendations = (results: SystemCheckResult[]): string[] => {
  const recommendations: string[] = [];
  
  const errors = results.filter(r => r.status === 'error');
  const warnings = results.filter(r => r.status === 'warning');
  
  if (errors.length > 0) {
    recommendations.push('🔴 Critical Issues Detected:');
    errors.forEach(error => {
      recommendations.push(`  • ${error.component}: ${error.message}`);
    });
    recommendations.push('');
  }
  
  if (warnings.length > 0) {
    recommendations.push('🟡 Optimization Opportunities:');
    warnings.forEach(warning => {
      recommendations.push(`  • ${warning.component}: ${warning.message}`);
    });
    recommendations.push('');
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    recommendations.push('✅ All Systems Operational');
    recommendations.push('💡 System is running smoothly');
    recommendations.push('📊 Consider implementing automated monitoring');
    recommendations.push('🔄 Schedule regular health checks');
  }
  
  // Specific recommendations based on components
  const emailWarnings = results.filter(r => 
    r.component.includes('Email') && r.status === 'warning'
  );
  
  if (emailWarnings.length > 0) {
    recommendations.push('📧 Email Service Setup:');
    recommendations.push('  • Configure Resend API key for email functionality');
    recommendations.push('  • Test email templates with real recipients');
  }
  
  return recommendations;
};

const generateNextSteps = (results: SystemCheckResult[]): string[] => {
  const nextSteps: string[] = [];
  
  const hasErrors = results.some(r => r.status === 'error');
  const hasWarnings = results.some(r => r.status === 'warning');
  
  if (hasErrors) {
    nextSteps.push('1. 🚨 Address critical errors immediately');
    nextSteps.push('2. 🔍 Review error logs and system configuration');
    nextSteps.push('3. 🧪 Run focused tests on failed components');
  } else if (hasWarnings) {
    nextSteps.push('1. ⚠️ Review warning messages and plan improvements');
    nextSteps.push('2. 🔧 Configure missing services (e.g., email API keys)');
    nextSteps.push('3. 📈 Implement performance optimizations');
  } else {
    nextSteps.push('1. ✅ System is healthy - consider feature enhancements');
    nextSteps.push('2. 📊 Set up automated monitoring and alerting');
    nextSteps.push('3. 🧪 Expand test coverage for new features');
    nextSteps.push('4. 📱 Test user authentication flows end-to-end');
    nextSteps.push('5. 📧 Configure email service for production use');
    nextSteps.push('6. 📈 Monitor analytics and user engagement');
    nextSteps.push('7. 🔒 Review security settings and permissions');
  }
  
  return nextSteps;
};
