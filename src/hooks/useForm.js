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

    // Back to the starting values with old errors cleared; onSubmit gets it to clear the form after a successful submit
    const reset = () => {
        setFormData(initialValues);
        setFieldError(null);
        setError(null);
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
            const submitErrors = await onSubmit(formData, reset);

            if (submitErrors) {
                setFieldError(submitErrors);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return { formData, error, fieldError, isSubmitting, changeHandler, submitHandler };
}