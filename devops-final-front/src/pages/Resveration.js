import React, { useState, useEffect } from "react";
import HeaderOrange from "../components/HeaderOrange";
import SideBar from "../components/SideBar";
import Loading from "../components/Loading";

function Reservation() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className={`mainWrapper ${isSidebarCollapsed ? "collapsed" : ""}`}>
          <SideBar className="mainSidebar" />
          <div
            className={`contentsWrapper ${
              isSidebarCollapsed ? "collapsed" : ""
            }`}
          >
            <HeaderOrange />
          </div>
        </div>
      )}
    </div>
  );
}

export default Reservation;
