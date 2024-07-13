import "../../css/components/adminn/AdminRestAccept.css";
import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";  // 페이지네이션 컴포넌트 임포트

function AdminRestAccept() {
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
        <div className="restacceptTitle">승인 대기 매장 목록</div>
        <p className="restacceptP">가게 이름 클릭 시 가게 등록 정보 표시</p>
      </div>
      <hr />
      <div className="restacceptTableWrapper">
        {currentItems.map((rest) => (
          <div className="restacceptRowWrapper" key={rest.id}>
            <div className="restaccept">{rest.rest_name}</div>
            <button className="restacceptbutton" rest_id={rest.id}>승인</button>
          </div>
        ))}
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

export default AdminRestAccept;
