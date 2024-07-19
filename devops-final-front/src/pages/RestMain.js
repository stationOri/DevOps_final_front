import React, { useState } from 'react';
import HeaderOrange from "../components/HeaderOrange";
import SideBarRest from '../components/restaurant/SideBarRest';
import MenuManagement from "../components/restaurant/MenuManagement"
import "../css/pages/RestMain.css";

function RestMain() {
  const [selectedMenu, setSelectedMenu] = useState("식당정보");
  const [isExtended, setIsExtended] = useState(true);

  const handleMenuClick = (menuName) => {
    setSelectedMenu(menuName);
  };

  const toggleSidebar = () => {
    setIsExtended(!isExtended);
  };

  const temp_id =1

  return (
    <div className="mainWrapper">
      <SideBarRest className="mainSidebar" onMenuClick={handleMenuClick}  isExtended={isExtended} toggleSidebar={toggleSidebar}/>
      <div className="maincontentsWrapper">
      <div className={`behindsidebar ${isExtended ? "" : "collapsed"}`} />
            <div
              className={`innercontentsWrapper ${
                isExtended ? "" : "collapsed"
              }`}
            >
        <HeaderOrange />
        <div className='restmainrealcontents'>
          {selectedMenu === '식당정보' && <RestaurantInfo />}
          {selectedMenu === '메뉴 관리' && <MenuManagement rest_id={temp_id}/>}
          {selectedMenu === '예약' && <Reservation />}
          {selectedMenu === '웨이팅 관리' && <WaitingManagement />}
          {selectedMenu === '1:1 문의' && <ContactUs />}
          {selectedMenu === '계정 정보' && <AccountInfo />}
          {selectedMenu === '로그아웃' && <Logout />}
        </div>
      </div>
      </div>
    </div>
  );
}

function RestaurantInfo() {
  return <div>식당 정보 페이지입니다.</div>;
}

function Reservation() {
  return <div>예약 페이지입니다.</div>;
}

function WaitingManagement() {
  return <div>웨이팅 관리 페이지입니다.</div>;
}

function ContactUs() {
  return <div>1:1 문의 페이지입니다.</div>;
}

function AccountInfo() {
  return <div>계정 정보 페이지입니다.</div>;
}

function Logout() {
  return <div>로그아웃 페이지입니다.</div>;
}

export default RestMain;
