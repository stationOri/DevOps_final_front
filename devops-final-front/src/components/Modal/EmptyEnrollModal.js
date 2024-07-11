import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/components/Modal/EmptyEnrollModal.css";
import closeIcon from "../../assets/images/x-close.png";
import emptyIcon from "../../assets/images/emptyenroll.png";
import restIcon from "../../assets/images/rest.png";

const EmptyEnrollModal = ({ isOpen, onClose, name }) => {
  const { id } = useParams();
  const [opentimes, setOpentimes] = useState([]);
  const [restInfo, setRestInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [maxPpl, setMaxPpl] = useState(0);

  useEffect(() => {
    if (isOpen) {
      fetchOpentimes();
      fetchRestInfo();
    }
  }, [isOpen]);

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

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleGuestIncrement = () => {
    if (selectedGuests < maxPpl) {
      setSelectedGuests(selectedGuests + 1);
    }
  };

  const handleGuestDecrement = () => {
    if (selectedGuests > 1) {
      setSelectedGuests(selectedGuests - 1);
    }
  };

  const day = new Date(+selectedDate+ 3240*10000).toISOString().split('T')[0];

  const oneWeekLater = new Date(new Date().setDate(new Date().getDate() + 7));
const oneMonthLater = new Date(new Date().setDate(new Date().getDate() + 30));

const LaterDate = restInfo && restInfo.rest_reservation_rule === "WEEKS" ? oneWeekLater : oneMonthLater;

  const handleEnroll = () => {
    console.log("빈자리 알림 신청 완료!");
    console.log("선택한 날짜:", day);
    console.log("선택한 시간:", selectedTime);
    console.log("선택한 인원수:", selectedGuests);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="empty-modal-header">
            <img className="empty-icon" src={emptyIcon} alt="Empty" />
            <p className="empty-enroll-title">빈자리 알림 신청</p>
          </div>
          <div className="close-btn-container">
            <button className="close-btn" onClick={onClose}>
              <img src={closeIcon} alt="Close" />
            </button>
          </div>
        </div>
        <div className="modal-body">
          <div className="horizon"></div>
          <div className="empty-enroll-rest">
            <img className="rest-icon" src={restIcon} alt="Rest" />
            <div className="empty-enroll-rest-name">{name}</div>
          </div>
          <div className="horizon"></div>
          <div className="empty-enroll-content">
            <div className="empty-enroll-picker">
              <div className="empty-enroll-date-time">
                <div className="empty-enroll-date">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    maxDate={LaterDate}
                    className="picker"
                    placeholderText="날짜 선택"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
                <div className="empty-enroll-time">
                  <select
                    id="timePicker"
                    className="picker"
                    value={selectedTime}
                    onChange={handleTimeChange}
                  >
                    <option value="">TIME</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="empty-enroll-content-text">
                <button
                  className="guest-picker-btn"
                  onClick={handleGuestDecrement}
                >
                  -
                </button>
                <span className="guest-picker-value">
                  <span className="selected-guest">{selectedGuests}</span>{" "}
                  Guests
                </span>
                <button
                  className="guest-picker-btn"
                  onClick={handleGuestIncrement}
                >
                  +
                </button>
              </div>
            </div>
            <div className="empty-enroll-content-text">
              해당 시간에 빈자리가 생겼을 시,
            </div>
            <div className="empty-enroll-content-text">
              알림톡을 보내드립니다.
            </div>
          </div>
          <div className="empty-enroll-btn">
            <div className="empty-btn-content" onClick={handleEnroll}>
              등록
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyEnrollModal;