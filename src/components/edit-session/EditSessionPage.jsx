import { useNavigate, useParams } from 'react-router';
import SessionForm from '../shared/SessionForm';
import { useEffect, useState } from 'react';
import supabase from '../../lib/supabase';
import sessionValidate from '../../utils/sessionValidate';
import Spinner from '../shared/Spinner';
import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function EditSessionPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [playerCount, setPlayerCount] = useState(null);

    const editValidate = (values) => {
        const errors = sessionValidate(values);

        if (!errors.slots && Number(values.slots) < playerCount) {
            errors['slots'] = `Slots can't be lower than the ${playerCount} players already joined!`;
        }

        return errors;
    }

    const { formData, setFormData, fieldError, error, isSubmitting, changeHandler, submitHandler } =
        useForm(
            { game: '', platform: '', slots: '', mic_required: false, description: '' },
            editValidate,
            async (values) => {
                const { error: updateError } = await supabase
                    .from('sessions')
                    .update(values)
                    .eq('id', id)

                if (updateError) {
                    throw updateError;
                }

                navigate(`/details/${id}`);
            }
        );

    useEffect(() => {
        const abortController = new AbortController();

        fetch(`${BASE_URL}sessions?id=eq.${id}&select=*,session_players(count)`,
            {
                signal: abortController.signal,
                headers: {
                    'apiKey': import.meta.env.VITE_API_KEY
                }
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Request failed: ${res.status}`);
                }

                return res.json()
            })
            .then(data => {
                const session = data[0];

                if (!session) {
                    navigate('/404');
                    return;
                }

                if (session.owner_id !== user.id) {
                    navigate(`/details/${id}`);
                    return;
                }

                setPlayerCount(session.session_players[0].count);

                setFormData({
                    game: session.game,
                    platform: session.platform,
                    slots: session.slots,
                    mic_required: session.mic_required,
                    description: session.description ?? '',
                });
            })
            .catch(err => {
                // Aborted on unmount / id change (or StrictMode's dev remount) — not a real error
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
            abortController.abort();
        };
    }, [id, user.id, navigate, setFormData]);

    return (
        <main className="page-main">
            {isLoading
                ? <Spinner />
                : <SessionForm 
                    session={formData}
                    onSubmit={submitHandler}
                    onChange={changeHandler}
                    fieldError={fieldError}
                    error={error}
                    isSubmitting={isSubmitting}
                    title='Edit session'
                    submitLabel='Save changes'
                    cancelTo={`/details/${id}`}
                />}
        </main>
    );
}