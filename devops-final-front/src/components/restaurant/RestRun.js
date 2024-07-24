import React, { useState } from "react";
import TimeSlot from "../Timeslot";

function RestRun({restId}) {

  const [checkedDays, setCheckedDays] = useState([]);
  const [holidayOpen, setHolidayOpen] = useState("");
  const [breakTime, setBreakTime] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [lastOrderTime, setLastOrderTime] = useState("");
  const [breakStartTime, setBreakStartTime] = useState("");
  const [breakEndTime, setBreakEndTime] = useState("");


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

  const daysOfWeek = [
    { value: 'MON', label: '월' },
    { value: 'TUE', label: '화' },
    { value: 'WED', label: '수' },
    { value: 'THU', label: '목' },
    { value: 'FRI', label: '금' },
    { value: 'SAT', label: '토' },
    { value: 'SUN', label: '일' },
  ];

  return (
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
              {/* <div className="holidayrun">
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
              </div> */}
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
              <button
              className="runningTimeenroll"
              >등록</button>
            </div>
            <div className="">

            </div>
          </div>
  );
}

export default RestRun;