//TODO: Change imports once individual components are created
import Button from '../components/Button';
import '../styles/button.css';

export default function NotFoundPage() {
    return (
        <main className="page-main">
            <div
                className="container"
                style={{ textAlign: "center", paddingBlock: "var(--space-8)" }}
            >
                <p
                    style={{
                        fontSize: "var(--fs-2xl)",
                        fontWeight: 800,
                        color: "var(--color-accent)",
                        marginBottom: "var(--space-2)"
                    }}
                >
                    404
                </p>
                <h1 style={{ marginBottom: "var(--space-3)" }}>This lobby doesn't exist</h1>
                <p style={{ maxWidth: "40ch", margin: "0 auto var(--space-6)" }}>
                    The page you're looking for was moved, closed, or never existed. Let's
                    get you back to finding a group.
                </p>
                <div className="btn-group" style={{ justifyContent: "center" }}>
                    <Button to='/home'>Back to home</Button>
                    
                    <Button to='/catalog' variant='secondary'>Browse sessions</Button>
                </div>
            </div>
        </main>
    );
}
