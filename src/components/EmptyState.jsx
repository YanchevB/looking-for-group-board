import '../styles/feedback.css';
import Button from './Button';

export default function EmptyState({
    icon = '🎮',
    title = 'No open sessions yet',
    text = 'Be the first to host one and get a group together.',
    actionLabel = 'Host a session',
    actionTo = '/create'
}) {
    return (
        <div className="empty-state">
            <span className="empty-state__icon" aria-hidden="true">{icon}</span>
            <div className="empty-state__title">{title}</div>
            <p className="empty-state__text">{text}</p>
            <Button to={actionTo} variant="primary" size="sm">{actionLabel}</Button>
        </div>
    );
}
