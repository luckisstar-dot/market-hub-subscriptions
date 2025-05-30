
import MessageBubble from './MessageBubble';
import { ChatMessage } from './types';

interface ChatMessagesProps {
  messages: ChatMessage[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default ChatMessages;
