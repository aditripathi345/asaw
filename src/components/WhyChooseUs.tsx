import React from 'react';
import { 
  Check, 
  X, 
  ShieldCheck, 
  Clock, 
  Users, 
  Smartphone, 
  FileCheck2,
  Lock,
  Headphones
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 bg-[#f8fafc] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-blue-700 tracking-wider uppercase mb-2">
            The New Standard in Legal Technology
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why 14,000+ Entrepreneurs Choose ASAW Consultancy
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Compare our cloud platform and guaranteed turnaround times against outdated traditional accounting practices.
          </p>
        </div>

        {/* Comparison Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="py-4 px-6 font-bold text-slate-700 w-2/5">
                    Service Feature &amp; Capability
                  </th>
                  <th className="py-4 px-6 font-extrabold text-blue-800 bg-blue-50/50 w-3/10 text-center border-x border-blue-100">
                    <span className="text-sm">ASAW Consultancy</span>
                    <div className="text-[10px] text-blue-600 font-semibold uppercase">Cloud Platform</div>
                  </th>
                  <th className="py-4 px-6 font-semibold text-slate-500 w-3/10 text-center">
                    Traditional Local CA Office
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    feature: 'Turnaround Time for Company CIN',
                    asaw: '7 - 10 Working Days (Guaranteed SLA)',
                    trad: '30 to 45 Days with frequent delays',
                    asawPositive: true
                  },
                  {
                    feature: 'Pricing Transparency',
                    asaw: '100% Fixed upfront fee, zero hidden add-ons',
                    trad: 'Vague initial quote, surprise bills later',
                    asawPositive: true
                  },
                  {
                    feature: 'Application Tracking',
                    asaw: 'Live 24x7 web tracker & WhatsApp updates',
                    trad: 'Manual follow-ups over repeated phone calls',
                    asawPositive: true
                  },
                  {
                    feature: 'Physical Visits Required',
                    asaw: 'Zero visits. 100% Paperless & digital KYC',
                    trad: 'Multiple physical visits to sign paperwork',
                    asawPositive: true
                  },
                  {
                    feature: 'Expert Oversight',
                    asaw: 'Dual verification by Senior CA & CS',
                    trad: 'Often outsourced to junior trainees',
                    asawPositive: true
                  },
                  {
                    feature: 'Cloud ERP & Invoicing Tool',
                    asaw: 'Free 1-Year access to ASAW Books',
                    trad: 'Extra charge for accounting software',
                    asawPositive: true
                  },
                  {
                    feature: 'Compliance Penalty Protection',
                    asaw: 'Automated MCA & GST deadline alerts',
                    trad: 'Risk of ₹100/day ROC late penalties',
                    asawPositive: true
                  }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-slate-800">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-6 text-center bg-blue-50/30 border-x border-blue-100 font-semibold text-blue-950">
                      <div className="flex items-center justify-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{row.asaw}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{row.trad}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              ISO 9001:2015 Certified
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every process follows audited quality standards with strict confidentiality under non-disclosure governance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Guaranteed Filing SLAs
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our 500+ in-house professionals adhere to strict ministry turnaround deadlines or you get service credit refunds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Bank-Grade Data Vault
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All promoter PAN, Aadhaar, and financial records are secured with 256-bit SSL encryption and strict role permissions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Dedicated Account Manager
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct telephone and WhatsApp line to your assigned compliance specialist 6 days a week from 9 AM to 7:30 PM.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
