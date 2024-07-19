import React from 'react';
import { useInputModal } from "./InputModalContext";
import "../../css/components/Modal/InputModal.css";

function InputModal() {
  const { modalState, closeInputModal } = useInputModal();
  const { show, header, review_id, user_id, rest_id } = modalState;

  const handleReport = () => {
    closeInputModal();
  };

  return (
    <div>
      <div
        id={show ? "checkbackgroundon" : "checkbackgroundoff"}
        onClick={(e) => {
          if (
            e.target.id === "checkbackgroundon" ||
            e.target.id === "checkbackgroundoff"
          ) {
            closeInputModal();
          }
        }}
      >
        <div className={`InputModal ${show ? "checkshow" : "checkhide"}`}>
          <div className="checkModalContent">
            <div className="InputboldText">{header}</div>
            <div className="InputhintText">신고 내용을 자세하게 작성해주세요.</div>
            <div className='InputModalWrapper'>
              <div className='inputhinttext'>신고내용</div>
              <input type='text' placeholder='최대 200자 까지 작성 가능합니다.' className='reportinput'/>
            </div>
            <div className='inputmodalbuttonWrapper'>
              <button className="InputModalreport" onClick={handleReport}>신고</button>
              <button className='InputModalCancel' onClick={closeInputModal}>취소</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputModal;
