
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Plus } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { formatDistanceToNow } from 'date-fns';

interface ChatInterfaceProps {
  selectedRoomId?: string;
  onRoomSelect: (roomId: string) => void;
}

const ChatInterface = ({ selectedRoomId, onRoomSelect }: ChatInterfaceProps) => {
  const [messageInput, setMessageInput] = useState('');
  const { rooms, messages, sendMessage, createRoom } = useChat(selectedRoomId);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedRoomId) return;

    try {
      await sendMessage.mutateAsync({
        content: messageInput.trim(),
      });
      setMessageInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[600px] border rounded-lg">
      {/* Rooms list */}
      <div className="w-1/3 border-r">
        <Card className="h-full border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Chats</CardTitle>
              <Button size="sm" variant="ghost">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {rooms?.map((room) => (
                <div
                  key={room.id}
                  className={`p-3 cursor-pointer hover:bg-gray-50 border-b ${
                    selectedRoomId === room.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => onRoomSelect(room.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {room.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{room.name}</h4>
                      <p className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(room.updated_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Messages area */}
      <div className="flex-1 flex flex-col">
        {selectedRoomId ? (
          <>
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-medium">
                {rooms?.find(r => r.id === selectedRoomId)?.name}
              </h3>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages?.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {message.profiles?.full_name?.substring(0, 2).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">
                          {message.profiles?.full_name || 'User'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim() || sendMessage.isPending}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
