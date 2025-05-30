
import { MessageSquare } from 'lucide-react';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import { ChatMessage, Vendor } from './types';

interface ChatAreaProps {
  selectedVendor: string | null;
  vendors: Vendor[];
  messages: ChatMessage[];
  newMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

const ChatArea = ({ 
  selectedVendor, 
  vendors, 
  messages, 
  newMessage, 
  onMessageChange, 
  onSendMessage 
}: ChatAreaProps) => {
  if (!selectedVendor) {
    return (
      <div className="w-2/3 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Select a vendor to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-2/3 flex flex-col">
      <ChatMessages messages={messages} />
      <MessageInput
        value={newMessage}
        onChange={onMessageChange}
        onSend={onSendMessage}
      />
    </div>
  );
};

export default ChatArea;
