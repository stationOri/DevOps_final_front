import React, { useState, useRef } from 'react';
import Logo from "../../assets/images/oriblue.png";
import "../../css/components/Modal/ReviewModal.css";
import FileReview from "../FileReview";

function ReviewModal({ ReviewClose, reviewshow }) {
  const [nickname, setNickname] = useState("");
  const [rating, setRating] = useState(0); // 별점 상태
  const [hover, setHover] = useState(null); // 호버 상태

  const fileRef = useRef(null); // 하나의 FileReview 컴포넌트만 사용

  const handleEditActivate = () => {
    const files = fileRef.current.getFiles();
    
    console.log(`Review: ${nickname}`);
    console.log(`Rating: ${rating}`);
    console.log(`Files: ${files.length > 0 ? files.map(file => file.name).join(', ') : 'No files selected'}`);

    ReviewClose();
  };

  const handleStarClick = (index) => {
    // 별점 설정 (1단위로)
    const newRating = index + 1;
    setRating(newRating);
    console.log(`Selected Rating: ${newRating}`); // 선택한 별점 로그
  };

  const handleMouseEnter = (index) => {
    // 별점 호버 시 강조
    setHover(index + 1);
  };

  const handleMouseLeave = () => {
    // 호버가 떠나면 현재 별점으로 리셋
    setHover(null);
  };

  return (
    <div
      id={reviewshow ? "signinbackgroundon" : "signinbackgroundoff"}
      onClick={(e) => {
        if (
          e.target.id === "signinbackgroundon" ||
          e.target.id === "signinbackgroundoff"
        ) {
          ReviewClose();
        }
      }}
    >
      <div className={`signinModal ${reviewshow ? "signinshow" : "signinhide"}`}>
        <div className="signinModalHeader">
          <img src={Logo} alt="Logo" className="signinori"/>
          <button className='signinclosebtn' onClick={ReviewClose}>
            X
          </button>
        </div>
        <div className="signinModalContent">
          <div className="signinboldText">리뷰 등록</div>
          <div className="signinhintText">악성 리뷰 작성 시, 블라인드 처리될 수 있습니다.</div>
        </div>
        <div className='starRatingWrapper'>
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              className={`star ${index + 1 <= (hover !== null ? hover : rating) ? 'filled' : ''}`}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              ★
            </span>
          ))}
        </div>
        <div className='inputBoxinNickname'>
          <div className='NicknameHinttest'>리뷰 내용</div>
          <textarea
            type='text'
            className='reviewinputBox'
            placeholder='최대 500자까지 작성 가능합니다.'
            maxLength={500}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className='files'>
          <FileReview ref={fileRef} />
        </div>
        <div className="signinModalButton">
          <button className="signinModalPersonal" onClick={handleEditActivate}>등록</button>
          <button className="signinModalRest" onClick={ReviewClose}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
