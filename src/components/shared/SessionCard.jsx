import './session-card.css'
import Button from './Button';
import StatusBadge from './StatusBadge';

export default function SessionCard({
    session,
    sessionStatus = 'open',
    actionLabel = 'View'
}) {
    return (
        <article className={`session-card session-card--${sessionStatus}`}>
            <div className="session-card__header">
                <div>
                    <div className="session-card__game">Valorant</div>
                    <div className="session-card__platform">PC</div>
                </div>
                <StatusBadge sessionStatus={sessionStatus} />
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
                {/* TODO: Add session id to details */}
                <Button to='/details' variant="secondary" size="sm">{actionLabel}</Button>
            </div>
        </article>
    );
}