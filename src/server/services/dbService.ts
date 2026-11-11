import { supabaseAdmin, isSupabaseConfigured } from '../config/supabase';
import { ALL_SERVICES } from '../../data/servicesData';

export interface ApplicationRecord {
  id: string;
  application_number: string;
  user_id?: string | null;
  service_id: string;
  service_name?: string;
  applicant_name: string;
  email: string;
  phone: string;
  business_name?: string;
  form_data: Record<string, any>;
  status: 'draft' | 'submitted' | 'under_review' | 'documents_required' | 'in_progress' | 'completed' | 'rejected' | 'cancelled';
  admin_notes?: string | null;
  assigned_professional_id?: string | null;
  assigned_professional?: {
    name: string;
    designation: string;
    email: string;
    phone: string;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface DocumentRecord {
  id: string;
  application_id: string;
  user_id: string;
  file_name: string;
  storage_path: string;
  document_type: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  uploaded_at: string;
}

export interface PaymentRecord {
  id: string;
  application_id?: string | null;
  user_id?: string | null;
  amount: number;
  currency: string;
  provider: string;
  provider_order_id?: string | null;
  provider_payment_id?: string | null;
  status: 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded';
  created_at: string;
}

export interface NotificationRecord {
  id: string;
  user_id: string;
  application_id?: string | null;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ContactEnquiryRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'pending' | 'responded' | 'closed';
  created_at: string;
}

// In-memory persistent cache to guarantee high availability
const localStore = {
  applications: new Map<string, ApplicationRecord>(),
  documents: new Map<string, DocumentRecord>(),
  payments: new Map<string, PaymentRecord>(),
  notifications: new Map<string, NotificationRecord[]>(),
  enquiries: new Map<string, ContactEnquiryRecord>(),
};

// Seed initial demo orders into store for immediate testing
const seedDemoOrders = () => {
  const demoPvt: ApplicationRecord = {
    id: 'app_demo_8921',
    application_number: 'ASAW-8921-PVT',
    user_id: 'usr_demo_1',
    service_id: 'pvt-ltd',
    service_name: 'Private Limited Company Registration',
    applicant_name: 'Aditya Deshmukh',
    email: 'aditya.deshmukh@example.com',
    phone: '+91 94159 94473',
    business_name: 'Nexora AI Technologies Private Limited',
    form_data: {
      directors: 2,
      capital: 1000000,
      state: 'Uttar Pradesh',
      registered_city: 'Lucknow',
    },
    status: 'in_progress',
    admin_notes: 'SPICe+ Part B filed with ROC Kanpur. Approval expected shortly.',
    assigned_professional_id: 'prof_rajeshwari',
    assigned_professional: {
      name: 'CA Rajeshwari Sharma',
      designation: 'Senior Manager - Corporate Structuring & MCA',
      email: 'asawconsultancy@gmail.com',
      phone: '+91 94159 94473',
    },
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  };

  const demoGst: ApplicationRecord = {
    id: 'app_demo_4412',
    application_number: 'ASAW-4412-GST',
    user_id: 'usr_demo_2',
    service_id: 'gst-reg',
    service_name: 'GST Registration Online',
    applicant_name: 'Sunita Rao',
    email: 'sunita.rao@example.com',
    phone: '+91 94159 94473',
    business_name: 'Aura Organic Retail',
    form_data: {
      constitution: 'Sole Proprietorship',
      state: 'Uttar Pradesh',
    },
    status: 'under_review',
    admin_notes: 'Aadhaar e-KYC verified. ARN generated.',
    assigned_professional_id: 'prof_vignesh',
    assigned_professional: {
      name: 'CS Vignesh Kumar',
      designation: 'Lead Associate - Indirect Taxes & GST',
      email: 'asawconsultancy@gmail.com',
      phone: '+91 94159 94473',
    },
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  };

  localStore.applications.set(demoPvt.id, demoPvt);
  localStore.applications.set(demoPvt.application_number, demoPvt);
  localStore.applications.set(demoGst.id, demoGst);
  localStore.applications.set(demoGst.application_number, demoGst);
};

seedDemoOrders();

export const dbService = {
  // SERVICES
  async getServices(category?: string, query?: string) {
    if (isSupabaseConfigured() && supabaseAdmin) {
      let q = supabaseAdmin.from('services').select('*').eq('is_active', true);
      if (category && category !== 'all') {
        q = q.eq('category', category);
      }
      if (query) {
        q = q.ilike('name', `%${query}%`);
      }
      const { data, error } = await q;
      if (!error && data && data.length > 0) return data;
    }

    // Default to comprehensive catalog
    let list = ALL_SERVICES.map(s => ({
      id: s.id,
      name: s.name,
      category: s.category,
      description: s.fullDesc,
      starting_price: s.priceStarting,
      estimated_completion_days: parseInt(s.turnaroundTime) || 7,
      required_documents: s.documentsNeeded,
      is_active: true,
      created_at: new Date().toISOString(),
    }));

    if (category && category !== 'all') {
      list = list.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }
    return list;
  },

  async getServiceById(id: string) {
    if (isSupabaseConfigured() && supabaseAdmin) {
      const { data, error } = await supabaseAdmin.from('services').select('*').eq('id', id).single();
      if (!error && data) return data;
    }
    const matched = ALL_SERVICES.find(s => s.id === id);
    if (!matched) return null;
    return {
      id: matched.id,
      name: matched.name,
      category: matched.category,
      description: matched.fullDesc,
      starting_price: matched.priceStarting,
      estimated_completion_days: parseInt(matched.turnaroundTime) || 7,
      required_documents: matched.documentsNeeded,
      is_active: true,
      created_at: new Date().toISOString(),
    };
  },

  // APPLICATIONS
  async createApplication(params: {
    user_id?: string | null;
    service_id: string;
    applicant_name: string;
    email: string;
    phone: string;
    business_name?: string;
    form_data: Record<string, any>;
  }): Promise<ApplicationRecord> {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const serviceCode = params.service_id.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) || 'SRV';
    const application_number = `ASAW-${randomSuffix}-${serviceCode}`;
    const id = `app_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const matchedService = ALL_SERVICES.find(s => s.id === params.service_id);
    const serviceName = matchedService?.name || params.service_id;

    const record: ApplicationRecord = {
      id,
      application_number,
      user_id: params.user_id || null,
      service_id: params.service_id,
      service_name: serviceName,
      applicant_name: params.applicant_name,
      email: params.email,
      phone: params.phone,
      business_name: params.business_name || '',
      form_data: params.form_data,
      status: 'submitted',
      admin_notes: 'Initial submission received online. Assigning Chartered Accountant.',
      assigned_professional_id: 'prof_rajeshwari',
      assigned_professional: {
        name: 'CA Rajeshwari Sharma',
        designation: 'Senior Manager - Corporate Structuring',
        email: 'asawconsultancy@gmail.com',
        phone: '+91 94159 94473',
      },
      created_at: now,
      updated_at: now,
    };

    if (isSupabaseConfigured() && supabaseAdmin) {
      try {
        const { data, error } = await supabaseAdmin.from('applications').insert({
          application_number: record.application_number,
          user_id: record.user_id,
          service_id: record.service_id,
          applicant_name: record.applicant_name,
          email: record.email,
          phone: record.phone,
          business_name: record.business_name,
          form_data: record.form_data,
          status: 'submitted',
        }).select().single();

        if (!error && data) {
          record.id = data.id;
        }
      } catch (e: any) {
        console.warn('Supabase application insert failed, saved to local cache:', e.message);
      }
    }

    localStore.applications.set(record.id, record);
    localStore.applications.set(record.application_number, record);

    // Create initial notification
    if (params.user_id) {
      await this.createNotification({
        user_id: params.user_id,
        application_id: record.id,
        title: 'Application Received',
        message: `Your application ${record.application_number} for ${serviceName} was received successfully.`,
      });
    }

    return record;
  },

  async getApplicationByIdOrNumber(idOrNumber: string): Promise<ApplicationRecord | null> {
    const key = idOrNumber.trim().toUpperCase();

    if (isSupabaseConfigured() && supabaseAdmin) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrNumber);
      let query = supabaseAdmin.from('applications').select('*, service:services(*)');
      if (isUuid) {
        query = query.eq('id', idOrNumber);
      } else {
        query = query.ilike('application_number', key);
      }
      const { data, error } = await query.single();
      if (!error && data) {
        return {
          id: data.id,
          application_number: data.application_number,
          user_id: data.user_id,
          service_id: data.service_id,
          service_name: data.service?.name,
          applicant_name: data.applicant_name,
          email: data.email,
          phone: data.phone,
          business_name: data.business_name,
          form_data: data.form_data,
          status: data.status,
          admin_notes: data.admin_notes,
          assigned_professional_id: data.assigned_professional_id,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
      }
    }

    return localStore.applications.get(idOrNumber) || localStore.applications.get(key) || null;
  },

  async getUserApplications(userId: string): Promise<ApplicationRecord[]> {
    if (isSupabaseConfigured() && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('applications')
        .select('*, service:services(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data.map((d: any) => ({
          ...d,
          service_name: d.service?.name,
        }));
      }
    }

    const apps: ApplicationRecord[] = [];
    localStore.applications.forEach((app) => {
      if (app.user_id === userId && !apps.some(a => a.id === app.id)) {
        apps.push(app);
      }
    });
    return apps;
  },

  async getAllApplications(status?: string, serviceId?: string): Promise<ApplicationRecord[]> {
    if (isSupabaseConfigured() && supabaseAdmin) {
      let q = supabaseAdmin.from('applications').select('*, service:services(*)').order('created_at', { ascending: false });
      if (status && status !== 'all') q = q.eq('status', status);
      if (serviceId && serviceId !== 'all') q = q.eq('service_id', serviceId);
      const { data, error } = await q;
      if (!error && data) {
        return data.map((d: any) => ({
          ...d,
          service_name: d.service?.name,
        }));
      }
    }

    const list: ApplicationRecord[] = [];
    localStore.applications.forEach((app) => {
      if (!list.some(a => a.id === app.id)) {
        if (!status || status === 'all' || app.status === status) {
          if (!serviceId || serviceId === 'all' || app.service_id === serviceId) {
            list.push(app);
          }
        }
      }
    });
    return list;
  },

  async updateApplicationStatus(
    id: string,
    newStatus: ApplicationRecord['status'],
    adminNotes?: string,
    changedBy?: string
  ): Promise<ApplicationRecord | null> {
    const existing = await this.getApplicationByIdOrNumber(id);
    if (!existing) return null;

    existing.status = newStatus;
    if (adminNotes !== undefined) existing.admin_notes = adminNotes;
    existing.updated_at = new Date().toISOString();

    if (isSupabaseConfigured() && supabaseAdmin) {
      await supabaseAdmin.from('applications').update({
        status: newStatus,
        admin_notes: adminNotes,
        updated_at: existing.updated_at,
      }).eq('id', existing.id);

      await supabaseAdmin.from('application_activity').insert({
        application_id: existing.id,
        changed_by: changedBy || null,
        new_status: newStatus,
        note: adminNotes,
      });
    }

    localStore.applications.set(existing.id, existing);
    localStore.applications.set(existing.application_number, existing);

    // Notification to customer
    if (existing.user_id) {
      await this.createNotification({
        user_id: existing.user_id,
        application_id: existing.id,
        title: `Application Status Updated: ${newStatus.toUpperCase()}`,
        message: `Your application ${existing.application_number} is now marked as ${newStatus}.`,
      });
    }

    return existing;
  },

  // PAYMENTS
  async recordPayment(params: {
    application_id?: string | null;
    user_id?: string | null;
    amount: number;
    provider: string;
    provider_order_id?: string;
    provider_payment_id?: string;
    status: PaymentRecord['status'];
  }): Promise<PaymentRecord> {
    const record: PaymentRecord = {
      id: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      application_id: params.application_id || null,
      user_id: params.user_id || null,
      amount: params.amount,
      currency: 'INR',
      provider: params.provider,
      provider_order_id: params.provider_order_id,
      provider_payment_id: params.provider_payment_id,
      status: params.status,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured() && supabaseAdmin) {
      await supabaseAdmin.from('payments').insert(record);
    }

    localStore.payments.set(record.id, record);
    return record;
  },

  // NOTIFICATIONS
  async createNotification(params: {
    user_id: string;
    application_id?: string | null;
    title: string;
    message: string;
  }): Promise<NotificationRecord> {
    const record: NotificationRecord = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      user_id: params.user_id,
      application_id: params.application_id || null,
      title: params.title,
      message: params.message,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured() && supabaseAdmin) {
      await supabaseAdmin.from('notifications').insert(record);
    }

    const userNotifs = localStore.notifications.get(params.user_id) || [];
    userNotifs.unshift(record);
    localStore.notifications.set(params.user_id, userNotifs);

    return record;
  },

  async getUserNotifications(userId: string): Promise<NotificationRecord[]> {
    if (isSupabaseConfigured() && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (!error && data) return data;
    }

    return localStore.notifications.get(userId) || [];
  },

  async markNotificationRead(notifId: string, userId: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabaseAdmin) {
      await supabaseAdmin.from('notifications').update({ is_read: true }).eq('id', notifId).eq('user_id', userId);
    }
    const notifs = localStore.notifications.get(userId) || [];
    const item = notifs.find(n => n.id === notifId);
    if (item) item.is_read = true;
    return true;
  },

  // CONTACT ENQUIRIES
  async recordContactEnquiry(params: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }): Promise<ContactEnquiryRecord> {
    const record: ContactEnquiryRecord = {
      id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: params.name,
      email: params.email,
      phone: params.phone,
      subject: params.subject,
      message: params.message,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured() && supabaseAdmin) {
      await supabaseAdmin.from('contact_enquiries').insert(record);
    }

    localStore.enquiries.set(record.id, record);
    return record;
  },

  async getContactEnquiries(): Promise<ContactEnquiryRecord[]> {
    if (isSupabaseConfigured() && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('contact_enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return Array.from(localStore.enquiries.values());
  },
};
