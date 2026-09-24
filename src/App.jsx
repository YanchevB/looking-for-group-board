import { useState } from 'react'
import Footer from './layout/Footer'
import Header from './layout/Header'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import SessionDetailPage from './pages/SessionDetailPage'

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
