import {Routes, Route} from 'react-router-dom'
import React,{lazy} from 'react'

// 懒加载组件页面
const Home = lazy(() => import('@/views/homePage'))
// const Login = lazy(() => import("@/pages/login"))

const RootRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
export default RootRoute
