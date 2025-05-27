
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronRight, HelpCircle, Book, MessageSquare, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      title: 'Getting Started',
      icon: Book,
      count: 12,
      articles: [
        'How to create an account',
        'Setting up your profile',
        'Platform overview',
        'First steps guide'
      ]
    },
    {
      title: 'For Vendors',
      icon: HelpCircle,
      count: 18,
      articles: [
        'How to list products',
        'Managing your store',
        'Payment and fees',
        'Shipping guidelines'
      ]
    },
    {
      title: 'For Buyers',
      icon: MessageSquare,
      count: 15,
      articles: [
        'How to place an order',
        'Payment methods',
        'Order tracking',
        'Returns and refunds'
      ]
    },
    {
      title: 'Account & Security',
      icon: Phone,
      count: 8,
      articles: [
        'Password reset',
        'Two-factor authentication',
        'Privacy settings',
        'Account verification'
      ]
    }
  ];

  const popularArticles = [
    { title: 'How to create your first product listing', views: '2.1k views' },
    { title: 'Understanding our fee structure', views: '1.8k views' },
    { title: 'How to track your orders', views: '1.5k views' },
    { title: 'Setting up payment methods', views: '1.2k views' },
    { title: 'Returns and refund policy', views: '987 views' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 mb-8">Find answers to your questions and get the help you need</p>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-marketplace-primary/10 w-16 h-16 flex items-center justify-center">
                  <category.icon className="h-8 w-8 text-marketplace-primary" />
                </div>
                <CardTitle className="text-lg">{category.title}</CardTitle>
                <Badge variant="outline">{category.count} articles</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.articles.slice(0, 3).map((article, articleIndex) => (
                    <div key={articleIndex} className="flex items-center justify-between text-sm text-gray-600 hover:text-marketplace-primary cursor-pointer">
                      <span>{article}</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  ))}
                  <Button variant="link" className="p-0 text-sm">
                    View all articles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Popular Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularArticles.map((article, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div>
                        <h4 className="font-medium">{article.title}</h4>
                        <p className="text-sm text-gray-500">{article.views}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Support */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Still need help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">Can't find what you're looking for? Our support team is here to help.</p>
                
                <Button className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us
                </Button>
                
                <div className="text-center text-sm text-gray-500">
                  Average response time: 2 hours
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpCenter;
