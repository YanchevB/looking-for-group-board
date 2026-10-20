import { useNavigate } from 'react-router';
import SessionForm from '../shared/SessionForm';
import supabase from '../../lib/supabase';
import sessionValidate from '../../utils/sessionValidate';
import useForm from '../../hooks/useForm';

export default function EditSessionForm({
    session
}) {
    const navigate = useNavigate();

    const playerCount = session.session_players[0].count;

    const editValidate = (values) => {
        const errors = sessionValidate(values);

        if (!errors.slots && Number(values.slots) < playerCount) {
            errors['slots'] = `Slots can't be lower than the ${playerCount} players already joined!`;
        }

        return errors;
    }

    const { formData, fieldError, error, isSubmitting, changeHandler, submitHandler } =
        useForm(
            {
                game: session.game,
                platform: session.platform,
                slots: session.slots,
                mic_required: session.mic_required,
                description: session.description ?? '',
            },
            editValidate,
            async (values) => {
                const { error: updateError } = await supabase
                    .from('sessions')
                    .update(values)
                    .eq('id', session.id)

                if (updateError) {
                    throw updateError;
                }

                navigate(`/details/${session.id}`);
            }
        );

    return (
        <SessionForm
            session={formData}
            onSubmit={submitHandler}
            onChange={changeHandler}
            fieldError={fieldError}
            error={error}
            isSubmitting={isSubmitting}
            title='Edit session'
            submitLabel='Save changes'
            cancelTo={`/details/${session.id}`}
        />
    );
}
