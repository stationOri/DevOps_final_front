import "../css/components/AdminSideBar.css"
function AdminSideBar() {
  
  return (
    <div className="adminSidebarWrapper">
      <div className="adminsidebarcontent">
        <button className="adminSidebatText">승인 대기</button>
        <hr className="line"/>
        <button className="adminSidebatText">승인 완료</button>
        <hr className="line"/>
        <button className="adminSidebatText">예약 내역</button>
        <hr className="line"/>
        <button className="adminSidebatText">신고 내역</button>
        <hr className="line"/>
        <button className="adminSidebatText">블랙리스트</button>
      </div>
    </div>
  );
}

export default AdminSideBar;
