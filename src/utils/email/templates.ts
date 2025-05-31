
import { EmailTemplate } from './types';

export const emailTemplates: EmailTemplate[] = [
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
    variables: { customer_name: '', order_id: '', total_amount: '0' },
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

export const getTemplate = (templateName: string): EmailTemplate | undefined => {
  return emailTemplates.find(t => t.name === templateName);
};

export const processTemplate = (template: EmailTemplate, variables: Record<string, any>) => {
  let processedSubject = template.subject;
  let processedContent = template.html_content;

  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    processedSubject = processedSubject.replace(new RegExp(placeholder, 'g'), String(value));
    processedContent = processedContent.replace(new RegExp(placeholder, 'g'), String(value));
  });

  return {
    subject: processedSubject,
    content: processedContent,
  };
};

export const createOrderConfirmationTemplate = (customerName: string, totalAmount: number, items: any[]) => {
  return {
    subject: 'Order Confirmation',
    html: `
      <h1>Thank you for your order, ${customerName}!</h1>
      <p>Your order total: $${totalAmount.toFixed(2)}</p>
      <h3>Items:</h3>
      <ul>
        ${items.map(item => `<li>${item.name} - Qty: ${item.quantity}</li>`).join('')}
      </ul>
    `,
    text: `Thank you for your order, ${customerName}! Your order total: $${totalAmount.toFixed(2)}`
  };
};
