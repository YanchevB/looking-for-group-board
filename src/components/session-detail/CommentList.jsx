import './comments.css';
import Comment from './Comment';

export default function CommentList() {
    return (
        <div className="comments">
            <h2 className="comments__title">Comments</h2>
            <div className="comments__list">

                <Comment comment={{
                    id: 1,
                    author: 'Vantage_',
                    avatar: 'V',
                    text: "Invite is sent, hop in whenever you're ready!",
                    isOwner: false
                }}/>

                {/* Own comment — shows the delete button variant */}
                <Comment comment={{
                    id: 2,
                    author: 'DarkKnight92',
                    avatar: 'DK',
                    text: "Alright see ya there!",
                    isOwner: true
                }}/>

            </div>
        </div>
    );
}