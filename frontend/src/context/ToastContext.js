import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
    return id;
  };

  const hideToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // Convenience methods
  const showSuccessToast = (message, duration) => showToast(message, 'success', duration);
  const showErrorToast = (message, duration) => showToast(message, 'error', duration);
  const showInfoToast = (message, duration) => showToast(message, 'info', duration);
  const showWarningToast = (message, duration) => showToast(message, 'warning', duration);

  return (
    <ToastContext.Provider
      value={{
        showToast,
        hideToast,
        showSuccessToast,
        showErrorToast,
        showInfoToast,
        showWarningToast,
      }}
    >
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => hideToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContext;