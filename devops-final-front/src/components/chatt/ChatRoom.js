import React, { useState, useEffect } from "react";
import "../../css/components/chatt/ChatRoom.css";

function ChatRoom({
  chattingRoomId,
  ansName,
  qsName,
  sentColor = "#FF8A00",
  chatType = "qs",
  refreshTrigger,
}) {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
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
  }, [chattingRoomId, refreshTrigger]);

  const sortedChatRooms = [...chatRooms].sort(
    (a, b) => new Date(a.sendTime) - new Date(b.sendTime)
  );

  const isAdmin = ansName === "관리자";
  const headerName = isAdmin
    ? chatType === "qs"
      ? qsName
      : ansName
    : chatType === "qs"
    ? ansName
    : qsName;
  return (
    <div className="chat-window">
      {chatRooms.length > 0 ? (
        <div className="chat-header">
          <h2>{headerName}</h2>
        </div>
      ) : (
        <div className="chat-header">
          <h2>Chat Room</h2>
        </div>
      )}
      <div className="message-list">
        {sortedChatRooms.map((chatRoom) => (
          <div className="message-box" key={chatRoom.id}>
            {chatRoom.senderType === "qs" ? (
              <div
                className={`message-info ${
                  chatType === "qs"
                    ? isAdmin
                      ? "received-info"
                      : "sent-info"
                    : isAdmin
                    ? "sent-info"
                    : "received-info"
                }`}
              >
                <span
                  className={`chat-senderTime ${
                    chatType === "qs" && isAdmin ? "" : "mr-15"
                  }`}
                >
                  {formatTimestamp(chatRoom.sendTime) || "No time"}
                </span>
                <span
                  className={`chat-senderName ${
                    chatType === "qs" && !isAdmin ? "mr-15" : ""
                  }`}
                >
                  {chatRoom.senderName}
                </span>
              </div>
            ) : (
              <div
                className={`message-info ${
                  chatType === "qs"
                    ? isAdmin
                      ? "sent-info"
                      : "received-info"
                    : isAdmin
                    ? "received-info"
                    : "sent-info"
                }`}
              >
                <span
                  className={`chat-senderName ${
                    chatType === "qs" && isAdmin ? "" : "mr-15"
                  }`}
                >
                  {chatRoom.senderName}
                </span>
                <span
                  className={`chat-senderTime ${
                    chatType === "qs" && !isAdmin ? "mr-15" : ""
                  }`}
                >
                  {formatTimestamp(chatRoom.sendTime) || "No time"}
                </span>
              </div>
            )}
            <div
              className={`message ${
                chatType === "qs"
                  ? chatRoom.senderType === "qs"
                    ? isAdmin
                      ? "received"
                      : "sent"
                    : isAdmin
                    ? "sent"
                    : "received"
                  : chatRoom.senderType === "qs"
                  ? isAdmin
                    ? "sent"
                    : "received"
                  : isAdmin
                  ? "received"
                  : "sent"
              }`}
              style={
                chatType === "qs"
                  ? chatRoom.senderType === "qs"
                    ? isAdmin
                      ? {}
                      : { backgroundColor: sentColor }
                    : isAdmin
                    ? { backgroundColor: sentColor }
                    : {}
                  : chatRoom.senderType === "qs"
                  ? isAdmin
                    ? { backgroundColor: sentColor }
                    : {}
                  : isAdmin
                  ? {}
                  : { backgroundColor: sentColor }
              }
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
