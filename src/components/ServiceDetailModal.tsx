import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  Check, 
  HelpCircle,
  Building,
  PhoneCall
} from 'lucide-react';
import { ServiceItem } from '../types';

import { api } from '../services/apiClient';
import { AnimatedCheckmark } from './AnimatedCheckmark';
import { ToastData } from './SuccessToast';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenConsultation: () => void;
  onShowToast?: (data: ToastData) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onOpenConsultation,
  onShowToast
}) => {
  const [selectedPackageIdx, setSelectedPackageIdx] = useState(0);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantCity, setApplicantCity] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [generatedAppNumber, setGeneratedAppNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!service) return null;

  const currentPkg = service.packages[selectedPackageIdx] || service.packages[0];

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone || !applicantEmail) return;
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await api.submitApplication({
        service_id: service.id,
        applicant_name: applicantName,
        email: applicantEmail,
        phone: applicantPhone,
        business_name: businessName || applicantName + ' Enterprise',
        form_data: {
          package_name: currentPkg.name,
          package_price: currentPkg.price,
          city_state: applicantCity,
          registered_state: applicantCity.includes(',') ? applicantCity.split(',')[1].trim() : 'Uttar Pradesh',
        },
      });

      if (res.success && res.data) {
        setGeneratedAppNumber(res.data.application_number);
        setIsSubmitted(true);
        onShowToast?.({
          title: 'Application Initiated Successfully!',
          message: `${service.name} (${currentPkg.name}) docket created. Our CA team is on it.`,
          referenceNumber: res.data.application_number,
        });
      } else {
        setErrorMessage(res.error || 'Failed to submit application. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error while contacting server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Sticky Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base">
              A
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
                {service.category}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {service.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Top Overview & Government Fee Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-8 space-y-3">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {service.fullDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-slate-900">Timeline:</span>
                  <span>{service.turnaroundTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-900">MCA / Govt:</span>
                  <span>Direct e-Filing</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-amber-50/60 border border-amber-200/70 p-2.5 rounded-lg">
                <span className="font-semibold text-amber-900">Government Fee Notice: </span>
                {service.govFeeNotice}
              </div>
            </div>

            {/* Quick Price Summary Box */}
            <div className="md:col-span-4 bg-blue-50/60 border border-blue-200 rounded-2xl p-5 text-center space-y-3">
              <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
                Starting Package
              </span>
              <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                ₹{service.priceStarting.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-slate-500">
                100% Tax Deductible Professional Fee
              </div>
              <a
                href="tel:+919415994473"
                className="w-full py-2 px-3 text-xs font-semibold text-blue-700 bg-white hover:bg-blue-50 border border-blue-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Call CA Helpline: +91 94159 94473"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Talk to CA (+91 94159 94473)</span>
              </a>
            </div>
          </div>

          {/* Package Selection Tiers (if multiple packages exist) */}
          {service.packages.length > 1 && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Choose Recommended Filing Package
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {service.packages.map((pkg, idx) => {
                  const isSelected = selectedPackageIdx === idx;
                  return (
                    <div
                      key={pkg.name}
                      onClick={() => setSelectedPackageIdx(idx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-500/30'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-bold ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                            {pkg.name}
                          </span>
                          {idx === 1 && (
                            <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                              Best Value
                            </span>
                          )}
                        </div>
                        <div className="text-lg font-black text-slate-900 font-mono tabular-nums">
                          ₹{pkg.price.toLocaleString('en-IN')}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {pkg.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 space-y-1">
                        {pkg.features.map((feat, fIdx) => (
                          <div key={fIdx} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                            <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Documents Checklist & Process Steps Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            
            {/* Documents Needed */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-700" />
                <span>Documents Required from Applicant</span>
              </h4>
              <p className="text-xs text-slate-500">
                Only scanned / digital soft copies required. No physical papers to courier.
              </p>
              <div className="space-y-2 pt-1">
                {service.documentsNeeded.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80">
                    <span className="font-mono text-blue-700 font-bold shrink-0">{idx + 1}.</span>
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>End-to-End Filing Procedure</span>
              </h4>
              <p className="text-xs text-slate-500">
                Managed completely by our in-house compliance lawyers &amp; CAs.
              </p>
              <div className="space-y-2 pt-1">
                {service.processSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Direct Booking / Application Form */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-6 space-y-3 animate-in fade-in">
                <AnimatedCheckmark size="lg" variant="emerald" className="mx-auto" />
                <h4 className="text-lg font-bold text-white">
                  Application Initiated Successfully!
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Reference Order: <span className="font-mono font-bold text-amber-300">{generatedAppNumber || 'ASAW-CONFIRMED'}</span>. Our compliance manager will contact you at <span className="text-white font-medium">{applicantPhone}</span> within 15 minutes.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 px-6 py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer"
                >
                  Close &amp; Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-rose-500/20 border border-rose-500 text-rose-200 rounded-lg text-xs">
                    {errorMessage}
                  </div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-400">
                      Step 1 of 2: Rapid Digital Onboarding
                    </span>
                    <h4 className="text-base font-bold text-white">
                      Start {service.name}
                    </h4>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400">Total Selected Package:</span>
                    <div className="text-xl font-black text-amber-400 font-mono">
                      ₹{currentPkg.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Applicant Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Singhania"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Mobile Number (WhatsApp Enabled) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 text-xs bg-slate-700 border border-r-0 border-slate-700 rounded-l-lg text-slate-300">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-r-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="founder@venture.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      City &amp; State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lucknow, Uttar Pradesh"
                      value={applicantCity}
                      onChange={(e) => setApplicantCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Pay only ₹999 token advance now. Balance payable after name approval.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Reserving Expert CA...</span>
                    ) : (
                      <>
                        <span>Proceed with {currentPkg.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
