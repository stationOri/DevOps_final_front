import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "../css/components/RestCard.css";

const RestCard = ({
  restId,
  img,
  RestName,
  RestAddress,
  RestOpentimes,
  keyword1,
  keyword2,
  keyword3,
  favorites,
}) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const restIdNumber = Number(restId);

    const isFavorited = favorites.some(fav => Number(fav.user_id) === 1 && Number(fav.rest_id) === restIdNumber);
    setIsFavorite(isFavorited);
  }, [favorites, restId]);

  const moveFunc = () => {
    navigate(`/restaurants/${restId}`);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(`Toggled favorite for restaurant ${RestName}`);
  };

  return (
    <div className="rest-card-container">
      <div className="rest-card">
        <div className="rest-card-img-box" onClick={moveFunc}>
          <img className="rest-card-img" src={img} alt="restaurantImg" />
        </div>
        <div className="rest-card-info">
          <div className="rest-card-name">{RestName}</div>
          <div className="rest-card-address">{RestAddress}</div>
          {RestOpentimes.map((opentime, index) => (
            <div key={index}>
              <div className="rest-card-opentime">
                {opentime.rest_day}: {opentime.rest_open} - {opentime.rest_close}
              </div>
            </div>
          ))}
          <div className="rest-card-key-heart">
            <div className="rest-card-keyword">
              <span className="rest-keyword">#{keyword1} </span>
              <span className="rest-keyword">#{keyword2} </span>
              <span className="rest-keyword">#{keyword3} </span>
            </div>
            <div
              className="favorite-btn"
              onClick={handleFavorite}
            >
              {isFavorite ? (
                <FaHeart className="favorited-icon" />
              ) : (
                <FaRegHeart className="favorited-icon"/>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestCard;