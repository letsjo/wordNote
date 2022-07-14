import cryptoJs from "crypto-js";
import "./App.css";
import React, { useEffect } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/word/add" element={<Edit />} />
        <Route path="/word/:id/edit" element={<Edit />} />
      </Routes>
    </div>
  );
}

export const password = process.env.REACT_APP_PASSWORD;
export const salt = {words:[...(process.env.REACT_APP_SALT).split(",")],sigBytes:process.env.REACT_APP_BYTES};
export default App;
