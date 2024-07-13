import React, { useState } from 'react';
import Logo from "../../assets/images/oriblue.png";
import Home from "../../assets/images/sidebar/home.png";
import Restaurant from "../../assets/images/sidebar/restaurant.png";
import Reservation from "../../assets/images/sidebar/reservation.png";
import Chat from "../../assets/images/sidebar/chat.png";
import Login from "../../assets/images/sidebar/login.png";
import Search from "../../assets/images/sidebar/search.png";
import ExtendBtn from "../../assets/images/sidebar/menubtn.png";
import "../../css/components/user/SideBar.css";
import SigninModal from "../Modal/SigninModal";
import CheckModal from "../Modal/CheckModal"
import { useCheckModal } from "../Modal/CheckModalContext";

function SideBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [isExtended, setIsExtended] = useState(true); // 사이드바 확장 상태를 관리하는 변수
  const [loginshow, setLoginshow] = useState(false);
  const [signinshow, setSigninshow] = useState(false);

  const { openCheckModal } = useCheckModal();

  const handleOpenModal = () => {
    openCheckModal('관리자 문의 실패', '로그인이 되어있지 않습니다.로그인이 되어있지 않습니다.로그인이 되어있지 않습니다.');
  };

  // login modal 함수
  const loginClose = () => setLoginshow(false);
  const loginShow = () => setLoginshow(true);

  // 회원가입 modal 함수
  const signinClose = () => setSigninshow(false);
  const signinShow = () => setSigninshow(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername("User Name"); // 실제 사용자 이름 가져오기
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("Guest");
  };

  const toggleSidebar = () => {
    setIsExtended(!isExtended);
  };

  return (
    <div className={`sideBarWrapper ${isExtended ? 'extended' : 'collapsed'}`}>
      <SigninModal 
        signinClose={signinClose}
        signinshow={signinshow}
      />
      <div className="sideBarHeader">
        <div className="iconWrapper">
          <img src={Logo} alt="" className="sidebarLogo"/>
          {isExtended && <div className="guestText">{username}</div>}
        </div>
        <div className={`sidebarsearchboxWrapper ${isExtended ? '' : 'hidden'}`}>
          <img src={Search} alt="" className="searchLogo"/>
          {isExtended && (
            <input 
              type="text" 
              className="sidebarsearchbox"
              placeholder="Search"
            />
          )}
        </div>
      </div>
      <button className="extendbtn" onClick={toggleSidebar}>
        <img src={ExtendBtn} alt="" className="extendbtnImg"/>
      </button>
      <div className="sidebarContent">
          <div className="sidebarRow">
            <div className={`ctgText ${isExtended ? '' : 'hidden'}`}>MAIN</div>
          </div>
          <div className="sidebarRow">
            <img src={Home} alt="" className="sidebarIcon"/>
            <div className={`sidebarText ${isExtended ? '' : 'hidden'}`}>홈</div>
          </div>
          <div className="sidebarRow">
            <img src={Restaurant} alt="" className="sidebarIcon rest"/>
            <div className={`sidebarText ${isExtended ? '' : 'hidden'}`}>식당 조회</div>
          </div>
          <div className="sidebarRow">
            <img src={Reservation} alt="" className="sidebarIcon"/>
            <div className={`sidebarText ${isExtended ? '' : 'hidden'}`}>예약</div>
          </div>
          <div className="sidebarRow">
            <img src={Chat} alt="" className="sidebarIcon"/>
            <div className={`sidebarText ${isExtended ? '' : 'hidden'}`}>1:1 문의</div>
          </div>
        
        <div className="userContent">
          <div className="sidebarRow">
            <div className={`ctgText ${isExtended ? '' : 'hidden'}`}>USER</div>
          </div>
          {isLoggedIn ? (
            <>
              <div className="sidebarRow">
                <img src={Login} alt="" className="sidebarIcon"/>
                <div className={`sidebarText ${isExtended ? '' : 'hidden'}`}>마이페이지</div>
              </div>
              <div className="sidebarRow">
                <img src={Login} alt="" className="sidebarIcon"/>
                <div className={`sidebarText ${isExtended ? '' : 'hidden'}`} onClick={handleLogout}>로그아웃</div>
              </div>
            </>
          ) : (
            <>
              <div className="sidebarRow">
                <img src={Login} alt="" className="sidebarIcon"/>
                <div className={`sidebarText ${isExtended ? '' : 'hidden'}`} onClick={loginShow}>로그인</div>
              </div>
              <div className="sidebarRow">
                <img src={Login} alt="" className="sidebarIcon"/>
                <div className={`sidebarText ${isExtended ? '' : 'hidden'}`} onClick={signinShow}>회원가입</div>
              </div>
            </>
          )}
        </div>
        <button className={`sidebaraskButton ${isExtended ? '' : 'hidden'}`} onClick={handleOpenModal}>관리자 문의</button>
      </div>
      <CheckModal />
    </div>
  );
}

export default SideBar;
