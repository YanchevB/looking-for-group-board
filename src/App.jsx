import { useState } from 'react'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import HomePage from './components/home/HomePage'
import CatalogPage from './components/catalog/CatalogPage'
import SessionDetailPage from './components/session-detail/SessionDetailPage'
import CreateSessionPage from './components/create-session/CreateSessionPage'
import EditSessionPage from './components/edit-session/EditSessionPage'
import MySessionsPage from './components/my-sessions/MySessionsPage'
import LoginPage from './components/login/LoginPage'
import RegisterPage from './components/register/RegisterPage'
import NotFoundPage from './components/not-found/NotFoundPage'

function App() {

  return (
    <>
        <Header />

        <SessionDetailPage />

        <Footer />
    </>
  )
}

export default App
