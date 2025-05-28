
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Package, 
  DollarSign, 
  Users, 
  Plus, 
  Eye, 
  Edit,
  BarChart3,
  ShoppingCart,
  MessageSquare
} from 'lucide-react';
import Header from '@/components/Header';

const VendorDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,345',
      change: '+12%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Products Listed',
      value: '24',
      change: '+3',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Total Orders',
      value: '89',
      change: '+8%',
      icon: ShoppingCart,
      color: 'text-purple-600'
    },
    {
      title: 'Messages',
      value: '12',
      change: '5 new',
      icon: MessageSquare,
      color: 'text-orange-600'
    }
  ];

  const recentOrders = [
    { id: '#001', customer: 'John Doe', product: 'Coffee Beans', amount: '$24.99', status: 'Shipped' },
    { id: '#002', customer: 'Jane Smith', product: 'Spice Set', amount: '$34.50', status: 'Processing' },
    { id: '#003', customer: 'Bob Johnson', product: 'Tea Collection', amount: '$45.00', status: 'Delivered' }
  ];

  const topProducts = [
    { name: 'Premium Coffee Beans', sales: 45, revenue: '$1,125' },
    { name: 'Organic Spice Set', sales: 32, revenue: '$1,104' },
    { name: 'Herbal Tea Collection', sales: 28, revenue: '$1,260' }
  ];

  const handleViewAllOrders = () => {
    // Navigate to all orders page or show expanded view
    console.log('Viewing all orders');
    // You could navigate to a dedicated orders page
    // navigate('/vendor/orders');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="vendor" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders - Now with Clickable View All */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm" onClick={handleViewAllOrders}>
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.product}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.amount}</p>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'outline'}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Products */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-gray-600">{product.sales} sales</p>
                      </div>
                      <p className="text-sm font-medium">{product.revenue}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions - Now with Navigation */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="flex flex-col h-20 gap-2" onClick={() => navigate('/vendor/add-product')}>
                  <Plus className="h-5 w-5" />
                  Add Product
                </Button>
                <Button variant="outline" className="flex flex-col h-20 gap-2" onClick={() => navigate('/vendor/analytics')}>
                  <BarChart3 className="h-5 w-5" />
                  View Analytics
                </Button>
                <Button variant="outline" className="flex flex-col h-20 gap-2" onClick={() => navigate('/vendor/manage-inventory')}>
                  <Package className="h-5 w-5" />
                  Manage Inventory
                </Button>
                <Button variant="outline" className="flex flex-col h-20 gap-2" onClick={() => navigate('/vendor/messages')}>
                  <MessageSquare className="h-5 w-5" />
                  Messages
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
