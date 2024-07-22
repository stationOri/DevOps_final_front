import React, { createContext, useContext, useState } from 'react';

const CheckModalContext = createContext();

export const CancelModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    show: false,
    header: '',
    resID: 0
  });

  const openCancelModal = (header, resID) => {
    setModalState({
      show: true,
      header,
      resID
    });
  };

  const closeCancelModal = () => {
    setModalState({
      show: false,
      header: '',
      resID: 0
    });
  };

  return (
    <CheckModalContext.Provider
      value={{ modalState, openCancelModal, closeCancelModal }}
    >
      {children}
    </CheckModalContext.Provider>
  );
};

export const useCancelModal = () => {
  const context = useContext(CheckModalContext);
  if (!context) {
    throw new Error('CancelModal must be used within a CheckModalProvider');
  }
  return context;
};
