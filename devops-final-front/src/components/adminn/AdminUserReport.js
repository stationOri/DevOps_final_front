import "../../css/components/adminn/AdminRestReservation.css";
import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";
import Search from "../../assets/images/sidebar/search.png";
import ReportAcceptModal from "../Modal/ReportAcceptModal";

function AdminUserReport() {
  const [readyRest, setReadyRest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [reportacceptshow, setReportAcceptShow] = useState(false);
  const [statusFilters, setStatusFilters] = useState({
    처리대기: true,
    승인: false,
    반려: false,
  });
  const [selectedReservation, setSelectedReservation] = useState(null);

  const ReportAcceptClose = () => setReportAcceptShow(false);
  const ReportAcceptShow = () => setReportAcceptShow(true);

  const getRestData = async () => {
    try {
      const response = await fetch("http://localhost:4000/userreport");
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      console.log("Fetched data:", json);
      setReadyRest(json || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRestData();
  }, []);

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
    setCurrentPage(1);
  };

  const filterItems = () => {
    let filtered = readyRest;

    filtered = filtered.filter((item) => {
      if (
        (statusFilters.처리대기 && item.report_status === "처리대기") ||
        (statusFilters.승인 && item.report_status === "승인") ||
        (statusFilters.반려 && item.report_status === "반려")
      ) {
        return true;
      }
      return false;
    });

    filtered = filtered.filter((item) =>
      item.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredItems(filtered);
    setCurrentPage(1); 
  };

  const fillEmptyItems = (array, itemsPerPage) => {
    const filledArray = [...array];
    const remainder = filledArray.length % itemsPerPage;
    if (remainder !== 0) {
      const itemsToAdd = itemsPerPage - remainder;
      for (let i = 0; i < itemsToAdd; i++) {
        filledArray.push({
          user_report_id: filledArray.length + 1,
          user_name: "이름없음",
          report_date: "",
          review_content: "",
          report_content: "",
          reporter_id: "",
          report_status: "빈열",
          admin_id: null
        });
      }
    }
    return filledArray;
  };

  const handleReservationClick = (reservation) => {
    setSelectedReservation(reservation);
    ReportAcceptShow();
  };

  const filledItems = fillEmptyItems(filteredItems, itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filledItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="restacceptrootWrapper">
      <div className="restAcceptbfWrapper">
        <div className="resfirstrowWrapper">
          <div className="headerfortext">
            <div className="restacceptTitle">리뷰 신고 목록</div>
            <p className="restacceptP">
              점주의 악성 리뷰 신고 목록입니다. 신고 내용을 누르면 전체 내용이
              보여집니다.
            </p>
          </div>
        </div>
        <div className="ressecondrowWRapper">
          <div className="rescheckboxWrapper">
            <div>처리 상태 :</div>
            <label>
              <input
                type="checkbox"
                name="status"
                value="처리대기"
                checked={statusFilters.처리대기}
                onChange={handleStatusChange}
              />
              처리대기
            </label>
            <label>
              <input
                type="checkbox"
                name="status"
                value="승인"
                checked={statusFilters.승인}
                onChange={handleStatusChange}
              />
              승인
            </label>
            <label>
              <input
                type="checkbox"
                name="status"
                value="반려"
                checked={statusFilters.반려}
                onChange={handleStatusChange}
              />
              반려
            </label>
          </div>
          <div className="headerforsearch">
            <img src={Search} alt="" className="searchimginrestsearch" />
            <input
              type="text"
              className="restsearchinput"
              placeholder="사용자 이름 검색"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <hr />
      {!loading ? (
        <div className="restResTableWrapper">
          <div className="restresTableWrapper">
            <table className="tableforadminres">
              <thead>
                <tr className="cnforbgc">
                  <th scope="col">사용자 이름(신고 날짜)</th>
                  <th scope="col">리뷰 내용</th>
                  <th scope="col">신고 내용</th>
                  <th scope="col">신고자 ID</th>
                  <th scope="col">처리</th>
                  <th scope="col">관리자 ID</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, index) => (
                  <tr key={index}>
                        { user.report_status === "빈열" ?
                        <td></td> : 
                        <td>{user.user_name} ({user.report_date})</td>}
                    <td>{user.review_content}</td>
                    <td>{user.report_content}</td>
                    <td>{user.reporter_id}</td>
                      {user.report_status !== "빈열" ? 
                        <td>
                        <p>{user.report_status}</p>
                        <button
                          className="adminrescancel"
                          onClick={() => handleReservationClick(user)}
                        >
                          신고 상태 변경
                        </button>
                        </td> : <td></td>
                      }
                    <td>{user.admin_id || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Pagination
        totalItems={filteredItems.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <ReportAcceptModal 
        reportacceptshow={reportacceptshow}
        ReportAcceptClose={ReportAcceptClose}
      />
    </div>
  );
}

export default AdminUserReport;
