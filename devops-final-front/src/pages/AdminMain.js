import React, { useState } from "react";
import AdminNav from "../components/adminn/AdminNav"
import AdminSideBar from "../components/adminn/AdminSideBar";
import HeaderBlue from "../components/adminn/HeaderBlue"
import "../css/pages/AdminMain.css";

function AdminMain() {
  const [activeButton, setActiveButton] = useState("승인 대기");

  const renderContent = () => {
    switch (activeButton) {
      case "승인 대기":
        return <div>승인 대기 컴포넌트</div>;
      case "승인 완료":
        return <div>승인 완료 컴포넌트</div>;
      case "예약 내역":
        return <div>예약 내역 컴포넌트</div>;
      case "신고 내역":
        return <div>신고 내역 컴포넌트</div>;
      case "블랙리스트":
        return <div>블랙리스트 컴포넌트</div>;
      default:
        return <div>승인 대기 컴포넌트</div>;
    }
  };

  return (
    <div className="adminMainWrapper">
      <div>
        <HeaderBlue />
        <AdminNav />
      </div>
      <div className="adminmaincontent">
        <AdminSideBar activeButton={activeButton} setActiveButton={setActiveButton} />
        <div className="adminrealcontent">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
