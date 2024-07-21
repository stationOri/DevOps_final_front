import React, { useState } from 'react';
import HeaderOrange from "../components/HeaderOrange";
import SideBarRest from '../components/restaurant/SideBarRest';
import MenuManagement from "../components/restaurant/MenuManagement"
import Reservation from '../components/restaurant/Reservation';
import WaitingManagement from '../components/restaurant/WaitingManagement';
import RestaurantInfo from '../components/restaurant/RestaurantInfo';
import RestaurantInfoEdit from '../components/restaurant/RestaurantInfoEdit';
import "../css/pages/RestMain.css";

function RestMain() {
  const [selectedMenu, setSelectedMenu] = useState("식당정보");
  const [isExtended, setIsExtended] = useState(true);
  const [selectedRestId, setSelectedRestId] = useState(null);

  const handleMenuClick = (menuName) => {
    setSelectedMenu(menuName);
  };

  const toggleSidebar = () => {
    setIsExtended(!isExtended);
  };

  const handleInfoEditClick = (id) => {
    console.log("식당 정보 수정 버튼 클릭됨, ID:", id); 
    setSelectedRestId(id);
    setSelectedMenu("식당정보 수정");
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
          {selectedMenu === '식당정보' && <RestaurantInfo onMenuEditClick={handleMenuClick} onInfoEditClick={handleInfoEditClick} />}
          {selectedMenu === '식당정보 수정' && <RestaurantInfoEdit id={selectedRestId} />}
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
