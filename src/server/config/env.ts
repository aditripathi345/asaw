import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  
  // Supabase
  SUPABASE_URL: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  
  // Gemini AI
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  
  // Razorpay
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || '',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || '',
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET || '',
  
  // n8n Webhooks
  N8N_WEBHOOK_NEW_APPLICATION: process.env.N8N_WEBHOOK_NEW_APPLICATION || '',
  N8N_WEBHOOK_STATUS_CHANGED: process.env.N8N_WEBHOOK_STATUS_CHANGED || '',
  N8N_WEBHOOK_NEW_DOCUMENT: process.env.N8N_WEBHOOK_NEW_DOCUMENT || '',
  N8N_WEBHOOK_PAYMENT_COMPLETED: process.env.N8N_WEBHOOK_PAYMENT_COMPLETED || '',
  N8N_WEBHOOK_CONTACT_ENQUIRY: process.env.N8N_WEBHOOK_CONTACT_ENQUIRY || '',
  
  // SMTP
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_USER: process.env.SMTP_USER || 'asawconsultancy@gmail.com',
  SMTP_PASS: process.env.SMTP_PASS || '',
  SMTP_FROM: process.env.SMTP_FROM || 'ASAW Consultancy Services <asawconsultancy@gmail.com>',
};
