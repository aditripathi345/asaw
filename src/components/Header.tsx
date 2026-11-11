import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Search, 
  ShieldCheck, 
  Building2, 
  FileText, 
  Calculator, 
  Menu, 
  X, 
  ChevronDown, 
  ExternalLink,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { ALL_SERVICES, SERVICE_CATEGORIES, POPULAR_SEARCH_TERMS } from '../data/servicesData';
import { ServiceItem } from '../types';

interface HeaderProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenOrderTracker: () => void;
  onOpenConsultation: () => void;
  onOpenAiAssistant?: () => void;
  onOpenClientPortal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectService,
  onOpenOrderTracker,
  onOpenConsultation,
  onOpenAiAssistant,
  onOpenClientPortal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim() === ''
    ? []
    : ALL_SERVICES.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* Top Utility Bar (IndiaFilings signature helpline & status bar) */}
      <div className="bg-[#0f172a] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-slate-200">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Helpline:</span>
              <a href="tel:+919415994473" className="font-semibold text-white hover:text-amber-400 transition-colors">
                +91 94159 94473
              </a>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-400">
              <MessageSquare className="w-3.5 h-3.5" />
              <a 
                href="https://wa.me/919415994473?text=Hello%20ASAW%20Consultancy,%20I%20need%20assistance%20with%20business%20registration." 
                target="_blank" 
                rel="noreferrer"
                className="hover:underline font-medium"
              >
                WhatsApp Advisor (24x7)
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="text-cyan-300 hover:text-cyan-200 font-semibold flex items-center gap-1 cursor-pointer transition-colors bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800/60"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>AI Legal Advisor</span>
              </button>
            )}
            {onOpenClientPortal && (
              <button
                onClick={onOpenClientPortal}
                className="text-blue-300 hover:text-blue-200 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ShieldCheck className="w-3 h-3 text-blue-400" />
                <span>Client &amp; CA Portal</span>
              </button>
            )}
            <span className="text-slate-600">|</span>
            <button 
              onClick={onOpenOrderTracker}
              className="text-amber-300 hover:text-amber-200 font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Clock className="w-3 h-3" />
              <span>Track Application</span>
            </button>
            <span className="hidden md:inline text-slate-600">|</span>
            <div className="flex items-center gap-1 text-slate-200">
              <span>🇮🇳</span>
              <span>Ram Katha Park, Gomti Nagar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Tagline */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl tracking-wider text-amber-300 font-sans">A</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                  ASAW
                </span>
                <span className="text-xl font-light tracking-tight text-blue-700 font-sans">
                  CONSULTANCY
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-700 font-semibold">
                Business & Legal Services
              </span>
            </div>
          </a>

          {/* Central Search Bar with Autocomplete Dropdown */}
          <div ref={searchRef} className="hidden lg:block relative flex-1 max-w-xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search 200+ services (e.g. Pvt Ltd, GST, Trademark, FSSAI...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-2xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Search Results / Quick Suggestions Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {searchResults.length > 0 ? (
                  <div className="p-2 divide-y divide-slate-100">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Matching Services
                    </div>
                    {searchResults.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => {
                          onSelectService(service);
                          setIsSearchFocused(false);
                          setSearchQuery('');
                        }}
                        className="w-full text-left px-3 py-2.5 hover:bg-blue-50 rounded-lg flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-700">
                            {service.name}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">
                            {service.shortDesc}
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <span className="text-xs font-bold text-slate-900">
                            ₹{service.priceStarting.toLocaleString('en-IN')}
                          </span>
                          <div className="text-[10px] text-emerald-600 font-medium">
                            {service.turnaroundTime}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : searchQuery.trim() !== '' ? (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No services found for "{searchQuery}". Call our experts directly at <span className="font-semibold text-blue-700">+91 94159 94473</span>.
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Popular Searches
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_SEARCH_TERMS.slice(0, 6).map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchQuery(term);
                            const matched = ALL_SERVICES.find(s => s.name.toLowerCase().includes(term.toLowerCase()));
                            if (matched) {
                              onSelectService(matched);
                              setIsSearchFocused(false);
                              setSearchQuery('');
                            }
                          }}
                          className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-700 rounded-md transition-colors cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
                title="AI Legal & Tax Assistant"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>AI Advisor</span>
              </button>
            )}

            {onOpenClientPortal && (
              <button
                onClick={onOpenClientPortal}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Client & CA Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                <span>Portal</span>
              </button>
            )}

            <button
              onClick={onOpenOrderTracker}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-blue-700" />
              <span>Track Order</span>
            </button>

            <a
              href="tel:+919415994473"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 active:scale-98 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5"
              title="Call Helpline: +91 94159 94473"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Talk to Expert</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Secondary Category Navigation Bar with Mega-menus */}
        <nav className="hidden lg:flex items-center justify-between gap-1 mt-3 pt-3 border-t border-slate-100 text-xs font-medium text-slate-700">
          {SERVICE_CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(cat.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 py-1.5 px-2.5 rounded-md hover:text-blue-700 hover:bg-blue-50/50 transition-colors cursor-pointer ${
                  activeDropdown === cat.id ? 'text-blue-700 font-semibold' : ''
                }`}
              >
                <span>{cat.title}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === cat.id ? 'rotate-180 text-blue-700' : 'text-slate-400'
                }`} />
              </button>

              {/* Mega-menu panel */}
              {activeDropdown === cat.id && (
                <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 animate-in fade-in duration-150">
                  <div className="text-[11px] text-slate-400 font-semibold uppercase px-2 mb-2">
                    {cat.tagline}
                  </div>
                  <div className="space-y-1">
                    {cat.services.map((svc) => (
                      <button
                        key={svc.id}
                        onClick={() => {
                          onSelectService(svc);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors flex items-start justify-between group/svc cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-800 group-hover/svc:text-blue-700">
                            {svc.name}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">
                            {svc.shortDesc}
                          </div>
                        </div>
                        <span className="text-xs font-bold text-slate-700 shrink-0 ml-2">
                          ₹{svc.priceStarting.toLocaleString('en-IN')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center gap-1">
            <a 
              href="#calculator" 
              className="flex items-center gap-1 py-1.5 px-2.5 text-blue-700 hover:text-blue-800 font-semibold hover:bg-blue-50/50 rounded-md transition-colors"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Govt Fee Calculator</span>
            </a>

            <a 
              href="#headquarters" 
              className="flex items-center gap-1 py-1.5 px-2.5 text-slate-700 hover:text-blue-700 font-semibold hover:bg-blue-50/50 rounded-md transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-700" />
              <span>Headquarters</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search 200+ services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {searchQuery && searchResults.length > 0 && (
            <div className="border border-slate-100 rounded-lg divide-y divide-slate-100">
              {searchResults.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelectService(s);
                    setIsMobileMenuOpen(false);
                    setSearchQuery('');
                  }}
                  className="w-full text-left p-2.5 text-xs hover:bg-blue-50 flex justify-between"
                >
                  <span className="font-medium text-slate-900">{s.name}</span>
                  <span className="font-bold text-blue-700">₹{s.priceStarting}</span>
                </button>
              ))}
            </div>
          )}

          {/* Quick links */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Browse Core Categories
            </div>
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.id} className="border-b border-slate-100 pb-2">
                <div className="font-semibold text-xs text-slate-900 py-1">
                  {cat.title}
                </div>
                <div className="pl-2 space-y-1 mt-1">
                  {cat.services.slice(0, 3).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onSelectService(s);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-xs text-slate-600 hover:text-blue-700 py-1"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenOrderTracker();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg text-center"
            >
              Track Existing Order
            </button>
            <a
              href="tel:+919415994473"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-700 rounded-lg text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Talk to Expert (+91 94159 94473)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
