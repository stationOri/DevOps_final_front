import React, { useState } from 'react';
import Logo from "../../assets/images/oriblue.png";
import "../../css/components/Modal/SigninModal.css";
import "../../css/components/Modal/NicknameEditModal.css";

function SigninModal({ EditClose, editshow }) {
  const [nickname, setNickname] = useState("");

  const handleEditActivate = () => {
    console.log(nickname);
    EditClose();
  };

  return (
    <div
      id={editshow ? "signinbackgroundon" : "signinbackgroundoff"}
      onClick={(e) => {
        if (
          e.target.id === "signinbackgroundon" ||
          e.target.id === "signinbackgroundoff"
        ) {
          EditClose();
        }
      }}
    >
      <div className={`signinModal ${editshow ? "signinshow" : "signinhide"}`}>
        <div className="signinModalHeader">
          <img src={Logo} alt="Logo" className="signinori"/>
          <button className='signinclosebtn' onClick={EditClose}>
            X
          </button>
        </div>
        <div className="signinModalContent">
          <div className="signinboldText">닉네임 수정</div>
          <div className="signinhintText">수정 할 닉네임을 적어주세요</div>
        </div>
        <div className='inputBoxinNickname'>
          <div className='NicknameHinttest'>닉네임</div>
          <input
            type='text'
            className='nicknameinputBox'
            placeholder='닉네임(최대 20자)'
            maxLength={20}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="signinModalButton">
          <button className="signinModalPersonal" onClick={handleEditActivate}>수정</button>
          <button className="signinModalRest" onClick={EditClose}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default SigninModal;
