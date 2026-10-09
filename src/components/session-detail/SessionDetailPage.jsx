//TODO: Add other variants for action area
import './session-details.css';
import PlayerList from './PlayerList';
import SessionActions from './SessionActions';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import StatusBadge from '../shared/StatusBadge';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Spinner from '../shared/Spinner';
import { timeAgo } from '../../utils/time';

export default function SessionDetailPage() {
    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [session, setSession] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${BASE_URL}sessions?id=eq.${id}&select=*,owner:profiles!owner_id(username),session_players(user_id,player:profiles!user_id(username)),comments(id,text,created_at,user_id,author:profiles!user_id(username))&comments.order=created_at.asc`, {
            headers: {
                'apiKey': import.meta.env.VITE_API_KEY
            }
        })
            .then(res => res.json())
            .then(data => setSession(data[0]))
            .catch(err => alert(err))
            .finally(() => setIsLoading(false))
    }, [id]);

    return (
        <main className="page-main">
            <div className="container">
                {isLoading && <Spinner />}
                {!isLoading && 
                    <div className="session-details">
                        <div className="session-details__header">
                            <div className="session-details__title-group">
                                <h1 className="session-details__title">{session.game}</h1>
                                <span className="session-details__platform">{session.platform}</span>
                            </div>
                            {!session.is_closed &&
                                session.session_players?.length < session.slots &&
                                <StatusBadge sessionStatus='open' />}

                            {!session.is_closed &&
                                session.session_players?.length >= session.slots &&
                                <StatusBadge sessionStatus='full' />}

                            {session.is_closed &&
                                <StatusBadge sessionStatus='closed' />}
                        </div>
                        <div className="session-details__meta">
                            <span className="session-details__meta-item">
                                Players: <span className="session-details__meta-value">{session.session_players?.length} / {session.slots}</span>
                            </span>
                            {session.mic_required && <span className="session-details__meta-item">
                                Mic: <span className="session-details__meta-value">Required</span>
                            </span>}
                            <span className="session-details__meta-item">
                                Hosted by: <span className="session-details__meta-value">{session.owner?.username}</span>
                            </span>
                            {/* TODO: Calculate time from session.created_at */}
                            <span className="session-details__meta-item">
                                Started:{" "}
                                <span className="session-details__meta-value">{timeAgo(session.created_at)}</span>
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
                                        {session.description}
                                    </p>
                                </div>

                                <PlayerList players={session.session_players} slots={session.slots} ownerId={session.owner_id} />

                            </div>

                            <SessionActions />

                        </div>
                        {/* ================= COMMENTS ================= */}
                        <div className="session-details__section">

                            <CommentList />

                            <CommentForm />

                        </div>
                    </div>}
                
            </div>
        </main>
    );
}