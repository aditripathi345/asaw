import { Router, Request, Response } from 'express';
import multer from 'multer';
import { requireAuth, optionalAuth, requireRole } from '../middleware/auth';
import { dbService } from '../services/dbService';
import { getGeminiSupportResponse } from '../services/geminiService';
import { 
  createRazorpayOrder, 
  verifyRazorpayPaymentSignature, 
  verifyRazorpayWebhookSignature 
} from '../services/razorpayService';
import { triggerN8NWebhook } from '../services/n8nService';
import { supabaseAdmin, isSupabaseConfigured } from '../config/supabase';

export const apiRouter = Router();

// Configure Multer for document uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format. Supported formats are PDF, JPG, JPEG, and PNG.'));
    }
  },
});

// ====================================================================
// 1. HEALTH & SYSTEM STATUS
// ====================================================================
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    platform: 'ASAW Consultancy Services API',
    headquarters: 'Near Ram Katha Park, Gomti Nagar, Lucknow, Uttar Pradesh, India',
    supabase_connected: isSupabaseConfigured(),
    timestamp: new Date().toISOString(),
  });
});

// ====================================================================
// 2. SERVICES CATALOGUE
// ====================================================================
apiRouter.get('/services', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined;
    const query = req.query.q as string | undefined;
    const services = await dbService.getServices(category, query);
    res.json({ success: true, count: services.length, data: services });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch services: ' + error.message });
  }
});

apiRouter.get('/services/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await dbService.getServiceById(req.params.id);
    if (!service) {
      res.status(404).json({ success: false, error: 'Service not found.' });
      return;
    }
    res.json({ success: true, data: service });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch service details: ' + error.message });
  }
});

// ====================================================================
// 3. USER PROFILE (Protected)
// ====================================================================
apiRouter.get('/profile', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    if (isSupabaseConfigured() && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        res.json({ success: true, data });
        return;
      }
    }

    res.json({
      success: true,
      data: {
        id: userId,
        email: req.user!.email,
        full_name: req.user!.full_name,
        role: req.user!.role,
        phone: req.user!.phone || '+91 94159 94473',
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch profile: ' + error.message });
  }
});

apiRouter.patch('/profile', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { full_name, phone } = req.body;

    // Never allow updating role via public profile endpoint
    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (full_name) updates.full_name = full_name;
    if (phone) updates.phone = phone;

    if (isSupabaseConfigured() && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      res.json({ success: true, data });
      return;
    }

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      data: { id: userId, email: req.user!.email, ...updates, role: req.user!.role },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to update profile: ' + error.message });
  }
});

// ====================================================================
// 4. APPLICATIONS (Submit, Track, History)
// ====================================================================
apiRouter.post('/applications', optionalAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { service_id, applicant_name, email, phone, business_name, form_data } = req.body;

    if (!service_id || !applicant_name || !email || !phone) {
      res.status(400).json({
        success: false,
        error: 'Missing required application fields: service_id, applicant_name, email, and phone are mandatory.',
      });
      return;
    }

    const application = await dbService.createApplication({
      user_id: req.user?.id || null,
      service_id,
      applicant_name,
      email,
      phone,
      business_name,
      form_data: form_data || {},
    });

    // Trigger n8n Automation Webhook
    triggerN8NWebhook('new_application', {
      application_number: application.application_number,
      service_id: application.service_id,
      service_name: application.service_name,
      applicant_name: application.applicant_name,
      email: application.email,
      phone: application.phone,
      business_name: application.business_name,
      created_at: application.created_at,
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully. Our compliance manager will review your submission within 15 minutes.',
      data: application,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Application creation failed: ' + error.message });
  }
});

apiRouter.get('/applications', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const applications = await dbService.getUserApplications(userId);
    res.json({ success: true, count: applications.length, data: applications });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch user applications: ' + error.message });
  }
});

apiRouter.get('/applications/:idOrNumber', async (req: Request, res: Response): Promise<void> => {
  try {
    const application = await dbService.getApplicationByIdOrNumber(req.params.idOrNumber);
    if (!application) {
      res.status(404).json({
        success: false,
        error: `Application with ID or number "${req.params.idOrNumber}" was not found. Please verify the reference sent to your registered email/SMS.`,
      });
      return;
    }
    res.json({ success: true, data: application });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch application: ' + error.message });
  }
});

