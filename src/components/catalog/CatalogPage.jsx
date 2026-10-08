//TODO: Change imports once individual components are created
import '../shared/feedback.css';
import Button from '../shared/Button';
import SessionCard from '../shared/SessionCard';
import { useEffect, useState } from 'react';
import EmptyState from '../shared/EmptyState';
import Spinner from '../shared/Spinner';

export default function CatalogPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [sessions, setSessions] = useState([]);
    const BASE_URL = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        fetch(BASE_URL + 'sessions?select=*,owner:profiles!owner_id(username),session_players(count)', {
            headers: {
                'apiKey': import.meta.env.VITE_API_KEY
            }
        })
        .then(response => response.json())
        .then(data => setSessions(data))
        .catch(err => alert(err))
        .finally(() => setIsLoading(false));
    },[]);
    
    return (
        <main className="page-main">
            <div className="container">
                {isLoading && <Spinner />}
                {!isLoading && sessions.length > 0 && 
                    <section className="section">
                        <div className="section__heading">
                            <h1>Open sessions</h1>
                            <Button to='/create' size='sm'>Host a session</Button>
                        </div>
                        <div className="session-grid">
                            {sessions.map(
                                session => <SessionCard key={session.id} session={session} />
                            )}
                        </div>
                    </section>
                }
                {!isLoading && sessions.length === 0 && <EmptyState />}
            </div>
        </main>
    );
}