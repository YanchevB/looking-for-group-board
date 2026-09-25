//TODO: Change imports once individual components are created
//TODO: Add other variants for action area
import '../styles/button.css';
import '../styles/form.css';
import '../styles/status-badge.css';
import '../styles/session-details.css';
import '../styles/comments.css';

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
                        <span className="status-badge status-badge--open">
                            <span className="status-badge__dot" />
                            Open
                        </span>
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
                            <div className="session-details__section">
                                <h2 className="session-details__section-title">Players (2 / 5)</h2>
                                <div className="session-details__players">
                                    <div className="session-details__player session-details__player--host">
                                        <span className="session-details__player-avatar">V</span>
                                        <span className="session-details__player-name">Vantage_</span>
                                        <span className="session-details__player-tag">Host</span>
                                    </div>
                                    <div className="session-details__player">
                                        <span className="session-details__player-avatar">DK</span>
                                        <span className="session-details__player-name">DarkKnight92</span>
                                        <span className="session-details__player-tag">You</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <aside className="session-details__actions surface">
                            <span className="session-details__actions-title">Your status</span>
                            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--fs-sm)" }}>
                                You're in this session. See you in the lobby!
                            </p>
                            <button type="button" className="btn btn--danger btn--block">
                                Leave session
                            </button>
                        </aside>
                    </div>
                    {/* ================= COMMENTS ================= */}
                    <div className="session-details__section">
                        <div className="comments">
                            <h2 className="comments__title">Comments</h2>
                            <div className="comments__list">
                                <div className="comment">
                                    <span className="comment__avatar">V</span>
                                    <div className="comment__body">
                                        <div className="comment__header">
                                            <span className="comment__author">Vantage_</span>
                                            <span className="comment__time">14 minutes ago</span>
                                        </div>
                                        <p className="comment__text">
                                            Invite is sent, hop in whenever you're ready!
                                        </p>
                                    </div>
                                </div>
                                <div className="comment">
                                    <span className="comment__avatar">RJ</span>
                                    <div className="comment__body">
                                        <div className="comment__header">
                                            <span className="comment__author">RaeJinx</span>
                                            <span className="comment__time">10 minutes ago</span>
                                        </div>
                                        <p className="comment__text">
                                            Can I spectate if a slot doesn't open up?
                                        </p>
                                    </div>
                                </div>
                                {/* Own comment — shows the delete button variant */}
                                <div className="comment">
                                    <span className="comment__avatar">DK</span>
                                    <div className="comment__body">
                                        <div className="comment__header">
                                            <span className="comment__author">DarkKnight92</span>
                                            <span className="comment__time">2 minutes ago</span>
                                        </div>
                                        <p className="comment__text">Joined! Switching to Sentinel now.</p>
                                        <div className="comment__footer">
                                            <button type="button" className="comment__delete">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form className="comments__form">
                                <div className="comments__form-row">
                                    <label className="visually-hidden" htmlFor="comment-text">
                                        Add a comment
                                    </label>
                                    <textarea
                                        id="comment-text"
                                        className="form__textarea"
                                        placeholder="Say something to the group…"
                                        defaultValue={""}
                                    />
                                    <button type="submit" className="btn btn--primary">
                                        Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}