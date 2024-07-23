import React, { useState } from 'react';
import { useCancelModal } from "./CancelModalContext";
import "../../css/components/Modal/CheckModal.css";
import "../../css/components/Modal/CancelModal.css";

function CancelModal() {
  const { modalState, closeCancelModal } = useCancelModal();
  const { show, header, restId } = modalState;
  const [title, setTitle] = useState("");
  const [explain, setExplain] = useState("");
  const [btn1, setBtn1] = useState("");
  const [btn2, setBtn2] = useState("");

  const handleCancel= () => (
    closeCancelModal()
  );

  if (header === "예약") {
    setTitle("예약을 취소하시겠습니까?");
    setExplain("예약금은 취소 일시게 관계 없이 사용자에게 전액 환불 처리 됩니다.");
    setBtn1("내부 사정");
    setBtn2("메뉴 주문 불가");
  }

  if (header === "상태") {
    setTitle("예약 상태 변경");
    setExplain("변경 후 다시 변경할 수 없으니 싡ㅇ히 선택해주세요.");
    setBtn1("방문");
    setBtn2("노쇼");
  }

  return (
    <div>
      <div
        id={show ? "checkbackgroundon" : "checkbackgroundoff"}
        onClick={(e) => {
          if (
            e.target.id === "checkbackgroundon" ||
            e.target.id === "checkbackgroundoff"
          ) {
            closeCancelModal();
          }
        }}
      >
        <div className={`checkModal ${show ? "checkshow" : "checkhide"}`}>
          <div className="checkModalContent">
            <div className="checkboldText">{title}</div>
            <hr className="checkmodalline"></hr>
            <div className="checkhintText">{explain}</div>
            <div className='cancelmodalReasonWrapper'>
              <button className='cancelmodalReasonBtn'>{btn1}</button>
              <button className='cancelmodalReasonBtn'>{btn2}</button>
            </div>
            <div className='cancelModalButtonWrapper'>
            <button className="checkModalBtn" onClick={handleCancel}>네</button>
            <button className="checkModalBtn" onClick={closeCancelModal}>아니요</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelModal;
