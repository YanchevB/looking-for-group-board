import './session-details.css';
import Button from '../shared/Button';
import supabase from '../../lib/supabase';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import ErrorMessage from '../shared/ErrorMessage';

//TODO: Add guest, non-member, full, closed, and owner variants (see design/mockups/details.html)
export default function SessionActions({
    isOwner,
    session
}) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const deleteHandler = async () => {

        if (!confirm('Are you sure you want to delete this session?')) {
            return
        }

        setError(null);
        const { deleteError } = await supabase
            .from('sessions')
            .delete()
            .eq('id', session.id);

        if (deleteError) {
            setError(deleteError.message);
        }

        navigate('/catalog');
    }

    return (
        <aside className="session-details__actions surface">
            {error && <ErrorMessage title="Couldn't delete session" text={error} />}
            {isOwner && (
                <>
                    <span className="session-details__actions-title">Manage session</span>

                    <Button variant='secondary' size='block' to={`/edit/${session?.id}`}>Edit session</Button>
                    <Button type='button' variant='secondary' size='block'>Close session</Button>
                    <Button type='button' variant='danger' size='block'
                        onClick={deleteHandler}>Delete session</Button>
                </>
            )}
            {/* <p style={{ color: "var(--color-text-muted)", fontSize: "var(--fs-sm)" }}>
                You're in this session. See you in the lobby!
            </p> */}

        </aside>
    );
}
