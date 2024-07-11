import AdminNav from "../components/AdminNav";
import HeaderBlue from "../components/HeaderBlue"
import "../css/pages/AdminMain.css"


function AdminMain() {
  
  return (
    <div className="adminMainWrapper">
      <HeaderBlue />
      <AdminNav />
    </div>
  );
}

export default AdminMain;
