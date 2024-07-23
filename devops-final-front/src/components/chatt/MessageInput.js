import React, { useState } from "react";
import "../../css/components/chatt/MessageInput.css";

function MessageInput({ userId, receiverId }) {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending message:', message);

    const payload = {
      receiverId: receiverId,
      senderId: userId,
      messageContent: message,
      sendTime: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:8080/chat/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Message sent successfully:', responseData);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setMessage('');
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input 
        className='message-input-box'
        type="text" 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요 .." 
      />
      <button className='send-btn' type="submit">Send</button>
    </form>
  );
}

export default MessageInput;