
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { TrendingUp, Users, ShoppingCart, DollarSign, Package } from 'lucide-react';

interface AnalyticsData {
  userGrowth: Array<{ month: string; users: number; revenue: number }>;
  salesData: Array<{ category: string; sales: number; revenue: number }>;
  userActivity: Array<{ day: string; activeUsers: number; orders: number }>;
  topProducts: Array<{ name: string; sales: number; revenue: number }>;
}

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    userGrowth: [],
    salesData: [],
    userActivity: [],
    topProducts: [],
  });
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Fetch real data from database
      const [usersResult, ordersResult, productsResult] = await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('orders').select('*, order_items(*)'),
        supabase.from('products').select('*'),
      ]);

      // Calculate stats from real data
      const totalUsers = usersResult.data?.length || 0;
      const totalOrders = ordersResult.data?.length || 0;
      const totalProducts = productsResult.data?.length || 0;
      const totalRevenue = ordersResult.data?.reduce((sum, order) => {
        return sum + parseFloat(String(order.total_amount || '0'));
      }, 0) || 0;
      const conversionRate = totalUsers > 0 ? (totalOrders / totalUsers) * 100 : 0;

      setStats({
        totalUsers,
        totalOrders,
        totalRevenue,
        totalProducts,
        conversionRate,
      });

      // Generate mock analytics data for charts (in real app, this would come from database)
      const userGrowthData = [
        { month: 'Jan', users: Math.floor(totalUsers * 0.1), revenue: Math.floor(totalRevenue * 0.1) },
        { month: 'Feb', users: Math.floor(totalUsers * 0.2), revenue: Math.floor(totalRevenue * 0.15) },
        { month: 'Mar', users: Math.floor(totalUsers * 0.4), revenue: Math.floor(totalRevenue * 0.3) },
        { month: 'Apr', users: Math.floor(totalUsers * 0.6), revenue: Math.floor(totalRevenue * 0.5) },
        { month: 'May', users: Math.floor(totalUsers * 0.8), revenue: Math.floor(totalRevenue * 0.75) },
        { month: 'Jun', users: totalUsers, revenue: totalRevenue },
      ];

      const salesData = [
        { category: 'Electronics', sales: 45, revenue: 12500 },
        { category: 'Clothing', sales: 32, revenue: 8900 },
        { category: 'Home & Garden', sales: 28, revenue: 7200 },
        { category: 'Books', sales: 15, revenue: 3400 },
        { category: 'Sports', sales: 22, revenue: 5800 },
      ];

      const userActivity = [
        { day: 'Mon', activeUsers: 120, orders: 23 },
        { day: 'Tue', activeUsers: 95, orders: 18 },
        { day: 'Wed', activeUsers: 140, orders: 31 },
        { day: 'Thu', activeUsers: 110, orders: 25 },
        { day: 'Fri', activeUsers: 160, orders: 42 },
        { day: 'Sat', activeUsers: 180, orders: 55 },
        { day: 'Sun', activeUsers: 90, orders: 16 },
      ];

      setAnalytics({
        userGrowth: userGrowthData,
        salesData,
        userActivity,
        topProducts: productsResult.data?.slice(0, 5).map(p => ({
          name: p.name,
          sales: Math.floor(Math.random() * 100) + 10,
          revenue: Math.floor(Math.random() * 5000) + 1000,
        })) || [],
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <Tabs defaultValue="growth" className="space-y-4">
        <TabsList>
          <TabsTrigger value="growth">User Growth</TabsTrigger>
          <TabsTrigger value="sales">Sales by Category</TabsTrigger>
          <TabsTrigger value="activity">Daily Activity</TabsTrigger>
          <TabsTrigger value="products">Top Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle>User Growth & Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={analytics.userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sales">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analytics.salesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="sales"
                    >
                      {analytics.salesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Daily User Activity & Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analytics.userActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="activeUsers" fill="#8884d8" />
                  <Bar dataKey="orders" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${product.revenue}</p>
                      <Badge variant="secondary">#{index + 1}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;
