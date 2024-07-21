import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/images/oriblue.png";
import "../../css/components/Modal/SigninModal.css";
import buttonImage from '../../assets/images/modal/navergreen.png';
import axios from 'axios';
function LoginModal({ loginClose, loginshow }) {
  const navigate = useNavigate();

  const handleGoToNaverLogin = async () => {
    try {
      const response = await axios.get("http://localhost:8080/login"); // 서버의 네이버 로그인 엔드포인트 호출
      const loginUrl = response.data;
      window.location.href = loginUrl; // 리디렉션 URL로 이동
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div
      id={loginshow ? "signinbackgroundon" : "signinbackgroundoff"}
      onClick={(e) => {
        if (
          e.target.id === "signinbackgroundon" ||
          e.target.id === "signinbackgroundoff"
        ) {
            loginClose();
        }
      }}
    >
      <div className={`signinModal ${loginshow ? "signinshow" : "signinhide"}`}>
        <div className="signinModalHeader">
          <img src={Logo} alt="" className="signinori"/>
          <button className='signinclosebtn' onClick={loginClose}>
            X
          </button>
        </div>
        <div className="signinModalContent">
          <div className="signinboldText">네이버로 로그인</div>
          <div className="signinhintText">네이버로 로그인만 가능합니다.</div>
        </div>
        <div>
            <button className="naversignbutton" onClick={handleGoToNaverLogin}>
                <img src={buttonImage} alt="네이버 간편로그인" className="button-image" /> 
            </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;