
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, Car } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import { performSystemCheck, generateSystemReport } from '@/utils/systemCheck';
import { Refresh } from 'lucide-react';
import MetaTags from '@/components/SEO/MetaTags';

interface SystemCheckResult {
  component: string;
  status: 'healthy' | 'warning' | 'error';
  message: string;
  timestamp: string;
}

interface SystemReport {
  summary: {
    total: number;
    healthy: number;
    warnings: number;
    errors: number;
    healthScore: number;
  };
  results: SystemCheckResult[];
  recommendations: string[];
}

const SystemStatus = () => {
  const [report, setReport] = useState<SystemReport | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const runSystemCheck = async () => {
    setLoading(true);
    try {
      const results = await performSystemCheck();
      const generatedReport = generateSystemReport(results);
      setReport(generatedReport);
    } catch (error) {
      console.error('System check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <>
      <MetaTags
        title="System Status"
        description="System health and status monitoring"
      />
      <div className="min-h-screen bg-gray-50">
        <Header userRole="admin" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">System Status</h1>
              <p className="text-gray-600">Monitor the health of all system components</p>
            </div>
            <Button 
              onClick={runSystemCheck} 
              disabled={loading}
            >
              <Refresh className="h-4 w-4 mr-2" />
              {loading ? 'Running Check...' : 'Run Health Check'}
            </Button>
          </div>

          {report ? (
            <div className="space-y-8">
              <Card>
                <CardHeader className="pb-3">
                  <h2 className="text-xl font-bold">Health Summary</h2>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Health Score</span>
                        <span className="font-bold">{report.summary.healthScore}%</span>
                      </div>
                      <Progress value={report.summary.healthScore} className={getHealthColor(report.summary.healthScore)} />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-green-700">
                          {report.summary.healthy}
                        </div>
                        <div className="text-sm text-green-600">Healthy</div>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-yellow-700">
                          {report.summary.warnings}
                        </div>
                        <div className="text-sm text-yellow-600">Warnings</div>
                      </div>
                      
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-red-700">
                          {report.summary.errors}
                        </div>
                        <div className="text-sm text-red-600">Errors</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h2 className="text-xl font-bold">Component Status</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {report.results.map((result, index) => (
                      <div 
                        key={index} 
                        className={`p-4 border rounded-md ${getStatusColor(result.status)}`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="font-medium">{result.component}</div>
                          <Badge variant="outline" className={getStatusColor(result.status)}>
                            {result.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm mt-2">{result.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h2 className="text-xl font-bold">Recommendations</h2>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc list-inside">
                    {report.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-gray-700">{recommendation}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center p-12 bg-white rounded-lg border">
              <h2 className="text-xl font-medium text-gray-700 mb-2">System Status Unknown</h2>
              <p className="text-gray-600 mb-8">
                Run a health check to see the status of all system components
              </p>
              <Button onClick={runSystemCheck} disabled={loading}>
                {loading ? 'Running Check...' : 'Run Health Check'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SystemStatus;
