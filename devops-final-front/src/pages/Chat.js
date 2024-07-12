import ChatList from "../components/Chatlist";
import Chatmessages from "../components/Chatmessages";


function Chat() {

    return (
      <div>
        <Logo/>
        <ChatList/>
        <Chatmessages/>        
        
      </div>
    );
}
function Logo(){
  return (
    <div style={{ width: '243px', height: '51px', position: 'relative' }}>
  <p
    style={{
      width: '175px',
      height: '34px',
      position: 'absolute',
      left: '230px',
      top: '176px',
      fontSize: '30px',
      fontWeight: 600,
      textAlign: 'left',
      color: '#1d1d1e',
      margin: 0,  // paragraph의 기본 margin을 제거합니다.
    }}
  >
    1:1 문의
  </p>
  <svg
    width="51"
    height="51"
    viewBox="0 0 51 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: '50.31px',
      height: '51px',
      position: 'absolute',
      left: '162px',
      top: '168px',
    }}
    preserveAspectRatio="none"
  >
    <g clipPath="url(#clip0_10_1001)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.6382 6.375C38.4181 6.375 41.0842 7.49442 43.0499 9.48699C45.0156 11.4796 46.1199 14.1821 46.1199 17V34C46.1199 36.8179 45.0156 39.5204 43.0499 41.513C41.0842 43.5056 38.4181 44.625 35.6382 44.625H6.28923C5.73324 44.625 5.20002 44.4011 4.80688 44.0026C4.41374 43.6041 4.19287 43.0636 4.19287 42.5V17C4.19287 14.1821 5.2972 11.4796 7.26291 9.48699C9.22862 7.49442 11.8947 6.375 14.6746 6.375H35.6382ZM18.8673 21.25C18.3539 21.2501 17.8583 21.4412 17.4746 21.787C17.0909 22.1329 16.8457 22.6095 16.7857 23.1264L16.771 23.375V27.625C16.7716 28.1666 16.9762 28.6876 17.343 29.0814C17.7098 29.4752 18.2111 29.7122 18.7445 29.744C19.2779 29.7757 19.8031 29.5998 20.2129 29.2522C20.6226 28.9046 20.8859 28.4115 20.949 27.8736L20.9637 27.625V23.375C20.9637 22.8114 20.7428 22.2709 20.3497 21.8724C19.9566 21.4739 19.4233 21.25 18.8673 21.25ZM31.4455 21.25C30.8895 21.25 30.3563 21.4739 29.9631 21.8724C29.57 22.2709 29.3491 22.8114 29.3491 23.375V27.625C29.3491 28.1886 29.57 28.7291 29.9631 29.1276C30.3563 29.5261 30.8895 29.75 31.4455 29.75C32.0015 29.75 32.5347 29.5261 32.9278 29.1276C33.321 28.7291 33.5418 28.1886 33.5418 27.625V23.375C33.5418 22.8114 33.321 22.2709 32.9278 21.8724C32.5347 21.4739 32.0015 21.25 31.4455 21.25Z"
        fill="#FF8A00"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_10_1001"><rect width="50.3125" height="51" fill="white"></rect></clipPath>
    </defs>
  </svg>
</div>

  );
}


export default Chat;