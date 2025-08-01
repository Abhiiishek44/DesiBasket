import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UseAuth, { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>

  <StrictMode>
    <App />
  </StrictMode>,
  </UserProvider>  
)
