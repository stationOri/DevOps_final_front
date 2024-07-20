import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../css/components/Modal/WaitingEnrollModal.css";
import closeIcon from "../../assets/images/modal/x-close.png";
import emptyIcon from "../../assets/images/modal/emptyenroll.png";
import restIcon from "../../assets/images/modal/rest.png";
import SuccessModal from "./SuccessModal";
import { useSuccessModal } from "./SuccessModalContext";

const WaitingEnrollModal = ({ isOpen, onClose, userId, name }) => {
  const { id } = useParams();
  const [restInfo, setRestInfo] = useState(null);
  const [waiting, setWaiting] = useState([]);
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [userPhone, setUserPhone] = useState("");
  const [waitingCount, setWaitingCount] = useState(0);
  const { openSuccessModal } = useSuccessModal();

  useEffect(() => {
    if (isOpen) {
      fetchRestInfo();
      fetchWaiting();
    }
  }, [isOpen]);

  const fetchRestInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/restaurants/info/res/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant info");
      }
      const data = await response.json();
      setRestInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWaiting = async () => {
    try {
      const response = await fetch(`http://localhost:8080/waiting/rest/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch waiting");
      }
      const data = await response.json();
      const inQueueCount = data.filter(waiting => waiting.waitingStatus === "IN_QUEUE").length;
      setWaiting(data);
      setWaitingCount(inQueueCount);
      console.log("Waiting data:", data);
      console.log("Waiting inQueueCount:", inQueueCount);
    } catch (error) {
      setWaiting(null);
      console.error("Error fetching waiting:", error);
    }
  };

  const handleGuestIncrement = () => {
    if (selectedGuests < restInfo.maxPpl) {
      setSelectedGuests(selectedGuests + 1);
    }
  };

  const handleGuestDecrement = () => {
    if (selectedGuests > 1) {
      setSelectedGuests(selectedGuests - 1);
    }
  };

  const handlePhoneChange = (e) => {
    setUserPhone(e.target.value);
  };

  const handleOpenModal = async () => {
    try {
      await axios.post(`http://localhost:8080/waiting`, {
        userId: userId,
        restId: id,
        waitingPpl: selectedGuests,
        watingPhone: userPhone,
      });
    } catch (error) {
      console.error("웨이팅 요청 오류:", error);
      return;
    }
    console.log("웨이팅 요청 완료");

    openSuccessModal(
      userId,
      id,
      userPhone,
      selectedGuests,
      onClose
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="waiting-modal-header">
            <img className="waiting-icon" src={emptyIcon} alt="Empty" />
            <p className="waiting-enroll-title">웨이팅 등록</p>
          </div>
          <div className="close-btn-container">
            <button className="close-btn" onClick={onClose}>
              <img src={closeIcon} alt="Close" />
            </button>
          </div>
        </div>
        <div className="modal-body">
          <div className="horizon"></div>
          <div className="waiting-enroll-rest">
            <div className="waiting-enroll-rest-name-box">
              <img className="rest-icon" src={restIcon} alt="Rest" />
              <div className="waiting-enroll-rest-name">{name}</div>
            </div>
            <div className="waiting-now">현재 웨이팅 <span className="waiting-count">{waitingCount}</span> 팀</div>
          </div>
          <div className="horizon"></div>
          <div className="waiting-enroll-content">
            <div className="waiting-enroll-picker">
              <div className="waiting-enroll-phone-box">
                <input
                  className="waiting-enroll-phone"
                  placeholder="번호"
                  value={userPhone}
                  onChange={handlePhoneChange}
                />
              </div>
              <div className="waiting-enroll-content-text">
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
            <div className="waiting-enroll-content-text">
              해당 매장 웨이팅 등록 시,
            </div>
            <div className="waiting-enroll-content-text">
              타 매장 웨이팅 등록이 불가능합니다.
            </div>
          </div>
          <div className="waiting-enroll-btn">
            <div className="waiting-btn-content" onClick={handleOpenModal}>
              등록
            </div>
          </div>
        </div>
      </div>
      <SuccessModal />
    </div>
  );
};

export default WaitingEnrollModal;