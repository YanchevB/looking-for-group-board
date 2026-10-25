import { Link, useNavigate } from 'react-router';
import Button from '../shared/Button';
import FormBanner from '../shared/FormBanner';
import FormField from '../shared/FormField';
import '../shared/form.css';
import '../shared/auth.css';
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
            <div className="container container--narrow">
                <section className="section surface surface--padded">
                    <h1 className="auth__title">Create your account</h1>
                    <p className="auth__subtitle">Join LFG Board to host and join sessions.</p>

                    <form className="form" onSubmit={submitHandler}>
                        {error && <FormBanner text={error} />}

                        <FormField
                            id="reg-email"
                            label="Email"
                            error={fieldError?.email}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={changeHandler}
                            placeholder="you@example.com"
                        />

                        <FormField
                            id="reg-username"
                            label="Username"
                            error={fieldError?.username}
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={changeHandler}
                            placeholder="Pick a username"
                        />

                        <FormField
                            id="reg-password"
                            label="Password"
                            error={fieldError?.password}
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={changeHandler}
                            placeholder="••••••••"
                        />

                        <FormField
                            id="reg-password-repeat"
                            label="Repeat password"
                            error={fieldError?.passwordRepeat}
                            type="password"
                            name="passwordRepeat"
                            value={formData.passwordRepeat}
                            onChange={changeHandler}
                            placeholder="••••••••"
                        />

                        <Button type='submit' size='block' disabled={isSubmitting}>Create account</Button>
                    </form>

                    <p className="auth__switch">
                        Already have an account? <Link to="/login" className="link">Log in</Link>
                    </p>
                </section>
            </div>
        </main>
    );
}
