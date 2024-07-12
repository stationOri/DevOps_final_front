import "../css/components/AdminNav.css"

function AdminNav() {
  
  return (
    <div className="adminnav">
    <div className="adminNavWarpper">
      <button className="adminnavmenu">
        식당 관리
      </button>
      <button className="adminnavmenu">
        사용자 관리
      </button>
      <button className="adminnavmenu">
        1:1문의
      </button>
      <button className="adminnavmenu">
        로그아웃
      </button>
    </div>
    </div>
  );
}

export default AdminNav;
