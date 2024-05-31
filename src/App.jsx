import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import NewUser from './components/NewUser/NewUser'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/new_user" element={<NewUser />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
