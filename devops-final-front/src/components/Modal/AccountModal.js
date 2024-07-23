import React, { useState } from 'react';
import Logo from "../../assets/images/oriblue.png";
import "../../css/components/Modal/SigninModal.css";
import "../../css/components/Modal/AccountModal.css";
import axios from 'axios';

function AccountModal({ closeInfoModal, infoshow, restId }) {
  const [accountNumber, setAccountNumber] = useState('');

  const handleAccountSet = async () => {
    console.log(accountNumber);
    try {
      // const response = await axios.get("http://localhost:8080/login");
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setAccountNumber("")
      closeInfoModal();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9]/g, '');
    setAccountNumber(filteredValue);
  };

  return (
    <div
      id={infoshow ? "signinbackgroundon" : "signinbackgroundoff"}
      onClick={(e) => {
        if (
          e.target.id === "signinbackgroundon" ||
          e.target.id === "signinbackgroundoff"
        ) {
          closeInfoModal();
        }
      }}
    >
      <div className={`accountModal ${infoshow ? "signinshow" : "signinhide"}`}>
        <div className="signinModalHeader">
          <img src={Logo} alt="" className="signinori"/>
          <button className='signinclosebtn' onClick={closeInfoModal}>
            X
          </button>
        </div>
        <div className="signinModalContent">
          <div className="signinboldText">계좌정보 설정</div>
          <div className="signinhintText">노쇼 예약금을 환불받을 계좌를 설정합니다.</div>
        </div>
        <div className='accountinputWrapper'>
          <div className='accountText'>계좌번호</div>
          <input
            type='text'
            className='accountinput'
            placeholder='숫자만 입력해주세요'
            value={accountNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className='accountBtnWrapper'>
            <button className="accountedityes" onClick={handleAccountSet}>
              수정
            </button>
            <button className="accounteditno" onClick={closeInfoModal}>
              취소
            </button>
        </div>
      </div>
    </div>
  );
}

export default AccountModal;
