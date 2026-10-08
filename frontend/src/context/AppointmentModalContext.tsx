import React, { createContext, useContext, useState } from 'react';
import { BusinessDivisionType } from '../types';

export interface BookingModalOptions {
  division?: BusinessDivisionType;
  service?: string;
  defaultMode?: 'in_person' | 'online' | 'phone';
}

interface AppointmentModalContextType {
  isOpen: boolean;
  options: BookingModalOptions;
  openBookingModal: (options?: BookingModalOptions) => void;
  closeBookingModal: () => void;
}

const AppointmentModalContext = createContext<AppointmentModalContextType | undefined>(undefined);

export const AppointmentModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<BookingModalOptions>({
    division: 'general',
    service: '',
    defaultMode: 'in_person',
  });

  const openBookingModal = (opts?: BookingModalOptions) => {
    setOptions({
      division: opts?.division || 'general',
      service: opts?.service || '',
      defaultMode: opts?.defaultMode || 'in_person',
    });
    setIsOpen(true);
  };

  const closeBookingModal = () => {
    setIsOpen(false);
  };

  return (
    <AppointmentModalContext.Provider
      value={{
        isOpen,
        options,
        openBookingModal,
        closeBookingModal,
      }}
    >
      {children}
    </AppointmentModalContext.Provider>
  );
};

export const useAppointmentModal = (): AppointmentModalContextType => {
  const context = useContext(AppointmentModalContext);
  if (!context) {
    throw new Error('useAppointmentModal must be used within an AppointmentModalProvider');
  }
  return context;
};
