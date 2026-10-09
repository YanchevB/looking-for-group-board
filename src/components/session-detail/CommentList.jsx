import './comments.css';
import Comment from './Comment';

export default function CommentList({
    comments,
    ownerId
}) {
    return (
        <div className="comments">
            <h2 className="comments__title">Comments</h2>
            <div className="comments__list">

                {comments.map(comment =>
                    <Comment key={comment.id} comment={comment} isHost={comment.user_id === ownerId} />
                )}

            </div>
        </div>
    );
}