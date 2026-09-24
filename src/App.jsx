import { useState } from 'react'
import Footer from './layout/Footer'
import Header from './layout/Header'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import SessionDetailPage from './pages/SessionDetailPage'
import CreateSessionPage from './pages/CreateSessionPage'
import EditSessionPage from './pages/EditSessionPage'

function App() {

  return (
    <>
        <Header />

        <HomePage /> 

        <Footer />
    </>
  )
}

export default App
