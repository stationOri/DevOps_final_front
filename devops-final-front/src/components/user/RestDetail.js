import React, { useState, useEffect } from "react";
import "../../css/pages/RestDetailPage.css";
import Loading from "../../components/Loading";
import StarRatings from "../../components/StarRatings";
import RestaurantLocationMap from "../../components/RestaurantLocationMap";
import ReviewCard from "../../components/ReviewCard";
import rightImg from "../../assets/images/detail/right.png";
import leftImg from "../../assets/images/detail/left.png";
import locationImg from "../../assets/images/detail/location.png";
import opentimeImg from "../../assets/images/detail/opentime.png";
import phoneImg from "../../assets/images/detail/phone.png";
import emptyImg from "../../assets/images/detail/empty.png";
import quotesImg1 from "../../assets/images/detail/quotes.png";
import quotesImg2 from "../../assets/images/detail/quotes2.png";
import EmptyEnrollModal from "../../components/Modal/EmptyEnrollModal";
import WaitingEnrollModal from "../../components/Modal/WaitingEnrollModal";

const RestDetail = ({ userId, restId, moveToReservation }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [opentimes, setOpentimes] = useState([]);
  const [menus, setMenus] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWaitingModalOpen, setIsWaitingModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openWaitingModal = () => {
    setIsWaitingModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsWaitingModalOpen(false);
  };

  const moveFunc = () => {
    moveToReservation(restId);
  };

  const convertDayToKorean = (day) => {
    switch (day) {
      case "MON":
        return "월요일";
      case "TUE":
        return "화요일";
      case "WED":
        return "수요일";
      case "THU":
        return "목요일";
      case "FRI":
        return "금요일";
      case "SAT":
        return "토요일";
      case "SUN":
        return "일요일";
      case "HOL":
        return "공휴일";
      default:
        return day;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchRestaurant(),
          fetchOpentimes(),
          fetchMenus(),
          fetchReviews(),
        ]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [restId]);

  const fetchRestaurant = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/restaurants/${restId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant");
      }
      const data = await response.json();
      setRestaurant(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const fetchOpentimes = async () => {
    try {
      const response = await fetch(`http://localhost:8080/opentime/${restId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch opentimes");
      }
      const data = await response.json();

      const opentimesFormatted = data.map((opentime) => ({
        ...opentime,
        restDay: convertDayToKorean(opentime.restDay),
      }));

      setOpentimes(opentimesFormatted);
    } catch (error) {
      console.error("Error fetching opentimes:", error);
      setOpentimes([]);
    }
  };

  const fetchMenus = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/restaurants/menu/${restId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch menus");
      }
      const data = await response.json();
      setMenus(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/review/rest/${restId}/user/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading || !restaurant || error) {
    return <Loading />;
  }

  const paginate = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(reviews.length / reviewsPerPage)) {
      return;
    }
    setCurrentPage(newPage);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div className="detail">
      <EmptyEnrollModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userId={userId}
        name={restaurant.restName}
      />
      <WaitingEnrollModal
        isOpen={isWaitingModalOpen}
        onClose={closeModal}
        userId={userId}
        name={restaurant.restName}
      />
      <div className="rest-container">
        <div className="rest-photo-box">
          <img
            className="rest-photo"
            src={restaurant.restPhoto}
            alt={restaurant.restName}
          />
        </div>
        <div className="rest-info-box">
          <div className="rest-name-box">
            <div className="rest-name">{restaurant.restName}</div>
            <div className="rest-btn-box">
              <div className="empty-btn" onClick={openModal}>
                <img className="empty-img" src={emptyImg} />
                <div>빈자리 알림 요청</div>
              </div>
              <div className="ask-btn">
                <div className="btn-content">1:1 문의</div>
              </div>
              {restaurant.revWait === "A" && (
                <div className="res-btn" onClick={openWaitingModal}>
                  <div className="btn-content">웨이팅</div>
                </div>
              )}
              {restaurant.revWait === "B" && (
                <div className="res-btn" onClick={moveFunc}>
                  <div className="btn-content">예약</div>
                </div>
              )}
              {restaurant.revWait === "C" && (
                <>
                  <div className="res-btn" onClick={openWaitingModal}>
                    <div className="btn-content">웨이팅</div>
                  </div>
                  <div className="res-btn" onClick={moveFunc}>
                    <div className="btn-content">예약</div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div></div>
          <StarRatings rating={restaurant.restGrade} />
          <div className="rest-intro-box">
            <div>
              <span className="rest-keyword">#{restaurant.keyword1} </span>
              <span className="rest-keyword">#{restaurant.keyword2} </span>
              <span className="rest-keyword">#{restaurant.keyword3} </span>
            </div>
            <p>{restaurant.restIntro}</p>
          </div>
        </div>
        <div className="rest-box">
          <div className="rest-title">Announcement</div>
          <div className="rest-announce-box">
            <div className="quotes-img-container quotes-img-1">
              <img className="quotes-img" src={quotesImg1} alt="quote 1" />
            </div>
            <p>{restaurant.restPost}</p>
            <div className="quotes-img-container quotes-img-2">
              <img className="quotes-img" src={quotesImg2} alt="quote 2" />
            </div>
          </div>
        </div>
        <div className="rest-box">
          <div className="rest-title">Menu</div>
          <div>
            <div className="menu-container">
              {menus.map((menu) => (
                <li key={menu.id} className="menu-li">
                  <div className="menu-box">
                    <img
                      className="menu-img"
                      src={menu.menuPhoto}
                      alt={menu.menuName}
                    />
                    <div className="menu-info-box">
                      <p className="menu-title">{menu.menuName}</p>
                      <p className="menu-price">{menu.menuPrice}원</p>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </div>
        </div>
        <div className="rest-box">
          <div className="rest-title">Hours and Location</div>
          <div className="rest-location-box">
            <div className="rest-map">
              <RestaurantLocationMap address={restaurant.restAddress} />
            </div>
            <div className="rest-location-wrap">
              <div className="rest-info-wrap">
                <img className="rest-info-img" src={locationImg} />
                <p className="rest-info-content">{restaurant.restAddress}</p>
              </div>
              <div className="rest-info-wrap-2">
                <img className="rest-info-img" src={opentimeImg} />
                <div>
                  {opentimes.map((opentime) => (
                    <div key={opentime.id} className="rest-info-content">
                      {opentime.restDay} : {opentime.restOpen} ~{" "}
                      {opentime.restClose} / 브레이크타임 :{" "}
                      {opentime.restBreakstart} ~ {opentime.restBreakend}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rest-info-wrap">
                <img className="rest-info-img" src={phoneImg} />
                <p className="rest-info-content">{restaurant.restPhone}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rest-box">
          <div className="rest-title">Reviews</div>
          <div className="rest-reviews-with-pagination">
            <div
              className="pagination-btn"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <img className="review-pagination-img" src={leftImg} />
            </div>
            <div className="rest-review-container">
              {currentReviews.length === 0 ? (
                <div className="rest-no-review">리뷰가 없습니다</div>
              ) : (
                currentReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              )}
            </div>
            <div
              className="pagination-btn"
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(reviews.length / reviewsPerPage)
              }
            >
              <img className="review-pagination-img" src={rightImg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestDetail;