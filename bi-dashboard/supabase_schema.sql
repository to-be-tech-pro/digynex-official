-- =========================================================================
-- DigyNex Enterprise BI Dashboard - Supabase Base Schema & Mock Data
-- =========================================================================

-- 1. Create the Transactions Table
CREATE TABLE IF NOT EXISTS bi_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    transaction_date DATE NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('revenue', 'expense')),
    category VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE bi_transactions ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to view all data (for Dashboard)
CREATE POLICY "Allow authenticated users to read transactions" 
    ON bi_transactions 
    FOR SELECT 
    USING (auth.role() = 'authenticated');

-- 2. Create the KPI Metrics Target Table
CREATE TABLE IF NOT EXISTS kpi_targets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    month DATE NOT NULL, -- e.g. 2026-03-01
    target_revenue DECIMAL(12, 2) NOT NULL,
    target_profit DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE kpi_targets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to read targets" 
    ON kpi_targets 
    FOR SELECT 
    USING (auth.role() = 'authenticated');

-- =========================================================================
-- 3. INSERT FAKE INITIAL DATA (Seed for the Dashboard)
-- =========================================================================

-- Insert some Revenue (Course Fees, Enterprise SaaS Subscriptions)
INSERT INTO bi_transactions (transaction_date, amount, type, category, description) VALUES
('2026-03-01', 150000.00, 'revenue', 'course_fee', 'Advanced Batch A - Full Payments'),
('2026-03-02', 200000.00, 'revenue', 'saas_subscription', 'Enterprise Client XYZ - Monthly Renewal'),
('2026-03-05', 85000.00,  'revenue', 'course_fee', 'Beginner Batch B - Installments'),
('2026-03-10', 320000.00, 'revenue', 'saas_subscription', 'Corporate Partner ABC - Yearly License'),
('2026-03-15', 120000.00, 'revenue', 'course_fee', 'Advanced Batch A - Late Payments'),
('2026-03-18', 450000.00, 'revenue', 'consulting', 'AI Implementation Consulting Project'),
('2026-03-24', 90000.00,  'revenue', 'course_fee', 'Weekend Workshop Registration');

-- Insert some Expenses (Salaries, Marketing, Servers)
INSERT INTO bi_transactions (transaction_date, amount, type, category, description) VALUES
('2026-03-01', 50000.00, 'expense', 'server_cost', 'AWS / Supabase Cloud Hosting Bill'),
('2026-03-04', 120000.00, 'expense', 'marketing', 'Facebook Nexus Ad Campaign'),
('2026-03-10', 600000.00, 'expense', 'salary', 'Monthly Staff & Instructor Salaries'),
('2026-03-15', 30000.00, 'expense', 'software', 'Internal SaaS Tools & API Limits'),
('2026-03-20', 80000.00, 'expense', 'marketing', 'LinkedIn B2B Lead Gen Campaign');

-- Insert Target KPIs for March 2026
INSERT INTO kpi_targets (month, target_revenue, target_profit) VALUES
('2026-03-01', 1500000.00, 500000.00);

-- =========================================================================
-- 4. STRATEGIC WORKFLOW TABLES (Phase 8)
-- =========================================================================

-- Create the Purchase Orders Table
CREATE TABLE IF NOT EXISTS purchase_orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    po_number VARCHAR(100) NOT NULL UNIQUE,
    client_name VARCHAR(200) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    budget_limit DECIMAL(15, 2),
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'converted', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to read POs" ON purchase_orders FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert POs" ON purchase_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update POs" ON purchase_orders FOR UPDATE USING (true);

-- Create the Work Orders Table
CREATE TABLE IF NOT EXISTS work_orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    po_id UUID REFERENCES purchase_orders(id),
    name VARCHAR(200) NOT NULL,
    assigned_supervisor VARCHAR(100), -- Team Lead / Admin
    assigned_subcontractor VARCHAR(100), -- Subcontractor Name / Profile
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
    deadline DATE,
    budget_allocation DECIMAL(15, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to read WOs" ON work_orders FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert WOs" ON work_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update WOs" ON work_orders FOR UPDATE USING (true);

-- Create the Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    wo_id UUID REFERENCES work_orders(id),
    client_name VARCHAR(200) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'paid')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to read invoices" ON invoices FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert invoices" ON invoices FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update invoices" ON invoices FOR UPDATE USING (true);

-- =========================================================================
-- 5. SEED DATA FOR STRATEGIC FLOW (PO -> WO)
-- =========================================================================

