import React, { useState, useEffect } from "react";
import Now from "../../assets/images/Restaurant/now.png";

function Today({rev}) {
  const [todayinfo, setTodayInfo] = useState([]);
  const [todaynum, setTodayNum] = useState(0);

  useEffect(() => {
    getToday();
  }, []);

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

  return (
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
  );
}

export default Today;