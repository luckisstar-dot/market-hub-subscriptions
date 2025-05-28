
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Eye, Clock } from 'lucide-react';
import Header from '@/components/Header';

const ApproveVendors = () => {
  const pendingVendors = [
    {
      id: 1,
      businessName: 'African Coffee Co.',
      email: 'info@africancoffee.com',
      location: 'Kenya',
      description: 'Premium coffee beans from Kenya highlands',
      documentsSubmitted: true,
      applicationDate: '2024-01-20'
    },
    {
      id: 2,
      businessName: 'Artisan Crafts Ltd',
      email: 'contact@artisancrafts.com',
      location: 'Ghana',
      description: 'Handmade traditional crafts and jewelry',
      documentsSubmitted: true,
      applicationDate: '2024-01-18'
    },
    {
      id: 3,
      businessName: 'Spice Masters',
      email: 'hello@spicemasters.com',
      location: 'Morocco',
      description: 'Authentic spices and seasonings',
      documentsSubmitted: false,
      applicationDate: '2024-01-15'
    }
  ];

  const handleApprove = (vendorId: number) => {
    console.log('Approving vendor:', vendorId);
  };

  const handleReject = (vendorId: number) => {
    console.log('Rejecting vendor:', vendorId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="admin" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Approve Vendors</h1>
          <p className="text-gray-600">Review and approve vendor applications.</p>
        </div>

        <div className="space-y-6">
          {pendingVendors.map((vendor) => (
            <Card key={vendor.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{vendor.businessName}</CardTitle>
                    <p className="text-gray-600">{vendor.email}</p>
                    <p className="text-sm text-gray-500">{vendor.location}</p>
                  </div>
                  <Badge variant={vendor.documentsSubmitted ? 'default' : 'destructive'}>
                    {vendor.documentsSubmitted ? 'Documents Complete' : 'Documents Pending'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{vendor.description}</p>
                <p className="text-sm text-gray-500 mb-4">Applied: {vendor.applicationDate}</p>
                
                <div className="flex space-x-3">
                  <Button 
                    onClick={() => handleApprove(vendor.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleReject(vendor.id)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApproveVendors;
