import Select from "react-select";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Keywords({restId}) {
  const [allKeywords, setAllKeywords] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await axios.get("http://localhost:8080/keywords");
        const keywords = response.data;
        const formattedKeywords = keywords.map((keyword) => ({
          value: keyword.keywordId,
          label: keyword.keyword,
        }));

        setAllKeywords(formattedKeywords);
      } catch (error) {
        console.error("키워드 가져오기 오류:", error);
      }
    };
    fetchKeywords();
  }, []);

  const handleKeywordChange = (selectedOption) => {
    setSelectedKeyword(selectedOption);
  };

  const handleSearch = () => {
    if (selectedKeyword) {
      console.log("선택된 키워드:", selectedKeyword.value);
      // 검색 로직 추가
    }
  };

  return (
    <div className="keywordWrapper">
      <div className="keyWrapperUpper">
        <div className="Wrppaerforinput keywordWrapperforSelect">
          <div className="accinfo-hintText">키워드 설정</div>
          <Select
            options={allKeywords}
            value={selectedKeyword}
            onChange={handleKeywordChange}
            placeholder="키워드 검색/등록"
            className="select-box-keyword"
            classNamePrefix="react-select"
          />
        </div>
        <button className="accinfo-button-keyword" onClick={handleSearch}>
          키워드 등록
        </button>
      </div>
      <div className="keyword">
        {/* 선택된 키워드를 보여줄 수 있는 부분 */}
        {selectedKeyword && <div>선택된 키워드: {selectedKeyword.label}</div>}
      </div>
    </div>
  );
}

export default Keywords;
