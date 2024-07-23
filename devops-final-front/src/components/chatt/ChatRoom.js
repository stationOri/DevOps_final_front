import React, { useState, useEffect } from "react";
import "../../css/components/chatt/ChatRoom.css";

function ChatRoom({ chattingRoomId, ansName }) {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const messages = [
    {
      id: 1,
      sender: "Jack Raymonds",
      content: "안녕하세요. 혹시 금식에 복숭아가 들어있을까요?",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "Grace",
      content: "아니요 들어있지 않습니다!",
      time: "10:30 AM",
    },
    {
      id: 3,
      sender: "Jack Raymonds",
      content: "네! 알겠습니다.",
      time: "10:30 AM",
    },
    {
      id: 4,
      sender: "Grace",
      content: "네! 예약일에 뵙겠습니다 ♥",
      time: "10:30 AM",
    },
  ];

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const getChatRoom = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/chat/chat/${chattingRoomId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setChatRooms(data || []);
      console.log("chattingRoomId:", chattingRoomId);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chattingRoomId) {
      getChatRoom();
    }
  }, [chattingRoomId]);

  return (
    <div className="chat-window">
    {chatRooms.length > 0 ? (
      <div className="chat-header">
        <h2>{ansName}</h2>
      </div>
    ) : (
      <div className="chat-header">
        <h2>Chat Room</h2>
      </div>
    )}
    <div className="message-list">
      {chatRooms.map((chatRoom) => (
        <div className="message-box" key={chatRoom.id}>
          {chatRoom.senderType === "qs" ? (
            <div className="message-info sent-info">
              <span className="chat-senderTime mr-15">
                {formatTimestamp(chatRoom.sendTime) || "No time"}
              </span>
              <span className="chat-senderName">{chatRoom.senderName}</span>
            </div>
          ) : (
            <div className="message-info received-info">
              <span className="chat-senderName mr-15">{chatRoom.senderName}</span>
              <span className="chat-senderTime">
                {formatTimestamp(chatRoom.sendTime) || "No time"}
              </span>
            </div>
          )}
          <div
            className={`message ${
              chatRoom.senderType === "qs" ? "sent" : "received"
            }`}
          >
            <div>{chatRoom.messageContent}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default ChatRoom;
