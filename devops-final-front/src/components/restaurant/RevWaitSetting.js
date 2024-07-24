import React, { useState } from "react";
import Select from "react-select";
import PeakSeason from "./PeakSeaon";

const revunitOptions = [
  { value: "weekly", label: "일주일" },
  { value: "monthly", label: "한달" },
];

const revperiodOptions = [
  { value: "half", label: "30분" },
  { value: "hour", label: "1시간" },
];

function RevWaitSetting({ restId }) {
  const [inputMaxGuests, setInputMaxGuests] = useState("");
  const [inputMaxTables, setInputMaxTables] = useState("");
  const [reservationCustomFee, setReservationCustomFee] = useState("");
  const [isWaitChecked, setIsWaitChecked] = useState(false); // 원격 줄서기 상태 추가
  const [revunit, setRevunit] = useState(null);
  const [revperiod, setRevperiod] = useState(null);
  const [reservationFee, setReservationFee] = useState(null);
  const [isReservationChecked, setIsReservationChecked] = useState(false);

  // revunit 셀렉트 박스의 변경 핸들러
  const handleRevunitChange = (selectedOption) => {
    setRevunit(selectedOption);
  };

  // revperiod 셀렉트 박스의 변경 핸들러
  const handleRevperiodChange = (selectedOption) => {
    setRevperiod(selectedOption);
  };

  // 예약금 체크박스의 변경 핸들러
  const handleReservationFeeChange = (event) => {
    setReservationFee(event.target.value);
  };

  // 원격 줄서기 체크박스 핸들러
  const handleWaitChange = (event) => {
    setIsWaitChecked(event.target.checked);
  };

  const handleReservationChange = (event) => {
    setIsReservationChecked(event.target.checked);
  };

  const handleSubmit = () => {
    console.log({
      inputMaxGuests,
      inputMaxTables,
      reservationCustomFee,
      isReservationChecked,
      isWaitChecked,
      revunit: revunit ? revunit.value : null,
      revperiod: revperiod ? revperiod.value : null,
      reservationFee,
    });
  };

  return (
    <div className="revWaitCompo">
      <div className="accinfo-bigtext">예약 및 웨이팅 설정</div>
      <div className="rest-revwait">
        <label className="accinfo-checkbox-forrev">
          <input
            type="checkbox"
            name="rev"
            value="예약"
            checked={isReservationChecked}
            onChange={handleReservationChange}
          />
          예약
        </label>
        {isReservationChecked && (
          <div className="accinfo-rev-detail">
            <div className="accinfo-bigtext">예약 설정</div>
            <div className="revSetting-first">
              <div className="Wrppaerforinput">
                <div className="accinfo-hintText">예약 오픈 단위</div>
                <Select
                  options={revunitOptions}
                  value={revunit}
                  onChange={handleRevunitChange}
                  placeholder="예약 유형 선택"
                  className="select-box-revdetail"
                  classNamePrefix="react-select"
                />
              </div>
              <div className="Wrppaerforinput">
                <div className="accinfo-hintText">예약 간격</div>
                <Select
                  options={revperiodOptions}
                  value={revperiod}
                  onChange={handleRevperiodChange}
                  placeholder="기간 선택"
                  className="select-box-revdetail"
                  classNamePrefix="react-select"
                />
              </div>
              <div className="Wrppaerforinput">
                <div className="accinfo-hintText">시간별 예약 최대 인원</div>
                <input
                  type="number"
                  placeholder="숫자로 입력해주세요"
                  className="accinfo-plain-input-rev"
                  value={inputMaxGuests}
                  onChange={(e) => setInputMaxGuests(e.target.value)}
                />
              </div>
              <div className="Wrppaerforinput">
                <div className="accinfo-hintText">
                  시간별 예약 최대 테이블 수
                </div>
                <input
                  type="number"
                  placeholder="숫자로 입력해주세요"
                  className="accinfo-plain-input-rev"
                  value={inputMaxTables}
                  onChange={(e) => setInputMaxTables(e.target.value)}
                />
              </div>
            </div>
            <div className="revSetting-second">
              <div className="accinfo-hintText">예약금</div>
              <div className="revMoneyCheckboxWrapper">
                <label className="ccinfo-checkbox">
                  <input
                    type="checkbox"
                    name="reservationFee"
                    value="custom"
                    checked={reservationFee === "custom"}
                    onChange={handleReservationFeeChange}
                  />
                  제가 예약금을 지정하겠습니다.
                </label>
                {reservationFee === "custom" && (
                  <input
                    type="number"
                    className="inputformoney"
                    placeholder="30,000"
                    value={reservationCustomFee}
                    onChange={(e) => setReservationCustomFee(e.target.value)}
                  />
                )}
                <label className="ccinfo-checkbox">
                  <input
                    type="checkbox"
                    name="reservationFee"
                    value="20%"
                    checked={reservationFee === "20%"}
                    onChange={handleReservationFeeChange}
                  />
                  주문 메뉴의 20%를 예약금으로 받겠습니다.
                </label>
              </div>
            </div>
            <PeakSeason restId={restId} />
          </div>
        )}
        <label className="accinfo-checkbox-forrev">
          <input
            type="checkbox"
            name="wait"
            value="줄서기"
            checked={isWaitChecked}
            onChange={handleWaitChange}
          />
          원격줄서기
        </label>
      </div>
      <div className="editCompleteBtnWrapper">
        <button className="ediCompleteBrn" onClick={handleSubmit}>
          {" "}
          수정 완료
        </button>
      </div>
    </div>
  );
}

export default RevWaitSetting;
