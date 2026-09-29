import { Link } from 'react-router';
import Button from '../shared/Button';
import './header.css';

export default function Header() {
    // TODO: branch on auth state once useAuth()/AuthContext exists.
    // Logged-in variant (from home.html reference block):
    //   nav: Home, Catalog, Create, My Sessions
    //   actions: <span className="site-header__user">...avatar+name...</span>, Logout  button
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
                </nav>
                <div className="site-header__actions">
                    <Button to='/login' variant='ghost' size='sm'>Log in</Button>

                    <Button to='/register' size='sm'>Register</Button>
                </div>
            </div>
        </header>

    );
}