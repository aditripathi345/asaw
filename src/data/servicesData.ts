import { ServiceCategory, ServiceItem, OrderStatus, Testimonial, HeadquartersInfo } from '../types';

export const POPULAR_SEARCH_TERMS = [
  'Website Development',
  'Automation Development',
  'Private Limited Company',
  'GST Registration',
  'Trademark Search',
  'FSSAI Food License',
  'LLP Registration',
  'Income Tax Return',
  'MSME Udyam Registration',
  'Import Export Code (IEC)',
  'Annual ROC Compliance',
  'Virtual CFO'
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'startup',
    title: 'Startup & Incorporation',
    icon: 'Building2',
    tagline: 'Launch your venture with official MCA incorporation and bank account support.',
    services: [
      {
        id: 'pvt-ltd',
        name: 'Private Limited Company Registration',
        category: 'Startup & Incorporation',
        shortDesc: 'Most popular structure for high-growth startups seeking venture capital and limited liability.',
        fullDesc: 'A Private Limited Company is the most trusted and recognized corporate legal structure in India. Governed by the Ministry of Corporate Affairs (MCA) under the Companies Act 2013, it offers limited liability protection, separate legal identity, continuous existence, and easy equity fundraising.',
        priceStarting: 6999,
        govFeeNotice: 'Includes MCA ROC fee, 2 DSCs, PAN, TAN & Zero Govt Fee on Authorized Capital up to ₹15 Lakhs (SPICe+)',
        turnaroundTime: '7 - 10 Working Days',
        popular: true,
        documentsNeeded: [
          'PAN Card of all Directors and Shareholders',
          'Aadhaar Card / Voter ID / Passport for Identity Proof',
          'Latest Bank Statement / Electricity Bill (not older than 2 months)',
          'Registered Office Address Proof (Electricity bill + NOC from owner)',
          'Passport-sized photographs of all directors'
        ],
        processSteps: [
          'Digital Signature Certificates (DSC) issuance for 2 directors',
          'Company Name Reservation via MCA RUN / SPICe+ Part A',
          'Drafting of Memorandum (MoA) & Articles of Association (AoA)',
          'SPICe+ Part B Filing with MCA including PAN, TAN, EPFO, ESIC & Profession Tax',
          'Receipt of Certificate of Incorporation (CIN) and Corporate Bank Account opening support'
        ],
        packages: [
          {
            name: 'Standard Package',
            price: 6999,
            description: 'Ideal for 2 Indian resident directors starting up with standard capital.',
            features: [
              '2 Digital Signatures (Class 3 DSC)',
              '1 RUN Name Reservation Approval',
              'Drafting of e-MoA and e-AoA',
              'Certificate of Incorporation (CIN)',
              'Company PAN & TAN Allotment',
              'Free Zero-Balance Current Account assistance'
            ]
          },
          {
            name: 'Fast-Track + GST Bundle',
            price: 9999,
            description: 'Complete business launch pack with priority processing and GST registration included.',
            features: [
              'Everything in Standard Package',
              'Priority 48-hour document drafting',
              'Official GST Registration Certificate',
              'MSME / Udyam Registration Certificate',
              'First Board Resolution & Share Certificates drafting',
              '1-Year Free Access to ASAW Cloud Invoicing'
            ]
          },
          {
            name: 'Growth & Compliance 1-Yr Pack',
            price: 18999,
            description: 'Complete 360° first-year coverage including incorporation and all annual MCA filings.',
            features: [
              'Everything in Fast-Track Bundle',
              'First Year MCA Annual ROC Filing (AOC-4 & MGT-7)',
              'Annual Director KYC (DIR-3 KYC) for 2 Directors',
              'Auditor Appointment Form (ADT-1)',
              'Dedicated Relationship Manager & CA consult',
              'Corporate Kit courier to your office'
            ]
          }
        ]
      },
      {
        id: 'llp',
        name: 'Limited Liability Partnership (LLP)',
        category: 'Startup & Incorporation',
        shortDesc: 'Combines partnership flexibility with corporate limited liability, low compliance burden.',
        fullDesc: 'Limited Liability Partnership (LLP) is governed by the LLP Act 2008. It is preferred by service professionals, boutique consulting firms, software development agencies, and family businesses looking for limited liability without the rigid statutory audit norms of a Private Limited company.',
        priceStarting: 5499,
        govFeeNotice: 'Includes 2 Class 3 DSCs, Name Approval, FiLLiP MCA Filing & LLP Agreement Drafting',
        turnaroundTime: '8 - 12 Working Days',
        popular: true,
        documentsNeeded: [
          'PAN Card of all Designated Partners',
          'Address proof of Partners (Aadhaar, Passport, or Voter ID)',
          'Registered Office Address Proof (Utility Bill + NOC)',
          'Specimen signatures and photos'
        ],
        processSteps: [
          'DSC processing for Designated Partners',
          'Name approval via RUN-LLP',
          'FiLLiP Incorporation Form submission to ROC',
          'Certificate of Incorporation issued',
          'Drafting and filing of Form 3 (LLP Agreement) within 30 days'
        ],
        packages: [
          {
            name: 'Standard LLP',
            price: 5499,
            description: 'Complete incorporation with custom drafted LLP Agreement.',
            features: [
              '2 Digital Signatures (DSC)',
              'Name Reservation Approval',
              'Certificate of Incorporation',
              'PAN & TAN of LLP',
              'Drafting of Custom LLP Agreement',
              'ROC Form 3 Filing with Govt Stamp Duty'
            ]
          },
          {
            name: 'LLP + GST Starter Pack',
            price: 7999,
            description: 'Ready-to-bill bundle including GST registration and MSME benefits.',
            features: [
              'Everything in Standard LLP',
              'GST Registration Certificate',
              'MSME / Udyam Registration',
              'Bank Account Assistance with Top Banks',
              'Free Cloud Invoicing Tool'
            ]
          }
        ]
      },
      {
        id: 'opc',
        name: 'One Person Company (OPC)',
        category: 'Startup & Incorporation',
        shortDesc: 'Sole proprietorship protection with 100% solo ownership and corporate status.',
        fullDesc: 'Introduced in the Companies Act 2013, an OPC allows a single Indian entrepreneur to form a company while enjoying limited liability, full legal identity, and corporate prestige without requiring a co-founder.',
        priceStarting: 5999,
        govFeeNotice: 'Includes 1 DSC, Nominee consent processing, Name approval & SPICe+ MCA filing',
        turnaroundTime: '7 - 10 Working Days',
        documentsNeeded: [
          'PAN & Aadhaar of the Sole Director & Nominee',
          'Utility bill of registered office',
          'Written consent from Nominee Director (INC-3)'
        ],
        processSteps: [
          'DSC Application for Director',
          'Name approval via SPICe+ Part A',
          'Filing SPICe+ Part B & INC-3',
          'Receipt of CIN, PAN & TAN'
        ],
        packages: [
          {
            name: 'Standard OPC',
            price: 5999,
            description: 'Complete OPC registration for solo founder.',
            features: [
              '1 Class 3 DSC',
              'Name Approval Support',
              'Incorporation Certificate',
              'PAN & TAN Card Allotment',
              'Free Bank Account Setup Support'
            ]
          }
        ]
      },
      {
        id: 'section-8',
        name: 'Section 8 NGO / Non-Profit Company',
        category: 'Startup & Incorporation',
        shortDesc: 'Incorporation of non-profit entities for social work, education, charity, and CSR grants.',
        fullDesc: 'Section 8 companies are registered for promoting commerce, art, science, sports, education, research, social welfare, or charity, where profits are reinvested solely into the objects of the company.',
        priceStarting: 14999,
        govFeeNotice: 'Includes Central Govt License from Regional Director (RD) & SPICe+ registration',
        turnaroundTime: '15 - 20 Working Days',
        documentsNeeded: [
          'PAN & Aadhaar of all Promoters & Directors',
          'Estimated 3-Year Future Financial Projections & Work Plan',
          'Office address proof & NOC'
        ],
        processSteps: [
          'Name Reservation',
          'License Application (Form INC-12) to Regional Director',
          'Issuance of Section 8 License',
          'Filing of SPICe+ Incorporation'
        ],
        packages: [
          {
            name: 'Complete Section 8 License + Incorp',
            price: 14999,
            description: 'Full licensing and incorporation with 80G/12A advisory.',
            features: [
              'Regional Director License in Form INC-12',
              'e-MoA and e-AoA with non-profit clauses',
              'Certificate of Incorporation',
              'PAN & TAN for NGO',
              'CSR-1 Filing Guidance'
            ]
          }
        ]
      },
      {
        id: 'us-company',
        name: 'US Delaware / Wyoming LLC Registration',
        category: 'Startup & Incorporation',
        shortDesc: 'Incorporate a US entity from India with US Employer ID (EIN) and US bank account.',
        fullDesc: 'Expand globally, raise venture capital from US investors (YC, Techstars, US angels), and collect global Stripe payments with a registered Delaware or Wyoming LLC/C-Corp.',
        priceStarting: 39999,
        govFeeNotice: 'Includes State Filing Fee, Registered Agent for 1 year, and Federal EIN',
        turnaroundTime: '10 - 14 Working Days',
        popular: true,
        documentsNeeded: [
          'Passport of Founder(s)',
          'Indian Address Proof (Bank Statement)',
          'Desired US company name & business description'
        ],
        processSteps: [
          'Name clearance with State Secretary',
          'Certificate of Formation filing in Delaware/Wyoming',
          'Registered Agent appointment for 12 months',
          'IRS EIN (Tax ID) procurement',
          'Mercury / Brex US Bank Account assistance'
        ],
        packages: [
          {
            name: 'US LLC Launchpad',
            price: 39999,
            description: 'Everything to accept global payments and incorporate in USA.',
            features: [
              'Delaware/Wyoming State Filing Fee included',
              '1 Year US Registered Agent',
              'Federal Tax ID (EIN) from IRS',
              'Operating Agreement Drafting',
              'US Fintech Bank Account (Mercury/Wise) setup assistance'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'registrations',
    title: 'GST & Govt Registrations',
    icon: 'FileCheck2',
    tagline: 'Mandatory tax IDs, food licenses, trade permits, and MSME subsidy eligibility.',
    services: [
      {
        id: 'gst-reg',
        name: 'GST Registration Online',
        category: 'GST & Govt Registrations',
        shortDesc: 'Obtain your 15-digit GSTIN within 3-5 days. Compulsory for e-commerce, interstate trade & turnover above threshold.',
        fullDesc: 'Goods and Services Tax (GST) registration is legally required for businesses with turnover exceeding ₹40 Lakhs (goods) or ₹20 Lakhs (services), as well as all businesses selling through e-commerce (Amazon, Flipkart) or conducting interstate business.',
        priceStarting: 1499,
        govFeeNotice: 'Zero Government Fee for GST Registration. Professional CA verification included.',
        turnaroundTime: '3 - 5 Working Days',
        popular: true,
        documentsNeeded: [
          'PAN Card of Business / Proprietor / Directors',
          'Aadhaar Card of Authorized Signatory (with active mobile for OTP)',
          'Electricity Bill or Property Tax Receipt of business premises',
          'Rent Agreement / Consent Letter from property owner',
          'Cancelled Cheque / First Page of Bank Passbook'
        ],
        processSteps: [
          'Application drafting & HSN / SAC code mapping',
          'Form GST REG-01 preparation and verification',
          'Aadhaar Biometric/OTP authentication',
          'Application Reference Number (ARN) generation',
          'Officer query resolution (if Clarification raised)',
          'Final GSTIN Certificate (Form GST REG-06) delivery'
        ],
        packages: [
          {
            name: 'Proprietorship / Individual GST',
            price: 1499,
            description: 'Fast GSTIN registration for solo business owners.',
            features: [
              'Complete GST REG-01 Filing',
              'HSN & SAC Code Consultation',
              'Aadhaar Authentication Support',
              'Notice / Clarification reply support',
              'Official GSTIN Certificate'
            ]
          },
          {
            name: 'Company / LLP / Partnership GST',
            price: 2499,
            description: 'For corporate entities with multi-director authorization.',
            features: [
              'Board Resolution drafting for Authorized Signatory',
              'Company GSTIN Application',
              'HSN / SAC Master Mapping',
              'Notice / Query handling by senior CA',
              '1-Month Free GST Return Consultation'
            ]
          }
        ]
      },
      {
        id: 'fssai',
        name: 'FSSAI Food License / Registration',
        category: 'GST & Govt Registrations',
        shortDesc: 'Mandatory 14-digit food safety license for restaurants, cloud kitchens, bakeries, cafes & packaged foods.',
        fullDesc: 'Under the Food Safety and Standards Act 2006, all food business operators (FBOs)—from cloud kitchens and cafes to packaged food manufacturers and exporters—must obtain FSSAI Registration or State/Central License before commencing operations.',
        priceStarting: 2499,
        govFeeNotice: 'Govt Fee extra at actuals (₹100/yr for basic, ₹2,000 - ₹7,500/yr for State/Central)',
        turnaroundTime: '5 - 7 Working Days',
        popular: true,
        documentsNeeded: [
          'PAN & Aadhaar of Food Business Operator',
          'Premises proof (Electricity bill + Rent agreement)',
          'List of food product categories to be sold',
          'Layout plan & Equipment list (for State/Central manufacturing)'
        ],
        processSteps: [
          'Classification of business category (Basic, State, or Central)',
          'FoSCoS portal application preparation',
          'Uploading compliance documents & food safety declarations',
          'Government fee payment and inspection liaison',
          'Issuance of 14-Digit FSSAI License'
        ],
        packages: [
          {
            name: 'Basic FSSAI (Turnover up to ₹12 Lakhs)',
            price: 2499,
            description: 'For small eateries, home bakers, cloud kitchens, and retailers.',
            features: [
              '1-Year FSSAI FoSCoS Filing',
              'Product Category Mapping',
              'Declaration Drafting',
              '14-Digit FSSAI Registration Certificate'
            ]
          },
          {
            name: 'State FSSAI License (Turnover ₹12L - ₹20Cr)',
            price: 5999,
            description: 'For restaurants, commercial food manufacturers, distributors.',
            features: [
              'State License Application & Blueprint',
              'Food Safety Management System (FSMS) plan',
              'Department query liaison',
              'Swiggy / Zomato onboarding approval compliance'
            ]
          }
        ]
      },
      {
        id: 'msme',
        name: 'MSME / Udyam Registration',
        category: 'GST & Govt Registrations',
        shortDesc: 'Avail priority bank lending, collateral-free credit, tender benefits, and 45-day payment protection.',
        fullDesc: 'Udyam Registration is the official recognition by the Ministry of MSME. It unlocks government subsidies, lower interest rates on bank loans, exemption on electricity bills, and legal protection against delayed customer payments.',
        priceStarting: 999,
        govFeeNotice: 'Zero Government Fee. Transparent CA application processing.',
        turnaroundTime: '1 - 2 Working Days',
        documentsNeeded: [
          'Aadhaar Card of Proprietor / Managing Partner / Director',
          'PAN Card of Enterprise',
          'Bank Account Details (Account Number & IFSC)'
        ],
        processSteps: [
          'Udyam portal data validation',
          'Investment and turnover classification (Micro, Small, Medium)',
          'Instant Udyam Registration Certificate delivery with QR code'
        ],
        packages: [
          {
            name: 'Udyam Certificate Issuance',
            price: 999,
            description: 'Instant verification and lifetime valid certificate.',
            features: [
              'NIC Code Selection & Mapping',
              'Udyam Certificate with QR Verification',
              'Priority Sector Lending Eligibility Document',
              'Delayed Payment Portal (Samadhaan) Advisory'
            ]
          }
        ]
      },
      {
        id: 'iec',
        name: 'Import Export Code (IEC)',
        category: 'GST & Govt Registrations',
        shortDesc: '10-digit code issued by DGFT mandatory for importing goods or exporting services worldwide.',
        fullDesc: 'The Import Export Code (IEC) is issued by the Directorate General of Foreign Trade (DGFT), Ministry of Commerce. It is mandatory for any individual or business looking to export goods/services or import shipments into India.',
        priceStarting: 2999,
        govFeeNotice: 'Includes DGFT Government Processing Fee of ₹500',
        turnaroundTime: '2 - 3 Working Days',
        documentsNeeded: [
          'PAN Card & Aadhaar',
          'Cancelled Cheque with printed entity name',
          'Address proof of business premises'
        ],
        processSteps: [
          'DGFT portal profile creation',
          'ANF 2A form preparation',
          'Bank integration & DSC / Aadhaar e-Sign',
          'Instant electronic IEC Certificate download'
        ],
        packages: [
          {
            name: 'DGFT IEC Registration',
            price: 2999,
            description: 'Lifetime valid Import Export Code.',
            features: [
              'DGFT ₹500 Govt Fee Included',
              'Electronic IEC Certificate',
              'LUT filing advisory for zero-rated service export',
              'AD Code registration guidance for customs clearance'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'trademark',
    title: 'Trademark & Intellectual Property',
    icon: 'ShieldCheck',
    tagline: 'Safeguard your brand name, logo, copyright, and inventions against copycats.',
    services: [
      {
        id: 'tm-reg',
        name: 'Trademark Registration Online (TM / ®)',
        category: 'Trademark & Intellectual Property',
        shortDesc: 'Protect your brand name and logo across India. Get instant right to use ™ symbol within 24 hours.',
        fullDesc: 'A registered trademark grants exclusive legal rights to your brand name, slogan, or logo under the Trade Marks Act 1999. It prevents competitors from copying your identity and builds intangible enterprise valuation.',
        priceStarting: 1999,
        govFeeNotice: 'Govt Fee: ₹4,500 for Individuals/Startups/MSMEs, ₹9,000 for non-MSME companies',
        turnaroundTime: '24 Hours for Application Number (Use ™ immediately)',
        popular: true,
        documentsNeeded: [
          'Brand Name / Wordmark / Logo Artwork in high resolution',
          'Applicant PAN & Aadhaar (or Certificate of Incorporation for companies)',
          'MSME / Udyam Certificate (to save 50% on Government fee)',
          'Signed Power of Attorney (Form TM-48) drafted by ASAW'
        ],
        processSteps: [
          'Comprehensive Trademark Search across all 45 NICE classes',
          'Class selection and Goods/Services specification drafting',
          'TM-48 Power of Attorney drafting and execution',
          'Online filing with Intellectual Property India (IP India) portal',
          'Immediate allotment of Trademark Application Number (Use ™ symbol)',
          'Ongoing examination status tracking until Registered (®)'
        ],
        packages: [
          {
            name: 'Basic Trademark Application',
            price: 1999,
            description: 'Comprehensive search + TM Application Filing for 1 Class.',
            features: [
              'Pre-filing Conflict Search Report',
              'Class Selection & Drafting (NICE Classification)',
              'Application TM-A Online Filing',
              'Instant ™ Symbol usage authorization',
              'Real-time status tracking'
            ]
          },
          {
            name: 'Trademark Protection + Objection Shield',
            price: 4999,
            description: 'Comprehensive filing with guaranteed written reply to Examination Report.',
            features: [
              'Everything in Basic Package',
              'Written Legal Reply to Trademark Objection (Sec 9 & 11) included',
              'Affidavit drafting with evidence of use',
              'Dedicated Trademark Attorney consultation',
              'Journal Publication tracking until Certificate'
            ]
          }
        ]
      },
      {
        id: 'tm-objection',
        name: 'Trademark Objection Reply',
        category: 'Trademark & Intellectual Property',
        shortDesc: 'Legal response drafted by senior IP attorneys to overcome Section 9 & 11 MCA objections.',
        fullDesc: 'If the Trademark Examiner issues an Examination Report citing relative grounds of refusal (Section 11) or absolute grounds (Section 9), a formal legal reply must be submitted within 30 days to avoid abandonment.',
        priceStarting: 3499,
        govFeeNotice: 'Zero Government Fee for written reply. Drafting by high court IP advocates.',
        turnaroundTime: '3 - 5 Working Days',
        documentsNeeded: [
          'Trademark Application Number & Examination Report',
          'Proof of continuous use of brand (Invoices, domain receipt, social media proofs)'
        ],
        processSteps: [
          'Detailed analysis of examiner citation',
          'Drafting legal response with cited Supreme Court & IPAB precedents',
          'Online submission on IP India portal before the 30-day deadline'
        ],
        packages: [
          {
            name: 'Standard Legal Objection Reply',
            price: 3499,
            description: 'Comprehensive reply under Sections 9 & 11.',
            features: [
              'Detailed Case Law & Precedent Citations',
              'Drafting of Formal Legal Response',
              'Affidavit drafting if user claim is required',
              'Portal submission with acknowledgment receipt'
            ]
          }
        ]
      },
      {
        id: 'copyright',
        name: 'Copyright Registration',
        category: 'Trademark & Intellectual Property',
        shortDesc: 'Protect software code, website UI, artistic designs, books, musical tracks, and video content.',
        fullDesc: 'Copyright gives creators exclusive ownership over original literary, artistic, dramatic, and musical works under the Copyright Act 1957, providing life + 60 years of protection.',
        priceStarting: 4999,
        govFeeNotice: 'Includes Government Fee of ₹500 - ₹2,000 depending on work type',
        turnaroundTime: '15 - 30 Working Days for Dairy Number',
        documentsNeeded: [
          '2 Copies of the creative work / source code',
          'Applicant ID & Address proof',
          'No Objection Certificate (NOC) from author/creator if employer'
        ],
        processSteps: [
          'Form XIV filing on Copyright Office portal',
          'Submission of copies & Statement of Particulars',
          'Mandatory 30-day objection waiting period monitoring',
          'Registration Certificate issued'
        ],
        packages: [
          {
            name: 'Complete Copyright Filing',
            price: 4999,
            description: 'For software source code, creative artwork, or literary work.',
            features: [
              'Form XIV & Statement of Particulars drafting',
              'Government Fee included',
              'Dairy Number generation',
              'Objection monitoring'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'compliance',
    title: 'Tax & Annual Compliance',
    icon: 'Calculator',
    tagline: 'Avoid hefty ROC penalties (₹100/day) and stay 100% compliant with GST & Income Tax.',
    services: [
      {
        id: 'gst-return',
        name: 'GST Return Filing (GSTR-1 & GSTR-3B)',
        category: 'Tax & Annual Compliance',
        shortDesc: 'Monthly or quarterly GST filing with 100% ITC reconciliation and zero-penalty assurance.',
        fullDesc: 'Every registered GST taxpayer must file GSTR-1 (sales details) and GSTR-3B (tax payment summary) each month/quarter. Our chartered accountants reconcile purchase invoices with GSTR-2B to maximize your Input Tax Credit (ITC) and minimize cash outflow.',
        priceStarting: 999,
        govFeeNotice: 'Late fee avoided by timely filing. Per month plan billed quarterly or annually.',
        turnaroundTime: '2 - 3 Days prior to monthly 20th deadline',
        popular: true,
        documentsNeeded: [
          'Sales Invoices / Summary of billings',
          'Purchase Invoices & GSTR-2B portal sync',
          'Bank statement for the month'
        ],
        processSteps: [
          'Invoice data validation and ITC calculation',
          'GSTR-1 outward supply filing',
          'GSTR-3B liability computation and challan generation',
          'Filing acknowledgment receipt generated'
        ],
        packages: [
          {
            name: 'Nil / Micro Turnover (up to 20 invoices)',
            price: 999,
            description: 'Per month filing with full ITC reconciliation.',
            features: [
              'Monthly GSTR-1 and GSTR-3B filing',
              'GSTR-2B input credit reconciliation',
              'Tax challan assistance',
              'Filing acknowledgment receipt'
            ]
          },
          {
            name: 'Active Business (up to 150 invoices)',
            price: 2499,
            description: 'Ideal for e-commerce sellers, retailers, and high-frequency invoicing.',
            features: [
              'GSTR-1 & 3B filing with detailed line-item sync',
              'E-commerce TCS reconciliation',
              'Quarterly compliance review by Senior CA',
              'Dedicated tax relationship manager'
            ]
          }
        ]
      },
      {
        id: 'mca-annual',
        name: 'Company Annual ROC Compliance (AOC-4 & MGT-7)',
        category: 'Tax & Annual Compliance',
        shortDesc: 'Mandatory annual MCA return filing for Private Limited companies. Avoid ₹100/day penalty.',
        fullDesc: 'Under the Companies Act 2013, all Private Limited companies must hold an Annual General Meeting (AGM) and file Financial Statements (Form AOC-4) and Annual Return (Form MGT-7 / MGT-7A) with the ROC within 30 and 60 days of AGM.',
        priceStarting: 11999,
        govFeeNotice: 'Includes statutory ROC forms filing fee & DIR-3 KYC for 2 directors',
        turnaroundTime: '7 - 10 Working Days',
        popular: true,
        documentsNeeded: [
          'Audited Balance Sheet & Profit & Loss Statement',
          'Auditor Report & Directors Report',
          'Notice of Annual General Meeting (AGM)',
          'Director PAN & DIN for KYC verification'
        ],
        processSteps: [
          'Preparation of Directors Report and AGM documentation',
          'Form AOC-4 financial statement preparation and XBRL/e-Filing',
          'Form MGT-7 annual return drafting and secretarial check',
          'DIR-3 KYC verification for all directors',
          'ROC SRN receipts delivery'
        ],
        packages: [
          {
            name: 'Complete Annual ROC Package',
            price: 11999,
            description: 'Covers mandatory annual filings for small Private Limited companies.',
            features: [
              'Preparation of Directors Report & Notice',
              'Filing of Form AOC-4 (Financials)',
              'Filing of Form MGT-7 / 7A (Annual Return)',
              'Annual DIR-3 KYC for 2 Directors',
              'Statutory registers update'
            ]
          }
        ]
      },
      {
        id: 'itr-filing',
        name: 'Income Tax Return (ITR) Filing',
        category: 'Tax & Annual Compliance',
        shortDesc: 'ITR-1 to ITR-6 filing for salaried individuals, professionals, firms, and corporations.',
        fullDesc: 'Maximize tax refunds and optimize deductions (80C, 80D, 80G, home loan interest, capital gains) with verified CA assisted ITR filing.',
        priceStarting: 1499,
        govFeeNotice: 'Filing on modern Income Tax 2.0 portal with e-Verification assistance',
        turnaroundTime: '24 - 48 Hours',
        documentsNeeded: [
          'Form 16 / Form 16A / Form 26AS / AIS / TIS',
          'Bank Statements for the financial year',
          'Capital gains statement (from Zerodha, Groww, Upstox, etc.)'
        ],
        processSteps: [
          'Tax computation and deduction optimization',
          'Draft tax return shared with client for approval',
          'Final XML/JSON filing on e-Portal',
          'ITR-V acknowledgment and refund tracking'
        ],
        packages: [
          {
            name: 'Salaried & Freelancers (ITR-1 / 4)',
            price: 1499,
            description: 'Salary, single house property, interest, and presumptive business.',
            features: [
              'Form 16 & AIS/TIS Reconciliation',
              'Section 80 Deductions optimization',
              'ITR-1 / ITR-4 CA verified filing',
              'Instant ITR-V Acknowledgment'
            ]
          },
          {
            name: 'Capital Gains & F&O Traders (ITR-2 / 3)',
            price: 3499,
            description: 'For stock trading, crypto, multiple properties, and business income.',
            features: [
              'F&O / Intraday turnover calculation',
              'Capital gains computation with indexation',
              'Loss carry-forward claim',
              'Senior Tax CA Consultation'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'legal',
    title: 'Legal Drafting & Agreements',
    icon: 'ScrollText',
    tagline: 'Ironclad contracts customized by Indian corporate lawyers to protect your equity and assets.',
    services: [
      {
        id: 'founders-agr',
        name: 'Founders Agreement & Equity Vesting',
        category: 'Legal Drafting & Agreements',
        shortDesc: 'Crucial for co-founders to define roles, equity split, 4-year vesting schedule, and exit clauses.',
        fullDesc: 'A Founders Agreement prevents future co-founder disputes by legally outlining sweat equity, reverse vesting, intellectual property assignment, decision-making thresholds, and dispute resolution mechanisms.',
        priceStarting: 4499,
        govFeeNotice: 'Custom drafted by startup corporate advocates',
        turnaroundTime: '3 - 4 Working Days',
        documentsNeeded: [
          'Names and stakes of co-founders',
          'Proposed vesting period (standard 4-year with 1-year cliff)',
          'Roles, responsibilities, and IP transfer terms'
        ],
        processSteps: [
          'Consultation call with Corporate Lawyer',
          'First draft delivery in 48 hours',
          'Up to 2 rounds of revisions',
          'Final execution-ready copy with stamp paper guidance'
        ],
        packages: [
          {
            name: 'Startup Founders Pact',
            price: 4499,
            description: 'Complete vesting, IP assignment, and exit terms.',
            features: [
              'Reverse Vesting & Cliff Schedule',
              'IP Assignment to Entity clause',
              'Non-Compete and Confidentiality clauses',
              'Lawyer consultation call included'
            ]
          }
        ]
      },
      {
        id: 'nda',
        name: 'Non-Disclosure Agreement (NDA)',
        category: 'Legal Drafting & Agreements',
        shortDesc: 'Unilateral or bilateral NDA to protect trade secrets, pitch decks, and source code.',
        fullDesc: 'Protect your proprietary tech, customer lists, and financial figures before pitching to investors, hiring senior staff, or engaging external vendors.',
        priceStarting: 1999,
        govFeeNotice: 'Drafted in adherence with Indian Contract Act 1872',
        turnaroundTime: '24 Hours',
        documentsNeeded: ['Disclosing and Receiving party details', 'Scope of confidential information'],
        processSteps: ['Requirement review', 'Customized drafting', 'Instant delivery in Word and PDF'],
        packages: [
          {
            name: 'Standard Bilateral NDA',
            price: 1999,
            description: 'Mutual non-disclosure with strict remedy clauses.',
            features: [
              'Customized definition of Confidential Information',
              'Injunctive relief & liquidated damages clauses',
              'Non-Solicitation protections',
              'Unlimited revisions within 7 days'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'accounting',
    title: 'Cloud Accounting & Virtual CFO',
    icon: 'LineChart',
    tagline: 'Tech-driven bookkeeping, automated invoicing, MIS reporting, and part-time CFO leadership.',
    services: [
      {
        id: 'virtual-cfo',
        name: 'Virtual CFO Services',
        category: 'Cloud Accounting & Virtual CFO',
        shortDesc: 'Strategic financial leadership, cash flow budgeting, investor reporting, and board pack preparation.',
        fullDesc: 'Hire an experienced CFO without the cost of a full-time executive salary (₹40L+). Our Virtual CFO team oversees financial strategy, burn rate optimization, compliance audits, and unit economics.',
        priceStarting: 19999,
        govFeeNotice: 'Monthly retainer billed quarterly. Includes dedicated Partner-level CA.',
        turnaroundTime: 'Continuous Monthly Engagement',
        popular: true,
        documentsNeeded: [
          'Current P&L, Balance Sheet, and Bank Statements',
          'Payroll registers and monthly overhead details'
        ],
        processSteps: [
          'Financial diagnostic and KPI dashboard setup',
          'Weekly cash flow forecasting',
          'Monthly MIS presentation to founders/board',
          'Strategic tax and fundraising advisory'
        ],
        packages: [
          {
            name: 'Growth Stage Virtual CFO',
            price: 19999,
            description: 'For startups generating ₹10L - ₹50L monthly revenue.',
            features: [
              'Monthly MIS & Unit Economics review',
              'Cash Burn & Runway Monitoring',
              'Bi-weekly advisory calls with Senior Partner CA',
              'Cap table & ESOP pool management',
              'Vendor contract financial vetting'
            ]
          }
        ]
      },
      {
        id: 'cloud-erp',
        name: 'ASAW Books Cloud Accounting & Invoicing',
        category: 'Cloud Accounting & Virtual CFO',
        shortDesc: 'Automated GST billing, e-Invoicing, e-Way bill generation, bank feed sync, and ledger accounting.',
        fullDesc: 'IndiaFilings-style all-in-one financial operating system built specifically for Indian MSMEs and startups. Create professional GST compliant invoices, sync bank statements, and file GST directly.',
        priceStarting: 499,
        govFeeNotice: 'Cloud SaaS subscription with free mobile app access',
        turnaroundTime: 'Instant Access',
        documentsNeeded: ['GSTIN and company logo for invoice customization'],
        processSteps: ['Instant signup', 'Setup company profile', 'Start sending GST invoices'],
        packages: [
          {
            name: 'ASAW Books Pro',
            price: 499,
            description: 'Per month billed annually.',
            features: [
              'Unlimited GST Invoices & Estimates',
              'Direct e-Way Bill & e-Invoice generation',
              'Automated payment reminders via WhatsApp/Email',
              'Real-time GSTR-1 export'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'digital',
    title: 'Website & Automation',
    icon: 'Code2',
    tagline: 'Custom website development, workflow automations, and modern digital infrastructure.',
    services: [
      {
        id: 'website-dev',
        name: 'Website Development',
        category: 'Website & Automation',
        shortDesc: 'Modern, high-converting websites, corporate landing pages, portals, and e-commerce platforms.',
        fullDesc: 'End-to-end modern web design and full-stack development engineered for speed, SEO excellence, and conversion. Built with React, Next.js, or modern CMS engines, fully mobile-responsive with domain setup, SSL, payment gateway integration (Razorpay/Stripe), CRM connection, and client CMS.',
        priceStarting: 14999,
        govFeeNotice: 'Includes 1-Year Free Domain, Managed SSL Certificate, Hosting Setup & SEO Optimization',
        turnaroundTime: '5 - 10 Working Days',
        popular: true,
        documentsNeeded: [
          'Company Brand Logo & Color Guidelines',
          'Business Content, Copy & High-Res Product/Service Photos',
          'Domain Registrar / DNS Access (or new domain preference)',
          'Payment Gateway & Contact Form Email Credentials'
        ],
        processSteps: [
          'Requirement discovery, wireframing & UI/UX layout approval',
          'Responsive frontend development with Tailwind CSS & animations',
          'Backend API integration, forms, and Razorpay payment gateway',
          'On-page SEO setup, meta tags, and Google Search Console configuration',
          'Final cross-device QA, SSL deployment, and client handover'
        ],
        packages: [
          {
            name: 'Startup Launchpad Site',
            price: 14999,
            description: '5-Page lightning-fast corporate website with contact forms and mobile responsiveness.',
            features: [
              'Up to 5 Custom Responsive Pages',
              'Free Domain & SSL Configuration',
              'Contact Forms with Email & WhatsApp Lead Alerts',
              'On-Page SEO & Google Search Console Setup',
              'Social Media & Google Map Integration',
              '1 Month Complimentary Support'
            ]
          },
          {
            name: 'Growth Business Portal',
            price: 24999,
            description: 'Comprehensive business portal with CMS, blog, and payment gateway integration.',
            features: [
              'Up to 10 Pages with Dynamic CMS for Self-Edits',
              'Razorpay / Stripe Payment Integration',
              'Interactive Service Calculators & Quote Builders',
              'Speed Optimization (90+ Google PageSpeed Score)',
              'CRM / Google Sheets Lead Sync Automation',
              '3 Months Dedicated Maintenance'
            ]
          },
          {
            name: 'Enterprise Full-Stack / E-Commerce',
            price: 44999,
            description: 'Custom e-commerce or SaaS web application with auth and database.',
            features: [
              'Custom Full-Stack Web App (React / Node / PostgreSQL)',
              'User Authentication & Secure Customer Dashboard',
              'E-Commerce Catalog, Cart & Automated Invoicing',
              'n8n / Zapier Automated Event Webhooks',
              'Advanced Security & Cloudflare DDoS Shield',
              '6 Months Priority SLA Support'
            ]
          }
        ]
      },
      {
        id: 'automation-dev',
        name: 'Automation Development',
        category: 'Website & Automation',
        shortDesc: 'Automate business operations, n8n workflows, CRM integration, and customer communications.',
        fullDesc: 'Eliminate repetitive manual tasks, human data-entry errors, and delayed follow-ups with enterprise-grade business automation. We architect custom n8n workflows, API connectors, WhatsApp notification bots, automated invoice generators, and bi-directional CRM syncing to run your operations hands-free.',
        priceStarting: 19999,
        govFeeNotice: 'Includes Workflow Architecture Design, Webhook Configuration & Error Handling Monitoring',
        turnaroundTime: '7 - 14 Working Days',
        popular: true,
        documentsNeeded: [
          'Detailed SOPs or Step-by-Step Current Process Flowchart',
          'API Credentials for Integrated Tools (CRM, WhatsApp, ERP, Sheets)',
          'Notification Message Templates & Triggers Definition',
          'Sample Data Inputs & Expected Output Formats'
        ],
        processSteps: [
          'Process audit & automation blueprint design',
          'n8n / webhook flow development and API integrations',
          'Automated data validation, transformations & error logging',
          'End-to-end sandbox testing under edge-case conditions',
          'Production rollout, monitoring alerts, and staff walkthrough'
        ],
        packages: [
          {
            name: 'Essential Workflow Pack',
            price: 19999,
            description: 'Automate up to 3 core business pipelines (e.g. Lead to CRM to WhatsApp).',
            features: [
              'Up to 3 Custom n8n Automation Workflows',
              'Instant WhatsApp & Email Lead Alerts to Sales Team',
              'Google Sheets / Notion / CRM Real-Time Sync',
              'Automatic Welcome & Acknowledgement Messages',
              'Error Alert Notifications to Admin',
              'Complete Workflow Documentation'
            ]
          },
          {
            name: 'Advanced Business Ops Pack',
            price: 34999,
            description: 'Full-cycle client onboarding, document generation, and billing pipeline.',
            features: [
              'Up to 7 Multi-Step Automated Workflows',
              'Automated PDF Invoice & Agreement Generation',
              'Razorpay Payment Webhook to Accounting Sync',
              'Customer Lifecycle WhatsApp Sequence Automation',
              'Multi-Branch & Team Routing Logic',
              'Dedicated n8n Self-Hosted or Cloud Instance Setup'
            ]
          },
          {
            name: 'Enterprise Automation Engine',
            price: 59999,
            description: 'Custom microservice automations with AI agent processing and high-volume queues.',
            features: [
              'Unlimited Workflows with Failover Queues (BullMQ / Redis)',
              'Gemini AI Document Parsing & Auto-Classification',
              'Bi-Directional ERP (Tally / Zoho / SAP) Sync',
              'Custom Webhook Endpoints & REST Microservices',
              '24/7 Health Monitoring & SLA Guarantee',
              'Dedicated Automation Architect Consultation'
            ]
          }
        ]
      }
    ]
  }
];

export const ALL_SERVICES = SERVICE_CATEGORIES.flatMap(cat => cat.services);

export const SAMPLE_ORDERS: Record<string, OrderStatus> = {
  'ASAW-8921-PVT': {
    orderId: 'ASAW-8921-PVT',
    clientName: 'Aditya Deshmukh',
    companyName: 'Nexora AI Technologies Private Limited',
    serviceName: 'Private Limited Company Registration',
    filingDate: '02 Nov 2026',
    targetDate: '12 Nov 2026',
    currentStage: 3,
    assignedExpert: {
      name: 'CA Rajeshwari Sharma',
      designation: 'Senior Manager - Corporate Structuring & MCA',
      phone: '+91 94159 94473',
      email: 'asawconsultancy@gmail.com'
    },
    stages: [
      {
        title: 'Document & KYC Verification',
        desc: 'All Director PAN, Aadhaar, and registered office utility bills verified by compliance team.',
        date: '02 Nov 2026',
        status: 'completed'
      },
      {
        title: 'Name Reservation (SPICe+ Part A)',
        desc: 'Proposed name "Nexora AI Technologies" approved by Ministry of Corporate Affairs ROC Central.',
        date: '05 Nov 2026',
        status: 'completed'
      },
      {
        title: 'SPICe+ Part B & DSC Signing',
        desc: 'Digital signatures affixed. Form SPICe+ Part B submitted with MCA along with e-MoA, e-AoA, and EPFO/ESIC registrations.',
        date: '08 Nov 2026',
        status: 'current'
      },
      {
        title: 'ROC Approval & CIN Issuance',
        desc: 'Final Certificate of Incorporation with Corporate Identity Number (CIN), Company PAN, and TAN generation.',
        status: 'pending'
      }
    ]
  },
  'ASAW-4412-GST': {
    orderId: 'ASAW-4412-GST',
    clientName: 'Sunita Rao',
    companyName: 'Aura Organic Retail',
    serviceName: 'GST Registration Online',
    filingDate: '06 Nov 2026',
    targetDate: '11 Nov 2026',
    currentStage: 2,
    assignedExpert: {
      name: 'CS Vignesh Kumar',
      designation: 'Lead Associate - Indirect Taxes & GST',
      phone: '+91 94159 94473',
      email: 'asawconsultancy@gmail.com'
    },
    stages: [
      {
        title: 'Application Preparation & HSN Code Review',
        desc: 'Documents uploaded, electricity bill validated, and principal place of business mapped.',
        date: '06 Nov 2026',
        status: 'completed'
      },
      {
        title: 'Aadhaar Biometric e-KYC Completed',
        desc: 'Authorized signatory Aadhaar authentication successful. Application Reference Number (ARN) generated.',
        date: '08 Nov 2026',
        status: 'current'
      },
      {
        title: 'GST Officer Review & Verification',
        desc: 'Jurisdictional tax officer reviewing application. Zero queries or notice so far.',
        status: 'pending'
      },
      {
        title: 'GSTIN Certificate Issued',
        desc: 'Official 15-digit GSTIN Certificate (Form GST REG-06) ready for download.',
        status: 'pending'
      }
    ]
  },
  'ASAW-6530-TM': {
    orderId: 'ASAW-6530-TM',
    clientName: 'Rohit Verma',
    companyName: 'KwikPay Fintech',
    serviceName: 'Trademark Registration Online (Class 36)',
    filingDate: '01 Nov 2026',
    targetDate: '04 Nov 2026',
    currentStage: 4,
    assignedExpert: {
      name: 'Adv. Meenakshi Sundaram',
      designation: 'Head of Intellectual Property Practice',
      phone: '+91 94159 94473',
      email: 'asawconsultancy@gmail.com'
    },
    stages: [
      {
        title: 'Conflict Search Report',
        desc: 'Pre-filing trademark search cleared across Class 36 with 0 direct phonetic conflicts.',
        date: '01 Nov 2026',
        status: 'completed'
      },
      {
        title: 'TM-48 Power of Attorney Execution',
        desc: 'Legal authorization signed and attested.',
        date: '02 Nov 2026',
        status: 'completed'
      },
      {
        title: 'Filing with Trademark Registry (IP India)',
        desc: 'Application successfully submitted online. Government fee paid under MSME quota.',
        date: '03 Nov 2026',
        status: 'completed'
      },
      {
        title: '™ Number Allotted & Protection Live',
        desc: 'Application No: 5932184 issued. Client legally authorized to display ™ symbol on brand collateral.',
        date: '04 Nov 2026',
        status: 'completed'
      }
    ]
  }
};

export interface ClientPartner {
  id: string;
  name: string;
  category: string;
  tagline: string;
  badge?: string;
  featured?: boolean;
}

export const CLIENT_PARTNERS: ClientPartner[] = [
  {
    id: 'dt-webautomation',
    name: 'DT.WebAutomation',
    category: 'Automation & Web Engineering',
    tagline: 'Leading automation agency accelerating digital workflows & web infrastructure',
    badge: 'Premier Client Partner',
    featured: true
  },
  {
    id: 'logipulse',
    name: 'LogiPulse Freight Tech',
    category: 'Supply Chain & Logistics',
    tagline: 'Tech-enabled pan-India logistics network',
  },
  {
    id: 'nutriroots',
    name: 'NutriRoots Superfoods',
    category: 'D2C Consumer Brand',
    tagline: 'Premium organic foods & nutritional products',
  },
  {
    id: 'apex-eng',
    name: 'Apex Precision Engineering',
    category: 'Advanced Manufacturing',
    tagline: 'Industrial components & robotic tooling',
  },
  {
    id: 'cloudsphere',
    name: 'CloudSphere Solutions',
    category: 'Enterprise SaaS',
    tagline: 'Global multi-cloud billing & infrastructure',
  }
];

export const REVIEWS: Testimonial[] = [
  {
    id: 'rev-dt-webautomation',
    name: 'Devansh Tiwari',
    role: 'Founder & CTO',
    company: 'DT.WebAutomation',
    city: 'Automation & AI Solutions',
    rating: 5,
    serviceUsed: 'Website Development, Automation Development & Corporate Advisory',
    comment: 'ASAW Consultancy provided unparalleled speed in streamlining our digital presence and corporate architecture. Their Website Development and Automation Development solutions automated our client intake workflows and reduced operational friction by 80%. Truly world-class legal and automation partners for DT.WebAutomation!',
    date: '02 Nov 2026'
  },
  {
    id: 'rev-1',
    name: 'Karan Mehra',
    role: 'Co-Founder & CEO',
    company: 'LogiPulse Freight Tech',
    city: 'Technology Sector',
    rating: 5,
    serviceUsed: 'Private Limited Company + Fast-track GST',
    comment: 'We needed our Private Limited incorporated urgently for our seed round. ASAW Consultancy delivered our CIN, PAN, TAN, and GST certificate in just 8 days! CA Rajeshwari and her team were accessible even at 8 PM to clarify MoA clauses. Extraordinary service compared to traditional CA firms.',
    date: '28 Oct 2026'
  },
  {
    id: 'rev-2',
    name: 'Priyanka Iyer',
    role: 'Founder',
    company: 'NutriRoots Superfoods',
    city: 'D2C Brand',
    rating: 5,
    serviceUsed: 'FSSAI State License & Trademark Registration',
    comment: 'Getting our FSSAI state manufacturing license and Trademark registered was seamless. The transparent pricing and zero hidden fees made ASAW Consultancy our go-to partner. We now use their monthly GST return filing service as well.',
    date: '15 Oct 2026'
  },
  {
    id: 'rev-3',
    name: 'Anand Singhania',
    role: 'Managing Director',
    company: 'Apex Precision Engineering LLP',
    city: 'Manufacturing & Engineering',
    rating: 5,
    serviceUsed: 'LLP Incorporation + ROC Annual Filings',
    comment: 'Switching our corporate filings from our local CA to ASAW Consultancy was the best decision. Their real-time order tracker and automated compliance calendar mean we never face ROC late penalty notices.',
    date: '04 Oct 2026'
  },
  {
    id: 'rev-4',
    name: 'Harpreet Singh',
    role: 'Managing Partner',
    company: 'CloudSphere Solutions',
    city: 'SaaS Enterprise',
    rating: 5,
    serviceUsed: 'US Delaware LLC + DGFT Import Export Code',
    comment: 'Helped us establish our US entity for global SaaS billing along with Mercury bank account setup. Their international legal desk is top notch. Highly recommend ASAW Consultancy to any ambitious Indian founder.',
    date: '22 Sep 2026'
  }
];

export const HEADQUARTERS_INFO: HeadquartersInfo = {
  name: 'ASAW Consultancy Services',
  headquarters: 'Near Ram Katha Park, Gomti Nagar, Lucknow, Uttar Pradesh, India',
  phone: '+91 94159 94473',
  email: 'asawconsultancy@gmail.com',
  timing: 'Mon - Sat: 9:00 AM - 7:30 PM (IST)'
};


export const FAQS = [
  {
    q: 'Why should I choose ASAW Consultancy over a traditional local CA?',
    a: 'ASAW Consultancy combines experienced in-house Chartered Accountants (CAs), Company Secretaries (CSs), and corporate lawyers with cutting-edge cloud technology. You get 100% transparent pricing (no surprise billing), automated status tracking via SMS/WhatsApp, guaranteed SLAs, digitized document storage, and dedicated relationship managers available 6 days a week.'
  },
  {
    q: 'How long does Private Limited Company Registration take in India?',
    a: 'With ASAW Consultancy, the end-to-end incorporation process typically takes 7 to 10 working days, subject to MCA ROC processing speeds. This includes Digital Signature (DSC) issuance, Name Reservation in RUN/SPICe+ Part A, drafting of e-MoA and e-AoA, and final Certificate of Incorporation (CIN) along with PAN and TAN.'
  },
  {
    q: 'Is physical presence required anywhere during company registration or GST?',
    a: 'No. The entire process with ASAW Consultancy is 100% online and paperless. You can upload scanned copies of your KYC documents (PAN, Aadhaar, bank statement, electricity bill) from your phone or laptop. Our team handles all MCA portal submissions, DSC issuance, and officer clarifications remotely.'
  },
  {
    q: 'What are the government fees for registering a company in India?',
    a: 'Under the Ministry of Corporate Affairs (MCA) SPICe+ initiative, zero government ROC filing fee is charged for incorporation with authorized capital up to ₹15 Lakhs for small companies. Only state-specific stamp duty on the MoA, AoA, and SPICe+ forms is payable to the respective state government (ranging between ₹1,000 to ₹5,000 depending on the state).'
  },
  {
    q: 'When is GST Registration mandatory for a business?',
    a: 'GST registration is legally mandatory if your annual aggregate turnover exceeds ₹40 Lakhs (for businesses exclusively trading goods) or ₹20 Lakhs (for service providers). It is also compulsory regardless of turnover for businesses making interstate sales, selling through e-commerce marketplaces (Amazon, Flipkart), or exporting services.'
  },
  {
    q: 'What is the difference between ™ and ® symbols for trademarks?',
    a: 'You can legally display the ™ symbol immediately once ASAW Consultancy files your application with the Indian Trademark Registry (usually within 24 hours of receiving documents). The registered ® symbol can only be displayed once the Registrar of Trademarks officially examines, advertises, and issues the Trademark Registration Certificate.'
  }
];

export const STATE_STAMP_DUTY_RATES: Record<string, { baseDuty: number; stampRatePerLakh: number }> = {
  'Karnataka': { baseDuty: 1500, stampRatePerLakh: 120 },
  'Maharashtra': { baseDuty: 2000, stampRatePerLakh: 150 },
  'Delhi': { baseDuty: 1200, stampRatePerLakh: 100 },
  'Tamil Nadu': { baseDuty: 1400, stampRatePerLakh: 110 },
  'Telangana': { baseDuty: 1600, stampRatePerLakh: 130 },
  'Gujarat': { baseDuty: 1300, stampRatePerLakh: 110 },
  'Uttar Pradesh': { baseDuty: 1800, stampRatePerLakh: 140 },
  'Haryana': { baseDuty: 1200, stampRatePerLakh: 100 },
  'West Bengal': { baseDuty: 1700, stampRatePerLakh: 130 },
  'Rajasthan': { baseDuty: 1500, stampRatePerLakh: 120 },
  'Kerala': { baseDuty: 1900, stampRatePerLakh: 140 },
  'Madhya Pradesh': { baseDuty: 1600, stampRatePerLakh: 125 }
};
