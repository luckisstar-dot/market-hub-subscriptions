
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Flag, CheckCircle, XCircle } from 'lucide-react';
import Header from '@/components/Header';

const ProductReports = () => {
  const reportedProducts = [
    {
      id: 1,
      productName: 'Handmade Jewelry Set',
      vendor: 'Artisan Crafts Ltd',
      reportReason: 'Copyright infringement',
      reportDate: '2024-01-20',
      status: 'pending',
      reportedBy: 'user123@example.com'
    },
    {
      id: 2,
      productName: 'Premium Coffee Beans',
      vendor: 'African Coffee Co.',
      reportReason: 'Misleading description',
      reportDate: '2024-01-18',
      status: 'resolved',
      reportedBy: 'buyer456@example.com'
    },
    {
      id: 3,
      productName: 'Organic Spice Mix',
      vendor: 'Spice Masters',
      reportReason: 'Quality issues',
      reportDate: '2024-01-15',
      status: 'investigating',
      reportedBy: 'customer789@example.com'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  const handleResolve = (reportId: number) => {
    console.log('Resolving report:', reportId);
  };

  const handleReject = (reportId: number) => {
    console.log('Rejecting report:', reportId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="admin" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Reports</h1>
          <p className="text-gray-600">Review and manage product reports from users.</p>
        </div>

        <div className="space-y-6">
          {reportedProducts.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{report.productName}</CardTitle>
                    <p className="text-gray-600">Vendor: {report.vendor}</p>
                    <p className="text-sm text-gray-500">Reported by: {report.reportedBy}</p>
                  </div>
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">Report Reason:</p>
                  <p className="text-gray-600">{report.reportReason}</p>
                </div>
                <p className="text-sm text-gray-500 mb-4">Reported: {report.reportDate}</p>
                
                {report.status === 'pending' && (
                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => handleResolve(report.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Resolve
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleReject(report.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Report
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Product
                    </Button>
                  </div>
                )}
                
                {report.status === 'investigating' && (
                  <div className="flex space-x-3">
                    <Button variant="outline">
                      <Flag className="h-4 w-4 mr-2" />
                      Continue Investigation
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Product
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReports;
