//TODO: Add other variants for action area
import './session-details.css';
import PlayerList from './PlayerList';
import SessionActions from './SessionActions';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import StatusBadge from '../shared/StatusBadge';

export default function SessionDetailPage() {
    return (
        <main className="page-main">
            <div className="container">
                <div className="session-details">
                    <div className="session-details__header">
                        <div className="session-details__title-group">
                            <h1 className="session-details__title">Valorant — Ranked duo grind</h1>
                            <span className="session-details__platform">PC</span>
                        </div>
                        <StatusBadge sessionStatus='open'/>
                    </div>
                    <div className="session-details__meta">
                        <span className="session-details__meta-item">
                            Players: <span className="session-details__meta-value">2 / 5</span>
                        </span>
                        <span className="session-details__meta-item">
                            Mic: <span className="session-details__meta-value">Required</span>
                        </span>
                        <span className="session-details__meta-item">
                            Hosted by: <span className="session-details__meta-value">Vantage_</span>
                        </span>
                        <span className="session-details__meta-item">
                            Started:{" "}
                            <span className="session-details__meta-value">12 minutes ago</span>
                        </span>
                    </div>
                    <div className="session-details__body">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "var(--space-6)"
                            }}
                        >
                            <div className="session-details__section">
                                <h2 className="session-details__section-title">Description</h2>
                                <p className="session-details__description">
                                    Ranked grind, need a duo who can play Sentinel. Comms preferred but
                                    not mandatory — just don't be toxic if we drop a round. Currently
                                    Diamond 2, aiming for Immortal before the act ends.
                                </p>
                            </div>

                            <PlayerList />

                        </div>

                        <SessionActions />

                    </div>
                    {/* ================= COMMENTS ================= */}
                    <div className="session-details__section">

                        <CommentList />

                        <CommentForm />

                    </div>
                </div>
            </div>
        </main>
    );
}