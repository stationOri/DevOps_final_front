import React, { useState } from "react";
import "../../css/components/Modal/RestRejectModal.css";

function RestRejectModal({
  RejectClose, rejectshow,rest_id
}) {
  const [activeButton, setActiveButton] = useState("");

  const handleRejectRestModal = () => {
    // 거절 업데이트 하기
    console.log(activeButton);
    RejectClose();
  };

  const handleButtonClick = (reason) => {
    setActiveButton(reason);
  };

  return (
    <div
      id={rejectshow ? "signinbackgroundon" : "signinbackgroundoff"}
      onClick={(e) => {
        if (
          e.target.id === "signinbackgroundon" ||
          e.target.id === "signinbackgroundoff"
        ) {
          RejectClose();
        }
      }}
    >
      <div
        className={`rejectModal ${rejectshow ? "signinshow" : "signinhide"}`}
      >
        <div className="rejectmodalcontentswrapper">
          <div className="acceptModalHeader">
            <div className="acceptboldText">반려 사유</div>
            <button className="acceptclosebtn" onClick={RejectClose}>
              X
            </button>
          </div>
          <div className="acceptModalContent">
            <button
              className={activeButton === "서류 미흡" ? "rejectbtnactive" : ""}
              onClick={() => handleButtonClick("서류 미흡")}
            >
              서류 미흡
            </button>
            <button
              className={activeButton === "블랙리스트" ? "rejectbtnactive" : ""}
              onClick={() => handleButtonClick("블랙리스트")}
            >
              블랙리스트
            </button>
            <button
              className={activeButton === "내역 존재" ? "rejectbtnactive" : ""}
              onClick={() => handleButtonClick("내역 존재")}
            >
              내역 존재
            </button>
          </div>
          <div className="acceptModalButton">
            <button className="acceptModalAccept" onClick={handleRejectRestModal}>
              확인
            </button>
            <button className="acceptModalReject" onClick={RejectClose}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestRejectModal;
