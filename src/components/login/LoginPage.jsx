//TODO: Add invalid credentials state
import { Link } from 'react-router';
import Button from '../shared/Button';
import '../shared/form.css';

export default function LoginPage() {
    return (
        <main className="page-main">
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

                        <Button type='submit' size='block'>Log in</Button>
                    </form>

                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "var(--space-5)",
                            fontSize: "var(--fs-sm)"
                        }}
                    >
                        No account yet? <Link to="/register" className="link">Register</Link>
                    </p>
                </section>
            </div>
        </main>
    );
}
