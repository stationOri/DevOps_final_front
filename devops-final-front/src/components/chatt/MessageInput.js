import React, { useState } from 'react';
import "../../css/components/chatt/MessageInput.css";

function MessageInput() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending message:', message);
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