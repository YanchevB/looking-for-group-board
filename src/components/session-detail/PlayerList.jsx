import './session-details.css';

//TODO: Replace default players/maxSlots with real session data once fetching is wired up
export default function PlayerList({
    players = [
        { id: 1, initials: 'V', name: 'Vantage_', tag: 'Host', isHost: true },
        { id: 2, initials: 'DK', name: 'DarkKnight92', tag: 'You', isHost: false }
    ],
    maxSlots = 5
}) {
    return (
        <div className="session-details__section">
            <h2 className="session-details__section-title">
                Players ({players.length} / {maxSlots})
            </h2>
            <div className="session-details__players">
                {players.map((player) => (
                    <div
                        key={player.id}
                        className={`session-details__player${player.isHost ? ' session-details__player--host' : ''}`}
                    >
                        <span className="session-details__player-avatar">{player.initials}</span>
                        <span className="session-details__player-name">{player.name}</span>
                        <span className="session-details__player-tag">{player.tag}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
