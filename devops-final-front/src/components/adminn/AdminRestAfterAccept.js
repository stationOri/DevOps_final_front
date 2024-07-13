import "../../css/components/adminn/AdminRestAfterAccept.css";
import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";  // 페이지네이션 컴포넌트 임포트

function AdminRestAfterAccept() {
  const [readyRest, setReadyRest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const getRestData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/readyaccept`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      console.log('Fetched data:', json);
      setReadyRest(json || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRestData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = readyRest.slice(indexOfFirstItem, indexOfLastItem);

  const leftColumnItems = currentItems.filter((_, index) => index % 2 === 0);
  const rightColumnItems = currentItems.filter((_, index) => index % 2 !== 0);

  return (
    <div className="restacceptrootWrapper">
      <div className="restAcceptexWrapper">
        <div className="restacceptTitle">승인 완료 매장 목록</div>
        <p className="restacceptP">가게 이름 클릭 시 가게 정보 표시</p>
      </div>
      <hr />
      <div className="restafteracceptTableWrapper">
        <div className="restacceptColumn">
          {leftColumnItems.map((rest) => (
            <div className="restafteracceptRowWrapper" key={rest.id}>
              <div className="restaccept">{rest.rest_name}</div>
              <button className="restafteracceptbutton" rest_id={rest.id}>매장 확인</button>
            </div>
          ))}
        </div>
        <div className="restacceptColumn">
          {rightColumnItems.map((rest) => (
            <div className="restafteracceptRowWrapper" key={rest.id}>
              <div className="restaccept">{rest.rest_name}</div>
              <button className="restafteracceptbutton" rest_id={rest.id}>매장 확인</button>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        totalItems={readyRest.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AdminRestAfterAccept;
