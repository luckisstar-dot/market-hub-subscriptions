
import { EmailLogData, EmailLog } from './types';

export const logEmail = async (logData: EmailLogData): Promise<{ success: boolean }> => {
  console.log('Logging email activity:', logData);
  // In a real implementation, this would save to email_logs table
  return { success: true };
};

export const getEmailLogs = async (limit = 50): Promise<EmailLog[]> => {
  console.log('Getting email logs');
  return [
    {
      id: '1',
      recipient: 'user@example.com',
      subject: 'Welcome to Marketplace!',
      template: 'welcome',
      status: 'sent',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      recipient: 'customer@example.com',
      subject: 'Order Confirmation #12345',
      template: 'order_confirmation',
      status: 'sent',
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ];
};
