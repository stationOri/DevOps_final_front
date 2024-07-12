import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CheckModalProvider } from "./components/Modal/CheckModalContext";
import { SuccessModalProvider } from "./components/Modal/SuccessModalContext";
import Main from "./pages/Main";
import Mypage from "./pages/Mypage";
import RestaurantSignup from "./pages/RestaurantSignup";
import UserSignup from "./pages/UserSignup";
import RestDetailPage from "./pages/RestDetailPage";
import RestMain from "./pages/RestMain";
import AdminMain from "./pages/AdminMain";
import Reservation from "./pages/Resveration";
import Chat from "./pages/Chat"
import { MenuModalProvider } from "./components/Modal/MenuModalContext";

function App() {
  return (
    <SuccessModalProvider>
    <CheckModalProvider>
    <MenuModalProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/restmain" element={<RestMain />}></Route>
        <Route path="/adminmain" element={<AdminMain />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/restaurantsignup" element={<RestaurantSignup />}></Route>
        <Route path="/usersignup" element={<UserSignup />}></Route>
        <Route path="/restaurants/:id" element={<RestDetailPage />}></Route>
        <Route path="/reservation/:id" element={<Reservation />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
    </MenuModalProvider>
    </CheckModalProvider>
    </SuccessModalProvider>
  );
}

export default App;
