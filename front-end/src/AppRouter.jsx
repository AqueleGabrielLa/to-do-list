import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Registers'
import Home from './pages/Home'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path="*" element={<Login />} /> {/* fallback para login */}
      </Routes>
    </Router>
  )
}