//TODO: Change imports once individual components are created
import '../shared/feedback.css';
import Button from '../shared/Button';
import SessionCard from '../shared/SessionCard';
import { useEffect, useState } from 'react';
import EmptyState from '../shared/EmptyState';
import Spinner from '../shared/Spinner';

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function CatalogPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(BASE_URL + 'sessions?select=*,owner:profiles!owner_id(username),session_players(count)', {
            signal: abortController.signal,
            headers: {
                'apiKey': import.meta.env.VITE_API_KEY
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            return response.json()
        })
        .then(data => setSessions(data))
        .catch(err => {
            // Aborted on unmount (or StrictMode's dev remount) — not a real error
            if (err.name === 'AbortError') {
                return;
            }

            alert(err);
        })
        .finally(() => {
            if (!abortController.signal.aborted) {
                setIsLoading(false);
            }
        });

        return () => {
            abortController.abort()
        };
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