
import { Clock } from 'lucide-react';
import { ChatMessage } from './types';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div
      className={`flex ${message.type === 'buyer' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xs px-3 py-2 rounded-lg ${
          message.type === 'buyer'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        <p className="text-sm">{message.message}</p>
        <div className="flex items-center mt-1">
          <Clock className="h-3 w-3 mr-1 opacity-70" />
          <span className="text-xs opacity-70">{message.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
