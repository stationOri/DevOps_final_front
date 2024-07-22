import React, { useState, useEffect } from "react";
import HeaderOrange from "../components/HeaderOrange";
import SideBar from "../components/user/SideBar";
import Loading from "../components/Loading";
import Carousel from "../components/user/Carousel";
import ArrayRestaurantsMap from "../components/ArrayRestaurantsMap";
import StarRatingsCarousel from "../components/user/StarRatingCarousel";
import "../css/pages/Main.css";
import ReviewCardMain from "../components/ReviewCardMain";

function Main() {
  const [bannerFoods, setBannerFoods] = useState([]);
  const [trendingFoods, setTrendingFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExtended, setIsExtended] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const toggleSidebar = () => {
    setIsExtended(!isExtended);
  };

  const getBannerFood = async () => {
    try {
      const response = await fetch(`http://localhost:4000/maincarouselrestaurant`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      setBannerFoods(json || []);
    } catch (error) {
      console.error("Error fetching banner foods:", error);
    }
  };

  const getTrendingFood = async () => {
    try {
      const response = await fetch(`http://localhost:4000/hot`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      setTrendingFoods(json || []);
    } catch (error) {
      console.error("Error fetching trending foods:", error);
    }
  };

  const getRestaurantsData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/mapdata`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      setRestaurants(json || []);
    } catch (error) {
      console.error("Error fetching restaurants data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getBannerFood(),
        getTrendingFood(),
        getRestaurantsData(),
      ]);
      setLoading(false);
    };

    fetchData();
  }, []);

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
              className={`innercontentsWrapper  ${
                isExtended ? "" : "collapsed"
              }`}
            >
              <HeaderOrange />
              <div className="carouselContainer">
                <Carousel bannerFoods={bannerFoods} />
              </div>
              <div className="mainMapWrapper">
                {selectedRestaurant && (
                  <div className="mainRestDetailWrapper">
                    <div className="divforalignment">
                      <div className="topbox">
                        <img
                          className="mainRestExPhoto"
                          src="https://www.bluer.co.kr/images/es_baf6fbd8c5ad4a9ba20a346711b5dc1c.jpg"
                          alt=""
                        />
                        <div className="reviewleft">
                          <div className="maincardrestname">
                            {selectedRestaurant.rest_name}
                          </div>
                          <div className="maincardKeywordWrapper">
                            {selectedRestaurant.keyword1 && (
                              <div className="mainkeywordbox">
                                #{selectedRestaurant.keyword1}
                              </div>
                            )}
                            {selectedRestaurant.keyword2 && (
                              <div className="mainkeywordbox">
                                #{selectedRestaurant.keyword2}
                              </div>
                            )}
                            {selectedRestaurant.keyword3 && (
                              <div className="mainkeywordbox">
                                #{selectedRestaurant.keyword3}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mainreviewCardWrapper">
                        {selectedRestaurant.reviews.map((review, index) => (
                          <ReviewCardMain key={index} review={review} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <ArrayRestaurantsMap
                  restaurants={restaurants}
                  onMarkerClick={(restaurant) =>
                    setSelectedRestaurant(restaurant)
                  }
                />
              </div>
              <div className="hotTrendingRestWrapper">
                <div className="hotTrendingHeader">🔥핫 트렌딩 식당🔥</div>
                {trendingFoods.map((rest, index) => (
                  <div key={index} className="rankingWrapper">
                    <div className="rankingLeft">
                      <div
                        className="RankingIndex"
                        style={{
                          color: index === 0 ? "#FF8A00" : "black",
                          fontWeight: index === 0 ? "bold" : "",
                        }}
                      >
                        {index + 1}
                      </div>
                      <img className="rankPhoto" src={rest.rest_photo} alt="" />
                      <div className="MainRestNameWrapper">
                        <div className="MainRestName">{rest.rest_name}</div>
                        <div className="MainKeywordWrapperMini">
                          {rest.keyword1 && (
                            <div className="innerKeywords">
                              #{rest.keyword1}
                            </div>
                          )}
                          {rest.keyword2 && (
                            <div className="innerKeywords">
                              #{rest.keyword2}
                            </div>
                          )}
                          {rest.keyword3 && (
                            <div className="innerKeywords">
                              #{rest.keyword3}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="rankingRight">
                      <div className="starRatingText">{rest.rest_grade}/5</div>
                      <StarRatingsCarousel rating={rest.rest_grade} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
