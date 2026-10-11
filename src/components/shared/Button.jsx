import { Link } from 'react-router';
import './button.css';

export default function Button({
    variant = 'primary',
    size,
    to,
    children,
    type,
    onClick,
    disabled
}) {
    const className = `btn btn--${variant} ${size ? `btn--${size}` : ''}`;
    
    if (to) {
        return <Link to={to} className={className}>{children}</Link>
    }

    return (
        <button className={className} type={type} onClick={onClick} disabled={disabled}>{children}</button>
    );
}