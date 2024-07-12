import { useRef,useEffect } from "react";
import React from "react";
import '../css/components/Chat.css'
import Day from "./Day"
import Banner from "./Banner"

function Chatmessages({chatMsgs}){
    return(
      <div style={{
        position: 'absolute', 
        left: '650px', 
        top: '270px', 
        margin: 0
      }}>
        <div style={{ 
          position: 'relative',  
          display: 'flex', 
          flexDirection: 'column', 
          width: '850px', 
          minHeight: '600px',
          maxHeight: '600px',
          border: '1px solid #D9D9D9', 
          padding: '0px', 
          borderRadius: '5px'
        }}>
        <Banner/>
        <Messages messagejson={chatMsgs}/>
        </div>
        </div>
    );
}



function Messages(messagesjson){
  let messages=[]
  try {
    messages = JSON.parse(messagesjson);
    console.log(messages);
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
  }
  // const messages = JSON.parse(messagesjson);
    // messages.sort((a, b) => new Date(a.time) - new Date(b.time));
    let prevSender = null; // 이전 메시지의 sender 값을 저장할 변수
    let daylist=[];
    let previousDate = messages[0].time.split(' ')[0];
    daylist.push(0);
    daylist.push(previousDate);

    const modifiedMessages = messages.map((msg, index) => {
      // 현재 메시지의 sender와 이전 메시지의 sender가 같고, 첫 번째 메시지가 아닌 경우에만 sender 값을 2 증가시킴
      if (index > 0 && msg.sender === prevSender) {
        msg.sender += 2;
      }
      else{
        prevSender = msg.sender; // 현재 메시지의 sender 값을 이전 sender로 설정
      }
      const newtime=msg.time.split(' ')
      const currentDate = newtime[0];  // Get the date part of the current message
      let time2=newtime[1].substring(0, 5);
      msg.time=convertTime(time2);
      if (currentDate !== previousDate) {
        // Date has changed, increment count and update previousDate
        daylist.push(index);
        daylist.push(currentDate);
        previousDate = currentDate;
      }
      
      return msg;
    });

    const messagesEndRef = useRef(null);

    useEffect(() => {
      // 컴포넌트가 마운트되었을 때 스크롤을 맨 아래로 이동
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, []);

    return (
      <div className="hidden-scroll" style={{ overflowX: 'hidden', overflowY: 'auto' }}>
        {modifiedMessages.map((msg, index) => {
          const dayIndex = daylist.indexOf(index);
          if (dayIndex !== -1) {
            const date = daylist[dayIndex + 1];
            if(msg.sender===3||msg.sender===4){
              msg.sender=msg.sender-2;
            }
            return (
              <React.Fragment key={`day-${index}`}>
                <Day date={date} />
                {renderMessage(msg, index)}
              </React.Fragment>
            );
          }
          return renderMessage(msg, index);
        })}
        <div ref={messagesEndRef} />
      </div>
    );
  }
  
  const renderMessage = (msg, index) => {
    switch (msg.sender) {
      case 1:
        return (
          <Questioner
            key={index}
            name={msg.name}
            image={msg.image}
            time={msg.time}
            message={msg.message}
          />
        );
      case 3:
        return (
          <Questionermsg
            key={index}
            time={msg.time}
            message={msg.message}
          />
        );
      case 2:
        return (
          <Answerer
            key={index}
            name={msg.name}
            image={msg.image}
            time={msg.time}
            message={msg.message}
          />
        );
      case 4:
        return (
          <Answerermsg
            key={index}
            time={msg.time}
            message={msg.message}
          />
        );
      default:
        return null;
    }
  };
const Questioner = ({ name, image, time, message }) => {
    return(
        <div>
  
      <div style={{ 
        display: 'flex',
        flexDirection: 'row', // 이미지를 오른쪽에 배치
        alignItems: 'center', // 수직 정렬
        width: '850px', 
        height: '82px', 
        marginBottom: '0px'
        ,marginLeft:"15.5px" 
      }}>
        <img style={{ 
          marginRight: '17.5px', // 이미지와 텍스트 사이 간격
          width: '50px', 
          height: '50px' 
        }} src={image} alt="" />
       
      
      <div style={{ 
        width: 'auto', 
        display: 'inline-block', 
        filter: 'drop-shadow(2px 2px 12px rgba(209,209,209,0.25))', 
        maxWidth: '500px', 
        padding: '10px 16px', 
        boxSizing: 'border-box', 
        background: '#fff', 
        borderWidth: '1px', 
        borderColor: '#e7e7e7', 
        borderStyle: 'solid', 
        borderTopRightRadius: '14px', 
        borderBottomLeftRadius: '14px', 
        borderBottomRightRadius: '14px', 
        marginTop: '70px',
        marginLeft: '0px' // 이미지와 텍스트 박스 사이 간격
      }}>
        <p style={{ 
          position: 'absolute',
          right: '10.5px',
          top: '-20px', // 텍스트 박스의 위쪽으로 이동
          fontSize: '14px', 
          color: '#a0a0a0',
          margin: 0
        }}>
          {time}
        </p>
        <p style={{ 
          position: 'absolute', 
          left: '5px', 
          top: '-27px' ,
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#333', 
          margin: 0 
        }}>{name}</p>
        <p style={{ 
          margin: 0, 
          fontSize: '16px', 
          textAlign: 'left', 
          color: '#515151' 
        }}>
          {message}
        </p>
        </div>
      </div>
    </div>


    );
}

const Questionermsg = ({  time, message }) => {
    return(
        <div>
  
      <div style={{ 
        display: 'flex',
        flexDirection: 'row', // 이미지를 오른쪽에 배치
        alignItems: 'center', // 수직 정렬
        width: '850px', 
        height: '82px', 
        marginBottom: '0px'
        ,marginLeft:"85px" 
      }}>
        
      <div style={{ 
        width: 'auto', 
        display: 'inline-block', 
        filter: 'drop-shadow(2px 2px 12px rgba(209,209,209,0.25))', 
        maxWidth: '500px', 
        padding: '10px 16px', 
        boxSizing: 'border-box', 
        background: '#fff', 
        borderWidth: '1px', 
        borderColor: '#e7e7e7', 
        borderStyle: 'solid', 
        borderTopRightRadius: '14px', 
        borderBottomLeftRadius: '14px', 
        borderBottomRightRadius: '14px', 
        marginTop: '35px',
        marginLeft: '0px' // 이미지와 텍스트 박스 사이 간격
      }}>
        <p style={{ 
          position: 'absolute',
          right: '10.5px',
          top: '-20px', // 텍스트 박스의 위쪽으로 이동
          fontSize: '14px', 
          color: '#a0a0a0',
          margin: 0
        }}>
          {time}
        </p>
        
        <p style={{ 
          margin: 0, 
          fontSize: '16px', 
          textAlign: 'left', 
          color: '#515151' 
        }}>
          {message}
        </p>
        </div>
      </div>
    </div>


    );
}
const Answerer = ({ name, image, time, message }) => {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row', // 이미지를 오른쪽에 배치
            alignItems: 'center', // 수직 정렬
            width: '850px',
            height: '82px',
            marginBottom: '0px',
            marginLeft: '15.5px', // 전체 컨테이너의 왼쪽 여백
            marginRight: '15.5px', // 전체 컨테이너의 오른쪽 여백
          }}
        >
          <div
            style={{
              width: 'auto',
              display: 'inline-block',
              filter: 'drop-shadow(2px 2px 12px rgba(209,209,209,0.25))',
              maxWidth: '500px',
              padding: '10px 16px',
              boxSizing: 'border-box',
              background: '#FF8A00',
              borderWidth: '1px',
              borderColor: '#e7e7e7',
              borderStyle: 'solid',
              borderTopLeftRadius: '14px',
              borderBottomLeftRadius: '14px',
              borderBottomRightRadius: '14px',
              marginTop: '70px',
              marginLeft: 'auto', // 텍스트 박스를 오른쪽으로 정렬
              marginRight: '0px', // 이미지와 텍스트 박스 사이 간격
              textAlign: 'right', // 텍스트를 오른쪽 정렬
             
            }}
          >
            <p
              style={{
                position: 'absolute',
                left: '10.5px',
                top: '-20px', // 시간 텍스트를 위쪽으로 이동
                fontSize: '14px',
                color: '#a0a0a0',
                margin: 0,
              }}
            >
              {time}
            </p>
            <p
              style={{
                position: 'absolute',
                right: '5px',
                top: '-27px',
                fontSize: '18px',
                fontWeight: '600',
                color: '#333',
                margin: 0,
              }}
            >
              {name}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: '16px',
                textAlign: 'right',
                color: '#fff',
              }}
            >
              {message}
            </p>
          </div>
          <img
            style={{
              marginRight: '30.5px', // 이미지와 텍스트 사이 간격
              marginLeft: '15.5px', // 이미지를 오른쪽으로 이동
              width: '50px',
              height: '50px',
            }}
            src={image}
            alt=""
          />
        </div>
      </div>
    );
  }
  
