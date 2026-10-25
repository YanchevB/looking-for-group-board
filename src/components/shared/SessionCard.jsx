import './session-card.css'
import Button from './Button';
import StatusBadge from './StatusBadge';
import { getSessionStatus } from '../../utils/sessionStatus';

export default function SessionCard({
    session,
    actionLabel = 'View'
}) {
    const playerCount = session.session_players[0].count;
    const sessionStatus = getSessionStatus(session, playerCount);

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
                    <span className="session-card__slots">{playerCount} / {session.slots}</span> players
                </span>
                {session.mic_required
                    ? <span className="session-card__meta-item">
                        <span className="session-card__mic-icon" aria-hidden="true">
                            🎙️
                        </span>{" "}
                        Mic required
                    </span>
                    : <span className="session-card__meta-item">
                        <span className="session-card__mic-icon" aria-hidden="true">
                            🔇
                        </span>
                        No mic needed
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