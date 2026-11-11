import React, { useEffect, useState } from 'react';
import { X, Sparkles, PhoneCall } from 'lucide-react';
import { AnimatedCheckmark } from './AnimatedCheckmark';

export interface ToastData {
  title: string;
  message: string;
  referenceNumber?: string;
}

interface SuccessToastProps {
  toast: ToastData | null;
  onClose: () => void;
  duration?: number;
}

export const SuccessToast: React.FC<SuccessToastProps> = ({
  toast,
  onClose,
  duration = 5000,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!toast) return;

    setProgress(100);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingPct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remainingPct);

      if (elapsed >= duration) {
        clearInterval(interval);
        onClose();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [toast, duration, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm w-full animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-emerald-200/90 shadow-xl shadow-emerald-950/10 p-4 overflow-hidden relative">
        
        {/* Animated Progress Bar at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
          <div
            className="h-full bg-emerald-500 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-start gap-3.5">
          {/* Subtle Animated Checkmark */}
          <div className="shrink-0 mt-0.5">
            <AnimatedCheckmark size="sm" variant="emerald" />
          </div>

          {/* Toast Details */}
          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                {toast.title}
              </h4>
              <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
            </div>

            <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
              {toast.message}
            </p>

            {toast.referenceNumber && (
              <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 rounded-md text-[10px] font-mono text-slate-700 border border-slate-200/80">
                <span className="text-slate-400">Ref:</span>
                <span className="font-bold text-blue-700">{toast.referenceNumber}</span>
              </div>
            )}
          </div>

          {/* Dismiss button */}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
