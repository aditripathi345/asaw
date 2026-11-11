import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, PhoneCall } from 'lucide-react';
import { FAQS } from '../data/servicesData';

interface FaqSectionProps {
  onOpenConsultation: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenConsultation }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [filterQuery, setFilterQuery] = useState('');

  const filteredFaqs = FAQS.filter(
    f => f.q.toLowerCase().includes(filterQuery.toLowerCase()) || 
         f.a.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-xs font-bold text-blue-700 tracking-wider uppercase mb-2">
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Have Questions About Business Registration in India?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Clear, transparent answers verified by our senior Chartered Accountants and Company Secretaries.
          </p>

          {/* Quick FAQ Search */}
          <div className="mt-6 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search questions (e.g. GST, capital, timeline...)"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-xl transition-all overflow-hidden ${
                    isOpen ? 'border-blue-300 bg-blue-50/20 shadow-2xs' : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-bold text-slate-900">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-700' : ''
                    }`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              No matching questions found. Ask our team directly.
            </div>
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="text-sm font-bold text-slate-900">
              Still have specific questions about your business model?
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Speak directly with an ASAW compliance manager at no cost.
            </p>
          </div>

          <a
            href="tel:+919415994473"
            className="px-5 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
            title="Call Helpline: +91 94159 94473"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Talk to Expert (+91 94159 94473)</span>
          </a>
        </div>

      </div>
    </section>
  );
};
