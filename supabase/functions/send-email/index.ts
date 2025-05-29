
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  template: {
    subject: string;
    html_content: string;
  };
  recipientEmail: string;
  variables: Record<string, any>;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { template, recipientEmail, variables }: EmailRequest = await req.json();

    // Replace variables in template
    let subject = template.subject;
    let htmlContent = template.html_content;

    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      subject = subject.replace(new RegExp(placeholder, 'g'), String(value));
      htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), String(value));
    });

    // For now, we'll log the email instead of actually sending it
    // In production, you would integrate with a service like Resend, SendGrid, etc.
    console.log(`Email would be sent to: ${recipientEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${htmlContent}`);

    // Simulate successful sending
    const response = {
      id: crypto.randomUUID(),
      to: recipientEmail,
      subject,
      status: 'sent',
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
