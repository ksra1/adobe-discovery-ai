import React, { createContext, useContext, useState, useCallback } from 'react';
import { DiscoveryFormData, DEFAULT_FORM_DATA, SectionId } from '@/types/discovery';

interface DiscoveryContextType {
  formData: DiscoveryFormData;
  currentSection: number;
  setCurrentSection: (section: number) => void;
  updateSection: <K extends keyof DiscoveryFormData>(
    section: K,
    data: Partial<DiscoveryFormData[K]>
  ) => void;
  isSubmitted: boolean;
  setIsSubmitted: (val: boolean) => void;
  resetForm: () => void;
}

const DiscoveryContext = createContext<DiscoveryContextType | undefined>(undefined);

export function DiscoveryProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<DiscoveryFormData>(DEFAULT_FORM_DATA);
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateSection = useCallback(<K extends keyof DiscoveryFormData>(
    section: K,
    data: Partial<DiscoveryFormData[K]>
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(DEFAULT_FORM_DATA);
    setCurrentSection(0);
    setIsSubmitted(false);
  }, []);

  return (
    <DiscoveryContext.Provider value={{
      formData, currentSection, setCurrentSection,
      updateSection, isSubmitted, setIsSubmitted, resetForm,
    }}>
      {children}
    </DiscoveryContext.Provider>
  );
}

export function useDiscovery() {
  const ctx = useContext(DiscoveryContext);
  if (!ctx) throw new Error('useDiscovery must be used within DiscoveryProvider');
  return ctx;
}
