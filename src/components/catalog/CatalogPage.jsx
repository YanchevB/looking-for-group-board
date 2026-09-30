//TODO: Change imports once individual components are created
import '../shared/feedback.css';
import Button from '../shared/Button';
import SessionCard from '../shared/SessionCard';
import { useEffect, useState } from 'react';

export default function CatalogPage() {
    const [sessions, setSessions] = useState([]);
    const BASE_URL = 'https://lzjxpomifimexeopgnpj.supabase.co/rest/v1/'

    useEffect(() => {
        fetch(BASE_URL + 'sessions', {
            headers: {
                'apiKey': import.meta.env.VITE_API_KEY
            }
        })
        .then(response => response.json())
        .then(data => setSessions(data))
        .catch(err => alert(err))
    },[]);
    
    return (
        <main className="page-main">
            <div className="container">
                <section className="section">
                    <div className="section__heading">
                        <h1>Open sessions</h1>
                        <Button to='/create' size='sm'>Host a session</Button>
                    </div>
                    <div className="session-grid">
                        <SessionCard sessionStatus={'full'}/>

                        <SessionCard sessionStatus={'closed'} />

                        <SessionCard />
                    </div>
                </section>
            </div>
        </main>
    );
}