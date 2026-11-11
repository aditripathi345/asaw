import React, { useState, useId } from 'react';
import { 
  Calculator, 
  Check, 
  Download, 
  Info, 
  ShieldCheck, 
  ArrowRight,
  FileText,
  Building,
  Sparkles
} from 'lucide-react';
import { STATE_STAMP_DUTY_RATES } from '../data/servicesData';
import { ServiceItem } from '../types';

interface FeeCalculatorProps {
  onBookService: (serviceName: string, calculatedFee: number) => void;
}

export const FeeCalculator: React.FC<FeeCalculatorProps> = ({ onBookService }) => {
  const [entityType, setEntityType] = useState('pvt-ltd');
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [directorsCount, setDirectorsCount] = useState(2);
  const [capitalLakhs, setCapitalLakhs] = useState(1);
  const [includeGst, setIncludeGst] = useState(true);
  const [includeAccounting, setIncludeAccounting] = useState(true);
  const [includeTrademark, setIncludeTrademark] = useState(false);
  const [quoteDownloaded, setQuoteDownloaded] = useState(false);
  const gstAddonId = useId();
  const accountingAddonId = useId();
  const trademarkAddonId = useId();

  // Calculation math
  const stateRates = STATE_STAMP_DUTY_RATES[selectedState] || { baseDuty: 1500, stampRatePerLakh: 120 };
  
  // MCA Govt Fee: SPICe+ has ₹0 ROC fee for capital up to 15 Lakhs
  const mcaGovtFee = capitalLakhs <= 15 ? 0 : Math.round((capitalLakhs - 15) * 450);
  
  // State Stamp Duty
  const stateStampDuty = stateRates.baseDuty + Math.round(capitalLakhs * stateRates.stampRatePerLakh);
  
  // DSC Cost: 2 DSCs included free in base package, extra for >2 directors
  const extraDscCost = Math.max(0, directorsCount - 2) * 999;
  
  // Base Professional Fee by entity
  let baseProfessionalFee = 4999;
  if (entityType === 'llp') baseProfessionalFee = 4499;
  if (entityType === 'opc') baseProfessionalFee = 4999;
  if (entityType === 'public-ltd') baseProfessionalFee = 14999;

  // Add-ons
  const gstCost = includeGst ? 1499 : 0;
  const accountingCost = includeAccounting ? 999 : 0;
  const trademarkCost = includeTrademark ? 1999 : 0;

  const totalGovernmentFee = mcaGovtFee + stateStampDuty;
  const totalProfessionalFee = baseProfessionalFee + extraDscCost + gstCost + accountingCost + trademarkCost;
  const totalEstimatedCost = totalGovernmentFee + totalProfessionalFee;

  const entityNameMap: Record<string, string> = {
    'pvt-ltd': 'Private Limited Company',
    'llp': 'Limited Liability Partnership (LLP)',
    'opc': 'One Person Company (OPC)',
    'public-ltd': 'Public Limited Company'
  };

  const handleDownloadQuotation = () => {
    setQuoteDownloaded(true);
    // Generate text quotation file
    const quotationContent = `=====================================================
ASAW CONSULTANCY SERVICES - OFFICIAL FEE ESTIMATE
India's Leading Business & Legal Services Platform
Helpline: +91 94159 94473 | Email: asawconsultancy@gmail.com
Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
=====================================================

STRUCTURE DETAILS:
- Proposed Structure: ${entityNameMap[entityType]}
- Registered State: ${selectedState}
- Number of Directors / Partners: ${directorsCount}
- Authorized Share Capital: ₹${capitalLakhs} Lakh(s)

FEE ITEMIZATION:
-----------------------------------------------------
1. Government ROC Registration Fee: ₹${mcaGovtFee.toLocaleString('en-IN')} (SPICe+ Exemption Applied)
2. State Stamp Duty (${selectedState}): ₹${stateStampDuty.toLocaleString('en-IN')}
3. Digital Signature Certificates (DSC Class 3): ₹${(2 * 0 + extraDscCost).toLocaleString('en-IN')}
4. Professional Legal Drafting & Incorporation: ₹${baseProfessionalFee.toLocaleString('en-IN')}
${includeGst ? `5. GST Registration Certificate Add-on: ₹${gstCost.toLocaleString('en-IN')}\n` : ''}${includeAccounting ? `6. ASAW Books Cloud Accounting (1 Yr): ₹${accountingCost.toLocaleString('en-IN')}\n` : ''}${includeTrademark ? `7. Trademark Search & ™ Application: ₹${trademarkCost.toLocaleString('en-IN')}\n` : ''}-----------------------------------------------------
TOTAL GOVERNMENT CHARGES: ₹${totalGovernmentFee.toLocaleString('en-IN')}
TOTAL PROFESSIONAL CHARGES: ₹${totalProfessionalFee.toLocaleString('en-IN')}
GRAND TOTAL (All Inclusive): ₹${totalEstimatedCost.toLocaleString('en-IN')}
-----------------------------------------------------
GUARANTEE:
- Zero hidden fees.
- 100% money-back SLA commitment.
- Token advance to start: ₹999 only.

ASAW Consultancy Headquarters: Near Ram Katha Park, Gomti Nagar, Lucknow, Uttar Pradesh, India.
=====================================================`;

    const blob = new Blob([quotationContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ASAW_Quotation_${entityType}_${selectedState}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setQuoteDownloaded(false), 4000);
  };

  return (
    <section id="calculator" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-blue-700 tracking-wider uppercase mb-2">
            Transparent Cost Estimator
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Company Incorporation &amp; Government Fee Calculator
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Select your state and entity parameters to calculate exact government stamp duties, MCA fees, and legal drafting charges with zero hidden markups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Parameter Selectors */}
          <div className="lg:col-span-7 bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* Entity Type */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                1. Select Entity Structure
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'pvt-ltd', label: 'Private Limited' },
                  { id: 'llp', label: 'LLP Partnership' },
                  { id: 'opc', label: 'One Person Co' },
                  { id: 'public-ltd', label: 'Public Limited' }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setEntityType(type.id)}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                      entityType === type.id
                        ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* State and Director Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  2. Registered State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                >
                  {Object.keys(STATE_STAMP_DUTY_RATES).map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-500 mt-1">
                  Stamp duty varies by State Government rules
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  3. Number of Directors / Partners
                </label>
                <div className="flex items-center gap-2">
                  {[2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setDirectorsCount(num)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        directorsCount === num
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {num} {num === 1 ? 'Person' : 'Persons'}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  2 DSCs included in standard package
                </div>
              </div>
            </div>

            {/* Authorized Capital Slider / Radio */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  4. Authorized Share Capital:
                </label>
                <span className="text-sm font-extrabold text-blue-800 font-mono">
                  ₹{capitalLakhs} Lakh{capitalLakhs > 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[1, 5, 10, 15, 25].map((cap) => (
                  <button
                    key={cap}
                    type="button"
                    onClick={() => setCapitalLakhs(cap)}
                    className={`py-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                      capitalLakhs === cap
                        ? 'bg-blue-100 text-blue-900 border-blue-400 font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    ₹{cap} Lakh{cap > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-emerald-700 mt-1.5 flex items-center gap-1 font-medium">
                <Check className="w-3 h-3" />
                <span>Zero MCA ROC filing fee up to ₹15 Lakhs capital under SPICe+</span>
              </div>
            </div>

            {/* Bundled Add-on checkboxes */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                5. Popular Bundled Add-ons
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label htmlFor={gstAddonId} className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                  includeGst ? 'bg-blue-50/70 border-blue-300' : 'bg-white border-slate-200'
                }`}>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">GST Registration</div>
                    <div className="text-[11px] text-slate-500">+₹1,499</div>
                  </div>
                  <input
                    id={gstAddonId}
                    type="checkbox"
                    checked={includeGst}
                    onChange={(e) => setIncludeGst(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                </label>

                <label htmlFor={accountingAddonId} className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                  includeAccounting ? 'bg-blue-50/70 border-blue-300' : 'bg-white border-slate-200'
                }`}>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">Cloud Books (1 Yr)</div>
                    <div className="text-[11px] text-slate-500">+₹999</div>
                  </div>
                  <input
                    id={accountingAddonId}
                    type="checkbox"
                    checked={includeAccounting}
                    onChange={(e) => setIncludeAccounting(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                </label>

                <label htmlFor={trademarkAddonId} className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                  includeTrademark ? 'bg-blue-50/70 border-blue-300' : 'bg-white border-slate-200'
                }`}>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">Trademark Search</div>
                    <div className="text-[11px] text-slate-500">+₹1,999</div>
                  </div>
                  <input
                    id={trademarkAddonId}
                    type="checkbox"
                    checked={includeTrademark}
                    onChange={(e) => setIncludeTrademark(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                </label>
              </div>
            </div>

          </div>

          {/* Right Summary Card: Live Itemization */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl sticky top-24 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Estimated Breakdown
                </span>
                <h3 className="text-lg font-bold text-white">
                  {entityNameMap[entityType]}
                </h3>
                <div className="text-xs text-slate-400">
                  State of {selectedState} · {directorsCount} Directors
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400">
                <Calculator className="w-5 h-5" />
              </div>
            </div>

            {/* Itemized Lines */}
            <div className="space-y-3 text-xs divide-y divide-slate-800/80">
              
              <div className="pt-2 flex justify-between items-center">
                <span className="text-slate-300">Govt MCA Filing Fee (SPICe+)</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {mcaGovtFee === 0 ? '₹0 (Waived)' : `₹${mcaGovtFee.toLocaleString('en-IN')}`}
                </span>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <span className="text-slate-300">Govt Stamp Duty ({selectedState})</span>
                <span className="font-mono text-white font-semibold">
                  ₹{stateStampDuty.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <span className="text-slate-300">DSC Class 3 ({directorsCount} Nos)</span>
                <span className="font-mono text-white font-semibold">
                  {extraDscCost === 0 ? 'Included in Base' : `+₹${extraDscCost.toLocaleString('en-IN')}`}
                </span>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <span className="text-slate-300">Professional Legal &amp; ROC Filing</span>
                <span className="font-mono text-white font-semibold">
                  ₹{baseProfessionalFee.toLocaleString('en-IN')}
                </span>
              </div>

              {(includeGst || includeAccounting || includeTrademark) && (
                <div className="pt-2 space-y-1 text-slate-400">
                  <div className="text-[11px] text-amber-300 font-semibold uppercase">Selected Add-ons</div>
                  {includeGst && (
                    <div className="flex justify-between">
                      <span>• GST Registration</span>
                      <span className="font-mono text-slate-300">₹{gstCost.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {includeAccounting && (
                    <div className="flex justify-between">
                      <span>• ASAW Books 1-Yr Subscription</span>
                      <span className="font-mono text-slate-300">₹{accountingCost.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {includeTrademark && (
                    <div className="flex justify-between">
                      <span>• Trademark Search &amp; Filing</span>
                      <span className="font-mono text-slate-300">₹{trademarkCost.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Total Highlight */}
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Total Government Charges:</span>
                <span className="font-mono text-slate-200">₹{totalGovernmentFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Total Professional Charges:</span>
                <span className="font-mono text-slate-200">₹{totalProfessionalFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-slate-700 flex justify-between items-baseline">
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Grand Total
                  </div>
                  <div className="text-[10px] text-slate-400">All inclusive, zero hidden fees</div>
                </div>
                <div className="text-2xl font-black text-amber-400 font-mono tabular-nums">
                  ₹{totalEstimatedCost.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => onBookService(entityNameMap[entityType], totalEstimatedCost)}
                className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Now (Token ₹999 Advance)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleDownloadQuotation}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{quoteDownloaded ? 'Quotation Downloaded!' : 'Download Detailed Quotation'}</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Money-Back SLA Guarantee if filings are delayed</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
