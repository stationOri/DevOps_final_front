import React, { useState } from "react";
import HeaderOrange from "../components/HeaderOrange";
import SideBar from "../components/user/SideBar";
import RestaurantInfo from "../components/user/RestaurantInfo";
import RestDetail from "../components/user/RestDetail";
import UserChat from "../components/user/UserChat";
import Mypage from "../components/user/Mypage";
import "../css/pages/RestMain.css";

function UserMain() {
  const [selectedMenu, setSelectedMenu] = useState("홈");
  const [isExtended, setIsExtended] = useState(true);
  const [userId, setUserId] = useState("");

  const handleMenuClick = (menuName) => {
    setSelectedMenu(menuName);
  };

  const toggleSidebar = () => {
    setIsExtended(!isExtended);
  };

  return (
    <div className="mainWrapper">
      <SideBar
        className="mainSidebar"
        onMenuClick={handleMenuClick}
        isExtended={isExtended}
        toggleSidebar={toggleSidebar}
        setUserId={setUserId}
      />
      <div className="maincontentsWrapper">
        <div className={`behindsidebar ${isExtended ? "" : "collapsed"}`} />
        <div
          className={`innercontentsWrapper ${isExtended ? "" : "collapsed"}`}
        >
          <HeaderOrange />
          <div className="restmainrealcontents">
            {selectedMenu === "홈" && <RestaurantInfo onMenuEditClick={handleMenuClick} userId={userId}/>}
            {selectedMenu === "식당 조회" && <RestDetail onMenuEditClick={handleMenuClick} userId={userId}/>}
            {selectedMenu === "1:1 문의" && <UserChat onMenuEditClick={handleMenuClick} userId={userId}/>}
            {selectedMenu === "마이페이지" && <Mypage onMenuEditClick={handleMenuClick} userId={userId}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserMain;
