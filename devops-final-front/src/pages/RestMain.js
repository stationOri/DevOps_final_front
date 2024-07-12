import React, { useState } from 'react';
import HeaderOrange from "../components/HeaderOrange";
import SideBarRest from "../components/SideBarRest";
import "../css/pages/RestMain.css"

function RestMain() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`mainWrapper ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <SideBarRest className="mainsidebar" />
      <div className={`contentsWrapper ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <HeaderOrange />
      </div>
    </div>

  );
}

export default RestMain;
