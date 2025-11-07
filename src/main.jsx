import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Barcos from './Barcos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Barcos></Barcos>
  </StrictMode>,
)
