
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Package, DollarSign, ShoppingCart, Eye, Target, Percent } from 'lucide-react';

interface AnalyticsProps {
  userRole: 'admin' | 'vendor' | 'buyer';
}

const EnhancedAnalytics = ({ userRole }: AnalyticsProps) => {
  // Mock data - in real app, this would come from your analytics API
  const salesData = [
    { month: 'Jan', revenue: 12000, orders: 45, visitors: 1250 },
    { month: 'Feb', revenue: 18000, orders: 67, visitors: 1890 },
    { month: 'Mar', revenue: 22000, orders: 82, visitors: 2200 },
    { month: 'Apr', revenue: 19000, orders: 71, visitors: 1950 },
    { month: 'May', revenue: 28000, orders: 96, visitors: 2800 },
    { month: 'Jun', revenue: 31000, orders: 108, visitors: 3100 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#8884d8' },
    { name: 'Clothing', value: 25, color: '#82ca9d' },
    { name: 'Home & Garden', value: 20, color: '#ffc658' },
    { name: 'Books', value: 12, color: '#ff7300' },
    { name: 'Sports', value: 8, color: '#00ff88' },
  ];

  const topProducts = [
    { name: 'Premium Coffee Beans', sales: 342, revenue: 8550, growth: 12.5 },
    { name: 'Organic Spice Set', sales: 189, revenue: 6519, growth: -2.1 },
    { name: 'Herbal Tea Collection', sales: 156, revenue: 7020, growth: 8.3 },
    { name: 'Kitchen Essentials Kit', sales: 134, revenue: 5360, growth: 15.7 },
    { name: 'Artisan Honey Set', sales: 98, revenue: 4900, growth: 6.2 },
  ];

  const userMetrics = [
    { metric: 'Total Users', value: '12,847', change: '+12.5%', icon: Users, color: 'text-blue-600' },
    { metric: 'Active Vendors', value: '342', change: '+8.2%', icon: Package, color: 'text-green-600' },
    { metric: 'Monthly Revenue', value: '$31,000', change: '+15.3%', icon: DollarSign, color: 'text-purple-600' },
    { metric: 'Conversion Rate', value: '3.2%', change: '+0.5%', icon: Target, color: 'text-orange-600' },
  ];

  const vendorMetrics = [
    { metric: 'Total Sales', value: '$8,247', change: '+18.2%', icon: DollarSign, color: 'text-green-600' },
    { metric: 'Orders', value: '156', change: '+12.5%', icon: ShoppingCart, color: 'text-blue-600' },
    { metric: 'Product Views', value: '2,847', change: '+22.1%', icon: Eye, color: 'text-purple-600' },
    { metric: 'Conversion Rate', value: '5.5%', change: '+1.2%', icon: Percent, color: 'text-orange-600' },
  ];

  const metrics = userRole === 'admin' ? userMetrics : vendorMetrics;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8884d8" />
                  <Bar dataKey="orders" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">${product.revenue.toLocaleString()}</p>
                      <p className={`text-sm ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.growth > 0 ? '+' : ''}{product.growth}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visitors" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedAnalytics;
