import './feedback.css';

export default function Spinner({ message = 'Loading…' }) {
    return (
        <div className="loading-state">
            <div className="spinner" role="status" aria-label={message} />
            <p>{message}</p>
        </div>
    );
}
