import React from 'react';
import { Star, CheckCircle, Quote, Sparkles, Building2, Terminal, ShieldCheck, ArrowRight } from 'lucide-react';
import { REVIEWS, CLIENT_PARTNERS } from '../data/servicesData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-bold text-blue-700 tracking-wider uppercase mb-2">
            Trusted by Industry Innovators
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Enterprise Clients &amp; Founder Endorsements
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            From high-growth automation leaders like <span className="font-semibold text-blue-700">DT.WebAutomation</span> to pan-India supply chain enterprises, see how businesses scale securely with ASAW Consultancy.
          </p>
        </div>

        {/* Featured Enterprise Clients Ribbon */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Key Clients &amp; Automation Partners</span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
              100% Verified Corporate Clients
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {CLIENT_PARTNERS.map((client) => {
              const isDT = client.id === 'dt-webautomation';
              return (
                <div
                  key={client.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    isDT
                      ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white border-blue-500 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-slate-50/80 hover:bg-white text-slate-800 border-slate-200/90 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                        isDT 
                          ? 'bg-amber-400 text-slate-950 font-extrabold' 
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {client.badge || 'Verified Client'}
                      </span>
                      {isDT && (
                        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                      )}
                    </div>
                    <div className={`font-extrabold text-sm sm:text-base tracking-tight ${
                      isDT ? 'text-white' : 'text-slate-900'
                    }`}>
                      {client.name}
                    </div>
                    <div className={`text-[11px] font-medium mt-0.5 ${
                      isDT ? 'text-blue-200' : 'text-blue-700'
                    }`}>
                      {client.category}
                    </div>
                  </div>
                  <p className={`text-[11px] mt-2.5 line-clamp-2 leading-relaxed ${
                    isDT ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {client.tagline}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Sub-divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Client Reviews &amp; Case Studies
          </span>
          <div className="h-px bg-slate-200 flex-1" />
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all"
            >
              <div className="space-y-4">
                {/* Rating & Service */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    {rev.serviceUsed}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-5 mt-5 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {rev.role}, <span className="font-semibold text-slate-700">{rev.company}</span>
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-400">
                  <div>{rev.city}</div>
                  <div>{rev.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* External Review Platforms Banner */}
        <div className="mt-10 bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold text-xl font-mono">
              4.9
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Rated 4.9/5 by 2,850+ Indian Businesses
              </div>
              <div className="text-xs text-slate-400">
                Verified reviews across Google, Trustpilot &amp; Startup India Portal
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span>Official MCA Verified Filing Partner</span>
          </div>
        </div>

      </div>
    </section>
  );
};
