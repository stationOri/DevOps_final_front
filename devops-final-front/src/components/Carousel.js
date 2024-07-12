import React, { useState } from "react";
import "../css/components/Carousel.css";
import StarRatingsCarousel from "./StarRatingCarousel";

function Carousel({ bannerFoods }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? bannerFoods.length - 1 : prevSlide - 1
    );
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === bannerFoods.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="carousel">
      {bannerFoods.map((rest, index) => (
        <div
          key={rest.id}
          className={`carouselSlide ${index === currentSlide ? "active" : ""}`}
        >
          <div className="carouselWrapper">
            <div
              className="backgroundImage"
              style={{ backgroundImage: `url(${rest.rest_photo})` }}
            >
              <div className="carouselcontents">
                <div className="carouselname">{rest.rest_name}</div>
                <div className="carouseladdress">{rest.rest_address}</div>
                <div>
                  <StarRatingsCarousel rating={rest.rest_grade} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="buttonWrapper">
        <button className="carouselButton prevButton" onClick={handlePrevClick}>
          ◀
        </button>
        <div className="carouselIndicators">
          {bannerFoods.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
        <button className="carouselButton nextButton" onClick={handleNextClick}>
          ▶
        </button>
      </div>
    </div>
  );
}

export default Carousel;
