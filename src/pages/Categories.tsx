
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Coffee, Shirt, Home, Smartphone, BookOpen, Heart, Car } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Categories = () => {
  const categories = [
    {
      name: 'Food & Beverages',
      icon: Coffee,
      count: 1245,
      description: 'Coffee, spices, snacks, and gourmet foods',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      name: 'Fashion & Apparel',
      icon: Shirt,
      count: 892,
      description: 'Clothing, accessories, and traditional wear',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      name: 'Home & Living',
      icon: Home,
      count: 567,
      description: 'Furniture, decor, and household items',
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Electronics',
      icon: Smartphone,
      count: 423,
      description: 'Gadgets, accessories, and tech products',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Arts & Crafts',
      icon: Package,
      count: 756,
      description: 'Handmade items, artwork, and crafts',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      name: 'Books & Media',
      icon: BookOpen,
      count: 234,
      description: 'Books, music, and educational materials',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      name: 'Health & Beauty',
      icon: Heart,
      count: 345,
      description: 'Skincare, wellness, and beauty products',
      color: 'bg-red-100 text-red-600'
    },
    {
      name: 'Automotive',
      icon: Car,
      count: 189,
      description: 'Car accessories and automotive products',
      color: 'bg-gray-100 text-gray-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Categories</h1>
          <p className="text-gray-600">Explore products by category</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className={`mx-auto mb-4 p-4 rounded-full w-16 h-16 flex items-center justify-center ${category.color}`}>
                  <category.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Badge variant="outline">{category.count} products</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;
