import './comments.css';
import '../shared/form.css';
import Button from '../shared/Button';
import supabase from '../../lib/supabase';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import commentValidate from '../../utils/commentValidate';

export default function CommentForm({
    sessionId,
    onPosted
}) {
    const { user } = useAuth();

    const { formData, error, fieldError, isSubmitting, changeHandler, submitHandler } =
        useForm({ text: '' }, commentValidate, async ({ text }, setFormData) => {
            // user_id is filled in by the database (default auth.uid())
            const { error: postError } = await supabase
                .from('comments')
                .insert({ session_id: sessionId, text: text.trim() });

            if (postError) throw postError;

            setFormData({ text: '' });
            onPosted();
        });

    if (!user) {
        return (
            <div className="comments__login-prompt">
                <span>Log in to leave a comment.</span>
                <Button to='/login' size='sm'>Log in</Button>
            </div>
        );
    }

    return (
        <form className="comments__form" onSubmit={submitHandler}>
            {error && (
                <div className="form__banner form__banner--error" role="alert">
                    <span className="form__banner-icon" aria-hidden="true">⚠</span>
                    <span>{error}</span>
                </div>
            )}
            <div className="comments__form-row">
                <label className="visually-hidden" htmlFor="comment-text">
                    Add a comment
                </label>
                <textarea
                    id="comment-text"
                    name="text"
                    className={fieldError?.text ? "form__textarea form__textarea--invalid" : "form__textarea"}
                    placeholder="Say something to the group…"
                    value={formData.text}
                    onChange={changeHandler}
                />

                <Button type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Posting…' : 'Post'}
                </Button>
            </div>
            {fieldError?.text && <p className="form__error">{fieldError.text}</p>}
        </form>
    );
}
