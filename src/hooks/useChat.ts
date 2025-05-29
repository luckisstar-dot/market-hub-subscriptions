
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'support';
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface ChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file';
  reply_to_id?: string;
  created_at: string;
  updated_at: string;
  profiles?: { full_name: string };
}

interface ChatParticipant {
  id: string;
  room_id: string;
  user_id: string;
  joined_at: string;
  last_seen: string;
}

export const useChat = (roomId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isTyping, setIsTyping] = useState(false);

  // Fetch user's chat rooms
  const { data: rooms, isLoading: roomsLoading } = useQuery({
    queryKey: ['chat-rooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data as ChatRoom[];
    },
    enabled: !!user,
  });

  // Fetch messages for a specific room
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['chat-messages', roomId],
    queryFn: async () => {
      if (!roomId) return [];
      
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          profiles!chat_messages_sender_id_fkey(full_name)
        `)
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as ChatMessage[];
    },
    enabled: !!roomId && !!user,
  });

  // Create a new chat room
  const createRoom = useMutation({
    mutationFn: async ({ name, type, participantIds }: { 
      name: string; 
      type: 'direct' | 'group' | 'support';
      participantIds: string[];
    }) => {
      const { data: room, error: roomError } = await supabase
        .from('chat_rooms')
        .insert({
          name,
          type,
          created_by: user?.id,
        })
        .select()
        .single();

      if (roomError) throw roomError;

      // Add participants
      const participants = [user?.id, ...participantIds].map(userId => ({
        room_id: room.id,
        user_id: userId,
      }));

      const { error: participantError } = await supabase
        .from('chat_participants')
        .insert(participants);

      if (participantError) throw participantError;

      return room;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-rooms'] });
    },
  });

  // Send a message
  const sendMessage = useMutation({
    mutationFn: async ({ content, messageType = 'text', replyToId }: {
      content: string;
      messageType?: 'text' | 'image' | 'file';
      replyToId?: string;
    }) => {
      if (!roomId || !user) throw new Error('Room ID and user required');

      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          room_id: roomId,
          sender_id: user.id,
          content,
          message_type: messageType,
          reply_to_id: replyToId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages', roomId] });
    },
  });

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    const messagesChannel = supabase
      .channel(`chat-messages-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['chat-messages', roomId] });
        }
      )
      .subscribe();

    const roomsChannel = supabase
      .channel('chat-rooms-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_rooms',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['chat-rooms'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(roomsChannel);
    };
  }, [user, roomId, queryClient]);

  return {
    rooms,
    messages,
    roomsLoading,
    messagesLoading,
    createRoom,
    sendMessage,
    isTyping,
    setIsTyping,
  };
};
