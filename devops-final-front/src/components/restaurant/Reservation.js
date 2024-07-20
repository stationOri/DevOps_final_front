import Now from "../../assets/images/Restaurant/now.png";
import Deposit from "../../assets/images/Restaurant/deposit.png";
import Waiting from "../../assets/images/Restaurant/waiting.png";
import "../../css/components/restaurant/Reservation.css";
import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import Cal from "../../assets/images/modal/cal.png";
import DatePicker from "react-datepicker";

function Reservation() {
  const [loading, setLoading] = useState(true);
  const [rev, setRev] = useState(false);
  const [restId, setRestId] = useState(2);
  const [upperText, setUpperText] = useState("");
  const [lowerText, setLowerText] = useState("");
  const [team, setTeam] = useState([]); //오늘 시간대별 예약 갯수
  const [num, setNum] = useState(0); //오늘 예약 갯수
  const [waitingList, setWaitingList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // fetchAvailableTimes(date);
  };
  const LaterDate = new Date(new Date().setDate(new Date().getDate() + 30));
  // restInfo && restInfo.restReserveopenRule === "WEEKS"
  //   ? oneWeekLater
  //   : oneMonthLater;

  // const getWaitStatus = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/restaurants/info/waitingstatus/${restId}`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch");
  //     }
  //     const text = await response.text();
  //     if (text === "A") {
  //       setUpperText("현재 웨이팅 접수 중지중입니다.");
  //       setLowerText("웨이팅 접수를 시작해주세요.");
  //     } else if (text === "B") {
  //       setUpperText("현재 웨이팅 접수 종료중입니다.");
  //       setLowerText("웨이팅 접수를 시작해주세요.");
  //     } else if (text === "C") {
  //       setUpperText("현재 웨이팅 접수 중입니다.");
  //       setLowerText("웨이팅 접수 시작이 불가능합니다.");
  //     }
  //   } catch (error) {
  //     console.error("Error revWait status:", error);
  //   }
  // };

  const renderStatusContent = (status, waitingId) => {
    switch (status) {
      case "QUEUE_CANCELED":
        return <td className="status-queue-canceled">대기 취소</td>;
      case "NOSHOW":
        return <td className="status-noshow">노쇼</td>;
      default:
        return <td></td>;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getWait()]);
      setLoading(false);
    };

    fetchData();
  }, [restId]);

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
                  오늘의 예약 <span className="spanforOrangerev">0</span> 건
                </div>
                <hr className="innerHrLinewai" />
                <div className="reserinfobox">ddd</div>
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
                  minDate={new Date()}
                  maxDate={LaterDate}
                  className="picker insmallrev"
                  placeholderText="DATE"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <button className="findbtn">찾기</button>
            </div>
            <table className="bookingtable">
              <thead>
                <tr>
                  <td colSpan={2}>날짜</td>
                  <td colSpan={2}>날짜(D+1)</td>
                  <td colSpan={2}>날짜(D+2)</td>
                  <td colSpan={2}>날짜(D+3)</td>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Reservation;
