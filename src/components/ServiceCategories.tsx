import React, { useState } from 'react';
import { 
  Building2, 
  FileCheck2, 
  ShieldCheck, 
  Calculator, 
  ScrollText, 
  LineChart,
  ArrowRight,
  Clock,
  CheckCircle,
  Sparkles,
  Code2
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/servicesData';
import { ServiceCategory, ServiceItem } from '../types';

interface ServiceCategoriesProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServiceCategories: React.FC<ServiceCategoriesProps> = ({ onSelectService }) => {
  const [activeCategoryId, setActiveCategoryId] = useState('startup');

  const activeCategory = SERVICE_CATEGORIES.find(c => c.id === activeCategoryId) || SERVICE_CATEGORIES[0];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'startup': return <Building2 className="w-4 h-4" />;
      case 'registrations': return <FileCheck2 className="w-4 h-4" />;
      case 'trademark': return <ShieldCheck className="w-4 h-4" />;
      case 'compliance': return <Calculator className="w-4 h-4" />;
      case 'legal': return <ScrollText className="w-4 h-4" />;
      case 'accounting': return <LineChart className="w-4 h-4" />;
      case 'digital': return <Code2 className="w-4 h-4" />;
      default: return <Building2 className="w-4 h-4" />;
    }
  };

  return (
    <section id="services-section" className="py-16 bg-[#f8fafc] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-bold text-blue-700 tracking-wider uppercase mb-2">
            Comprehensive Corporate Solutions
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Everything Your Business Needs to Launch, Grow &amp; Stay Compliant
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Backed by India&apos;s leading platform for corporate registration, tax compliance, intellectual property, and cloud accounting.
          </p>
        </div>

        {/* Category Tabs (Interactive Segmented Filter) */}
        <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-4 no-scrollbar mb-8">
          <div className="inline-flex p-1 bg-white border border-slate-200 rounded-xl shadow-xs">
            {SERVICE_CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? 'bg-blue-700 text-white shadow-xs font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-blue-600'}>
                    {getCategoryIcon(cat.id)}
                  </span>
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Banner */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-blue-700">{getCategoryIcon(activeCategory.id)}</span>
              <span>{activeCategory.title}</span>
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              {activeCategory.tagline}
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{activeCategory.services.length}</span> verified services
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategory.services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-5">
                
                {/* Header of Card */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {service.name}
                  </h4>
                  {service.popular && (
                    <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded shrink-0">
                      Popular
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-1.5 mb-5 border-t border-slate-100 pt-3">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Key Inclusions
                  </div>
                  {service.documentsNeeded.slice(0, 3).map((doc, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{doc}</span>
                    </div>
                  ))}
                </div>

                {/* TAT and Fee Notice */}
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg mb-2">
                  <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="font-medium text-slate-800">{service.turnaroundTime}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-[11px] text-slate-500 line-clamp-1">{service.govFeeNotice}</span>
                </div>
              </div>

              {/* Card Footer with Price and Actions */}
              <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Starting from</div>
                  <div className="text-lg font-extrabold text-slate-900 font-mono tabular-nums">
                    ₹{service.priceStarting.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectService(service)}
                    className="px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onSelectService(service)}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
