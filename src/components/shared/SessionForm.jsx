import Button from "./Button";
import FormBanner from "./FormBanner";
import FormField from "./FormField";
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
        <div className="container container--form">
            <section className="section surface surface--padded">
                <h1 className="form-title">{title}</h1>
                <form className="form" onSubmit={onSubmit}>
                    {fieldError && Object.keys(fieldError).length > 0 &&
                        <FormBanner text='Please fix the highlighted fields before saving.' />
                    }
                    {error && <FormBanner text={error} />}
                    <FormField
                        id="game"
                        label="Game"
                        required
                        error={fieldError?.game}
                        type="text"
                        name="game"
                        onChange={onChange}
                        value={session.game}
                        placeholder="e.g. Valorant"
                    />
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
                    <FormField
                        id="slots"
                        label="Open slots"
                        required
                        error={fieldError?.slots}
                        hint="Total players allowed, including you (2–8)."
                        type="number"
                        name="slots"
                        onChange={onChange}
                        value={session.slots}
                        min={2}
                        max={8}
                        placeholder="2–8"
                    />
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