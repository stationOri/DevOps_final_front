import React, { useState, useEffect } from "react";
import DepositPho from "../../assets/images/Restaurant/deposit.png";
import AccountModal from "../Modal/AccountModal";

function Deposit({ restId }) {
  const [infoshow, setInfoShow] = useState(false);
  const [deposit, setDeposit] = useState(0);

  const getToday = async (restId, selectedDate) => {
    try {
      const response = await fetch(
        `http://localhost:8080/reservations/rest/${restId}/time/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      console.log(response);
      // const json = await response.json();
    } catch (error) {
      console.error("Error fetching today's reservations:", error);
    }
  };

  const openInfoModal = () => {
    setInfoShow(true);
  };

  const closeInfoModal = () => {
    setInfoShow(false);
  };

  return (
    <div className="upperboxleft">
      <div className="rest-text">
        <img src={DepositPho} alt="" className="rest-text-logo" />
        <p className="rest-bold-text">Deposit</p>
      </div>
      <div className="rest-content-boxwai">
        <div>
          이번 달 <span className="spanfornoshow">노쇼</span> 예약금 총액
        </div>
        <div>
          <span className="spanformoney">{deposit}</span> 원
        </div>
        <div
          className="accountbox"
          style={{ cursor: "pointer" }}
          onClick={openInfoModal}
        >
          환불계좌 수정하기
        </div>
      </div>
      <AccountModal
        infoshow={infoshow}
        closeInfoModal={closeInfoModal}
        restId={restId}
      />
    </div>
  );
}

export default Deposit;
