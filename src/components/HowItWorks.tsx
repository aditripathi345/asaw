import React, { useState } from 'react';
import { 
  FileCheck, 
  UserCheck, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Building,
  Clock
} from 'lucide-react';

interface HowItWorksProps {
  onOpenConsultation: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenConsultation }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Submit Basic Info & Upload KYC',
      duration: '10 Minutes Online',
      desc: 'Fill our simple online questionnaire and upload scanned copies of PAN, Aadhaar, and address proof from your phone or laptop. No notary visits required.',
      details: [
        'End-to-end encrypted document vault',
        'Automatic OCR validation for PAN and Aadhaar',
        'Zero physical presence or travel required'
      ]
    },
    {
      number: '02',
      title: 'Dedicated CA / CS Drafting & MCA Filing',
      duration: '24 - 48 Hours',
      desc: 'Our senior Chartered Accountants and Company Secretaries verify your documents, draft custom MoA/AoA, issue Digital Signatures (DSC), and file with the MCA / GST department.',
      details: [
        'Personal CA assigned within 15 minutes of booking',
        'Real-time SMS & WhatsApp milestone updates',
        'Direct handling of all ministry queries & clarifications'
      ]
    },
    {
      number: '03',
      title: 'Certificate Issuance & Account Opening',
      duration: 'Delivery in 7 - 10 Days',
      desc: 'Receive your Certificate of Incorporation (CIN), Company PAN, TAN, and official GSTIN directly in your email. We also provide zero-balance corporate bank account assistance.',
      details: [
        'Government verifiable digital certificates with QR code',
        'Instant authorization to bill customers and open bank account',
        '1-Year Free compliance calendar & tax reminders'
      ]
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-blue-700 tracking-wider uppercase mb-2">
            Seamless 100% Online Experience
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How ASAW Consultancy Works in 3 Simple Steps
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            From initial document submission to final government certificate delivery, experience a transparent, cloud-first legal workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Steps Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-50/50 border-blue-300 shadow-sm ring-1 ring-blue-500/20'
                      : 'bg-[#f8fafc] border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 transition-colors ${
                      isActive ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {step.number}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h3 className={`text-base font-bold ${isActive ? 'text-blue-900' : 'text-slate-900'}`}>
                          {step.title}
                        </h3>
                        <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                          {step.duration}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {step.desc}
                      </p>

                      {isActive && (
                        <div className="mt-4 pt-3 border-t border-blue-100 space-y-2 animate-in fade-in">
                          {step.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-2 flex items-center gap-4">
              <a
                href="tel:+919415994473"
                className="px-5 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                title="Call Helpline: +91 94159 94473"
              >
                <span>Talk to an Expert Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Average CA response time: 15 minutes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
              <img
                src="/src/assets/images/service_incorporation_meeting_1794292758149.jpg"
                alt="Professional consultation with ASAW chartered accountant"
                className="w-full h-80 lg:h-96 object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Partner-Led Advisory
                </span>
                <div className="text-base font-bold text-white mt-1">
                  1-on-1 Dedicated Legal &amp; Financial Strategist
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Every business is assigned a qualified Chartered Accountant (CA) or Company Secretary (CS) to review every single form before filing.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