// ====================================================================
// 5. SECURE DOCUMENT MANAGEMENT
// ====================================================================
apiRouter.post('/documents/upload', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'No document file uploaded.' });
      return;
    }

    const application_id = req.body.application_id || 'app_general';
    const document_type = req.body.document_type || 'Identity / Registration Document';
    const originalName = req.file.originalname;
    const fileExt = originalName.split('.').pop();
    const storagePath = `applications/${application_id}/${Date.now()}_${Math.random().toString(36).substring(2, 6)}.${fileExt}`;

    let signedDownloadUrl = `/api/documents/download-stream?path=${encodeURIComponent(storagePath)}&name=${encodeURIComponent(originalName)}`;

    // Upload to Supabase Storage private bucket 'asaw-documents' if configured
    if (isSupabaseConfigured() && supabaseAdmin) {
      const { data: uploadData, error: uploadErr } = await supabaseAdmin.storage
        .from('asaw-documents')
        .upload(storagePath, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (!uploadErr && uploadData) {
        // Generate a 1-hour signed URL
        const { data: signedData } = await supabaseAdmin.storage
          .from('asaw-documents')
          .createSignedUrl(storagePath, 3600);

        if (signedData?.signedUrl) {
          signedDownloadUrl = signedData.signedUrl;
        }
      }
    }

    // Trigger n8n Webhook for document upload
    triggerN8NWebhook('new_document', {
      application_id,
      file_name: originalName,
      document_type,
      storage_path: storagePath,
      uploaded_at: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: 'Document uploaded securely and queued for compliance verification.',
      data: {
        file_name: originalName,
        storage_path: storagePath,
        document_type,
        verification_status: 'pending',
        download_url: signedDownloadUrl,
        size_bytes: req.file.size,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Document upload failed: ' + error.message });
  }
});

// ====================================================================
// 6. RAZORPAY PAYMENTS
// ====================================================================
apiRouter.post('/payments/create-order', async (req: Request, res: Response): Promise<void> => {
  try {
    const { application_id, amount, service_id } = req.body;

    if (!amount || amount <= 0) {
      res.status(400).json({ success: false, error: 'Invalid payment amount specified.' });
      return;
    }

    const receipt = `rcpt_${application_id || 'init'}_${Date.now()}`;
    const order = await createRazorpayOrder(amount, receipt, {
      application_id: application_id || '',
      service_id: service_id || '',
    });

    await dbService.recordPayment({
      application_id: application_id || null,
      amount,
      provider: 'razorpay',
      provider_order_id: order.id,
      status: 'pending',
    });

    res.json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to create payment order: ' + error.message });
  }
});

apiRouter.post('/payments/verify', async (req: Request, res: Response): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, application_id, amount } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      res.status(400).json({ success: false, error: 'Missing Razorpay order or payment parameters.' });
      return;
    }

    const isValid = verifyRazorpayPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature || ''
    );

    if (!isValid) {
      res.status(400).json({ success: false, error: 'Payment signature verification failed.' });
      return;
    }

    await dbService.recordPayment({
      application_id: application_id || null,
      amount: amount || 0,
      provider: 'razorpay',
      provider_order_id: razorpay_order_id,
      provider_payment_id: razorpay_payment_id,
      status: 'captured',
    });

    // Update application status if provided
    if (application_id) {
      await dbService.updateApplicationStatus(application_id, 'in_progress', 'Payment verified successfully.');
    }

    // Trigger n8n Webhook
    triggerN8NWebhook('payment_completed', {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      application_id,
      amount,
      status: 'captured',
    });

    res.json({
      success: true,
      message: 'Payment verified successfully. Receipt and invoice generated.',
      data: {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        status: 'captured',
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Payment verification failed: ' + error.message });
  }
});

// Razorpay Webhook listener (verifies signature with raw body)
apiRouter.post('/payments/webhook', async (req: Request, res: Response): Promise<void> => {
  const signature = req.headers['x-razorpay-signature'] as string;
  const rawBody = (req as any).rawBody || JSON.stringify(req.body);

  if (signature && !verifyRazorpayWebhookSignature(rawBody, signature)) {
    res.status(400).json({ success: false, error: 'Invalid webhook signature.' });
    return;
  }

  const event = req.body.event;
  const payload = req.body.payload;

  if (event === 'payment.captured') {
    const payment = payload?.payment?.entity;
    if (payment) {
      await dbService.recordPayment({
        amount: (payment.amount || 0) / 100,
        provider: 'razorpay',
        provider_order_id: payment.order_id,
        provider_payment_id: payment.id,
        status: 'captured',
      });
    }
  }

  res.json({ received: true });
});

// ====================================================================
// 7. NOTIFICATIONS
// ====================================================================
apiRouter.get('/notifications', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const notifications = await dbService.getUserNotifications(userId);
    res.json({ success: true, count: notifications.length, data: notifications });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch notifications: ' + error.message });
  }
});

apiRouter.patch('/notifications/:id/read', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    await dbService.markNotificationRead(req.params.id, userId);
    res.json({ success: true, message: 'Notification marked as read.' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to mark notification read: ' + error.message });
  }
});

