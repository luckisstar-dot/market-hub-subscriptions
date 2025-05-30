
interface EmailTemplate {
  name: string;
  subject: string;
  html_content: string;
  variables: Record<string, any>;
}

interface SendEmailParams {
  templateName: string;
  recipientEmail: string;
  variables: Record<string, any>;
}

export const emailService = {
  // Mock implementation since email tables don't exist
  sendEmail: async ({ templateName, recipientEmail, variables }: SendEmailParams) => {
    try {
      console.log('Sending email:', {
        templateName,
        recipientEmail,
        variables,
      });

      // Mock successful email send
      console.log('Email sent successfully (mock)');
      return { success: true };
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  },

  // Mock implementation for getting templates
  getTemplates: async () => {
    console.log('Getting email templates (mock)');
    const mockTemplates: EmailTemplate[] = [
      {
        name: 'order_confirmation',
        subject: 'Order Confirmation',
        html_content: '<p>Your order {{order_id}} has been confirmed.</p>',
        variables: { order_id: '', customer_name: '', total_amount: '' },
      },
      {
        name: 'order_status_update',
        subject: 'Order Status Update',
        html_content: '<p>Your order {{order_id}} status has been updated.</p>',
        variables: { order_id: '', status: '' },
      },
    ];
    return mockTemplates;
  },

  // Mock implementation for getting email logs
  getEmailLogs: async (limit = 50) => {
    console.log('Getting email logs (mock)');
    return [];
  },
};
