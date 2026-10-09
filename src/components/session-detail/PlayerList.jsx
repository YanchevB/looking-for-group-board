import { extractInitial } from '../../utils/extractInitial';
import './session-details.css';

//TODO: Replace default players/maxSlots with real session data once fetching is wired up
export default function PlayerList({
    players,
    slots,
    ownerId
}) {
    return (
        <div className="session-details__section">
            <h2 className="session-details__section-title">
                Players ({players.length} / {slots})
            </h2>
            <div className="session-details__players">
                {players.map((player) => (
                    <div
                        key={player.user_id}
                        className={`session-details__player${player.user_id === ownerId ? ' session-details__player--host' : ''}`}
                    >
                        <span className="session-details__player-avatar">{extractInitial(player.player.username)}</span>
                        <span className="session-details__player-name">{player.player.username}</span>
                        {/* TODO: Add 'You' when User Auth is done */}
                        <span className="session-details__player-tag">{player.user_id === ownerId ? 'Host' : ''}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
