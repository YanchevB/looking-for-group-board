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
import MySessionsPage from './components/my-sessions/MySessionsPage'
import PrivateRoute from './components/guards/PrivateRoute'
import GuestRoute from './components/guards/GuestRoute'

function App() {

    return (
        <>
            <Header />

            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/catalog' element={<CatalogPage />} />
                <Route path='/details/:id' element={<SessionDetailPage />} />
                
                <Route element={<GuestRoute />}>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                </Route>

                <Route element={<PrivateRoute />}>
                    <Route path='/create' element={<CreateSessionPage />} />
                    <Route path='/edit/:id' element={<EditSessionPage />} />
                    <Route path='/my-sessions' element={<MySessionsPage />} />
                </Route>

                <Route path='*' element={<NotFoundPage />} />
                <Route path='/404' element={<NotFoundPage />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App
