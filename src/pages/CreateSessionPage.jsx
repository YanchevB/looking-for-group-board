//TODO: Change imports once individual components are created
//TODO: Add validation errors
import '../styles/button.css';
import '../styles/form.css';

export default function CreateSessionPage() {
    return (
        <div className="container" style={{ maxWidth: 640 }}>
            <section className="section surface" style={{ padding: "var(--space-6)" }}>
                <h1 style={{ marginBottom: "var(--space-5)" }}>Host a session</h1>
                <form className="form">
                    <div className="form__group">
                        <label className="form__label" htmlFor="game">
                            Game<span className="form__required">*</span>
                        </label>
                        <input
                            className="form__input"
                            type="text"
                            id="game"
                            name="game"
                            placeholder="e.g. Valorant"
                        />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="platform">
                            Platform<span className="form__required">*</span>
                        </label>
                        <select className="form__select" id="platform" name="platform">
                            <option value="">Select a platform…</option>
                            <option value="ps5">PS5</option>
                            <option value="xbox">Xbox</option>
                            <option value="pc">PC</option>
                            <option value="switch">Switch</option>
                            <option value="cross">Cross-platform</option>
                        </select>
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="slots">
                            Open slots<span className="form__required">*</span>
                        </label>
                        <input
                            className="form__input"
                            type="number"
                            id="slots"
                            name="slots"
                            min={2}
                            max={8}
                            placeholder="2–8"
                        />
                        <span className="form__hint">
                            Total players allowed, including you (2–8).
                        </span>
                    </div>
                    <div className="form__group">
                        <div className="form__checkbox-row">
                            <input className="form__checkbox" type="checkbox" id="mic" name="mic" />
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
                            placeholder="What are you playing, and what are you looking for?"
                            defaultValue={""}
                        />
                    </div>
                    <div className="form__actions">
                        <a href="catalog.html" className="btn btn--ghost">
                            Cancel
                        </a>
                        <button type="submit" className="btn btn--primary">
                            Create session
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}