import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/pages/RestDetailPage.css";
import StarRatings from "../components/StarRatings";
import RestaurantLocationMap from "../components/RestaurantLocationMap";

function RestDetailPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    getRestaurant();
  }, [id]);

  const getRestaurant = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restaurants/${id}`);
      if (!response.ok) {
        throw new Error("failed to fetch");
      }
      const json = await response.json();
      setRestaurant(json);
    } catch (e) {
      console.error(e);
    }
  };

  if (!restaurant) {
    return <div>Loading...</div>;
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
        </div>
      </div>
    </div>
  );
}

export default RestDetailPage;
