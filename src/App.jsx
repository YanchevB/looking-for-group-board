import { useState } from 'react'
import Footer from './layout/Footer'
import Header from './layout/Header'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import SessionDetailPage from './pages/SessionDetailPage'
import CreateSessionPage from './pages/CreateSessionPage'
import EditSessionPage from './pages/EditSessionPage'
import MySessionsPage from './pages/MySessionsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <>
        <Header />

        <MySessionsPage />
        <hr />
        <LoginPage />
        <hr />
        <RegisterPage />
        <hr />
        <NotFoundPage />

        <Footer />
    </>
  )
}

export default App