const Answerermsg = ({  time, message }) => {
    return (
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row', // 이미지를 오른쪽에 배치
              alignItems: 'center', // 수직 정렬
              width: '850px',
              height: '82px',
              marginBottom: '0px',
              marginLeft: '15.5px', // 전체 컨테이너의 왼쪽 여백
              marginRight: '15.5px', // 전체 컨테이너의 오른쪽 여백
            }}
          >
            <div
              style={{
                width: 'auto',
                display: 'inline-block',
                filter: 'drop-shadow(2px 2px 12px rgba(209,209,209,0.25))',
                maxWidth: '500px',
                padding: '10px 16px',
                boxSizing: 'border-box',
                background: '#FF8A00',
                borderWidth: '1px',
                borderColor: '#e7e7e7',
                borderStyle: 'solid',
                borderTopLeftRadius: '14px',
                borderBottomLeftRadius: '14px',
                borderBottomRightRadius: '14px',
                marginTop: '35px',
                marginLeft: 'auto', // 텍스트 박스를 오른쪽으로 정렬
                marginRight: '0px', // 이미지와 텍스트 박스 사이 간격
                textAlign: 'right', // 텍스트를 오른쪽 정렬
               
              }}
            >
              <p
                style={{
                  position: 'absolute',
                  left: '10.5px',
                  top: '-20px', // 시간 텍스트를 위쪽으로 이동
                  fontSize: '14px',
                  color: '#a0a0a0',
                  margin: 0,
                }}
              >
                {time}
              </p>
              
              <p
                style={{
                  margin: 0,
                  fontSize: '16px',
                  textAlign: 'right',
                  color: '#fff',
                }}
              >
                {message}
              </p>
            </div>
            <div
            style={{
              marginRight: '45px', // 이미지와 텍스트 사이 간격
              marginLeft: '0px', // 이미지를 오른쪽으로 이동
              width: '50px',
              height: '50px',
            }}
          ></div>
          </div>
        </div>
      );
    }
    function convertTime(time) {
      // 시간과 분을 분리
      const [hour, minute] = time.split(':');
  
      // 24시간 형식의 시간을 숫자로 변환
      const hourNum = parseInt(hour, 10);
  
      // AM 또는 PM 설정
      const period = hourNum >= 12 ? 'PM' : 'AM';
  
      // 12시간 형식으로 시간 변환
      let hour12 = (hourNum % 12) || 12;  // 0시는 12시로 표시
  
      // 시간과 분을 문자열로 변환
      const hourStr = hour12.toString().padStart(2, '0');
      const minuteStr = minute.padStart(2, '0');
  
      // 결과 반환
      return `${hourStr}:${minuteStr} ${period}`;
  }
  
export default Chatmessages;