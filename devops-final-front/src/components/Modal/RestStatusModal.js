
import React, { useState } from 'react';
import "../../css/components/Modal/CheckModal.css";
import "../../css/components/Modal/CancelModal.css";
import "../../css/components/Modal/RestCancelModal.css";

function RestStatusModal({ RestChangeClose, restchangeshow }) {
  const [selectedReason, setSelectedReason] = useState(null);

  const handleCancel = () => {
    if (selectedReason) {
      console.log(`Reservation changed. Selected reason: ${selectedReason}`);
    } else {
      console.log('Reservation cancelled. No reason selected');
    }
    RestChangeClose();
  };

  const handleReject = () => {
    RestChangeClose();
  };

  const handleReasonClick = (reason) => {
    setSelectedReason(reason);
  };

  return (
    <div
      id={restchangeshow ? "resbackgroundon" : "resbackgroundoff"}
      onClick={(e) => {
        if (
          e.target.id === "resbackgroundon" ||
          e.target.id === "resbackgroundoff"
        ) {
          RestChangeClose();
        }
      }}
    >
      <div className={`restcancelModal ${restchangeshow ? "checkshow" : "checkhide"}`}>
        <div className="checkModalContent">
          <div className="checkboldText">예약 상태 변경</div>
          <hr className="checkmodalline" />
          <div className="checkhintText">
            변경 후 다시 변경할 수 없으니 신중히 선택해주세요.
          </div>
          <div className='cancelmodalReasonWrapper'>
            <button
              className={`cancelmodalReasonBtn ${selectedReason === "방문" ? "selectedReason" : ""}`}
              onClick={() => handleReasonClick("방문")}
            >
              방문
            </button>
            <button
              className={`cancelmodalReasonBtn ${selectedReason === "노쇼" ? "selectedReason" : ""}`}
              onClick={() => handleReasonClick("노쇼")}
            >
              노쇼
            </button>
          </div>
          <div className="resacceprmodalfoot cancelmodaldetail">
            <button
              className={`resModalBtn ${!selectedReason ? 'disabled' : ''}`}
              onClick={handleCancel}
              disabled={!selectedReason}
            >
              네
            </button>
            <button
              className={`resModalBtnno`}
              onClick={handleReject}
            >
              아니요
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestStatusModal;