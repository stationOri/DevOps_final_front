import React, { useState, useEffect } from "react";
import DepositPho from "../../assets/images/Restaurant/deposit.png";
import AccountModal from "../Modal/AccountModal";

function Deposit() {
  const [restId, setRestId] = useState(2);
  const [infoshow, setInfoShow] = useState(false);

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
                  이번 달 <span className="spanfornoshow">노쇼</span> 예약금
                  총액
                </div>
                <div>
                  <span className="spanformoney">500,000</span> 원
                </div>
                <div className="accountbox" style={{cursor:"pointer"}}onClick={openInfoModal}>환불계좌 수정하기</div>
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