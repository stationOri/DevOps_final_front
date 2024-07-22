import React, { useState } from 'react';
import { useInputModal } from "./InputModalContext";
import "../../css/components/Modal/InputModal.css";

function InputModal() {
  const { modalState, closeInputModal } = useInputModal();
  const { show, header, reviewId, user_id, rest_id } = modalState;
  const [reportContent, setReportContent] = useState("");

  const handleReport = () => {
    if (header === "식당 신고") postRestReport();
    if (header === "리뷰 신고") postUserReport(reviewId, reportContent);
    closeInputModal();
  };

  const postRestReport = async (rest_id, user_id, content) => {
    const today = new Date().toISOString().split("T")[0]; // 오늘 날짜 (YYYY-MM-DD 형식)
    const reportData = {
      rest_id,
      user_id,
      report_date: today,
      content,
    };

    try {
      const response = await fetch("http://localhost:8080/restreport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });
      if (!response.ok) {
        throw new Error("Failed to post restaurant report");
      }
      console.log("Restaurant report submitted successfully");
    } catch (error) {
      console.error("Error posting restaurant report:", error);
    }
  };

  const postUserReport = async (reviewId, content) => {
    const today = new Date().toISOString().split("T")[0];
    const reportData = {
      reviewId: reviewId,
      reportDate: today,
      reportContent: content,
    };

    console.log("Posting user report with data:", reportData); // 데이터 확인

    try {
      const response = await fetch("http://localhost:8080/userreport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });
      if (!response.ok) {
        console.log("Response status:", response.status); // 응답 상태 코드 확인
        throw new Error("Failed to post user report");
      }
      console.log("User report submitted successfully");
    } catch (error) {
      console.error("Error posting user report:", error);
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
            <div className="InputhintText">
              신고 내용을 자세하게 작성해주세요.
            </div>
            <div className="InputModalWrapper">
              <div className="inputhinttext">신고내용</div>
              <textarea
                type="text"
                placeholder="최대 200자 까지 작성 가능합니다."
                maxLength={200}
                className="reportinput"
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
              />
            </div>
            <div className="inputmodalbuttonWrapper">
              <button className="InputModalreport" onClick={handleReport}>
                신고
              </button>
              <button className="InputModalCancel" onClick={closeInputModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputModal;
