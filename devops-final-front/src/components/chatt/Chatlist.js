import React, { useState, useEffect } from "react";
import "../../css/components/chatt/ChatList.css";

import planeImg from "../../assets/images/plane.png";
import planeBlueImg from "../../assets/images/planeblue.png";

function ChatList({
  userId,
  onChatSelect,
  chatImg = "default",
  chatType = "user",
}) {
  const [chatLists, setChatLists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const getChatImage = () => {
    switch (chatImg) {
      case "blue":
        return require("../../assets/images/planeblue.png");
      case "default":
      default:
        return require("../../assets/images/plane.png");
    }
  };

  const getChatList = async () => {
    try {
      const response = await fetch(`http://localhost:8080/chat/user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setChatLists(data || []);
      console.log("userId:", userId);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChatList();
  }, [userId]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const filteredChatLists = searchTerm
    ? chatLists.filter((chatList) =>
        chatType === "admin"
          ? chatList.qsName.toLowerCase().includes(searchTerm)
          : chatList.ansName.toLowerCase().includes(searchTerm)
      )
    : chatLists;

  return (
    <aside className="sidebar">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search people"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="chat-list">
        {filteredChatLists.map((chatList) => (
          <li
            key={chatList.chattingRoomId}
            className="chat-item"
            onClick={() =>
              onChatSelect(
                chatList.chattingRoomId,
                chatList.ansName,
                chatList.qsName
              )
            }
          >
            <img
              className="chat-img"
              src={getChatImage()}
              alt={chatList.ansName}
            />
            <div className="chat-info">
              <h3>
                {chatType === "admin" ? chatList.qsName : chatList.ansName}
              </h3>
              <p>{chatList.lastMsg}</p>
            </div>
          </li>
        ))}
      </div>
    </aside>
  );
}

export default ChatList;