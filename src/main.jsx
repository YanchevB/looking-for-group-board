import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import AuthProvider from './contexts/AuthProvider.jsx'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
    <StrictMode>

        <BrowserRouter>

            <AuthProvider>

                <App />

            </AuthProvider>

        </BrowserRouter>

    </StrictMode>
)
