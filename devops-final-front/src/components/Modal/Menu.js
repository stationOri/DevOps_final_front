import React, { useState, useEffect, useRef } from 'react';
import { useMenuModal } from "./MenuModalContext";
import "../../css/components/Modal/Menu.css";
import File from "../../components/File";

function MenuModal() {
  const { menumodalState, closeMenuModal, openMenuModal } = useMenuModal();
  const { show, header, menuname, menuprice, menuFile } = menumodalState;

  const [nameInput, setNameInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    setNameInput(menuname);
    setPriceInput(menuprice);
  }, [menuname, menuprice]);

  const handleMenuNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleMenuPriceChange = (e) => {
    setPriceInput(e.target.value);
  };

  const handleFileChange = (file) => {
    // 파일 관련 상태 업데이트는 MenuModalContext를 통해 이루어져야 함
    // 여기서는 예시로 사용자 정의 입력으로 상태 업데이트
    // 실제 구현에서는 setMenuFile(file)과 같이 MenuModalContext를 사용해야 함
  };

  const handleConfirm = () => {
    openMenuModal(header, nameInput, priceInput);
    closeMenuModal();
  };

  const handleCancel = () => {
    setNameInput('');
    setPriceInput('');
    if (fileInputRef.current) {
      fileInputRef.current.reset(); // 파일 필드를 초기화합니다.
    }
    closeMenuModal();
  };

  return (
    <div>
      <div
        id={show ? "menubackgroundon" : "menubackgroundoff"}
        onClick={(e) => {
          if (
            e.target.id === "menubackgroundon" ||
            e.target.id === "menubackgroundoff"
          ) {
            handleCancel();
          }
        }}
      >
        <div className={`menuModal ${show ? "menushow" : "menuhide"}`}>
          <div className="menuModalContent">
            <div className="menuboldText">{header}</div>
            <input
              className='menu-name-input'
              type='text'
              placeholder='메뉴 이름'
              value={nameInput}
              onChange={handleMenuNameChange}
            />
            <input
              className='menu-price-input'
              type='text'
              placeholder='15,000원'
              value={priceInput}
              onChange={handleMenuPriceChange}
            />
            <div className='descriptionalign'>
              <div className='menudescription'>메뉴 사진은 한 장만 등록 가능합니다.</div>
            </div>
            <div className='menu-modal-file-wrapper'>
            <File ref={fileInputRef}/>
            </div>
            <button className="MenuCheckModalBtn" onClick={handleConfirm}>확인</button>
            <button className="MenucancelModalBtn" onClick={handleCancel}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuModal;
