import React, { useState } from "react";
import AdminUserSideBar from "./AdminUserSideBar";
import "../../css/components/adminn/AdminUserControl.css";

function AdminUserControl() {
  const [activeButton, setActiveButton] = useState("유저 목록");

  const renderContent = () => {
    switch (activeButton) {
      case "유저 목록":
        return <div>유저 목록 컴포넌트</div>;
      case "신고 내역":
        return <div>신고 내역 컴포넌트</div>;
      case "블랙리스트":
        return <div>블랙리스트 컴포넌트</div>;
      default:
        return <div>유저 목록 컴포넌트</div>;
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
