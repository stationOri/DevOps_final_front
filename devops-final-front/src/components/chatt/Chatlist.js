import React, { useState, useEffect } from "react";
import "../../css/components/chatt/ChatList.css";

import planeImg from "../../assets/images/plane.png";

function ChatList({ userId, onChatSelect }) {
  const [chatLists, setChatLists] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <aside className="sidebar">
      <div className="search-bar">
        <input type="text" placeholder="Search messages, people" />
      </div>
      <div className="chat-list">
        {chatLists.map((chatList) => (
          <li
            key={chatList.chattingRoomId}
            className="chat-item"
            onClick={() => onChatSelect(chatList.chattingRoomId, chatList.ansName)}
          >
            <img
            className="chat-img"
              src={planeImg}
              alt={chatList.ansName}
            />
            <div className="chat-info">
              <h3>{chatList.ansName}</h3>
              <p>{chatList.lastMsg}</p>
            </div>
          </li>
        ))}
      </div>
    </aside>
  );
}

export default ChatList;
