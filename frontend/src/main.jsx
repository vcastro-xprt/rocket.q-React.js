import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home/index.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
      

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
