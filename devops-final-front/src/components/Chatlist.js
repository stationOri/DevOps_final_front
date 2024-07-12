import Searchbox from "../components/Serchbox";
const ChatList = () => {
    // 채팅방 데이터 예시 배열
  
      const chatRooms = [
        { id: 1, name: 'Liam Anderson', image: '/images/chat1.png', time: '04:50 PM', message: 'Hello' },
        { id: 2, name: 'Emma Johnson', image: '/images/chat2.png', time: '05:30 PM', message: 'Hi' },
        { id: 3, name: 'Oliver Wilson', image: '/images/chat3.png', time: '06:15 PM', message: 'Hey' },
        { id: 4, name: 'Sophia Brown', image: '/images/chat4.png', time: '07:00 PM', message: 'What\'s up?' },
        { id: 5, name: 'James Smith', image: '/images/chat5.png', time: '08:30 PM', message: 'How are you?' },
        { id: 6, name: 'Isabella Davis', image: '/images/chat1.png', time: '09:45 PM', message: 'Nice to meet you ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹㄴㅇㄹㄴㄹㄻㄴㅇㄻㄴㅇㄹ' },
        { id: 7, name: 'Mason Miller', image: '/images/chat2.png', time: '10:15 PM', message: '한글로 해도 문제가 없는지 알아야 겠어요 이제안돼' },
        { id: 8, name: 'Ava Garcia', image: '/images/chat3.png', time: '11:20 PM', message: 'ㅁ닝라러ㅏㅁㅁㅁㅁㅁㅁㅁㅁㅁㄹ알아랑라알알알아ㅏ아알알아ㅁㄴㅇ;ㅣ라ㅓㄴ아 과연될까안될까될까안될까' },
        // 추가적인 채팅방 데이터 추가 가능
      ];
    
  
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
        <img style={{ position: 'absolute', left: '23.5px', top: '11.5px', width: '60px', height: '60px' }} src={image} alt="" />
        <div style={{ position: 'absolute', left: '102px', top: '12px' }}>
          <p style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>{name}</p>
          <p style={{ fontSize: '14px', color: '#5f5f5f', margin: 0 }}>{truncatedMessage}</p>
        </div>
        <p style={{ position: 'absolute', right: '10.5px', top: '0x', fontSize: '14px', color: '#a0a0a0' }}>{time}</p>
      </div>
     
    );
  };
export default ChatList;  