// RestCancelModal.js
import React, { useState } from 'react';
import "../../css/components/Modal/CheckModal.css";
import "../../css/components/Modal/CancelModal.css";
import "../../css/components/Modal/RestCancelModal.css";

function RestCancelModal({ RestCancelClose, restcancelshow }) {
  const [selectedReason, setSelectedReason] = useState(null);

  const handleCancel = () => {
    if (selectedReason) {
      console.log(`Reservation cancelled. Selected reason: ${selectedReason}`);
    } else {
      console.log('Reservation cancelled. No reason selected');
    }
    RestCancelClose();
  };

  const handleReject = () => {
    if (selectedReason) {
      console.log(`Reservation rejected. Selected reason: ${selectedReason}`);
    } else {
      console.log('Reservation rejected. No reason selected');
    }
    RestCancelClose();
  };

  const handleReasonClick = (reason) => {
    setSelectedReason(reason);
  };

  return (
    <div
      id={restcancelshow ? "resbackgroundon" : "resbackgroundoff"}
      onClick={(e) => {
        if (
          e.target.id === "resbackgroundon" ||
          e.target.id === "resbackgroundoff"
        ) {
          RestCancelClose();
        }
      }}
    >
      <div className={`restcancelModal ${restcancelshow ? "checkshow" : "checkhide"}`}>
        <div className="checkModalContent">
          <div className="checkboldText">예약을 취소하시겠습니까?</div>
          <hr className="checkmodalline" />
          <div className="checkhintText">
            예약금은 취소 일시에 관계 없이 사용자에게 전액 환불 처리됩니다.
          </div>
          <div className='cancelmodalReasonWrapper'>
            <button
              className={`cancelmodalReasonBtn ${selectedReason === "내부 사정" ? "selectedReason" : ""}`}
              onClick={() => handleReasonClick("내부 사정")}
            >
              내부 사정
            </button>
            <button
              className={`cancelmodalReasonBtn ${selectedReason === "메뉴 주문 불가" ? "selectedReason" : ""}`}
              onClick={() => handleReasonClick("메뉴 주문 불가")}
            >
              메뉴 주문 불가
            </button>
          </div>
          <div className="resacceprmodalfoot cancelmodaldetail">
            <button
              className={`resModalBtn ${!selectedReason ? 'disabled' : ''}`}
              onClick={handleCancel}
              disabled={!selectedReason}
            >
              승인
            </button>
            <button
              className={`resModalBtnno ${!selectedReason ? 'disabled' : ''}`}
              onClick={handleReject}
              disabled={!selectedReason}
            >
              거부
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestCancelModal;
