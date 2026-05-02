// src/context/ModalContext.tsx

import React, { createContext, useState, type ReactNode } from 'react';
import type { Transaction, Budget } from '../types';

type ModalType = 'add-transaction' | 'edit-transaction' | 'delete-transaction' 
  | 'add-budget' | 'edit-budget' | 'delete-budget' 
  | 'select-date' | null;

interface ModalContextType {
  isOpen: boolean;
  modalType: ModalType;
  selectedData?: Transaction | Budget | null;
  openModal: (type: ModalType, data?: Transaction | Budget) => void;
  closeModal: () => void;
  // Transaction-specific helpers
  openTransactionModal: (mode: 'add' | 'edit', transaction?: Transaction) => void;
  openDeleteModal: (type: 'transaction' | 'budget', data: Transaction | Budget) => void;
  // Budget-specific helpers
  openBudgetModal: (mode: 'add' | 'edit', budget?: Budget) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedData, setSelectedData] = useState<Transaction | Budget | null>(null);

  const openModal = (type: ModalType, data?: Transaction | Budget) => {
    setModalType(type);
    setSelectedData(data || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
    setSelectedData(null);
  };

// Transaction-specific helper functions
  const openTransactionModal = (mode: 'add' | 'edit', transaction?: Transaction) => {
    const modalType: ModalType = mode === 'add' ? 'add-transaction' : 'edit-transaction';
    openModal(modalType, transaction);
  };

  const openDeleteModal = (type: 'transaction' | 'budget', data: Transaction | Budget) => {
    const modalType: ModalType = type === 'transaction' ? 'delete-transaction' : 'delete-budget';
    openModal(modalType, data);
  };

  // Budget-specific helper functions
  const openBudgetModal = (mode: 'add' | 'edit', budget?: Budget) => {
    const modalType: ModalType = mode === 'add' ? 'add-budget' : 'edit-budget';
    openModal(modalType, budget);
  };

  const value: ModalContextType = {
    isOpen,
    modalType,
    selectedData,
    openModal,
    closeModal,
    openTransactionModal,
    openDeleteModal,
    openBudgetModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};
