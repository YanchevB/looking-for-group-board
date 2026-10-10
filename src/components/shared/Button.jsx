import { Link } from 'react-router';
import './button.css';

//TODO: Accept a `disabled` prop and pass it to <button> — needed for the Register submit
// (disabled={isSubmitting}) and the disabled Join/Leave buttons in SessionActions
export default function Button({
    variant = 'primary',
    size,
    to,
    children,
    type
}) {
    const className = `btn btn--${variant} ${size ? `btn--${size}` : ''}`;
    
    if (to) {
        return <Link to={to} className={className}>{children}</Link>
    }

    return (
        <button className={className} type={type}>{children}</button>
    );
}