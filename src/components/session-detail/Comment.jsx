import './comments.css';

export default function Comment({
    //TODO: Implement this better
    comment
}) {
    return (
        <div className="comment">
            <span className="comment__avatar">{comment.avatar}</span>
            <div className="comment__body">
                <div className="comment__header">
                    <span className="comment__author">{comment.author}</span>
                    <span className="comment__time">14 minutes ago</span>
                </div>
                <p className="comment__text">
                    {comment.text}
                </p>
            </div>
            {comment.isOwner && (
                <div className="comment__footer">
                    <button type="button" className="comment__delete">
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}