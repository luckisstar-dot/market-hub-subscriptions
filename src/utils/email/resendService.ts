
import { supabase } from '@/integrations/supabase/client';

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export const sendEmailViaResend = async (emailData: EmailData) => {
  try {
    console.log('Sending email via Resend:', emailData);

    const { data, error } = await supabase.functions.invoke('send-email', {
      body: emailData,
    });

    if (error) {
      console.error('Resend email error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

export const sendBulkEmailsViaResend = async (emails: EmailData[]) => {
  console.log('Sending bulk emails via Resend:', emails.length);
  const results = [];
  
  for (const emailData of emails) {
    try {
      const result = await sendEmailViaResend(emailData);
      results.push({ ...emailData, success: true, result });
    } catch (error) {
      results.push({ 
        ...emailData, 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }
  
  return results;
};
