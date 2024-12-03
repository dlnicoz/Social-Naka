import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const variants = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 text-green-600 border-green-200',
  },
  error: {
    icon: XCircle,
    className: 'bg-red-50 text-red-600 border-red-200',
  },
  warning: {
    icon: AlertCircle,
    className: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 text-blue-600 border-blue-200',
  },
};

function ToastMessage({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const Variant = variants[type];
  const Icon = Variant.icon;

  return (
    <div
      className={`transform transition-all duration-500 ease-in-out animate-slide-in
        ${Variant.className} flex items-center gap-3 pr-2 pl-4 py-3 rounded-lg shadow-lg border
        hover:shadow-md min-w-[320px] max-w-[420px]`}
      role="alert"
    >
      <Icon className="shrink-0" size={20} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-black/5 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default ToastMessage;