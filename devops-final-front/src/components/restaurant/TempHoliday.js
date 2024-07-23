import DateBox from "../Datebox"
import React, { useState } from "react";

function TempHoliday() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="rest-temphol">
      <div className="temp-holiday-firstrow">
      <div className="calWrapper">
      <div className="accinfo-hintText">휴무 시작일</div>
      <DateBox
              selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            />
      </div>
      <div className="calWrapper">
      <div className="accinfo-hintText">휴무 마감일</div>
      <DateBox
              selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            />
      </div>
      <button className="enrollbutton">등록</button>
      </div>
      <div className="temp-holiday-secondtrow">
        {/* 등록된것들 */}
      </div>
            
          </div>
  );

}

export default TempHoliday;