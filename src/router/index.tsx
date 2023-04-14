import { Routes, Route } from "react-router-dom";
import {lazy} from "react";
import React from 'react';
 
// 懒加载组件页面
// const Home = lazy(() => import("@/pages/home")) 
// const Login = lazy(() => import("@/pages/login")) 
 
function RootRoute(){
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>
    </>
  );
}
export default RootRoute