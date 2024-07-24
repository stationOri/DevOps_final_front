import React, { useState } from "react";
import "../../css/components/restaurant/AccountInfo.css";
import File from "../File";
import AddressSearch from "./AddressSearch";
import Keywords from "./Keywords";
import TempHoliday from "./TempHoliday";
import RestRun from "./RestRun";
import RevWaitSetting from "./RevWaitSetting";

function AccountInfo({ restId }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [inputAddressValue, setInputAddressValue] = useState("");
  const [inputZipCodeValue, setInputZipCodeValue] = useState("");
  const [inputDetailAddressValue, setInputDetailAddressValue] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const onCompletePost = (data) => {
    setInputAddressValue(data.address);
    setInputZipCodeValue(data.zonecode);
  };

  const handleSubmit = () => {
    console.log({
      imagePreview,
      inputAddressValue,
      inputZipCodeValue,
      inputDetailAddressValue,
      inputPhoneNumber,
      inputDescription,
    });
  };

  return (
    <div className="forAccinfoAlign">
      <div className="AccInfoTotalWrapper">
        <div className="Accinfo-header">
          <div className="accinfo-bold">나의 식당 수정하기</div>
          <div className="accinfo-hint">
            식당 상세 정보를 입력해주시길 바랍니다.
          </div>
        </div>
        <div className="accinfo-contents">
          <div className="rest-running">
            <div className="accinfo-bigtext">점포 운영</div>
            <div className="Wrppaerforplaintext">
              <div className="accinfo-hintText">가게명</div>
              <div className="accinfo-restname">
                가게명이 들어갈 자리입니다.
              </div>
            </div>
            <div className="WrapperforFile">
              <div
                className={`ForImgBackground ${!imagePreview ? "hidden" : ""}`}
                style={{ backgroundImage: `url(${imagePreview})` }}
              ></div>
              <div className="accinfo-hintText">대표사진</div>
              <div className="accinfo-file-wrapper">
                <File onFileChange={handleFileChange} />
              </div>
            </div>
            <div className="Wrppaerforinput">
              <div className="accinfo-hintText">소개글</div>
              <textarea
                type="text"
                placeholder="내 가게 소개하기"
                className="accinfo-plain-textarea"
                value={inputDescription}
                onChange={(e) => setInputDescription(e.target.value)}
              />
            </div>
            <div className="addressWrapper">
              <div className="Wrppaerforinput">
                <div className="accinfo-hintText">우편번호</div>
                <div className="addressWrapperinner">
                  <input
                    type="text"
                    value={inputZipCodeValue}
                    placeholder="우편번호"
                    readOnly
                    className="postnuminput"
                  />
                  <AddressSearch onCompletePost={onCompletePost} />
                </div>
              </div>
              <div className="addressdetailWrapper">
                <div className="Wrppaerforinput-address">
                  <div className="accinfo-hintText">가게주소</div>
                  <input
                    type="text"
                    value={inputAddressValue}
                    placeholder="주소"
                    readOnly
                    className="input-address-box"
                  />
                </div>
                <div className="Wrppaerforinput-address">
                  <div className="accinfo-hintText">상세주소</div>
                  <input
                    type="text"
                    placeholder="생략가능"
                    className="input-address-box"
                    value={inputDetailAddressValue}
                    onChange={(e) => setInputDetailAddressValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="Wrppaerforinput">
              <div className="accinfo-hintText">매장 전화번호</div>
              <input
                type="text"
                placeholder="'-'제외"
                className="accinfo-plain-input"
                value={inputPhoneNumber}
                onChange={(e) => setInputPhoneNumber(e.target.value)}
              />
            </div>
            <div className="editCompleteBtnWrapper">
              <button className="ediCompleteBrn" onClick={handleSubmit}>
                {" "}
                수정 완료
              </button>
            </div>
            <hr className="revdivider" />
            <Keywords restId={restId} />
          </div>
          <hr className="revdivider" />
          <RestRun restId={restId} />
          <hr className="revdivider" />
          <TempHoliday restId={restId} />
          <hr className="revdivider" />
          <RevWaitSetting restId={restId} />
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
