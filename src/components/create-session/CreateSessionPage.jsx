import SessionForm from '../shared/SessionForm';
import supabase from '../../lib/supabase';
import { useNavigate } from 'react-router';
import sessionValidate from '../../utils/sessionValidate';
import useForm from '../../hooks/useForm';

export default function CreateSessionPage() {
    const navigate = useNavigate();

    const { formData, fieldError, error, isSubmitting, changeHandler, submitHandler } =
        useForm(
            { game: '', platform: '', slots: '', mic_required: false, description: '' },
            sessionValidate,
            async (values) => {
                const { data: newSession, error: sessionError } = await supabase
                    .from('sessions')
                    .insert(values)
                    .select()
                    .single();

                if (sessionError) {
                    throw sessionError;
                }

                const { error: playerError } = await supabase
                    .from('session_players')
                    .insert({ session_id: newSession.id });

                if (playerError) {
                    throw playerError;
                }

                navigate('/catalog');
            }
        );

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
