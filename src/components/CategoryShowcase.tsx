
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, Shirt, Home, Smartphone, Package, BookOpen, Heart, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryShowcase = () => {
  const categories = [
    {
      name: 'Food & Beverages',
      icon: Coffee,
      count: 1245,
      description: 'Coffee, spices, snacks',
      color: 'bg-orange-100 text-orange-600',
      href: '/categories'
    },
    {
      name: 'Fashion & Apparel',
      icon: Shirt,
      count: 892,
      description: 'Clothing, accessories',
      color: 'bg-pink-100 text-pink-600',
      href: '/categories'
    },
    {
      name: 'Home & Living',
      icon: Home,
      count: 567,
      description: 'Furniture, decor',
      color: 'bg-green-100 text-green-600',
      href: '/categories'
    },
    {
      name: 'Electronics',
      icon: Smartphone,
      count: 423,
      description: 'Gadgets, accessories',
      color: 'bg-blue-100 text-blue-600',
      href: '/categories'
    },
    {
      name: 'Arts & Crafts',
      icon: Package,
      count: 756,
      description: 'Handmade items',
      color: 'bg-purple-100 text-purple-600',
      href: '/categories'
    },
    {
      name: 'Health & Beauty',
      icon: Heart,
      count: 345,
      description: 'Skincare, wellness',
      color: 'bg-red-100 text-red-600',
      href: '/categories'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of product categories and find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((category, index) => (
            <Link key={index} to={category.href} className="group">
              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto mb-4 p-4 rounded-full w-16 h-16 flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-marketplace-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">{category.description}</p>
                  <Badge variant="outline" className="text-xs">{category.count} items</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/categories"
            className="inline-flex items-center text-marketplace-primary hover:text-marketplace-primary-dark font-medium"
          >
            View All Categories
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
