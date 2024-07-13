import React from "react";
import "../../css/components/adminn/AdminNav.css";

function AdminNav({ activeNavButton, setActiveNavButton }) {
  const handleNavButtonClick = (buttonName) => {
    setActiveNavButton(buttonName);
  };

  return (
    <div className="adminnav">
      <div className="adminNavWarpper">
        <button
          className={`adminnavmenu ${activeNavButton === "식당 관리" ? "active" : ""}`}
          onClick={() => handleNavButtonClick("식당 관리")}
        >
          식당 관리
        </button>
        <button
          className={`adminnavmenu ${activeNavButton === "사용자 관리" ? "active" : ""}`}
          onClick={() => handleNavButtonClick("사용자 관리")}
        >
          사용자 관리
        </button>
        <button
          className={`adminnavmenu ${activeNavButton === "1:1문의" ? "active" : ""}`}
          onClick={() => handleNavButtonClick("1:1문의")}
        >
          1:1문의
        </button>
        <button
          className={`adminnavmenu ${activeNavButton === "로그아웃" ? "active" : ""}`}
          onClick={() => handleNavButtonClick("로그아웃")}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default AdminNav;
