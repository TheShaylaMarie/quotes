import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './assets/components/Home/home.jsx'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={ <Home/> } />
      </Routes>
    </Router>
  </StrictMode>,
)
