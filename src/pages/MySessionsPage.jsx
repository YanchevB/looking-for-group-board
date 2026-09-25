//TODO: Change imports once individual components are created
//TODO: Add empty and loading states
import '../styles/button.css';
import '../styles/session-card.css';
import '../styles/status-badge.css';
import '../styles/feedback.css';

export default function MySessionsPage() {
    return (
        <main className="page-main">
            <div className="container">
                <h1 style={{ marginBottom: "var(--space-6)" }}>My sessions</h1>

                <section className="section">
                    <div className="section__heading">
                        <h2>Hosting</h2>
                        <a href="create.html" className="btn btn--primary btn--sm">
                            Host a session
                        </a>
                    </div>

                    <div className="session-grid">
                        <article className="session-card">
                            <div className="session-card__header">
                                <div>
                                    <div className="session-card__game">Elden Ring</div>
                                    <div className="session-card__platform">PS5</div>
                                </div>
                                <span className="status-badge status-badge--open">
                                    <span className="status-badge__dot" />
                                    Open
                                </span>
                            </div>
                            <div className="session-card__meta">
                                <span className="session-card__meta-item">
                                    <span className="session-card__slots">1 / 2</span> players
                                </span>
                                <span className="session-card__meta-item">
                                    <span className="session-card__mic-icon" aria-hidden="true">
                                        🎙️
                                    </span>{" "}
                                    Mic required
                                </span>
                            </div>
                            <p className="session-card__description">
                                Looking for a co-op partner to clear the DLC bosses.
                            </p>
                            <div className="session-card__footer">
                                <span className="session-card__host">You're hosting</span>
                                <a href="details.html" className="btn btn--secondary btn--sm">
                                    Manage
                                </a>
                            </div>
                        </article>

                        <article className="session-card session-card--closed">
                            <div className="session-card__header">
                                <div>
                                    <div className="session-card__game">Apex Legends</div>
                                    <div className="session-card__platform">PC</div>
                                </div>
                                <span className="status-badge status-badge--closed">
                                    <span className="status-badge__dot" />
                                    Closed
                                </span>
                            </div>
                            <div className="session-card__meta">
                                <span className="session-card__meta-item">
                                    <span className="session-card__slots">3 / 3</span> players
                                </span>
                                <span className="session-card__meta-item">
                                    <span className="session-card__mic-icon" aria-hidden="true">
                                        🎙️
                                    </span>{" "}
                                    Mic required
                                </span>
                            </div>
                            <p className="session-card__description">
                                Ranked squad, already in-game — closed to keep the lobby tidy.
                            </p>
                            <div className="session-card__footer">
                                <span className="session-card__host">You're hosting</span>
                                <a href="details.html" className="btn btn--secondary btn--sm">
                                    Manage
                                </a>
                            </div>
                        </article>
                    </div>
                </section>

                <section className="section">
                    <div className="section__heading">
                        <h2>Joined</h2>
                    </div>

                    <div className="session-grid">
                        <article className="session-card">
                            <div className="session-card__header">
                                <div>
                                    <div className="session-card__game">Valorant</div>
                                    <div className="session-card__platform">PC</div>
                                </div>
                                <span className="status-badge status-badge--open">
                                    <span className="status-badge__dot" />
                                    Open
                                </span>
                            </div>
                            <div className="session-card__meta">
                                <span className="session-card__meta-item">
                                    <span className="session-card__slots">2 / 5</span> players
                                </span>
                                <span className="session-card__meta-item">
                                    <span className="session-card__mic-icon" aria-hidden="true">
                                        🎙️
                                    </span>{" "}
                                    Mic required
                                </span>
                            </div>
                            <p className="session-card__description">
                                Ranked grind, need a duo who can play Sentinel.
                            </p>
                            <div className="session-card__footer">
                                <span className="session-card__host">
                                    Host: <span className="session-card__host-name">Vantage_</span>
                                </span>
                                <a href="details.html" className="btn btn--secondary btn--sm">
                                    View
                                </a>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </main>
    );
}
