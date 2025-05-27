
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Heart, 
  Package, 
  Star, 
  Eye, 
  Search,
  Clock,
  CheckCircle,
  Truck
} from 'lucide-react';
import Header from '@/components/Header';

const BuyerDashboard = () => {
  const stats = [
    {
      title: 'Total Orders',
      value: '12',
      change: '3 this month',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Wishlist Items',
      value: '8',
      change: '2 new',
      icon: Heart,
      color: 'text-red-600'
    },
    {
      title: 'Pending Orders',
      value: '2',
      change: 'In progress',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: 'Total Spent',
      value: '$567.89',
      change: '+$89 this month',
      icon: Package,
      color: 'text-green-600'
    }
  ];

  const recentOrders = [
    { 
      id: '#001', 
      vendor: 'African Beans Co.', 
      product: 'Premium Coffee Beans', 
      amount: '$24.99', 
      status: 'Delivered',
      date: '2024-01-15'
    },
    { 
      id: '#002', 
      vendor: 'Spice Masters', 
      product: 'Organic Spice Set', 
      amount: '$34.50', 
      status: 'Shipped',
      date: '2024-01-18'
    },
    { 
      id: '#003', 
      vendor: 'Artisan Crafts', 
      product: 'Handmade Jewelry', 
      amount: '$89.99', 
      status: 'Processing',
      date: '2024-01-20'
    }
  ];

  const wishlistItems = [
    { name: 'Leather Handbag', vendor: 'Leather Works', price: '$129.99', inStock: true },
    { name: 'Tea Collection', vendor: 'Mountain Tea Co.', price: '$45.00', inStock: true },
    { name: 'Silk Scarf', vendor: 'Traditional Textiles', price: '$67.50', inStock: false }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Shipped':
        return <Truck className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-orange-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="buyer" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buyer Dashboard</h1>
          <p className="text-gray-600">Track your orders, manage your wishlist, and discover new products.</p>
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
                <p className="text-xs text-gray-600">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All Orders
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.vendor}</p>
                          <p className="text-sm text-gray-600">{order.product}</p>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
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

          {/* Wishlist */}
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Wishlist</CardTitle>
                <Heart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wishlistItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">{item.vendor}</p>
                        <p className="text-sm font-medium text-marketplace-primary">{item.price}</p>
                      </div>
                      <Badge variant={item.inStock ? 'default' : 'outline'}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="flex flex-col h-20 gap-2">
                  <Search className="h-5 w-5" />
                  Browse Products
                </Button>
                <Button variant="outline" className="flex flex-col h-20 gap-2">
                  <Heart className="h-5 w-5" />
                  View Wishlist
                </Button>
                <Button variant="outline" className="flex flex-col h-20 gap-2">
                  <Package className="h-5 w-5" />
                  Track Orders
                </Button>
                <Button variant="outline" className="flex flex-col h-20 gap-2">
                  <Star className="h-5 w-5" />
                  Write Reviews
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
