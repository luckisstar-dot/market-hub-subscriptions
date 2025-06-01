
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { performSystemHealthCheck, generateHealthReport } from '@/utils/systemHealthCheck';
import Header from '@/components/Header';
import { RefreshCw, CheckCircle, AlertTriangle, XCircle, Activity } from 'lucide-react';

interface HealthCheckResult {
  service: string;
  status: 'healthy' | 'warning' | 'error';
  message: string;
  timestamp: string;
}

const SystemHealth = () => {
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [lastCheck, setLastCheck] = useState<string | null>(null);

  const runHealthCheck = async () => {
    setLoading(true);
    try {
      const results = await performSystemHealthCheck();
      const report = generateHealthReport(results);
      setHealthData(report);
      setLastCheck(new Date().toLocaleString());
    } catch (error) {
      console.error('Health check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runHealthCheck();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800">Healthy</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (!healthData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header userRole="admin" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="admin" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">System Health Check</h1>
            <p className="text-gray-600">Monitor the health and status of all system components.</p>
            {lastCheck && (
              <p className="text-sm text-gray-500 mt-1">Last check: {lastCheck}</p>
            )}
          </div>
          <Button onClick={runHealthCheck} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Checking...' : 'Run Check'}
          </Button>
        </div>

        {/* Overall Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(healthData.overallStatus)}
              Overall System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{healthData.summary.total}</div>
                <div className="text-sm text-gray-600">Total Services</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{healthData.summary.healthy}</div>
                <div className="text-sm text-gray-600">Healthy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{healthData.summary.warnings}</div>
                <div className="text-sm text-gray-600">Warnings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{healthData.summary.errors}</div>
                <div className="text-sm text-gray-600">Errors</div>
              </div>
            </div>
            
            {healthData.overallStatus !== 'healthy' && (
              <Alert variant={healthData.overallStatus === 'error' ? 'destructive' : 'default'} className="mt-4">
                <AlertDescription>
                  {healthData.summary.errors > 0 
                    ? `${healthData.summary.errors} critical errors detected. Immediate attention required.`
                    : `${healthData.summary.warnings} warnings detected. Review recommended.`
                  }
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Detailed Status */}
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthData.results.map((result: HealthCheckResult, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    {getStatusIcon(result.status)}
                    <div>
                      <h3 className="font-medium">{result.service}</h3>
                      <p className="text-sm text-gray-600">{result.message}</p>
                      <p className="text-xs text-gray-500">{new Date(result.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(result.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">User Profile Management</h4>
                  <p className="text-sm text-gray-600">Users can now manage their profiles at /profile</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Content Management System</h4>
                  <p className="text-sm text-gray-600">Blog posts and dynamic content can be managed at /admin/content-management</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Enhanced Vendor Onboarding</h4>
                  <p className="text-sm text-gray-600">Multi-step vendor registration wizard available at /vendor-onboarding</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Role change notifications are automatically sent to users</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Activity className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Future Enhancements</h4>
                  <p className="text-sm text-gray-600">Consider adding real-time notifications, advanced analytics dashboards, and mobile app development</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemHealth;
