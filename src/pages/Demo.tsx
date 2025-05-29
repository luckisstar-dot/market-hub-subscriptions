
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import ChatInterface from '@/components/Chat/ChatInterface';
import EnhancedSearch from '@/components/EnhancedSearch';
import LazyImage from '@/components/LazyImage';
import MetaTags from '@/components/SEO/MetaTags';
import { usePerformanceMetrics } from '@/hooks/usePerformanceMetrics';
import { emailService } from '@/utils/emailService';
import { toast } from '@/components/ui/use-toast';

const Demo = () => {
  const [selectedChatRoom, setSelectedChatRoom] = useState<string>();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { recordUserAction } = usePerformanceMetrics();

  const handleTestEmail = async () => {
    try {
      recordUserAction('test_email_sent');
      await emailService.sendEmail({
        templateName: 'order_confirmation',
        recipientEmail: 'test@example.com',
        variables: {
          order_id: '12345',
          total_amount: '99.99',
          customer_name: 'John Doe',
        },
      });
      toast({
        title: 'Email Sent',
        description: 'Test email has been sent successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send test email',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <MetaTags
        title="Demo - All Features"
        description="Demonstration of all marketplace features including chat, search, and email"
        keywords={['demo', 'marketplace', 'features', 'chat', 'search']}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header userRole="buyer" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Feature Demo
            </h1>
            <p className="text-gray-600">
              Explore all the advanced features of our marketplace platform
            </p>
          </div>

          <Tabs defaultValue="chat" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="chat">Real-time Chat</TabsTrigger>
              <TabsTrigger value="search">Advanced Search</TabsTrigger>
              <TabsTrigger value="email">Email System</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="seo">SEO Features</TabsTrigger>
            </TabsList>

            <TabsContent value="chat">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Real-time Chat System
                    <Badge>Live</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChatInterface
                    selectedRoomId={selectedChatRoom}
                    onRoomSelect={setSelectedChatRoom}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="search">
              <Card>
                <CardHeader>
                  <CardTitle>Enhanced Search with Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <EnhancedSearch
                      onResults={setSearchResults}
                      onQueryChange={setSearchQuery}
                    />
                    
                    {searchResults.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Search Results ({searchResults.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {searchResults.slice(0, 6).map((product) => (
                            <Card key={product.id}>
                              <CardContent className="p-4">
                                <LazyImage
                                  src={product.images?.[0] || '/placeholder.svg'}
                                  alt={product.name}
                                  className="w-full h-32 object-cover rounded-md mb-3"
                                  placeholder="Loading..."
                                />
                                <h4 className="font-medium mb-2">{product.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">
                                  {product.description?.substring(0, 100)}...
                                </p>
                                <div className="flex justify-between items-center">
                                  <span className="font-bold text-lg">
                                    ${product.price}
                                  </span>
                                  <Badge variant={product.stock_quantity > 0 ? 'default' : 'secondary'}>
                                    {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle>Email Integration System</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Our email system supports templated emails with variable substitution,
                      automatic logging, and delivery tracking.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Available Email Templates:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Order Confirmation</li>
                        <li>Order Status Update</li>
                        <li>Password Reset</li>
                        <li>Welcome Email</li>
                      </ul>
                    </div>

                    <Button onClick={handleTestEmail}>
                      Send Test Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">
                          Lazy Loading Images
                        </h4>
                        <p className="text-blue-700 text-sm">
                          Images load only when they enter the viewport, reducing initial page load time.
                        </p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">
                          Performance Metrics
                        </h4>
                        <p className="text-green-700 text-sm">
                          Automatic tracking of page load times, API calls, and user interactions.
                        </p>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-medium text-purple-900 mb-2">
                          Query Optimization
                        </h4>
                        <p className="text-purple-700 text-sm">
                          React Query provides caching, background updates, and smart data fetching.
                        </p>
                      </div>
                      
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-medium text-orange-900 mb-2">
                          Real-time Updates
                        </h4>
                        <p className="text-orange-700 text-sm">
                          Supabase real-time subscriptions keep data synchronized across clients.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Optimization Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Current Page SEO:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Dynamic meta tags and titles</li>
                        <li>Open Graph and Twitter Card tags</li>
                        <li>Structured data (JSON-LD)</li>
                        <li>Proper heading hierarchy</li>
                        <li>Semantic HTML markup</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        SEO Best Practices Implemented:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                        <li>Product schema markup for better search results</li>
                        <li>Breadcrumb navigation with structured data</li>
                        <li>Optimized image alt tags and lazy loading</li>
                        <li>Clean, descriptive URLs</li>
                        <li>Fast loading times and Core Web Vitals optimization</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Demo;
