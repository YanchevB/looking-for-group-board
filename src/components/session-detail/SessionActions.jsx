import './session-details.css';
import Button from '../shared/Button';

//TODO: Add guest, non-member, full, closed, and owner variants (see design/mockups/details.html)
export default function SessionActions() {
    return (
        <aside className="session-details__actions surface">
            <span className="session-details__actions-title">Your status</span>
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--fs-sm)" }}>
                You're in this session. See you in the lobby!
            </p>

            <Button type='button' variant='danger' size='block'>Leave session</Button>
        </aside>
    );
}
