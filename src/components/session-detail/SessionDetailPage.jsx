import './session-details.css';
import PlayerList from './PlayerList';
import SessionActions from './SessionActions';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import StatusBadge from '../shared/StatusBadge';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import Spinner from '../shared/Spinner';
import supabase from '../../lib/supabase';
import { timeAgo } from '../../utils/time';
import { getSessionStatus } from '../../utils/sessionStatus';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import ErrorMessage from '../shared/ErrorMessage';

export default function SessionDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [actionError, setActionError] = useState(null);
    const [isActing, setIsActing] = useState(false);

    const { user } = useAuth();

    const { data, isLoading, error, refetch } =
        useFetch(`sessions?id=eq.${id}&select=*,owner:profiles!owner_id(username),session_players(user_id,player:profiles!user_id(username)),comments(id,text,created_at,user_id,author:profiles!user_id(username))&comments.order=created_at.asc`);

    const session = data?.[0] ?? {};

    // Keep the action buttons disabled until the refetched data arrives, then re-enable them
    const [prevData, setPrevData] = useState(data);
    if (data !== prevData) {
        setPrevData(data);
        setIsActing(false);
    }

    if (data && !data[0]) {
        return <Navigate to="/404" replace />;
    }

    const isOwner = user?.id === session.owner_id;
    const isMember = session.session_players?.some(player => player.user_id === user?.id);
    const isFull = session.session_players?.length >= session.slots;

    const deleteHandler = async () => {
        if (!confirm('Are you sure you want to delete this session?')) {
            return;
        }

        setActionError(null);
        setIsActing(true);

        try {
            const { error: deleteError } = await supabase
                .from('sessions')
                .delete()
                .eq('id', session.id);

            if (deleteError) throw deleteError;

            navigate('/catalog');
        } catch (error) {
            setActionError(error.message);
            setIsActing(false);
        }
    }

    // Shared flow for actions that stay on the page: clear the old error, disable the buttons, refetch on success
    const runAction = async (request) => {
        setActionError(null);
        setIsActing(true);

        try {
            const { error: requestError } = await request();

            if (requestError) throw requestError;

            refetch();
        } catch (error) {
            setActionError(error.message);
            setIsActing(false);
        }
    }

    const joinHandler = () => runAction(() =>
        supabase
            .from('session_players')
            .insert({ session_id: id }));

    const leaveHandler = () => runAction(() =>
        supabase
            .from('session_players')
            .delete()
            .eq('session_id', id)
            .eq('user_id', user.id));

    const closeSessionHandler = () => runAction(() =>
        supabase
            .from('sessions')
            .update({ is_closed: true })
            .eq('id', session.id));

    const openSessionHandler = () => runAction(() =>
        supabase
            .from('sessions')
            .update({ is_closed: false })
            .eq('id', session.id));

    return (
        <main className="page-main">
            <div className="container">
                {isLoading && <Spinner />}
                {!isLoading && error && <ErrorMessage text={error} />}
                {!isLoading && !error &&
                    <div className="session-details">
                        <div className="session-details__header">
                            <div className="session-details__title-group">
                                <h1 className="session-details__title">{session.game}</h1>
                                <span className="session-details__platform">{session.platform}</span>
                            </div>
                            <StatusBadge sessionStatus={getSessionStatus(session, session.session_players?.length)} />
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

                            <SessionActions 
                                session={session} 
                                isOwner={isOwner} 
                                isMember={isMember} 
                                isFull={isFull} 
                                error={actionError}
                                isActing={isActing}
                                onDelete={deleteHandler}
                                onJoin={joinHandler}
                                onLeave={leaveHandler}
                                onClose={closeSessionHandler}
                                onOpen={openSessionHandler}
                            />

                        </div>
                        {/* ================= COMMENTS ================= */}
                        <div className="session-details__section">

                            <CommentList comments={session.comments} ownerId={session.owner_id} />

                            <CommentForm sessionId={id} onPosted={refetch} />

                        </div>
                    </div>}

            </div>
        </main>
    );
}