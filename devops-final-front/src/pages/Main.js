import React, { useState, useEffect } from 'react';
import HeaderOrange from "../components/HeaderOrange";
import SideBar from '../components/user/SideBar';
import Loading from "../components/Loading";
import "../css/pages/Main.css";
import Carousel from '../components/user/Carousel';

function Main() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [bannerFoods, setBannerFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBannerFood = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restaurant`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      console.log('Fetched data:', json);
      setBannerFoods(json || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBannerFood();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className={`mainWrapper ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <SideBar className="mainSidebar" />
          <div className={`contentsWrapper ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <HeaderOrange />
            <div className="carouselContainer">
              <Carousel bannerFoods={bannerFoods} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
