import "../../css/components/adminn/AdminRestReservation.css";
import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";
import Search from "../../assets/images/sidebar/search.png";

function AdminRestReservation() {
  const [readyRest, setReadyRest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [statusFilters, setStatusFilters] = useState({
    예약대기: true,
    예약취소: true,
    예약승인: true,
    방문완료: true,
  });

  // 데이터 불러오기
  const getRestData = async () => {
    try {
      const response = await fetch("http://localhost:4000/reservation");
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      console.log("Fetched data:", json);
      setReadyRest(json || []);
      setFilteredItems([]); // 새로운 데이터를 가져오기 전에 기존 필터링 결과 초기화
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    getRestData();
  }, []);

  // 필터링 함수
  useEffect(() => {
    filterItems();
  }, [searchTerm, statusFilters, readyRest]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilters({
      ...statusFilters,
      [e.target.value]: e.target.checked,
    });
  };

  const filterItems = () => {
    let filtered = readyRest;

    // 상태 필터링
    filtered = filtered.filter((item) => {
      if (
        (statusFilters.예약대기 && item.status === "예약대기") ||
        (statusFilters.예약취소 && item.status === "예약취소") ||
        (statusFilters.예약승인 && item.status === "예약승인") ||
        (statusFilters.방문완료 && item.status === "방문완료")
      ) {
        return true;
      }
      return false;
    });

    // 검색어 필터링
    filtered = filtered.filter((item) =>
      item.rest_id.toString().includes(searchTerm)
    );

    setFilteredItems(filtered);
  };

  // 빈 항목 채우기
  const fillEmptyItems = (array, itemsPerPage) => {
    const filledArray = [...array];
    const remainder = filledArray.length % itemsPerPage;
    if (remainder !== 0) {
      const itemsToAdd = itemsPerPage - remainder;
      for (let i = 0; i < itemsToAdd; i++) {
        filledArray.push({
          id: filledArray.length + 1,
          rest_name: "",
          rest_id: "",
          user_id: "",
          res_num: "",
          res_datetime: "",
          req_datetime: "",
          status: "빈열",
        });
      }
    }
    return filledArray;
  };

  // 필터된 데이터를 페이징하여 현재 페이지에 맞는 데이터 가져오기
  const filledItems = fillEmptyItems(filteredItems, itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filledItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="restacceptrootWrapper">
      <div className="restAcceptbfWrapper">
        <div className="restAcceptexWrapper">
          <div className="headerfortext">
            <div className="restacceptTitle">예약 목록</div>
            <p className="restacceptP">예약의 전체 목록이 보여집니다.</p>
          </div>
        </div>
        <div className="ressecondrowWRapper">
        <div className="rescheckboxWrapper">
          <div>예약 상태 : </div>
            <label>
              <input
                type="checkbox"
                name="status"
                value="예약대기"
                checked={statusFilters.예약대기}
                onChange={handleStatusChange}
              />
              예약대기
            </label>
            <label>
              <input
                type="checkbox"
                name="status"
                value="예약취소"
                checked={statusFilters.예약취소}
                onChange={handleStatusChange}
              />
              예약취소
            </label>
            <label>
              <input
                type="checkbox"
                name="status"
                value="예약승인"
                checked={statusFilters.예약승인}
                onChange={handleStatusChange}
              />
              예약승인
            </label>
            <label>
              <input
                type="checkbox"
                name="status"
                value="방문완료"
                checked={statusFilters.방문완료}
                onChange={handleStatusChange}
              />
              방문완료
            </label>
          </div>
          <div className="headerforsearch">
            <img src={Search} alt="" className="searchimginrestsearch" />
            <input
              type="text"
              className="restsearchinput"
              placeholder="매장 ID 검색"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          </div>
      </div>
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="restResTableWrapper">
          <div className="restresTableWrapper">
            <table className="tableforadminres">
              <thead>
                <tr className="cnforbgc">
                  <th scope="col">예약 ID</th>
                  <th scope="col">매장명(매장 ID)</th>
                  <th scope="col">사용자 ID</th>
                  <th scope="col">인원 수</th>
                  <th>예약 날짜</th>
                  <th>신청 날짜</th>
                  <th>예약 상태</th>
                  <th style={{ width: "65px" }}></th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((rest, index) => (
                  <tr key={index}>
                    {rest.status !== "빈열" ? <td>{rest.id}</td> : <td></td>}
                    <td>{rest.rest_name ? `${rest.rest_name} (${rest.rest_id})` : ""}</td>
                    <td>{rest.user_id}</td>
                    <td>{rest.res_num}</td>
                    <td>{rest.res_datetime}</td>
                    <td>{rest.req_datetime}</td>
                    {rest.status !== "빈열" ? <td>{rest.status}</td> : <td></td>}
                    <td className="cnforbgc" style={{ width: "65px" }}>
                      {rest.status === '예약승인' && (
                        <button className="adminrescancel">예약취소</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Pagination
        totalItems={filteredItems.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AdminRestReservation;
