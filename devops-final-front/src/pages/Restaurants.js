import React, { useState, useEffect } from "react";
import "../css/pages/Restaurants.css";
import HeaderOrange from "../components/HeaderOrange";
import SideBar from "../components/user/SideBar";
import Loading from "../components/Loading";
import RestCard from "../components/RestCard";
import Pagination from "../components/Pagination";

function Restaurants() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [opentimes, setOpentimes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(6);

  useEffect(() => {
    fetchRestaurants();
    fetchOpentimes();
    fetchFavorites();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restaurants`);
      if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
      }
      const data = await response.json();
      setRestaurants(data);
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
              <div className="rest-list-box">
                {restaurants
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
                totalItems={restaurants.length}
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
