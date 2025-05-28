
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MessageSquare, Reply, Clock, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';

const Messages = () => {
  const messages = [
    {
      id: 1,
      from: 'john.doe@example.com',
      subject: 'Question about Premium Coffee Beans',
      message: 'Hi, I wanted to know if these coffee beans are single origin and what roast level they are?',
      date: '2024-01-20 10:30 AM',
      status: 'unread',
      product: 'Premium Coffee Beans'
    },
    {
      id: 2,
      from: 'jane.smith@example.com',
      subject: 'Order Issue #12345',
      message: 'I received my spice set but one of the containers was damaged during shipping. Can you help?',
      date: '2024-01-19 3:45 PM',
      status: 'replied',
      product: 'Organic Spice Set'
    },
    {
      id: 3,
      from: 'bob.johnson@example.com',
      subject: 'Bulk Order Inquiry',
      message: 'I\'m interested in placing a bulk order for 50 units. Do you offer any volume discounts?',
      date: '2024-01-18 11:20 AM',
      status: 'unread',
      product: 'Herbal Tea Collection'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread': return <Clock className="h-4 w-4" />;
      case 'replied': return <CheckCircle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="vendor" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Manage customer inquiries and communications.</p>
        </div>

        {/* Message Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Unread Messages</h3>
                <p className="text-3xl font-bold text-red-600">2</p>
                <p className="text-sm text-gray-600">Require attention</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Replied Today</h3>
                <p className="text-3xl font-bold text-green-600">1</p>
                <p className="text-sm text-gray-600">Messages handled</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Average Response</h3>
                <p className="text-3xl font-bold text-blue-600">2.3h</p>
                <p className="text-sm text-gray-600">Response time</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Customer Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h3 className="font-medium">{message.subject}</h3>
                        <p className="text-sm text-gray-600">From: {message.from}</p>
                        <p className="text-xs text-gray-500">Product: {message.product}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(message.status)}>
                        {getStatusIcon(message.status)}
                        <span className="ml-1">{message.status}</span>
                      </Badge>
                      <span className="text-sm text-gray-500">{message.date}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{message.message}</p>

                  <div className="flex space-x-2">
                    <Button size="sm">
                      <Reply className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                    {message.status === 'unread' && (
                      <Button variant="outline" size="sm">
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Reply Template */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Reply</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input placeholder="Subject" />
              <textarea 
                className="w-full p-3 border rounded-md"
                rows={4}
                placeholder="Type your message..."
              ></textarea>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Save as Template</Button>
                <Button>Send Reply</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
