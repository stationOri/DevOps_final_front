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

  const getRestData = async () => {
    try {
      const response = await fetch("http://localhost:4000/reservation");
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

  useEffect(() => {
    const filtered = readyRest.filter((item) =>
      item.rest_id.toString().includes(searchTerm)
    );
    setFilteredItems(filtered);
  }, [searchTerm, readyRest]);

  // 함수: 빈 데이터로 10의 배수 채우기
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
          <div className="headerforsearch">
            <img src={Search} alt="" className="searchimginrestsearch" />
            <input
              type="text"
              className="restsearchinput"
              placeholder="매장 ID 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <hr />
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((rest) => (
                <tr key={rest.id}>
                  {rest.status !== "빈열" ? <td>{rest.id}</td> : <td></td>}
                  <td>{rest.rest_name ? `${rest.rest_name} (${rest.rest_id})` : ""}</td>
                  <td>{rest.user_id}</td>
                  <td>{rest.res_num}</td>
                  <td>{rest.res_datetime}</td>
                  <td>{rest.req_datetime}</td>
                  {rest.status !== "빈열" ? <td>{rest.status}</td> : <td></td>}
                  <td className="cnforbgc">
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
      <Pagination
        totalItems={filledItems.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AdminRestReservation;
