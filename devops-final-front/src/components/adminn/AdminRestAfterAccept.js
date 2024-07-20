import React, { useState, useEffect } from "react";
import "../../css/components/adminn/AdminRestAfterAccept.css";
import Pagination from "../Pagination";
import RestInfoModal from "../Modal/RestInfoModal";
import Search from "../../assets/images/sidebar/search.png";
import Loading from "../Loading"; // Ensure this path is correct based on your project structure

function AdminRestAfterAccept() {
  const [readyRest, setReadyRest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRest, setSelectedRest] = useState(null); // 선택된 매장 정보
  const [infoshow, setInfoShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const itemsPerPage = 20;

  const getRestData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/restaurants/afterAccept`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      console.log("Fetched data:", json);
      setReadyRest(json || []);
      setFilteredItems(json || []);
    } catch (error) {
      console.error("Error fetching data:", error);
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
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const openInfoModal = (rest) => {
    setSelectedRest(rest);
    setInfoShow(true);
  };

  const closeInfoModal = () => {
    setInfoShow(false);
  };

  useEffect(() => {
    const filtered = readyRest.filter((item) =>
      item.rest_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, readyRest]);

  const leftColumnItems = currentItems.filter((_, index) => index % 2 === 0);
  const rightColumnItems = currentItems.filter((_, index) => index % 2 !== 0);

  return (
    <div className="restacceptrootWrapper">
      {loading ? (
        <Loading />  // 로딩 인디케이터
      ) : (
        <>
          <div className="restAcceptexWrapper">
            <div className="headerfortext">
              <div className="restacceptTitle">승인 완료 매장 목록</div>
              <p className="restacceptP">가게 이름 클릭 시 가게 정보 표시</p>
            </div>
            <div className="headerforsearch">
              <img src={Search} alt="" className="searchimginrestsearch" />
              <input
                type="text"
                className="restsearchinput"
                placeholder="매장명 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <hr />
          <div className="restafteracceptTableWrapper">
            <div className="restacceptColumn">
              {leftColumnItems.map((rest) => (
                <div className="restafteracceptRowWrapper" key={rest.rest_id}>
                  <div className="restaccept">{rest.rest_name}</div>
                  <button
                    className="restafteracceptbutton"
                    onClick={() => openInfoModal(rest)}
                  >
                    매장 확인
                  </button>
                </div>
              ))}
            </div>
            <div className="restacceptColumn">
              {rightColumnItems.map((rest) => (
                <div className="restafteracceptRowWrapper" key={rest.rest_id}>
                  <div className="restaccept">{rest.rest_name}</div>
                  <button
                    className="restafteracceptbutton"
                    onClick={() => openInfoModal(rest)}
                  >
                    매장 확인
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Pagination
            totalItems={filteredItems.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {infoshow && selectedRest && (
        <RestInfoModal
          InfoClose={closeInfoModal}
          infoshow={infoshow}
          rest_id={selectedRest.rest_id}
          rest_name={selectedRest.rest_name}
          rest_num={selectedRest.rest_num}
          rest_owner={selectedRest.rest_owner}
          rest_phone={selectedRest.rest_phone}
          rest_data={selectedRest.rest_data}
          join_date={selectedRest.join_date}
          quit_date={selectedRest.quit_date}
          is_blocked={selectedRest.is_blocked}
          rest_isopen={selectedRest.rest_isopen}
          rest_status={selectedRest.rest_status}
        />
      )}
    </div>
  );
}

export default AdminRestAfterAccept;
