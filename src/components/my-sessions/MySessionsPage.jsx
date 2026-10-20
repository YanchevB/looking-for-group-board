import '../shared/feedback.css';
import Button from '../shared/Button';
import SessionCard from '../shared/SessionCard';
import EmptyState from '../shared/EmptyState';
import Spinner from '../shared/Spinner';
import ErrorMessage from '../shared/ErrorMessage';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';

const SESSION_SELECT = 'select=*,owner:profiles!owner_id(username),session_players(count)';

export default function MySessionsPage() {
    const { user } = useAuth();

    const hosting = useFetch(`sessions?owner_id=eq.${user.id}&${SESSION_SELECT}`);
    // `me` is a second, filtered embed of session_players: !inner keeps only sessions the user has a row in,
    // while session_players(count) above still counts every player
    const joined = useFetch(`sessions?owner_id=neq.${user.id}&me.user_id=eq.${user.id}&${SESSION_SELECT},me:session_players!inner(user_id)`);

    const isLoading = hosting.isLoading || joined.isLoading;
    const error = hosting.error || joined.error;

    return (
        <main className="page-main">
            <div className="container">
                <h1 style={{ marginBottom: "var(--space-6)" }}>My sessions</h1>

                {isLoading && <Spinner />}
                {!isLoading && error && <ErrorMessage text={error} />}
                {!isLoading && !error && <>
                    <section className="section">
                        <div className="section__heading">
                            <h2>Hosting</h2>
                            {hosting.data.length > 0 && 
                                <Button to='/create' size='sm'>Host a session</Button>
                            } 
                            
                        </div>

                        {hosting.data.length > 0
                            ? <div className="session-grid">
                                {hosting.data.map(
                                    session => <SessionCard key={session.id} session={session} actionLabel='Manage' />
                                )}
                            </div>
                            : <EmptyState
                                title="You're not hosting any sessions"
                                text='Host one and other players can join you.'
                            />}
                    </section>

                    <section className="section">
                        <div className="section__heading">
                            <h2>Joined</h2>
                        </div>

                        {joined.data.length > 0
                            ? <div className="session-grid">
                                {joined.data.map(
                                    session => <SessionCard key={session.id} session={session} />
                                )}
                            </div>
                            : <EmptyState
                                icon='🔍'
                                title="You haven't joined any sessions"
                                text='Find a group in the catalog.'
                                actionLabel='Browse sessions'
                                actionTo='/catalog'
                            />}
                    </section>
                </>}
            </div>
        </main>
    );
}
