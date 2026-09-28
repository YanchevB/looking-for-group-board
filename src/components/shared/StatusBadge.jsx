import './status-badge.css'

export default function StatusBadge({
    sessionStatus
}) {
    const label = sessionStatus.charAt(0).toUpperCase() + sessionStatus.slice(1);

    return (
        <span className={`status-badge status-badge--${sessionStatus}`}>
            <span className="status-badge__dot" />
            {label}
        </span>
    );
}