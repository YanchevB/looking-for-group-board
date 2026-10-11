export default function loginValidate(formData) {
    let errors = {};

    if (!formData.email) errors.email = true;
    if (!formData.password) errors.password = true;

    if (errors.email && errors.password) errors.banner = 'Email and password are required!';
    else if (errors.email) errors.banner = 'Email is required!';
    else if (errors.password) errors.banner = 'Password is required!';

    return errors;
}