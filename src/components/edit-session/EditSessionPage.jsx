//TODO: Add error banner
import SessionForm from '../shared/SessionForm';
import WipNote from '../shared/WipNote';

export default function EditSessionPage() {
    return (
        <main className="page-main">
            <div className="container" style={{ maxWidth: 640 }}>
                <WipNote>editing doesn't save changes yet.</WipNote>
            </div>
            <SessionForm />
        </main>
    );
}