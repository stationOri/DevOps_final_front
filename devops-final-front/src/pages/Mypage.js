import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/pages/Mypage.css";
import HeaderOrange from "../components/HeaderOrange";
import SideBar from "../components/user/SideBar";
import Loading from "../components/Loading";
import MostReservedRestaurantsChart from "../components/user/MostReservedRestaurantsChart";

import profileImg from "../assets/images/mypage/profile.png";
import phoneImg from "../assets/images/detail/phone.png";
import mailImg from "../assets/images/mypage/mail.png";
import calImg from "../assets/images/modal/cal.png";
import peopleImg from "../assets/images/modal/people.png";
import alarmImg from "../assets/images/mypage/alarm.png";
import infoImg from "../assets/images/mypage/info.png";
import RestCard from "../components/RestCard";
import DatePicker from "react-datepicker";
import MyReviewCard from "../components/MyReviewCard";
import Pagination from "../components/Pagination";
import rightImg from "../assets/images/detail/right.png";
import leftImg from "../assets/images/detail/left.png";
import locationImg from "../assets/images/detail/location.png";

function Mypage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isExtended, setIsExtended] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [waiting, setWaiting] = useState([]);
  const [isWaitingLoading, setIsWaitingLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [mostRest, setMostRest] = useState([]);
  const [resCount, setResCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewCurrentPage, setReviewCurrentPage] = useState(1);
  const [favoritesCurrentPage, setFavoritesCurrentPage] = useState(1);

  const reservationsPerPage = 3;
  const reviewPerPage = 2;
  const favoritesPerPage = 3;

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExtended(!isExtended);
  };

  const onPageChange = (pageNumber) => {
    setReviewCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchUser();
    fetchReservations();
    fetchFavorites();
    fetchMost();
    fetchWaiting();
    fetchReviews();
    fetchResCount();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/${id}`);
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
      const response = await fetch(`http://localhost:8080/reservations/user/${id}`);
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

  const fetchResCount = async () => {
    try {
      const response = await fetch(`http://localhost:8080/reservations/user/${id}/counts`);
      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const data = await response.json();
      setResCount(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const fetchWaiting = async () => {
    try {
      const response = await fetch(`http://localhost:8080/waiting/user/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch waiting");
      }
      const data = await response.json();
      setWaiting(data);
      setIsWaitingLoading(false);
    } catch (error) {
      setWaiting(null);
      setIsWaitingLoading(false);
      console.error("Error fetching waiting:", error);
    }
  };

  const fetchMost = async () => {
    try {
      const response = await fetch(`http://localhost:8080/restaurants/most/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch visited restaurants");
      }
      const data = await response.json();
      setMostRest(data);
    } catch (error) {
      console.error("Error fetching most visited restaurants:", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`http://localhost:8080/favorite/${id}/rest`);
      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }
      const data = await response.json();
      setFavorites(data);
      console.log("Favorites:", data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8080/review/user/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user review");
      }
      const data = await response.json();
      setReviews(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservations.slice(
    indexOfFirstReservation,
    indexOfLastReservation
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const favpaginate = (pageNumber) => {
    if (pageNumber < 1) {
      setFavoritesCurrentPage(1);
    } else if (pageNumber > Math.ceil(favorites.length / favoritesPerPage)) {
      setFavoritesCurrentPage(Math.ceil(favorites.length / favoritesPerPage));
    } else {
      setFavoritesCurrentPage(pageNumber);
    }
  };

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

  const getStatusMessage = (status) => {
    switch (status) {
      case "IN_QUEUE":
        return "대기";
      case "WALKIN_REQUESTED":
        return "입장 요청";
      case "WALKIN":
        return "입장완료";
      case "QUEUE_CANCELED":
        return "대기 취소";
      case "NOSHOW":
        return "노쇼";
      default:
        return "없음";
    }
  };

  const handleCancel = async () => {
    try {
      await axios.put(
        `http://localhost:8080/waiting/${waiting.waitingId}`,
        "QUEUE_CANCELED",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("웨이팅 취소 완료");
      window.location.reload();
    } catch (error) {
      console.error("Error canceling the reservation:", error);
    }
  };

  const toggleFavorite = async (restId, isFavorite) => {
    try {
      const existingFavorite = favorites.find(
        (favorite) => favorite.restId === restId
      );
      console.log("existingFavorite:", existingFavorite)
        
      if (existingFavorite) {
        const response = await fetch(
          `http://localhost:8080/favorite/${id}/rest/${restId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("찜취소: ", response);

        if (response.ok) {
          fetchFavorites();
        } else {
          throw new Error("Failed to remove favorite");
        }
      } else {
        const response = await fetch(
          `http://localhost:8080/favorite/${id}/rest/${restId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("찜추가: ", response);

        if (response.ok) {
          fetchFavorites();
        } else {
          throw new Error("Failed to add favorite");
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error.message);
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
                          <div>{resCount?.nowCount}건</div>
                        </div>
                        <div className="my-res-info-content-box">
                          <div>완료된 예약</div>
                          <div>{resCount?.pastCount}건</div>
                        </div>
                        <div className="my-res-info-content-box">
                          <div>방문한 가게</div>
                          <div>{resCount?.restCount}건</div>
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
                        <div key={reservation.resId} className="my-res-map-box">
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
                                  reservation id: {reservation.resId}
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
                    {isWaitingLoading ? (
                      <div className="my-waiting-no">웨이팅이 없습니다.</div>
                    ) : waiting ? (
                      <div>
                        <div className="my-waiting-title">
                          <span className="my-waiting-point">웨이팅 신청</span>{" "}
                          완료
                        </div>
                        <div className="my-waiting-num-box">
                          <div>대기번호</div>
                          <div className="al-c">
                            <div className="my-waiting-point fs-40">
                              {waiting.waitingNum}
                            </div>
                            <div>번</div>
                          </div>
                        </div>
                        <div className="al-c my-waiting-info-text">
                          <img src={infoImg} className="profile-Img" />
                          {waiting.waitingStatus === "QUEUE_CANCELED" ? (
                            <div>대기를 취소했습니다.</div>
                          ) : (
                            <div>현재 내 앞 대기 {waiting.waitingLeft} 팀 </div>
                          )}
                        </div>
                        <div className="my-waiting-rest-info">
                          <div className="ju-sb">
                            <div>매장명</div>
                            <div>{waiting.restName}</div>
                          </div>
                          <div className="ju-sb">
                            <div>인원</div>
                            <div>{waiting.waitingPpl} 명</div>
                          </div>
                          <div className="ju-sb">
                            <div>신청 상태</div>
                            <div>{getStatusMessage(waiting.waitingStatus)}</div>
                          </div>
                        </div>
                        <div className="al-c my-waiting-info-text">
                          <img src={alarmImg} className="profile-Img" />
                          <div>
                            {waiting.waitingStatus === "QUEUE_CANCELED" ? (
                              <div>대기를 취소했습니다.</div>
                            ) : waiting.waitingLeft !== 0 ? (
                              <div>
                                현재 예상 대기시간은{" "}
                                <span className="fs-20">
                                  {waiting.waitingLeft * 10}분
                                </span>{" "}
                                입니다.
                              </div>
                            ) : (
                              <div>지금 입장하세요!</div>
                            )}
                          </div>
                        </div>
                        <div className="my-waiting-info-btn-box">
                          <div
                            className="my-waiting-info-btn"
                            onClick={handleCancel}
                          >
                            <div>취소</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="my-waiting-no">웨이팅이 없습니다.</div>
                    )}
                  </div>
                </div>
                <div className="my-favorites-container">
                  <div
                    className="pagination-btn"
                    onClick={() => favpaginate(favoritesCurrentPage - 1)}
                    disabled={favoritesCurrentPage === 1}
                  >
                    <img
                      className="review-pagination-img"
                      src={leftImg}
                      alt="Previous Page"
                    />
                  </div>
                  <div className="my-favorite-card-wrap">
                    {loading ? (
                      <Loading />
                    ) : (
                      <div className="favorite-list">
                        {favorites.length === 0 ? (
                          <div className="no-favorites">
                            찜한 식당이 없습니다.
                          </div>
                        ) : (
                          favorites
                            .slice(
                              (favoritesCurrentPage - 1) * favoritesPerPage,
                              favoritesCurrentPage * favoritesPerPage
                            )
                            .map((favorite) => (
                              <RestCard
                                key={favorite.restId}
                                userId={id}
                                restId={favorite.restId}
                                img={favorite.restPhoto}
                                RestName={favorite.restName}
                                RestAddress={favorite.restAddress}
                                RestOpentimes={favorite.restOpentimes}
                                keyword1={favorite.keyword1}
                                keyword2={favorite.keyword2}
                                keyword3={favorite.keyword3}
                                isFavorite={favorite.favorite}
                                toggleFavorite={toggleFavorite}
                              />
                            ))
                        )}
                      </div>
                    )}
                  </div>
                  <div
                    className="pagination-btn"
                    onClick={() => favpaginate(favoritesCurrentPage + 1)}
                    disabled={
                      favoritesCurrentPage ===
                      Math.ceil(favorites.length / favoritesPerPage)
                    }
                  >
                    <img
                      className="review-pagination-img"
                      src={rightImg}
                      alt="Next Page"
                    />
                  </div>
                </div>
                <div className="my-review-most-container">
                  <div className="my-review-container">
                    <div className="my-review-box">
                      <div className="my-review-title">My Reviews</div>
                      {/* <DatePicker
                        selected={new Date()}
                        onChange={(date) => console.log(date)}
                        className="picker"
                        dateFormat="yyyy-MM-dd"
                      /> */}
                    </div>
                    <div className="my-review-wrap">
                      {reviews
                        .slice(
                          (reviewCurrentPage - 1) * reviewPerPage,
                          reviewCurrentPage * reviewPerPage
                        )
                        .map((review) => (
                          <MyReviewCard key={review.reviewId} review={review} />
                        ))}
                      <Pagination
                        totalItems={reviews.length}
                        itemsPerPage={reviewPerPage}
                        currentPage={reviewCurrentPage}
                        onPageChange={onPageChange}
                        activeColor="#FF8A00"
                      />
                    </div>
                  </div>
                  <div className="my-most-container">
                    <div className="my-most-graph-container">
                      <MostReservedRestaurantsChart userId={id} />
                    </div>
                    <div className="my-most-card-container">
                      {mostRest.map((rest) => (
                        <div className="my-most-card-box" key={rest.restId}>
                          <div>
                            <img className="my-most-card-rest-img" src={rest.restPhoto} onClick = {() => navigate(`/restaurants/${rest.restId}`)}/>
                          </div>
                          <div className="my-most-card-rest-info">
                            <div className="my-most-card-title">{rest.restName}</div>
                            <div className="my-most-card-content">
                              <img src={phoneImg} className="my-most-card-icon"/>
                              <div>{rest.restPhone}</div>
                            </div>
                            <div className="my-most-card-content">
                              <img src={locationImg} className="my-most-card-icon" />
                              <div>{rest.restAddress}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mypage;
