
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Mail } from 'lucide-react';

interface EmailData {
  to: string;
  subject: string;
  content: string;
  template?: string;
}

const EmailService = () => {
  const [emailData, setEmailData] = useState<EmailData>({
    to: '',
    subject: '',
    content: '',
  });
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const sendEmail = async () => {
    if (!emailData.to || !emailData.subject || !emailData.content) {
      setError('Please fill in all fields');
      return;
    }

    setSending(true);
    setError('');
    setMessage('');

    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: emailData.to,
          subject: emailData.subject,
          html: emailData.content,
        },
      });

      if (error) throw error;

      setMessage('Email sent successfully!');
      setEmailData({ to: '', subject: '', content: '' });
    } catch (err: any) {
      setError(`Failed to send email: ${err.message}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Service
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <Input
            type="email"
            placeholder="recipient@example.com"
            value={emailData.to}
            onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <Input
            placeholder="Email subject"
            value={emailData.subject}
            onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <Textarea
            placeholder="Email content..."
            value={emailData.content}
            onChange={(e) => setEmailData({ ...emailData, content: e.target.value })}
            rows={6}
          />
        </div>

        <Button onClick={sendEmail} disabled={sending} className="w-full">
          {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Email
        </Button>

        {message && (
          <Alert>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailService;
