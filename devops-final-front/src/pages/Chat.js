// import ChatList from "../components/chatt/Chatlist";
// import ChatImg from "../assets/images/chatorange.png";
// import HeaderOrange from "../components/HeaderOrange";
// import Loading from "../components/Loading";
// import SideBar from "../components/user/SideBar";
// import "../css/pages/Chat.css";
// import React, { useState, useEffect } from "react";

// function Chat() {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [chatRooms, setChatRooms] = useState([]);
//   const [chatMsgs, setChatMsgs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getChatRoom = async () => {
//     try {
//       const response = await fetch(`http://localhost:4000/chatrooms`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch");
//       }
//       const json = await response.json();
//       console.log("Fetched data:", json);
//       setChatRooms(json || []);
//       const response1 = await fetch(`http://localhost:4000/chatmsgs`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch");
//       }
//       const json1 = await response1.json();
//       console.log("Fetched data:", json1);
//       setChatRooms(json || []);
//       setChatMsgs(json1 || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getChatRoom();
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <Loading />
//       ) : (
//         <div className={`mainWrapper ${isSidebarCollapsed ? "collapsed" : ""}`}>
//           <SideBar className="mainSidebar" />
//           <div
//             className={`contentsWrapper ${
//               isSidebarCollapsed ? "collapsed" : ""
//             }`}
//           >
//             <HeaderOrange />
//             <div className="chatcontainer">
//               <div className="chatmenutitle">
//                 <img src={ChatImg} alt="" className="chattitleimg" />
//                 <div>1:1 문의</div>
//               </div>
//               <div className="realchatcontent">
//                 <ChatList chatRooms={chatRooms} />
//                 {/* <Chatmessages chatMsgs={chatMsgs}/> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Chat;
