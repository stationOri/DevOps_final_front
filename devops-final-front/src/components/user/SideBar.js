import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/oriblue.png";
import Home from "../../assets/images/sidebar/home.png";
import Restaurant from "../../assets/images/sidebar/restaurant.png";
import Chat from "../../assets/images/sidebar/chat.png";
import Login from "../../assets/images/sidebar/login.png";
import Search from "../../assets/images/sidebar/search.png";
import ExtendBtn from "../../assets/images/sidebar/menubtn.png";
import "../../css/components/user/SideBar.css";
import SigninModal from "../Modal/SigninModal";
import SigninNaverModal from "../Modal/SigninNaverModal";
import NoticeModal from "../Modal/NoticeModal";
import { useNoticeModal } from "../Modal/NoticeModalContext";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import LoginModal from "../Modal/LoginModal";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SideBar({ isExtended, toggleSidebar }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [loginshow, setLoginshow] = useState(false);
  const [signinshow, setSigninshow] = useState(false);
  const [naversigninshow, setNaverSigninshow] = useState(false);
  const [userId, setUserId] = useState("");
  const [chatType, setChatType] = useState("");
  const { openNoticeModal } = useNoticeModal();
  const query = useQuery();
  const token = query.get("token");

  const navigate = useNavigate();

  useEffect(() => {
    
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const userinfo = jwtDecode(storedToken);
        if(!isLoggedIn){
          setUsername("Guest")
        }else{
          setUsername(userinfo.userName);
        }
        setUserId(userinfo.object.loginDto.id);
        setChatType(userinfo.object.loginDto.chatType);
        setIsLoggedIn(true); // 로그인 상태로 설정
        const signinok = query.get("signin");
        if (signinok === "true") {
          setSigninshow(true);
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    } else if (token) {
      try {
        console.log("새로운 토큰 디코딩 중")
        localStorage.setItem("token", token);
        const userinfo = jwtDecode(token);
        setUsername(userinfo.userName);
        setIsLoggedIn(true); // 로그인 상태로 설정
        const signinok = query.get("signin");
        if (signinok === "true") {
          setSigninshow(true);
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [token]);

  const handleEditNoticeModal = (contents, rest_id) => {
    openNoticeModal({
      contents: "수정해봐!",
      rest_id: rest_id,
    });
  };

  // login modal 함수
  const loginClose = () => setLoginshow(false);
  const loginShow = () => setLoginshow(true);
  
  // 회원가입 modal 함수
  const signinClose = () => setSigninshow(false);
  const signinShow = () => setSigninshow(true);

  //네이버 회원가입 modal
  const naversigninClose = () => setNaverSigninshow(false);
  const naversigninShow = () => setNaverSigninshow(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername("User Name"); // 실제 사용자 이름 가져오기
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("Guest");
  };

  return (
    <div className={`sideBarWrapper ${isExtended ? "extended" : "collapsed"}`}>
      <SigninModal signinClose={signinClose} signinshow={signinshow} />
      <SigninNaverModal naversigninClose={naversigninClose} naversigninshow={naversigninshow}/>
      <LoginModal loginClose={loginClose} loginshow={loginshow} />

      <div className="sideBarHeader">
        <div className="iconWrapper">
          <img src={Logo} alt="" className="sidebarLogo" />
          {isExtended && <div className="guestText">{username}</div>}
        </div>
        <div
          className={`sidebarsearchboxWrapper ${isExtended ? "" : "hidden"}`}
        >
          <img src={Search} alt="" className="searchLogo" />
          {isExtended && (
            <input
              type="text"
              className="sidebarsearchbox"
              placeholder="Search"
            />
          )}
        </div>
      </div>
      <button className="extendbtn" onClick={toggleSidebar}>
        <img src={ExtendBtn} alt="" className="extendbtnImg" />
      </button>
      <div className="sidebarContent">
        <div className="sidebarRow" onClick={() => navigate("/")}>
          <div className={`ctgText ${isExtended ? "" : "hidden"}`}>MAIN</div>
        </div>
        <div className="sidebarRow" onClick={() => navigate("/")}>
          <img src={Home} alt="" className="sidebarIcon" />
          <div className={`sidebarText ${isExtended ? "" : "hidden"}`}>홈</div>
        </div>
        <div className="sidebarRow" onClick={() => navigate("/restaurants")}>
          <img src={Restaurant} alt="" className="sidebarIcon rest" />
          <div className={`sidebarText ${isExtended ? "" : "hidden"}`}>
            식당 조회
          </div>
        </div>
        <div className="sidebarRow">
          <img src={Chat} alt="" className="sidebarIcon" />
          <div className={`sidebarText ${isExtended ? "" : "hidden"}`}>
            1:1 문의
          </div>
        </div>

        <div className="userContent">
          <div className="sidebarRow">
            <div className={`ctgText ${isExtended ? "" : "hidden"}`}>USER</div>
          </div>
          {isLoggedIn ? (
            <>
              <div
                className="sidebarRow"
                onClick={() => navigate(`/mypage/${userId}`)}
              >
                <img src={Login} alt="" className="sidebarIcon" />
                <div className={`sidebarText ${isExtended ? "" : "hidden"}`}>
                  마이페이지
                </div>
              </div>
              <div className="sidebarRow">
                <img src={Login} alt="" className="sidebarIcon" />
                <div
                  className={`sidebarText ${isExtended ? "" : "hidden"}`}
                  onClick={handleLogout}
                >
                  로그아웃
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="sidebarRow">
                <img src={Login} alt="" className="sidebarIcon" />
                <div
                  className={`sidebarText ${isExtended ? "" : "hidden"}`}
                  onClick={loginShow}
                >
                  로그인
                </div>
              </div>
              <div className="sidebarRow">
                <img src={Login} alt="" className="sidebarIcon" />
                <div
                  className={`sidebarText ${isExtended ? "" : "hidden"}`}
                  onClick={() => {
                    naversigninShow();
                  }}
                >
                  회원가입
                </div>
              </div>
            </>
          )}
        </div>
        <button
          className={`sidebaraskButton ${isExtended ? "" : "hidden"}`}
          onClick={handleEditNoticeModal}
        >
          관리자 문의
        </button>
      </div>
      <NoticeModal />
    </div>
  );
}

export default SideBar;
