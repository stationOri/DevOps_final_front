import Logo from "../assets/images/oriblue.png"
import Home from "../assets/images/home.png"
import Restaurant from "../assets/images/restaurant.png"
import Reservation from "../assets/images/reservation.png"
import Chat from "../assets/images/chat.png"
import Login from "../assets/images/login.png"
import Search from "../assets/images/search.png"
import ExtendBtn from "../assets/images/menubtn.png"
import "../css/components/SideBar.css"


function SideBar() {
  
  return (
    <div className="sideBarWrapper">
      <div className="sideBarHeader">
        <div className="iconWrapper">
          <img src={Logo} alt="" className="sidebarLogo"/>
          <div className="guestText">Guest</div>
        </div>
        <div className="sidebarsearchboxWrapper">
          <img src={Search} alt="" className="searchLogo"/>
          <input 
            type="text" 
            className="sidebarsearchbox"
            placeholder="Search"
            ></input>
        </div>
      </div>
      <button className="extendbtn">
          <img src={ExtendBtn} alt="" className="extendbtnImg"/>
      </button>
      <div className="sidebarContent">
        <div className="mainContent">
          <div className="sidebarRow">
          <div className="ctgText">MAIN</div>
          </div>
          <div className="sidebarRow">
            <img src={Home} alt="" className="sidebarIcon"/>
            <div className="sidebarText">홈</div>
          </div>
          <div className="sidebarRow">
            <img src={Restaurant} alt="" className="sidebarIcon rest"/>
            <div className="sidebarText">식당 조회</div>
          </div>
          <div className="sidebarRow">
            <img src={Reservation} alt="" className="sidebarIcon"/>
            <div className="sidebarText">예약</div>
          </div>
          <div className="sidebarRow">
            <img src={Chat} alt="" className="sidebarIcon"/>
            <div className="sidebarText">1:1 문의</div>
          </div>
        </div>
        <div className="userContent">
        <div className="sidebarRow">
          <div className="ctgText">USER</div>
          </div>
          <div className="sidebarRow">
            <img src={Login} alt="" className="sidebarIcon"/>
            <div className="sidebarText">로그인</div>
          </div>
          <div className="sidebarRow">
            <img src={Login} alt="" className="sidebarIcon"/>
            <div className="sidebarText">회원가입</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
