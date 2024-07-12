import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/pages/Reservation.css";
import HeaderOrange from "../components/HeaderOrange";
import SideBar from "../components/SideBar";
import Loading from "../components/Loading";
import RestaurantLocationMap from "../components/RestaurantLocationMap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import locationImg from "../assets/images/detail/location.png";
import opentimeImg from "../assets/images/detail/opentime.png";
import phoneImg from "../assets/images/detail/phone.png";
import noteImg from "../assets/images/detail/note.png";
import calImg from "../assets/images/modal/cal.png";
import pplImg from "../assets/images/modal/people.png";

function Reservation() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [opentimes, setOpentimes] = useState([]);
  const [restInfo, setRestInfo] = useState(null);
  const [menus, setMenus] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [maxPpl, setMaxPpl] = useState(0);
  const [menuQuantities, setMenuQuantities] = useState({});
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  const [reqText, setReqText] = useState("");

  useEffect(() => {
    fetchRestaurant();
    fetchOpentimes();
    fetchRestInfo();
    fetchMenus();
  }, [id]);

  useEffect(() => {
    if (menus.length > 0) {
      const initialQuantities = menus.reduce((acc, menu) => {
        acc[menu.id] = 0;
        return acc;
      }, {});
      setMenuQuantities(initialQuantities);
    }
  }, [menus]);

  const fetchRestaurant = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restaurants/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant");
      }
      const data = await response.json();
      setRestaurant(data);
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

  const fetchRestInfo = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restInfo`);
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant info");
      }
      const data = await response.json();
      setRestInfo(data);
      if (data && data.length > 0) {
        setMaxPpl(data[0].max_ppl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMenus = async () => {
    try {
      const response = await fetch("http://localhost:4000/menu");
      if (!response.ok) {
        throw new Error("Failed to fetch menus");
      }
      const data = await response.json();
      setMenus(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[dayOfWeek];
  };

  const calculateAvailableTimes = (opentime, interval) => {
    const start = new Date(`2024-01-01T${opentime.rest_open}:00`);
    const end = new Date(`2024-01-01T${opentime.rest_close}:00`);
    const breakStart = new Date(`2024-01-01T${opentime.rest_breakstart}:00`);
    const breakEnd = new Date(`2024-01-01T${opentime.rest_breakend}:00`);
    const times = [];
    const intervalInMinutes = interval === "ONEHOUR" ? 60 : 30;

    let currentTime = new Date(start);

    while (currentTime < end) {
      if (!(currentTime >= breakStart && currentTime < breakEnd)) {
        times.push(currentTime.toTimeString().substring(0, 5));
      }
      currentTime.setMinutes(currentTime.getMinutes() + intervalInMinutes);
    }
    return times;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const dayOfWeek = getDayOfWeek(date);
    const filteredOpentime = opentimes.find(
      (opentime) =>
        opentime.rest_id === parseInt(id) && opentime.rest_day === dayOfWeek
    );

    if (filteredOpentime && restInfo) {
      const interval = restInfo[0].rest_reserve_interval;
      const times = calculateAvailableTimes(filteredOpentime, interval);
      setAvailableTimes(times);
    } else {
      setAvailableTimes([]);
    }
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleGuestsChange = (event) => {
    setSelectedGuests(event.target.value);
  };

  const day = new Date(+selectedDate + 3240 * 10000)
    .toISOString()
    .split("T")[0];

  const oneWeekLater = new Date(new Date().setDate(new Date().getDate() + 7));
  const oneMonthLater = new Date(new Date().setDate(new Date().getDate() + 30));

  const LaterDate =
    restInfo && restInfo.rest_reservation_rule === "WEEKS"
      ? oneWeekLater
      : oneMonthLater;

  const filteredOpentimes = opentimes.filter(
    (opentime) => opentime.rest_id === parseInt(id)
  );
  const filteredMenus = menus.filter((menu) => menu.rest_id === parseInt(id));

  const handleMenuIncrement = (menuId) => {
    setMenuQuantities((prevQuantities) => ({
      ...prevQuantities,
      [menuId]: prevQuantities[menuId] + 1,
    }));
  };

  const handleMenuDecrement = (menuId) => {
    setMenuQuantities((prevQuantities) => ({
      ...prevQuantities,
      [menuId]: prevQuantities[menuId] > 1 ? prevQuantities[menuId] - 1 : 0,
    }));
  };

  const checkMenuSelected = () => {
    let menuSelected = false;
    menus.forEach((menu) => {
      if (menuQuantities[menu.id] > 0) {
        menuSelected = true;
      }
    });
    return menuSelected;
  };

  const calculateTotalPrice = () => {
    return menus.reduce((total, menu) => {
      return total + menu.menu_price * (menuQuantities[menu.id] || 0);
    }, 0);
  };

  const handleCheckboxChange = (event) => {
    setCheckBoxChecked(event.target.checked);
  };

  const handleEnrollReservation = () => {
    console.log("예약 완료");
    console.log(day); // 예약일
    console.log(new Date().toISOString().split('T')[0]); // 예약 신청일
    console.log(selectedTime); // 예약 시간
    console.log(selectedGuests); // 예약 인원
    menus.forEach((menu) => {
      if (menuQuantities[menu.id] > 0) {
        console.log(`${menu.menu_name}`); // 선택한 메뉴
        console.log(`${menuQuantities[menu.id]}`); // 수량
      }
    });
    console.log(reqText); // 요청사항 출력
    let depositAmount;
    if (restInfo[0] && restInfo[0].rest_deposit_method === "A") {
      depositAmount = restInfo[0].rest_deposit * selectedGuests;
    } else {
      depositAmount = calculateTotalPrice() * 0.2;
    }
    console.log(depositAmount); // 예약금 출력
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
            <div className="reservation">
              <div className="res-container">
                <div className="rest-photo-map">
                  <div className="res-rest-photo">
                    <img
                      className="rest-photo"
                      src={restaurant.rest_photo}
                      alt={restaurant.rest_name}
                    />
                  </div>
                  <div className="res-map">
                    <RestaurantLocationMap address={restaurant.rest_address} />
                  </div>
                </div>
                <div className="res-rest-content">
                  <div className="rest-info-box">
                    <div className="rest-name-box">
                      <div className="rest-name">{restaurant.rest_name}</div>
                      <div className="res-rest-keyword">
                        <span className="rest-keyword">
                          #{restaurant.keyword2}{" "}
                        </span>
                        <span className="rest-keyword">
                          #{restaurant.keyword3}{" "}
                        </span>
                        <span className="rest-keyword">
                          #{restaurant.keyword1}{" "}
                        </span>
                      </div>
                    </div>
                    <div className="res-horizon"></div>
                    <div className="res-rest-intro-box flex-row">
                      <div className="res-rest-location-wrap">
                        <div className="rest-info-wrap">
                          <img className="rest-info-img" src={locationImg} />
                          <p className="rest-info-content">
                            {restaurant.rest_address}
                          </p>
                        </div>
                        <div className="rest-info-wrap-2">
                          <img
                            className="rest-info-img mt-5"
                            src={opentimeImg}
                          />
                          <div>
                            {filteredOpentimes.map((opentime) => (
                              <div
                                key={opentime.id}
                                className="rest-info-content"
                              >
                                {opentime.rest_day} : {opentime.rest_open} ~{" "}
                                {opentime.rest_close}/ 브레이크타임 :{" "}
                                {opentime.rest_breakstart} ~{" "}
                                {opentime.rest_breakend}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="rest-info-wrap">
                          <img className="rest-info-img" src={phoneImg} />
                          <p className="rest-info-content">
                            {restaurant.rest_phone}
                          </p>
                        </div>
                      </div>
                      <div className="res_rest_intro">
                        <div className="rest-info-wrap-2">
                          <img className="rest-info-img mt-5" src={noteImg} />
                          <div className="rest-info-content">
                            {restaurant.rest_intro}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="res-enroll-date-time">
                    <div className="res-enroll-date">
                      <img className="res-cal-img" src={calImg} />
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        maxDate={LaterDate}
                        className="picker"
                        placeholderText="DATE"
                        dateFormat="yyyy-MM-dd"
                      />
                    </div>
                    <div className="res-enroll-ppl">
                      <img className="res-ppl-img" src={pplImg} />
                      <select
                        id="guestPicker"
                        className="picker"
                        value={selectedGuests}
                        onChange={handleGuestsChange}
                      >
                        {[...Array(maxPpl)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="res-deposit-method-info">
                      {restInfo && restInfo.length > 0
                        ? restInfo[0].rest_deposit_method === "A"
                          ? `지정액 인당 ${restInfo[0].rest_deposit}원`
                          : `메뉴 20%.`
                        : "0원"}
                    </div>
                  </div>
                  <div>
                    <div className="res-sub-title">Available Time Slots</div>
                    <div className="res-btn-container">
                      {availableTimes.map((time) => (
                        <div
                          className={`res-time-btn ${
                            selectedTime === time ? "selected" : ""
                          }`}
                          key={time}
                          onClick={() => handleTimeClick(time)}
                        >
                          <div className="res-btn-content">{time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="res-sub-title sub-title-margin">Menu</div>
                    <div className="res-menu-container">
                      {filteredMenus.map((menu) => (
                        <li key={menu.id} className="res-menu-li">
                          <div className="res-menu-box">
                            <img
                              className="res-menu-img"
                              src={menu.menu_photo}
                              alt={menu.menu_name}
                            />
                            <div className="res-menu-info-box">
                              <div className="res-menu-title">
                                {menu.menu_name}
                              </div>
                              <div className="res-menu-price">
                                {menu.menu_price}원
                              </div>
                              <div className="menu-quantity-controls">
                                <button
                                  className="menu-picker-btn-minus"
                                  onClick={() => handleMenuDecrement(menu.id)}
                                >
                                  -
                                </button>
                                <span>{menuQuantities[menu.id]}</span>
                                <button
                                  className="menu-picker-btn-plus"
                                  onClick={() => handleMenuIncrement(menu.id)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="res-sub-title">Total</div>
                    <div className="res-total-container">
                      {menus.map(
                        (menu) =>
                          menuQuantities[menu.id] > 0 && (
                            <div
                              key={menu.id}
                              className={`res-total-item ${
                                menu.id % 2 === 0 ? "even-item" : "odd-item"
                              }`}
                            >
                              <table className="menu-table">
                                <tr>
                                  <td className="res-menu-name">
                                    {menu.menu_name}
                                  </td>
                                  <td className="res-menu-quan">
                                    X {menuQuantities[menu.id]}
                                  </td>
                                  <td className="res-menu-money">
                                    {menu.menu_price * menuQuantities[menu.id]}{" "}
                                    원
                                  </td>
                                </tr>
                              </table>
                            </div>
                          )
                      )}
                      <br />
                      <div className="res-total-price">
                        Total : {calculateTotalPrice()} 원
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="res-sub-title sub-title-margin">
                      요청 사항
                    </div>
                    <div className="res-req">
                      <textarea
                        className="custom_textarea"
                        value={reqText}
                        onChange={(e) => setReqText(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="res-horizon" />
                  <div className="res-to-pay-container">
                    <div className="res-pay-info">
                      <div className="res-pay-info-total">
                        예약금{" "}
                        {restInfo && restInfo.length > 0
                          ? restInfo[0].rest_deposit_method === "A"
                            ? `${restInfo[0].rest_deposit * selectedGuests} 원`
                            : `${calculateTotalPrice() * 0.2} 원`
                          : "0원"}
                      </div>
                      <div className="res-refund-rule">
                        아래는 예약 취소에 관련된 규정 사항입니다. 단순 변심에
                        따른 취소는 불가능 하오니 확인하시고 체크 해주시길
                        바랍니다.
                      </div>
                      <div className="res-refund-rule">
                        <div>
                          <span className="refund-info">
                            ~ 이용 7일 전까지{" "}
                          </span>{" "}
                          예약금 전액 환불
                        </div>
                        <div>
                          <span className="refund-info">
                            ~ 이용 3일 전까지{" "}
                          </span>{" "}
                          예약금 50% 차감 환불
                        </div>
                        <div>
                          <span className="refund-info">
                            ~ 이용 1일 전까지{" "}
                          </span>{" "}
                          예약금 90% 차감 환불
                        </div>
                        <div>그 이후 취소 불가</div>
                      </div>
                      <div className="res-check">
                        <input
                          type="checkbox"
                          checked={checkBoxChecked}
                          onChange={handleCheckboxChange}
                        />
                        <span className="res-refund-rule">
                          위 내용을 확인 했습니다.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="btn-center">
                    <div className="res-enroll-btn">
                      <div
                        className={`res-btn-content ${
                          checkBoxChecked && selectedDate && selectedTime && filteredMenus.length > 0 && checkMenuSelected() ? "" : "disabled"
                        }`}
                        onClick={handleEnrollReservation}
                      >
                        결제
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reservation;