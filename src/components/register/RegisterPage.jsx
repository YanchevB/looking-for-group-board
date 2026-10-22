import { Link, useNavigate } from 'react-router';
import Button from '../shared/Button';
import '../shared/form.css';
import supabase from '../../lib/supabase';
import registerValidate from '../../utils/registerValidate';
import useForm from '../../hooks/useForm';

export default function RegisterPage() {
    const navigate = useNavigate();

    const { formData, fieldError, error, isSubmitting, changeHandler, submitHandler } =
        useForm (
            { email:'', username: '', password: '', passwordRepeat: '' },
            registerValidate, 
            async (values) => {
                // Check before signing up — otherwise the profiles UNIQUE constraint fails inside the
                // signup trigger and Supabase only returns a generic "Database error saving new user"
                const { data: takenProfile, error: profileError } = await supabase
                    .from('profiles')
                    .select('id')
                    .eq('username', values.username)
                    .maybeSingle();

                if (profileError) {
                    throw profileError;
                }

                if (takenProfile) {
                    return { username: 'Username is already taken!' };
                }

                const { error: signUpError } = await supabase.auth.signUp({
                    email: values.email,
                    password: values.password,
                    options: {
                        data: {
                            username: values.username
                        }
                    }
                });

                if (signUpError) {
                    if (signUpError.code === 'user_already_exists') {
                        return { email: 'Email is already registered!' };
                    }

                    throw signUpError;
                }

                navigate("/catalog");
            }
        );

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
                                onChange={changeHandler}
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
                                onChange={changeHandler}
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
                                onChange={changeHandler}
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
                                onChange={changeHandler}
                                placeholder="••••••••"
                            />
                            {fieldError?.passwordRepeat && <p className="form__error">{fieldError.passwordRepeat}</p>}
                        </div>

                        <Button type='submit' size='block' disabled={isSubmitting}>Create account</Button>
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
