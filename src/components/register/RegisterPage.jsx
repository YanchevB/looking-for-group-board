import { Link, useNavigate } from 'react-router';
import Button from '../shared/Button';
import '../shared/form.css';
import { useState } from 'react';
import supabase from '../../lib/supabase';
import registerValidate from '../../utils/registerValidate';

export default function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        passwordRepeat: ''
    });
    const [error, setError] = useState(null);
    const [fieldError, setFieldError] = useState(null);
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

        const formErrors = registerValidate(formData);
        setFieldError(formErrors);

        if (Object.keys(formErrors).length > 0) {
            setIsSubmitting(false);
            return;
        }

        try {
            //TODO: Check if the username is taken before signing up (query profiles by username)
            // and set fieldError.username to "Username is already taken" instead of
            // showing Supabase's generic "Database error saving new user" banner
            const { error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        username: formData.username
                    }
                }
            });

            if (signUpError) {
                setError(signUpError.message);
                setIsSubmitting(false);
                return;
            }
            
            setIsSubmitting(false);
            navigate("/catalog");
        } catch (error) {
            setError(error.message);
        }
    }

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

                    <form className="form" onSubmit={submitHandler}>
                        {error && 
                            <div className="form__banner form__banner--error" role="alert">
                                <span className="form__banner-icon" aria-hidden="true">⚠</span>
                                <span>{error}</span>
                            </div>
                        }
                        <div className="form__group">
                            <label className="form__label" htmlFor="reg-email">
                                Email
                            </label>
                            <input
                                className={fieldError?.email ? "form__input form__input--invalid" : "form__input"}
                                type="email"
                                id="reg-email"
                                name="email"
                                value={formData.email}
                                onChange={inputChangeHandler}
                                placeholder="you@example.com"
                            />

                            {fieldError?.email && <p className="form__error">{fieldError.email}</p>}
                        </div>

                        <div className="form__group">
                            <label className="form__label" htmlFor="reg-username">
                                Username
                            </label>
                            <input
                                className={fieldError?.username ? "form__input form__input--invalid" : "form__input"}
                                type="text"
                                id="reg-username"
                                name="username"
                                value={formData.username}
                                onChange={inputChangeHandler}
                                placeholder="Pick a username"
                            />
                            {fieldError?.username && <p className="form__error">{fieldError.username}</p>}
                        </div>

                        <div className="form__group">
                            <label className="form__label" htmlFor="reg-password">
                                Password
                            </label>
                            <input
                                className={fieldError?.password ? "form__input form__input--invalid" : "form__input"}
                                type="password"
                                id="reg-password"
                                name="password"
                                value={formData.password}
                                onChange={inputChangeHandler}
                                placeholder="••••••••"
                            />
                            {fieldError?.password && <p className="form__error">{fieldError.password}</p>}
                        </div>

                        <div className="form__group">
                            <label className="form__label" htmlFor="reg-password-repeat">
                                Repeat password
                            </label>
                            <input
                                className={fieldError?.passwordRepeat ? "form__input form__input--invalid" : "form__input"}
                                type="password"
                                id="reg-password-repeat"
                                name="passwordRepeat"
                                value={formData.passwordRepeat}
                                onChange={inputChangeHandler}
                                placeholder="••••••••"
                            />
                            {fieldError?.passwordRepeat && <p className="form__error">{fieldError.passwordRepeat}</p>}
                        </div>

                        <Button type='submit' size='block'>Create account</Button>
                    </form>

                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "var(--space-5)",
                            fontSize: "var(--fs-sm)"
                        }}
                    >
                        Already have an account? <Link to="/login" className="link">Log in</Link>
                    </p>
                </section>
            </div>
        </main>
    );
}
