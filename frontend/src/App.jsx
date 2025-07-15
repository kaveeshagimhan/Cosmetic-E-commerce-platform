import './App.css'
import Header from './components/header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './components/login'
import { Toaster } from 'react-hot-toast'
import SignUpPage from './components/signup'
import AdminPage from './components/adminPage'
import TestPage from './components/test'
import HomePage from './components/home'

function App() {

  return (
    <BrowserRouter>
      <div>
        <Toaster position='top-right'/> 
        <Routes path = "/*">
          <Route path="/login" element={<LoginPage />} />
          <Route path = "/signup" element={<SignUpPage />} />
          <Route path = "/admin/*" element={<AdminPage />} />
          <Route path = "/test" element={<TestPage/>} />
          <Route path = "/*" element={<HomePage/>} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}


export default App
