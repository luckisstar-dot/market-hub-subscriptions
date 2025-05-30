
import { supabase } from '@/integrations/supabase/client';
import { SendEmailParams } from './types';
import { getTemplate, processTemplate } from './templates';
import { logEmail } from './logger';

export const sendSingleEmail = async ({ 
  templateName, 
  recipientEmail, 
  subject, 
  content, 
  variables = {} 
}: SendEmailParams) => {
  try {
    console.log('Sending email:', {
      templateName,
      recipientEmail,
      subject,
      hasContent: !!content,
      variables,
    });

    let emailData;

    if (templateName) {
      // Use template
      const template = getTemplate(templateName);
      
      if (!template) {
        throw new Error(`Template '${templateName}' not found`);
      }

      // Process template with variables
      const processed = processTemplate(template, variables);

      emailData = {
        to: recipientEmail,
        subject: processed.subject,
        html: processed.content,
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

    // Log the email
    await logEmail({
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
    await logEmail({
      recipient: recipientEmail,
      subject: subject || 'Unknown',
      template: templateName,
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      variables,
    });
    
    throw error;
  }
};

export const sendBulkEmails = async (emails: SendEmailParams[]) => {
  console.log('Sending bulk emails:', emails.length);
  const results = [];
  
  for (const emailParams of emails) {
    try {
      const result = await sendSingleEmail(emailParams);
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
};
