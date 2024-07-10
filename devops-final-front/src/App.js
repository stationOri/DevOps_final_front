import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Mypage from "./pages/Mypage";
import RestaurantSignup from "./pages/RestaurantSignup";
import UserSignup from "./pages/UserSignup";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/restaurantsignup" element={<RestaurantSignup />}></Route>
          <Route path="/usersignup" element={<UserSignup />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
