//TODO: Change imports once individual components are created
import '../shared/feedback.css';
import Button from '../shared/Button';
import SessionCard from '../shared/SessionCard';

export default function CatalogPage() {
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