import React, { useState, useEffect } from "react";
import AdminNav from "../components/adminn/AdminNav";
import HeaderBlue from "../components/adminn/HeaderBlue";
import "../css/pages/AdminMain.css";
import AdminRestControl from "../components/adminn/AdminRestControl"
import AdminUserControl from "../components/adminn/AdminUserControl"
import AdminChat from "../components/chatt/AdminChat"

function AdminMain() {
  const [activeNavButton, setActiveNavButton] = useState("식당 관리");
  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    setAdminId(1208);
  }, [adminId]);

  const renderNavContent = () => {
    switch (activeNavButton) {
      case "식당 관리":
        return <AdminRestControl />;
      case "사용자 관리":
        return <AdminUserControl />;
      case "1:1문의":
        return <AdminChat adminId={adminId} />;
      case "로그아웃":
        return <div>로그아웃 컴포넌트</div>;
      default :
        return <AdminRestControl />;
    }
  };

  return (
    <div className="adminMainWrapper">
      <div>
        <HeaderBlue />
        <AdminNav activeNavButton={activeNavButton} setActiveNavButton={setActiveNavButton} />
      </div>
      <div className="adminmaincontent">
        {renderNavContent()}
      </div>
    </div>
  );
}

export default AdminMain;
