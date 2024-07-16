import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "../css/components/RestCard.css";

const RestCard = ({
  userId,
  restId,
  img,
  RestName,
  RestAddress,
  RestOpentimes,
  keyword1,
  keyword2,
  keyword3,
  isFavorite,
  toggleFavorite,
}) => {
  const navigate = useNavigate();

  const moveFunc = () => {
    navigate(`/restaurants/${restId}`);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(restId, !isFavorite);
    console.log(isFavorite);
  };

  return (
    <div className="rest-card-container">
      <div className="rest-card" onClick={moveFunc}>
        <div className="rest-card-img-box">
          <img className="rest-card-img" src={img} alt="restaurantImg" />
        </div>
        <div className="rest-card-info">
          <div className="rest-card-name">{RestName}</div>
          <div className="rest-card-address">{RestAddress}</div>
          {RestOpentimes.map((opentime, index) => (
            <div key={index}>
              <div className="rest-card-opentime">
                {opentime.restDay}: {opentime.restOpen} - {opentime.restClose}
              </div>
            </div>
          ))}
          <div className="rest-card-key-heart">
            <div className="rest-card-keyword">
              <span className="rest-keyword">#{keyword1} </span>
              <span className="rest-keyword">#{keyword2} </span>
              <span className="rest-keyword">#{keyword3} </span>
            </div>
            <div className="favorite-btn" onClick={handleFavorite}>
              {isFavorite ? (
                <FaHeart className="favorited-icon" />
              ) : (
                <FaRegHeart className="favorited-icon" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestCard;