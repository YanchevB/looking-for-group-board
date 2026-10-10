export default function registerValidate(formData) {
    let errors = {};

    if (!formData.email) {
        errors['email'] = 'Email is required!';
    }

    //TODO: Make better username validation
    if (!formData.username) {
        errors['username'] = 'Username is required!';
    } else if (formData.username.length <= 2) {
        errors['username'] = 'Username must be at least 3 characters long!'
    }

    //TODO: Make better password validation
    if (formData.password.length <= 0) {
        errors['password'] = 'Password is required!';
    } else if (formData.password.length <= 5) {
        errors['password'] = 'Password must be at least 6 characters long!'
    }

    if (formData.password !== formData.passwordRepeat) {
        errors['passwordRepeat'] = "Passwords don't match!";
    }

    return errors;
}