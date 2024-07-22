import React, { useState, useEffect } from "react";
import Now from "../../assets/images/Restaurant/now.png";
import Deposit from "../../assets/images/Restaurant/deposit.png";
import Waiting from "../../assets/images/Restaurant/waiting.png";
import Phone from "../../assets/images/Restaurant/phone.png";
import Human from "../../assets/images/Restaurant/human.png";
import Table from "../../assets/images/Restaurant/table.png";
import "../../css/components/restaurant/Reservation.css";
import Loading from "../Loading";
import Cal from "../../assets/images/modal/cal.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SendTalkModal from "../Modal/SendTalkModal";
import AccountModal from "../Modal/AccountModal";

function Reservation() {
  const [loading, setLoading] = useState(true);
  const [rev, setRev] = useState(false);
  const [infoshow, setInfoShow] = useState(false);
  const [restId, setRestId] = useState(2);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tableDates, setTableDates] = useState({});
  const [rev1, setRev1] = useState([]);
  const [rev2, setRev2] = useState([]);
  const [rev3, setRev3] = useState([]);
  const [rev4, setRev4] = useState([]);
  const [todayinfo, setTodayInfo] = useState([]);
  const [todaynum, setTodayNum] = useState(0);
  const [talkshow, setTalkShow] = useState(false);

  const TalkClose = () => setTalkShow(false);
  const TalkShow = () => setTalkShow(true);

  const openInfoModal = () => {
    setInfoShow(true);
  };

  const closeInfoModal = () => {
    setInfoShow(false);
  };

  const getLastYearStartDate = () => {
    const now = new Date();
    return new Date(now.getFullYear() - 1, 0, 1);
  };

  const minDate = getLastYearStartDate();
  const LaterDate = new Date(new Date().setDate(new Date().getDate() + 30));

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

  const sortByDateTime = (data) => {
    return data.sort((a, b) => new Date(a.res_datetime) - new Date(b.res_datetime));
  };
  
  const getRev = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restRev`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      const sortedData = sortByDateTime(json);
      setRev1(sortedData);
    } catch (error) {
      console.error("Error fetching rev1:", error);
    }
  };
  
  const getRev2 = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restRev2`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      const sortedData = sortByDateTime(json);
      setRev2(sortedData);
    } catch (error) {
      console.error("Error fetching rev2:", error);
    }
  };
  
  const getRev3 = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restRev3`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      const sortedData = sortByDateTime(json);
      setRev3(sortedData);
    } catch (error) {
      console.error("Error fetching rev3:", error);
    }
  };
  
  const getRev4 = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restRev4`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      const sortedData = sortByDateTime(json);
      setRev4(sortedData);
    } catch (error) {
      console.error("Error fetching rev4:", error);
    }
  };
  

  const getToday = async () => {
    try {
      const response = await fetch(`http://localhost:4000/today`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();

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
      setTodayInfo(timeCounts);
    } catch (error) {
      console.error("Error fetching today's reservations:", error);
    }
  };

  const renderReservations = (reservations, row) => {
    const getButtonText = (status) => {
      switch (status) {
        case "RESERVATION_READY":
          return <button className="btninRestRev">승인</button>;
        case "RESERVATION_ACCEPTED":
          return <button className="btninRestRev">확인</button>;
        case "RESERVATION_REJECTED":
          return <div>거절됨</div>;
        case "RESERVATION_CANCELED":
          return <div>취소됨</div>;
        case "VISITED":
          return <div>방문</div>;
        case "NOSHOW":
          return <div>노쇼</div>;
        default:
          return <div>오류</div>;
      }
    };
  
    let previousTime = null;  // 이전 예약의 시간 저장 변수
  
    return reservations.map((rev, index) => {
      const date = new Date(rev.res_datetime);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const isLastElement = index === reservations.length - 1;
  
      const currentTime = `${formattedHours}:${formattedMinutes} ${period}`;
  
      const isNewLine = previousTime !== currentTime;
  
      const timeDisplay = isNewLine ? (
        <>
          <div>{formattedHours}:{formattedMinutes}</div>
          <div style={{ fontSize: "13px" }}>{period}</div>
        </>
      ) : null;
  
      previousTime = currentTime;
  
      let rowClass = '';
      switch (row) {
        case 1:
          rowClass = 'firstElement';
          break;
        case 2:
          rowClass = 'secondElement';
          break;
        case 3:
          rowClass = 'thirdElement';
          break;
        case 4:
          rowClass = 'fourthElement';
          break;
        default:
          rowClass = '';
      }
  
      return (
        <div className={`reservationBox ${rowClass} ${isNewLine ? 'newLine' : 'notNewLine'} ${isLastElement ? 'lastElement' : ''}`} key={rev.res_id}>
          <div className="timebox">
            {timeDisplay}
          </div>
          <div className="reservationDetail">
            <div className="reservationdetailed">
              <div>{rev.user_name}</div>
              <div className="boxforicon">
                <div className="innericonbox">
                  <img src={Human} alt="" className="iconforrev humanicon" />
                  <div className="cnfornumber">{rev.res_num}</div>
                </div>
                <div className="innericonbox">
                  <img src={Table} alt="" className="iconforrev" />
                  <div className="cnfornumber">1</div>
                </div>
              </div>
            </div>
            <div className="reservationforbtn">
              {getButtonText(rev.status)}
            </div>
          </div>
        </div>
      );
    });
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

  const handleFindClick = () => {
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
                <div className="accountbox" style={{cursor:"pointer"}}onClick={openInfoModal}>환불계좌 수정하기</div>
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
            <div className="forspacingInrev">
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
              <div className="phoneWrapper">
                <img src={Phone} alt="" className="phoneicon" />
                <div className="phoneText" onClick={TalkShow}>
                  알림톡 전송하기
                </div>
              </div>
            </div>
            {rev ? (
              <div className="bookingtableno">
                <div className="rowWrapper">
                  <div className="tableBorder forRow">
                    {formatDate(tableDates.today)}
                  </div>
                  <div className="tableBorder forRow">
                    {formatDate(tableDates.day1)} (D+1)
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
                  <div className="tableBorderyes">
                    {formatDate(tableDates.today)}
                  </div>
                  <div>{renderReservations(rev1, 1)}</div>
                </div>
                <div className="colWarpper">
                  <div className="tableBorderyes">
                    {formatDate(tableDates.day1)} (D+1)
                  </div>
                  <div>{renderReservations(rev2,2)}</div>
                </div>
                <div className="colWarpper">
                  <div className="tableBorderyes">
                    {formatDate(tableDates.day2)} (D+2)
                  </div>
                  <div>{renderReservations(rev3,3)}</div>
                </div>
                <div className="colWarpper">
                  <div className="tableBorderyesend">
                    {formatDate(tableDates.day3)} (D+3)
                  </div>
                  <div>{renderReservations(rev4,4)}</div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      <SendTalkModal
        TalkClose={TalkClose}
        talkshow={talkshow}
        restId={restId}
      />
      <AccountModal 
        infoshow={infoshow}
        closeInfoModal={closeInfoModal}
        restId={restId}
      />
    </div>
  );
}

export default Reservation;
