import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import "../../css/components/restaurant/MenuManagement.css";
import { useMenuModal } from "../Modal/MenuModalContext";
import MenuModal from "../Modal/Menu"

function MenuManagement({ rest_id }) {
  const [restmenu, setRestMenu] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { openMenuModal } = useMenuModal();
  const [menushow, setMenushow] = useState(false);

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleMenuAddModal = () => {
    openMenuModal('메뉴 정보 추가', '', '');
  };

  const MenuClose = () => setMenushow(false);
  const MenuShow = () => setMenushow(true);

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
          <MenuModal />
          <div className="menu-edit-bg">
            <div className="menu-edit-contents-wrapper">
            <div className="menu-edit-title-out">
              <div>
              <div className="menu-edit-bold">
                 점포 메뉴 수정하기
              </div>
              <div className="menu-edit-hint">
                사용자에게 보일 메뉴를 설정합니다.
              </div>
              </div>
              <button className="menu-edit-add-menu" onClick={handleMenuAddModal}>+</button>
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
                    <button className="menu-edit-edit-btn"
                      onClick={ () => {
                        openMenuModal('메뉴 정보 수정', menu.menu_name, formatPrice(menu.menu_price));
                      }}
                    >메뉴 수정</button>
                    <button className="menu-edit-delete-btn">메뉴 삭제</button>
                  </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
          </div>
        </div>
        </div>
      )}
      </div>
  );
}

export default MenuManagement;
