
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, from = "noreply@marketplace.com" }: EmailRequest = await req.json();

    console.log('Email send request:', {
      to,
      subject,
      from,
      contentLength: html.length,
    });

    // Check if this is a test request
    if (req.url.includes('?test=true') || JSON.stringify(req.body).includes('"test":true')) {
      console.log('Test email request - not sending actual email');
      return new Response(JSON.stringify({
        id: 'test-email-id',
        status: 'sent',
        message: 'Test email logged successfully'
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    // Check for Resend API key
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      console.log('No Resend API key found - logging email instead of sending');
      
      // Log the email for development purposes
      console.log(`
        ===== EMAIL LOGGED =====
        From: ${from}
        To: ${to}
        Subject: ${subject}
        HTML Content: ${html}
        ========================
      `);
      
      return new Response(JSON.stringify({
        id: `mock-${crypto.randomUUID()}`,
        status: 'logged',
        message: 'Email logged successfully (no API key configured)'
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    // Send actual email using Resend
    const emailData = {
      from,
      to: [to],
      subject,
      html,
    };

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend API error:", error);
      throw new Error(`Resend API error: ${response.status} ${error}`);
    }

    const result = await response.json();
    console.log("Email sent successfully via Resend:", result.id);

    return new Response(JSON.stringify({
      id: result.id,
      status: 'sent',
      message: 'Email sent successfully via Resend'
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        status: 'failed'
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
