import React, { useState, useEffect, useCallback } from "react";
import "../../css/pages/Restaurants.css";
import RestCard from "../../components/RestCard";
import Pagination from "../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Restaurants = ({ userId, onCardClick }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [additionalLoading, setAdditionalLoading] = useState(false);
  const [error, setError] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [opentimes, setOpentimes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [keywordFilters, setKeywordFilters] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 6;

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
    fetchInitialData().finally(() => setInitialLoading(false));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hasMore) {
        setPage((prevPage) => prevPage + 1);
        fetchRestaurants(page);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [page, hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchRestaurants(page);
    }
  }, [page]);

  const fetchInitialData = async () => {
    try {
      await Promise.all([
        fetchRestaurants(1, 10),
        fetchFavorites(),
        fetchKeywords(),
      ]);
      setInitialLoading(false);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchRestaurants = async (page) => {
    if (page === 1) {
      setInitialLoading(true);
    } else {
      setAdditionalLoading(true);
    }

    try {
      const response = await fetch(
        `http://localhost:8080/restaurants/page/${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
      }
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setRestaurants((prevRestaurants) => [...prevRestaurants, ...data]);
        setFilteredRestaurants((prevRestaurants) => [
          ...prevRestaurants,
          ...data,
        ]);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      if (page === 1) {
        setInitialLoading(false);
      } else {
        setAdditionalLoading(false);
      }
    }
  };

  const fetchRestaurantByName = async (name) => {
    try {
      const response = await fetch(
        `http://localhost:8080/restaurants/name/${name}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch restaurants by name");
      }
      const data = await response.json();
      setFilteredRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants by name:", error);
    }
  };

  const fetchOpentimes = useCallback(async (restId) => {
    try {
      const response = await fetch(`http://localhost:8080/opentime/${restId}`);
      // if (!response.ok) {
      //   throw new Error("Failed to fetch opentimes");
      // }
      const data = await response.json();

      const opentimesFormatted = data.map((opentime) => ({
        ...opentime,
        restDay: convertDayToKorean(opentime.restDay),
      }));

      setOpentimes((prevOpentimes) => [
        ...prevOpentimes.filter((opentime) => opentime.restId !== restId),
        ...opentimesFormatted,
      ]);
    } catch (error) {
      // console.error("Error fetching opentimes:", error);
      setError(null);
    }
  }, []);

  useEffect(() => {
    restaurants.forEach((restaurant) => {
      if (
        !opentimes.some((opentime) => opentime.restId === restaurant.restId)
      ) {
        fetchOpentimes(restaurant.restId);
      }
    });
  }, [restaurants, fetchOpentimes, opentimes]);

  useEffect(() => {
    filterRestaurants();
  }, [locationFilter, keywordFilters]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`http://localhost:8080/favorite/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const fetchKeywords = async () => {
    try {
      const response = await fetch(`http://localhost:8080/keywords`);
      if (!response.ok) {
        throw new Error("Failed to fetch keywords");
      }
      const data = await response.json();
      setKeywords(data);
    } catch (error) {
      console.error("Error fetching keywords:", error);
    }
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByEnter = async (e) => {
    if (e.key === "Enter") {
      setHasMore(false);
      await fetchRestaurantByName(e.target.value);
      setCurrentPage(1);
    }
  };

  const handleLocationChange = (e) => {
    setLocationFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchClick = async () => {
    await fetchRestaurantByName(searchTerm);
    setCurrentPage(1);
  };

  const handleKeywordClick = (keyword) => {
    setKeywordFilters((prevFilters) =>
      prevFilters.includes(keyword)
        ? prevFilters.filter((k) => k !== keyword)
        : [...prevFilters, keyword]
    );
    setCurrentPage(1);
  };

  const filterRestaurants = () => {
    let filtered = restaurants;

    if (locationFilter) {
      filtered = filtered.filter((restaurant) =>
        restaurant.restAddress
          .toLowerCase()
          .startsWith(locationFilter.toLowerCase())
      );
    }

    if (keywordFilters.length > 0) {
      filtered = filtered.filter(
        (restaurant) =>
          keywordFilters.includes(restaurant.keyword1) ||
          keywordFilters.includes(restaurant.keyword2) ||
          keywordFilters.includes(restaurant.keyword3)
      );
    }

    setFilteredRestaurants(filtered);
  };

  const extractLocations = () => {
    const locations = restaurants.map((restaurant) =>
      restaurant.restAddress.split(" ").slice(0, 2).join(" ")
    );
    return [...new Set(locations)];
  };

  const toggleFavorite = async (restId, isFavorite) => {
    try {
      const existingFavorite = favorites.find(
        (fav) => fav.restaurantId === restId && fav.userId === userId
      );

      if (existingFavorite) {
        const response = await fetch(
          `http://localhost:8080/favorite/${existingFavorite.favoriteId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("찜취소: ", response);

        if (response.ok) {
          fetchFavorites();
        } else {
          throw new Error("Failed to remove favorite");
        }
      } else {
        const response = await fetch(
          `http://localhost:8080/favorite/${userId}/rest/${restId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("찜추가: ", response);

        if (response.ok) {
          fetchFavorites();
        } else {
          throw new Error("Failed to add favorite");
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error.message);
    }
  };

  const handleCardClick = (restId) => {
    onCardClick(restId);
    console.log(restId);
  };

  return (
    <div className="restaurants">
      <div className="rest-search-container">
        <div className="rest-search-name">
          <button className="rest-search-btn" onClick={handleSearchClick}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input
            type="text"
            placeholder="Search"
            className="rest-search-input"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchByEnter}
          />
        </div>
        <div className="rest-search-location">
          <select
            className="rest-location-dropdown"
            value={locationFilter}
            onChange={handleLocationChange}
          >
            <option value="">Location</option>
            {extractLocations().map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="rest-keyword-con">
        <div className="rest-keyword-container">
          <div className="rest-keyword-box">
            <div className="rest-keyword-title">
              <div className="rest-keyword-title-text">
                <div>어떤 음식을</div>
                <div>좋아하세요?</div>
              </div>
            </div>
          </div>
          <div className="rest-keyword-btn-box">
            {keywords.map((keyword) => (
              <div
                key={keyword.id}
                className={`rest-keyword-btn ${
                  keywordFilters.includes(keyword.keyword) ? "active" : ""
                }`}
                onClick={() => handleKeywordClick(keyword.keyword)}
              >
                {keyword.keyword}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rest-list-box">
        {filteredRestaurants.length === 0 ? (
          <div className="rest-no-list">해당 식당이 없습니다</div>
        ) : (
          filteredRestaurants
            .slice(
              (currentPage - 1) * restaurantsPerPage,
              currentPage * restaurantsPerPage
            )
            .map((restaurant) => {
              const restaurantOpentimes = opentimes.filter(
                (opentime) =>
                  Number(opentime.restId) === Number(restaurant.restId)
              );

              return (
                <div className="rest-card-li" key={restaurant.restId}>
                  <RestCard
                    userId={3}
                    restId={restaurant.restId}
                    img={restaurant.restPhoto}
                    RestName={restaurant.restName}
                    RestAddress={restaurant.restAddress}
                    RestOpentimes={restaurantOpentimes}
                    keyword1={restaurant.keyword1}
                    keyword2={restaurant.keyword2}
                    keyword3={restaurant.keyword3}
                    isFavorite={
                      favorites.some(
                        (fav) =>
                          fav.restaurantId === restaurant.restId &&
                          fav.userId === userId
                      )
                        ? true
                        : false
                    }
                    toggleFavorite={toggleFavorite}
                    onCardClick={() => handleCardClick(restaurant.restId)}
                  />
                </div>
              );
            })
        )}
      </div>
      <Pagination
        totalItems={filteredRestaurants.length}
        itemsPerPage={restaurantsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
        activeColor="#FF8A00"
      />
    </div>
  );
};

export default Restaurants;
