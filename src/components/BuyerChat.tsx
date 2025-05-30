
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import VendorList from './chat/VendorList';
import ChatArea from './chat/ChatArea';
import { ChatMessage, Vendor } from './chat/types';

const BuyerChat = () => {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<{[key: string]: ChatMessage[]}>({});

  const vendors: Vendor[] = [
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
          <VendorList
            vendors={vendors}
            selectedVendor={selectedVendor}
            onSelectVendor={setSelectedVendor}
          />
          <ChatArea
            selectedVendor={selectedVendor}
            vendors={vendors}
            messages={conversations[selectedVendor] || []}
            newMessage={newMessage}
            onMessageChange={setNewMessage}
            onSendMessage={handleSendMessage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerChat;
