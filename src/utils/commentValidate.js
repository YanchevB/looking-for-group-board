export default function commentValidate(formData) {
    let errors = {};

    if (!formData.text.trim()) errors.text = 'Comment can\'t be empty!';

    return errors;
}
