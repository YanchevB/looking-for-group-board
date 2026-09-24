//TODO: Change imports once individual components are created
//TODO: Add error banner
import '../styles/button.css';
import '../styles/form.css';

export default function EditSessionPage() {
    return (
        <div className="container" style={{ maxWidth: 640 }}>
            <div className="mockup-note">Edit session — pre-filled form</div>
            <section className="section surface" style={{ padding: "var(--space-6)" }}>
                <h1 style={{ marginBottom: "var(--space-5)" }}>Edit session</h1>
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
                            defaultValue="Valorant"
                        />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="platform">
                            Platform<span className="form__required">*</span>
                        </label>
                        <select className="form__select" id="platform" name="platform">
                            <option value="ps5">PS5</option>
                            <option value="xbox">Xbox</option>
                            <option value="pc" selected="">
                                PC
                            </option>
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
                            defaultValue={5}
                        />
                        <span className="form__hint">
                            Total players allowed, including you (2–8).
                        </span>
                    </div>
                    <div className="form__group">
                        <div className="form__checkbox-row">
                            <input
                                className="form__checkbox"
                                type="checkbox"
                                id="mic"
                                name="mic"
                                defaultChecked=""
                            />
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
                            defaultValue={
                                "Ranked grind, need a duo who can play Sentinel. Comms preferred but not mandatory."
                            }
                        />
                    </div>
                    <div className="form__actions">
                        <a href="details.html" className="btn btn--ghost">
                            Cancel
                        </a>
                        <button type="submit" className="btn btn--primary">
                            Save changes
                        </button>
                    </div>
                </form>
            </section>
        </div>

    );
}