import '../styles/button.css';

export default function Button({
    variant = 'primary',
    size,
    to,
    children 
}) {
    const className = `btn btn--${variant} ${size ? `btn--${size}` : ''}`;
    
    if (to) {
        return <a to={to} className={className}>{children}</a>
    }

    return (
        <button className={className}>{children}</button>
    );
}