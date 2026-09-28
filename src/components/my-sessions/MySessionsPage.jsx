//TODO: Add empty and loading states
import '../shared/feedback.css';
import Button from '../shared/Button';
import SessionCard from '../shared/SessionCard';

export default function MySessionsPage() {
    return (
        <main className="page-main">
            <div className="container">
                <h1 style={{ marginBottom: "var(--space-6)" }}>My sessions</h1>

                <section className="section">
                    <div className="section__heading">
                        <h2>Hosting</h2>
                        <Button to='/create' size='sm'>Host a session</Button>
                    </div>

                    <div className="session-grid">
                        <SessionCard actionLabel='Manage'/>

                        <SessionCard sessionStatus='closed' actionLabel='Manage'/>
                    </div>
                </section>

                <section className="section">
                    <div className="section__heading">
                        <h2>Joined</h2>
                    </div>

                    <div className="session-grid">
                        <SessionCard />
                    </div>
                </section>
            </div>
        </main>
    );
}
