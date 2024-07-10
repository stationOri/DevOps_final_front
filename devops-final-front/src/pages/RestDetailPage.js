import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/pages/RestDetailPage.css";
import StarRatings from "../components/StarRatings";
import RestaurantLocationMap from "../components/RestaurantLocationMap";

function RestDetailPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRestaurant();
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

  return (
    <div className="detail">
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
              <div className="empty-btn">
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
              <span className="rest-keyword">#{restaurant.keyword2} </span>
              <span className="rest-keyword">#{restaurant.keyword3} </span>
              <span className="rest-keyword">#{restaurant.keyword1} </span>
            </div>
            <p>{restaurant.rest_intro}</p>
          </div>
        </div>
        <div className="rest-box">
          <div className="rest-title">Announcement</div>
          <div className="rest-announce-box">
            <p>{restaurant.rest_post}</p>
          </div>
        </div>
        <div className="rest-box">
          <div className="rest-title">Menu</div>
          <div>
          <div className="menu-container">
            {filteredMenus.map((menu) => (
              <li key={menu.id} className="menu-li">
                <div className="menu-box">
                  <img className="menu-img" src={menu.menu_photo} alt={menu.menu_name} />
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
              <RestaurantLocationMap address={restaurant.rest_address} />
            </div>
            <div className="rest-location-wrap">
              <p>{restaurant.rest_address}</p>
              <p>{restaurant.rest_opentime}</p>
              <p>{restaurant.rest_phone}</p>
            </div>
          </div>
        </div>
        <div className="rest-box">
          <div className="rest-title">Reviews</div>
          <div> 
            <ul>
              {filteredReviews.map((review) => (
                <li key={review.id}>
                  <p>{review.user_nickname}</p>
                  <p>{review.review_grade}점</p>
                  <p>{review.review_data}</p>
                  <img src={review.review_img} alt="review" />
                  <img src={review.review_img2} alt="review" />
                  <img src={review.review_img3} alt="review" />
                  <p>{review.review_date}</p>
                  <p>Likes: {review.like_num}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestDetailPage;
