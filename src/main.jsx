import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#161622',
          color: '#f0f0f5',
          border: '1px solid #1e1e2e',
          fontFamily: 'Inter, sans-serif',
        },
        success: {
          iconTheme: { primary: '#00d4ff', secondary: '#0a0a0f' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#0a0a0f' },
        },
      }}
    />
    <App />
  </React.StrictMode>
)
