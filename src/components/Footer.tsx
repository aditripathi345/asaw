import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  ExternalLink,
  Lock,
  CreditCard
} from 'lucide-react';
import { ALL_SERVICES } from '../data/servicesData';
import { ServiceItem } from '../types';

interface FooterProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenOrderTracker: () => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectService,
  onOpenOrderTracker,
  onOpenConsultation
}) => {
  const findSvc = (id: string) => ALL_SERVICES.find(s => s.id === id);

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs">
      {/* Top Banner / Helpline strip */}
      <div className="border-b border-slate-900 bg-slate-900/60 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-extrabold text-xl">
              A
            </div>
            <div>
              <div className="text-white font-extrabold text-sm tracking-tight">
                ASAW CONSULTANCY SERVICES
              </div>
              <div className="text-slate-400 text-[11px]">
                Headquarters: Near Ram Katha Park, Gomti Nagar, Lucknow, Uttar Pradesh, India
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a href="tel:+919415994473" className="flex items-center gap-1.5 text-white hover:text-amber-400 font-semibold transition-colors">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+91 94159 94473</span>
            </a>
            <span className="text-slate-700">|</span>
            <a href="mailto:asawconsultancy@gmail.com" className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>asawconsultancy@gmail.com</span>
            </a>
            <span className="text-slate-700">|</span>
            <button
              onClick={onOpenOrderTracker}
              className="text-amber-400 hover:underline font-semibold cursor-pointer"
            >
              Track Application Status
            </button>
          </div>
        </div>
      </div>

      {/* Main Directory Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Startups & Incorporation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Start a Business
            </h4>
            <ul className="space-y-2">
              {[
                { id: 'pvt-ltd', label: 'Private Limited Company' },
                { id: 'llp', label: 'LLP Registration' },
                { id: 'opc', label: 'One Person Company' },
                { id: 'section-8', label: 'Section 8 NGO' },
                { id: 'us-company', label: 'US Delaware LLC' }
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      const svc = findSvc(item.id);
                      if (svc) onSelectService(svc);
                    }}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Registrations & Licenses */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Govt Registrations
            </h4>
            <ul className="space-y-2">
              {[
                { id: 'gst-reg', label: 'GST Registration' },
                { id: 'fssai', label: 'FSSAI Food License' },
                { id: 'msme', label: 'MSME / Udyam Certificate' },
                { id: 'iec', label: 'Import Export Code (IEC)' }
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      const svc = findSvc(item.id);
                      if (svc) onSelectService(svc);
                    }}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li><span className="text-slate-500">Digital Signature (DSC Class 3)</span></li>
              <li><span className="text-slate-500">Shop &amp; Establishment Act</span></li>
            </ul>
          </div>

          {/* Column 3: Tax & ROC Compliance */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Tax &amp; Annual Filings
            </h4>
            <ul className="space-y-2">
              {[
                { id: 'gst-return', label: 'GST Return Filing' },
                { id: 'mca-annual', label: 'Annual ROC Compliance' },
                { id: 'itr-filing', label: 'Income Tax Return (ITR)' }
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      const svc = findSvc(item.id);
                      if (svc) onSelectService(svc);
                    }}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li><span className="text-slate-500">TDS Return Filing</span></li>
              <li><span className="text-slate-500">Director KYC (DIR-3)</span></li>
              <li><span className="text-slate-500">Secretarial Audit</span></li>
            </ul>
          </div>

          {/* Column 4: Trademark & Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Trademark &amp; Legal
            </h4>
            <ul className="space-y-2">
              {[
                { id: 'tm-reg', label: 'Trademark Registration' },
                { id: 'tm-objection', label: 'Trademark Objection Reply' },
                { id: 'copyright', label: 'Copyright Registration' },
                { id: 'founders-agr', label: 'Founders Agreement' },
                { id: 'nda', label: 'Non-Disclosure Agreement' }
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      const svc = findSvc(item.id);
                      if (svc) onSelectService(svc);
                    }}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li><span className="text-slate-500">Patent Search &amp; Filing</span></li>
            </ul>
          </div>

          {/* Column 5: Platform & ERP */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              ASAW Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="tel:+919415994473" className="text-amber-400 hover:underline cursor-pointer flex items-center gap-1">
                  <span>Talk to Senior CA (+91 94159 94473)</span>
                </a>
              </li>
              <li>
                <button onClick={onOpenOrderTracker} className="hover:text-white cursor-pointer">
                  Track Application
                </button>
              </li>
              <li><a href="#calculator" className="hover:text-white">Govt Fee Calculator</a></li>
              <li><a href="#headquarters" className="text-blue-400 hover:underline">Headquarters: Ram Katha Park, Gomti Nagar</a></li>
              <li><span className="text-slate-500">Website &amp; Automation Desk</span></li>
              <li><span className="text-slate-500">ASAW Books Cloud ERP</span></li>
              <li><span className="text-slate-500">Partner CA Network</span></li>
            </ul>
          </div>

        </div>

        {/* Security and Payment Badges */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-slate-500 text-[11px] flex-wrap justify-center">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit SSL Encrypted Vault</span>
            </div>
            <span>·</span>
            <span>PCI-DSS Level 1 Compliant</span>
            <span>·</span>
            <span>MCA Authorized E-Filing Gateway</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <span className="text-[11px] text-slate-500">Accepted Payments:</span>
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded font-bold text-slate-300 text-[10px]">UPI</span>
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded font-bold text-slate-300 text-[10px]">NetBanking</span>
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded font-bold text-slate-300 text-[10px]">Razorpay</span>
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded font-bold text-slate-300 text-[10px]">Cards</span>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-900 text-[11px] text-slate-600 leading-relaxed space-y-2">
          <p>
            <span className="font-semibold text-slate-500">Disclaimer: </span>
            ASAW Consultancy is a premier corporate legal and financial technology platform owned and operated by ASAW Consultancy Services Private Limited. ASAW Consultancy does not represent itself as a law firm and does not provide legal opinions directly; all corporate filings, secretarial certifications, trademark prosecutions, and statutory audits are rendered in association with independent licensed Advocates, Chartered Accountants (ICAI), and Company Secretaries (ICSI) registered under relevant statutory acts in India.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 pt-2">
            <div>
              © 2026 ASAW Consultancy Services Private Limited. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-slate-400">Terms of Service</a>
              <span>·</span>
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <span>·</span>
              <a href="#" className="hover:text-slate-400">Refund Policy &amp; SLA</a>
              <span>·</span>
              <a href="#" className="hover:text-slate-400">Security</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
