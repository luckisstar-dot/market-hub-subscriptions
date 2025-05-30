import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Store, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  AlertTriangle,
  BarChart3,
  Settings,
  UserCheck,
  Package
} from 'lucide-react';
import Header from '@/components/Header';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
      onClick: () => navigate('/admin/user-management')
    },
    {
      title: 'Active Vendors',
      value: '189',
      change: '+8%',
      icon: Store,
      color: 'text-green-600',
      onClick: () => navigate('/admin/approve-vendors')
    },
    {
      title: 'Total Revenue',
      value: '$89,432',
      change: '+15%',
      icon: DollarSign,
      color: 'text-purple-600',
      onClick: () => navigate('/admin/analytics')
    },
    {
      title: 'Platform Growth',
      value: '+23%',
      change: 'This month',
      icon: TrendingUp,
      color: 'text-orange-600',
      onClick: () => navigate('/admin/analytics')
    }
  ];

  const pendingReviews = [
    { type: 'Vendor Application', vendor: 'New Coffee Co.', priority: 'High', time: '2 hours ago' },
    { type: 'Product Report', vendor: 'Artisan Crafts', priority: 'Medium', time: '4 hours ago' },
    { type: 'Vendor Verification', vendor: 'Spice World', priority: 'High', time: '6 hours ago' }
  ];

  const recentActivity = [
    { action: 'New vendor registered', details: 'African Tea Co.', time: '1 hour ago' },
    { action: 'Product flagged for review', details: 'Handmade Jewelry', time: '3 hours ago' },
    { action: 'Vendor subscription upgraded', details: 'Coffee Masters', time: '5 hours ago' },
    { action: 'User complaint resolved', details: 'Order #1234', time: '1 day ago' }
  ];

  const systemAlerts = [
    { type: 'warning', message: 'High server load detected', time: '30 min ago' },
    { type: 'info', message: 'Scheduled maintenance tonight', time: '2 hours ago' },
    { type: 'success', message: 'Payment system updated', time: '1 day ago' }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info':
        return <Shield className="h-4 w-4 text-blue-600" />;
      default:
        return <UserCheck className="h-4 w-4 text-green-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="admin" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor platform performance and manage the marketplace ecosystem.</p>
        </div>

        {/* Stats Grid - Now Clickable */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={stat.onClick}>
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
          {/* Pending Reviews */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Pending Reviews
                  <Badge variant="destructive">{pendingReviews.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingReviews.map((review, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-sm">{review.type}</p>
                        <Badge className={getPriorityColor(review.priority)}>
                          {review.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{review.vendor}</p>
                      <p className="text-xs text-gray-500">{review.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-marketplace-primary mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Alerts */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-gray-500">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Admin Actions - Now with Navigation */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <Button className="flex flex-col h-20 gap-2" onClick={() => navigate('/admin/approve-vendors')}>
                  <UserCheck className="h-5 w-5" />
                  Approve Vendors
                </Button>
                <Button variant="outline" className="flex flex-col h-20 gap-2" onClick={() => navigate('/admin/analytics')}>
                  <BarChart3 className="h-5 w-5" />
                  Analytics
                </Button>
                <Button variant="outline" className="flex flex-col h-20 gap-2" onClick={() => navigate('/admin/system-settings')}>
                  <Settings className="h-5 w-5" />
                  System Settings
                </Button>
                <Button variant="outline" className="flex flex-col h-20 gap-2" onClick={() => navigate('/admin/user-management')}>
                  <Users className="h-5 w-5" />
                  User Management
                </Button>
                <Button variant="outline" className="flex flex-col h-20 gap-2" onClick={() => navigate('/admin/product-reports')}>
                  <Package className="h-5 w-5" />
                  Product Reports
                </Button>
                <Button variant="outline" className="flex flex-col h-20 gap-2" onClick={() => navigate('/admin/test-center')}>
                  <Shield className="h-5 w-5" />
                  Test Center
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
