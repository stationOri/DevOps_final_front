import React, { useState } from "react";
import AdminUserSideBar from "./AdminUserSideBar";
import "../../css/components/adminn/AdminUserControl.css";
import AdminUserList from "../adminn/AdminUserList"
import AdminUserReport from "../adminn/AdminUserReport"

function AdminUserControl() {
  const [activeButton, setActiveButton] = useState("유저 목록");

  const renderContent = () => {
    switch (activeButton) {
      case "유저 목록":
        return <AdminUserList />;
      case "신고 내역":
        return <AdminUserReport />;
      case "블랙리스트":
        return <div>블랙리스트 컴포넌트</div>;
      default:
        return <AdminUserList />;
    }
  };

  return (
    <div className="admin--user-control-root">
      <AdminUserSideBar 
        className="adsidebar" 
        activeButton={activeButton} 
        setActiveButton={setActiveButton} 
      />
      <div className="adminrealcontent">
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminUserControl;
