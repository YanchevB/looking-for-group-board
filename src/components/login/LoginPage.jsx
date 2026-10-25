import { Link, useNavigate } from 'react-router';
import Button from '../shared/Button';
import FormBanner from '../shared/FormBanner';
import FormField from '../shared/FormField';
import '../shared/form.css';
import '../shared/auth.css';
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
            <div className="container container--narrow">
                <section className="section surface surface--padded">
                    <h1 className="auth__title">Welcome back</h1>
                    <p className="auth__subtitle">Log in to join sessions and comment.</p>

                    <form className="form" onSubmit={submitHandler}>
                        {(fieldError?.banner || error) && <FormBanner text={fieldError?.banner || error} />}

                        {/* Login shows its messages in the banner, so the fields only get the red border */}
                        <FormField
                            id="login-email"
                            label="Email"
                            invalid={fieldError?.email}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={changeHandler}
                            placeholder="you@example.com"
                        />

                        <FormField
                            id="login-password"
                            label="Password"
                            invalid={fieldError?.password}
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={changeHandler}
                            placeholder="••••••••"
                        />

                        <Button type='submit' size='block' disabled={isSubmitting}>Log in</Button>
                    </form>

                    <p className="auth__switch">
                        No account yet? <Link to="/register" className="link">Register</Link>
                    </p>
                </section>
            </div>
        </main>
    );
}
