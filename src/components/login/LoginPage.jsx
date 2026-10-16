import { Link, useNavigate } from 'react-router';
import Button from '../shared/Button';
import '../shared/form.css';
import loginValidate from '../../utils/loginValidate';
import supabase from '../../lib/supabase';
import useForm from '../../hooks/useForm';

export default function LoginPage() {
    const navigate = useNavigate();

    const { formData, fieldError, error, isSubmitting, changeHandler, submitHandler } = 
        useForm(
            { email: '', password: '' },
            loginValidate,
            async (values) => {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email: values.email,
                    password: values.password,
                });

                if (signInError) {
                    if (signInError.code === 'invalid_credentials') {
                        throw new Error('Incorrect email or password');
                    }
                    
                    throw signInError;
                }

                navigate("/catalog");
            }
        );

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
                        {(fieldError?.banner || error) &&
                            <div className="form__banner form__banner--error" role="alert">
                                <span className="form__banner-icon" aria-hidden="true">⚠</span>
                                <span>{fieldError?.banner || error}</span>
                            </div>
                        }
                        <div className="form__group">
                            <label className="form__label" htmlFor="login-email">
                                Email
                            </label>
                            <input
                                className={fieldError?.email ? "form__input form__input--invalid" : "form__input"}
                                type="email"
                                id="login-email"
                                name="email"
                                value={formData.email}
                                onChange={changeHandler}
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="form__group">
                            <label className="form__label" htmlFor="login-password">
                                Password
                            </label>
                            <input
                                className={fieldError?.password ? "form__input form__input--invalid" : "form__input"}
                                type="password"
                                id="login-password"
                                name="password"
                                value={formData.password}
                                onChange={changeHandler}
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
