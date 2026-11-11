import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, MessageSquare, ExternalLink } from 'lucide-react';
import { HEADQUARTERS_INFO } from '../data/servicesData';

export const OfficesSection: React.FC = () => {
  return (
    <section id="headquarters" className="py-16 bg-[#f8fafc] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-blue-700 tracking-wider uppercase mb-2">
            Central Corporate Headquarters
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ASAW Consultancy Services
          </h2>
          <p className="mt-2 text-sm text-slate-700 font-medium">
            Headquarters: <span className="font-bold text-slate-900">{HEADQUARTERS_INFO.headquarters}</span>
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Centrally managing company incorporation, tax compliance, and legal services for businesses across India.
          </p>
        </div>

        {/* Headquarters & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Headquarters Details & Contact Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                  Principal Headquarters
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                  {HEADQUARTERS_INFO.name}
                </h3>
                <div className="flex items-start gap-2.5 text-xs text-slate-700 mt-2">
                  <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900">Headquarters:</span>{' '}
                    <span>{HEADQUARTERS_INFO.headquarters}</span>
                  </div>
                </div>
              </div>

              {/* Verified Contact Details */}
              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Telephone Helpline</div>
                    <a href={`tel:${HEADQUARTERS_INFO.phone}`} className="font-bold text-slate-900 hover:text-blue-700 transition-colors">
                      {HEADQUARTERS_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Official Email</div>
                    <a href={`mailto:${HEADQUARTERS_INFO.email}`} className="font-bold text-slate-900 hover:text-blue-700 transition-colors">
                      {HEADQUARTERS_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Business Hours</div>
                    <div className="font-medium text-slate-800">{HEADQUARTERS_INFO.timing}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Central Operations Hub</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  All compliance review, MCA e-filings, trademark applications, and client advisory services are centrally coordinated from our Gomti Nagar, Lucknow headquarters.
                </p>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2.5">
              <a
                href={`tel:${HEADQUARTERS_INFO.phone}`}
                className="flex-1 min-w-[130px] py-2.5 px-3 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-center transition-colors shadow-2xs"
              >
                Call Office
              </a>
              <a
                href={`mailto:${HEADQUARTERS_INFO.email}`}
                className="flex-1 min-w-[130px] py-2.5 px-3 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-center transition-colors"
              >
                Send Email
              </a>
              <a
                href={`https://wa.me/919415994473?text=Hello%20ASAW%20Consultancy,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Professional Map Section Centered on Ram Katha Park, Gomti Nagar, Lucknow */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            
            {/* Map Top Bar */}
            <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold">
                  Near Ram Katha Park, Gomti Nagar, Lucknow, Uttar Pradesh, India
                </span>
              </div>
              <span className="text-[10px] uppercase font-semibold text-slate-400">
                Headquarters Map
              </span>
            </div>

            {/* Embedded Interactive Map */}
            <div className="relative flex-1 min-h-[320px] sm:min-h-[380px] w-full bg-slate-100">
              <iframe
                title="ASAW Consultancy Services Headquarters - Ram Katha Park, Gomti Nagar, Lucknow"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.933998835641!2d81.00987777523369!3d26.842051476689786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be3549ec50d6d%3A0x81385fd715a57830!2sRam%20Katha%20Park!5e0!3m2!1sen!2sin!4v1794324641448!5m2!1sen!2sin"
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {/* Map Bottom Information Strip */}
            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">Coordinates:</span>
                <span className="font-mono text-slate-700">26.8421° N, 81.0099° E</span>
              </div>
              <div className="text-slate-500 text-[11px]">
                Ram Katha Park, Gomti Nagar · Central operating headquarters
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
