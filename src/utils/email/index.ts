
import { SendEmailParams } from './types';
import { sendSingleEmail, sendBulkEmails } from './sender';
import { emailTemplates, getTemplate } from './templates';
import { getEmailLogs } from './logger';

export const enhancedEmailService = {
  // Send email with template or direct content
  sendEmail: sendSingleEmail,

  // Get available templates
  getTemplates: async () => {
    console.log('Getting email templates');
    return emailTemplates;
  },

  // Get email logs
  getEmailLogs,

  // Send bulk emails
  sendBulkEmails,
};

// Export types and utilities
export * from './types';
export { getTemplate, emailTemplates } from './templates';
export { logEmail, getEmailLogs } from './logger';
export { sendSingleEmail, sendBulkEmails } from './sender';
