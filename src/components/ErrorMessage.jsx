import '../styles/feedback.css';

export default function ErrorMessage({
    title = "Something went wrong",
    text = "Please try again."
}) {
    return (
        <div className="error-box" role="alert">
            <span className="error-box__icon" aria-hidden="true">⚠</span>
            <div>
                <div className="error-box__title">{title}</div>
                <p className="error-box__text">{text}</p>
            </div>
        </div>
    );
}
