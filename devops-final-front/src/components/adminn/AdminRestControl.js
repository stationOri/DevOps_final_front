import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import "../../css/components/adminn/AdminRestControl.css"
import AdminRestAccept from "./AdminRestAccept";
import AdminRestAfterAccept from "./AdminRestAfterAccept";
import AdminRestReservation from "./AdminRestReservation";

function AdminRestControl() {
  const [activeButton, setActiveButton] = useState("승인 대기");

  const renderContent = () => {
    switch (activeButton) {
      case "승인 대기":
        return <AdminRestAccept />;
      case "승인 완료":
        return <AdminRestAfterAccept />;
      case "예약 내역":
        return <AdminRestReservation />;
      case "신고 내역":
        return <div>신고 내역 컴포넌트</div>;
      case "블랙리스트":
        return <div>블랙리스트 컴포넌트</div>;
      default:
        return <div>승인 대기 컴포넌트</div>;
    }
  };
  return (
    <div className="admin--rest-control-root">
        <AdminSideBar className="adsidebar" activeButton={activeButton} setActiveButton={setActiveButton} />
        <div className="adminrealcontent">
          {renderContent()}
        </div>
    </div>
  )
}

export default AdminRestControl;