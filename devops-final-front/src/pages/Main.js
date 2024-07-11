import React, { useState } from 'react';
import HeaderOrange from "../components/HeaderOrange";
import SideBar from "../components/Sidebar";
import "../css/pages/Main.css";

function Main() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`mainWrapper ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <SideBar className="mainsidebar" />
      <div className={`contentsWrapper ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <HeaderOrange />
      </div>
    </div>
  );
}

export default Main;
