import React, { useState } from "react";
import DateBox from "../Datebox";
import TimeSlot from "../Timeslot";
import Select from "react-select";

const revperiodOptions = [
  { value: "half", label: "30분" },
  { value: "hour", label: "1시간" },
];

function PeakSeason() {
  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const [selectedDateReservation, setSelectedDateReservation] = useState(null);
  const [revperiod, setRevperiod] = useState(null);
  const [openTime, setOpenTime] = useState(null);

  const handleDateChangeStart = (date) => {
    setSelectedDateStart(date);
  };

  const handleDateChangeEnd = (date) => {
    setSelectedDateEnd(date);
  };

  const handleDateChangeReservation = (date) => {
    setSelectedDateReservation(date);
  };

  const handleRevperiodChange = (selectedOption) => {
    setRevperiod(selectedOption);
  };

  return (
    <div>
      <div className="timeWrapper">
        <div className="accinfo-bigtext">점포 운영</div>
        <div className="peakWrapper-first">
          <div className="calWrapper">
            <div className="accinfo-hintText">성수기 영업 시작일</div>
            <DateBox
              selectedDate={selectedDateStart}
              handleDateChange={handleDateChangeStart}
            />
          </div>
          <div className="calWrapper">
            <div className="accinfo-hintText">성수기 영업 마감일</div>
            <DateBox
              selectedDate={selectedDateEnd}
              handleDateChange={handleDateChangeEnd}
            />
          </div>
          <div className="calWrapper">
            <div className="accinfo-hintText">예약 오픈일</div>
            <DateBox
              selectedDate={selectedDateReservation}
              handleDateChange={handleDateChangeReservation}
            />
          </div>
          <div className="calWrapper">
            <div className="accinfo-hintText">성수기 운영시간</div>
            <TimeSlot time={openTime} setTime={setOpenTime} />
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
        </div>
        <div className="peakWrapper-second">
          {/* 있는 정보 뿌리기 */}
        </div>
      </div>
    </div>
  );
}

export default PeakSeason;
