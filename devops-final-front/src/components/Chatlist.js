import Searchbox from "../components/Serchbox";
function ChatList ({chatRooms}) {
    return (
      <div  style={{
        width: '175px',
        height: '34px',
        position: 'absolute',
        left: '170px',
        top: '270px',
        margin: 0,  // paragraph의 기본 margin을 제거합니다.
      }}>
      <div style={{ position: 'relative',  display: 'flex', flexDirection: 'column', alignItems: 'center' , width: '420px', minHeight:'600px',maxHeight: '600px',border: '1px solid #D9D9D9', padding: '0px', borderRadius: '5px'}}>
        <Searchbox/>
        <div style={{ width: '420px', maxHeight: '600px', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#ccc #f0f0f0' }}>
            {chatRooms.map(room => (
          <ChatRoom
            key={room.id}
            name={room.name}
            image={room.image}
            time={room.time}
            message={room.message}
          />
        ))}
      </div>
      </div>
      </div>
  
    );
  };
  
  const ChatRoom = ({ name, image, time, message }) => {
    const truncatedMessage = message.length > 35 ? message.slice(0, 35) + '...' : message;
  
    return (
        <div style={{ position: 'relative', width: '390px', height: '82px', marginBottom: '0px' }}>
        <div style={{ position: 'absolute', left: '20px', top: '12px' }}>
          <p style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>{name}</p>
          <p style={{ fontSize: '14px', color: '#5f5f5f', margin: 0 }}>{truncatedMessage}</p>
        </div>
        <p style={{ position: 'absolute', right: '10.5px', top: '0x', fontSize: '14px', color: '#a0a0a0' }}>{time}</p>
      </div>
     
    );
  };
export default ChatList;  