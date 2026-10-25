import './form.css';

export default function FormField({
    id,
    label,
    error,
    invalid = Boolean(error),
    hint,
    required,
    ...inputProps
}) {
    return (
        <div className="form__group">
            <label className="form__label" htmlFor={id}>
                {label}
                {required && <span className="form__required">*</span>}
            </label>
            <input
                className={invalid ? "form__input form__input--invalid" : "form__input"}
                id={id}
                {...inputProps}
            />
            {error
                ? <p className="form__error">{error}</p>
                : hint && <span className="form__hint">{hint}</span>}
        </div>
    );
}
