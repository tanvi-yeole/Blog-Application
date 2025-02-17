import React from "react";
import Navbar from "./components/Navbar";
import Homepage from "./Pages/Homepage";
import Register from "./Pages/Register";
import Signin from "./Pages/Signin";
import { Routes, Route } from "react-router-dom";
import Createblog from "./Pages/createBlog";
import { useState } from "react";
import BlogPost from "./Pages/Blog";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createblog" element={<Createblog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </div>
  );
}
