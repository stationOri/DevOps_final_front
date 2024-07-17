import React, { useState, useEffect } from "react";
import HeaderOrange from "../components/HeaderOrange";
import SideBar from "../components/user/SideBar";
import Loading from "../components/Loading";
import ReviewCardMain from "../components/ReviewCardMain"
import "../css/pages/Main.css";
import Carousel from "../components/user/Carousel";
import ArrayRestaurantsMap from "../components/ArrayRestaurantsMap";
import StarRatingsCarousel from "../components/user/StarRatingCarousel";

function Main() {
  const [bannerFoods, setBannerFoods] = useState([]);
  const [trendingFoods, setTrendingFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExtended, setIsExtended] = useState(true);

  const review = {
    "reviewGrade" : 5,
    "userNickname" : "wonnn",
    "likeNum" : 6,
    "reviewData" : "안녕하세요 리뷰 테스트중입니다.안녕하세요 리뷰 테스트중입니다.안녕하세요 리뷰 테스트중입니다.안녕하세요 리뷰 테스트중입니다.안녕하세요 리뷰 테스트중입니다.안녕하세요 리뷰 테스트중입니다.안녕하세요 리뷰 테스트중입니다.안녕하세요 리뷰 테스트중입니다.안녕하세요 리뷰 테스트중입니다.안녕하세요 리뷰 테스트중입니다."
  }


  const toggleSidebar = () => {
    setIsExtended(!isExtended);
  };

  const getBannerFood = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restaurant`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      console.log("Fetched banner foods:", json);
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
      console.log("Fetched trending foods:", json);
      setTrendingFoods(json || []);
    } catch (error) {
      console.error("Error fetching trending foods:", error);
    } finally {
      setLoading(false); // 모든 데이터 로딩 완료 시 loading 상태를 false로 설정
    }
  };

  useEffect(() => {
    getBannerFood();
    getTrendingFood();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="usermainWrapper">
          <SideBar className="mainSidebar" toggleSidebar={toggleSidebar} isExtended={isExtended}/>
          <div className="maincontentsWrapper">
            <div
              className={`behindsidebar ${isExtended ? "" : "collapsed"}`}
            />
            <div
              className={`innercontentsWrapper ${isExtended ? "" : "collapsed"}`}
            >
              <HeaderOrange />
              <div className="carouselContainer">
                <Carousel bannerFoods={bannerFoods} />
              </div>
              <div className="mainMapWrapper">
                <div className="mainRestDetailWrapper">
                  <div className="divforalignment">
                    <img className="mainRestExPhoto" src="https://www.bluer.co.kr/images/es_baf6fbd8c5ad4a9ba20a346711b5dc1c.jpg" alt="" />
                  <div className="maincardrestname">avocado sandwich</div>
                  <div className="maincardKeywordWrapper">
                    <div className="mainkeywordbox">keywords</div>
                    <div className="mainkeywordbox">keywords</div>
                    <div className="mainkeywordbox">keywords</div>
                  </div>
                  <div className="mainreviewCardWrapper">
                    <ReviewCardMain review={review}/>
                    <ReviewCardMain review={review}/>
                  </div>
                  </div>
                </div>
                <ArrayRestaurantsMap />
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
