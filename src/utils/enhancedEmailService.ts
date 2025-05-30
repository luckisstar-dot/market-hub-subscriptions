
import { supabase } from '@/integrations/supabase/client';

export interface EmailTemplate {
  name: string;
  subject: string;
  html_content: string;
  variables: Record<string, any>;
}

export interface SendEmailParams {
  templateName?: string;
  recipientEmail: string;
  subject?: string;
  content?: string;
  variables?: Record<string, any>;
}

export const enhancedEmailService = {
  // Send email with template or direct content
  sendEmail: async ({ templateName, recipientEmail, subject, content, variables = {} }: SendEmailParams) => {
    try {
      console.log('Enhanced email service - sending email:', {
        templateName,
        recipientEmail,
        subject,
        hasContent: !!content,
        variables,
      });

      let emailData;

      if (templateName) {
        // Use template
        const templates = await enhancedEmailService.getTemplates();
        const template = templates.find(t => t.name === templateName);
        
        if (!template) {
          throw new Error(`Template '${templateName}' not found`);
        }

        // Replace variables in template
        let processedSubject = template.subject;
        let processedContent = template.html_content;

        Object.entries(variables).forEach(([key, value]) => {
          const placeholder = `{{${key}}}`;
          processedSubject = processedSubject.replace(new RegExp(placeholder, 'g'), String(value));
          processedContent = processedContent.replace(new RegExp(placeholder, 'g'), String(value));
        });

        emailData = {
          to: recipientEmail,
          subject: processedSubject,
          html: processedContent,
        };
      } else {
        // Use direct content
        if (!subject || !content) {
          throw new Error('Subject and content are required when not using a template');
        }

        emailData = {
          to: recipientEmail,
          subject,
          html: content,
        };
      }

      const { data, error } = await supabase.functions.invoke('send-email', {
        body: emailData,
      });

      if (error) throw error;

      // Log the email (mock implementation)
      await enhancedEmailService.logEmail({
        recipient: recipientEmail,
        subject: emailData.subject,
        template: templateName,
        status: 'sent',
        variables,
      });

      console.log('Email sent successfully');
      return { success: true, data };
    } catch (error) {
      console.error('Failed to send email:', error);
      
      // Log failed email attempt
      await enhancedEmailService.logEmail({
        recipient: recipientEmail,
        subject: subject || 'Unknown',
        template: templateName,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        variables,
      });
      
      throw error;
    }
  },

  // Get available templates (mock implementation)
  getTemplates: async (): Promise<EmailTemplate[]> => {
    console.log('Getting email templates');
    return [
      {
        name: 'welcome',
        subject: 'Welcome to {{company_name}}!',
        html_content: `
          <h1>Welcome {{user_name}}!</h1>
          <p>Thank you for joining {{company_name}}. We're excited to have you on board!</p>
          <p>Get started by exploring our marketplace and discovering amazing products.</p>
          <p>Best regards,<br>The {{company_name}} Team</p>
        `,
        variables: { user_name: '', company_name: '' },
      },
      {
        name: 'order_confirmation',
        subject: 'Order Confirmation #{{order_id}}',
        html_content: `
          <h1>Order Confirmed!</h1>
          <p>Hi {{customer_name}},</p>
          <p>Your order #{{order_id}} has been confirmed and is being processed.</p>
          <p><strong>Total Amount:</strong> ${{total_amount}}</p>
          <p>You will receive a shipping notification once your order is on its way.</p>
          <p>Thank you for your purchase!</p>
        `,
        variables: { customer_name: '', order_id: '', total_amount: '' },
      },
      {
        name: 'password_reset',
        subject: 'Reset Your Password',
        html_content: `
          <h1>Password Reset Request</h1>
          <p>Hi {{user_name}},</p>
          <p>You requested to reset your password. Click the link below to create a new password:</p>
          <p><a href="{{reset_link}}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>The link will expire in 24 hours.</p>
        `,
        variables: { user_name: '', reset_link: '' },
      },
    ];
  },

  // Log email activity (mock implementation)
  logEmail: async (logData: {
    recipient: string;
    subject: string;
    template?: string;
    status: 'sent' | 'failed' | 'pending';
    error?: string;
    variables?: Record<string, any>;
  }) => {
    console.log('Logging email activity:', logData);
    // In a real implementation, this would save to email_logs table
    return { success: true };
  },

  // Get email logs (mock implementation)
  getEmailLogs: async (limit = 50) => {
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
  },

  // Send bulk emails
  sendBulkEmails: async (emails: SendEmailParams[]) => {
    console.log('Sending bulk emails:', emails.length);
    const results = [];
    
    for (const emailParams of emails) {
      try {
        const result = await enhancedEmailService.sendEmail(emailParams);
        results.push({ ...emailParams, success: true, result });
      } catch (error) {
        results.push({ 
          ...emailParams, 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }
    
    return results;
  },
};
