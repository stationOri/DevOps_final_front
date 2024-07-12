import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/pages/RestDetailPage.css";
import HeaderOrange from "../components/HeaderOrange";
import SideBar from "../components/SideBar";
import Loading from "../components/Loading";
import StarRatings from "../components/StarRatings";
import RestaurantLocationMap from "../components/RestaurantLocationMap";
import ReviewCard from "../components/ReviewCard";
import rightImg from "../assets/images/detail/right.png";
import leftImg from "../assets/images/detail/left.png";
import locationImg from "../assets/images/detail/location.png";
import opentimeImg from "../assets/images/detail/opentime.png";
import phoneImg from "../assets/images/detail/phone.png";
import emptyImg from "../assets/images/detail/empty.png";
import quotesImg1 from "../assets/images/detail/quotes.png";
import quotesImg2 from "../assets/images/detail/quotes2.png";
import EmptyEnrollModal from "../components/Modal/EmptyEnrollModal";

function RestDetailPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [opentimes, setOpentimes] = useState([]);
  const [menus, setMenus] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchRestaurant();
    fetchOpentimes();
    fetchMenus();
    fetchReviews();
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restaurants/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant");
      }
      const data = await response.json();
      setRestaurant(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOpentimes = async () => {
    try {
      const response = await fetch(`http://localhost:4000/opentime`);
      if (!response.ok) {
        throw new Error("Failed to fetch opentime");
      }
      const data = await response.json();
      setOpentimes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMenus = async () => {
    try {
      const response = await fetch("http://localhost:4000/menu");
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
      const response = await fetch("http://localhost:4000/reviews");
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredOpentimes = opentimes.filter(
    (opentime) => opentime.rest_id === parseInt(id)
  );
  const filteredMenus = menus.filter((menu) => menu.rest_id === parseInt(id));
  const filteredReviews = reviews.filter(
    (review) => review.rest_id === parseInt(id)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!restaurant) {
    return <div>No restaurant found</div>;
  }

  const paginate = (newPage) => {
    if (
      newPage < 1 ||
      newPage > Math.ceil(filteredReviews.length / reviewsPerPage)
    ) {
      return;
    }
    setCurrentPage(newPage);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

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
            <div className="detail">
              <EmptyEnrollModal
                isOpen={isModalOpen}
                onClose={closeModal}
                name={restaurant.rest_name}
              />
              <div className="rest-container">
                <div className="rest-photo-box">
                  <img
                    className="rest-photo"
                    src={restaurant.rest_photo}
                    alt={restaurant.rest_name}
                  />
                </div>
                <div className="rest-info-box">
                  <div className="rest-name-box">
                    <div className="rest-name">{restaurant.rest_name}</div>
                    <div className="rest-btn-box">
                      <div className="empty-btn" onClick={openModal}>
                        <img className="empty-img" src={emptyImg} />
                        <div>빈자리 알림 요청</div>
                      </div>
                      <div className="ask-btn">
                        <div className="btn-content">1:1 문의</div>
                      </div>
                      {restaurant.rev_wait === "A" && (
                        <div className="res-btn">
                          <div className="btn-content">웨이팅</div>
                        </div>
                      )}
                      {restaurant.rev_wait === "B" && (
                        <div className="res-btn">
                          <div className="btn-content">예약</div>
                        </div>
                      )}
                      {restaurant.rev_wait === "C" && (
                        <>
                          <div className="res-btn">
                            <div className="btn-content">웨이팅</div>
                          </div>
                          <div className="res-btn">
                            <div className="btn-content">예약</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div></div>
                  <StarRatings rating={restaurant.rest_grade} />
                  <div className="rest-intro-box">
                    <div>
                      <span className="rest-keyword">
                        #{restaurant.keyword2}{" "}
                      </span>
                      <span className="rest-keyword">
                        #{restaurant.keyword3}{" "}
                      </span>
                      <span className="rest-keyword">
                        #{restaurant.keyword1}{" "}
                      </span>
                    </div>
                    <p>{restaurant.rest_intro}</p>
                  </div>
                </div>
                <div className="rest-box">
                  <div className="rest-title">Announcement</div>
                  <div className="rest-announce-box">
                    <div className="quotes-img-container quotes-img-1">
                      <img
                        className="quotes-img"
                        src={quotesImg1}
                        alt="quote 1"
                      />
                    </div>
                    <p>{restaurant.rest_post}</p>
                    <div className="quotes-img-container quotes-img-2">
                      <img
                        className="quotes-img"
                        src={quotesImg2}
                        alt="quote 2"
                      />
                    </div>
                  </div>
                </div>
                <div className="rest-box">
                  <div className="rest-title">Menu</div>
                  <div>
                    <div className="menu-container">
                      {filteredMenus.map((menu) => (
                        <li key={menu.id} className="menu-li">
                          <div className="menu-box">
                            <img
                              className="menu-img"
                              src={menu.menu_photo}
                              alt={menu.menu_name}
                            />
                            <div className="menu-info-box">
                              <p className="menu-title">{menu.menu_name}</p>
                              <p className="menu-price">{menu.menu_price}원</p>
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
                      <RestaurantLocationMap
                        address={restaurant.rest_address}
                      />
                    </div>
                    <div className="rest-location-wrap">
                      <div className="rest-info-wrap">
                        <img className="rest-info-img" src={locationImg} />
                        <p className="rest-info-content">
                          {restaurant.rest_address}
                        </p>
                      </div>
                      <div className="rest-info-wrap-2">
                        <img className="rest-info-img" src={opentimeImg} />
                        <div>
                          {filteredOpentimes.map((opentime) => (
                            <div
                              key={opentime.id}
                              className="rest-info-content"
                            >
                              {opentime.rest_day} : {opentime.rest_open} ~{" "}
                              {opentime.rest_close} / 브레이크타임 :{" "}
                              {opentime.rest_breakstart} ~{" "}
                              {opentime.rest_breakend}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rest-info-wrap">
                        <img className="rest-info-img" src={phoneImg} />
                        <p className="rest-info-content">
                          {restaurant.rest_phone}
                        </p>
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
                      {currentReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                    <div
                      className="pagination-btn"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(reviews.length / reviewsPerPage)
                      }
                    >
                      <img className="review-pagination-img" src={rightImg} />
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

export default RestDetailPage;
