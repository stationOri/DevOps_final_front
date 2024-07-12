import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import "../css/components/MenuManagement.css"

function MenuManagement({rest_id}) {
  const [restmenu, setRestMenu] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await fetch("http://localhost:4000/menu");
      if (!response.ok) {
        throw new Error("Failed to fetch menus");
      }
      const data = await response.json();
      setRestMenu(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredMenus = restmenu.filter((menu) => menu.rest_id === rest_id);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formatPrice = (price) => {
    return price.toLocaleString();
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="menu-edit-Wrapper">
          <div className="menu-edit-bg">
            <div className="menu-edit-contents-wrapper">
            <div className="menu-edit-title">
              <div className="menu-edit-bold">
                 점포 메뉴 수정하기
              </div>
              <div className="menu-edit-hint">
                사용자에게 보일 메뉴를 설정합니다.
              </div>
            </div>
          <div className="menu-edit-container">
            {filteredMenus.map((menu) => (
              <li key={menu.id} className="menu-edit-li">
                <div className="menu-edit-box">
                  <img
                    className="menu-edit-img"
                    src={menu.menu_photo}
                    alt={menu.menu_name}
                  />
                  <div className="menu-edit-total-info">
                  <div className="menu-edit-info-box">
                    <p className="menu-edit-title">{menu.menu_name}</p>
                    <p className="menu-edit-price">{formatPrice(menu.menu_price)}</p>
                  </div>
                  <div className="menu-edit-btn-box">
                    <button className="menu-edit-edit-btn">메뉴 수정</button>
                    <button className="menu-edit-delete-btn">메뉴 삭제</button>
                  </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
          <div className="menu-edit-btn-wrapper">
            <button className="menu-edit-add-menu">메뉴 추가</button>
            <button className="menu-edit-finish-edit">수정 완료</button>
          </div>
          </div>
        </div>
        </div>
      )}
      </div>
  );
}

export default MenuManagement;
