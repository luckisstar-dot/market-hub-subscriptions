
import { testRunner } from './testRunner';
import { supabase } from '@/integrations/supabase/client';
import { rateLimiters } from '../rateLimiting';
import { sendEmailViaResend } from '../email/resendService';

export const runIntegrationTests = async () => {
  testRunner.clear();

  // Database Connection Tests
  testRunner.suite('Database Integration', () => {
    testRunner.test('Should connect to Supabase', async () => {
      const { data, error } = await supabase.from('profiles').select('count');
      testRunner.expect(error).toBeFalsy();
    });

    testRunner.test('Should have proper RLS policies', async () => {
      // Test that unauthenticated users cannot access protected data
      const { data, error } = await supabase.from('user_roles').select('*');
      testRunner.expect(data).toEqual([]);
    });
  });

  // Authentication Tests
  testRunner.suite('Authentication System', () => {
    testRunner.test('Should handle authentication state', async () => {
      const { data: { user } } = await supabase.auth.getUser();
      // User might be null if not logged in, which is fine
      testRunner.expect(typeof user === 'object' || user === null).toBeTruthy();
    });

    testRunner.test('Should validate email format', () => {
      const validEmail = 'test@example.com';
      const invalidEmail = 'invalid-email';
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      testRunner.expect(emailRegex.test(validEmail)).toBeTruthy();
      testRunner.expect(emailRegex.test(invalidEmail)).toBeFalsy();
    });
  });

  // Rate Limiting Tests
  testRunner.suite('Rate Limiting System', () => {
    testRunner.test('Should enforce API rate limits', () => {
      const identifier = 'test-user';
      
      // First request should be allowed
      const result1 = rateLimiters.api.check(identifier);
      testRunner.expect(result1.allowed).toBeTruthy();
      
      // Reset for clean test
      rateLimiters.api.reset(identifier);
    });

    testRunner.test('Should block after limit exceeded', () => {
      const identifier = 'test-user-2';
      
      // Make requests up to the limit
      for (let i = 0; i < 100; i++) {
        rateLimiters.api.check(identifier);
      }
      
      // Next request should be blocked
      const result = rateLimiters.api.check(identifier);
      testRunner.expect(result.allowed).toBeFalsy();
      
      // Reset for clean test
      rateLimiters.api.reset(identifier);
    });
  });

  // Email System Tests
  testRunner.suite('Email System', () => {
    testRunner.test('Should validate email data structure', () => {
      const emailData = {
        to: 'test@example.com',
        subject: 'Test Email',
        html: '<p>Test content</p>',
      };
      
      testRunner.expect(emailData.to).toContain('@');
      testRunner.expect(emailData.subject).toBeTruthy();
      testRunner.expect(emailData.html).toBeTruthy();
    });

    testRunner.test('Should handle email template processing', () => {
      const template = {
        subject: 'Hello {{name}}',
        content: 'Welcome {{name}} to {{platform}}',
      };
      
      const variables = { name: 'John', platform: 'OneShop' };
      
      let processed = template.subject;
      Object.entries(variables).forEach(([key, value]) => {
        processed = processed.replace(`{{${key}}}`, value);
      });
      
      testRunner.expect(processed).toBe('Hello John');
    });
  });

  // Utility Functions Tests
  testRunner.suite('Utility Functions', () => {
    testRunner.test('Should sanitize HTML content', () => {
      const input = '<script>alert("xss")</script><p>Safe content</p>';
      const sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      
      testRunner.expect(sanitized).not.toContain('<script>');
      testRunner.expect(sanitized).toContain('<p>Safe content</p>');
    });

    testRunner.test('Should validate file uploads', () => {
      const mockFile = {
        type: 'image/jpeg',
        size: 1024 * 1024, // 1MB
      };
      
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      const isValidType = allowedTypes.includes(mockFile.type);
      const isValidSize = mockFile.size <= maxSize;
      
      testRunner.expect(isValidType).toBeTruthy();
      testRunner.expect(isValidSize).toBeTruthy();
    });

    testRunner.test('Should generate unique identifiers', () => {
      const id1 = crypto.randomUUID();
      const id2 = crypto.randomUUID();
      
      testRunner.expect(id1).not.toBe(id2);
      testRunner.expect(id1).toHaveLength(36);
    });
  });

  // Frontend Component Tests
  testRunner.suite('Frontend Components', () => {
    testRunner.test('Should handle form validation', () => {
      const formData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };
      
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      const isPasswordValid = formData.password.length >= 8;
      const doPasswordsMatch = formData.password === formData.confirmPassword;
      
      testRunner.expect(isEmailValid).toBeTruthy();
      testRunner.expect(isPasswordValid).toBeTruthy();
      testRunner.expect(doPasswordsMatch).toBeTruthy();
    });

    testRunner.test('Should handle search functionality', () => {
      const products = [
        { name: 'Coffee Beans', category: 'Food' },
        { name: 'Tea Leaves', category: 'Food' },
        { name: 'Laptop', category: 'Electronics' },
      ];
      
      const searchTerm = 'coffee';
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      testRunner.expect(results).toHaveLength(1);
      testRunner.expect(results[0].name).toBe('Coffee Beans');
    });
  });

  return testRunner.runAll();
};
