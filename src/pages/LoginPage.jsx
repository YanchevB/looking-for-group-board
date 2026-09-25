//TODO: Change imports once individual components are created
//TODO: Add invalid credentials state
import '../styles/button.css';
import '../styles/form.css';

export default function LoginPage() {
    return (
        <div className="container" style={{ maxWidth: 420 }}>
            <section className="section surface" style={{ padding: "var(--space-6)" }}>
                <h1 style={{ marginBottom: "var(--space-2)", textAlign: "center" }}>
                    Welcome back
                </h1>
                <p style={{ textAlign: "center", marginBottom: "var(--space-5)" }}>
                    Log in to join sessions and comment.
                </p>

                <form className="form">
                    <div className="form__group">
                        <label className="form__label" htmlFor="login-username">
                            Username
                        </label>
                        <input
                            className="form__input"
                            type="text"
                            id="login-username"
                            name="username"
                            placeholder="Your username"
                        />
                    </div>

                    <div className="form__group">
                        <label className="form__label" htmlFor="login-password">
                            Password
                        </label>
                        <input
                            className="form__input"
                            type="password"
                            id="login-password"
                            name="password"
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="btn btn--primary btn--block">
                        Log in
                    </button>
                </form>

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "var(--space-5)",
                        fontSize: "var(--fs-sm)"
                    }}
                >
                    No account yet? <a href="register.html" className="link">Register</a>
                </p>
            </section>
        </div>
    );
}