// ====================================================================
// 8. CONTACT & CONSULTATIONS
// ====================================================================
apiRouter.post('/contact', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
      return;
    }

    const enquiry = await dbService.recordContactEnquiry({
      name,
      email,
      phone,
      subject: subject || 'General Business Enquiry',
      message,
    });

    triggerN8NWebhook('contact_enquiry', {
      enquiry_id: enquiry.id,
      name,
      email,
      phone: phone || '+91 94159 94473',
      subject: enquiry.subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting ASAW Consultancy Services. A consultant from our Gomti Nagar, Lucknow office will reach out to you shortly.',
      data: enquiry,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to process enquiry: ' + error.message });
  }
});

apiRouter.post('/consultations', async (req: Request, res: Response): Promise<void> => {
  try {
    const { full_name, phone, email, topic, preferred_slot, preferred_mode } = req.body;
    if (!full_name || !phone) {
      res.status(400).json({ success: false, error: 'Full name and phone number are required to schedule a consultation.' });
      return;
    }

    const ref = `ASAW-CAL-${Math.floor(1000 + Math.random() * 9000)}`;

    triggerN8NWebhook('contact_enquiry', {
      type: 'free_consultation',
      reference: ref,
      name: full_name,
      phone,
      email: email || 'asawconsultancy@gmail.com',
      topic: topic || 'General Compliance',
      preferred_slot,
      preferred_mode: preferred_mode || 'phone',
    });

    res.status(201).json({
      success: true,
      message: 'Consultation appointment confirmed. A senior CA will call you at your scheduled slot.',
      data: {
        reference_number: ref,
        full_name,
        phone,
        preferred_slot,
        preferred_mode,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to schedule consultation: ' + error.message });
  }
});

// ====================================================================
// 9. GEMINI AI CUSTOMER SUPPORT
// ====================================================================
apiRouter.post('/ai/support', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ success: false, error: 'A valid question or message is required.' });
      return;
    }

    const reply = await getGeminiSupportResponse(message, history || []);
    res.json({
      success: true,
      reply,
      support_phone: '+91 94159 94473',
      support_email: 'asawconsultancy@gmail.com',
      headquarters: 'Near Ram Katha Park, Gomti Nagar, Lucknow, Uttar Pradesh, India',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'AI support service error: ' + error.message });
  }
});

// ====================================================================
// 10. ADMIN DASHBOARD & CONTROLS (requireAuth & requireRole('admin'))
// ====================================================================
apiRouter.get('/admin/dashboard', requireAuth, requireRole('admin'), async (_req: Request, res: Response) => {
  try {
    const applications = await dbService.getAllApplications();
    const totalApplications = applications.length;
    const pendingApplications = applications.filter(a => a.status === 'submitted' || a.status === 'under_review').length;
    const completedApplications = applications.filter(a => a.status === 'completed').length;
    const inProgressApplications = applications.filter(a => a.status === 'in_progress').length;
    const enquiries = await dbService.getContactEnquiries();

    res.json({
      success: true,
      data: {
        metrics: {
          total_applications: totalApplications,
          pending_review: pendingApplications,
          in_progress: inProgressApplications,
          completed: completedApplications,
          total_enquiries: enquiries.length,
        },
        recent_applications: applications.slice(0, 10),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Admin dashboard failed: ' + error.message });
  }
});

apiRouter.get('/admin/applications', requireAuth, requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string | undefined;
    const serviceId = req.query.service_id as string | undefined;
    const applications = await dbService.getAllApplications(status, serviceId);
    res.json({ success: true, count: applications.length, data: applications });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch admin applications: ' + error.message });
  }
});

apiRouter.patch('/admin/applications/:id/status', requireAuth, requireRole('admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, admin_notes } = req.body;
    if (!status) {
      res.status(400).json({ success: false, error: 'New status is required.' });
      return;
    }

    const updated = await dbService.updateApplicationStatus(
      req.params.id,
      status,
      admin_notes,
      req.user?.id
    );

    if (!updated) {
      res.status(404).json({ success: false, error: 'Application not found.' });
      return;
    }

    triggerN8NWebhook('status_changed', {
      application_id: updated.id,
      application_number: updated.application_number,
      new_status: status,
      admin_notes,
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Status update failed: ' + error.message });
  }
});

// ====================================================================
// 11. PROFESSIONAL DASHBOARD (requireAuth & requireRole('professional', 'admin'))
// ====================================================================
apiRouter.get('/professional/dashboard', requireAuth, requireRole('professional', 'admin'), async (req: Request, res: Response) => {
  try {
    const profId = req.user!.id;
    const allApps = await dbService.getAllApplications();
    const assigned = allApps.filter(a => a.assigned_professional_id === profId || req.user?.role === 'admin');

    res.json({
      success: true,
      data: {
        assigned_count: assigned.length,
        in_progress_count: assigned.filter(a => a.status === 'in_progress').length,
        completed_count: assigned.filter(a => a.status === 'completed').length,
        applications: assigned,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch professional dashboard: ' + error.message });
  }
});
