
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, User, Clock } from 'lucide-react';
import { useChat } from '@/hooks/useChat';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'buyer' | 'vendor';
}

const BuyerChat = () => {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<{[key: string]: ChatMessage[]}>({});
  const { sendMessage } = useChat();

  const vendors = [
    { id: '1', name: 'African Coffee Co.', status: 'online' },
    { id: '2', name: 'Artisan Crafts', status: 'offline' },
    { id: '3', name: 'Spice Masters', status: 'online' },
  ];

  const mockMessages: {[key: string]: ChatMessage[]} = {
    '1': [
      {
        id: '1',
        sender: 'African Coffee Co.',
        message: 'Hello! Thank you for your interest in our coffee beans. How can I help you today?',
        timestamp: '10:30 AM',
        type: 'vendor'
      },
      {
        id: '2',
        sender: 'You',
        message: 'Hi! I wanted to know more about the origin of your coffee beans.',
        timestamp: '10:32 AM',
        type: 'buyer'
      }
    ],
    '2': [
      {
        id: '3',
        sender: 'Artisan Crafts',
        message: 'Welcome! We specialize in handmade jewelry. What are you looking for?',
        timestamp: 'Yesterday',
        type: 'vendor'
      }
    ],
    '3': []
  };

  useEffect(() => {
    setConversations(mockMessages);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedVendor) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'buyer'
    };

    setConversations(prev => ({
      ...prev,
      [selectedVendor]: [...(prev[selectedVendor] || []), message]
    }));

    setNewMessage('');

    // Simulate vendor response after 2 seconds
    setTimeout(() => {
      const vendorName = vendors.find(v => v.id === selectedVendor)?.name || 'Vendor';
      const vendorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: vendorName,
        message: 'Thank you for your message! I\'ll get back to you shortly with more details.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'vendor'
      };

      setConversations(prev => ({
        ...prev,
        [selectedVendor]: [...(prev[selectedVendor] || []), vendorResponse]
      }));
    }, 2000);
  };

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Chat with Vendors
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex h-80">
          {/* Vendor List */}
          <div className="w-1/3 border-r">
            <div className="p-4 border-b">
              <h4 className="font-medium">Conversations</h4>
            </div>
            <div className="overflow-y-auto h-64">
              {vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className={`p-3 cursor-pointer hover:bg-gray-50 border-b ${
                    selectedVendor === vendor.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedVendor(vendor.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">{vendor.name}</span>
                    </div>
                    <Badge 
                      variant={vendor.status === 'online' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {vendor.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="w-2/3 flex flex-col">
            {selectedVendor ? (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {(conversations[selectedVendor] || []).map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'buyer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg ${
                          msg.type === 'buyer'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1 opacity-70" />
                          <span className="text-xs opacity-70">{msg.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a vendor to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerChat;
