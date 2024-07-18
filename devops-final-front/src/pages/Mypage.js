import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/pages/Mypage.css";
import HeaderOrange from "../components/HeaderOrange";
import SideBar from "../components/user/SideBar";
import Loading from "../components/Loading";

import profileImg from "../assets/images/mypage/profile.png";
import phoneImg from "../assets/images/mypage/phone.png";
import mailImg from "../assets/images/mypage/mail.png";
import calImg from "../assets/images/modal/cal.png";
import peopleImg from "../assets/images/modal/people.png";

function Mypage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isExtended, setIsExtended] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 3;

  const toggleSidebar = () => {
    setIsExtended(!isExtended);
  };

  useEffect(() => {
    fetchUser();
    fetchReservations();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:4000/users/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await fetch(`http://localhost:4000/reservations`);
      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const data = await response.json();
      setReservations(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`http://localhost:8080/favorite/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservations.slice(
    indexOfFirstReservation,
    indexOfLastReservation
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderReservationAction = (reservation) => {
    if (reservation.paymentStatus === "REFUND_READY") {
      return (
        <div className="my-res-refund-review">
          <div className="my-res-info-refund-status">환불 대기중</div>
          <div className="my-res-info-refund-total">
            환불될 예약금 {reservation.refund}원
          </div>
        </div>
      );
    } else if (reservation.resStatus === "VISITED") {
      return <button className="my-res-info-review-btn">리뷰</button>;
    } else {
      return <button className="my-res-info-res-btn">예약 취소</button>;
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="usermainWrapper">
          <SideBar
            className="mainSidebar"
            toggleSidebar={toggleSidebar}
            isExtended={isExtended}
          />
          <div className="maincontentsWrapper">
            <div className={`behindsidebar ${isExtended ? "" : "collapsed"}`} />
            <div
              className={`innercontentsWrapper ${
                isExtended ? "" : "collapsed"
              }`}
            >
              <HeaderOrange />
              <div className="my-container">
                <div className="profile-container">
                  <div className="profile-title-box">
                    <img src={profileImg} className="profile-Img" />
                    <div className="profile-title">Profile</div>
                  </div>
                  <div className="my-info">
                    <div className="my-horizon" />
                    <div className="my-info-box">
                      <div className="my-info-item">
                        <div className="my-info-item-title">
                          {user?.userNickname}
                        </div>
                        <div className="my-info-item-content-box">
                          <img src={phoneImg} className="user-info-Img" />
                          <div className="my-info-item-content">
                            {user?.userPhone}
                          </div>
                        </div>
                        <div className="my-info-item-content-box">
                          <img src={mailImg} className="user-info-Img" />
                          <div className="my-info-item-content">
                            {user?.userEmail}
                          </div>
                        </div>
                        <div className="my-info-item-content-box">
                          <div className="my-info-update-btn">
                            회원정보 수정
                          </div>
                        </div>
                      </div>
                      <div className="my-res-info-box">
                        <div className="my-res-info-content-box">
                          <div>진행중인 예약</div>
                          <div>3건</div>
                        </div>
                        <div className="my-res-info-content-box">
                          <div>완료된 예약</div>
                          <div>3건</div>
                        </div>
                        <div className="my-res-info-content-box">
                          <div>방문한 가게</div>
                          <div>3건</div>
                        </div>
                      </div>
                    </div>
                    <div className="my-horizon" />
                  </div>
                </div>
                <div className="my-res-waiting-container">
                  <div className="my-res-container">
                    <div>History and Recent Bookings</div>
                    <div className="my-horizon" />
                    <div className="my-page-res-content-box">
                      {currentReservations.map((reservation) => (
                        <div key={reservation.id} className="my-res-map-box">
                          <div className="my-res-box">
                            <div>
                              <img
                                src={reservation.restPhoto}
                                className="my-res-restphoto"
                                alt="Restaurant"
                              />
                            </div>
                            <div className="my-res-info-wrap">
                              <div>
                                <div className="my-res-info-rest-name">
                                  {reservation.restName}
                                </div>
                                <div className="my-res-info-res-status">
                                  {reservation.resStatus}
                                </div>
                                <div className="my-res-info-img-wrap">
                                  <img src={calImg} className="my-res-Img" />
                                  <div>{reservation.resDatetime}</div>
                                </div>
                                <div className="my-res-info-img-wrap">
                                  <img src={peopleImg} className="my-res-Img" />
                                  <div>{reservation.resNum}명</div>
                                </div>
                              </div>
                              <div className="my-res-refund-review">
                                <div className="my-res-refund-box">
                                  {renderReservationAction(reservation)}
                                </div>
                                <div className="my-res-info-rest-report">
                                  식당 신고
                                </div>
                                <div className="my-res-info-res-id">
                                  reservation id: {reservation.id}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="my-res-horizon" />
                        </div>
                      ))}
                    </div>
                    <div className="my-page-res-pagination">
                      {Array.from({
                        length: Math.ceil(
                          reservations.length / reservationsPerPage
                        ),
                      }).map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => paginate(index + 1)}
                          className={currentPage === index + 1 ? "active" : ""}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="my-waiting-container">
                    <div className="my-waiting-title">웨이팅 신청 완료</div>
                  </div>
                </div>
                <div className="my-favorites-container"></div>

                <div className="my-review-most-container"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mypage;
