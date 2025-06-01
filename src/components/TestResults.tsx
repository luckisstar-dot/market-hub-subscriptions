
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Play } from 'lucide-react';
import { TestSuite } from '@/utils/testing/testRunner';

interface TestResultsProps {
  suites: TestSuite[];
  isRunning: boolean;
}

const TestResults = ({ suites, isRunning }: TestResultsProps) => {
  const totalTests = suites.reduce((sum, suite) => sum + suite.tests.length, 0);
  const totalPassed = suites.reduce((sum, suite) => sum + suite.passed, 0);
  const totalFailed = suites.reduce((sum, suite) => sum + suite.failed, 0);
  const totalDuration = suites.reduce((sum, suite) => sum + suite.duration, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (isRunning) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2">
            <Play className="h-5 w-5 animate-pulse" />
            <span>Running tests...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Test Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalTests}</div>
              <div className="text-sm text-gray-600">Total Tests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalPassed}</div>
              <div className="text-sm text-gray-600">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{totalFailed}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(totalDuration)}ms</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Suites */}
      {suites.map((suite, suiteIndex) => (
        <Card key={suiteIndex}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{suite.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {suite.passed}/{suite.tests.length} passed
                </Badge>
                <Badge variant="outline">
                  {Math.round(suite.duration)}ms
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suite.tests.map((test, testIndex) => (
                <div
                  key={testIndex}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <span className="font-medium">{test.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(test.status)}>
                      {test.status}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {Math.round(test.duration)}ms
                    </span>
                  </div>
                </div>
              ))}
              
              {suite.tests.some(test => test.error) && (
                <div className="mt-4">
                  <h4 className="font-medium text-red-600 mb-2">Errors:</h4>
                  {suite.tests
                    .filter(test => test.error)
                    .map((test, errorIndex) => (
                      <div
                        key={errorIndex}
                        className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm"
                      >
                        <div className="font-medium">{test.name}</div>
                        <div className="text-red-700 mt-1">{test.error}</div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {suites.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-600">No test results yet. Run tests to see results.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestResults;
