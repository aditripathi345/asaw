-- ====================================================================
-- ASAW CONSULTANCY SERVICES - SEED ALL 22 CORE SERVICES
-- Currency: INR (₹)
-- ====================================================================

INSERT INTO public.services (id, name, category, description, starting_price, estimated_completion_days, required_documents, is_active)
VALUES
(
    'pvt-ltd',
    'Private Limited Company Registration',
    'Company Formation',
    'Most trusted corporate structure for startups and high-growth businesses. Includes 2 DSCs, Name Approval, e-MoA, e-AoA, CIN, PAN, TAN & Bank Account assistance.',
    6999,
    10,
    '["PAN Card of Directors", "Aadhaar Card of Directors", "Electricity Bill / Utility Bill of Registered Office", "NOC from Property Owner", "Passport Photographs"]'::jsonb,
    true
),
(
    'llp',
    'LLP Registration',
    'Company Formation',
    'Limited Liability Partnership combining partnership flexibility with corporate limited liability and low statutory compliance burden.',
    5499,
    10,
    '["PAN Card of Partners", "Aadhaar / Passport of Partners", "Registered Office Proof (Utility Bill + NOC)", "LLP Agreement Form 3"]'::jsonb,
    true
),
(
    'opc',
    'One Person Company Registration',
    'Company Formation',
    'Allows a solo entrepreneur to operate a full corporate entity with limited liability and 100% equity ownership.',
    5999,
    8,
    '["PAN and Aadhaar of Sole Director", "Nominee Consent Form INC-3", "Address Proof of Office", "Specimen Signature"]'::jsonb,
    true
),
(
    'partnership',
    'Partnership Firm Registration',
    'Company Formation',
    'Traditional partnership firm registration with Registrar of Firms (ROF) along with partnership deed drafting and PAN card allotment.',
    3999,
    7,
    '["PAN and Aadhaar of all Partners", "Partnership Deed on Stamp Paper", "Rent Agreement and Utility Bill", "Firm Name Consent"]'::jsonb,
    true
),
(
    'proprietorship',
    'Proprietorship Registration',
    'Company Formation',
    'Simple business structure for single owners backed by MSME Udyam, GST registration, and current bank account credentials.',
    1999,
    3,
    '["PAN Card of Proprietor", "Aadhaar Card with linked mobile for OTP", "Electricity Bill of Premises", "Cancelled Cheque"]'::jsonb,
    true
),
(
    'gst-reg',
    'GST Registration',
    'Tax & Registration',
    'Obtain your 15-digit GSTIN within 3-5 days. Compulsory for e-commerce, interstate trade and businesses exceeding threshold turnover.',
    1499,
    4,
    '["PAN Card", "Aadhaar Card", "Electricity Bill / Property Tax Receipt", "Rent Agreement / NOC", "Bank Account Proof"]'::jsonb,
    true
),
(
    'gst-return',
    'GST Returns and Filing',
    'Tax & Registration',
    'Monthly and quarterly filing of GSTR-1 and GSTR-3B with 100% input tax credit (ITC) reconciliation and penalty protection.',
    999,
    3,
    '["Monthly Sales Register", "Purchase Invoices & GSTR-2B sync", "Bank Statement for the month"]'::jsonb,
    true
),
(
    'gst-amendment',
    'GST Amendment and Cancellation',
    'Tax & Registration',
    'Core and non-core amendments to GST registration, additional place of business addition, or formal GSTIN surrender / cancellation.',
    1999,
    5,
    '["Existing GST Certificate", "Proof of new address or partner change", "Application reason documentation"]'::jsonb,
    true
),
(
    'trademark',
    'Trademark Registration (TM / ®)',
    'Intellectual Property',
    'Protect your brand name, wordmark, or logo across India under the Trade Marks Act 1999. Use ™ symbol within 24 hours of application.',
    1999,
    2,
    '["Brand Name / Logo Artwork in high resolution", "Applicant ID and Address Proof", "MSME Certificate (if applicable for 50% govt fee rebate)", "Signed Form TM-48 Power of Attorney"]'::jsonb,
    true
),
(
    'copyright',
    'Copyright Registration',
    'Intellectual Property',
    'Legal copyright protection for software source code, website UI, artistic works, literary works, and video content.',
    4999,
    20,
    '["2 Copies of Creative Work / Source Code", "Applicant ID Proof", "NOC from Creator/Author"]'::jsonb,
    true
),
(
    'fssai',
    'FSSAI Registration and License',
    'Licenses & Certifications',
    'Mandatory 14-digit food safety registration or State/Central License for cloud kitchens, restaurants, bakeries, cafes, and food packers.',
    2499,
    6,
    '["Aadhaar and PAN of Food Business Operator", "Premises Proof & Rent Agreement", "List of Food Product Categories"]'::jsonb,
    true
),
(
    'msme-udyam',
    'MSME / Udyam Registration',
    'Licenses & Certifications',
    'Ministry of MSME official registration for priority collateral-free bank loans, tender subsidies, and 45-day payment protection.',
    999,
    2,
    '["Aadhaar Card of Applicant", "PAN Card of Enterprise", "Bank Account Number and IFSC"]'::jsonb,
    true
),
(
    'iec',
    'Import Export Code (IEC)',
    'Licenses & Certifications',
    '10-digit code issued by DGFT, Ministry of Commerce, mandatory for exporting goods/services and importing international shipments.',
    2999,
    3,
    '["PAN and Aadhaar", "Cancelled Cheque with entity name printed", "Proof of business premises"]'::jsonb,
    true
),
(
    'shop-establishment',
    'Shop and Establishment License',
    'Licenses & Certifications',
    'Municipal commercial establishment registration mandatory for commercial offices, shops, and retail centers in Uttar Pradesh and other states.',
    2499,
    5,
    '["Employer ID Proof", "Commercial Electricity Bill", "Rental Agreement", "Employee count and designation breakdown"]'::jsonb,
    true
),
(
    'iso-cert',
    'ISO Certification Assistance',
    'Licenses & Certifications',
    'Consulting and audit assistance for ISO 9001:2015, ISO 27001, and other management quality standards.',
    7999,
    14,
    '["Company Incorporation Certificate", "Scope of Operations Description", "Quality Management Manual Draft"]'::jsonb,
    true
),
(
    'itr',
    'Income Tax Return Filing',
    'Tax & Registration',
    'Expert CA-assisted ITR-1 to ITR-6 filing for salaried individuals, startups, proprietorships, partnerships, and companies.',
    1499,
    2,
    '["Form 16 / 16A", "Annual Information Statement (AIS / TIS)", "Bank Statements", "Capital Gains Statements"]'::jsonb,
    true
),
(
    'tds-returns',
    'TDS Returns',
    'Tax & Registration',
    'Quarterly preparation and filing of Form 24Q, 26Q, and 27Q along with Form 16/16A generation and TRACES compliance.',
    2499,
    4,
    '["TAN Certificate", "TDS Challans paid for the quarter", "Deductee list with PAN and deduction rates"]'::jsonb,
    true
),
(
    'roc-compliance',
    'ROC Compliance',
    'Secretarial & Compliance',
    'Annual MCA filing of Form AOC-4 (Financials) and Form MGT-7/7A (Annual Return) to avoid ₹100/day statutory MCA penalties.',
    11999,
    8,
    '["Audited Balance Sheet & P&L", "Auditor & Directors Report", "Notice of AGM", "Statutory Registers"]'::jsonb,
    true
),
(
    'director-kyc',
    'Director KYC (DIR-3 KYC)',
    'Secretarial & Compliance',
    'Mandatory annual DIN verification for all directors with MCA to keep Director Identification Numbers active and prevent deactivation.',
    999,
    1,
    '["Director PAN", "Aadhaar Card", "Active Mobile for OTP verification", "Active Personal Email ID"]'::jsonb,
    true
),
(
    'accounting',
    'Accounting and Bookkeeping',
    'Accounting & Finance',
    'Monthly cloud bookkeeping, bank ledger reconciliation, balance sheet drafting, and MIS reports for management review.',
    2999,
    30,
    '["Monthly Bank Statements", "Sales and Expense Bills", "Payroll Statements"]'::jsonb,
    true
),
(
    'payroll',
    'Payroll Management',
    'Accounting & Finance',
    'Monthly payslip generation, salary structure optimization, TDS deduction, and leave management compliance.',
    1999,
    5,
    '["Employee Master Data", "Monthly Attendance Register", "Salary Structures"]'::jsonb,
    true
),
(
    'pf-esi',
    'PF and ESI Compliance',
    'Secretarial & Compliance',
    'Monthly EPF electronic challan cum return (ECR) filing, ESIC contribution filing, and labor compliance audits.',
    2499,
    5,
    '["PF & ESIC Registration Codes", "Monthly Wage Register", "Employee UAN & IP Numbers"]'::jsonb,
    true
),
(
    'website-dev',
    'Website Development',
    'Website & Automation',
    'Modern, high-converting websites, corporate landing pages, portals, and e-commerce platforms with domain, SSL & SEO.',
    14999,
    10,
    '["Company Brand Logo & Color Guidelines", "Business Content & Copy", "Domain Registrar Access", "Payment Gateway Credentials"]'::jsonb,
    true
),
(
    'automation-dev',
    'Automation Development',
    'Website & Automation',
    'Automate business operations, n8n workflows, CRM integration, and customer communications hands-free.',
    19999,
    14,
    '["Process SOPs & Flowcharts", "API Credentials for Integrated Tools", "Notification Message Templates", "Sample Data Inputs"]'::jsonb,
    true
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    starting_price = EXCLUDED.starting_price,
    estimated_completion_days = EXCLUDED.estimated_completion_days,
    required_documents = EXCLUDED.required_documents,
    is_active = EXCLUDED.is_active;
