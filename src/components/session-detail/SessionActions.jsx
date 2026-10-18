import './session-details.css';
import Button from '../shared/Button';
import ErrorMessage from '../shared/ErrorMessage';
import useAuth from '../../hooks/useAuth';

export default function SessionActions({
    session,
    isOwner,
    isMember,
    isFull,
    error,
    isActing,
    onDelete,
    onJoin,
    onLeave,
    onClose,
    onOpen
}) {
    const { user } = useAuth();

    // Order matters: each check assumes the ones above it didn't match
    if (isOwner) {
        return (
            <aside className="session-details__actions surface">
                <span className="session-details__actions-title">Manage session</span>
                {error && <ErrorMessage title="Something went wrong" text={error} />}
                <div className="session-details__owner-actions">
                    <Button variant='secondary' size='block' to={`/edit/${session.id}`}>Edit session</Button>
                    <Button type='button' variant='secondary' size='block' onClick={session.is_closed ? onOpen : onClose} disabled={isActing}>
                        {isActing
                            ? (session.is_closed ? 'Reopening…' : 'Closing…')
                            : (session.is_closed ? 'Reopen session' : 'Close session')}
                    </Button>
                    <Button type='button' variant='danger' size='block' onClick={onDelete} disabled={isActing}>
                        {isActing ? 'Deleting…' : 'Delete session'}
                    </Button>
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
                <Button type='button' variant='danger' size='block' disabled={isActing} onClick={onLeave}>
                    {isActing ? 'Leaving…' : 'Leave session'}
                </Button>
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
            <Button type='button' size='block' disabled={isActing} onClick={onJoin}>
                {isActing ? 'Joining…' : 'Join session'}
            </Button>
        </aside>
    );
}
