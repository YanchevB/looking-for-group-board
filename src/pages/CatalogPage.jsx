//TODO: Change imports once individual components are created
import '../styles/button.css';
import '../styles/session-card.css';
import '../styles/status-badge.css';
import '../styles/feedback.css';

export default function CatalogPage() {
    return (
        <section className="section">
            <div className="section__heading">
                <h1>Open sessions</h1>
                <a href="create.html" className="btn btn--primary btn--sm">
                    Host a session
                </a>
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
                        Ranked grind, need a duo who can play Sentinel. Chill vibes only.
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
                <article className="session-card session-card--full">
                    <div className="session-card__header">
                        <div>
                            <div className="session-card__game">Halo Infinite</div>
                            <div className="session-card__platform">Xbox</div>
                        </div>
                        <span className="status-badge status-badge--full">
                            <span className="status-badge__dot" />
                            Full
                        </span>
                    </div>
                    <div className="session-card__meta">
                        <span className="session-card__meta-item">
                            <span className="session-card__slots">4 / 4</span> players
                        </span>
                        <span className="session-card__meta-item">
                            <span className="session-card__mic-icon" aria-hidden="true">
                                🎙️
                            </span>{" "}
                            Mic required
                        </span>
                    </div>
                    <p className="session-card__description">
                        Squad is full for social slayer, but feel free to spectate on stream.
                    </p>
                    <div className="session-card__footer">
                        <span className="session-card__host">
                            Host: <span className="session-card__host-name">ChiefFan117</span>
                        </span>
                        <a href="details.html" className="btn btn--secondary btn--sm">
                            View
                        </a>
                    </div>
                </article>
                <article className="session-card">
                    <div className="session-card__header">
                        <div>
                            <div className="session-card__game">Stardew Valley</div>
                            <div className="session-card__platform">Switch</div>
                        </div>
                        <span className="status-badge status-badge--open">
                            <span className="status-badge__dot" />
                            Open
                        </span>
                    </div>
                    <div className="session-card__meta">
                        <span className="session-card__meta-item">
                            <span className="session-card__slots">1 / 4</span> players
                        </span>
                        <span className="session-card__meta-item">
                            <span className="session-card__mic-icon" aria-hidden="true">
                                🔇
                            </span>{" "}
                            No mic needed
                        </span>
                    </div>
                    <p className="session-card__description">
                        Slow farm co-op, mostly fishing and gifting NPCs. New players welcome.
                    </p>
                    <div className="session-card__footer">
                        <span className="session-card__host">
                            Host: <span className="session-card__host-name">Junimo_Fan</span>
                        </span>
                        <a href="details.html" className="btn btn--secondary btn--sm">
                            View
                        </a>
                    </div>
                </article>
                <article className="session-card session-card--closed">
                    <div className="session-card__header">
                        <div>
                            <div className="session-card__game">Elden Ring</div>
                            <div className="session-card__platform">PS5</div>
                        </div>
                        <span className="status-badge status-badge--closed">
                            <span className="status-badge__dot" />
                            Closed
                        </span>
                    </div>
                    <div className="session-card__meta">
                        <span className="session-card__meta-item">
                            <span className="session-card__slots">2 / 2</span> players
                        </span>
                        <span className="session-card__meta-item">
                            <span className="session-card__mic-icon" aria-hidden="true">
                                🎙️
                            </span>{" "}
                            Mic required
                        </span>
                    </div>
                    <p className="session-card__description">
                        Malenia co-op run, we already started — check back later.
                    </p>
                    <div className="session-card__footer">
                        <span className="session-card__host">
                            Host: <span className="session-card__host-name">TarnishedTwo</span>
                        </span>
                        <a href="details.html" className="btn btn--secondary btn--sm">
                            View
                        </a>
                    </div>
                </article>
                <article className="session-card">
                    <div className="session-card__header">
                        <div>
                            <div className="session-card__game">Rocket League</div>
                            <div className="session-card__platform">Cross-platform</div>
                        </div>
                        <span className="status-badge status-badge--open">
                            <span className="status-badge__dot" />
                            Open
                        </span>
                    </div>
                    <div className="session-card__meta">
                        <span className="session-card__meta-item">
                            <span className="session-card__slots">2 / 3</span> players
                        </span>
                        <span className="session-card__meta-item">
                            <span className="session-card__mic-icon" aria-hidden="true">
                                🔇
                            </span>{" "}
                            No mic needed
                        </span>
                    </div>
                    <p className="session-card__description">
                        Casual 3s, just want to have fun and hit some flashy goals.
                    </p>
                    <div className="session-card__footer">
                        <span className="session-card__host">
                            Host: <span className="session-card__host-name">AerialAce</span>
                        </span>
                        <a href="details.html" className="btn btn--secondary btn--sm">
                            View
                        </a>
                    </div>
                </article>
            </div>
        </section>

    );
}