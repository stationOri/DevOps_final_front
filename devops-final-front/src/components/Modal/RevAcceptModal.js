import React, { useState } from "react";
import "../../css/components/Modal/CheckModal.css";
import "../../css/components/Modal/CancelModal.css";
import "../../css/components/Modal/RevAcceptModal.css";
import Logo from "../../assets/images/oriblue.png";

function RevAcceptModal({
  RevAcceptClose,
  revacceptshow,
  reservation,
  RestCancelShow
}) {
  const handlenavigate = () => {
    RevAcceptClose();
  };

  const handleno = () => {
    RestCancelShow();
    RevAcceptClose();
  };

  return (
    <div
      id={revacceptshow ? "resbackgroundon" : "resbackgroundoff"}
      onClick={(e) => {
        if (e.target.id === "resbackgroundon") {
          RevAcceptClose();
        }
      }}
    >
      <div
        className={`revAcceptModal ${
          revacceptshow ? "checkshow" : "checkhide"
        }`}
      >
        <div className="signinModalHeader">
          <img src={Logo} alt="" className="signinori" />
          <button className="signinclosebtn" onClick={RevAcceptClose}>
            X
          </button>
        </div>
        <div className="resAcceptModalContent">
          <div className="resacceprmodalheader">
            <div className="resmodalbold">예약 요청</div>
            <div className="resmodalhint">예약 요청을 확인하세요</div>
            <div className="resmodalresnum">
              예약 번호 : {reservation.res_id}
            </div>
          </div>
          <div className="resacceprmodalmid">
            <div className="nameRow">
              <div className="explainTextinAccept">예약자 이름</div>
              <div className="explaininputText">{reservation.user_name}</div>
            </div>
            <hr className="grayline" />
            <div className="numRow">
              <div className="explainTextinAccept">예약 인원 수</div>
              <div className="explaininputText">{reservation.res_num}</div>
            </div>
            <hr className="grayline" />
            <div className="menuRow">
              <div className="explainTextinAccept">주문 메뉴</div>
              <div className="menuWrapper">
                {reservation.menu.map((item, index) => (
                  <div className="acceptmodaltrWrapper" key={index}>
                    <div className="menutd menunamtinaccept">
                      {item.menu_name}
                    </div>
                    <div className="menutd">{item.amount}개</div>
                  </div>
                ))}
              </div>
            </div>
            <hr className="grayline" />
            <div className="requestRow">
              <div className="explainTextinAccept">요청사항</div>
              <div className="explaininputText requestdetail">
                {reservation.request}
              </div>
            </div>
          </div>
          <div className="resacceprmodalfoot">
            <button className="resModalBtn" onClick={handlenavigate}>
              승인
            </button>
            <button className="resModalBtnno" onClick={handleno}>
              거부
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevAcceptModal;
