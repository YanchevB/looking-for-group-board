import '../shared/feedback.css';
import Button from '../shared/Button';
import SessionCard from '../shared/SessionCard';
import EmptyState from '../shared/EmptyState';
import Spinner from '../shared/Spinner';
import ErrorMessage from '../shared/ErrorMessage';
import useFetch from '../../hooks/useFetch';

export default function CatalogPage() {
    const { data: sessions, isLoading, error } =
        useFetch('sessions?select=*,owner:profiles!owner_id(username),session_players(count)&order=created_at.desc');

    return (
        <main className="page-main">
            <div className="container">
                {isLoading && <Spinner />}
                {!isLoading && error && <ErrorMessage text={error} />}
                {!isLoading && !error && sessions.length > 0 && 
                    <section className="section">
                        <div className="section__heading">
                            <h1>Current sessions</h1>
                            <Button to='/create' size='sm'>Host a session</Button>
                        </div>
                        <div className="session-grid">
                            {sessions.map(
                                session => <SessionCard key={session.id} session={session} />
                            )}
                        </div>
                    </section>
                }
                {!isLoading && !error && sessions.length === 0 && <EmptyState />}
            </div>
        </main>
    );
}