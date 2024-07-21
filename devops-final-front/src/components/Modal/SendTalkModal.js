import React, { useState, useEffect } from "react";
import "../../css/components/Modal/SigninModal.css";
import DatePicker from "react-datepicker";
import Cal from "../../assets/images/modal/cal.png";
import Time from "../../assets/images/modal/time.png";
import "../../css/components/Modal/SendTalkModal.css";

function SendTalkModal({ TalkClose, talkshow, restId }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [message, setMessage] = useState("");

  const handleSendTalk = () => {
    // 알림톡 전송 로직

    setMessage("");
    TalkClose();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleClose = () => {
    setMessage("");
    TalkClose();
  };

  const minDate = new Date().getDate(); // minDate 값 설정

  return (
    <div
      id={talkshow ? "signinbackgroundon" : "signinbackgroundoff"}
      onClick={(e) => {
        if (
          e.target.id === "signinbackgroundon" ||
          e.target.id === "signinbackgroundoff"
        ) {
          handleClose();
        }
      }}
    >
      <div className={`talkModal ${talkshow ? "signinshow" : "signinhide"}`}>
        <div className="signinModalContent">
          <div className="signinboldText">알림톡 전송</div>
          <div className="signinhintText">예약 고객들에게 알림톡 전송하기</div>
        </div>
        <div className="talkModalContent">
          <div className="talkmodalUpperBox">
            <div className="boxWrapperForAlign">
              <div className="explanationTextintalk">대상 날짜</div>
              <div className="dateborderWrapper">
                <img src={Cal} alt="" className="calphoto" />
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={minDate}
                  className="picker insmallrev"
                  placeholderText="DATE"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>
            <div className="boxWrapperForAlign">
              <div className="explanationTextintalk">예약 시간</div>
              <div className="dateborderWrapper">
                <img src={Time} alt="" className="calphoto" />
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={minDate}
                  className="picker insmallrev"
                  placeholderText="DATE"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>
          </div>
          <div className="talkmodalLowerBox">
            <div className="explanationTextintalk">전달 내용</div>
            <textarea 
              placeholder="최대 200자 까지 작성 가능합니다."
              maxLength={200}
              className="talkTextInput"
              value={message}
              onChange={handleMessageChange}
            />
          </div>
        </div>
        <div className="signinModalButton">
          <button className="signinModalPersonal" onClick={handleSendTalk}>
            전송
          </button>
          <button className="signinModalRest" onClick={handleClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default SendTalkModal;
