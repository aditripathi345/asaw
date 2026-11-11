-- ====================================================================
-- ASAW CONSULTANCY SERVICES - MASTER DATABASE SCHEMA MIGRATION
-- Database: Supabase PostgreSQL
-- Headquarters: Gomti Nagar, Lucknow, Uttar Pradesh, India
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create custom types and ENUMs
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'admin', 'professional');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE application_status AS ENUM (
        'draft',
        'submitted',
        'under_review',
        'documents_required',
        'in_progress',
        'completed',
        'rejected',
        'cancelled'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE document_verification_status AS ENUM ('pending', 'verified', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'authorized', 'captured', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ====================================================================
-- TABLE 1: profiles
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role user_role DEFAULT 'customer'::user_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- ====================================================================
-- TABLE 2: services
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    starting_price NUMERIC(12, 2) NOT NULL,
    estimated_completion_days INTEGER NOT NULL DEFAULT 7,
    required_documents JSONB DEFAULT '[]'::jsonb NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON public.services(is_active);

-- ====================================================================
-- TABLE 3: applications
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    service_id TEXT REFERENCES public.services(id) ON DELETE RESTRICT,
    applicant_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    business_name TEXT,
    form_data JSONB DEFAULT '{}'::jsonb NOT NULL,
    status application_status DEFAULT 'submitted'::application_status NOT NULL,
    admin_notes TEXT,
    assigned_professional_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_applications_user_id ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_app_number ON public.applications(application_number);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_assigned_prof ON public.applications(assigned_professional_id);

-- ====================================================================
-- TABLE 4: application_documents
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.application_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    document_type TEXT NOT NULL,
    verification_status document_verification_status DEFAULT 'pending'::document_verification_status NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_app_documents_app_id ON public.application_documents(application_id);
CREATE INDEX IF NOT EXISTS idx_app_documents_user_id ON public.application_documents(user_id);

-- ====================================================================
-- TABLE 5: payments
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.applications(id) ON DELETE SET NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    amount NUMERIC(12, 2) NOT NULL,
    currency TEXT DEFAULT 'INR' NOT NULL,
    provider TEXT DEFAULT 'razorpay' NOT NULL,
    provider_order_id TEXT,
    provider_payment_id TEXT,
    status payment_status DEFAULT 'pending'::payment_status NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_payments_app_id ON public.payments(application_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_provider_order ON public.payments(provider_order_id);

-- ====================================================================
-- TABLE 6: application_activity
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.application_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    changed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    old_status TEXT,
    new_status TEXT NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_activity_app_id ON public.application_activity(application_id);

-- ====================================================================
-- TABLE 7: contact_enquiries
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ====================================================================
-- TABLE 8: notifications
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);

-- ====================================================================
-- STORAGE BUCKET: asaw-documents
-- ====================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('asaw-documents', 'asaw-documents', false)
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read and update their own profile; admins can read all
CREATE POLICY "Users can read own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile fields" ON public.profiles
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Services: Everyone can read active services; only admins can modify
CREATE POLICY "Public can view active services" ON public.services
    FOR SELECT USING (is_active = true);

-- Applications: Customers see own applications; Admins see all; Professionals see assigned
CREATE POLICY "Customers view own applications" ON public.applications
    FOR SELECT USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role IN ('admin', 'professional')
        )
    );

CREATE POLICY "Customers can create applications" ON public.applications
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Documents: Customers view own docs; Professionals view assigned; Admins view all
CREATE POLICY "Authorized view of documents" ON public.application_documents
    FOR SELECT USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        ) OR
        EXISTS (
            SELECT 1 FROM public.applications a
            WHERE a.id = application_id AND a.assigned_professional_id = auth.uid()
        )
    );

-- Notifications: Users only see their own notifications
CREATE POLICY "Users view own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users mark own notifications read" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Automatic Profile Creation on Signup Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, phone, role)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'full_name', 'Customer'),
        new.email,
        new.raw_user_meta_data->>'phone',
        'customer'::user_role
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
