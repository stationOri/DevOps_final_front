import "../../css/components/adminn/AdminRestReservation.css";
import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";  // 페이지네이션 컴포넌트 임포트

function AdminRestAfterAccept() {
  const [readyRest, setReadyRest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  return (
    <div className="restacceptrootWrapper">
      <div className="restAcceptexWrapper">
        <div className="restacceptTitle">예약 목록</div>
        <p className="restacceptP">예약의 전체 목록이 보여집니다.</p>
      </div>
      <hr />
      <div className="restafteracceptTableWrapper">
      <div className="restacceptTableWrapper">
        {currentItems.map((rest) => (
          <div className="restacceptRowWrapper" key={rest.id}>
            <div className="restaccept">{rest.rest_name}</div>
            <button className="restacceptbutton" rest_id={rest.id}>승인</button>
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
