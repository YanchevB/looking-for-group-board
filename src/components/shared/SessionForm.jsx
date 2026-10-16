import Button from "./Button";
import './form.css';

export default function SessionForm({
    session,
    onSubmit,
    onChange,
    fieldError,
    error,
    isSubmitting,
    title = 'Host a session',
    submitLabel = 'Create session',
    cancelTo = '/catalog'
}) {
    return (
        <div className="container" style={{ maxWidth: 640 }}>
            <section className="section surface" style={{ padding: "var(--space-6)" }}>
                <h1 style={{ marginBottom: "var(--space-5)" }}>{title}</h1>
                <form className="form" onSubmit={onSubmit}>
                    {fieldError && Object.keys(fieldError).length > 0 && (
                        <div className="form__banner form__banner--error" role="alert">
                            <span className="form__banner-icon" aria-hidden="true">⚠</span>
                            <span>Please fix the highlighted fields before saving.</span>
                        </div>
                    )}
                    {error && (
                        <div className="form__banner form__banner--error" role="alert">
                            <span className="form__banner-icon" aria-hidden="true">⚠</span>
                            <span>{error}</span>
                        </div>
                    )}
                    <div className="form__group">
                        <label className="form__label" htmlFor="game">
                            Game<span className="form__required">*</span>
                        </label>
                        <input
                            className={fieldError?.game ? "form__input form__input--invalid" : "form__input"}
                            type="text"
                            id="game"
                            name="game"
                            onChange={onChange}
                            value={session.game}
                            placeholder="e.g. Valorant"
                        />

                        {fieldError?.game && <p className="form__error">{fieldError.game}</p>}
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="platform">
                            Platform<span className="form__required">*</span>
                        </label>
                        <select
                            className={fieldError?.platform ? "form__select form__select--invalid" : "form__select"}
                            id="platform"
                            name="platform"
                            value={session.platform}
                            onChange={onChange}
                        >
                            <option value="">Select a platform…</option>
                            <option value="PS5">PS5</option>
                            <option value="Xbox">Xbox</option>
                            <option value="PC">PC</option>
                            <option value="Switch">Switch</option>
                            <option value="Cross-platform">Cross-platform</option>
                        </select>
                        {fieldError?.platform && <p className="form__error">{fieldError.platform}</p>}
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="slots">
                            Open slots<span className="form__required">*</span>
                        </label>
                        <input
                            className={fieldError?.slots ? "form__input form__input--invalid" : "form__input"}
                            type="number"
                            id="slots"
                            name="slots"
                            onChange={onChange}
                            value={session.slots}
                            min={2}
                            max={8}
                            placeholder="2–8"
                        />
                        {fieldError?.slots
                            ? <p className="form__error">{fieldError.slots}</p>
                            : <span className="form__hint">
                                Total players allowed, including you (2–8).
                            </span>}
                    </div>
                    <div className="form__group">
                        <div className="form__checkbox-row">
                            <input className="form__checkbox" type="checkbox" id="mic" name="mic_required" checked={session.mic_required} onChange={onChange} />
                            <label className="form__checkbox-label" htmlFor="mic">
                                Mic required
                            </label>
                        </div>
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="form__textarea"
                            id="description"
                            name="description"
                            onChange={onChange}
                            value={session.description}
                            placeholder="What are you playing, and what are you looking for?"
                        />
                    </div>
                    <div className="form__actions">
                        <Button to={cancelTo} variant='ghost'>Cancel</Button>

                        <Button type='submit' variant='primary' disabled={isSubmitting}>{submitLabel}</Button>
                    </div>
                </form>
            </section>
        </div>
    );
}