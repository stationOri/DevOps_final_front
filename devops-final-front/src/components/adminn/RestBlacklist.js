import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";
import Search from "../../assets/images/sidebar/search.png";
import "../../css/components/adminn/RestBlacklist.css";

function RestBlacklist() {
  const [readyRest, setReadyRest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [statusFilters, setStatusFilters] = useState({
    정지중: true,
    일회경고완료: true,
    탈퇴완료: true,
    정지대기: true,
  });

  const getRestData = async () => {
    try {
      const response = await fetch("http://localhost:4000/restblacklist");
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
      return (
        (statusFilters.정지중 && item.black_status === "정지중") ||
        (statusFilters.일회경고완료 && item.black_status === "1회경고완료") ||
        (statusFilters.탈퇴완료 && item.black_status === "탈퇴완료") ||
        (statusFilters.정지대기 && item.black_status === "정지대기")
      );
    });

    filtered = filtered.filter(
      (item) =>
        item.email_rest.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filledItems = fillEmptyItems(filtered, itemsPerPage);
    setFilteredItems(filledItems);
  };

  const fillEmptyItems = (array, itemsPerPage) => {
    const filledArray = [...array];
    const remainder = itemsPerPage - (filledArray.length % itemsPerPage);
    if (remainder !== itemsPerPage) {
      for (let i = 0; i < remainder; i++) {
        filledArray.push({
          id: `empty-${i}`,
          threetime_date: "",
          email_rest: "",
          email_admin: "",
          black_status: "",
          report_num: "",
        });
      }
    }
    return filledArray;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="restacceptrootWrapper">
      <div className="restAcceptbfWrapper">
        <div className="resfirstrowWrapper">
          <div className="headerfortext">
            <div className="restacceptTitle">매장 블랙리스트 목록</div>
            <div className="hinttextalign">
              <p className="restacceptP">
                <span>정지 대기</span> - 누적 신고가 3회 쌓여 정지 전 유예 상태 <br />
                <span>1회경고완료</span> - 누적 신고가 쌓여 1달 정지 완료
              </p>
              <p className="restacceptP" style={{ marginLeft: "5px" }}>
                | <span>정지중</span> - 누적 신고 수가 3회가 되어 1달 정지중 <br />
                | <span>탈퇴 완료</span> - 누적 신고가 6회가 되어 탈퇴 처리
              </p>
            </div>
          </div>
        </div>
        <div className="ressecondrowWRapper">
          <div className="rescheckboxWrapper">
            <div>상태 :</div>
            <label>
              <input
                type="checkbox"
                name="status"
                value="정지대기"
                checked={statusFilters.정지대기}
                onChange={handleStatusChange}
              />
              정지대기
            </label>
            <label>
              <input
                type="checkbox"
                name="status"
                value="정지중"
                checked={statusFilters.정지중}
                onChange={handleStatusChange}
              />
              정지중
            </label>
            <label>
              <input
                type="checkbox"
                name="status"
                value="일회경고완료"
                checked={statusFilters.일회경고완료}
                onChange={handleStatusChange}
              />
              1회경고완료
            </label>
            <label>
              <input
                type="checkbox"
                name="status"
                value="탈퇴완료"
                checked={statusFilters.탈퇴완료}
                onChange={handleStatusChange}
              />
              탈퇴완료
            </label>
          </div>
          <div className="headerforsearch">
            <img src={Search} alt="" className="searchimginrestsearch" />
            <input
              type="text"
              className="restsearchinput"
              placeholder="식당 ID 검색"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <hr />
      {!loading && (
        <div className="restResTableWrapper">
          <div className="restresTableWrapper">
            <table className="tableforadminres">
              <thead>
                <tr className="cnforbgc">
                  <th scope="col">3회 누적 날짜</th>
                  <th scope="col">식당 ID</th>
                  <th scope="col">관리자 ID</th>
                  <th scope="col">처리 상태</th>
                  <th scope="col">누적 신고 수</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((rest, index) => (
                  <tr key={rest.id || index} style={rest.report_num >= 6 ? { color: 'red' } : {}}>
                    <td style={{ width: "90px" }}>{rest.threetime_date}</td>
                    <td style={{ width: "200px" }}>{rest.email_rest}</td>
                    <td>{rest.email_admin}</td>
                    <td style={{ width: "70px" }}>{rest.black_status}</td>
                    <td>{rest.report_num}</td>
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

export default RestBlacklist;
