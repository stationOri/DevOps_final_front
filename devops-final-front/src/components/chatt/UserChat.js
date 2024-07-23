import React, { useState, useEffect } from "react";
import "../../css/components/chatt/Chat.css";
import Loading from "../Loading";
import ChatList from "./Chatlist";
import ChatRoom from "./ChatRoom";
import MessageInput from "./MessageInput";

import ChatImg from "../../assets/images/chatorange.png";

const UserChat = ({ userId }) => {
  const [selectedChatRoomId, setSelectedChatRoomId] = useState(null);
  const [selectedChatAnsName, setSelectedChatAnsName] = useState(null);

  const handleChatSelect = (chattingRoomId, ansName) => {
    setSelectedChatRoomId(chattingRoomId);
    setSelectedChatAnsName(ansName);
  };

  return (
    <div className="container">
      <div className="chat-container">
        <div className="chat-menu-title">
          <img src={ChatImg} alt="" className="chat-title-img" />
          <div className="chat-menu-title-content">1:1 문의</div>
        </div>
        <div className="real-chat-content">
          <div className="chat-list">
            <ChatList userId={userId} onChatSelect={handleChatSelect} />
          </div>
          <div className="chat-messages-wrap">
            <div className="chat-messages">
              {selectedChatRoomId ? (
                <ChatRoom
                  chattingRoomId={selectedChatRoomId}
                  ansName={selectedChatAnsName}
                />
              ) : (
                <div className="chat-no-message">
                  <div>채팅방이 없습니다.</div>
                </div>
              )}
            </div>
            <div className="chat-input-box">
              <MessageInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
