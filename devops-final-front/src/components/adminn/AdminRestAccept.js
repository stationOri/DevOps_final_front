import "../../css/components/adminn/AdminRestAccept.css";
import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";  // 페이지네이션 컴포넌트 임포트
import RestAcceptModal from "../Modal/RestAcceptModal";
import Loading from "../Loading";

function AdminRestAccept() {
  const [readyRest, setReadyRest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [acceptshow, setAcceptShow] = useState(false);
  const itemsPerPage = 10;
  const [selectedRest, setSelectedRest] = useState(null);

  const AcceptClose = () => setAcceptShow(false);
  const AcceptShow = (rest) => {
    setSelectedRest(rest);
    setAcceptShow(true);
  };

  const getRestData = async () => {
    try {
      const response = await fetch('http://localhost:8080/restaurants/beforeAccept');
      // const response = await fetch('http://localhost:4000/beforeAccept')
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

  const handleUpdateStatus = (id, newStatus) => {
    console.log('Updating status for ID:', id, 'to:', newStatus);
    const updatedRests = readyRest.map(rest =>
      rest.restId === id ? { ...rest, status: newStatus } : rest
    );
    setReadyRest(updatedRests);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = readyRest.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="restacceptrootWrapper">
      {loading ? (
        <Loading/>
      ) : (
        <>
          <div className="restAcceptbfWrapper">
            <div className="restacceptTitle">승인 대기 매장 목록</div>
            <p className="restacceptP">가게 이름 클릭 시 가게 등록 정보 표시</p>
          </div>
          <hr />
          <div className="restacceptTableWrapper">
            {currentItems.length === 0 ?
            <div style={{
              width:"100%",
              textAlign:"center",
              marginTop:"200px"
            }}>
              승인을 대기중인 매장이 없습니다.
            </div> :
            <>
            {currentItems.map((rest) => (
              <div className="restacceptRowWrapper" key={rest.restId}>
                <div className="restaccept">{rest.rest_name}</div>
                <button className="restacceptbutton" rest_id={rest.restId} onClick={() => AcceptShow(rest)}>승인</button>
              </div>
            ))}
            </>
          }
          </div>
          <Pagination
            totalItems={readyRest.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {selectedRest && (
        <RestAcceptModal
          acceptshow={acceptshow}
          AcceptClose={AcceptClose}
          rest_id={selectedRest.restId}
          rest_name={selectedRest.rest_name}
          rest_num={selectedRest.rest_num}
          rest_owner={selectedRest.rest_owner}
          rest_phone={selectedRest.rest_phone}
          rest_data={selectedRest.rest_data}
          join_date={selectedRest.join_date}
          onUpdateStatus={handleUpdateStatus}
          reloadData={getRestData} // 새로운 함수 전달
        />
      )}
    </div>
  );
}

export default AdminRestAccept;
