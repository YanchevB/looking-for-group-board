import './comments.css';
import '../shared/form.css';
import Button from '../shared/Button';

//TODO: Add "log in to comment" variant for guests; wire up real submit handling
export default function CommentForm() {
    return (
        <form className="comments__form">
            <div className="comments__form-row">
                <label className="visually-hidden" htmlFor="comment-text">
                    Add a comment
                </label>
                <textarea
                    id="comment-text"
                    className="form__textarea"
                    placeholder="Say something to the group…"
                    defaultValue={""}
                />

                <Button type='submit'>Post</Button>
            </div>
        </form>
    );
}
