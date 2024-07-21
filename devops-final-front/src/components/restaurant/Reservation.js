import Now from "../../assets/images/Restaurant/now.png";
import Deposit from "../../assets/images/Restaurant/deposit.png";
import Waiting from "../../assets/images/Restaurant/waiting.png";
import "../../css/components/restaurant/Reservation.css";
import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import Cal from "../../assets/images/modal/cal.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // DatePicker CSS 파일을 임포트

function Reservation() {
  const [loading, setLoading] = useState(true);
  const [rev, setRev] = useState(false);
  const [restId, setRestId] = useState(2);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tableDates, setTableDates] = useState({}); // 날짜 상태 관리
  const [rev1, setRev1] = useState([]);
  const [rev2, setRev2] = useState([]);
  const [rev3, setRev3] = useState([]);
  const [rev4, setRev4] = useState([]);
  const [todayinfo, setTodayInfo] = useState([]);
  const [todaynum, setTodayNum] = useState(0);

  // 현재 날짜의 작년 1월 1일 계산
  const getLastYearStartDate = () => {
    const now = new Date();
    return new Date(now.getFullYear() - 1, 0, 1);
  };

  const minDate = getLastYearStartDate(); // minDate 값 설정

  // 식당 예약 상태 확인
  const getWait = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/restaurants/info/revWait/${restId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const text = await response.text();
      if (text === "B" || text === "C") {
        setRev(true);
      }
    } catch (error) {
      console.error("Error revWait status:", error);
    }
  };

  // 식당 열 가져오기
  const getRev = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restRev`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      console.log(json);
      setRev1(json);
    } catch (error) {
      console.error("Error revWait status:", error);
    }
  };

  const getRev2 = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restRev2`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      console.log(json);
      setRev2(json);
    } catch (error) {
      console.error("Error revWait status:", error);
    }
  };

  const getRev3 = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restRev3`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      console.log(json);
      setRev3(json);
    } catch (error) {
      console.error("Error revWait status:", error);
    }
  };

  const getRev4 = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restRev4`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      console.log(json);
      setRev4(json);
    } catch (error) {
      console.error("Error revWait status:", error);
    }
  };

  //오늘 예약건 갯수
  const getToday = async () => {
    try {
      const response = await fetch(`http://localhost:4000/today`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();

      // 시간을 기준으로 예약 건수를 세는 객체
      const timeCounts = json.reduce((acc, reservation) => {
        const hour = new Date(reservation.res_datetime).getHours();
        const timeSlot = `${hour}:00`;
        if (!acc[timeSlot]) {
          acc[timeSlot] = 0;
        }
        acc[timeSlot] += 1;
        return acc;
      }, {});

      setTodayNum(json.length);
      setTodayInfo(timeCounts); // 시간별 건수를 저장
    } catch (error) {
      console.error("Error revWait status:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getWait(),
        getRev(),
        getRev2(),
        getRev3(),
        getRev4(),
        getToday(),
      ]);
      setLoading(false);
    };

    fetchData();
  }, [restId]);

  // 찾기 버튼 클릭 핸들러
  const handleFindClick = () => {
    // 선택된 날짜를 기준으로 테이블의 날짜를 계산하여 업데이트
    setTableDates({
      today: selectedDate,
      day1: addDays(selectedDate, 1),
      day2: addDays(selectedDate, 2),
      day3: addDays(selectedDate, 3),
    });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}. ${month}. ${day}`;
  };

  const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  };

  // 초기 테이블 날짜 설정
  useEffect(() => {
    setTableDates({
      today: new Date(),
      day1: addDays(new Date(), 1),
      day2: addDays(new Date(), 2),
      day3: addDays(new Date(), 3),
    });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const LaterDate = new Date(new Date().setDate(new Date().getDate() + 30));

  return (
    <div className="WrapperWithoutBorder">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="UpperBoxRestheight">
            <div className="upperboxleft">
              <div className="rest-text">
                <img src={Deposit} alt="" className="rest-text-logo" />
                <p className="rest-bold-text">Deposit</p>
              </div>
              <div className="rest-content-boxwai">
                <div>
                  이번 달 <span className="spanfornoshow">노쇼</span> 예약금
                  총액
                </div>
                <div>
                  <span className="spanformoney">500,000</span> 원
                </div>
                <div className="accountbox">환불계좌 수정하기</div>
              </div>
            </div>
            <div className="upperboxright">
              <div className="rest-text">
                <img src={Now} alt="" className="rest-text-logo" />
                <p className="rest-bold-text">Today</p>
              </div>
              <div className="rest-content-boxwai">
                <div className="bookingExText">
                  오늘의 예약{" "}
                  <span className="spanforOrangerev">{todaynum}</span> 건
                </div>
                <hr className="innerHrLinewai" />
                {rev ? (
                  <div className="resernoinfobox">
                    예약 내역이 존재하지 않습니다.
                  </div>
                ) : (
                  <div className="reserinfobox">
                    {Object.entries(todayinfo).map(([timeSlot, count]) => (
                      <div className="innerslot" key={timeSlot}>
                        {timeSlot}{" "}
                        <span className="spanforcounting">{count}</span>건
                      </div>
                    ))}
                  </div>
                )}
                <hr className="innerHrLinewai" />
              </div>
            </div>
          </div>
          <div className="LowerBoxRest">
            <div className="rest-text">
              <img src={Waiting} alt="" className="rest-text-logo" />
              <p className="rest-bold-text">Booking Status</p>
            </div>
            <div className="dateselectWrapper">
              <div className="dateborderWrapper">
                <img src={Cal} alt="" className="calphoto" />
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={minDate}
                  maxDate={LaterDate}
                  className="picker insmallrev"
                  placeholderText="DATE"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <button className="findbtn" onClick={handleFindClick}>
                찾기
              </button>
            </div>

            {rev ? (
              <div className="bookingtableno">
                <div className="rowWrapper">
                  <div className="tableBorder forRow">
                    {formatDate(tableDates.today)}
                  </div>
                  <div className="tableBorder forRow">
                    {formatDate(tableDates.day2)} (D+2)
                  </div>
                  <div className="tableBorder forRow">
                    {formatDate(tableDates.day2)} (D+2)
                  </div>
                  <div className="tableBorderend forRow">
                    {formatDate(tableDates.day3)} (D+3)
                  </div>
                </div>
                <div className="rowWrapper2">
                  <div>예약 기능을 사용하지 않고 있습니다.</div>
                  <div>
                    해당 기능을 사용하려면 가게 정보 수정 화면에서 예약을 활성화
                    해주세요.
                  </div>
                  <button>가게 정보 수정하러 가기</button>
                </div>
              </div>
            ) : (
              <div className="bookingtable">
                <div className="colWarpper">
                  <div className="tableBorder">
                    {formatDate(tableDates.today)}
                  </div>
                </div>
                <div className="colWarpper">
                  <div className="tableBorder">
                    {formatDate(tableDates.day1)} (D+1)
                  </div>
                </div>
                <div className="colWarpper">
                  <div className="tableBorder">
                    {formatDate(tableDates.day2)} (D+2)
                  </div>
                </div>
                <div className="colWarpper">
                  <div className="tableBorderend">
                    {formatDate(tableDates.day3)} (D+3)
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Reservation;
