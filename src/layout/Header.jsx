import '../styles/header.css';

export default function Header() {
    // TODO: branch on auth state once useAuth()/AuthContext exists.
    // Logged-in variant (from home.html reference block):
    //   nav: Home, Catalog, Create, My Sessions
    //   actions: <span className="site-header__user">...avatar+name...</span>, Logout  button
    return (
        <header class="site-header">
            <div class="container site-header__inner">
                <a href="home.html" class="site-header__brand">
                    <span class="site-header__brand-mark">LFG</span>
                    LFG Board
                </a>
                <nav class="site-header__nav" aria-label="Main navigation">
                    <a href="home.html" class="site-header__link site-header__link--active">Home</a>
                    <a href="catalog.html" class="site-header__link">Catalog</a>
                </nav>
                <div class="site-header__actions">
                    <a href="login.html" class="btn btn--ghost btn--sm">Log in</a>
                    <a href="register.html" class="btn btn--primary btn--sm">Register</a>
                </div>
            </div>
        </header>
    );
}