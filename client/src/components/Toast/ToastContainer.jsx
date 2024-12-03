import React from 'react';
import { createPortal } from 'react-dom';
import ToastMessage from './ToastMessage';

function ToastContainer({ toasts, removeToast }) {
  return createPortal(
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastMessage
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    document.body
  );
}

export default ToastContainer;