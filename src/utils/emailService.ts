
import { supabase } from '@/integrations/supabase/client';

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
  // Send email using template
  sendEmail: async ({ templateName, recipientEmail, variables }: SendEmailParams) => {
    try {
      // First, get the template
      const { data: template, error: templateError } = await supabase
        .from('email_templates')
        .select('*')
        .eq('name', templateName)
        .single();

      if (templateError) throw templateError;

      // Call the edge function to send email
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          template,
          recipientEmail,
          variables,
        },
      });

      if (error) throw error;

      // Log the email
      await supabase.from('email_logs').insert({
        recipient_email: recipientEmail,
        template_name: templateName,
        subject: template.subject,
        status: 'sent',
        variables,
        sent_at: new Date().toISOString(),
      });

      return data;
    } catch (error) {
      console.error('Failed to send email:', error);
      
      // Log the failed attempt
      await supabase.from('email_logs').insert({
        recipient_email: recipientEmail,
        template_name: templateName,
        subject: 'Failed to send',
        status: 'failed',
        error_message: error instanceof Error ? error.message : 'Unknown error',
        variables,
      });

      throw error;
    }
  },

  // Get email templates
  getTemplates: async () => {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .order('name');

    if (error) throw error;
    return data as EmailTemplate[];
  },

  // Get email logs
  getEmailLogs: async (limit = 50) => {
    const { data, error } = await supabase
      .from('email_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },
};
