
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Coffee, Shirt, Home, Smartphone, BookOpen, Heart, Car } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Categories = () => {
  const { user } = useAuth();

  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          products(count)
        `);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const iconMap: { [key: string]: any } = {
    Coffee,
    Shirt,
    Home,
    Smartphone,
    Package,
    BookOpen,
    Heart,
    Car
  };

  const colorMap: { [key: string]: string } = {
    'Food & Beverages': 'bg-orange-100 text-orange-600',
    'Fashion & Apparel': 'bg-pink-100 text-pink-600',
    'Home & Living': 'bg-green-100 text-green-600',
    'Electronics': 'bg-blue-100 text-blue-600',
    'Arts & Crafts': 'bg-purple-100 text-purple-600',
    'Books & Media': 'bg-indigo-100 text-indigo-600',
    'Health & Beauty': 'bg-red-100 text-red-600',
    'Automotive': 'bg-gray-100 text-gray-600'
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view categories</h1>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="buyer" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Categories</h1>
          <p className="text-gray-600">Explore products by category</p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 rounded-full w-16 h-16 bg-gray-200"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-20 mx-auto"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600">Error loading categories. Please try again.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories?.map((category) => {
              const IconComponent = iconMap[category.icon] || Package;
              const colorClass = colorMap[category.name] || 'bg-gray-100 text-gray-600';
              
              return (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className={`mx-auto mb-4 p-4 rounded-full w-16 h-16 flex items-center justify-center ${colorClass}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Badge variant="outline">
                      {category.products?.length || 0} products
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Categories;
