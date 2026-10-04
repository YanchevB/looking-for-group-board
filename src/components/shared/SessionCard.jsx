import './session-card.css'
import Button from './Button';
import StatusBadge from './StatusBadge';

export default function SessionCard({
    session,
    sessionStatus = 'open',
    actionLabel = 'View'
}) {
    
    if (session.is_closed) {
        sessionStatus = 'closed';
    }

    return (
        <article className={`session-card session-card--${sessionStatus}`}>
            <div className="session-card__header">
                <div>
                    <div className="session-card__game">{session.game}</div>
                    <div className="session-card__platform">{session.platform}</div>
                </div>
                <StatusBadge sessionStatus={sessionStatus} />
            </div>
            <div className="session-card__meta">
                <span className="session-card__meta-item">
                    <span className="session-card__slots">{session.session_players[0].count} / {session.slots}</span> players
                </span>
                {session.mic_required && <span className="session-card__meta-item">
                    <span className="session-card__mic-icon" aria-hidden="true">
                        🎙️
                    </span>{" "}
                    Mic required
                </span>}  
            </div>
            <p className="session-card__description">
                {session.description}
            </p>
            <div className="session-card__footer">
                <span className="session-card__host">
                    Host: <span className="session-card__host-name">{session.owner.username}</span>
                </span>
                <Button to={`/details/${session.id}`} variant="secondary" size="sm">{actionLabel}</Button>
            </div>
        </article>
    );
}