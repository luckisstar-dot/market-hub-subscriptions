
export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'buyer' | 'vendor';
}

export interface Vendor {
  id: string;
  name: string;
  status: 'online' | 'offline';
}
