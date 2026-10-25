import './comments.css';
import Comment from './Comment';
import ErrorMessage from '../shared/ErrorMessage';

export default function CommentList({
    comments,
    ownerId,
    userId,
    deletingCommentId,
    error,
    onDelete
}) {
    return (
        <div className="comments">
            <h2 className="comments__title">Comments</h2>
            {error && <ErrorMessage title="Couldn't delete comment" text={error} />}
            <div className="comments__list">

                {comments.length === 0 &&
                    <p className="comments__empty">No comments yet.</p>}

                {comments.map(comment =>
                    <Comment
                        key={comment.id}
                        comment={comment}
                        isHost={comment.user_id === ownerId}
                        isAuthor={comment.user_id === userId}
                        isDeleting={comment.id === deletingCommentId}
                        onDelete={onDelete}
                    />
                )}

            </div>
        </div>
    );
}
