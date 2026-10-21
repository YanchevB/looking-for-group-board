import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import Button from '../shared/Button';
import './header.css';
import useAuth from '../../hooks/useAuth';
import { extractInitial } from '../../utils/extractInitial';
import supabase from '../../lib/supabase';

export default function Header() {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    async function logoutHandler() {
        setIsLoggingOut(true);

        try {
            await supabase.auth.signOut();
            navigate('/');
        } finally {
            setIsLoggingOut(false);
        }
    }

    return (
        <header className="site-header">
            <div className="container site-header__inner">
                <Link to="/" className="site-header__brand">
                    <span className="site-header__brand-mark">LFG</span>
                    LFG Board
                </Link>
                <nav className="site-header__nav" aria-label="Main navigation">
                    <Link
                        to="/"
                        className="site-header__link"
                    >
                        Home
                    </Link>
                    <Link to='/catalog' className="site-header__link">
                        Catalog
                    </Link>

                    {isAuthenticated && (
                        <>
                            <Link to='/create' className="site-header__link">
                                Create
                            </Link>
                            <Link to='/my-sessions' className="site-header__link">
                                My Sessions
                            </Link>
                        </>
                    )}
                </nav>
                <div className="site-header__actions">
                    {!isAuthenticated
                        ? <>
                            <Button to='/login' variant='ghost' size='sm'>Log in</Button>

                            <Button to='/register' size='sm'>Register</Button>
                        </>
                        : <>
                            <span className="site-header__user">
                                <span className="site-header__avatar">{extractInitial(user.user_metadata.username)}</span>
                                {user.user_metadata.username}
                            </span>

                            <Button type='button' variant='ghost' size='sm' onClick={logoutHandler} disabled={isLoggingOut}>
                                {isLoggingOut ? 'Logging out…' : 'Logout'}
                            </Button>
                        </>
                    }
                </div>
            </div>
        </header>

    );
}
