import React from "react";
import { useState } from "react";
import "../../css/components/Modal/EmptyEnrollModal.css";
import closeIcon from "../../assets/images/x-close.png";
import emptyIcon from "../../assets/images/emptyenroll.png";
import restIcon from "../../assets/images/rest.png";

const EmptyEnrollModal = ({ isOpen, onClose, name }) => {
  // Initialize state variables at the top level
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [selectedTime, setSelectedTime] = useState(""); // State for selected time
  const [selectedGuests, setSelectedGuests] = useState(1); // State for selected number of guests

  // Check if modal is not open, then return null
  if (!isOpen) return null;

  // Event handlers for handling changes
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleGuestsChange = (event) => {
    setSelectedGuests(parseInt(event.target.value));
  };

  // Handle enrollment logic here
  const handleEnroll = () => {
    console.log("빈자리 알림 신청 완료!");
    console.log("선택한 날짜:", selectedDate);
    console.log("선택한 시간:", selectedTime);
    console.log("선택한 인원수:", selectedGuests);
    // Additional logic to handle enrollment
  };

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
            <div>
            <label htmlFor="datePicker">날짜:</label>
              <input
                type="date"
                id="datePicker"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <div className="empty-enroll-content-text">
              <label htmlFor="timePicker">시간:</label>
              <input
                type="time"
                id="timePicker"
                value={selectedTime}
                onChange={handleTimeChange}
              />
            </div>
            <div className="empty-enroll-content-text">
              <label htmlFor="guestsPicker">인원수:</label>
              <select
                id="guestsPicker"
                value={selectedGuests}
                onChange={handleGuestsChange}
              >
                <option value={1}>1명</option>
                <option value={2}>2명</option>
                <option value={3}>3명</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="empty-enroll-content-text">해당 시간에 빈자리가 생겼을 시,</div>
            <div className="empty-enroll-content-text">알림톡을 보내드립니다.</div>
          </div>
          <div className="empty-enroll-btn">
          <div className="empty-btn-content">등록</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyEnrollModal;
