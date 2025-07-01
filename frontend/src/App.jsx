import './App.css'
import Header from './components/header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './components/login'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <BrowserRouter>
      <div>
        <Toaster position='top-right'/> 
        <Routes path = "/*">
          <Route path="/login" element={<LoginPage />} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}


export default App
