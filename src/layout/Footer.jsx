import '../styles/footer.css';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container site-footer__inner">
                <p className="site-footer__text">
                    © 2026 LFG Board — a SoftUni course project.
                </p>
                
                {/* <div className="site-footer__links">
                    <a href="catalog.html" className="site-footer__link">
                        Catalog
                    </a>
                    <a href="login.html" className="site-footer__link">
                        Log in
                    </a>
                </div> */}
            </div>
        </footer>
    );
}