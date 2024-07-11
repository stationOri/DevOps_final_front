import React, { useState } from "react";
import "../css/components/ReviewCard.css";
import StarRatings from "./StarRatings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const reviewContent = review.review_data;
  const isLongText = reviewContent.length > 135;

  return (
    <div className="review-card-container">
      <StarRatings rating={review.review_grade} />
      <div className="review-card-box">
        <div className="review-img-box">
          <img className="review-img" src={review.review_img} alt="review" />
          {/* <img src={review.review_img2} alt="review" />
          <img src={review.review_img3} alt="review" /> */}
        </div>
        <div className="review-data-box">
          <p>
            {isExpanded ? reviewContent : 
              isLongText ? `${reviewContent.substring(0, 135)}...` : reviewContent}
            {isLongText && (
              <span className="read-more" onClick={toggleReadMore}>
                {isExpanded ? " Show less" : " Read more"}
              </span>
            )}
          </p>
        </div>
        <div className="review-info-box">
          <p className="reviewer-name">{review.user_nickname}</p>
          <div className="review-like-box">
            <button className="button-like">
              <div className="review-like-btn">
                <FontAwesomeIcon className="fa" icon={faThumbsUp} />
                <span>Likes</span>
                <span>{review.like_num}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;