import './session-details.css';
import Button from '../shared/Button';

//TODO: Add guest, non-member, full, closed, and owner variants (see design/mockups/details.html)
export default function SessionActions({
    isOwner,
    session
}) {
    return (
        <aside className="session-details__actions surface">
            {isOwner && (
                <>
                    <span className="session-details__actions-title">Manage session</span>

                    <Button variant='secondary' size='block' to={`/edit/${session?.id}`}>Edit session</Button>
                    <Button type='button' variant='secondary' size='block'>Close session</Button>
                    <Button type='button' variant='danger' size='block'>Delete session</Button>
                </>
            )}
            {/* <p style={{ color: "var(--color-text-muted)", fontSize: "var(--fs-sm)" }}>
                You're in this session. See you in the lobby!
            </p> */}

        </aside>
    );
}
