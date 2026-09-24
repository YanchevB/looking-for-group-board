import '../styles/header.css';

export default function Header() {
    // TODO: branch on auth state once useAuth()/AuthContext exists.
    // Logged-in variant (from home.html reference block):
    //   nav: Home, Catalog, Create, My Sessions
    //   actions: <span className="site-header__user">...avatar+name...</span>, Logout  button
    return (
        <header className="site-header">
            <div className="container site-header__inner">
                <a href="home.html" className="site-header__brand">
                    <span className="site-header__brand-mark">LFG</span>
                    LFG Board
                </a>
                <nav className="site-header__nav" aria-label="Main navigation">
                    <a
                        href="home.html"
                        className="site-header__link site-header__link--active"
                    >
                        Home
                    </a>
                    <a href="catalog.html" className="site-header__link">
                        Catalog
                    </a>
                </nav>
                <div className="site-header__actions">
                    <a href="login.html" className="btn btn--ghost btn--sm">
                        Log in
                    </a>
                    <a href="register.html" className="btn btn--primary btn--sm">
                        Register
                    </a>
                </div>
            </div>
        </header>

    );
}