import React, { useCallback, useRef, useState } from 'react';
import Human from "../../assets/images/Restaurant/human.png";
import Table from "../../assets/images/Restaurant/table.png";
import RevAcceptModal from '../Modal/RevAcceptModal';
import RestCancelModal from '../Modal/RestCancelModal';

function DetailedReservation({ reservations, row, restId }) {
  const [restcancelshow, setRestCancelShow] = useState(false);
  const [revacceptshow, setRevAcceptShow] = useState(false);
  const [revdetailshow, setRevDetailShow] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const RevAcceptShow = (reservation) => {
    setSelectedReservation(reservation);
    setRevAcceptShow(true);
  };

  const RevAcceptClose = () => {
    setRevAcceptShow(false);
    setSelectedReservation(null);
  };

  const RevDetailShow = () => setRevDetailShow(true);
  const RevDetailClose = () => setRevDetailShow(false);

  const RestCancelShow = () => setRestCancelShow(true);
  const RestCancelClose = () => setRestCancelShow(false);

  const previousTimeRef = useRef(null);

  const getButtonText = useCallback((status, resId, reservation) => {
    switch (status) {
      case "RESERVATION_READY":
        return (
          <button onClick={() => RevAcceptShow(reservation)} className="btninRestRev">
            승인
          </button>
        );
      case "RESERVATION_ACCEPTED":
        return (
          <button onClick={() => RevDetailShow()} className="btninRestRev">
            확인
          </button>
        );
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
  }, []);

  return (
    <>
      {reservations.map((rev, index) => {
        const date = new Date(rev.res_datetime);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const currentTime = `${formattedHours}:${formattedMinutes} ${period}`;
        const isNewLine = previousTimeRef.current !== currentTime;
        const timeDisplay = isNewLine ? (
          <>
            <div>
              {formattedHours}:{formattedMinutes}
            </div>
            <div style={{ fontSize: "13px" }}>{period}</div>
          </>
        ) : null;

        previousTimeRef.current = currentTime;

        let rowClass = "";
        switch (row) {
          case 1:
            rowClass = "firstElement";
            break;
          case 2:
            rowClass = "secondElement";
            break;
          case 3:
            rowClass = "thirdElement";
            break;
          case 4:
            rowClass = "fourthElement";
            break;
          default:
            rowClass = "";
        }

        return (
          <div
            className={`reservationBox ${rowClass} ${isNewLine ? "newLine" : "notNewLine"} ${index === reservations.length - 1 ? "lastElement" : ""}`}
            key={rev.res_id}
          >
            <div className="timebox">{timeDisplay}</div>
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
                {getButtonText(rev.status, rev.res_id, rev)}
              </div>
            </div>
            {revacceptshow && selectedReservation && (
              <RevAcceptModal 
                RevAcceptClose={RevAcceptClose}
                revacceptshow={revacceptshow}
                reservation={selectedReservation}
                RestCancelShow={RestCancelShow}
              />
            )}
            {restcancelshow && (
              <RestCancelModal 
                RestCancelClose={RestCancelClose} 
                restcancelshow={restcancelshow} 
              />
            )}
          </div>
        );
      })}
    </>
  );
}

export default DetailedReservation;
