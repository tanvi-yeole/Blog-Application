import React from "react";
import Navbar from "./components/Navbar";
import Homepage from "./Pages/Homepage";
import Register from "./Pages/Register";
import Signin from "./Pages/Signin";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
