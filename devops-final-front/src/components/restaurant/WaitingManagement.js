import Now from "../../assets/images/Restaurant/now.png";
import Waiting from "../../assets/images/Restaurant/waiting.png";
import "../../css/components/restaurant/WaitingManagement.css";
import React, { useState, useEffect } from "react";
import Loading from "../Loading";

function WaitingManagement() {
  const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(false);
  const [restId, setRestId] = useState(2);
  const [upperText, setUpperText] = useState("");
  const [lowerText, setLowerText] = useState("");
  const [team, setTeam] = useState(0);
  const [people, setPeople] = useState(0);
  const [waitingList, setWaitingList] = useState([]);

  const getWait = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/restaurants/info/revWait/${restId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const text = await response.text();
      if (text === "A" || text === "C") {
        setWait(true);
      }
    } catch (error) {
      console.error("Error revWait status:", error);
    }
  };

  const getWaitStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/restaurants/info/waitingstatus/${restId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const text = await response.text();
      if (text === "A") {
        setUpperText("현재 웨이팅 접수 중지중입니다.");
        setLowerText("웨이팅 접수를 시작해주세요.");
      } else if (text === "B") {
        setUpperText("현재 웨이팅 접수 종료중입니다.");
        setLowerText("웨이팅 접수를 시작해주세요.");
      } else if (text === "C") {
        setUpperText("현재 웨이팅 접수 중입니다.");
        setLowerText("웨이팅 접수 시작이 불가능합니다.");
      }
    } catch (error) {
      console.error("Error revWait status:", error);
    }
  };

  const getWaitList = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/waiting/rest/${restId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await response.json();
      setWaitingList(json);
      // 총 팀 수와 인원 수를 업데이트
      updateCounts(json);
    } catch (error) {
      console.error("Error revWait status:", error);
    }
  };

  const updateCounts = (list) => {
    let totalTeams = 0;
    let totalPeople = 0;
    list.forEach(wait => {
      totalTeams += 1;
      totalPeople += wait.waitingPpl;
    });
    setTeam(totalTeams);
    setPeople(totalPeople);
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getWait(), getWaitStatus(), getWaitList()]);
      setLoading(false);
    };

    fetchData();
  }, [restId]);

  const renderStatusContent = (status) => {
    switch (status) {
      case "IN_QUEUE":
        return (
          <td className="status-in-queue">
            <button className="requestBtnOrange">입장 요청</button>
            <button className="requestBtnOrange">입장 완료</button>
            <button className="requestBtnOrange">노쇼</button>
          </td>
        );
      case "WALKIN_REQUESTED":
        return (
          <td className="status-walkin-requested">
            입장요청완료
          </td>
        );
      case "WALKIN":
        return (
          <td className="status-walkin">
            입장 완료
          </td>
        );
      case "QUEUE_CANCELED":
        return (
          <td className="status-queue-canceled">
            대기 취소
          </td>
        );
      case "NOSHOW":
        return (
          <td className="status-noshow">
            노쇼
          </td>
        );
      default:
        return <td></td>;
    }
  };

  return (
    <div className="WrapperWithoutBorder">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="UpperBoxRest">
            <div className="rest-text">
              <img src={Now} alt="" className="rest-text-logo" />
              <p className="rest-bold-text">Now</p>
            </div>
            <div className="rest-content-box">
              <hr className="innerHrLine" />
              <div className="betweenLineContent">
                <div className="waitinExText">
                  현재까지 웨이팅
                  <div>
                    <span className="spanforOrange">{team}</span> 팀 /{" "}
                    <span className="spanforOrange">{people}</span> 명
                  </div>
                </div>
                {wait && (
                  <div className="rest-right-box">
                    <div className="rest-button-box">
                      <button className="btnforBlackBorder">
                        웨이팅 접수 시작
                      </button>
                      <button className="btnforOrange">웨이팅 접수 중지</button>
                      <button className="btnforOrange">웨이팅 접수 종료</button>
                    </div>
                    <div className="boxforhinttext">
                      {upperText}
                      <div className="spanforRed">{lowerText}</div>
                    </div>
                  </div>
                )}
              </div>
              <hr className="innerHrLine" />
            </div>
          </div>
          <div className="LowerBoxRest">
            <div className="rest-text">
              <img src={Waiting} alt="" className="rest-text-logo" />
              <p className="rest-bold-text">Waiting List</p>
            </div>
            <table className="waitingTable">
              <thead>
                <tr className="fortablebgc">
                  <td>순번</td>
                  <td>이름</td>
                  <td>인원</td>
                  <td>웨이팅 번호</td>
                  <td>상태변경</td>
                </tr>
              </thead>
              <tbody>
                {wait ? (
                  waitingList.map((wait) => (
                    <tr key={wait.waitingId}>
                      <td>{wait.waitingId}</td>
                      <td>{wait.userName}</td>
                      <td>{wait.waitingPpl}</td>
                      <td>{wait.waitingId}</td>
                      {renderStatusContent(wait.waitingStatus)}
                    </tr>
                  ))
                ) : (
                  <>
                    <tr>
                      <td
                        colSpan={5}
                        style={{ textAlign: "center", paddingTop: "20px" }}
                      >
                        원격 줄서기 기능을 사용하고 않고 있습니다.
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={5}
                        style={{ textAlign: "center", paddingBottom: "20px" }}
                      >
                        해당 기능을 사용하려면 가게 정보 수정 화면에서 원격
                        줄서기 기능을 활성화 해주세요.
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center"}}>
                        <button>가게 정보 수정하러 가기</button>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default WaitingManagement;
