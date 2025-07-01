import './App.css'
import Header from './components/header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './components/login'

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes path = "/*">
          <Route path="/login" element={<LoginPage />} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}


export default App
