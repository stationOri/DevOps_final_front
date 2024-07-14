import React, { useState, useEffect } from "react";
import "../css/pages/Restaurants.css";
import HeaderOrange from "../components/HeaderOrange";
import SideBar from "../components/user/SideBar";
import Loading from "../components/Loading";
import RestCard from "../components/RestCard";
import Pagination from "../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Restaurants() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [opentimes, setOpentimes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 6;

  useEffect(() => {
    fetchRestaurants();
    fetchOpentimes();
    fetchFavorites();
  }, []);

  useEffect(() => {
    filterRestaurants();
  }, [locationFilter]);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restaurants`);
      if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
      }
      const data = await response.json();
      setRestaurants(data);
      setFilteredRestaurants(data);
      setLoading(false);
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

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`http://localhost:4000/favorite`);
      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByEnter = (e) => {
    if (e.key === "Enter") {
      filterRestaurantsByName();
      setCurrentPage(1);
    }
  };

  const handleLocationChange = (e) => {
    setLocationFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchClick = () => {
    filterRestaurantsByName();
    setCurrentPage(1);
  };

  const filterRestaurants = () => {
    let filtered = restaurants;

    if (locationFilter) {
      filtered = filtered.filter((restaurant) =>
        restaurant.rest_address
          .toLowerCase()
          .startsWith(locationFilter.toLowerCase())
      );
    }

    setFilteredRestaurants(filtered);
  };

  const filterRestaurantsByName = () => {
    let filtered = restaurants;

    if (searchTerm) {
      filtered = filtered.filter((restaurant) =>
        restaurant.rest_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRestaurants(filtered);
  };

  const extractLocations = () => {
    const locations = restaurants.map((restaurant) =>
      restaurant.rest_address.split(" ").slice(0, 2).join(" ")
    );
    return [...new Set(locations)];
  };

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
            <div className="restaurants">
              <div className="rest-search-container">
                <div className="rest-search-name">
                  <button
                    className="rest-search-btn"
                    onClick={handleSearchClick}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                  <input
                    type="text"
                    placeholder="Search by name"
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
              <div className="rest-keyword-container">
                {/* 키워드 검색 */}
              </div>
              <div className="rest-list-box">
                {filteredRestaurants
                  .slice(
                    (currentPage - 1) * restaurantsPerPage,
                    currentPage * restaurantsPerPage
                  )
                  .map((restaurant) => {
                    const restaurantOpentimes = opentimes.filter(
                      (opentime) =>
                        Number(opentime.rest_id) === Number(restaurant.id)
                    );
                    const restaurantFavorites = favorites.filter(
                      (favorite) =>
                        Number(favorite.rest_id) === Number(restaurant.id)
                    );

                    return (
                      <div className="rest-card-li" key={restaurant.id}>
                        <RestCard
                          restId={restaurant.id}
                          img={restaurant.rest_photo}
                          RestName={restaurant.rest_name}
                          RestAddress={restaurant.rest_address}
                          RestOpentimes={restaurantOpentimes}
                          keyword1={restaurant.keyword1}
                          keyword2={restaurant.keyword2}
                          keyword3={restaurant.keyword3}
                          favorites={restaurantFavorites}
                        />
                      </div>
                    );
                  })}
              </div>
              <Pagination
                totalItems={filteredRestaurants.length}
                itemsPerPage={restaurantsPerPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
                activeColor="#FF8A00"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Restaurants;