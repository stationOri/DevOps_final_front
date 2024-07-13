import React, { useState } from "react";
import AdminNav from "../components/adminn/AdminNav";
import HeaderBlue from "../components/adminn/HeaderBlue";
import "../css/pages/AdminMain.css";
import AdminRestControl from "../components/adminn/AdminRestControl"
import AdminUserControl from "../components/adminn/AdminUserControl"

function AdminMain() {
  const [activeNavButton, setActiveNavButton] = useState("식당 관리");

  const renderNavContent = () => {
    switch (activeNavButton) {
      case "식당 관리":
        return <AdminRestControl />;
      case "사용자 관리":
        return <AdminUserControl />;
      case "1:1문의":
        return <div>1:1 문의 컴포넌트</div>;
      case "로그아웃":
        return <div>로그아웃 컴포넌트</div>;
      default:
        return <div>식당 관리 컴포넌트</div>;
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
