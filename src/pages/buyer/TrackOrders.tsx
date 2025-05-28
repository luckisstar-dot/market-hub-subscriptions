
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Truck, CheckCircle, Clock, Eye } from 'lucide-react';
import Header from '@/components/Header';

const TrackOrders = () => {
  const orders = [
    {
      id: '#ORD-001',
      date: '2024-01-20',
      vendor: 'African Coffee Co.',
      items: [{ name: 'Premium Coffee Beans', quantity: 2 }],
      total: 49.98,
      status: 'delivered',
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-01-22'
    },
    {
      id: '#ORD-002',
      date: '2024-01-18',
      vendor: 'Artisan Crafts',
      items: [{ name: 'Handmade Jewelry Set', quantity: 1 }],
      total: 89.99,
      status: 'shipped',
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-01-25'
    },
    {
      id: '#ORD-003',
      date: '2024-01-15',
      vendor: 'Spice Masters',
      items: [{ name: 'Organic Spice Mix', quantity: 3 }],
      total: 103.50,
      status: 'processing',
      trackingNumber: null,
      estimatedDelivery: '2024-01-28'
    },
    {
      id: '#ORD-004',
      date: '2024-01-12',
      vendor: 'Tech Store',
      items: [{ name: 'Wireless Headphones', quantity: 1 }],
      total: 199.99,
      status: 'pending',
      trackingNumber: null,
      estimatedDelivery: '2024-01-30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="buyer" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Orders</h1>
          <p className="text-gray-600">Monitor the status of your orders and shipments.</p>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Total Orders</h3>
                <p className="text-3xl font-bold text-marketplace-primary">{orders.length}</p>
                <p className="text-sm text-gray-600">All time</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">In Transit</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {orders.filter(order => order.status === 'shipped').length}
                </p>
                <p className="text-sm text-gray-600">Being delivered</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Processing</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {orders.filter(order => order.status === 'processing').length}
                </p>
                <p className="text-sm text-gray-600">Being prepared</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Delivered</h3>
                <p className="text-3xl font-bold text-green-600">
                  {orders.filter(order => order.status === 'delivered').length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Your Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-lg">{order.id}</h3>
                      <p className="text-sm text-gray-600">Ordered: {order.date}</p>
                      <p className="text-sm text-gray-600">Vendor: {order.vendor}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </Badge>
                      <p className="text-lg font-bold text-marketplace-primary mt-1">${order.total}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Items:</h4>
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        {item.name} (Qty: {item.quantity})
                      </p>
                    ))}
                  </div>

                  {order.trackingNumber && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium">Tracking Number: {order.trackingNumber}</p>
                      <p className="text-sm text-gray-600">Estimated Delivery: {order.estimatedDelivery}</p>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {order.trackingNumber && (
                      <Button size="sm">
                        <Truck className="h-4 w-4 mr-2" />
                        Track Package
                      </Button>
                    )}
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        Write Review
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrackOrders;
