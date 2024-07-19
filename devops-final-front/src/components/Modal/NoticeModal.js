import React, { useState, useEffect, useRef } from "react";
import { useNoticeModal } from "./NoticeModalContext";
import "../../css/components/Modal/InputModal.css";

function NoticeModal() {
  const { modalState, closeNoticeModal } = useNoticeModal();
  const { show, contents } = modalState;

  const [NoticeInput, setNoticeInput] = useState("");

  const handleNoticeEdit = async () => {
    const content = document.querySelector(".reportinput").value;
    putnotice(content);
    closeNoticeModal();
  };

  useEffect(() => {
    setNoticeInput(contents);
  }, [contents]);

  const handleNoticeChange = (e) => {
    setNoticeInput(e.target.value);
  };

  const putnotice = async (rest_id, content) => {
    const reportData = {
      content,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/restaurants/info/${rest_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reportData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to post restaurant report");
      }
      console.log("Restaurant report submitted successfully");
    } catch (error) {
      console.error("Error posting restaurant report:", error);
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
            closeNoticeModal();
          }
        }}
      >
        <div className={`InputModal ${show ? "checkshow" : "checkhide"}`}>
          <div className="checkModalContent">
            <div className="InputboldText">공지사항 수정</div>
            <div className="InputhintText">
              가게 정보에 노출될 공지사항 설정
            </div>
            <div className="InputModalWrapper">
              <div className="inputhinttext">전달내용</div>
              <input
                type="text"
                placeholder="최대 100자 까지 작성 가능합니다."
                maxLength={100}
                value={NoticeInput}
                onChange={handleNoticeChange}
                className="reportinput"
              />
            </div>
            <div className="inputmodalbuttonWrapper">
              <button className="InputModalreport" onClick={handleNoticeEdit}>
                등록
              </button>
              <button className="InputModalCancel" onClick={closeNoticeModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticeModal;