INSERT INTO purchase_orders (po_number, client_name, amount, budget_limit, description, status) VALUES
('PO-2026-001', 'Axis Corporate Ltd', 850000.00, 900000.00, 'Cloud Infrastructure Migration Q1', 'approved'),
('PO-2026-002', 'Nexus Digital', 120000.00, 150000.00, 'AI Content Engine Integration', 'pending');

INSERT INTO work_orders (po_id, name, assigned_supervisor, assigned_subcontractor, status, budget_allocation) VALUES
((SELECT id FROM purchase_orders WHERE po_number = 'PO-2026-001'), 'Infra Sharding Execution', 'Amila Supervisor', 'TechNode Solutions', 'in_progress', 400000.00);

-- =========================================================================
-- Phase 9: Strategic Service BOS Add-ons (RBAC & Project Costing)
-- =========================================================================

-- 6. Organizations Table (Enterprise Identity & Branding)
CREATE TABLE IF NOT EXISTS organizations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    org_type VARCHAR(50) DEFAULT 'Project' CHECK (org_type IN ('Project', 'Service', 'Education')),
    primary_color TEXT DEFAULT '#3b82f6',
    logo_url TEXT,
    contact_email TEXT,
    address TEXT,
    tax_id TEXT,
    website TEXT,
    plan_tier VARCHAR(50) DEFAULT 'Business',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read for organizations" ON organizations FOR SELECT USING (true);

-- 7. RBAC: User Roles (Explicitly requested for Admin/Staff/Subcontractor)
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    role TEXT CHECK (role IN ('admin', 'staff', 'subcontractor')) DEFAULT 'staff',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow owners to read their own role" ON user_roles FOR SELECT USING (auth.uid() = user_id);

-- 8. Audit Trail (History)
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL, -- 'po', 'wo', 'invoice'
    entity_id UUID NOT NULL,
    action VARCHAR(100) NOT NULL, -- 'created', 'status_changed', 'deleted'
    details JSONB DEFAULT '{}'::jsonb,
    performed_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to read logs" ON activity_logs FOR SELECT USING (true);

-- 9. Structural Updates for Project Costing & Document Vault
ALTER TABLE purchase_orders ADD COLUMN IF NOT EXISTS document_url TEXT;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS document_url TEXT;
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS cost_amount DECIMAL(15, 2) DEFAULT 0.00;

-- 10. Net Profit Automation: Trigger to log Expense in bi_transactions when WO is 'completed'
-- This logic ensures Net Profit (Revenue - Cost) is reflected in the BI Dashboard
CREATE OR REPLACE FUNCTION log_wo_expense_on_complete()
RETURNS trigger AS $$
BEGIN
  -- We only log the expense if the WO status moves to 'completed'
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    INSERT INTO bi_transactions (transaction_date, amount, type, category, description)
    VALUES (
      CURRENT_DATE,
      COALESCE(NEW.cost_amount, 0),
      'expense',
      'subcontractor_payment',
      'Project Cost Fulfillment: ' || NEW.name
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_log_wo_expense ON work_orders;
CREATE TRIGGER trg_log_wo_expense
  AFTER UPDATE OF status ON work_orders
  FOR EACH ROW
  EXECUTE PROCEDURE log_wo_expense_on_complete();

-- 11. User Profiles & Personnel Hub (Finalized RBAC)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT UNIQUE,
    role TEXT CHECK (role IN ('ceo', 'manager', 'staff', 'finance', 'subcontractor')) DEFAULT 'staff',
    status TEXT DEFAULT 'Active',
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can view profiles (needed for mentions/collaboration)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
FOR SELECT USING (true);

-- Policy: Allow CEOs and Managers to perform full CRUD on personnel
DROP POLICY IF EXISTS "Admins can manage profiles" ON public.profiles;
CREATE POLICY "Admins can manage profiles" ON public.profiles
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND (role = 'ceo' OR role = 'manager')
    )
) WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND (role = 'ceo' OR role = 'manager')
    )
);

-- Seed Initial Administrator
INSERT INTO public.profiles (id, name, email, role, status)
VALUES ('00000000-0000-0000-0000-000000000000', 'Amila Global Admin', 'admin@digynex.se', 'ceo', 'Active')
ON CONFLICT (email) DO NOTHING;

-- Seed initial HQ Organization
INSERT INTO public.organizations (name, slug, org_type, primary_color) 
VALUES ('DigyNex HQ', 'digynex-hq', 'Project', '#3b82f6')
ON CONFLICT (slug) DO NOTHING;
