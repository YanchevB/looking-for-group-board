import { Link, useNavigate } from 'react-router';
import Button from '../shared/Button';
import '../shared/form.css';
import loginValidate from '../../utils/loginValidate';
import supabase from '../../lib/supabase';
import { useState } from 'react';

export default function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const inputChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function submitHandler(e) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const formErrors = loginValidate(formData);
        setError(formErrors);

        if (Object.keys(formErrors).length > 0) {
            setIsSubmitting(false);
            return;
        }

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (signInError) {
                setError({
                    banner: signInError.code === 'invalid_credentials'
                        ? 'Incorrect email or password!'
                        : signInError.message
                });
                return;
            }

            navigate("/catalog");
        } catch (error) {
            setError({ banner: error.message });
        } finally {
            setIsSubmitting(false);
        }
    }

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

                    <form className="form" onSubmit={submitHandler}>
                        {error?.banner &&
                            <div className="form__banner form__banner--error" role="alert">
                                <span className="form__banner-icon" aria-hidden="true">⚠</span>
                                <span>{error.banner}</span>
                            </div>
                        }
                        <div className="form__group">
                            <label className="form__label" htmlFor="login-email">
                                Email
                            </label>
                            <input
                                className={error?.email ? "form__input form__input--invalid" : "form__input"}
                                type="email"
                                id="login-email"
                                name="email"
                                value={formData.email}
                                onChange={inputChangeHandler}
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="form__group">
                            <label className="form__label" htmlFor="login-password">
                                Password
                            </label>
                            <input
                                className={error?.password ? "form__input form__input--invalid" : "form__input"}
                                type="password"
                                id="login-password"
                                name="password"
                                value={formData.password}
                                onChange={inputChangeHandler}
                                placeholder="••••••••"
                            />
                        </div>

                        <Button type='submit' size='block' disabled={isSubmitting}>Log in</Button>
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
