import React, { useState } from 'react';
import Logo from "../assets/images/oriblue.png";
import Home from "../assets/images/home.png";
import Restaurant from "../assets/images/restaurant.png";
import Reservation from "../assets/images/reservation.png";
import Chat from "../assets/images/chat.png";
import Login from "../assets/images/login.png";
import Search from "../assets/images/search.png";
import ExtendBtn from "../assets/images/menubtn.png";
import "../css/components/Sidebar.css";

function SideBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [isExtended, setIsExtended] = useState(true); // 사이드바 확장 상태를 관리하는 변수

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername("User Name"); // 실제 사용자 이름 가져오기
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("Guest");
  };

  const toggleSidebar = () => {
    setIsExtended(!isExtended); // 사이드바 확장 상태 토글
  };

  return (
    <div className={`sideBarWrapper ${isExtended ? 'extended' : 'collapsed'}`}>
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
                <div className={`sidebarText ${isExtended ? '' : 'hidden'}`} onClick={handleLogin}>로그인</div>
              </div>
              <div className="sidebarRow">
                <img src={Login} alt="" className="sidebarIcon"/>
                <div className={`sidebarText ${isExtended ? '' : 'hidden'}`}>회원가입</div>
              </div>
            </>
          )}
        </div>
        <button className={`sidebaraskButton ${isExtended ? '' : 'hidden'}`}>관리자 문의</button>
      </div>
    </div>
  );
}

export default SideBar;
