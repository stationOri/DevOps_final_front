import React, { useState, useEffect } from 'react';
import HeaderOrange from "../components/HeaderOrange";
import SideBar from "../components/SideBar";
import Loading from "../components/Loading";
import "../css/pages/Main.css";
import Carousel from '../components/Carousel';

function Main() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [bannerfoods, setBannerFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBannerfood = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restaurant`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      console.log('Fetched data:', json);
      setBannerFoods(json || []); // 여기서 json.row 가 아니라 그냥 json을 사용합니다.
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBannerfood();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className={`mainWrapper ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <SideBar className="mainsidebar" />
          <div className={`contentsWrapper ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <HeaderOrange />
            <div>
              {bannerfoods.map(rest => (
                <div key={rest.id}>
                  <Carousel 
                    rest_name={rest.rest_name}
                    rest_photo={rest.rest_photo}
                    rest_grade={rest.rest_grade}
                    rest_address={rest.rest_address}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
