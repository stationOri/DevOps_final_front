import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Mypage from "./pages/Mypage";
import RestaurantSignin from "./pages/RestaurantSignup";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/restaurantSignin" element={<RestaurantSignin />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
