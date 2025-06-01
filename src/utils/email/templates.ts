
export interface EmailTemplate {
  name: string;
  subject: string;
  html_content: string;
  variables: Record<string, any>;
}

export const emailTemplates: EmailTemplate[] = [
  {
    name: 'order_confirmation',
    subject: 'Order Confirmation - {{order_id}}',
    html_content: `
      <h1>Order Confirmation</h1>
      <p>Dear {{customer_name}},</p>
      <p>Your order {{order_id}} has been confirmed.</p>
      <p>Total Amount: ${{total_amount}}</p>
      <p>Thank you for your purchase!</p>
    `,
    variables: { 
      order_id: '', 
      customer_name: '', 
      total_amount: ''
    },
  },
  {
    name: 'order_status_update',
    subject: 'Order Status Update - {{order_id}}',
    html_content: `
      <h1>Order Status Update</h1>
      <p>Your order {{order_id}} status has been updated to: {{status}}</p>
    `,
    variables: { 
      order_id: '', 
      status: '' 
    },
  },
  {
    name: 'vendor_approval',
    subject: 'Vendor Account Approved',
    html_content: `
      <h1>Welcome to OneShop Centrale!</h1>
      <p>Dear {{vendor_name}},</p>
      <p>Your vendor account has been approved. You can now start selling on our platform.</p>
    `,
    variables: { 
      vendor_name: '' 
    },
  },
  {
    name: 'password_reset',
    subject: 'Reset Your Password - OneShop Centrale',
    html_content: `
      <h1>Password Reset Request</h1>
      <p>Dear {{user_name}},</p>
      <p>We received a request to reset your password. Click the link below to reset it:</p>
      <p><a href="{{reset_url}}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this password reset, please ignore this email.</p>
    `,
    variables: { 
      user_name: '', 
      reset_url: '' 
    },
  },
  {
    name: 'role_change_notification',
    subject: 'Your Account Role Has Been Updated - OneShop Centrale',
    html_content: `
      <h1>Account Role Update</h1>
      <p>Dear {{user_name}},</p>
      <p>Your account role has been updated to: <strong>{{new_role}}</strong></p>
      <p>This change was made on {{change_date}}.</p>
      <p>If you have any questions about this change, please contact our support team.</p>
    `,
    variables: { 
      user_name: '', 
      new_role: '',
      change_date: ''
    },
  },
  {
    name: 'welcome_email',
    subject: 'Welcome to OneShop Centrale - {{user_name}}',
    html_content: `
      <h1>Welcome to OneShop Centrale!</h1>
      <p>Dear {{user_name}},</p>
      <p>Thank you for joining OneShop Centrale! Your {{user_type}} account has been created successfully.</p>
      <p>You're currently on the {{plan_name}} plan.</p>
      <p>Get started by exploring our platform and discovering what OneShop Centrale has to offer.</p>
      <p>If you have any questions, feel free to contact our support team.</p>
    `,
    variables: { 
      user_name: '', 
      user_type: '',
      plan_name: ''
    },
  },
];

export const getTemplate = (name: string): EmailTemplate | undefined => {
  return emailTemplates.find(template => template.name === name);
};

export const processTemplate = (template: EmailTemplate, variables: Record<string, any>) => {
  let subject = template.subject;
  let content = template.html_content;

  // Replace variables in subject and content
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    subject = subject.replace(new RegExp(placeholder, 'g'), String(value));
    content = content.replace(new RegExp(placeholder, 'g'), String(value));
  });

  return {
    subject,
    content,
  };
};
