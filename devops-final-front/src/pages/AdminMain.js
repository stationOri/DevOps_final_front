import AdminNav from "../components/AdminNav";
import AdminSideBar from "../components/AdminSideBar";
import HeaderBlue from "../components/HeaderBlue"
import "../css/pages/AdminMain.css"


function AdminMain() {
  
  return (
    <div className="adminMainWrapper">
      <div>
      <HeaderBlue />
      <AdminNav />
      </div>
      <div className="adminmaincontent">
        <AdminSideBar className="adsidebar"/>
        <div className="adminrealcontent">
          dddd
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
