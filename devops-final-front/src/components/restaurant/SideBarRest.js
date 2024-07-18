import React, { useState,useEffect } from 'react';
import Logo from "../../assets/images/oriblue.png";
import Food from "../../assets/images/sidebar/food.png";
import Rest from "../../assets/images/sidebar/rest.png";
import Reservation from "../../assets/images/sidebar/reservation.png";
import Chat from "../../assets/images/sidebar/chat.png";
import RestUser from "../../assets/images/sidebar/restuser.png";
import ExtendBtn from "../../assets/images/sidebar/menubtn.png";
import Waiting from "../../assets/images/sidebar/waiting.png";
import Login from "../../assets/images/sidebar/login.png";
import CheckModal from "../Modal/CheckModal";
import { useCheckModal } from "../Modal/CheckModalContext";
import {jwtDecode} from "jwt-decode";
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function SideBarRest({ onMenuClick }) {
  const [isExtended, setIsExtended] = useState(true); 
  const { openCheckModal } = useCheckModal();
  const query = useQuery();
  const token = query.get('token'); // 'token'은 URL에서의 파라미터 이름
  const [username,setusername]=useState("Guest");

  const handleOpenModal = () => {
    openCheckModal('관리자 문의 실패', '로그인이 되어있지 않습니다.');
  };

  const toggleSidebar = () => {
    setIsExtended(!isExtended);
  };

  const handleSidebarTextClick = (text) => {
    console.log(`Clicked on: ${text}`);
    if (onMenuClick) {
      onMenuClick(text); // 클릭된 메뉴명을 RestMain으로 전달
    }
  };
  
  useEffect(() => {
    if (token) {
      try {
        localStorage.setItem('token', token);
        const userinfo = jwtDecode(token);
        setusername(userinfo.userName);

      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [token]);

  return (
    <div className={`sideBarWrapper ${isExtended ? 'extended' : 'collapsed'}`}>
      <div className="sideBarHeader">
        <div className="iconWrapper">
          <img src={Logo} alt="" className="sidebarLogo"/>
          {isExtended && <div className="guestText">{username}</div>}
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
            <img src={Rest} alt="" className="sidebarIcon"/>
            <div className={`sidebarText ${isExtended ? '' : 'hidden'}`} onClick={() => handleSidebarTextClick('식당정보')}>식당정보</div>
          </div>
          <div className="sidebarRow">
            <img src={Food} alt="" className="sidebarIcon rest"/>
            <div className={`sidebarText ${isExtended ? '' : 'hidden'}`} onClick={() => handleSidebarTextClick('메뉴 관리')}>메뉴 관리</div>
          </div>
          <div className="sidebarRow">
            <img src={Reservation} alt="" className="sidebarIcon"/>
            <div className={`sidebarText ${isExtended ? '' : 'hidden'}`} onClick={() => handleSidebarTextClick('예약')}>예약</div>
          </div>
          <div className="sidebarRow">
            <img src={Waiting} alt="" className="sidebarIcon"/>
            <div className={`sidebarText ${isExtended ? '' : 'hidden'}`} onClick={() => handleSidebarTextClick('웨이팅 관리')}>웨이팅 관리</div>
          </div>
          <div className="sidebarRow">
            <img src={Chat} alt="" className="sidebarIcon"/>
            <div className={`sidebarText ${isExtended ? '' : 'hidden'}`} onClick={() => handleSidebarTextClick('1:1 문의')}>1:1 문의</div>
          </div>
        
        <div className="userContent">
          <div className="sidebarRow">
            <div className={`ctgText ${isExtended ? '' : 'hidden'}`}>USER</div>
          </div>
              <div className="sidebarRow">
                <img src={RestUser} alt="" className="sidebarIcon"/>
                <div className={`sidebarText ${isExtended ? '' : 'hidden'}`} onClick={() => handleSidebarTextClick('계정 정보')}>계정 정보</div>
              </div>
              <div className="sidebarRow">
                <img src={Login} alt="" className="sidebarIcon"/>
                <div className={`sidebarText ${isExtended ? '' : 'hidden'}`} onClick={() => handleSidebarTextClick('로그아웃')}>로그아웃</div>
              </div>
        </div>
        <button className={`sidebaraskButton ${isExtended ? '' : 'hidden'}`} onClick={handleOpenModal}>관리자 문의</button>
      </div>
      <CheckModal />
    </div>
  );
}

export default SideBarRest;
