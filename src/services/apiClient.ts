import { supabase } from '../lib/supabase';

// Helper to retrieve auth token if user is signed in
const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (supabase) {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
      return headers;
    }
  }

  // Check localStorage for active session token or demo token
  const storedToken = localStorage.getItem('asaw_auth_token');
  if (storedToken) {
    headers['Authorization'] = `Bearer ${storedToken}`;
  }

  return headers;
};

export const api = {
  // Services
  async getServices(category?: string, query?: string) {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (query) params.append('q', query);
    const res = await fetch(`/api/services?${params.toString()}`);
    return res.json();
  },

  async getService(id: string) {
    const res = await fetch(`/api/services/${id}`);
    return res.json();
  },

  // Applications
  async submitApplication(data: {
    service_id: string;
    applicant_name: string;
    email: string;
    phone: string;
    business_name?: string;
    form_data?: Record<string, any>;
  }) {
    const headers = await getAuthHeaders();
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getMyApplications() {
    const headers = await getAuthHeaders();
    const res = await fetch('/api/applications', { headers });
    return res.json();
  },

  async trackApplication(idOrNumber: string) {
    const res = await fetch(`/api/applications/${encodeURIComponent(idOrNumber)}`);
    return res.json();
  },

  // Documents
  async uploadDocument(applicationId: string, file: File, documentType: string) {
    const formData = new FormData();
    formData.append('application_id', applicationId);
    formData.append('document_type', documentType);
    formData.append('file', file);

    const headers: Record<string, string> = {};
    const authHeaders = await getAuthHeaders();
    if (authHeaders['Authorization']) {
      headers['Authorization'] = authHeaders['Authorization'];
    }

    const res = await fetch('/api/documents/upload', {
      method: 'POST',
      headers,
      body: formData,
    });
    return res.json();
  },

  // Payments
  async createPaymentOrder(applicationId: string, amount: number, serviceId?: string) {
    const headers = await getAuthHeaders();
    const res = await fetch('/api/payments/create-order', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        application_id: applicationId,
        amount,
        service_id: serviceId,
      }),
    });
    return res.json();
  },

  async verifyPayment(paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature?: string;
    application_id?: string;
    amount?: number;
  }) {
    const headers = await getAuthHeaders();
    const res = await fetch('/api/payments/verify', {
      method: 'POST',
      headers,
      body: JSON.stringify(paymentData),
    });
    return res.json();
  },

  // AI Assistant (Gemini)
  async askAiSupport(message: string, history?: { role: 'user' | 'model'; parts: { text: string }[] }[]) {
    const res = await fetch('/api/ai/support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });
    return res.json();
  },

  // Contact & Consultations
  async submitContact(data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async scheduleConsultation(data: {
    full_name: string;
    phone: string;
    email?: string;
    topic?: string;
    preferred_slot?: string;
    preferred_mode?: string;
  }) {
    const res = await fetch('/api/consultations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Admin Controls
  async getAdminDashboard() {
    const headers = await getAuthHeaders();
    const res = await fetch('/api/admin/dashboard', { headers });
    return res.json();
  },

  async getAdminApplications(status?: string, serviceId?: string) {
    const headers = await getAuthHeaders();
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (serviceId) params.append('service_id', serviceId);
    const res = await fetch(`/api/admin/applications?${params.toString()}`, { headers });
    return res.json();
  },

  async updateAdminStatus(id: string, status: string, adminNotes?: string) {
    const headers = await getAuthHeaders();
    const res = await fetch(`/api/admin/applications/${id}/status`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ status, admin_notes: adminNotes }),
    });
    return res.json();
  },
};
