import './form.css';

export default function FormBanner({
    text
}) {
    return (
        <div className="form__banner form__banner--error" role="alert">
            <span className="form__banner-icon" aria-hidden="true">⚠</span>
            <span>{text}</span>
        </div>
    );
}
