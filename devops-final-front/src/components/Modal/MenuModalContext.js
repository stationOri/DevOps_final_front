import React, { createContext, useContext, useState } from 'react';

const MenuModalContext = createContext();

export const MenuModalProvider = ({ children }) => {
  const [menumodalState, setMenuModalState] = useState({
    show: false,
    header: '',
    menuname: '',
    menuprice: ''
  });

  const openMenuModal = (header, menuname, menuprice) => {
    setMenuModalState({
      show: true,
      header,
      menuname,
      menuprice
    });
  };

  const closeMenuModal = () => {
    setMenuModalState({
      show: false,
      header: '',
      menuname: '',
      menuprice: ''
    });
  };

  return (
    <MenuModalContext.Provider
      value={{ menumodalState, openMenuModal, closeMenuModal }}
    >
      {children}
    </MenuModalContext.Provider>
  );
};

export const useMenuModal = () => {
  const context = useContext(MenuModalContext);
  if (!context) {
    throw new Error('useMenuModal must be used within a MenuModalProvider');
  }
  return context;
};