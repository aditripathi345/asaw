import React from 'react';
import { 
  Rocket, 
  ShoppingBag, 
  Scale, 
  Terminal, 
  CreditCard, 
  Factory, 
  Activity, 
  Briefcase,
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';

interface ClientTypeItem {
  id: string;
  name: string;
  category: string;
  highlight?: string;
  icon: React.ReactNode;
  brandMonogram: string;
}

const CLIENT_TYPES: ClientTypeItem[] = [
  {
    id: 'dt-webautomation',
    name: 'DT.WebAutomation',
    category: 'Automation Agencies',
    highlight: 'Enterprise Client',
    icon: <Terminal className="w-5 h-5" />,
    brandMonogram: 'DT',
  },
  {
    id: 'tech-startups',
    name: 'Tech Startups',
    category: 'SaaS & AI Ventures',
    highlight: 'Seed & VC Funded',
    icon: <Rocket className="w-5 h-5" />,
    brandMonogram: 'TS',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Brands',
    category: 'D2C & Marketplace Sellers',
    highlight: 'Amazon & Shopify',
    icon: <ShoppingBag className="w-5 h-5" />,
    brandMonogram: 'EC',
  },
  {
    id: 'legal-firms',
    name: 'Legal Firms',
    category: 'Advocates & Legal Practices',
    highlight: 'Bar Council Registered',
    icon: <Scale className="w-5 h-5" />,
    brandMonogram: 'LF',
  },
  {
    id: 'fintech',
    name: 'Fintech Innovators',
    category: 'Payment & Lending Gateways',
    highlight: 'RBI & NBFC Compliance',
    icon: <CreditCard className="w-5 h-5" />,
    brandMonogram: 'FT',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing Units',
    category: 'Industrial & MSMEs',
    highlight: 'Factory & Labor Laws',
    icon: <Factory className="w-5 h-5" />,
    brandMonogram: 'MF',
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Pharma',
    category: 'Clinics & Food Brands',
    highlight: 'FSSAI & CDSCO Licensed',
    icon: <Activity className="w-5 h-5" />,
    brandMonogram: 'HP',
  },
  {
    id: 'consulting',
    name: 'Advisory & CA Practices',
    category: 'Consulting Networks',
    highlight: 'Pan-India Associates',
    icon: <Briefcase className="w-5 h-5" />,
    brandMonogram: 'AP',
  },
];

export const TrustedByMarquee: React.FC = () => {
  // Duplicate array once for seamless infinite loop
  const marqueeItems = [...CLIENT_TYPES, ...CLIENT_TYPES];

  return (
    <section className="bg-white border-y border-slate-200/80 py-8 overflow-hidden relative selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            Trusted By 14,000+ Ventures Across Diverse Industries
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Continuous MCA &amp; GST compliance for all corporate entities</span>
        </div>
      </div>

      {/* Marquee Track Container with Gradient Edge Masks */}
      <div className="relative w-full overflow-hidden">
        
        {/* Left Fade Mask */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />

        {/* Right Fade Mask */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Scrolling Inner Track */}
        <div className="animate-marquee flex items-center gap-4 py-2">
          {marqueeItems.map((item, index) => {
            const isSpecial = item.id === 'dt-webautomation';
            return (
              <div
                key={`${item.id}-${index}`}
                className="group flex items-center gap-3.5 bg-slate-50/70 hover:bg-white border border-slate-200/70 hover:border-blue-400 px-4 py-3 rounded-xl transition-all duration-300 shadow-2xs hover:shadow-md cursor-default shrink-0 select-none"
              >
                {/* Grayscale Logo Badge (illuminates on hover) */}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-xs transition-all duration-300 ${
                    isSpecial
                      ? 'bg-slate-200 text-slate-700 group-hover:bg-blue-700 group-hover:text-white group-hover:shadow-sm'
                      : 'bg-slate-200 text-slate-600 group-hover:bg-slate-900 group-hover:text-white group-hover:shadow-sm'
                  }`}
                >
                  <div className="grayscale group-hover:grayscale-0 transition-all duration-300">
                    {item.icon}
                  </div>
                </div>

                {/* Typography info */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-700 group-hover:text-slate-950 transition-colors">
                      {item.name}
                    </span>
                    {isSpecial && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded group-hover:bg-blue-100">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-slate-400 group-hover:text-slate-500 font-medium">
                      {item.category}
                    </span>
                    <span className="text-slate-300 text-[10px]">·</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-emerald-700 font-semibold transition-colors">
                      {item.highlight}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
