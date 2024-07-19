import React, { createContext, useContext, useState } from "react";

const NoticeModalContext = createContext();

export const NoticeModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    show: false,
    rest_id: null,
    contents:""
  });

  const openNoticeModal = ({contents, rest_id }) => {
    setModalState({
      show: true,
      rest_id,
      contents
    });
  };

  const closeNoticeModal = () => {
    setModalState({
      show: false,
      rest_id:null,
      contents:""
    });
  };

  return (
    <NoticeModalContext.Provider
      value={{ modalState, openNoticeModal, closeNoticeModal }}
    >
      {children}
    </NoticeModalContext.Provider>
  );
};

export const useNoticeModal = () => {
  const context = useContext(NoticeModalContext);
  if (!context) {
    throw new Error("NoticeModal은 반드시 NoticeModalProvider 내에서 사용해야 합니다");
  }
  return context;
};
