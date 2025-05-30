
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

export interface EmailLogData {
  recipient: string;
  subject: string;
  template?: string;
  status: 'sent' | 'failed' | 'pending';
  error?: string;
  variables?: Record<string, any>;
}

export interface EmailLog extends EmailLogData {
  id: string;
  created_at: string;
}
