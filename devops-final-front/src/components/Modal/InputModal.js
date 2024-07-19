import React from 'react';
import { useInputModal } from "./InputModalContext";
import "../../css/components/Modal/InputModal.css";

function InputModal() {
  const { modalState, closeInputModal } = useInputModal();
  const { show, header, review_id, user_id, rest_id } = modalState;

  const handleReport = async () => {
    const content = document.querySelector('.reportinput').value;
    if (header === "식당 신고") await postRestReport(rest_id, user_id, content);
    if (header === "리뷰 신고") await postUserReport(review_id, content);
    closeInputModal();
  };

  const postRestReport = async (rest_id, user_id, content) => {
    const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 (YYYY-MM-DD 형식)
    const reportData = {
      rest_id,
      user_id,
      report_date: today,
      content
    };
  
    try {
      const response = await fetch('http://localhost:8080/restreport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reportData)
      });
      if (!response.ok) {
        throw new Error('Failed to post restaurant report');
      }
      console.log('Restaurant report submitted successfully');
    } catch (error) {
      console.error('Error posting restaurant report:', error);
    }
  };
  
  const postUserReport = async (review_id, content) => {
    const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 (YYYY-MM-DD 형식)
    const reportData = {
      review_id,
      report_date: today,
      content
    };
  
    try {
      const response = await fetch('http://localhost:8080/userreport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reportData)
      });
      if (!response.ok) {
        throw new Error('Failed to post user report');
      }
      console.log('User report submitted successfully');
    } catch (error) {
      console.error('Error posting user report:', error);
    }
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
