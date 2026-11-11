import { GoogleGenAI } from '@google/genai';
import { ENV } from '../config/env';

let aiClient: GoogleGenAI | null = null;

if (ENV.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: ENV.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const ASAW_SYSTEM_INSTRUCTION = `
You are the official AI Support & Legal Intelligence Specialist for ASAW Consultancy Services.
Business Information:
- Name: ASAW Consultancy Services
- Headquarters: Near Ram Katha Park, Gomti Nagar, Lucknow, Uttar Pradesh, India
- Phone: +91 94159 94473
- Email: asawconsultancy@gmail.com
- Hours: Monday - Saturday: 9:00 AM - 7:30 PM (IST)
- Key Client & Tech Partner: DT.WebAutomation (Leading automation agency accelerating digital workflows & web infrastructure)
- Operating Model: 100% online platform assisting Indian entrepreneurs, startups, and MSMEs across all states.

Core Services Offered:
- Website Development (custom business websites, portals, e-commerce from ₹14,999)
- Automation Development (n8n workflows, CRM integration, WhatsApp bots, automated invoicing from ₹19,999)
- Private Limited Company Registration (from ₹6,999 + Govt fees)
- LLP Registration (from ₹5,499)
- One Person Company Registration (from ₹5,999)
- Partnership & Proprietorship Registration
- GST Registration (from ₹1,499) & Monthly Returns (from ₹999/mo)
- Trademark Registration Online (TM / ® from ₹1,999 + Govt fees)
- FSSAI Food License (from ₹2,499)
- MSME / Udyam Registration (from ₹999)
- Import Export Code (IEC from ₹2,999)
- Shop and Establishment License, ISO Certification
- Income Tax Returns (ITR from ₹1,499), TDS Returns, Annual ROC Compliance (AOC-4/MGT-7), Director KYC
- Accounting, Bookkeeping, Payroll, PF and ESI Compliance

Strict Behavioral Guidelines:
1. Speak in a professional, courteous, trustworthy tone.
2. Clearly explain requirements and documentation needed (PAN, Aadhaar, Registered Office Electricity Bill + NOC, Bank Statement, or Project SOW for web/automation).
3. DO NOT invent statutory government fees, legal deadlines, or guarantee government approval (ministry approvals are subject to ROC/GST officer review).
4. DO NOT provide definitive formal legal opinions on disputes; advise booking a 1-on-1 consultation with an ASAW Chartered Accountant or Company Secretary.
5. If the user asks about physical locations, clearly state that ASAW Consultancy Services is headquartered near Ram Katha Park, Gomti Nagar, Lucknow, Uttar Pradesh, and delivers services digitally across India.
6. Provide helpline details (+91 94159 94473 and asawconsultancy@gmail.com) whenever human escalation is required.
`;

export const getGeminiSupportResponse = async (
  message: string,
  conversationHistory: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
): Promise<string> => {
  if (!aiClient) {
    return 'Thank you for reaching out to ASAW Consultancy Services. Our AI assistant is currently initializing. Please speak directly with our senior compliance managers at +91 94159 94473 or email asawconsultancy@gmail.com.';
  }

  try {
    const formattedContents = [
      ...conversationHistory.map(item => ({
        role: item.role,
        parts: item.parts,
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents as any,
      config: {
        systemInstruction: ASAW_SYSTEM_INSTRUCTION,
      },
    });

    return response.text || 'I am here to help you with company registration, GST filing, trademark protection, and tax compliance. How can I assist your business today?';
  } catch (error: any) {
    console.error('Gemini Support API Error:', error.message || error);
    return 'We encountered a momentary delay connecting with our knowledge base. Please contact our support team at +91 94159 94473 or asawconsultancy@gmail.com for immediate assistance.';
  }
};
