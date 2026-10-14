import { useState } from 'react';
import SessionForm from '../shared/SessionForm';
import WipNote from '../shared/WipNote';
import supabase from '../../lib/supabase';
import { useNavigate } from 'react-router';
import sessionValidate from '../../utils/sessionValidate';

export default function CreateSessionPage() {
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [fieldError, setFieldError] = useState(null);

    const [formData, setFormData] = useState({
        game: '',
        platform: '',
        slots: '',
        mic_required: false,
        description: '',
    });

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const formErrors = sessionValidate(formData);
        setFieldError(formErrors);

        if (Object.keys(formErrors).length > 0) {
            setIsSubmitting(false);
            return;
        }

        try {
            const { data: newSession, error: sessionError } = await supabase
                .from('sessions')
                .insert(formData)
                .select()
                .single();

            if (sessionError) {
                setError(sessionError.message);
                return;
            }

            const { error: playerError } = await supabase
                .from('session_players')
                .insert({ session_id: newSession.id });

            if (playerError) {
                setError(playerError.message);
                return;
            }

            navigate('/catalog');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="page-main">
            <SessionForm
                session={formData}
                onSubmit={submitHandler}
                onChange={changeHandler}
                fieldError={fieldError}
                error={error}
                isSubmitting={isSubmitting}
            />
        </main>
    );
}