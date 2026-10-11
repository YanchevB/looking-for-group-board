import { Route, Routes } from 'react-router'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import SessionDetailPage from './components/session-detail/SessionDetailPage'
import HomePage from './components/home/HomePage'
import CatalogPage from './components/catalog/CatalogPage'
import LoginPage from './components/login/LoginPage'
import RegisterPage from './components/register/RegisterPage'
import NotFoundPage from './components/not-found/NotFoundPage'
import EditSessionPage from './components/edit-session/EditSessionPage'
import CreateSessionPage from './components/create-session/CreateSessionPage'

function App() {

    return (
        <>
            <Header />

            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/catalog' element={<CatalogPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/create' element={<CreateSessionPage />} />
                <Route path='/details/:id' element={<SessionDetailPage />} />
                <Route path='/edit/:id' element={<EditSessionPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App
