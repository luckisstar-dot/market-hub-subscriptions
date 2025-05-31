
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Blog = () => {
  const blogPosts = [
    {
      title: '10 Tips for Successful Selling on Marketplaces',
      excerpt: 'Learn the essential strategies that top vendors use to maximize their sales and grow their business on our platform.',
      author: 'Sarah Johnson',
      date: 'March 20, 2024',
      category: 'Vendor Tips',
      readTime: '5 min read',
      image: '/placeholder.svg'
    },
    {
      title: 'The Future of E-commerce: Trends to Watch in 2024',
      excerpt: 'Explore the emerging trends that are shaping the future of online commerce and how they impact marketplace sellers.',
      author: 'Michael Chen',
      date: 'March 18, 2024',
      category: 'Industry Insights',
      readTime: '8 min read',
      image: '/placeholder.svg'
    },
    {
      title: 'Building Trust with Customers: A Vendor\'s Guide',
      excerpt: 'Discover proven methods to build lasting relationships with customers and establish credibility in the marketplace.',
      author: 'Emily Rodriguez',
      date: 'March 15, 2024',
      category: 'Customer Relations',
      readTime: '6 min read',
      image: '/placeholder.svg'
    },
    {
      title: 'Optimizing Product Listings for Maximum Visibility',
      excerpt: 'Master the art of product listing optimization to increase visibility and drive more sales on the platform.',
      author: 'David Wilson',
      date: 'March 12, 2024',
      category: 'SEO & Marketing',
      readTime: '7 min read',
      image: '/placeholder.svg'
    },
    {
      title: 'Success Story: How Local Artisan Reached Global Markets',
      excerpt: 'Follow the inspiring journey of a local craftsperson who built an international business through our marketplace.',
      author: 'Lisa Thompson',
      date: 'March 10, 2024',
      category: 'Success Stories',
      readTime: '4 min read',
      image: '/placeholder.svg'
    },
    {
      title: 'Understanding Marketplace Analytics: Key Metrics to Track',
      excerpt: 'Learn which analytics matter most for your business growth and how to interpret the data effectively.',
      author: 'Alex Kumar',
      date: 'March 8, 2024',
      category: 'Analytics',
      readTime: '9 min read',
      image: '/placeholder.svg'
    }
  ];

  const categories = ['All', 'Vendor Tips', 'Industry Insights', 'Customer Relations', 'SEO & Marketing', 'Success Stories', 'Analytics'];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            OneShop Blog
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Insights, tips, and stories from the world of marketplace commerce.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <Button 
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-marketplace-primary">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <Button variant="ghost" size="sm">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Posts
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-marketplace-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter for the latest marketplace insights and tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-white"
            />
            <Button variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
