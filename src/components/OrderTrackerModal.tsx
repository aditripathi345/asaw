import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  UserCheck, 
  Phone, 
  Mail, 
  Download,
  Building,
  FileCheck
} from 'lucide-react';
import { SAMPLE_ORDERS } from '../data/servicesData';
import { OrderStatus } from '../types';

import { api } from '../services/apiClient';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ isOpen, onClose }) => {
  const [orderQuery, setOrderQuery] = useState('ASAW-8921-PVT');
  const [currentOrder, setCurrentOrder] = useState<OrderStatus | null>(SAMPLE_ORDERS['ASAW-8921-PVT']);
  const [hasSearched, setHasSearched] = useState(false);
  const [isReceiptDownloaded, setIsReceiptDownloaded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = orderQuery.trim().toUpperCase();
    if (!query) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      // 1. Try real backend database endpoint
      const res = await api.trackApplication(query);
      if (res.success && res.data) {
        const app = res.data;
        const stageMap: Record<string, number> = {
          submitted: 1,
          under_review: 2,
          in_progress: 3,
          completed: 4,
          documents_required: 2,
          rejected: 1,
          cancelled: 1,
        };

        const currentStageNum = stageMap[app.status] || 1;

        const liveOrder: OrderStatus = {
          orderId: app.application_number,
          clientName: app.applicant_name,
          companyName: app.business_name || app.service_name || 'Business Entity',
          serviceName: app.service_name || 'Corporate Registration',
          filingDate: new Date(app.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          targetDate: new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          currentStage: currentStageNum,
          assignedExpert: app.assigned_professional || {
            name: 'CA Rajeshwari Sharma',
            designation: 'Senior Manager - Corporate Structuring',
            phone: '+91 94159 94473',
            email: 'asawconsultancy@gmail.com',
          },
          stages: [
            {
              title: 'Application & Document Intake',
              desc: 'Initial KYC and application details received via cloud portal.',
              date: new Date(app.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
              status: 'completed',
            },
            {
              title: 'Compliance Review & Ministry Verification',
              desc: 'Legal team auditing documents and checking MCA / GST guidelines.',
              status: currentStageNum >= 2 ? (currentStageNum === 2 ? 'current' : 'completed') : 'pending',
            },
            {
              title: 'Ministry SPICe+ / Portal Filing & DSC',
              desc: 'Official filing with government registry and officer liaison.',
              status: currentStageNum >= 3 ? (currentStageNum === 3 ? 'current' : 'completed') : 'pending',
            },
            {
              title: 'Certificate Issuance & Dispatch',
              desc: 'Final government certificate, CIN, PAN, TAN and registration credentials issued.',
              status: currentStageNum === 4 ? 'completed' : 'pending',
            },
          ],
        };

        setCurrentOrder(liveOrder);
        setIsSearching(false);
        return;
      }
    } catch {
      // ignore
    }

    // 2. Check sample orders
    const found = SAMPLE_ORDERS[query];
    setCurrentOrder(found || null);
    setIsSearching(false);
  };

  const handleSelectDemo = (id: string) => {
    setOrderQuery(id);
    setCurrentOrder(SAMPLE_ORDERS[id] || null);
    setHasSearched(false);
  };

  const handleDownloadAck = () => {
    if (!currentOrder) return;
    setIsReceiptDownloaded(true);
    const content = `====================================================
ASAW CONSULTANCY SERVICES - LIVE FILING ACKNOWLEDGMENT
India's Premier Business & Legal Services Platform
Tracking ID: ${currentOrder.orderId}
====================================================
Client Name: ${currentOrder.clientName}
Proposed Entity: ${currentOrder.companyName}
Service: ${currentOrder.serviceName}
Filing Date: ${currentOrder.filingDate}
Target Completion: ${currentOrder.targetDate}
Current Stage: Stage ${currentOrder.currentStage} of 4

ASSIGNED LEGAL EXPERT:
Name: ${currentOrder.assignedExpert.name}
Role: ${currentOrder.assignedExpert.designation}
Direct Helpline: ${currentOrder.assignedExpert.phone}
Email: ${currentOrder.assignedExpert.email}

PROGRESS RECORD:
${currentOrder.stages.map((s, idx) => `[${s.status.toUpperCase()}] Stage ${idx + 1}: ${s.title} (${s.date || 'Pending'})\n  Summary: ${s.desc}`).join('\n\n')}

For any questions, contact +91 94159 94473 or email asawconsultancy@gmail.com.
====================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Status_${currentOrder.orderId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setIsReceiptDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Track Application &amp; Order Status
              </h3>
              <p className="text-xs text-slate-500">
                Real-time MCA, GST &amp; Trademark filing tracker
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Enter Order / Application ID
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="e.g. ASAW-8921-PVT"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
              >
                Track Status
              </button>
            </div>

            {/* Quick Demo Pickers */}
            <div className="flex items-center gap-2 pt-1 flex-wrap text-xs text-slate-500">
              <span>Try Demo Orders:</span>
              <button
                type="button"
                onClick={() => handleSelectDemo('ASAW-8921-PVT')}
                className="px-2 py-0.5 text-[11px] font-mono bg-blue-50 text-blue-700 hover:bg-blue-100 rounded border border-blue-200 cursor-pointer"
              >
                ASAW-8921-PVT (Pvt Ltd)
              </button>
              <button
                type="button"
                onClick={() => handleSelectDemo('ASAW-4412-GST')}
                className="px-2 py-0.5 text-[11px] font-mono bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded border border-emerald-200 cursor-pointer"
              >
                ASAW-4412-GST (GST)
              </button>
              <button
                type="button"
                onClick={() => handleSelectDemo('ASAW-6530-TM')}
                className="px-2 py-0.5 text-[11px] font-mono bg-purple-50 text-purple-700 hover:bg-purple-100 rounded border border-purple-200 cursor-pointer"
              >
                ASAW-6530-TM (Trademark)
              </button>
            </div>
          </form>

          {/* Results Display */}
          {currentOrder ? (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Order Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Order Reference</span>
                    <div className="text-sm font-mono font-bold text-slate-900">
                      {currentOrder.orderId}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Target Delivery</span>
                    <div className="text-xs font-semibold text-emerald-700">
                      {currentOrder.targetDate}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Service:</span>
                    <div className="font-semibold text-slate-900">{currentOrder.serviceName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Entity Name:</span>
                    <div className="font-semibold text-slate-900">{currentOrder.companyName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Applicant:</span>
                    <div className="font-medium text-slate-800">{currentOrder.clientName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Application Date:</span>
                    <div className="font-medium text-slate-800">{currentOrder.filingDate}</div>
                  </div>
                </div>
              </div>

              {/* Progress Milestones Stepper */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Filing Progress (Stage {currentOrder.currentStage} of 4)
                  </h4>
                  <span className="text-xs text-blue-700 font-semibold">
                    {currentOrder.currentStage === 4 ? '100% Completed' : `${currentOrder.currentStage * 25}% Completed`}
                  </span>
                </div>

                {/* Stepper Timeline */}
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {currentOrder.stages.map((stage, idx) => {
                    const isCompleted = stage.status === 'completed';
                    const isCurrent = stage.status === 'current';
                    return (
                      <div key={idx} className="relative">
                        {/* Dot indicator */}
                        <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCompleted
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                            : isCurrent
                            ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                            : 'bg-slate-200 text-slate-500'
                        }`}>
                          {isCompleted ? '✓' : idx + 1}
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold ${
                              isCompleted ? 'text-slate-900' : isCurrent ? 'text-blue-700 font-extrabold' : 'text-slate-400'
                            }`}>
                              {stage.title}
                            </span>
                            {stage.date && (
                              <span className="text-[11px] text-slate-400 font-medium">
                                {stage.date}
                              </span>
                            )}
                          </div>
                          <p className={`text-xs mt-1 leading-relaxed ${
                            isCurrent ? 'text-slate-700 font-medium' : 'text-slate-500'
                          }`}>
                            {stage.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Assigned In-house CA/CS Expert Card */}
              <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    CA
                  </div>
                  <div>
                    <div className="text-[10px] text-blue-800 font-bold uppercase tracking-wider">
                      Assigned Legal Specialist
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      {currentOrder.assignedExpert.name}
                    </div>
                    <div className="text-[11px] text-slate-600">
                      {currentOrder.assignedExpert.designation}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`tel:${currentOrder.assignedExpert.phone}`}
                    className="p-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`mailto:${currentOrder.assignedExpert.email}`}
                    className="p-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleDownloadAck}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isReceiptDownloaded ? 'Downloaded!' : 'Download Filing Summary'}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>

            </div>
          ) : (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="text-sm font-bold text-slate-900">
                Order Reference Not Found
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We could not find an application with ID &quot;{orderQuery}&quot;. Please verify the order number sent on your registered email/SMS or try one of the demo orders above.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
