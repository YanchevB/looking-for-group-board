import useAuth from '../../hooks/useAuth';
import { extractInitial } from '../../utils/extractInitial';
import './session-details.css';

export default function PlayerList({
    players,
    slots,
    ownerId
}) {
    const { user } = useAuth();
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
                        {player.user_id === ownerId &&
                            <span className="session-details__player-tag">Host</span>
                        }
                        {player.user_id !== ownerId && player.user_id === user?.id &&
                            <span className="session-details__player-tag">You</span>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
