
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Play, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';
import { performSystemHealthCheck, generateHealthReport } from '@/utils/systemHealthCheck';
import { runIntegrationTests } from '@/utils/testing/integrationTests';
import { TestSuite } from '@/utils/testing/testRunner';
import TestResults from './TestResults';

const TestRunner = () => {
  const [running, setRunning] = useState(false);
  const [healthResults, setHealthResults] = useState<any>(null);
  const [testResults, setTestResults] = useState<TestSuite[]>([]);
  const { toast } = useToast();

  const runHealthCheck = async () => {
    setRunning(true);
    try {
      const results = await performSystemHealthCheck();
      const report = generateHealthReport(results);
      setHealthResults(report);
      
      toast({
        title: 'Health Check Complete',
        description: `${report.summary.healthy}/${report.summary.total} services healthy`,
        variant: report.summary.errors > 0 ? 'destructive' : 'default',
      });
    } catch (error) {
      console.error('Health check failed:', error);
      toast({
        title: 'Health Check Failed',
        description: 'Failed to run system health check',
        variant: 'destructive',
      });
    } finally {
      setRunning(false);
    }
  };

  const runTests = async () => {
    setRunning(true);
    try {
      const results = await runIntegrationTests();
      setTestResults(results);
      
      const totalTests = results.reduce((sum, suite) => sum + suite.tests.length, 0);
      const totalPassed = results.reduce((sum, suite) => sum + suite.passed, 0);
      
      toast({
        title: 'Tests Complete',
        description: `${totalPassed}/${totalTests} tests passed`,
        variant: totalPassed === totalTests ? 'default' : 'destructive',
      });
    } catch (error) {
      console.error('Tests failed:', error);
      toast({
        title: 'Tests Failed',
        description: 'Failed to run integration tests',
        variant: 'destructive',
      });
    } finally {
      setRunning(false);
    }
  };

  const runAllTests = async () => {
    await runHealthCheck();
    await runTests();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Test Control Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={runHealthCheck}
              disabled={running}
              className="flex items-center gap-2"
            >
              {running ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              Run Health Check
            </Button>
            
            <Button
              onClick={runTests}
              disabled={running}
              variant="outline"
              className="flex items-center gap-2"
            >
              {running ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              Run Integration Tests
            </Button>
            
            <Button
              onClick={runAllTests}
              disabled={running}
              variant="secondary"
              className="flex items-center gap-2"
            >
              {running ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              Run All Tests
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="health" className="space-y-6">
        <TabsList>
          <TabsTrigger value="health">System Health</TabsTrigger>
          <TabsTrigger value="integration">Integration Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="health">
          {healthResults ? (
            <div className="space-y-6">
              {/* Health Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>System Health Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{healthResults.summary.total}</div>
                      <div className="text-sm text-gray-600">Total Services</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{healthResults.summary.healthy}</div>
                      <div className="text-sm text-gray-600">Healthy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{healthResults.summary.warnings}</div>
                      <div className="text-sm text-gray-600">Warnings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{healthResults.summary.errors}</div>
                      <div className="text-sm text-gray-600">Errors</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Badge className={getStatusColor(healthResults.overallStatus)}>
                      Overall Status: {healthResults.overallStatus.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Health Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {healthResults.results.map((result: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {getStatusIcon(result.status)}
                          <div>
                            <div className="font-medium">{result.service}</div>
                            <div className="text-sm text-gray-600">{result.message}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(result.status)}>
                            {result.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(result.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-600 mb-4">No health check results yet.</p>
                <Button onClick={runHealthCheck} disabled={running}>
                  Run Health Check
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="integration">
          <TestResults suites={testResults} isRunning={running} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestRunner;
