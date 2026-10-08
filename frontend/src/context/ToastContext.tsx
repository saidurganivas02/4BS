import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Notification Container */}
      <aside aria-label="Notifications" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => {
          const typeStyles = {
            success: 'bg-slate-900 border-emerald-500/40 text-white shadow-emerald-950/20',
            info: 'bg-slate-900 border-blue-500/40 text-white shadow-blue-950/20',
            warning: 'bg-slate-900 border-amber-500/40 text-white shadow-amber-950/20',
            error: 'bg-slate-900 border-rose-500/40 text-white shadow-rose-950/20',
          }[toast.type];

          const Icon = {
            success: CheckCircle2,
            info: Info,
            warning: AlertCircle,
            error: XCircle,
          }[toast.type];

          const iconColor = {
            success: 'text-emerald-400',
            info: 'text-blue-400',
            warning: 'text-amber-400',
            error: 'text-rose-400',
          }[toast.type];

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3 ${typeStyles}`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 shrink-0 ${iconColor}`} />
                <span className="text-xs sm:text-sm font-medium tracking-tight leading-snug">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </aside>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
