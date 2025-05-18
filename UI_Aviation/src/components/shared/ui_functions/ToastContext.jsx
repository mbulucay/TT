import React, { createContext, forwardRef, useRef } from 'react';
import { Toast } from 'primereact/toast';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toastRef = useRef(null);

  return (
    <ToastContext.Provider value={toastRef}>
      <Toast ref={toastRef} position="bottom-center" />
      {children}
    </ToastContext.Provider>
  );
};
