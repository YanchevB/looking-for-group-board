import './button.css';

export default function Button({
    variant = 'primary',
    size,
    to,
    children,
    type
}) {
    const className = `btn btn--${variant} ${size ? `btn--${size}` : ''}`;
    
    if (to) {
        // TODO: Change to <Link /> after implementing routing
        return <a to={to} className={className}>{children}</a>
    }

    return (
        <button className={className} type={type}>{children}</button>
    );
}