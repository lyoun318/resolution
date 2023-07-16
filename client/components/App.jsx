// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DecisionMaker from "./DecisionMaker.jsx";
import Home from "./Home.jsx";
import Messages from "./Messages.jsx";
import SignUp from "./SignUp.jsx";
import WallOfFame from "./WallOfFame.jsx";
import Navigation from "./Navigation.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/WallOfFame" element={<WallOfFame />} />
          <Route path="/DecisionMaker" element={<DecisionMaker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;