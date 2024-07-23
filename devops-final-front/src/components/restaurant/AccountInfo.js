import React, { useState } from "react";
import "../../css/components/restaurant/AccountInfo.css";
import File from "../File";
import AddressSearch from "./AddressSearch";
import Keywords from "./Keywords";
import TimeSlot from "../Timeslot";
import TempHoliday from "./TempHoliday";
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

function AccountInfo({ restId }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [inputAddressValue, setInputAddressValue] = useState("");
  const [inputZipCodeValue, setInputZipCodeValue] = useState("");
  const [checkedDays, setCheckedDays] = useState([]);
  const [holidayOpen, setHolidayOpen] = useState("");
  const [breakTime, setBreakTime] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [lastOrderTime, setLastOrderTime] = useState("");
  const [breakStartTime, setBreakStartTime] = useState("");
  const [breakEndTime, setBreakEndTime] = useState("");
  const [isReservationChecked, setIsReservationChecked] = useState(false);
  const [revunit, setRevunit] = useState(null);
  const [revperiod, setRevperiod] = useState(null);
  const [reservationFee, setReservationFee] = useState(null); // 새로운 상태 변수 추가

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

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const onCompletePost = (data) => {
    setInputAddressValue(data.address);
    setInputZipCodeValue(data.zonecode);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCheckedDays((prev) =>
      checked ? [...prev, value] : prev.filter((day) => day !== value)
    );
  };

  const handleHolidayChange = (event) => {
    const { value } = event.target;
    setHolidayOpen(value);
  };

  const handleBreakTimeChange = (event) => {
    const { value } = event.target;
    setBreakTime(value);
  };

  const handleReservationChange = (event) => {
    setIsReservationChecked(event.target.checked);
  };

  const daysOfWeek = [
    { value: "mon", label: "월" },
    { value: "tue", label: "화" },
    { value: "wed", label: "수" },
    { value: "thu", label: "목" },
    { value: "fri", label: "금" },
    { value: "sat", label: "토" },
    { value: "sun", label: "일" },
  ];

  return (
    <div className="forAccinfoAlign">
      <div className="AccInfoTotalWrapper">
        <div className="Accinfo-header">
          {/* 헤더 */}
          <div className="accinfo-bold">나의 식당 수정하기</div>
          <div className="accinfo-hint">
            식당 상세 정보를 입력해주시길 바랍니다.
          </div>
        </div>
        {/* 컨텐츠 */}
        <div className="accinfo-contents">
          {/* 점포운영 */}
          <div className="rest-running">
            <div className="accinfo-bigtext">점포 운영</div>
            {/* 가게명 */}
            <div className="Wrppaerforplaintext">
              <div className="accinfo-hintText">가게명</div>
              <div className="accinfo-restname">
                가게명이 들어갈 자리입니다.
              </div>
            </div>
            {/* 파일  */}
            <div className="WrapperforFile">
              <div
                className={`ForImgBackground ${!imagePreview ? "hidden" : ""}`}
                style={{ backgroundImage: `url(${imagePreview})` }}
              ></div>
              <div className="accinfo-hintText">대표사진</div>
              <div className="accinfo-file-wrapper">
                <File onFileChange={handleFileChange} />
              </div>
            </div>
            {/* 소개글 */}
            <div className="Wrppaerforinput">
              <div className="accinfo-hintText">소개글</div>
              <textarea
                type="text"
                placeholder="내 가게 소개하기"
                className="accinfo-plain-textarea"
              />
            </div>
            {/* 주소 */}
            <div className="addressWrapper">
              <div className="Wrppaerforinput">
                <div className="accinfo-hintText">우편번호</div>
                <div className="addressWrapperinner">
                  <input
                    type="text"
                    value={inputZipCodeValue}
                    placeholder="우편번호"
                    readOnly
                  />
                  <AddressSearch onCompletePost={onCompletePost} />
                </div>
              </div>
              <div className="addressdetailWrapper">
              <div className="Wrppaerforinput">
                <div className="accinfo-hintText">가게주소</div>
                <input
                  type="text"
                  value={inputAddressValue}
                  placeholder="주소"
                  readOnly
                />
              </div>
              <div className="Wrppaerforinput">
                <div className="accinfo-hintText">상세주소</div>
                <input
                  type="text"
                  placeholder="생략가능"
                  className="accinfo-plain-input"
                />
              </div>
              </div>
             
            </div>
            {/* 매장 전화번호 */}
            <div className="Wrppaerforinput">
              <div className="accinfo-hintText">매장 전화번호</div>
              <input
                type="text"
                placeholder="'-'제외"
                className="accinfo-plain-input"
              />
            </div>
            {/* 키워드 설정 */}
            <Keywords />
          </div>
          {/* 운영시간 및 요일 */}
          <div className="rest-date">
            <div className="accinfo-bigtext">점포 운영</div>
            <div className="rest-date-first">
              <div className="checkBoxWrapper">
                <div className="accinfo-hintText">영업요일</div>
                <div className="checkboxes">
                  {daysOfWeek.map((day) => (
                    <label key={day.value} className="ccinfo-checkbox">
                      <input
                        type="checkbox"
                        name={day.value}
                        value={day.value}
                        checked={checkedDays.includes(day.value)}
                        onChange={handleCheckboxChange}
                      />
                      {day.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="holidayrun">
                <div className="accinfo-hintText">공휴일 영업</div>
                <div className="yesnocheck">
                  <label className="ccinfo-checkbox">
                    <input
                      type="checkbox"
                      name="holidayOpen"
                      value="yes"
                      checked={holidayOpen === "yes"}
                      onChange={handleHolidayChange}
                    />
                    네
                  </label>
                  <label className="ccinfo-checkbox">
                    <input
                      type="checkbox"
                      name="holidayOpen"
                      value="no"
                      checked={holidayOpen === "no"}
                      onChange={handleHolidayChange}
                    />
                    아니요
                  </label>
                </div>
              </div>
              <div className="breaktime">
                <div className="accinfo-hintText">브레이크타임</div>
                <div className="yesnocheck">
                  <label className="ccinfo-checkbox">
                    <input
                      type="checkbox"
                      name="breakTime"
                      value="yes"
                      checked={breakTime === "yes"}
                      onChange={handleBreakTimeChange}
                    />
                    네
                  </label>
                  <label className="ccinfo-checkbox">
                    <input
                      type="checkbox"
                      name="breakTime"
                      value="no"
                      checked={breakTime === "no"}
                      onChange={handleBreakTimeChange}
                    />
                    아니요
                  </label>
                </div>
              </div>
            </div>
            <div className="rest-date-last">
              <div className="timeWrapper">
                <div className="accinfo-hintText">오픈시간</div>
                <TimeSlot time={openTime} setTime={setOpenTime} />
              </div>
              <div className="timeWrapper">
                <div className="accinfo-hintText">마감 시간</div>
                <TimeSlot time={closeTime} setTime={setCloseTime} />
              </div>
              <div className="timeWrapper">
                <div className="accinfo-hintText">라스트오더</div>
                <TimeSlot time={lastOrderTime} setTime={setLastOrderTime} />
              </div>
              <div className="timeWrapper">
                <div className="accinfo-hintText">브레이크 시작시간</div>
                <TimeSlot
                  time={breakStartTime}
                  setTime={setBreakStartTime}
                  disabled={breakTime !== "yes"}
                />
              </div>
              <div className="timeWrapper">
                <div className="accinfo-hintText">브레이크 종료시간</div>
                <TimeSlot
                  time={breakEndTime}
                  setTime={setBreakEndTime}
                  disabled={breakTime !== "yes"}
                />
              </div>
            </div>
          </div>
          {/* 임시 휴무 지정 */}
          <TempHoliday />
          <hr className="revdivider" />
          {/* 예약 줄서기 체크박스 */}
          <div className="rest-revwait">
            <label className="accinfo-checkbox">
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
                      className="select-box"
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
                      className="select-box"
                      classNamePrefix="react-select"
                    />
                  </div>
                  <div className="Wrppaerforinput">
                    <div className="accinfo-hintText">
                      시간별 예약 최대 인원
                    </div>
                    <input
                      type="number"
                      placeholder="숫자로 입력해주세요"
                      className="accinfo-plain-input"
                    />
                  </div>
                  <div className="Wrppaerforinput">
                    <div className="accinfo-hintText">
                      시간별 예약 최대 테이블 수
                    </div>
                    <input
                      type="number"
                      placeholder="숫자로 입력해주세요"
                      className="accinfo-plain-input"
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
                <PeakSeason />
              </div>
            )}
            <label className="ccinfo-checkbox">
              <input type="checkbox" name="wait" value="줄서기" />
              원격줄서기
            </label>
          </div>
        </div>
        <div className="accinfo-checkbox"></div>
      </div>
    </div>
  );
}

export default AccountInfo;
