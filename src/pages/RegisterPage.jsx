//TODO: Change imports once individual components are created
//TODO: Add validation errors
import '../styles/button.css';
import '../styles/form.css';

export default function RegisterPage() {
    return (
        <main className="page-main">
            <div className="container" style={{ maxWidth: 420 }}>
                <section className="section surface" style={{ padding: "var(--space-6)" }}>
                    <h1 style={{ marginBottom: "var(--space-2)", textAlign: "center" }}>
                        Create your account
                    </h1>
                    <p style={{ textAlign: "center", marginBottom: "var(--space-5)" }}>
                        Join LFG Board to host and join sessions.
                    </p>

                    <form className="form">
                        <div className="form__group">
                            <label className="form__label" htmlFor="reg-email">
                                Email
                            </label>
                            <input
                                className="form__input"
                                type="email"
                                id="reg-email"
                                name="email"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="form__group">
                            <label className="form__label" htmlFor="reg-username">
                                Username
                            </label>
                            <input
                                className="form__input"
                                type="text"
                                id="reg-username"
                                name="username"
                                placeholder="Pick a username"
                            />
                        </div>

                        <div className="form__group">
                            <label className="form__label" htmlFor="reg-password">
                                Password
                            </label>
                            <input
                                className="form__input"
                                type="password"
                                id="reg-password"
                                name="password"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="form__group">
                            <label className="form__label" htmlFor="reg-password-repeat">
                                Repeat password
                            </label>
                            <input
                                className="form__input"
                                type="password"
                                id="reg-password-repeat"
                                name="passwordRepeat"
                                placeholder="••••••••"
                            />
                        </div>

                        <button type="submit" className="btn btn--primary btn--block">
                            Create account
                        </button>
                    </form>

                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "var(--space-5)",
                            fontSize: "var(--fs-sm)"
                        }}
                    >
                        Already have an account? <a href="login.html" className="link">Log in</a>
                    </p>
                </section>
            </div>
        </main>
    );
}
