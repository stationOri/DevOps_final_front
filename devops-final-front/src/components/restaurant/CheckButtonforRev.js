import CancelModal from "../Modal/CancelModal";
import { useCancelModal } from "../Modal/CancelModalContext";
import React, { useState, useEffect } from "react";

function CheckButtonforRev({text}) {
  const { openCancelModal } = useCancelModal();
  const [restId, setRestId] = useState(2);
  const handelCancelRev = () => {
    openCancelModal('예약', restId);
  };

  const handelChangeStatus = () => {
    openCancelModal('상태', restId);
  };

  return(
    <>
    <button onClick={text==="승인" ? handelCancelRev:handelChangeStatus} className="btninRestRev">{text}</button>
    <CancelModal />
    </>
  );
}

export default CheckButtonforRev;