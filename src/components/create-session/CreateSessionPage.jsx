//TODO: Add validation errors
import SessionForm from '../shared/SessionForm';
import WipNote from '../shared/WipNote';

export default function CreateSessionPage() {
    return (
        <main className="page-main">
            <div className="container" style={{ maxWidth: 640 }}>
                <WipNote>the form doesn't save sessions yet.</WipNote>
            </div>
            <SessionForm />
        </main>
    );
}