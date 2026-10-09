import { extractInitial } from '../../utils/extractInitial';
import { timeAgo } from '../../utils/time';
import './comments.css';

export default function Comment({
    //TODO: Implement this better
    comment,
    isHost
}) {
    return (
        <div className={`comment${isHost ? ' comment--host' : ''}`}>
            <span className="comment__avatar">{extractInitial(comment.author.username)}</span>
            <div className="comment__body">
                <div className="comment__header">
                    <span className="comment__author">{comment.author.username}</span>
                    <span className="comment__time">{timeAgo(comment.created_at)}</span>
                </div>
                <p className="comment__text">
                    {comment.text}
                </p>
            </div>
            {/* {comment.isOwner && (
                <div className="comment__footer">
                    <button type="button" className="comment__delete">
                        Delete
                    </button>
                </div>
            )} */}
        </div>
    );
}