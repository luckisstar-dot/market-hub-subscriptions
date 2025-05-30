
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

// Mock interfaces for chat functionality
interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group';
  created_by: string;
  updated_at: string;
}

interface ChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file';
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string;
    avatar_url?: string;
  };
}

export const useChat = (selectedRoomId?: string) => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock implementation - returns empty data for now
  const fetchRooms = async () => {
    setLoading(true);
    try {
      // Mock empty rooms for now since chat tables don't exist
      setRooms([]);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (roomId: string) => {
    setLoading(true);
    try {
      // Mock empty messages for now since chat tables don't exist
      setMessages([]);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async (roomData: Partial<ChatRoom>) => {
    try {
      console.log('Creating room:', roomData);
      // Mock implementation - would create room in database
      return { id: 'mock-room-id', ...roomData };
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  };

  const sendMessage = useMutation({
    mutationFn: async (messageData: {
      content: string;
      messageType?: 'text' | 'image' | 'file';
    }) => {
      try {
        console.log('Sending message:', { ...messageData, roomId: selectedRoomId });
        // Mock implementation - would send message to database
        const newMessage = {
          id: 'mock-message-id',
          room_id: selectedRoomId || '',
          sender_id: 'mock-user-id',
          content: messageData.content,
          message_type: messageData.messageType || 'text',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        // Add to local messages for demo
        setMessages(prev => [...prev, newMessage]);
        
        return newMessage;
      } catch (error) {
        console.error('Error sending message:', error);
        throw error;
      }
    },
  });

  return {
    rooms,
    messages,
    loading,
    fetchRooms,
    fetchMessages,
    createRoom,
    sendMessage,
  };
};
