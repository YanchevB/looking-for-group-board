import './session-details.css';
import Button from '../shared/Button';
import supabase from '../../lib/supabase';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import ErrorMessage from '../shared/ErrorMessage';
import useAuth from '../../hooks/useAuth';

//TODO: Wire up Join, Leave and Close/Reopen handlers (refresh the session after each one)
export default function SessionActions({
    isOwner,
    isMember,
    isFull,
    session
}) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const deleteHandler = async () => {
        if (!confirm('Are you sure you want to delete this session?')) {
            return;
        }

        setError(null);
        const { error: deleteError } = await supabase
            .from('sessions')
            .delete()
            .eq('id', session.id);

        if (deleteError) {
            setError(deleteError.message);
            return;
        }

        navigate('/catalog');
    }

    // Order matters: each check assumes the ones above it didn't match
    if (isOwner) {
        return (
            <aside className="session-details__actions surface">
                <span className="session-details__actions-title">Manage session</span>
                {error && <ErrorMessage title="Something went wrong" text={error} />}
                <div className="session-details__owner-actions">
                    <Button variant='secondary' size='block' to={`/edit/${session.id}`}>Edit session</Button>
                    <Button type='button' variant='secondary' size='block'>
                        {session.is_closed ? 'Reopen session' : 'Close session'}
                    </Button>
                    <Button type='button' variant='danger' size='block' onClick={deleteHandler}>Delete session</Button>
                </div>
            </aside>
        );
    }

    if (!user) {
        return (
            <aside className="session-details__actions surface">
                <span className="session-details__actions-title">Your status</span>
                <div className="session-details__notice">
                    You need an account to join this session.
                </div>
                <Button to='/login' size='block'>Log in to join</Button>
            </aside>
        );
    }

    if (isMember) {
        return (
            <aside className="session-details__actions surface">
                <span className="session-details__actions-title">Your status</span>
                {error && <ErrorMessage title="Couldn't leave session" text={error} />}
                <p style={{ color: "var(--color-text-muted)", fontSize: "var(--fs-sm)" }}>
                    You're in this session. See you in the lobby!
                </p>
                <Button type='button' variant='danger' size='block'>Leave session</Button>
            </aside>
        );
    }

    if (session.is_closed) {
        return (
            <aside className="session-details__actions surface">
                <span className="session-details__actions-title">Your status</span>
                <div className="session-details__notice">
                    The host has closed this session. No new players can join.
                </div>
                <Button type='button' size='block' disabled>Session is closed</Button>
            </aside>
        );
    }

    if (isFull) {
        return (
            <aside className="session-details__actions surface">
                <span className="session-details__actions-title">Your status</span>
                <div className="session-details__notice">
                    All {session.slots} slots are taken. You can still watch the comments for updates.
                </div>
                <Button type='button' size='block' disabled>Session is full</Button>
            </aside>
        );
    }

    return (
        <aside className="session-details__actions surface">
            <span className="session-details__actions-title">Your status</span>
            {error && <ErrorMessage title="Couldn't join session" text={error} />}
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--fs-sm)" }}>
                There's still room in this session.
            </p>
            <Button type='button' size='block'>Join session</Button>
        </aside>
    );
}
