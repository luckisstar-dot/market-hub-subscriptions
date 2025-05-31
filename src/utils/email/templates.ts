
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
];
