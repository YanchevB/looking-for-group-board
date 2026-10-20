import { useState } from "react";

export default function useForm(initialValues, validate, onSubmit) {
    const [formData, setFormData] = useState(initialValues);

    const [error, setError] = useState(null);
    const [fieldError, setFieldError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    }

    async function submitHandler(e) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const formErrors = validate(formData);
        setFieldError(formErrors);

        if (Object.keys(formErrors).length > 0) {
            setIsSubmitting(false);
            return;
        }

        try {
            // onSubmit can return field errors that only the server can detect (e.g. a taken username)
            const submitErrors = await onSubmit(formData);

            if (submitErrors) {
                setFieldError(submitErrors);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return { formData, setFormData, error, fieldError, isSubmitting, changeHandler, submitHandler };
}